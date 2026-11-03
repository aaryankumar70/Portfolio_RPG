import { NPC, NPCState } from '../types';
import { pixelAssets } from './PixelArtAssets';
import { assetManager } from './AssetManager';
import { collisionSystem } from './CollisionSystem';

export class NPCManager {
  public npcs: NPC[];

  // Mapping from NPC ID to production idle spritesheet
  private static readonly NPC_SPRITE_MAP: Record<string, string> = {
    npc_barista: '/assets/npcs/barista_idle.png',
    npc_gardener: '/assets/npcs/gardener_idle.png',
    npc_smith: '/assets/npcs/blacksmith_idle.png',
    npc_blacksmith: '/assets/npcs/blacksmith_idle.png',
    npc_sage: '/assets/npcs/data_sage_idle.png',
    npc_foreman: '/assets/npcs/researcher_idle.png',
    npc_companion: '/assets/npcs/data_sage_idle.png',
    npc_wizard: '/assets/npcs/data_sage_idle.png',
    npc_librarian: '/assets/npcs/librarian_idle.png',
    npc_postmaster: '/assets/npcs/postmaster_idle.png',
    npc_guildmaster: '/assets/npcs/guild_master_idle.png'
  };

  constructor(initialNpcs: NPC[]) {
    this.npcs = initialNpcs;
  }

  public update(dt: number, playerX: number, playerY: number) {
    for (const npc of this.npcs) {
      // 1. Check distance to player
      const distToPlayer = Math.hypot(playerX - npc.x, playerY - npc.y);

      // If player is close, face the player and enter 'interacting'
      if (distToPlayer < 55) {
        npc.state = 'interacting';
        const diffX = playerX - npc.x;
        const diffY = playerY - npc.y;
        if (Math.abs(diffX) > Math.abs(diffY)) {
          npc.direction = diffX > 0 ? 'right' : 'left';
        } else {
          npc.direction = diffY > 0 ? 'down' : 'up';
        }
        continue;
      }

      // 2. Autonomous Schedule & State Progression
      npc.stateTimer += dt;
      const currentPoint = npc.schedule[npc.scheduleIndex];

      if (!currentPoint) continue;

      if (npc.stateTimer >= currentPoint.duration) {
        // Move to next schedule point
        npc.stateTimer = 0;
        npc.scheduleIndex = (npc.scheduleIndex + 1) % npc.schedule.length;
        const nextPoint = npc.schedule[npc.scheduleIndex];
        npc.state = nextPoint.state;
        if (nextPoint.facing) {
          npc.direction = nextPoint.facing;
        }
      }

      // If state is 'walking', move toward target destination
      if (npc.state === 'walking' || (currentPoint.state === 'walking')) {
        const destX = currentPoint.x;
        const destY = currentPoint.y;
        const diffX = destX - npc.x;
        const diffY = destY - npc.y;
        const dist = Math.hypot(diffX, diffY);

        if (dist > 4) {
          const speed = 45; // px/sec
          const step = Math.min(dist, speed * dt);
          npc.x += (diffX / dist) * step;
          npc.y += (diffY / dist) * step;

          if (Math.abs(diffX) > Math.abs(diffY)) {
            npc.direction = diffX > 0 ? 'right' : 'left';
          } else {
            npc.direction = diffY > 0 ? 'down' : 'up';
          }
        }
      }
    }
  }

  public renderNPC(ctx: CanvasRenderingContext2D, npc: NPC, cameraX: number, cameraY: number, animTime: number) {
    const nx = Math.floor(npc.x - cameraX);
    const ny = Math.floor(npc.y - cameraY);

    const spritePath = NPCManager.NPC_SPRITE_MAP[npc.id];
    const img = spritePath ? assetManager.getImage(spritePath) : null;

    if (img) {
        // 4-frame idle animation (128x48 total, each frame 32x48)
        const frame = Math.floor(animTime * 4.5) % 4;
        const frameW = 32;
        const frameH = 48;
        const scale = 1.6;
        const destW = frameW * scale;
        const destH = frameH * scale;

        ctx.save();
        ctx.imageSmoothingEnabled = false;

        // Shadow beneath NPC
        ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
        ctx.beginPath();
        ctx.ellipse(nx, ny - 2, destW * 0.32, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.drawImage(
          img,
          frame * frameW,
          0,
          frameW,
          frameH,
          Math.floor(nx - destW / 2),
          Math.floor(ny - destH + 4),
          Math.floor(destW),
          Math.floor(destH)
        );
        ctx.restore();
      } else {
        // Fallback procedural NPC sprite
        if (npc.id === 'npc_blacksmith' || npc.id === 'npc_smith') {
          pixelAssets.drawBlacksmithSprite(ctx, nx, ny, animTime);
        } else {
          pixelAssets.drawLibrarianSprite(ctx, nx, ny, animTime);
        }
      }

    // Role Tag (Compact retro font with backdrop for legibility)
    ctx.save();
    ctx.font = '700 8px "Press Start 2P", monospace';
    const tagW = ctx.measureText(npc.name).width;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.fillRect(Math.floor(nx - tagW / 2 - 4), ny - 68, tagW + 8, 14);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.strokeRect(Math.floor(nx - tagW / 2 - 4), ny - 68, tagW + 8, 14);

    ctx.fillStyle = '#fde047';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(npc.name, nx, ny - 61);
    ctx.restore();
  }
}
