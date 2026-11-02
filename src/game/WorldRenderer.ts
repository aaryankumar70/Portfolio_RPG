import { BuildingData, TimeOfDay, NPC, DepthObject } from '../types';
import { pixelAssets } from './PixelArtAssets';
import { PlayerCharacter } from './PlayerCharacter';
import { NPCManager } from './NPCManager';

interface Bird {
  x: number;
  y: number;
  speed: number;
}

export class WorldRenderer {
  public worldWidth = 2400;
  public worldHeight = 1800;
  private animTimer = 0;
  private birds: Bird[] = [
    { x: 100, y: 160, speed: 1.6 },
    { x: 60, y: 175, speed: 1.6 },
    { x: 380, y: 210, speed: 2.0 }
  ];

  public render(
    ctx: CanvasRenderingContext2D,
    cameraX: number,
    cameraY: number,
    timeOfDay: TimeOfDay,
    buildings: BuildingData[],
    npcManager: NPCManager,
    player: PlayerCharacter
  ) {
    this.animTimer += 0.035;

    // 1. LAYER 1: Vibrant Hyper Light Drifter Twilight Sky & Cosmic Clouds
    this.drawSkyAndMountains(ctx, cameraX, cameraY, timeOfDay);

    // 2. LAYER 2: Birds in Sky
    this.drawBirds(ctx, cameraX, cameraY);

    // 3. LAYER 3: Enchanted Ground & Bioluminescent River
    this.drawTerrain(ctx, cameraX, cameraY, timeOfDay);
    this.drawRiverAndWaterfall(ctx, cameraX, cameraY, timeOfDay);

    // 4. LAYER 4: Lavender Flagstones, District Paving & Bridges
    this.drawPathsAndDistricts(ctx, cameraX, cameraY);

    // 5. LAYER 5: Y-SORTED DEPTH RENDERING (Buildings, Trees, Campfire, NPCs, Player!)
    this.drawYSortedEntities(ctx, cameraX, cameraY, timeOfDay, buildings, npcManager, player);
  }

  // 1. Vibrant Twilight Sky & Cosmic Magenta Clouds with Ancient Titan Monoliths
  private drawSkyAndMountains(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number, timeOfDay: TimeOfDay) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    // Hyper Light Drifter Sky Gradients: Luminous twilight magenta & cosmic violet
    let skyColors: [string, string, string];
    if (timeOfDay === 'night') {
      skyColors = ['#0f071d', '#220b3b', '#451052'];
    } else if (timeOfDay === 'sunset') {
      // Iconic Hyper Light Drifter Twilight: Cosmic Indigo to Radiant Fuchsia-Magenta
      skyColors = ['#140728', '#400c54', '#86198f'];
    } else if (timeOfDay === 'morning') {
      skyColors = ['#160a2c', '#38145e', '#a21caf'];
    } else {
      skyColors = ['#18103c', '#43238a', '#c026d3'];
    }

    const grad = ctx.createLinearGradient(0, 0, 0, h * 0.7);
    grad.addColorStop(0, skyColors[0]);
    grad.addColorStop(0.5, skyColors[1]);
    grad.addColorStop(1, skyColors[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Distant Titan Ruin Citadels & Ancient Monoliths Silhouetted against the Horizon
    const titanParallax = cameraX * 0.04;
    ctx.fillStyle = '#180a29';
    // Titan Monolith 1 (Left)
    this.drawTitanSilhouette(ctx, 160 - titanParallax, h * 0.32, 70, 160);
    // Titan Citadel (Center-Left)
    this.drawTitanSilhouette(ctx, 480 - titanParallax, h * 0.26, 110, 200);
    // Ancient Spire (Center-Right)
    this.drawTitanSilhouette(ctx, 880 - titanParallax, h * 0.30, 85, 180);
    // Floating Anti-Gravity Ruin Blocks
    const floatBob1 = Math.sin(this.animTimer * 1.5) * 6;
    const floatBob2 = Math.cos(this.animTimer * 1.2) * 5;
    this.drawFloatingBlock(ctx, 310 - titanParallax, h * 0.16 + floatBob1, 36, 24);
    this.drawFloatingBlock(ctx, 720 - titanParallax, h * 0.12 + floatBob2, 48, 28);
    this.drawFloatingBlock(ctx, 1050 - titanParallax, h * 0.18 - floatBob1, 30, 20);

    // Volumetric Billowing Pillowy Clouds (Multi-layered Fuchsia, Magenta & Rose)
    const cloudParallax = cameraX * 0.07;
    // Back Cloud Layer (Deep Fuchsia)
    ctx.fillStyle = 'rgba(162, 28, 175, 0.55)';
    this.drawPixelCloud(ctx, 100 - cloudParallax, h * 0.16, 200, 55);
    this.drawPixelCloud(ctx, 520 - cloudParallax, h * 0.10, 240, 65);
    this.drawPixelCloud(ctx, 960 - cloudParallax, h * 0.18, 220, 58);

    // Mid Cloud Layer (Radiant Magenta)
    ctx.fillStyle = 'rgba(217, 70, 239, 0.7)';
    this.drawPixelCloud(ctx, 280 - cloudParallax, h * 0.22, 180, 50);
    this.drawPixelCloud(ctx, 740 - cloudParallax, h * 0.17, 210, 58);
    this.drawPixelCloud(ctx, 1180 - cloudParallax, h * 0.24, 190, 52);

    // Front Cloud Accents (Soft Orchid / Rose Peach)
    ctx.fillStyle = 'rgba(244, 114, 182, 0.45)';
    this.drawPixelCloud(ctx, 420 - cloudParallax, h * 0.28, 140, 36);
    this.drawPixelCloud(ctx, 860 - cloudParallax, h * 0.25, 160, 40);

    // Twinkling Stardust Motes
    if (timeOfDay === 'night' || timeOfDay === 'sunset') {
      const stars = [
        [0.08, 0.08], [0.2, 0.05], [0.35, 0.12], [0.52, 0.06],
        [0.68, 0.14], [0.84, 0.07], [0.15, 0.22], [0.44, 0.25],
        [0.76, 0.18], [0.92, 0.22]
      ];
      ctx.fillStyle = '#fef08a';
      stars.forEach(([sx, sy], i) => {
        if ((Math.floor(this.animTimer * 2 + i) % 3) !== 0) {
          ctx.fillRect(Math.floor(sx * w), Math.floor(sy * (h * 0.4)), 2, 2);
        }
      });

      // Luminous Full Moon
      const mx = Math.floor(w * 0.82);
      const my = Math.floor(h * 0.14);
      ctx.fillStyle = '#fdf4ff';
      ctx.fillRect(mx - 8, my - 16, 16, 32);
      ctx.fillRect(mx - 14, my - 12, 28, 24);
      ctx.fillRect(mx - 16, my - 8, 32, 16);
      // Soft magenta moonlit aura
      ctx.fillStyle = 'rgba(244, 114, 182, 0.2)';
      ctx.fillRect(mx - 22, my - 16, 44, 32);
    }

    // Parallax Mountain Ridge (Stepped Obsidian Silhouettes)
    const parallax = cameraX * 0.12;
    ctx.fillStyle = '#1e0c33';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.48);
    const pts = [
      [w * 0.1 - parallax, h * 0.28],
      [w * 0.3 - parallax, h * 0.38],
      [w * 0.5 - parallax, h * 0.22],
      [w * 0.7 - parallax, h * 0.34],
      [w * 0.9 - parallax, h * 0.26],
      [w + 100, h * 0.48]
    ];
    pts.forEach(([px, py]) => ctx.lineTo(px, py));
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
  }

  // Draw ancient titan monolith silhouette against sky
  private drawTitanSilhouette(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.fillRect(x, y, w, h);
    ctx.fillRect(x + 10, y - 20, w - 20, 20);
    ctx.fillRect(x + 18, y - 36, w - 36, 16);
    // Glowing cyan ocular slit / rune
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(x + Math.floor(w / 2) - 4, y + 25, 8, 3);
    ctx.fillStyle = '#180a29';
  }

  // Draw floating anti-gravity monolith in sky
  private drawFloatingBlock(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.fillStyle = '#220b3b';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#3b145e';
    ctx.fillRect(x + 3, y + 3, w - 6, h - 6);
    // Glowing cyan energy line
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(x + 6, y + Math.floor(h / 2), w - 12, 2);
  }

  // Cloud drawing helper (Hyper Light Drifter pillowy silhouette)
  private drawPixelCloud(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.fillRect(x, y, w, h);
    ctx.fillRect(x + 12, y - 12, w - 24, 12);
    ctx.fillRect(x + 28, y - 22, w - 56, 10);
    ctx.fillRect(x + 18, y + h, w - 36, 10);
  }

  // 2. Flying Birds
  private drawBirds(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    this.birds.forEach((b, idx) => {
      b.x += b.speed;
      if (b.x > this.worldWidth + 100) b.x = -50;
      const screenX = b.x - cameraX * 0.3;
      const screenY = b.y - cameraY * 0.3;
      const frame = Math.floor(this.animTimer * 4 + idx) % 2;
      pixelAssets.drawBird(ctx, screenX, screenY, frame);
    });
  }

  // 3. Ground Terrain (Radiant Hyper Light Drifter Pale Lavender Stone Plateau & Stepped Cliffs)
  private drawTerrain(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number, timeOfDay: TimeOfDay) {
    // Base explorable stone plateau: Pale lavender / rose-mauve stone (From reference image!)
    const plateauBase = '#cfa4c4';
    const plateauHighlight = '#dfb8d4';
    const cliffShadow = '#281438';
    const cliffDeep = '#190a24';

    // 1. Fill ground plateau with pale lavender stone
    ctx.fillStyle = plateauBase;
    ctx.fillRect(-cameraX, -cameraY, this.worldWidth, this.worldHeight);

    // 2. Geometric lavender stone pavers & cliff contours
    ctx.fillStyle = plateauHighlight;
    for (let gx = 0; gx < this.worldWidth; gx += 64) {
      for (let gy = 180; gy < this.worldHeight; gy += 48) {
        const px = gx - cameraX;
        const py = gy - cameraY;
        ctx.fillRect(px, py, 48, 36);
        ctx.fillRect(px + 4, py + 4, 40, 2);
      }
    }

    // 3. Stepped Geometric Cliff Edges with deep plum drop shadows
    ctx.fillStyle = cliffShadow;
    // Upper Northern Cliff Shelf
    ctx.fillRect(-cameraX, 340 - cameraY, this.worldWidth, 18);
    ctx.fillStyle = cliffDeep;
    ctx.fillRect(-cameraX, 358 - cameraY, this.worldWidth, 22);

    // Western River Cliff Shelf
    ctx.fillStyle = cliffShadow;
    ctx.fillRect(320 - cameraX, 380 - cameraY, 30, 1420);
    ctx.fillStyle = cliffDeep;
    ctx.fillRect(350 - cameraX, 380 - cameraY, 15, 1420);

    // 4. Inlaid Ancient Techno-Arcane Circuit Lines (Glowing Electric Cyan)
    ctx.fillStyle = '#22d3ee';
    // Grand circuit track from Plaza to Guild Hall
    ctx.fillRect(1358 - cameraX, 600 - cameraY, 4, 520);
    ctx.fillRect(1348 - cameraX, 680 - cameraY, 24, 4);
    ctx.fillRect(1348 - cameraX, 860 - cameraY, 24, 4);

    // Circuit track to Blacksmith
    ctx.fillRect(1360 - cameraX, 1118 - cameraY, 450, 4);
    ctx.fillRect(1620 - cameraX, 1108 - cameraY, 4, 24);

    // Circuit track to Bazaar
    ctx.fillRect(1360 - cameraX, 1220 - cameraY, 380, 4);

    // Glowing Cyan Circuit Nodes
    ctx.fillStyle = '#67e8f9';
    ctx.fillRect(1356 - cameraX, 678 - cameraY, 8, 8);
    ctx.fillRect(1356 - cameraX, 858 - cameraY, 8, 8);
    ctx.fillRect(1618 - cameraX, 1116 - cameraY, 8, 8);

    // 5. Bioluminescent Mint-Cyan Moss & Blooming Magenta Wild Flowers
    for (let gx = 40; gx < this.worldWidth; gx += 85) {
      for (let gy = 240; gy < this.worldHeight; gy += 75) {
        const px = gx - cameraX;
        const py = gy - cameraY;
        if ((gx + gy) % 2 === 0) {
          // Mint-cyan moss patch
          ctx.fillStyle = '#10b981';
          ctx.fillRect(px, py, 18, 8);
          ctx.fillStyle = '#2dd4bf';
          ctx.fillRect(px + 3, py - 2, 12, 3);
          ctx.fillRect(px + 6, py + 1, 4, 4);
        } else if ((gx + gy) % 3 === 0) {
          // Vivid magenta/orchid wild flowers
          ctx.fillStyle = '#f43f5e';
          ctx.fillRect(px + 8, py - 3, 3, 3);
          ctx.fillRect(px + 14, py - 2, 2, 2);
          ctx.fillStyle = '#e879f9';
          ctx.fillRect(px + 6, py - 1, 2, 2);
        }
      }
    }
  }

  // Bioluminescent Emerald-Cyan Water & Luminous Waterfall (From Reference Image!)
  private drawRiverAndWaterfall(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number, timeOfDay: TimeOfDay) {
    // Radiant crystalline turquoise/mint-emerald water palette
    const waterBase = '#0d7a6b';
    const waterMid = '#14b8a6';
    const waterHighlight = '#2dd4bf';
    const waterShimmer = '#a5f3fc';
    const waterPure = '#ffffff';

    ctx.save();
    // 1. Broad River & Lagoon Bed
    ctx.fillStyle = waterBase;
    ctx.beginPath();
    ctx.moveTo(960 - cameraX, 360 - cameraY);
    ctx.bezierCurveTo(900 - cameraX, 600 - cameraY, 780 - cameraX, 900 - cameraY, 700 - cameraX, 1100 - cameraY);
    ctx.bezierCurveTo(620 - cameraX, 1300 - cameraY, 520 - cameraX, 1500 - cameraY, 480 - cameraX, 1800 - cameraY);
    ctx.lineTo(260 - cameraX, 1800 - cameraY);
    ctx.bezierCurveTo(320 - cameraX, 1500 - cameraY, 440 - cameraX, 1300 - cameraY, 520 - cameraX, 1100 - cameraY);
    ctx.bezierCurveTo(620 - cameraX, 900 - cameraY, 740 - cameraX, 600 - cameraY, 800 - cameraX, 360 - cameraY);
    ctx.closePath();
    ctx.fill();

    // 2. Inner Glowing Mint-Emerald Water Stream
    ctx.fillStyle = waterMid;
    ctx.beginPath();
    ctx.moveTo(940 - cameraX, 380 - cameraY);
    ctx.bezierCurveTo(880 - cameraX, 600 - cameraY, 760 - cameraX, 900 - cameraY, 680 - cameraX, 1100 - cameraY);
    ctx.bezierCurveTo(600 - cameraX, 1300 - cameraY, 500 - cameraX, 1500 - cameraY, 460 - cameraX, 1800 - cameraY);
    ctx.lineTo(340 - cameraX, 1800 - cameraY);
    ctx.bezierCurveTo(380 - cameraX, 1500 - cameraY, 480 - cameraX, 1300 - cameraY, 560 - cameraX, 1100 - cameraY);
    ctx.bezierCurveTo(650 - cameraX, 900 - cameraY, 760 - cameraX, 600 - cameraY, 820 - cameraX, 380 - cameraY);
    ctx.closePath();
    ctx.fill();

    // 3. River Bank Obsidian-Plum Stone Border with Cyan Lichen
    ctx.strokeStyle = '#22112e';
    ctx.lineWidth = 6;
    ctx.stroke();

    // 4. DISTINCTIVE HYPER LIGHT DRIFTER HORIZONTAL SHIMMER LINES
    // Crisp horizontal white & cyan ripple bars drifting across the water surface
    const flowFrame = Math.floor(this.animTimer * 6);
    for (let i = 0; i < 36; i++) {
      const offset = ((flowFrame * 12 + i * 50) % 1450);
      const rx = 820 - (offset * 0.26) - cameraX;
      const ry = 390 + offset - cameraY;
      const rippleWidth = 24 + ((i * 7) % 32);

      // Cyan ripple body
      ctx.fillStyle = waterHighlight;
      ctx.fillRect(Math.floor(rx), Math.floor(ry), rippleWidth, 2);
      // Bright white/cyan shimmer highlight
      ctx.fillStyle = (i % 2 === 0) ? waterPure : waterShimmer;
      ctx.fillRect(Math.floor(rx + 4), Math.floor(ry), Math.floor(rippleWidth * 0.5), 1);
    }

    // 5. Sunken Ancient Stepping Stones in River
    const stones = [
      { x: 740, y: 720, r: 16 },
      { x: 710, y: 760, r: 20 },
      { x: 670, y: 980, r: 18 },
      { x: 630, y: 1220, r: 22 },
      { x: 580, y: 1380, r: 19 },
      { x: 520, y: 1540, r: 24 }
    ];
    stones.forEach(st => {
      pixelAssets.drawSteppingStone(ctx, st.x - cameraX, st.y - cameraY, st.r);
    });

    // 6. Upper Cliffside Waterfall (Luminous Cyan Cascade)
    const wfX = 960 - cameraX;
    const wfY = 380 - cameraY;
    ctx.fillStyle = '#14b8a6';
    ctx.fillRect(wfX - 34, wfY - 60, 68, 85);

    // Animated White/Cyan Foam Streaks
    ctx.fillStyle = '#ecfeff';
    const foamOffset = (Math.floor(this.animTimer * 14) % 6) * 4;
    for (let col = -28; col <= 28; col += 8) {
      ctx.fillRect(wfX + col, wfY - 50 + foamOffset, 4, 20);
    }
    const poolBob = Math.floor(Math.sin(this.animTimer * 6) * 3);
    ctx.fillRect(wfX - 40, wfY + 22 + poolBob, 80, 8);
    ctx.fillStyle = '#2dd4bf';
    ctx.fillRect(wfX - 30, wfY + 30 + poolBob, 60, 6);

    ctx.restore();
  }

  // 4. Lavender Flagstones, District Paving & Bridges
  private drawPathsAndDistricts(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    ctx.save();

    // Central Plaza: Centered at (1360, 1120)
    const plazaX = Math.floor(1360 - cameraX);
    const plazaY = Math.floor(1120 - cameraY);

    // Lavender/Mauve Flagstone Plaza Area (District A)
    const flagstonePat = pixelAssets.getFlagstonePattern(ctx);
    ctx.fillStyle = flagstonePat;
    ctx.fillRect(plazaX - 190, plazaY - 170, 380, 340);

    // Neon-cyan rune inlay border
    ctx.strokeStyle = '#2dd4bf';
    ctx.lineWidth = 2;
    ctx.strokeRect(plazaX - 190, plazaY - 170, 380, 340);

    // Cobblestone Thoroughfares connecting Districts
    const cobblePat = pixelAssets.getCobblePattern(ctx);
    ctx.fillStyle = cobblePat;

    // Avenue North to Guild District
    ctx.fillRect(plazaX - 36, plazaY - 260, 72, 100);
    ctx.fillRect(plazaX - 36, plazaY - 500, 72, 250);

    // Avenue East to Crafting District
    ctx.fillRect(plazaX + 180, plazaY - 30, 260, 60);

    // Avenue South-East to Market District
    ctx.fillRect(plazaX + 160, plazaY + 100, 260, 60);

    // Avenue West to Market District & River Crossing
    ctx.fillRect(plazaX - 360, plazaY + 10, 180, 60);

    // Avenue North-West to Knowledge District
    ctx.fillRect(plazaX - 340, plazaY - 160, 180, 55);

    // Stone Bridges Crossing River:
    this.drawPixelBridge(ctx, 640 - cameraX, 1140 - cameraY, 130, 44);
    this.drawPixelBridge(ctx, 810 - cameraX, 830 - cameraY, 130, 44);

    ctx.restore();
  }

  private drawPixelBridge(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    const bx = Math.floor(x - w / 2);
    const by = Math.floor(y - h / 2);

    const pattern = pixelAssets.getWoodPlankPattern(ctx);
    ctx.fillStyle = pattern;
    ctx.fillRect(bx, by, w, h);

    // Cyan glowing iron curbs
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(bx, by, w, 3);
    ctx.fillRect(bx, by + h - 3, w, 3);

    // Balusters
    ctx.fillStyle = '#2dd4bf';
    for (let rx = 4; rx < w - 4; rx += 14) {
      ctx.fillRect(bx + rx, by - 5, 3, 6);
      ctx.fillRect(bx + rx, by + h - 1, 3, 6);
    }
    ctx.fillStyle = '#67e8f9';
    ctx.fillRect(bx, by - 6, w, 2);
    ctx.fillRect(bx, by + h + 4, w, 2);
  }

  // -------------------------------------------------------------
  // 5. Y-SORTED DEPTH RENDERING (Buildings, Trees, Campfire, NPCs, Player!)
  // -------------------------------------------------------------
  private drawYSortedEntities(
    ctx: CanvasRenderingContext2D,
    cameraX: number,
    cameraY: number,
    timeOfDay: TimeOfDay,
    buildings: BuildingData[],
    npcManager: NPCManager,
    player: PlayerCharacter
  ) {
    const depthList: DepthObject[] = [];

    // 1. Buildings
    buildings.forEach((b) => {
      const bx = Math.floor(b.x - cameraX);
      const by = Math.floor(b.y - cameraY);
      const baseY = b.y + b.height;

      depthList.push({
        y: baseY,
        render: (c) => {
          c.save();
          // Violet ambient ground shadow
          c.fillStyle = 'rgba(15, 10, 28, 0.65)';
          c.fillRect(bx - 6, by + b.height - 8, b.width + 12, 16);

          if (b.id === 'guild_hall') {
            this.drawGuildHall(c, bx, by, b.width, b.height, timeOfDay);
          } else if (b.id === 'blacksmith') {
            this.drawBlacksmith(c, bx, by, b.width, b.height, timeOfDay);
          } else if (b.id === 'coffee_shop') {
            this.drawCoffeeShop(c, bx, by, b.width, b.height, timeOfDay);
          } else if (b.id === 'project_bazaar') {
            this.drawProjectBazaar(c, bx, by, b.width, b.height, timeOfDay);
          } else if (b.id === 'library') {
            this.drawLibrary(c, bx, by, b.width, b.height, timeOfDay);
          } else if (b.id === 'observatory') {
            this.drawObservatory(c, bx, by, b.width, b.height, timeOfDay);
          } else if (b.id === 'academy') {
            this.drawAcademy(c, bx, by, b.width, b.height, timeOfDay);
          } else {
            this.drawGenericCivic(c, bx, by, b.width, b.height, b.name, timeOfDay);
          }

          this.drawPixelShopSign(c, bx + Math.floor(b.width / 2), by + 32, b.name, b.themeColor);
          c.restore();
        }
      });
    });

    // 2. Celestial Sakura Trees (Vibrant Magenta & Lavender)
    const trees = [
      { x: 520, y: 560, r: 42 },
      { x: 1080, y: 560, r: 46 },
      { x: 1560, y: 560, r: 46 },
      { x: 2100, y: 650, r: 50 },
      { x: 480, y: 960, r: 40 },
      { x: 1620, y: 1060, r: 42 },
      { x: 1120, y: 1500, r: 44 },
      { x: 2050, y: 1460, r: 48 }
    ];
    trees.forEach((t) => {
      const tx = Math.floor(t.x - cameraX);
      const ty = Math.floor(t.y - cameraY);
      const baseY = t.y + t.r;

      depthList.push({
        y: baseY,
        render: (c) => this.drawCelestialSakuraTree(c, tx, ty, t.r)
      });
    });

    // 2b. Ancient Titan Ruin Monoliths (Directly from Hyper Light Drifter)
    const monoliths = [
      { x: 380, y: 640, w: 42, h: 90 },
      { x: 910, y: 440, w: 48, h: 110 },
      { x: 1980, y: 600, w: 44, h: 95 },
      { x: 420, y: 1280, w: 46, h: 100 },
      { x: 1720, y: 1480, w: 40, h: 85 }
    ];
    monoliths.forEach((m) => {
      const mx = Math.floor(m.x - cameraX);
      const my = Math.floor(m.y - cameraY);
      depthList.push({
        y: m.y,
        render: (c) => pixelAssets.drawAncientRuinMonolith(c, mx, my, m.w, m.h)
      });
    });

    // 3. Central Mana Crystal Fountain Basin
    depthList.push({
      y: 1120 + 28,
      render: (c) => this.drawCentralFountain(c, cameraX, cameraY, timeOfDay)
    });

    // 4. ANIMATED CAMPFIRE LANDMARK (Directly from Hyper Light Drifter reference image!)
    depthList.push({
      y: 1240, // Situated near the town center
      render: (c) => {
        const cx = Math.floor(1420 - cameraX);
        const cy = Math.floor(1240 - cameraY);
        pixelAssets.drawCampfire(c, cx, cy, this.animTimer);
      }
    });

    // 5. District Noticeboard
    depthList.push({
      y: 1260 + 10,
      render: (c) => {
        const nx = Math.floor(1300 - cameraX);
        const ny = Math.floor(1260 - cameraY);
        c.fillStyle = '#26122a';
        c.fillRect(nx - 2, ny - 16, 4, 16);
        c.fillRect(nx + 18, ny - 16, 4, 16);
        c.fillRect(nx - 4, ny - 24, 28, 16);
        c.fillStyle = '#fef08a';
        c.fillRect(nx - 1, ny - 21, 8, 10);
        c.fillRect(nx + 11, ny - 21, 8, 10);
      }
    });

    // 6. Bioluminescent Street Lampposts
    const lampposts = [
      { x: 1160, y: 940 },
      { x: 1560, y: 940 },
      { x: 1160, y: 1300 },
      { x: 1560, y: 1300 },
      { x: 920, y: 1140 },
      { x: 1780, y: 1140 }
    ];
    lampposts.forEach((lp) => {
      const lx = Math.floor(lp.x - cameraX);
      const ly = Math.floor(lp.y - cameraY);
      depthList.push({
        y: lp.y,
        render: (c) => pixelAssets.drawPixelLantern(c, lx, ly, timeOfDay === 'night' || timeOfDay === 'sunset')
      });
    });

    // 7. NPCs
    npcManager.npcs.forEach((npc) => {
      depthList.push({
        y: npc.y,
        render: (c) => npcManager.renderNPC(c, npc, cameraX, cameraY, this.animTimer)
      });
    });

    // 8. Player Character
    depthList.push({
      y: player.state.y,
      render: (c) => player.render(c, cameraX, cameraY)
    });

    // SORT ALL BY BASE Y
    depthList.sort((a, b) => a.y - b.y);

    depthList.forEach((item) => item.render(ctx));
  }

  // Central Prismatic Mana Fountain
  private drawCentralFountain(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number, timeOfDay: TimeOfDay) {
    const fx = Math.floor(1360 - cameraX);
    const fy = Math.floor(1120 - cameraY);

    ctx.save();
    // Basin Rim
    ctx.fillStyle = '#1c1530';
    ctx.fillRect(fx - 46, fy - 28, 92, 56);
    ctx.fillRect(fx - 36, fy - 36, 72, 72);
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2;
    ctx.strokeRect(fx - 46, fy - 28, 92, 56);

    // Glowing Bioluminescent Cyan Pool inside basin
    ctx.fillStyle = '#0d9488';
    ctx.fillRect(fx - 36, fy - 22, 72, 44);
    ctx.fillRect(fx - 28, fy - 28, 56, 56);
    ctx.fillStyle = '#2dd4bf';
    ctx.fillRect(fx - 24, fy - 18, 48, 36);

    // Center Pedestal
    ctx.fillStyle = '#311a47';
    ctx.fillRect(fx - 12, fy - 14, 24, 24);

    // Floating Giant Prismatic Mana Crystal (Pulses with cyan, magenta, violet!)
    const bob = Math.floor(Math.sin(this.animTimer * 3) * 4);
    const cy = fy - 24 + bob;

    // Glowing Radial Aura
    const auraRad = 55 + Math.sin(this.animTimer * 5) * 6;
    const aura = ctx.createRadialGradient(fx, cy, 4, fx, cy, auraRad);
    aura.addColorStop(0, 'rgba(34, 211, 238, 0.7)');
    aura.addColorStop(0.5, 'rgba(217, 70, 239, 0.35)');
    aura.addColorStop(1, 'transparent');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(fx, cy, auraRad, 0, Math.PI * 2);
    ctx.fill();

    // Crystal Polygon
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(fx - 2, cy - 22, 4, 4);
    ctx.fillRect(fx - 6, cy - 18, 12, 6);
    ctx.fillRect(fx - 10, cy - 12, 20, 14);
    ctx.fillRect(fx - 6, cy + 2, 12, 6);
    ctx.fillRect(fx - 2, cy + 8, 4, 4);

    // Magenta & Cyan Facet Highlights
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(fx - 4, cy - 14, 4, 12);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(fx - 1, cy - 18, 3, 18);

    if (Math.floor(this.animTimer * 6) % 2 === 0) {
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(fx - 14, cy - 8, 2, 2);
      ctx.fillRect(fx + 12, cy + 4, 2, 2);
    }
    ctx.restore();
  }

  // Guild Hall
  private drawGuildHall(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, timeOfDay: TimeOfDay) {
    ctx.fillStyle = '#1e1b36';
    ctx.fillRect(x, y + 40, w, h - 40);

    // Violet Slate Roof
    ctx.fillStyle = '#130d24';
    for (let r = 0; r < 40; r += 4) {
      const rw = w + 20 - (r * (w / 40));
      const rx = x - 10 + (r * (w / 80));
      ctx.fillRect(Math.floor(rx), y + 40 - r, Math.floor(rw), 4);
    }

    // Spires with Cyan Neon Caps
    ctx.fillStyle = '#18122c';
    ctx.fillRect(x + 12, y + 10, 32, 60);
    ctx.fillRect(x + w - 44, y + 10, 32, 60);
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(x + 26, y - 4, 4, 14);
    ctx.fillRect(x + w - 30, y - 4, 4, 14);

    // Glowing Rose-Magenta Stained-Glass Window
    const rx = x + Math.floor(w / 2);
    const ry = y + 75;
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(rx - 16, ry - 16, 32, 32);
    ctx.fillStyle = '#d946ef';
    ctx.fillRect(rx - 10, ry - 10, 20, 20);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(rx - 4, ry - 4, 8, 8);
    ctx.fillStyle = '#130d24';
    ctx.fillRect(rx - 16, ry - 1, 32, 2);
    ctx.fillRect(rx - 1, ry - 16, 2, 32);

    // Guild Banners (Crimson with Gold)
    const drawBanner = (bx: number) => {
      ctx.fillStyle = '#9d174d';
      ctx.fillRect(bx, y + 80, 24, 70);
      ctx.fillStyle = '#1e1b36';
      ctx.fillRect(bx + 4, y + 146, 16, 4);
      ctx.fillRect(bx + 8, y + 142, 8, 4);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(bx + 9, y + 100, 6, 18);
      ctx.fillRect(bx + 5, y + 106, 14, 5);
    };
    drawBanner(x + 55);
    drawBanner(x + w - 79);

    const dw = 52;
    const dh = 68;
    const dx = x + Math.floor(w / 2) - dw / 2;
    const dy = y + h - dh;
    ctx.fillStyle = '#2b1028';
    ctx.fillRect(dx, dy, dw, dh);
    ctx.fillStyle = '#120410';
    ctx.fillRect(dx + 25, dy, 2, dh);
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(dx + 20, dy + 34, 3, 5);
    ctx.fillRect(dx + 29, dy + 34, 3, 5);

    pixelAssets.drawPixelLantern(ctx, dx - 16, dy + 20, true);
    pixelAssets.drawPixelLantern(ctx, dx + dw + 16, dy + 20, true);
  }

  // Blacksmith Forge
  private drawBlacksmith(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, timeOfDay: TimeOfDay) {
    ctx.fillStyle = '#1c1926';
    ctx.fillRect(x, y + 30, w, h - 30);
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(x, y + 30, w, 2); // neon cyan trim

    ctx.fillStyle = '#120e1c';
    ctx.fillRect(x - 8, y + 15, w + 16, 16);
    ctx.fillRect(x + 4, y + 2, w - 8, 14);

    // Chimney emitting violet smoke
    ctx.fillStyle = '#2e253d';
    ctx.fillRect(x + 20, y - 20, 24, 38);
    ctx.fillStyle = 'rgba(217, 70, 239, 0.45)';
    const smokeY = (Math.floor(this.animTimer * 10) % 20);
    ctx.fillRect(x + 24, y - 26 - smokeY, 8, 8);
    ctx.fillRect(x + 26, y - 36 - smokeY, 12, 10);

    // Roaring Plasma Forge
    const fx = x + 35;
    const fy = y + 75;
    ctx.fillStyle = '#0f0a17';
    ctx.fillRect(fx, fy, 68, 68);

    const fireFrame = Math.floor(this.animTimer * 8) % 3;
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(fx + 6, fy + 24, 56, 40);
    ctx.fillStyle = '#f97316';
    ctx.fillRect(fx + 12 + fireFrame, fy + 16, 44, 36);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(fx + 20 - fireFrame, fy + 8, 28, 30);

    pixelAssets.drawPixelAnvil(ctx, x + w - 65, y + h - 16);
    pixelAssets.drawPixelBarrel(ctx, x + 16, y + h - 12);
  }

  // Coffee Shop & Tavern
  private drawCoffeeShop(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, timeOfDay: TimeOfDay) {
    ctx.fillStyle = '#2b1a30';
    ctx.fillRect(x, y + 30, w, h - 30);
    ctx.fillStyle = '#160c1c';
    ctx.fillRect(x, y + 30, w, 4);
    ctx.fillRect(x + 30, y + 30, 4, h - 30);
    ctx.fillRect(x + w - 34, y + 30, 4, h - 30);

    ctx.fillStyle = '#4a2542';
    ctx.fillRect(x - 8, y + 16, w + 16, 15);
    ctx.fillRect(x + 10, y + 2, w - 20, 15);

    // Magenta & Cream Awning
    const awningY = y + 80;
    for (let ax = 0; ax < w - 20; ax += 16) {
      ctx.fillStyle = (ax / 16) % 2 === 0 ? '#c026d3' : '#fdf4ff';
      ctx.fillRect(x + 10 + ax, awningY, 16, 18);
    }

    // Glowing Warm Rose-Amber Windows
    ctx.fillStyle = '#fde047';
    ctx.fillRect(x + 28, y + 42, 32, 28);
    ctx.fillRect(x + w - 60, y + 42, 32, 28);
    ctx.fillStyle = '#160c1c';
    ctx.fillRect(x + 43, y + 42, 2, 28);
    ctx.fillRect(x + 28, y + 55, 32, 2);
    ctx.fillRect(x + w - 45, y + 42, 2, 28);
    ctx.fillRect(x + w - 60, y + 55, 32, 2);

    ctx.fillStyle = '#4a2647';
    ctx.fillRect(x + 35, y + h - 16, 20, 8);
    ctx.fillRect(x + 43, y + h - 8, 4, 8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 42, y + h - 21, 6, 5);
  }

  // Project Bazaar (Vibrant Neon-Striped Market Canopy)
  private drawProjectBazaar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, timeOfDay: TimeOfDay) {
    ctx.fillStyle = '#291430';
    ctx.fillRect(x + 16, y + 50, w - 32, h - 50);

    const ch = 48;
    for (let cx = 0; cx < w; cx += 20) {
      // Neon Magenta & Electric Cyan Striped Canopy!
      ctx.fillStyle = (cx / 20) % 2 === 0 ? '#d946ef' : '#22d3ee';
      ctx.fillRect(x + cx, y + 10, 20, ch);
      ctx.fillRect(x + cx + 4, y + 10 + ch, 12, 4);
    }

    for (let lx = 25; lx < w - 20; lx += 35) {
      ctx.fillStyle = '#fde047';
      ctx.fillRect(x + lx, y + 10 + ch + 8, 6, 8);
      ctx.fillStyle = '#171717';
      ctx.fillRect(x + lx + 2, y + 10 + ch + 4, 2, 4);
    }

    ctx.fillStyle = '#1e0c24';
    ctx.fillRect(x + 26, y + h - 42, w - 52, 22);

    pixelAssets.drawPixelCrate(ctx, x + 8, y + h - 10);
    pixelAssets.drawPixelCrate(ctx, x + 20, y + h - 18);
    pixelAssets.drawPixelBarrel(ctx, x + w - 16, y + h - 10);
  }

  // Ancient Library (Gothic Arcane Tower with Cyan Runes)
  private drawLibrary(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, timeOfDay: TimeOfDay) {
    ctx.fillStyle = '#1a1f33';
    ctx.fillRect(x + 16, y + 30, w - 32, h - 30);
    ctx.fillStyle = '#0d9488'; // glowing verdigris
    ctx.fillRect(x + 8, y + 10, w - 16, 22);
    ctx.fillRect(x + 24, y - 4, w - 48, 16);

    for (let win = 0; win < 3; win++) {
      const wx = x + 35 + win * 65;
      const wy = y + 55;
      ctx.fillStyle = '#67e8f9';
      ctx.fillRect(wx, wy, 32, 54);
      ctx.fillStyle = '#3b0764';
      ctx.fillRect(wx + 4, wy + 16, 24, 4);
      ctx.fillRect(wx + 4, wy + 32, 24, 4);
      ctx.fillStyle = '#0f172a';
      ctx.strokeRect(wx, wy, 32, 54);
    }
  }

  // Celestial Observatory
  private drawObservatory(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, timeOfDay: TimeOfDay) {
    ctx.fillStyle = '#161930';
    ctx.fillRect(x + 20, y + 45, w - 40, h - 45);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(x + 24, y + 10, w - 48, 36);
    ctx.fillRect(x + 38, y - 2, w - 76, 14);
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(x + Math.floor(w / 2) + 6, y + 10, 36, 8);
    ctx.fillRect(x + Math.floor(w / 2) + 38, y + 8, 8, 12);
  }

  // Grand Academy
  private drawAcademy(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, timeOfDay: TimeOfDay) {
    ctx.fillStyle = '#171a33';
    ctx.fillRect(x, y + 35, w, h - 35);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(x + 16, y - 10, 24, 46);
    ctx.fillRect(x + w - 40, y - 10, 24, 46);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(x + 26, y - 24, 4, 15);
    ctx.fillRect(x + w - 30, y - 24, 4, 15);
  }

  // Generic Civic
  private drawGenericCivic(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, name: string, timeOfDay: TimeOfDay) {
    ctx.fillStyle = '#1a182e';
    ctx.fillRect(x, y + 30, w, h - 30);
    ctx.fillStyle = '#100e1f';
    ctx.fillRect(x - 6, y + 15, w + 12, 16);
  }

  // In-World Pixel Shop Sign (Stylized Cyan/Magenta border)
  private drawPixelShopSign(ctx: CanvasRenderingContext2D, x: number, y: number, name: string, color: string) {
    ctx.save();
    ctx.font = '700 8px "Press Start 2P", monospace';
    const textW = ctx.measureText(name).width;
    const pad = 8;
    const sx = Math.floor(x - textW / 2 - pad);
    const sy = Math.floor(y);

    ctx.fillStyle = '#0d091a';
    ctx.fillRect(sx, sy, Math.floor(textW + pad * 2), 16);
    ctx.fillStyle = '#2dd4bf'; // cyan top accent
    ctx.fillRect(sx + 1, sy + 1, Math.floor(textW + pad * 2) - 2, 1);
    ctx.fillStyle = '#f43f5e'; // magenta bottom accent
    ctx.fillRect(sx + 1, sy + 15, Math.floor(textW + pad * 2) - 2, 1);

    ctx.fillStyle = '#fdf4ff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, x, sy + 9);
    ctx.restore();
  }

  // Celestial Sakura Tree (Vibrant Magenta, Fuchsia, Lavender)
  private drawCelestialSakuraTree(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    ctx.save();
    ctx.fillStyle = 'rgba(15, 10, 28, 0.45)';
    ctx.fillRect(x - r + 6, y + r - 6, r * 2 - 12, 10);

    // Dark indigo trunk with glowing cyan moss
    ctx.fillStyle = '#1c152e';
    ctx.fillRect(x - 6, y + 8, 12, r - 8);
    ctx.fillStyle = '#2dd4bf';
    ctx.fillRect(x - 4, y + 14, 2, 6);

    const sway = Math.floor(Math.sin(this.animTimer + x * 0.01) * 3);
    // Vibrant Hyper Light Drifter Palette: Fuchsia, Magenta, Pink, Pale Lavender
    const clusters = [
      { dx: 0, dy: -r * 0.4, cr: r * 0.7, col: '#c026d3' },
      { dx: -r * 0.35 + sway, dy: -r * 0.15, cr: r * 0.6, col: '#d946ef' },
      { dx: r * 0.35 + sway, dy: -r * 0.15, cr: r * 0.6, col: '#e879f9' },
      { dx: 0 + sway, dy: 0, cr: r * 0.55, col: '#f472b6' }
    ];

    clusters.forEach((c) => {
      const cx = Math.floor(x + c.dx);
      const cy = Math.floor(y + c.dy);
      const rad = Math.floor(c.cr);
      ctx.fillStyle = c.col;
      ctx.fillRect(cx - rad, cy - rad + 4, rad * 2, rad * 2 - 8);
      ctx.fillRect(cx - rad + 4, cy - rad, rad * 2 - 8, rad * 2);
    });

    ctx.restore();
  }

  // Atmospheric Lighting Shader (Hyper Light Drifter cinematic vignette + radiant bloom)
  public renderLightingShader(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number, timeOfDay: TimeOfDay) {
    ctx.save();
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    // 1. Cinematic Corner Vignette (Leaves the center crisp & brilliant!)
    const cxCenter = w / 2;
    const cyCenter = h / 2;
    const maxRadius = Math.hypot(cxCenter, cyCenter);
    const vignette = ctx.createRadialGradient(cxCenter, cyCenter, maxRadius * 0.45, cxCenter, cyCenter, maxRadius);
    vignette.addColorStop(0, 'transparent');
    vignette.addColorStop(0.7, 'rgba(20, 10, 34, 0.2)');
    vignette.addColorStop(1, timeOfDay === 'night' ? 'rgba(12, 6, 22, 0.65)' : 'rgba(25, 10, 42, 0.45)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    // 2. Radiant Additive / Screen Bloom for Light Sources
    ctx.globalCompositeOperation = 'screen';

    // A. Campfire Radiant Amber Bloom (From Reference Image!)
    const cx = Math.floor(1420 - cameraX);
    const cy = Math.floor(1240 - cameraY);
    if (cx > -180 && cx < w + 180 && cy > -180 && cy < h + 180) {
      const fireGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 180);
      fireGlow.addColorStop(0, 'rgba(254, 240, 138, 0.55)');
      fireGlow.addColorStop(0.35, 'rgba(251, 113, 133, 0.35)');
      fireGlow.addColorStop(0.7, 'rgba(192, 38, 211, 0.15)');
      fireGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = fireGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.fill();
    }

    // B. Central Mana Crystal Fountain (Radiant Electric Cyan Bloom)
    const fx = Math.floor(1360 - cameraX);
    const fy = Math.floor(1120 - cameraY);
    if (fx > -220 && fx < w + 220 && fy > -220 && fy < h + 220) {
      const crystalGlow = ctx.createRadialGradient(fx, fy, 25, fx, fy, 220);
      crystalGlow.addColorStop(0, 'rgba(34, 211, 238, 0.65)');
      crystalGlow.addColorStop(0.4, 'rgba(217, 70, 239, 0.35)');
      crystalGlow.addColorStop(0.8, 'rgba(147, 51, 234, 0.15)');
      crystalGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = crystalGlow;
      ctx.beginPath();
      ctx.arc(fx, fy, 220, 0, Math.PI * 2);
      ctx.fill();
    }

    // C. Blacksmith Plasma Forge Glow
    const forgeX = Math.floor(1810 - cameraX);
    const forgeY = Math.floor(960 - cameraY);
    if (forgeX > -180 && forgeX < w + 180 && forgeY > -180 && forgeY < h + 180) {
      const forgeGlow = ctx.createRadialGradient(forgeX, forgeY, 15, forgeX, forgeY, 160);
      forgeGlow.addColorStop(0, 'rgba(249, 115, 22, 0.6)');
      forgeGlow.addColorStop(0.4, 'rgba(244, 63, 94, 0.35)');
      forgeGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = forgeGlow;
      ctx.beginPath();
      ctx.arc(forgeX, forgeY, 160, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}
