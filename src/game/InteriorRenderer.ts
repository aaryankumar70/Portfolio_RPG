// src/game/InteriorRenderer.ts
// Handcrafted layered Canvas renderer for explorable RPG interiors

import { InteriorConfig } from './interiorConfig';
import { assetManager } from './AssetManager';
import { pixelAssets } from './PixelArtAssets';
import { PlayerCharacter } from './PlayerCharacter';
import { MangoPet } from './MangoPet';
import { TUNING } from './TUNING';

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
    dt: number,
    camX: number = 0,
    camY: number = 0
  ) {
    this.animTimer += dt * 3.5;

    ctx.save();
    ctx.translate(-Math.round(camX), -Math.round(camY));

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

  // Furniture Item Drawing with PNG Sprite Replacements & Fallback
  private drawFurnitureItem(ctx: CanvasRenderingContext2D, f: any) {
    const id = (f.id || '').toLowerCase();
    const type = (f.type || '').toLowerCase();
    const name = (f.name || '').toLowerCase();

    let spritePath: string | null = null;
    let drawOffsetY = 0;
    let drawExtraH = 0;

    if (id.includes('counter') || type === 'counter') {
      spritePath = '/assets/interiors/coffee_counter.png';
    } else if (id.includes('table') || type === 'table') {
      if (name.includes('reading') || id.includes('reading')) {
        spritePath = '/assets/interiors/reading_table.png';
      } else {
        spritePath = '/assets/interiors/cafe_table.png';
      }
    } else if (id.includes('espresso') || name.includes('espresso')) {
      spritePath = '/assets/interiors/espresso_machine.png';
    } else if (id.includes('desk') || name.includes('desk') || id.includes('computer')) {
      spritePath = '/assets/interiors/desk_computer.png';
      drawOffsetY = -8;
      drawExtraH = 8;
    } else if (id.includes('bed') || type === 'bed') {
      spritePath = '/assets/interiors/bed.png';
    } else if (id.includes('shelf') || id.includes('book') || type === 'bookshelf') {
      spritePath = '/assets/interiors/bookshelf_tall.png';
      drawOffsetY = -24;
      drawExtraH = 24;
    } else if (id.includes('anvil') || type === 'anvil') {
      spritePath = '/assets/interiors/anvil.png';
    } else if (id.includes('weapon') || id.includes('rack')) {
      spritePath = '/assets/interiors/weapon_rack.png';
      drawOffsetY = -14;
      drawExtraH = 14;
    } else if (id.includes('forge') || id.includes('furnace')) {
      spritePath = '/assets/interiors/forge_furnace.png';
      drawOffsetY = -20;
      drawExtraH = 20;
    } else if (id.includes('plant') || type === 'plant') {
      spritePath = '/assets/interiors/potted_plant.png';
    } else if (id.includes('server') || id.includes('crystal_rack')) {
      spritePath = '/assets/interiors/server_crystal_rack.png';
    }

    if (spritePath) {
      const img = assetManager.getImage(spritePath);
      if (img) {
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        // Consistent soft drop shadow beneath furniture
        ctx.fillStyle = TUNING.ATMOSPHERE.SHADOW_COLOR;
        ctx.beginPath();
        ctx.ellipse(
          f.x + f.w / 2 + TUNING.ATMOSPHERE.SHADOW_OFFSET_X,
          f.y + f.h - 2 + TUNING.ATMOSPHERE.SHADOW_OFFSET_Y,
          f.w * 0.44,
          6,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.drawImage(img, f.x, f.y + drawOffsetY, f.w, f.h + drawExtraH);
        ctx.restore();
        return;
      }
    }

    // Fallback to handcrafted procedural drawing
    f.draw(ctx, this.animTimer);
  }

  // 3. Y-Sorted Depth Entities (Furniture, NPCs, Mango, Player)
  private drawDepthEntities(
    ctx: CanvasRenderingContext2D,
    config: InteriorConfig,
    player: PlayerCharacter,
    mangoPet: MangoPet
  ) {
    const depthList: DepthItem[] = [];

    // A. Furniture Objects (Baseline foot depth sorting)
    config.furniture.forEach((f) => {
      depthList.push({
        y: f.y + f.h,
        render: (c) => this.drawFurnitureItem(c, f)
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
          c.fillStyle = TUNING.ATMOSPHERE.SHADOW_COLOR;
          c.beginPath();
          c.ellipse(
            npc.x + TUNING.ATMOSPHERE.SHADOW_OFFSET_X,
            npc.y + 44 + TUNING.ATMOSPHERE.SHADOW_OFFSET_Y,
            14,
            5,
            0,
            0,
            Math.PI * 2
          );
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

    // C. Mango the Cat Pet Companion
    depthList.push({
      y: mangoPet.y + 12,
      render: (c) => mangoPet.render(c, 0, 0)
    });

    // D. Player Character (Aryan - Feet depth sorted so tall furniture occludes properly)
    depthList.push({
      y: player.state.y + TUNING.PLAYER.HITBOX.OFFSET_Y,
      render: (c) => player.render(c, 0, 0)
    });

    // Sort all entities strictly by base Y (depth-sorting)
    depthList.sort((a, b) => a.y - b.y);

    depthList.forEach((item) => item.render(ctx));
  }

  // 4. Atmospheric Lighting & Particles Overlay
  private drawLightingAndParticles(ctx: CanvasRenderingContext2D, config: InteriorConfig) {
    const { roomWidth: rw, roomHeight: rh, id } = config;

    // Ambient Darkness Vignette (Cached)
    const vignetteCanvas = assetManager.getVignette(rw, rh);
    ctx.drawImage(vignetteCanvas, 0, 0);

    if (id === 'python_cave') {
      // Cool blue ambient & glowing crystals for Python Cave
      ctx.fillStyle = 'rgba(8, 20, 48, 0.45)';
      ctx.fillRect(0, 0, rw, rh);

      const crystalGlow = assetManager.getCrystalGlow();
      config.hotspots.forEach((hs) => {
        const pulse = Math.sin(this.animTimer * 2.5 + hs.x) * 0.15;
        ctx.save();
        ctx.globalAlpha = 0.85 + pulse;
        ctx.drawImage(crystalGlow, Math.round(hs.x - 40), Math.round(hs.y - 40));
        ctx.restore();
      });
    } else if (id === 'coffee_shop' || id === 'home') {
      // Warm golden ambient glow for Coffee Shop and Home
      ctx.fillStyle = 'rgba(251, 191, 36, 0.08)';
      ctx.fillRect(0, 0, rw, rh);

      // Warm hanging lanterns
      const lanterns = [
        { x: 200, y: 150 },
        { x: 600, y: 150 }
      ];
      const glowImg = assetManager.getLanternGlow();

      lanterns.forEach((lp) => {
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(Math.round(lp.x - 1), 0, 2, lp.y);
        ctx.fillStyle = '#d97706';
        ctx.fillRect(Math.round(lp.x - 8), lp.y, 16, 18);
        ctx.fillStyle = '#fde047';
        ctx.fillRect(Math.round(lp.x - 5), lp.y + 3, 10, 12);
        ctx.drawImage(glowImg, Math.round(lp.x - 44), Math.round(lp.y + 8 - 44));
      });
    } else if (id === 'guild_hall' || id === 'blacksmith') {
      // Warm roaring forge/hearth ambient glow
      ctx.fillStyle = 'rgba(249, 115, 22, 0.09)';
      ctx.fillRect(0, 0, rw, rh);

      const forgeGlow = assetManager.getForgeGlow();
      ctx.drawImage(forgeGlow, Math.round(rw / 2 - 80), Math.round(180 - 80));
    }
  }

  // 5. Interactive Proximity Prompts: Pulsing highlight + retro [E] button badge
  private drawInteractionPrompts(
    ctx: CanvasRenderingContext2D,
    config: InteriorConfig,
    activeHotspotId: string | null,
    nearExit: boolean,
    player: PlayerCharacter
  ) {
    // A. Pulsing highlight ellipse under EVERY hotspot object
    config.hotspots.forEach((hs) => {
      const isCurrent = activeHotspotId === hs.id;
      const pulse = Math.sin(this.animTimer * TUNING.INTERIOR.PROMPT_PULSE_SPEED) * 0.2 + 0.8;
      ctx.save();
      ctx.fillStyle = isCurrent
        ? `rgba(250, 204, 21, ${0.38 * pulse})`
        : `rgba(245, 158, 11, ${0.16 * pulse})`;
      ctx.beginPath();
      ctx.ellipse(hs.x, hs.y + 12, hs.radius * 0.42, hs.radius * 0.20, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = isCurrent
        ? `rgba(253, 224, 71, ${0.75 * pulse})`
        : `rgba(245, 158, 11, ${0.35 * pulse})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    });

    // B. Retro [E] button badge above active target
    if (nearExit) {
      const { exitDoor } = config;
      this.drawPromptBadge(ctx, exitDoor.x + exitDoor.w / 2, exitDoor.y - 28, 'Exit to Town');
      return;
    }

    if (activeHotspotId) {
      const hs = config.hotspots.find((h) => h.id === activeHotspotId);
      if (hs) {
        this.drawPromptBadge(ctx, hs.x, hs.y - 32, hs.prompt);
      }
    }
  }

  private drawPromptBadge(ctx: CanvasRenderingContext2D, x: number, y: number, text: string) {
    ctx.save();
    ctx.font = '700 8px "Press Start 2P", monospace';
    const textW = ctx.measureText(text).width;
    const boxW = textW + 36;
    const boxH = 24;

    const bob = Math.sin(this.animTimer * TUNING.INTERIOR.PROMPT_PULSE_SPEED) * TUNING.INTERIOR.PROMPT_BOB_AMPLITUDE;
    const by = Math.round(y + bob);

    // Drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(Math.round(x - boxW / 2 + 2), Math.round(by - boxH / 2 + 2), boxW, boxH);

    // Dark panel with Amber/Gold border
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(Math.round(x - boxW / 2), Math.round(by - boxH / 2), boxW, boxH);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(Math.round(x - boxW / 2), Math.round(by - boxH / 2), boxW, boxH);

    // Retro [E] Keycap Badge
    const keyX = Math.round(x - boxW / 2 + 7);
    const keyY = Math.round(by - 7);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(keyX, keyY, 14, 14);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(keyX + 1, keyY + 1, 12, 12);
    ctx.fillStyle = '#fde047';
    ctx.font = '700 8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('E', keyX + 7, by);

    // Prompt Label Text
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'left';
    ctx.fillText(text, keyX + 17, by);

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
