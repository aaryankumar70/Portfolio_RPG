import { NPC, NPCState } from '../types';
import { pixelAssets } from './PixelArtAssets';
import { collisionSystem } from './CollisionSystem';

export class NPCManager {
  public npcs: NPC[];

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

    if (npc.id === 'npc_blacksmith' || npc.id === 'npc_smith') {
      pixelAssets.drawBlacksmithSprite(ctx, nx, ny, animTime);
    } else if (npc.id === 'npc_librarian' || npc.id === 'npc_sage') {
      pixelAssets.drawLibrarianSprite(ctx, nx, ny, animTime);
    } else if (npc.id === 'npc_cat') {
      pixelAssets.drawCatSprite(ctx, nx, ny, animTime);
    } else {
      // General NPC sprite
      pixelAssets.drawLibrarianSprite(ctx, nx, ny, animTime);
    }

    // Role Tag (Compact retro font)
    ctx.save();
    ctx.font = '700 8px "Press Start 2P", monospace';
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'center';
    ctx.fillText(npc.name, nx, ny - 32);
    ctx.restore();
  }
}
