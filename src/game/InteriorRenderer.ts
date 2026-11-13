// src/game/InteriorRenderer.ts
// Handcrafted layered Canvas renderer for explorable RPG interiors

import { InteriorConfig } from './interiorConfig';
import { assetManager } from './AssetManager';
import { pixelAssets } from './PixelArtAssets';
import { PlayerCharacter } from './PlayerCharacter';
import { MangoPet } from './MangoPet';

interface DepthItem {
  y: number;
  render: (ctx: CanvasRenderingContext2D) => void;
}

export class InteriorRenderer {
  private animTimer = 0;

  public render(
    ctx: CanvasRenderingContext2D,
    config: InteriorConfig,
    player: PlayerCharacter,
    mangoPet: MangoPet,
    activeHotspot: string | null,
    nearExit: boolean,
    dt: number
  ) {
    this.animTimer += dt * 3.5;

    ctx.save();

    // 1. Room Floor
    this.drawFloor(ctx, config);

    // 2. Walls & Architectural Structure
    this.drawWalls(ctx, config);

    // 3. Y-Sorted Depth Entities (Furniture, NPCs, Mango, Player)
    this.drawDepthEntities(ctx, config, player, mangoPet);

    // 4. Atmospheric Lighting & Particle Overlay
    this.drawLightingAndParticles(ctx, config);

    // 5. Interactive Proximity HUD / Badges
    this.drawInteractionPrompts(ctx, config, activeHotspot, nearExit, player);

    ctx.restore();
  }

  // 1. Room Floor
  private drawFloor(ctx: CanvasRenderingContext2D, config: InteriorConfig) {
    const { roomWidth: rw, roomHeight: rh, floorType } = config;

    if (floorType === 'wood') {
      // Warm Polished Oak Floor Planks
      ctx.fillStyle = '#6b3e1b';
      ctx.fillRect(0, 0, rw, rh);
      for (let y = 120; y < rh; y += 24) {
        ctx.fillStyle = y % 48 === 0 ? '#784d2a' : '#85562f';
        ctx.fillRect(50, y, rw - 100, 22);
        ctx.fillStyle = '#4a2810';
        ctx.fillRect(50, y + 22, rw - 100, 2); // plank seam
        // Staggered vertical nail heads
        const offset = (y % 48 === 0 ? 0 : 60);
        for (let x = 60 + offset; x < rw - 60; x += 120) {
          ctx.fillStyle = '#331b08';
          ctx.fillRect(x, y + 2, 2, 2);
          ctx.fillRect(x + 116, y + 2, 2, 2);
        }
      }
    } else if (floorType === 'cave') {
      // Dark Volcanic Rock Cavern Floor
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, rw, rh);
      for (let y = 120; y < rh; y += 32) {
        for (let x = 50; x < rw - 50; x += 40) {
          const col = (x * 7 + y * 13) % 2 === 0 ? '#334155' : '#0f172a';
          ctx.fillStyle = col;
          ctx.fillRect(x, y, 38, 30);
          ctx.fillStyle = '#020617';
          ctx.strokeRect(x, y, 38, 30);
        }
      }
      // Glowing moss patches
      ctx.fillStyle = config.id === 'python_cave' ? '#0284c7' : '#d97706';
      for (let mx = 100; mx < rw - 100; mx += 140) {
        ctx.fillRect(mx, 380 + (mx % 50), 16, 6);
      }
    } else if (floorType === 'garden') {
      // Lush Botanical Arboretum Grass & Stone Stepping Path
      ctx.fillStyle = '#166534';
      ctx.fillRect(0, 0, rw, rh);
      // Cobblestone walking path
      for (let py = 120; py < rh; py += 22) {
        ctx.fillStyle = '#475569';
        ctx.fillRect(rw / 2 - 40, py, 80, 20);
        ctx.fillStyle = '#64748b';
        ctx.fillRect(rw / 2 - 36, py + 2, 72, 16);
      }
      // Dappled flower blossoms
      const petalCols = ['#f43f5e', '#fbbf24', '#c084fc', '#38bdf8'];
      for (let fx = 70; fx < rw - 70; fx += 55) {
        for (let fy = 135; fy < rh - 40; fy += 55) {
          if (Math.abs(fx - rw / 2) > 55) {
            ctx.fillStyle = petalCols[(fx + fy) % petalCols.length];
            ctx.fillRect(fx, fy, 4, 4);
          }
        }
      }
    } else if (floorType === 'cyber') {
      // Sleek Cyber-Tech Grid Tiles with Cyan/Magenta Circuit Traces
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, rw, rh);
      for (let y = 120; y < rh; y += 40) {
        for (let x = 50; x < rw - 50; x += 40) {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(x + 1, y + 1, 38, 38);
          ctx.fillStyle = 'rgba(6, 182, 212, 0.12)';
          ctx.strokeRect(x + 1, y + 1, 38, 38);
        }
      }
      // Glowing Central Conduit Lines
      ctx.fillStyle = config.id === 'ml_lab' ? '#ec4899' : '#06b6d4';
      ctx.fillRect(rw / 2 - 1, 120, 2, rh - 150);
      ctx.fillRect(100, rh / 2, rw - 200, 2);
    } else {
      // Stone Pavers (Forge / Guild / Boss Arena)
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 0, rw, rh);
      for (let y = 120; y < rh; y += 28) {
        for (let x = 50; x < rw - 50; x += 36) {
          ctx.fillStyle = (x + y) % 3 === 0 ? '#475569' : '#1e293b';
          ctx.fillRect(x, y, 34, 26);
        }
      }
    }

    // Welcome Doormat at Entrance
    const { exitDoor } = config;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(exitDoor.x, exitDoor.y - 12, exitDoor.w, 32);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(exitDoor.x + 2, exitDoor.y - 10, exitDoor.w - 4, 28);
    ctx.fillStyle = '#fde047';
    ctx.font = '700 7px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('WELCOME', exitDoor.x + exitDoor.w / 2, exitDoor.y + 7);
  }

  // 2. Walls & Structural Elements
  private drawWalls(ctx: CanvasRenderingContext2D, config: InteriorConfig) {
    const { roomWidth: rw, roomHeight: rh, floorType } = config;

    // North Wall (Height 120px)
    if (floorType === 'wood') {
      ctx.fillStyle = '#3e200e';
      ctx.fillRect(0, 0, rw, 120);
      // Wall wainscoting & vertical wood paneling
      for (let x = 50; x < rw - 50; x += 30) {
        ctx.fillStyle = '#542d15';
        ctx.fillRect(x, 10, 28, 108);
        ctx.fillStyle = '#6b3e1b';
        ctx.fillRect(x + 2, 12, 24, 104);
      }
      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, 116, rw, 8); // baseboard trim
    } else if (floorType === 'cave') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, rw, 120);
      for (let cy = 0; cy < 118; cy += 12) {
        ctx.fillStyle = cy % 24 === 0 ? '#1e293b' : '#334155';
        ctx.fillRect(40, cy, rw - 80, 10);
      }
    } else if (floorType === 'garden') {
      // Open sky above with wooden post-and-rail fence
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(0, 0, rw, 70); // clear sky
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, 70, rw, 50); // lush hedge row
      // Fence rails
      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, 95, rw, 6);
      ctx.fillRect(0, 110, rw, 6);
      for (let fx = 40; fx < rw; fx += 50) {
        ctx.fillStyle = '#451a03';
        ctx.fillRect(fx, 85, 8, 35);
      }
    } else if (floorType === 'cyber') {
      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, rw, 120);
      for (let x = 60; x < rw - 60; x += 60) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x, 10, 52, 106);
        ctx.strokeStyle = config.id === 'ml_lab' ? '#db2777' : '#0891b2';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, 10, 52, 106);
        // Blinking server diodes
        ctx.fillStyle = Math.sin(this.animTimer * 5 + x) > 0 ? '#10b981' : '#0284c7';
        ctx.fillRect(x + 6, 20, 4, 4);
        ctx.fillRect(x + 14, 20, 4, 4);
      }
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 116, rw, 8);
    } else {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, rw, 120);
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, 116, rw, 8);
    }

    // West Wall & East Wall Pillars
    ctx.fillStyle = '#291407';
    ctx.fillRect(0, 0, 50, rh);
    ctx.fillRect(rw - 50, 0, 50, rh);

    // South Wall Left & Right of Entrance
    const { exitDoor } = config;
    ctx.fillStyle = '#291407';
    ctx.fillRect(0, rh - 30, exitDoor.x, 30);
    ctx.fillRect(exitDoor.x + exitDoor.w, rh - 30, rw - (exitDoor.x + exitDoor.w), 30);

    // Large Bay Windows on North Wall with Sunlight Rays
    if (config.id === 'coffee_shop' || config.id === 'home') {
      const drawSunWindow = (wx: number, wy: number) => {
        // Frame
        ctx.fillStyle = '#291407';
        ctx.fillRect(wx - 2, wy - 2, 48, 52);
        // Sky glass
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(wx, wy, 44, 48);
        ctx.fillStyle = '#7dd3fc';
        ctx.fillRect(wx + 2, wy + 2, 40, 6);
        // Window mullions
        ctx.fillStyle = '#291407';
        ctx.fillRect(wx + 21, wy, 2, 48);
        ctx.fillRect(wx, wy + 23, 44, 2);
        // Light ray streaming diagonally onto floor
        const ray = ctx.createLinearGradient(wx + 22, wy + 48, wx - 40, wy + 220);
        ray.addColorStop(0, 'rgba(253, 224, 71, 0.22)');
        ray.addColorStop(1, 'transparent');
        ctx.fillStyle = ray;
        ctx.beginPath();
        ctx.moveTo(wx, wy + 48);
        ctx.lineTo(wx + 44, wy + 48);
        ctx.lineTo(wx + 80, wy + 240);
        ctx.lineTo(wx - 40, wy + 240);
        ctx.closePath();
        ctx.fill();
      };
      drawSunWindow(160, 25);
      drawSunWindow(580, 25);
    }
  }

  // 3. Y-Sorted Depth Entities (Furniture, NPCs, Mango, Player)
  private drawDepthEntities(
    ctx: CanvasRenderingContext2D,
    config: InteriorConfig,
    player: PlayerCharacter,
    mangoPet: MangoPet
  ) {
    const depthList: DepthItem[] = [];

    // A. Furniture Objects
    config.furniture.forEach((f) => {
      depthList.push({
        y: f.y + f.h,
        render: (c) => f.draw(c, this.animTimer)
      });
    });

    // B. Interior NPC
    if (config.npc) {
      const npc = config.npc;
      depthList.push({
        y: npc.y + 45,
        render: (c) => {
          c.save();
          // Drop shadow
          c.fillStyle = 'rgba(0, 0, 0, 0.45)';
          c.beginPath();
          c.ellipse(npc.x, npc.y + 44, 14, 5, 0, 0, Math.PI * 2);
          c.fill();

          // NPC Sprite
          const img = assetManager.getImage(npc.spritePath);
          if (img) {
            c.imageSmoothingEnabled = false;
            c.drawImage(img, npc.x - 24, npc.y - 10, 48, 54);
          } else {
            // Procedural fallback
            c.fillStyle = '#eab308';
            c.fillRect(npc.x - 12, npc.y + 10, 24, 34);
            c.fillStyle = '#fde047';
            c.fillRect(npc.x - 8, npc.y - 4, 16, 16);
          }

          // Floating Name Pill
          c.font = '700 7px "Press Start 2P", monospace';
          c.textAlign = 'center';
          const nameW = c.measureText(npc.name).width;
          c.fillStyle = 'rgba(15, 23, 42, 0.85)';
          c.fillRect(npc.x - nameW / 2 - 5, npc.y - 18, nameW + 10, 14);
          c.strokeStyle = '#f59e0b';
          c.lineWidth = 1;
          c.strokeRect(npc.x - nameW / 2 - 5, npc.y - 18, nameW + 10, 14);
          c.fillStyle = '#fde047';
          c.fillText(npc.name, npc.x, npc.y - 8);

          c.restore();
        }
      });
    }

    // C. Mango the Cat Pet
    depthList.push({
      y: mangoPet.y + 12,
      render: (c) => mangoPet.render(c, 0, 0)
    });

    // D. Player Character (Aryan)
    depthList.push({
      y: player.state.y + 24,
      render: (c) => player.render(c, 0, 0)
    });

    // Sort all entities by base Y (depth-sorting)
    depthList.sort((a, b) => a.y - b.y);

    depthList.forEach((item) => item.render(ctx));
  }

  // 4. Atmospheric Lighting & Particles Overlay
  private drawLightingAndParticles(ctx: CanvasRenderingContext2D, config: InteriorConfig) {
    const { roomWidth: rw, roomHeight: rh } = config;

    // Ambient Darkness Vignette (Cached)
    const vignetteCanvas = assetManager.getVignette(rw, rh);
    ctx.drawImage(vignetteCanvas, 0, 0);

    // Warm Hanging Lanterns
    const lanterns = [
      { x: 200, y: 150 },
      { x: 600, y: 150 }
    ];

    const glowImg = assetManager.getLanternGlow();

    lanterns.forEach((lp) => {
      // Chain
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(Math.round(lp.x - 1), 0, 2, lp.y);
      // Brass Lantern fixture
      ctx.fillStyle = '#d97706';
      ctx.fillRect(Math.round(lp.x - 8), lp.y, 16, 18);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(Math.round(lp.x - 5), lp.y + 3, 10, 12);
      // Soft radial amber halo (Cached texture)
      ctx.drawImage(glowImg, Math.round(lp.x - 44), Math.round(lp.y + 8 - 44));
    });
  }

  // 5. Interactive Proximity Prompts
  private drawInteractionPrompts(
    ctx: CanvasRenderingContext2D,
    config: InteriorConfig,
    activeHotspotId: string | null,
    nearExit: boolean,
    player: PlayerCharacter
  ) {
    const px = player.state.x;
    const py = player.state.y;

    if (nearExit) {
      // Prompt at Exit Door
      const { exitDoor } = config;
      this.drawPromptBadge(ctx, exitDoor.x + exitDoor.w / 2, exitDoor.y - 25, 'E — Exit to Town');
      return;
    }

    if (activeHotspotId) {
      const hs = config.hotspots.find((h) => h.id === activeHotspotId);
      if (hs) {
        this.drawPromptBadge(ctx, hs.x, hs.y - 28, `E — ${hs.prompt}`);
      }
    }
  }

  private drawPromptBadge(ctx: CanvasRenderingContext2D, x: number, y: number, text: string) {
    ctx.save();
    ctx.font = '700 8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    const textW = ctx.measureText(text).width;
    const pad = 10;
    const boxW = textW + pad * 2;
    const boxH = 24;

    const bob = Math.sin(this.animTimer * 4) * 3;
    const by = y + bob;

    // Drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x - boxW / 2 + 2, by - boxH / 2 + 2, boxW, boxH);

    // Gold & Slate Card
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x - boxW / 2, by - boxH / 2, boxW, boxH);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - boxW / 2, by - boxH / 2, boxW, boxH);

    // Glowing Golden Text
    ctx.fillStyle = '#fde047';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, by);

    // Pulsing retro arrow below badge
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(x - 5, by + boxH / 2 + 1);
    ctx.lineTo(x + 5, by + boxH / 2 + 1);
    ctx.lineTo(x, by + boxH / 2 + 6);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}
