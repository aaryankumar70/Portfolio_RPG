import { PlayerState, PlayerAnimState, CollisionBox } from '../types';
import { soundManager } from '../audio/SoundManager';
import { pixelAssets } from './PixelArtAssets';
import { collisionSystem } from './CollisionSystem';
import { TUNING } from './TUNING';

export class PlayerCharacter {
  public state: PlayerState = {
    x: 1200,
    y: 1015,
    direction: 'down',
    animState: 'idle',
    isMoving: false,
    speed: TUNING.PLAYER.WALK_SPEED,
    level: 18,
    xp: 1280,
    maxHp: 100,
    hp: 100,
    name: 'Aryan',
    path: []
  };

  public vx = 0;
  public vy = 0;
  private walkAnimTimer = 0;
  private idleAnimTimer = 0;
  private footstepTimer = 0;
  public isRunning = false;
  private ghostTrail: Array<{ x: number; y: number; dir: 'down' | 'up' | 'left' | 'right'; frame: number; alpha: number }> = [];

  // Delta-time based update loop with acceleration and friction curves
  public update(
    dt: number,
    keys: { [key: string]: boolean },
    isInteracting: boolean,
    customBoxes?: CollisionBox[]
  ) {
    if (isInteracting) {
      this.vx = 0;
      this.vy = 0;
      this.state.isMoving = false;
      this.state.animState = 'interacting';
      return;
    }

    let inputX = 0;
    let inputY = 0;

    // Check Run / Sprint modifier (Shift)
    this.isRunning = Boolean(keys['ShiftLeft'] || keys['ShiftRight']);

    // 1. Keyboard Inputs
    const keyUp = keys['KeyW'] || keys['ArrowUp'];
    const keyDown = keys['KeyS'] || keys['ArrowDown'];
    const keyLeft = keys['KeyA'] || keys['ArrowLeft'];
    const keyRight = keys['KeyD'] || keys['ArrowRight'];

    if (keyUp) inputY -= 1;
    if (keyDown) inputY += 1;
    if (keyLeft) inputX -= 1;
    if (keyRight) inputX += 1;

    // If keyboard is pressed, immediately cancel any click-to-move path
    if (inputX !== 0 || inputY !== 0) {
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
        inputX = diffX / dist;
        inputY = diffY / dist;
      }
    }

    // Normalize diagonal input
    const inputLen = Math.hypot(inputX, inputY);
    let dirX = 0;
    let dirY = 0;
    if (inputLen > 0) {
      dirX = inputX / inputLen;
      dirY = inputY / inputLen;
    }

    // Target velocity with smooth acceleration & friction
    const targetSpeed = inputLen > 0
      ? (this.isRunning ? TUNING.PLAYER.RUN_SPEED : TUNING.PLAYER.WALK_SPEED)
      : 0;

    const targetVx = dirX * targetSpeed;
    const targetVy = dirY * targetSpeed;

    const accelTime = this.isRunning ? TUNING.PLAYER.RUN_ACCEL_TIME : TUNING.PLAYER.ACCEL_TIME;
    const decelTime = this.isRunning ? TUNING.PLAYER.RUN_DECEL_TIME : TUNING.PLAYER.DECEL_TIME;

    const rateX = inputX !== 0 ? (TUNING.PLAYER.RUN_SPEED / accelTime) : (TUNING.PLAYER.RUN_SPEED / decelTime);
    const rateY = inputY !== 0 ? (TUNING.PLAYER.RUN_SPEED / accelTime) : (TUNING.PLAYER.RUN_SPEED / decelTime);

    const approach = (curr: number, target: number, rate: number) => {
      const diff = target - curr;
      const step = rate * dt;
      if (Math.abs(diff) <= step) return target;
      return curr + Math.sign(diff) * step;
    };

    this.vx = approach(this.vx, targetVx, rateX);
    this.vy = approach(this.vy, targetVy, rateY);

    const actualSpeed = Math.hypot(this.vx, this.vy);

    // Wide shallow foot hitbox offset (allows head/shoulders to overlap buildings/trees)
    const footOffsetY = TUNING.PLAYER.HITBOX.OFFSET_Y;
    const currFootX = this.state.x;
    const currFootY = this.state.y + footOffsetY;
    const targetFootX = currFootX + this.vx * dt;
    const targetFootY = currFootY + this.vy * dt;

    const resolvedFeet = collisionSystem.resolveMovement(
      currFootX,
      currFootY,
      targetFootX,
      targetFootY,
      TUNING.PLAYER.HITBOX.RADIUS_X,
      TUNING.PLAYER.HITBOX.RADIUS_Y,
      customBoxes
    );

    // Stop velocity on blocked axis
    if (Math.abs(resolvedFeet.x - targetFootX) > 0.05) this.vx = 0;
    if (Math.abs(resolvedFeet.y - targetFootY) > 0.05) this.vy = 0;

    this.state.x = resolvedFeet.x;
    this.state.y = resolvedFeet.y - footOffsetY;

    this.state.isMoving = actualSpeed > 6.0;

    // Process Movement Animation & Footsteps tied to actual velocity
    if (this.state.isMoving) {
      if (Math.abs(this.vx) > Math.abs(this.vy)) {
        this.state.direction = this.vx > 0 ? 'right' : 'left';
      } else if (Math.abs(this.vy) > 0.01) {
        this.state.direction = this.vy > 0 ? 'down' : 'up';
      }

      this.state.animState = this.isRunning && actualSpeed > TUNING.PLAYER.WALK_SPEED ? 'running' : 'walking';

      const animRate = this.isRunning ? 12 : 8;
      this.walkAnimTimer += dt * animRate;

      // Hyper Light Drifter Ghost Dash / Movement Trail
      if (this.isRunning && Math.random() < 0.6) {
        this.ghostTrail.unshift({
          x: this.state.x,
          y: this.state.y,
          dir: this.state.direction,
          frame: Math.floor(this.walkAnimTimer),
          alpha: 0.45
        });
        if (this.ghostTrail.length > 5) this.ghostTrail.pop();
      }

      // Footstep sound timing tied to actual speed
      this.footstepTimer += dt;
      const stepCadence = this.isRunning
        ? TUNING.PLAYER.FOOTSTEP_INTERVAL_RUN
        : TUNING.PLAYER.FOOTSTEP_INTERVAL_WALK;

      if (this.footstepTimer >= stepCadence) {
        this.footstepTimer = 0;
        soundManager.playFootstep();
      }
    } else {
      this.state.animState = 'idle';
      this.idleAnimTimer += dt * 4.5;
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
