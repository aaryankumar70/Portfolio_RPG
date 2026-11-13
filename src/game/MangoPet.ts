// MangoPet.ts - Autonomous Pet Companion System for Aryan's Adventure
// Mango the Orange Tabby Cat follows Aryan around the world with realistic pet AI and animations

import { assetManager } from './AssetManager';
import { soundManager } from '../audio/SoundManager';
import { pixelAssets } from './PixelArtAssets';

export type MangoState = 'idle' | 'walk' | 'follow' | 'sit' | 'sleep' | 'stretch';

interface PetHeart {
  x: number;
  y: number;
  vy: number;
  alpha: number;
  scale: number;
}

export class MangoPet {
  public x: number = 1238;
  public y: number = 902;
  public targetX: number = 1238;
  public targetY: number = 902;
  public direction: 'left' | 'right' = 'left';
  public state: MangoState = 'idle';

  private frameIndex: number = 0;
  private animTimer: number = 0;
  private stateTimer: number = 0;
  private meowCooldown: number = 0;
  private hearts: PetHeart[] = [];

  // Animation row mapping from animations.json
  private readonly ROW_MAP: Record<MangoState, number> = {
    idle: 0,
    walk: 1,
    sit: 2,
    sleep: 3,
    stretch: 4,
    follow: 5
  };

  constructor(startX: number = 1238, startY: number = 902) {
    this.x = startX;
    this.y = startY;
  }

  // Delta-time based follow AI tracking Aryan
  public update(dt: number, playerX: number, playerY: number, playerMoving: boolean) {
    this.animTimer += dt;
    this.stateTimer += dt;
    if (this.meowCooldown > 0) this.meowCooldown -= dt;

    // Update floating heart particles
    for (let i = this.hearts.length - 1; i >= 0; i--) {
      const h = this.hearts[i];
      h.y -= h.vy * dt;
      h.alpha -= dt * 0.9;
      if (h.alpha <= 0) {
        this.hearts.splice(i, 1);
      }
    }

    // Follow offset: Stay slightly to the side and behind the player
    const desiredOffsetX = this.direction === 'left' ? 38 : -38;
    const desiredOffsetY = 14;
    const targetX = playerX + desiredOffsetX;
    const targetY = playerY + desiredOffsetY;

    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const distToTarget = Math.hypot(dx, dy);
    const distToPlayer = Math.hypot(playerX - this.x, playerY - this.y);

    // Directional facing
    if (Math.abs(dx) > 4) {
      this.direction = dx > 0 ? 'right' : 'left';
    }

    // If player starts moving, immediately wake up and follow
    if (playerMoving && (this.state === 'sit' || this.state === 'sleep' || this.state === 'stretch' || this.state === 'idle')) {
      this.state = 'walk';
      this.stateTimer = 0;
    }

    // AI Follow State Machine
    if (distToPlayer > 130) {
      // Lagging behind: Run / Follow fast!
      this.state = 'follow';
      const speed = 230; // px/s
      const step = Math.min(distToTarget, speed * dt);
      this.x += (dx / distToTarget) * step;
      this.y += (dy / distToTarget) * step;
    } else if (distToPlayer > 48) {
      // Normal walk to catch up
      this.state = 'walk';
      const speed = 140; // px/s
      const step = Math.min(distToTarget, speed * dt);
      this.x += (dx / distToTarget) * step;
      this.y += (dy / distToTarget) * step;
    } else {
      // Within comfortable distance: Idle, sit down, stretch or sleep
      if (this.state === 'walk' || this.state === 'follow') {
        this.state = 'idle';
        this.stateTimer = 0;
      } else if (this.state === 'idle' && this.stateTimer > 4.5) {
        // Sit down after waiting quietly
        this.state = 'sit';
        this.stateTimer = 0;
      } else if (this.state === 'sit' && this.stateTimer > 8.0) {
        // Cute cat stretch or sleep
        this.state = Math.random() > 0.5 ? 'stretch' : 'sleep';
        this.stateTimer = 0;
      }
    }

    // Animation frame cycling
    const frameSpeed = this.state === 'follow' ? 0.10 : this.state === 'walk' ? 0.13 : 0.22;
    if (this.animTimer >= frameSpeed) {
      this.animTimer = 0;
      this.frameIndex = (this.frameIndex + 1) % 4;
    }
  }

  // Interactive meow on player click or proximity
  public meow() {
    if (this.meowCooldown <= 0) {
      soundManager.playCatMeow();
      this.meowCooldown = 2.5;
      this.state = 'stretch';
      this.stateTimer = 0;

      // Spawn 3 adorable floating heart particles
      for (let i = 0; i < 3; i++) {
        this.hearts.push({
          x: (Math.random() - 0.5) * 16,
          y: -10 - i * 6,
          vy: 24 + Math.random() * 12,
          alpha: 1.0,
          scale: 0.8 + Math.random() * 0.4
        });
      }
    }
  }

  // Render Mango on Canvas (Sorted with World Objects)
  public render(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    const screenX = Math.round(this.x - cameraX);
    const screenY = Math.round(this.y - cameraY);

    const img = assetManager.getImage('/assets/characters/mango/mango_spritesheet.png');
    const scale = 1.6;
    const frameW = 32;
    const frameH = 32;
    const destW = frameW * scale;
    const destH = frameH * scale;

    ctx.save();
    // Soft shadow beneath Mango's paws
    ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.beginPath();
    ctx.ellipse(screenX, screenY - 2, destW * 0.32, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    if (img) {
      const row = this.ROW_MAP[this.state] ?? 0;
      const col = this.frameIndex % 4;
      const sx = col * frameW;
      const sy = row * frameH;

      ctx.save();
      ctx.translate(screenX, screenY);
      // Flip horizontally if facing right (spritesheet defaults to left-facing)
      if (this.direction === 'right') {
        ctx.scale(-1, 1);
      }
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        img,
        sx,
        sy,
        frameW,
        frameH,
        -destW / 2,
        -destH + 6,
        destW,
        destH
      );
      ctx.restore();
    } else {
      // Fallback procedural cat drawing while asset loads
      pixelAssets.drawCatSprite(ctx, screenX, screenY, performance.now() / 1000);
    }

    // Overhead Retro Name Label Tag ("Mango 🐾")
    ctx.save();
    ctx.font = '700 8px "Press Start 2P", monospace';
    const label = 'Mango 🐾';
    const tagW = ctx.measureText(label).width;
    const tagX = Math.floor(screenX - tagW / 2 - 4);
    const tagY = screenY - 48;

    // Dark panel with amber border
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(tagX, tagY, tagW + 8, 14);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.strokeRect(tagX, tagY, tagW + 8, 14);

    // Warm golden text
    ctx.fillStyle = '#fde047';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, screenX, tagY + 7);

    // Render floating love heart particles
    for (const h of this.hearts) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, h.alpha);
      ctx.fillStyle = '#f43f5e';
      const hx = screenX + h.x;
      const hy = screenY - 54 + h.y;
      // Draw pixel heart
      ctx.fillRect(hx - 3, hy - 2, 2, 2);
      ctx.fillRect(hx + 1, hy - 2, 2, 2);
      ctx.fillRect(hx - 4, hy - 1, 8, 2);
      ctx.fillRect(hx - 3, hy + 1, 6, 2);
      ctx.fillRect(hx - 2, hy + 3, 4, 1);
      ctx.fillRect(hx - 1, hy + 4, 2, 1);
      ctx.restore();
    }

    ctx.restore();
    ctx.restore();
  }
}
