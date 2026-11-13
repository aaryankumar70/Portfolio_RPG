import { PlayerState, PlayerAnimState } from '../types';
import { soundManager } from '../audio/SoundManager';
import { pixelAssets } from './PixelArtAssets';
import { collisionSystem } from './CollisionSystem';

export class PlayerCharacter {
  public state: PlayerState = {
    x: 1200,
    y: 1015, // Standing directly in front of the Town Square fountain, matching reference screenshot!
    direction: 'down',
    animState: 'idle',
    isMoving: false,
    speed: 180, // pixels per second (delta-time based!)
    level: 18,
    xp: 1280,
    maxHp: 100,
    hp: 100,
    name: 'Aryan',
    path: []
  };

  private walkAnimTimer = 0;
  private idleAnimTimer = 0;
  private footstepTimer = 0;
  public isRunning = false;
  private ghostTrail: Array<{ x: number; y: number; dir: 'down' | 'up' | 'left' | 'right'; frame: number; alpha: number }> = [];

  // Delta-time based update loop
  public update(
    dt: number, // Delta time in seconds (e.g. 0.016 for 60fps)
    keys: { [key: string]: boolean },
    isInteracting: boolean
  ) {
    if (isInteracting) {
      this.state.isMoving = false;
      this.state.animState = 'interacting';
      return;
    }

    let dx = 0;
    let dy = 0;

    // Check Run / Sprint modifier (Shift)
    this.isRunning = Boolean(keys['ShiftLeft'] || keys['ShiftRight']);
    const moveSpeed = this.isRunning ? 270 : 180; // px/sec

    // 1. Keyboard Inputs
    const keyUp = keys['KeyW'] || keys['ArrowUp'];
    const keyDown = keys['KeyS'] || keys['ArrowDown'];
    const keyLeft = keys['KeyA'] || keys['ArrowLeft'];
    const keyRight = keys['KeyD'] || keys['ArrowRight'];

    if (keyUp) dy -= 1;
    if (keyDown) dy += 1;
    if (keyLeft) dx -= 1;
    if (keyRight) dx += 1;

    // If keyboard is pressed, immediately cancel any click-to-move path
    if (dx !== 0 || dy !== 0) {
      this.state.path = [];
      this.state.targetX = undefined;
      this.state.targetY = undefined;
    } else if (this.state.path && this.state.path.length > 0) {
      // 2. Following A* Waypoint Path
      const nextWp = this.state.path[0];
      const diffX = nextWp.x - this.state.x;
      const diffY = nextWp.y - this.state.y;
      const dist = Math.hypot(diffX, diffY);

      if (dist < 8) {
        this.state.path.shift();
      } else {
        dx = diffX / dist;
        dy = diffY / dist;
      }
    }

    // Process Movement
    if (dx !== 0 || dy !== 0) {
      const len = Math.hypot(dx, dy);
      const nx = dx / len;
      const ny = dy / len;

      const stepDist = moveSpeed * dt;
      const targetX = this.state.x + nx * stepDist;
      const targetY = this.state.y + ny * stepDist;

      // Solid Collision Resolution with Wall Sliding
      const resolved = collisionSystem.resolveMovement(
        this.state.x,
        this.state.y,
        targetX,
        targetY,
        12 // player radius
      );

      // Check if actual movement occurred
      const movedX = resolved.x - this.state.x;
      const movedY = resolved.y - this.state.y;

      this.state.x = resolved.x;
      this.state.y = resolved.y;
      this.state.isMoving = Math.hypot(movedX, movedY) > 0.05;

      // Update Facing Direction
      if (Math.abs(dx) > Math.abs(dy)) {
        this.state.direction = dx > 0 ? 'right' : 'left';
      } else {
        this.state.direction = dy > 0 ? 'down' : 'up';
      }

      this.state.animState = this.isRunning ? 'running' : 'walking';

      // Animation step cadence
      const animRate = this.isRunning ? 12 : 8; // frames/sec
      this.walkAnimTimer += dt * animRate;

      // Hyper Light Drifter Ghost Dash / Movement Trail
      if (Math.random() < (this.isRunning ? 0.7 : 0.35)) {
        this.ghostTrail.unshift({
          x: this.state.x,
          y: this.state.y,
          dir: this.state.direction,
          frame: Math.floor(this.walkAnimTimer),
          alpha: this.isRunning ? 0.55 : 0.3
        });
        if (this.ghostTrail.length > 5) this.ghostTrail.pop();
      }

      // Footstep sound timing
      this.footstepTimer += dt;
      const stepCadence = this.isRunning ? 0.22 : 0.32; // seconds
      if (this.footstepTimer >= stepCadence) {
        this.footstepTimer = 0;
        soundManager.playFootstep();
      }
    } else {
      this.state.isMoving = false;
      this.state.animState = 'idle';
      this.idleAnimTimer += dt * 4.5; // ~220ms per idle frame (matching animations.json)
      this.footstepTimer = 0;
    }

    // Fade active ghost trail
    for (let i = this.ghostTrail.length - 1; i >= 0; i--) {
      this.ghostTrail[i].alpha -= dt * 3.2;
      if (this.ghostTrail[i].alpha <= 0) {
        this.ghostTrail.splice(i, 1);
      }
    }
  }

  // Set click-to-move path via A* pathfinder
  public setTarget(targetX: number, targetY: number) {
    this.state.targetX = targetX;
    this.state.targetY = targetY;
    this.state.path = collisionSystem.findPath(this.state.x, this.state.y, targetX, targetY);
  }

  public render(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    // 1. Render chromatic ghost trails behind player
    this.ghostTrail.forEach((ghost) => {
      ctx.save();
      ctx.globalAlpha = ghost.alpha;
      const gx = Math.round(ghost.x - cameraX);
      const gy = Math.round(ghost.y - cameraY);
      pixelAssets.drawPlayerSprite(ctx, gx, gy, ghost.dir, ghost.frame, false);
      ctx.restore();
    });

    // 2. Render Main Player Sprite (Pixel Snapped)
    const px = Math.round(this.state.x - cameraX);
    const py = Math.round(this.state.y - cameraY);

    const frame = Math.floor(this.state.isMoving ? this.walkAnimTimer : this.idleAnimTimer);
    pixelAssets.drawPlayerSprite(ctx, px, py, this.state.direction, frame, this.state.isMoving);

    // 3. Optional: Draw subtle path dot markers for click-to-move
    if (this.state.path && this.state.path.length > 0) {
      ctx.save();
      ctx.fillStyle = 'rgba(34, 211, 238, 0.55)';
      for (const pt of this.state.path) {
        const sx = Math.floor(pt.x - cameraX);
        const sy = Math.floor(pt.y - cameraY);
        ctx.fillRect(sx - 1, sy - 1, 3, 3);
      }
      ctx.restore();
    }
  }
}
