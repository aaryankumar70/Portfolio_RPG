import { BuildingData, TimeOfDay, NPC, DepthObject } from '../types';
import { pixelAssets } from './PixelArtAssets';
import { PlayerCharacter } from './PlayerCharacter';
import { NPCManager } from './NPCManager';
import { MangoPet } from './MangoPet';
import { assetManager } from './AssetManager';
import { TUNING } from './TUNING';

interface Bird {
  x: number;
  y: number;
  speed: number;
}

export class WorldRenderer {
  public worldWidth = 2800;
  public worldHeight = 2200;
  private animTimer = 0;
  private birds: Bird[] = [
    { x: 120, y: 180, speed: 1.8 },
    { x: 80, y: 195, speed: 1.8 },
    { x: 450, y: 220, speed: 2.2 }
  ];

  public static readonly BUILDING_SPRITE_MAP: Record<string, string> = {
    coffee_shop: '/assets/buildings/coffee_shop.png',
    guild_hall: '/assets/buildings/guild_hall.png',
    python_cave: '/assets/buildings/python_cave.png',
    garden: '/assets/buildings/garden.png',
    sql_mines: '/assets/buildings/sql_mines.png',
    blacksmith: '/assets/buildings/blacksmith.png',
    library: '/assets/buildings/library.png',
    home: '/assets/buildings/home.png',
    analytics_tower: '/assets/buildings/analytics_tower.png',
    ml_lab: '/assets/buildings/ml_laboratory.png',
    boss_arena: '/assets/buildings/boss_arena.png',
    post_office: '/assets/buildings/post_office.png'
  };

  public render(
    ctx: CanvasRenderingContext2D,
    cameraX: number,
    cameraY: number,
    timeOfDay: TimeOfDay,
    buildings: BuildingData[],
    npcManager: NPCManager,
    player: PlayerCharacter,
    mangoPet?: MangoPet
  ) {
    this.animTimer += 0.035;

    // 1. Natural Green Grass Meadow Terrain
    this.drawTerrain(ctx, cameraX, cameraY, timeOfDay);

    // 2. Connected Cobblestone Roads & Central Plaza
    this.drawRoadsAndPlaza(ctx, cameraX, cameraY);

    // 3. Eastern River with Bridge
    this.drawRiver(ctx, cameraX, cameraY);

    // 4. Birds in the Sky
    this.drawBirds(ctx, cameraX, cameraY);

    // 5. Y-Sorted Entities (Buildings, Trees, Fountain, NPCs, Mango, Player, Foliage)
    this.drawYSortedEntities(ctx, cameraX, cameraY, timeOfDay, buildings, npcManager, player, mangoPet);
  }

  // 1. Natural Green Grass Meadow Terrain with Wildflowers & Foliage
  private drawTerrain(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number, timeOfDay: TimeOfDay) {
    const grassPattern = pixelAssets.getGrassPattern(ctx);
    ctx.fillStyle = grassPattern;
    ctx.fillRect(-cameraX, -cameraY, this.worldWidth, this.worldHeight);

    // Organic meadow tone shifts & grass tufts
    ctx.fillStyle = 'rgba(34, 109, 62, 0.35)';
    for (let gx = 120; gx < this.worldWidth - 120; gx += 140) {
      for (let gy = 360; gy < this.worldHeight - 120; gy += 110) {
        const px = gx - cameraX;
        const py = gy - cameraY;
        const offset = ((gx * 17 + gy * 31) % 40) - 20;
        ctx.fillRect(px + offset, py, 22, 6);
        ctx.fillRect(px + offset + 4, py - 3, 14, 3);
      }
    }

    // Handcrafted Wildflower Clusters (Poppies, Buttercups, Daisies, Lavender)
    const flowerClusters = [
      { x: 920, y: 760, type: 'poppy' },
      { x: 1040, y: 820, type: 'daisy' },
      { x: 1400, y: 810, type: 'buttercup' },
      { x: 1520, y: 770, type: 'lavender' },
      { x: 920, y: 1160, type: 'daisy' },
      { x: 1050, y: 1220, type: 'poppy' },
      { x: 1380, y: 1210, type: 'buttercup' },
      { x: 1520, y: 1150, type: 'lavender' },
      { x: 540, y: 820, type: 'poppy' },
      { x: 550, y: 1140, type: 'buttercup' },
      { x: 2040, y: 820, type: 'daisy' },
      { x: 2050, y: 1140, type: 'poppy' },
      { x: 920, y: 1600, type: 'lavender' },
      { x: 1480, y: 1600, type: 'daisy' }
    ];

    const flowerPatchImg = assetManager.getImage('/assets/environment/flowers_patch.png');
    flowerClusters.forEach((cl) => {
      const cx = Math.round(cl.x - cameraX);
      const cy = Math.round(cl.y - cameraY);

      if (flowerPatchImg) {
        ctx.drawImage(flowerPatchImg, cx - 16, cy - 16, 32, 32);
      } else {
        const color =
          cl.type === 'poppy'
            ? '#ef4444'
            : cl.type === 'buttercup'
            ? '#facc15'
            : cl.type === 'lavender'
            ? '#c084fc'
            : '#f8fafc';

        ctx.fillStyle = '#15803d'; // stems
        ctx.fillRect(cx, cy + 2, 2, 4);
        ctx.fillRect(cx + 6, cy + 3, 2, 4);
        ctx.fillRect(cx - 5, cy + 3, 2, 4);

        ctx.fillStyle = color; // blossom petals
        ctx.fillRect(cx - 1, cy, 4, 3);
        ctx.fillRect(cx + 5, cy + 1, 4, 3);
        ctx.fillRect(cx - 6, cy + 1, 4, 3);

        ctx.fillStyle = '#fef08a'; // center core
        ctx.fillRect(cx, cy + 1, 2, 1);
      }
    });
  }

  // Helper to trace all interconnected road centerlines
  private traceRoadNetwork(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    const cx = 1200 - cameraX;
    const cy = 960 - cameraY;

    ctx.beginPath();

    // 1. Central North Avenue to Guild Hall (1200, 710)
    ctx.moveTo(cx, cy);
    ctx.lineTo(1200 - cameraX, 710 - cameraY);

    // 2. Central South Avenue to Your Home (1200, 1530) & Post Office (1200, 1860)
    ctx.moveTo(cx, cy);
    ctx.lineTo(1200 - cameraX, 1860 - cameraY);

    // 3. West Path to Garden (740, 1100)
    ctx.moveTo(cx, cy);
    ctx.bezierCurveTo(1000 - cameraX, 970 - cameraY, 860 - cameraX, 1040 - cameraY, 740 - cameraX, 1100 - cameraY);

    // 4. East Path to SQL Mines (1850, 1120) & Blacksmith (2300, 1110)
    ctx.moveTo(cx, cy);
    ctx.bezierCurveTo(1450 - cameraX, 970 - cameraY, 1680 - cameraX, 1040 - cameraY, 1850 - cameraX, 1120 - cameraY);
    ctx.lineTo(2300 - cameraX, 1110 - cameraY);

    // 5. North-West Diagonal Path to Coffee Shop (745, 710)
    ctx.moveTo(cx, cy);
    ctx.bezierCurveTo(1040 - cameraX, 860 - cameraY, 890 - cameraX, 780 - cameraY, 745 - cameraX, 710 - cameraY);

    // 6. North-East Diagonal Path to Python Cave (1850, 720)
    ctx.moveTo(cx, cy);
    ctx.bezierCurveTo(1360 - cameraX, 860 - cameraY, 1620 - cameraX, 780 - cameraY, 1850 - cameraX, 720 - cameraY);

    // 7. South-West Diagonal Path to Library (755, 1540)
    ctx.moveTo(cx, cy);
    ctx.bezierCurveTo(1040 - cameraX, 1080 - cameraY, 890 - cameraX, 1320 - cameraY, 755 - cameraX, 1540 - cameraY);

    // 8. South-East Diagonal Path to Analytics Tower (1840, 1560)
    ctx.moveTo(cx, cy);
    ctx.bezierCurveTo(1360 - cameraX, 1080 - cameraY, 1620 - cameraX, 1320 - cameraY, 1840 - cameraX, 1560 - cameraY);

    // 9. Crafting Path: Blacksmith North to ML Lab (2300, 720)
    ctx.moveTo(2300 - cameraX, 1110 - cameraY);
    ctx.lineTo(2300 - cameraX, 720 - cameraY);

    // 10. Champions Path: Analytics Tower East to Boss Arena (2300, 1530)
    ctx.moveTo(1840 - cameraX, 1540 - cameraY);
    ctx.lineTo(2300 - cameraX, 1530 - cameraY);

    // 11. River Crossing Path: Blacksmith East over Timber Bridge
    ctx.moveTo(2300 - cameraX, 930 - cameraY);
    ctx.lineTo(2620 - cameraX, 930 - cameraY);
  }

  // 2. Connected Cobblestone / Dirt Road Network & Central Circular Plaza
  private drawRoadsAndPlaza(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    ctx.save();
    const cobblePattern = pixelAssets.getCobblePattern(ctx);
    const centerX = 1200 - cameraX;
    const centerY = 960 - cameraY;

    // PASS 1: Rich Earth / Soil Shoulder Layer (Width 74px, Rounded Joins)
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#52361b';
    ctx.lineWidth = 74;
    this.traceRoadNetwork(ctx, cameraX, cameraY);
    ctx.stroke();

    // Central circular plaza earth base (Radius 160px)
    ctx.fillStyle = '#52361b';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 160, 0, Math.PI * 2);
    ctx.fill();

    // PASS 2: Cobblestone Pavement Layer (Width 58px, Seamless Texture)
    ctx.strokeStyle = cobblePattern;
    ctx.lineWidth = 58;
    this.traceRoadNetwork(ctx, cameraX, cameraY);
    ctx.stroke();

    // Central circular plaza cobblestone courtyard (Radius 146px)
    ctx.fillStyle = cobblePattern;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 146, 0, Math.PI * 2);
    ctx.fill();

    // PASS 3: Plaza Border Rim & Concentric Stepping Rings
    ctx.strokeStyle = '#8b5e3c';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 146, 0, Math.PI * 2);
    ctx.stroke();

    // Inner flagstone accent ring surrounding the fountain
    ctx.strokeStyle = 'rgba(139, 94, 60, 0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 76, 0, Math.PI * 2);
    ctx.stroke();

    // Stepping Stones at Building Door Thresholds (Natural RPG Transitions)
    const doors = [
      { x: 745, y: 710 },   // Coffee Shop
      { x: 1200, y: 710 },  // Guild Hall
      { x: 1850, y: 720 },  // Python Cave
      { x: 740, y: 1100 },  // Garden Gate
      { x: 1850, y: 1120 }, // SQL Mines
      { x: 2300, y: 1110 }, // Blacksmith
      { x: 755, y: 1540 },  // Library
      { x: 1200, y: 1530 }, // Your Home
      { x: 1840, y: 1560 }, // Analytics Tower
      { x: 2300, y: 720 },  // ML Lab
      { x: 2300, y: 1530 }, // Boss Arena
      { x: 1200, y: 1860 }  // Post Office
    ];

    doors.forEach((d) => {
      this.drawDoorSteppingStones(ctx, d.x - cameraX, d.y - cameraY);
    });

    ctx.restore();
  }

  // Draw natural rounded flagstones leading up to building doors
  private drawDoorSteppingStones(ctx: CanvasRenderingContext2D, sx: number, sy: number) {
    ctx.save();
    ctx.fillStyle = '#d4a373';
    ctx.strokeStyle = '#8b5e3c';
    ctx.lineWidth = 1;

    // 3 subtle rounded stepping stones
    const stones = [
      { dx: -12, dy: -4, w: 10, h: 6 },
      { dx: 2, dy: -6, w: 12, h: 7 },
      { dx: -4, dy: 6, w: 11, h: 6 }
    ];

    stones.forEach((s) => {
      ctx.beginPath();
      ctx.ellipse(sx + s.dx, sy + s.dy, s.w / 2, s.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    ctx.restore();
  }

  // 3. Eastern Winding River with Natural Sand Banks, Stones, Animated Water & Timber Bridge
  private drawRiver(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    ctx.save();

    // River centerline: x = 2520 + Math.sin(y * 0.008) * 40
    const getRiverX = (y: number) => 2520 + Math.sin(y * 0.008) * 40 - cameraX;

    // A. Sandy Shoreline along the western riverbank
    ctx.lineWidth = 24;
    ctx.strokeStyle = '#c59b6d';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(getRiverX(0) - 8, 0);
    for (let y = 30; y <= 2200; y += 30) {
      ctx.lineTo(getRiverX(y) - 8, y - cameraY);
    }
    ctx.stroke();

    // B. River Water Basin Polygon
    ctx.beginPath();
    ctx.moveTo(getRiverX(0), 0);
    for (let y = 20; y <= 2200; y += 20) {
      ctx.lineTo(getRiverX(y), y - cameraY);
    }
    ctx.lineTo(this.worldWidth - cameraX, 2200 - cameraY);
    ctx.lineTo(this.worldWidth - cameraX, 0);
    ctx.closePath();

    // Animated water pattern or lush azure water gradient
    const waterFrame = (Math.floor(this.animTimer * 3) % 3) + 1;
    const waterImg = assetManager.getImage(`/assets/tilesets/water_0${waterFrame}.png`);
    if (waterImg) {
      const pat = ctx.createPattern(waterImg, 'repeat');
      ctx.fillStyle = pat ? pat : '#2563eb';
    } else {
      const waterGrad = ctx.createLinearGradient(2500 - cameraX, 0, this.worldWidth - cameraX, 0);
      waterGrad.addColorStop(0, '#1d4ed8');
      waterGrad.addColorStop(0.5, '#2563eb');
      waterGrad.addColorStop(1, '#1e40af');
      ctx.fillStyle = waterGrad;
    }
    ctx.fill();

    // C. River Stone Border along the bank with real PNG sprites & water ripples
    const rockSmall = assetManager.getImage('/assets/environment/rock_small.png');
    const rockMossy = assetManager.getImage('/assets/environment/rock_mossy.png');

    for (let y = 20; y <= 2200; y += 45) {
      const rx = Math.round(getRiverX(y));
      const ry = Math.round(y - cameraY);
      const isMossy = (y % 90 === 0);
      const rockImg = isMossy ? rockMossy : rockSmall;

      if (rockImg) {
        ctx.drawImage(rockImg, rx - 4, ry - 8, 22, 16);
      } else {
        const rockRadius = 5 + ((y * 7) % 4);
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.ellipse(rx + 2, ry, rockRadius, rockRadius * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(rx + 1, ry - 2, 2, 2);
      }

      // Water ripple wobble along bank where water meets stone
      const ripplePhase = (this.animTimer * 1.8 + y * 0.04) % 1.0;
      const rippleW = 10 + ripplePhase * 12;
      ctx.strokeStyle = `rgba(186, 230, 253, ${(1 - ripplePhase) * 0.45})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(rx + 14, ry, rippleW, rippleW * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // D. Animated Shimmer Ripples & Water Currents
    const flow = Math.floor(this.animTimer * 5);
    ctx.fillStyle = '#93c5fd';
    for (let i = 0; i < 28; i++) {
      const ry = (flow * 14 + i * 85) % 2200;
      const rx = getRiverX(ry) + 30 + ((i * 47) % 150);
      ctx.fillRect(rx, ry, 26, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(rx + 6, ry, 10, 1);
      ctx.fillStyle = '#93c5fd';
    }

    // E. Floating Water Lilies & Lily Pads
    const lilySpots = [
      { y: 350, xOff: 45 },
      { y: 680, xOff: 60 },
      { y: 1240, xOff: 50 },
      { y: 1620, xOff: 70 },
      { y: 1980, xOff: 40 }
    ];
    lilySpots.forEach((ls) => {
      const lx = getRiverX(ls.y) + ls.xOff;
      const ly = ls.y - cameraY;
      const bob = Math.sin(this.animTimer * 2 + ls.y) * 2;

      // Green lily pad
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(lx, ly + bob, 9, 0, Math.PI * 1.85);
      ctx.fill();

      // Flower blossom (White & Pink)
      ctx.fillStyle = '#fbcfe8';
      ctx.fillRect(lx - 2, ly + bob - 3, 5, 5);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(lx - 1, ly + bob - 2, 3, 3);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(lx, ly + bob - 1, 1, 1);
    });

    // F. Handcrafted Timber Bridge Crossing River at Y: 900-960
    const bridgeX = 2460 - cameraX;
    const bridgeY = 900 - cameraY;
    const bridgeW = 150;
    const bridgeH = 64;

    // Bridge Shadow on River
    ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
    ctx.fillRect(bridgeX, bridgeY + bridgeH, bridgeW, 14);

    // Sturdy Bridge Main Deck & Planks
    ctx.fillStyle = '#451a03'; // timber foundation
    ctx.fillRect(bridgeX, bridgeY, bridgeW, bridgeH);
    for (let by = 0; by < bridgeH; by += 8) {
      ctx.fillStyle = by % 16 === 0 ? '#78350f' : '#92400e';
      ctx.fillRect(bridgeX, bridgeY + by, bridgeW, 7);
      // Wood plank nail studs
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(bridgeX + 6, bridgeY + by + 2, 2, 2);
      ctx.fillRect(bridgeX + bridgeW - 8, bridgeY + by + 2, 2, 2);
    }

    // Top and Bottom Bridge Rails
    ctx.fillStyle = '#291003';
    ctx.fillRect(bridgeX, bridgeY - 4, bridgeW, 5);
    ctx.fillRect(bridgeX, bridgeY + bridgeH - 1, bridgeW, 5);

    // Vertical Railing Posts with caps
    for (let bx = bridgeX + 4; bx <= bridgeX + bridgeW - 8; bx += 24) {
      ctx.fillStyle = '#b45309';
      ctx.fillRect(bx, bridgeY - 8, 6, 8);
      ctx.fillRect(bx, bridgeY + bridgeH, 6, 8);
      ctx.fillStyle = '#fde047'; // brass post cap
      ctx.fillRect(bx + 1, bridgeY - 9, 4, 2);
      ctx.fillRect(bx + 1, bridgeY + bridgeH + 7, 4, 2);
    }

    ctx.restore();
  }

  // 4. Perimeter & Grove Trees Integrated into Unified Y-Depth Sorting
  private addTreesToDepthList(depthList: DepthObject[], cameraX: number, cameraY: number) {
    const addTree = (tx: number, ty: number, type: 'oak' | 'pine' | 'autumn' | 'cherry') => {
      // Tree foot baseline is ty + 20
      depthList.push({
        y: ty + 20,
        render: (c) => this.drawForestTree(c, tx - cameraX, ty - cameraY, type)
      });
    };

    // A. North Border Forest (Y: 280 - 420)
    for (let tx = 80; tx < this.worldWidth - 200; tx += 110) {
      const type = tx % 330 === 0 ? 'pine' : tx % 220 === 0 ? 'autumn' : 'oak';
      addTree(tx, 330, type);
      if (tx % 2 === 0) {
        addTree(tx + 55, 390, 'pine');
      }
    }

    // B. West Border Forest (X: 80 - 420)
    for (let ty = 340; ty < this.worldHeight - 100; ty += 110) {
      const type = ty % 330 === 0 ? 'pine' : ty % 220 === 0 ? 'autumn' : 'oak';
      addTree(330, ty, type);
      addTree(230, ty + 50, 'pine');
      addTree(130, ty + 20, 'oak');
    }

    // C. South Border Forest (Y: 1960 - 2200)
    for (let tx = 80; tx < this.worldWidth - 200; tx += 110) {
      const type = tx % 330 === 0 ? 'pine' : tx % 220 === 0 ? 'autumn' : 'oak';
      addTree(tx, 2040, type);
      addTree(tx + 55, 2130, 'pine');
    }

    // D. East Border Forest (X: 2660 - 2800 framing river)
    for (let ty = 100; ty < this.worldHeight; ty += 120) {
      addTree(2690, ty, 'pine');
      addTree(2760, ty + 60, 'oak');
    }

    // E. Central Landmark Trees
    const landmarkTrees = [
      { x: 920, y: 720, type: 'oak' as const },
      { x: 1480, y: 720, type: 'oak' as const },
      { x: 920, y: 1240, type: 'autumn' as const },
      { x: 1480, y: 1240, type: 'oak' as const },
      { x: 2020, y: 880, type: 'pine' as const },
      { x: 2020, y: 1360, type: 'pine' as const }
    ];
    landmarkTrees.forEach(t => addTree(t.x, t.y, t.type));
  }

  private isReducedMotion(): boolean {
    return typeof window !== 'undefined' && Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  // Helper to render forest trees using assetManager with procedural fallback
  private drawForestTree(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    type: 'oak' | 'pine' | 'autumn' | 'cherry'
  ) {
    const rx = Math.round(x);
    const ry = Math.round(y);
    const imgPath = `/assets/environment/tree_${type}.png`;
    const img = assetManager.getImage(imgPath);
    if (img) {
      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = TUNING.ATMOSPHERE.SHADOW_COLOR;
      ctx.beginPath();
      ctx.ellipse(
        rx + TUNING.ATMOSPHERE.SHADOW_OFFSET_X,
        ry + 20 + TUNING.ATMOSPHERE.SHADOW_OFFSET_Y,
        36,
        12,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Natural wind sway on foliage (honoring prefers-reduced-motion)
      const swayAngle = this.isReducedMotion() ? 0 : Math.sin(this.animTimer * 1.5 + x * 0.012 + y * 0.018) * 0.022;
      ctx.translate(rx, ry + 20);
      ctx.rotate(swayAngle);
      ctx.drawImage(img, -58, -110, 116, 116);
      ctx.restore();
    } else {
      if (type === 'pine') {
        this.drawPineTree(ctx, rx, ry, 40);
      } else {
        this.drawOakTree(ctx, rx, ry, 44);
      }
    }
  }

  // 5. Flying Birds
  private drawBirds(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    this.birds.forEach((b, idx) => {
      b.x += b.speed;
      if (b.x > this.worldWidth + 100) b.x = -50;
      const screenX = b.x - cameraX * 0.2;
      const screenY = b.y - cameraY * 0.2;
      const frame = Math.floor(this.animTimer * 4 + idx) % 2;
      pixelAssets.drawBird(ctx, screenX, screenY, frame);
    });
  }

  // 6. Y-SORTED DEPTH RENDERING (Buildings, Fountain, NPCs, Mango, Player, Props, Trees)
  private drawYSortedEntities(
    ctx: CanvasRenderingContext2D,
    cameraX: number,
    cameraY: number,
    timeOfDay: TimeOfDay,
    buildings: BuildingData[],
    npcManager: NPCManager,
    player: PlayerCharacter,
    mangoPet?: MangoPet
  ) {
    const depthList: DepthObject[] = [];

    // 1. Buildings (Production Assets with Procedural Fallbacks)
    buildings.forEach((b) => {
      const bx = Math.round(b.x - cameraX);
      const by = Math.round(b.y - cameraY);
      const baseY = b.y + b.height;

      depthList.push({
        y: baseY,
        render: (c) => {
          c.save();
          const spritePath = WorldRenderer.BUILDING_SPRITE_MAP[b.id];
          const img = spritePath ? assetManager.getImage(spritePath) : null;

          let roofTopY = by;

          if (img) {
            const destW = Math.max(b.width, 240);
            const destH = Math.round(destW * (img.naturalHeight / img.naturalWidth));
            const destX = Math.round(bx + (b.width - destW) / 2);
            const destY = Math.round(by + b.height - destH);
            roofTopY = destY;

            // Ground contact shadow
            c.fillStyle = TUNING.ATMOSPHERE.SHADOW_COLOR;
            c.beginPath();
            c.ellipse(
              bx + Math.floor(b.width / 2) + TUNING.ATMOSPHERE.SHADOW_OFFSET_X,
              by + b.height - 4 + TUNING.ATMOSPHERE.SHADOW_OFFSET_Y,
              Math.floor(destW * 0.46),
              14,
              0,
              0,
              Math.PI * 2
            );
            c.fill();

            c.imageSmoothingEnabled = false;
            c.drawImage(img, destX, destY, destW, destH);

            // Dynamic atmospheric animated overlays
            this.drawBuildingAnimatedOverlays(c, b.id, destX, destY, destW, destH);
          } else {
            // Drop shadow fallback
            c.fillStyle = TUNING.ATMOSPHERE.SHADOW_COLOR;
            c.fillRect(
              bx - 6 + TUNING.ATMOSPHERE.SHADOW_OFFSET_X,
              by + b.height - 8 + TUNING.ATMOSPHERE.SHADOW_OFFSET_Y,
              b.width + 12,
              16
            );

            if (b.id === 'coffee_shop') {
              this.drawCoffeeShop(c, bx, by, b.width, b.height);
            } else if (b.id === 'guild_hall') {
              this.drawGuildHall(c, bx, by, b.width, b.height);
            } else if (b.id === 'python_cave') {
              this.drawPythonCave(c, bx, by, b.width, b.height);
            } else if (b.id === 'garden') {
              this.drawGarden(c, bx, by, b.width, b.height);
            } else if (b.id === 'sql_mines') {
              this.drawSqlMines(c, bx, by, b.width, b.height);
            } else if (b.id === 'blacksmith') {
              this.drawBlacksmith(c, bx, by, b.width, b.height);
            } else if (b.id === 'library') {
              this.drawLibrary(c, bx, by, b.width, b.height);
            } else if (b.id === 'home') {
              this.drawHome(c, bx, by, b.width, b.height);
            } else if (b.id === 'analytics_tower') {
              this.drawAnalyticsTower(c, bx, by, b.width, b.height);
            } else if (b.id === 'ml_lab') {
              this.drawMLLab(c, bx, by, b.width, b.height);
            } else if (b.id === 'boss_arena') {
              this.drawBossArena(c, bx, by, b.width, b.height);
            } else {
              this.drawPostOffice(c, bx, by, b.width, b.height);
            }
          }

          // Overhead floating plaque positioned cleanly above roof ridge
          const plaqueY = roofTopY - 38;
          this.drawBuildingPlaque(c, bx + Math.floor(b.width / 2), plaqueY, b.name, b.subtitle);
          c.restore();
        }
      });
    });

    // 2. Central Town Square Fountain (Centered at 1200, 960)
    depthList.push({
      y: 960 + 35,
      render: (c) => this.drawTownSquareFountain(c, 1200 - cameraX, 960 - cameraY)
    });

    // 3. Street Lanterns & Lamp Posts with Warm Amber Light Glow (Cached)
    const lanterns = [
      { x: 1080, y: 860 },
      { x: 1320, y: 860 },
      { x: 1080, y: 1060 },
      { x: 1320, y: 1060 },
      { x: 745, y: 740 },
      { x: 1850, y: 740 },
      { x: 755, y: 1560 },
      { x: 1840, y: 1580 },
      { x: 2160, y: 1100 }
    ];
    const lanternGlow = assetManager.getLanternGlow();
    lanterns.forEach((lp) => {
      depthList.push({
        y: lp.y + 4,
        render: (c) => {
          c.save();
          // Warm radial amber lantern glow from cached offscreen canvas
          c.drawImage(lanternGlow, Math.round(lp.x - cameraX - 44), Math.round(lp.y - cameraY - 40 - 44));

          const lampImg = assetManager.getImage('/assets/environment/lamp_post.png');
          if (lampImg) {
            c.imageSmoothingEnabled = false;
            c.fillStyle = 'rgba(15, 23, 42, 0.4)';
            c.beginPath();
            c.ellipse(Math.round(lp.x - cameraX), Math.round(lp.y - cameraY + 2), 8, 4, 0, 0, Math.PI * 2);
            c.fill();
            c.drawImage(lampImg, Math.round(lp.x - cameraX - 16), Math.round(lp.y - cameraY - 58), 32, 64);
          } else {
            pixelAssets.drawPixelLantern(c, Math.round(lp.x - cameraX), Math.round(lp.y - cameraY), false);
          }
          c.restore();
        }
      });
    });

    // 4. Town Benches (Around the central plaza & near library)
    const benches = [
      { x: 1110, y: 920 },
      { x: 1290, y: 920 },
      { x: 1110, y: 1010 },
      { x: 1290, y: 1010 }
    ];
    benches.forEach((bench) => {
      depthList.push({
        y: bench.y + 12,
        render: (c) => {
          const benchImg = assetManager.getImage('/assets/environment/bench.png');
          if (benchImg) {
            c.save();
            c.imageSmoothingEnabled = false;
            c.fillStyle = 'rgba(15, 23, 42, 0.35)';
            c.fillRect(bench.x - cameraX - 28, bench.y - cameraY + 8, 56, 8);
            c.drawImage(benchImg, bench.x - cameraX - 32, bench.y - cameraY - 16, 64, 32);
            c.restore();
          }
        }
      });
    });

    // 5. Garden Wooden Fencing (Enclosing the 240x200 Garden with open gate at 740, 1100)
    depthList.push({
      y: 925,
      render: (c) => {
        c.save();
        const fenceImg = assetManager.getImage('/assets/environment/fence_horizontal.png');
        // Top fence line (Y: 920, X: 620 to 860)
        for (let fx = 620; fx <= 830; fx += 32) {
          if (fenceImg) {
            c.drawImage(fenceImg, fx - cameraX, 915 - cameraY, 32, 16);
          } else {
            c.fillStyle = '#78350f';
            c.fillRect(fx - cameraX, 918 - cameraY, 32, 8);
          }
        }
        c.restore();
      }
    });

    depthList.push({
      y: 1110,
      render: (c) => {
        c.save();
        const fenceImg = assetManager.getImage('/assets/environment/fence_horizontal.png');
        // Bottom fence line left of gate (X: 620 to 710)
        for (let fx = 620; fx < 700; fx += 32) {
          if (fenceImg) {
            c.drawImage(fenceImg, fx - cameraX, 1105 - cameraY, 32, 16);
          } else {
            c.fillStyle = '#78350f';
            c.fillRect(fx - cameraX, 1108 - cameraY, 32, 8);
          }
        }
        // Bottom fence line right of gate (X: 770 to 860)
        for (let fx = 770; fx <= 830; fx += 32) {
          if (fenceImg) {
            c.drawImage(fenceImg, fx - cameraX, 1105 - cameraY, 32, 16);
          } else {
            c.fillStyle = '#78350f';
            c.fillRect(fx - cameraX, 1108 - cameraY, 32, 8);
          }
        }
        // Flower patch inside garden
        const flowerImg = assetManager.getImage('/assets/environment/flowers_patch.png');
        if (flowerImg) {
          c.drawImage(flowerImg, 640 - cameraX, 970 - cameraY, 48, 48);
          c.drawImage(flowerImg, 780 - cameraX, 970 - cameraY, 48, 48);
        }
        c.restore();
      }
    });

    // Vertical Garden Perimeter Fences (Left: X=615, Right: X=860)
    const vertFenceImg = assetManager.getImage('/assets/environment/fence_vertical.png');
    for (let fy = 925; fy <= 1080; fy += 32) {
      depthList.push({
        y: fy + 16,
        render: (c) => {
          c.save();
          if (vertFenceImg) {
            c.drawImage(vertFenceImg, 615 - cameraX, fy - cameraY, 16, 32);
            c.drawImage(vertFenceImg, 860 - cameraX, fy - cameraY, 16, 32);
          } else {
            c.fillStyle = '#78350f';
            c.fillRect(618 - cameraX, fy - cameraY, 8, 32);
            c.fillRect(863 - cameraX, fy - cameraY, 8, 32);
          }
          c.restore();
        }
      });
    }

    // 5b. Natural Mountain & Cave Rocks (Python Cave, SQL Mines)
    const worldRocks = [
      { x: 1710, y: 720, type: 'mossy', w: 32, h: 26 },
      { x: 1980, y: 720, type: 'large', w: 40, h: 32 },
      { x: 1720, y: 1140, type: 'mossy', w: 32, h: 26 },
      { x: 1970, y: 1140, type: 'small', w: 24, h: 20 },
      { x: 2280, y: 1130, type: 'small', w: 24, h: 20 }
    ];
    worldRocks.forEach((rk) => {
      depthList.push({
        y: rk.y + 10,
        render: (c) => {
          const imgPath = rk.type === 'large'
            ? '/assets/environment/rock_large.png'
            : rk.type === 'mossy'
            ? '/assets/environment/rock_mossy.png'
            : '/assets/environment/rock_small.png';
          const rkImg = assetManager.getImage(imgPath);
          if (rkImg) {
            c.save();
            c.fillStyle = 'rgba(15, 23, 42, 0.35)';
            c.beginPath();
            c.ellipse(rk.x - cameraX, rk.y - cameraY + 6, rk.w * 0.4, 6, 0, 0, Math.PI * 2);
            c.fill();
            c.drawImage(rkImg, Math.round(rk.x - cameraX - rk.w / 2), Math.round(rk.y - cameraY - rk.h / 2), rk.w, rk.h);
            c.restore();
          }
        }
      });
    });

    // 6. Python Cave Magical Glowing Blue Crystals
    const crystals = [
      { x: 1720, y: 560, scale: 32 },
      { x: 1970, y: 550, scale: 36 },
      { x: 1730, y: 690, scale: 28 },
      { x: 1960, y: 680, scale: 32 }
    ];
    const crystalGlow = assetManager.getCrystalGlow();
    crystals.forEach((cr) => {
      depthList.push({
        y: cr.y + 10,
        render: (c) => {
          c.save();
          // Arcane cyan pulse glow from cached texture
          const pulse = Math.sin(this.animTimer * 4 + cr.x) * 0.15;
          c.globalAlpha = 0.85 + pulse;
          c.drawImage(crystalGlow, Math.round(cr.x - cameraX - 40), Math.round(cr.y - cameraY - 10 - 40));
          c.globalAlpha = 1.0;

          const crysImg = assetManager.getImage('/assets/environment/crystal_blue.png');
          if (crysImg) {
            c.imageSmoothingEnabled = false;
            c.drawImage(crysImg, Math.round(cr.x - cameraX - cr.scale / 2), Math.round(cr.y - cameraY - cr.scale), cr.scale, cr.scale);
          } else {
            c.fillStyle = '#38bdf8';
            c.fillRect(Math.round(cr.x - cameraX - 4), Math.round(cr.y - cameraY - 16), 8, 16);
          }
          c.restore();
        }
      });
    });

    // 7. Environmental Crates & Barrels
    const barrelsAndCrates = [
      { x: 2160, y: 940, type: 'barrel' },
      { x: 2176, y: 954, type: 'crate' },
      { x: 605, y: 550, type: 'barrel' },
      { x: 620, y: 565, type: 'crate' },
      { x: 1700, y: 950, type: 'crate' },
      { x: 1715, y: 960, type: 'barrel' },
      { x: 1045, y: 1530, type: 'barrel' } // near Your Home
    ];
    barrelsAndCrates.forEach((prop) => {
      depthList.push({
        y: prop.y + 12,
        render: (c) => {
          const imgPath = prop.type === 'barrel' ? '/assets/environment/barrel.png' : '/assets/environment/crate.png';
          const img = assetManager.getImage(imgPath);
          if (img) {
            c.save();
            c.imageSmoothingEnabled = false;
            c.fillStyle = 'rgba(15, 23, 42, 0.35)';
            c.fillRect(prop.x - cameraX - 14, prop.y - cameraY + 8, 28, 6);
            c.drawImage(img, prop.x - cameraX - 16, prop.y - cameraY - 18, 32, 32);
            c.restore();
          }
        }
      });
    });

    // 8. Natural Town Trees (Framing Districts & Courtyards)
    const townTrees = [
      { x: 660, y: 440, type: 'oak' },
      { x: 880, y: 450, type: 'cherry' },
      { x: 1000, y: 440, type: 'oak' },
      { x: 1400, y: 440, type: 'autumn' },
      { x: 1680, y: 450, type: 'pine' },
      { x: 2010, y: 460, type: 'autumn' },
      { x: 570, y: 1260, type: 'oak' },
      { x: 910, y: 1250, type: 'cherry' },
      { x: 1000, y: 1280, type: 'oak' },
      { x: 1400, y: 1280, type: 'cherry' },
      { x: 1670, y: 1260, type: 'pine' },
      { x: 2000, y: 1260, type: 'autumn' },
      { x: 2420, y: 780, type: 'oak' },
      { x: 2420, y: 1100, type: 'pine' }
    ];
    townTrees.forEach((t) => {
      depthList.push({
        y: t.y + 24,
        render: (c) => {
          const imgPath = `/assets/environment/tree_${t.type}.png`;
          const img = assetManager.getImage(imgPath);
          if (img) {
            c.save();
            c.imageSmoothingEnabled = false;
            c.fillStyle = TUNING.ATMOSPHERE.SHADOW_COLOR;
            c.beginPath();
            c.ellipse(
              t.x - cameraX + TUNING.ATMOSPHERE.SHADOW_OFFSET_X,
              t.y - cameraY + 20 + TUNING.ATMOSPHERE.SHADOW_OFFSET_Y,
              36,
              12,
              0,
              0,
              Math.PI * 2
            );
            c.fill();

            // Natural wind sway on foliage (honoring prefers-reduced-motion)
            const swayAngle = this.isReducedMotion() ? 0 : Math.sin(this.animTimer * 1.5 + t.x * 0.012 + t.y * 0.018) * 0.022;
            c.translate(t.x - cameraX, t.y - cameraY + 20);
            c.rotate(swayAngle);
            c.drawImage(img, -58, -110, 116, 116);
            c.restore();
          } else {
            this.drawOakTree(c, t.x - cameraX, t.y - cameraY, 44);
          }
        }
      });
    });

    // 8. Perimeter & Ancient Forest Trees (Unified Depth Sorting)
    this.addTreesToDepthList(depthList, cameraX, cameraY);

    // 9. NPCs (Production Idle Spritesheets)
    npcManager.npcs.forEach((npc) => {
      depthList.push({
        y: npc.y + 20,
        render: (c) => npcManager.renderNPC(c, npc, cameraX, cameraY, this.animTimer)
      });
    });

    // 10. Mango the Cat Pet Companion (Autonomous Follow AI & Animations)
    if (mangoPet) {
      depthList.push({
        y: mangoPet.y + 12,
        render: (c) => mangoPet.render(c, cameraX, cameraY)
      });
    }

    // 11. Player Character (Aryan - 4-Direction Walk / Idle Cycles)
    depthList.push({
      y: player.state.y + 20,
      render: (c) => player.render(c, cameraX, cameraY)
    });

    // Sort all entities by baseline foot Y (depth-sorting)
    depthList.sort((a, b) => a.y - b.y);

    depthList.forEach((item) => item.render(ctx));
  }

  // -------------------------------------------------------------
  // DYNAMIC ATMOSPHERIC ANIMATED OVERLAYS FOR BUILDINGS
  // -------------------------------------------------------------
  private drawBuildingAnimatedOverlays(
    ctx: CanvasRenderingContext2D,
    id: string,
    bx: number,
    by: number,
    bw: number,
    bh: number
  ) {
    ctx.save();

    const renderSmokeColumn = (chimX: number, chimY: number, isDark: boolean = false) => {
      for (let i = 0; i < 4; i++) {
        const t = (this.animTimer * 0.7 + i * 0.25) % 1.0;
        const drift = Math.sin(t * Math.PI * 2 + i) * 5 + t * 10;
        const px = chimX + drift;
        const py = chimY - t * 38;
        const rad = 3.5 + t * 6;
        const alpha = Math.max(0, (1 - t) * 0.55);
        ctx.fillStyle = isDark
          ? `rgba(71, 85, 105, ${alpha})`
          : `rgba(241, 245, 249, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (id === 'coffee_shop') {
      // Chimney warm smoke
      renderSmokeColumn(bx + 32, by + 12, false);

      // Steam puffs rising from coffee cup on roof
      const cupX = bx + Math.floor(bw / 2);
      const cupY = by + 22;
      const steamBob = Math.sin(this.animTimer * 4) * 3;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.fillRect(cupX - 5, cupY - 18 + steamBob, 3, 5);
      ctx.fillRect(cupX + 4, cupY - 22 - steamBob, 3, 6);
      ctx.fillRect(cupX - 1, cupY - 26 + steamBob * 0.5, 2, 4);
    } else if (id === 'blacksmith') {
      // Roaring hearth flame animation in forge furnace
      const forgeX = bx + Math.floor(bw / 2) - 16;
      const forgeY = by + bh - 42;
      const flicker = Math.sin(this.animTimer * 8) * 3;
      ctx.fillStyle = '#f97316';
      ctx.fillRect(forgeX + 4, forgeY + 8 + flicker, 16, 12 - flicker);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(forgeX + 7, forgeY + 12 + flicker * 0.5, 10, 8);

      // Chimney dark forge smoke column
      renderSmokeColumn(bx + bw - 36, by + 10, true);
    } else if (id === 'python_cave') {
      // Pulsing cyan & blue crystal magic glow
      const pulse = Math.sin(this.animTimer * 3.5) * 4;
      const cGlow = ctx.createRadialGradient(bx + 40, by + bh - 32, 2, bx + 40, by + bh - 32, 26 + pulse);
      cGlow.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
      cGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = cGlow;
      ctx.beginPath();
      ctx.arc(bx + 40, by + bh - 32, 26 + pulse, 0, Math.PI * 2);
      ctx.fill();

      const cGlow2 = ctx.createRadialGradient(bx + bw - 40, by + bh - 32, 2, bx + bw - 40, by + bh - 32, 26 + pulse);
      cGlow2.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
      cGlow2.addColorStop(1, 'transparent');
      ctx.fillStyle = cGlow2;
      ctx.beginPath();
      ctx.arc(bx + bw - 40, by + bh - 32, 26 + pulse, 0, Math.PI * 2);
      ctx.fill();
    } else if (id === 'ml_lab') {
      // Neural core pink/purple pulse in glass dome
      const domeX = bx + Math.floor(bw / 2);
      const domeY = by + 46;
      const corePulse = Math.sin(this.animTimer * 5) * 3;
      const mGlow = ctx.createRadialGradient(domeX, domeY, 2, domeX, domeY, 22 + corePulse);
      mGlow.addColorStop(0, 'rgba(236, 72, 153, 0.45)');
      mGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = mGlow;
      ctx.beginPath();
      ctx.arc(domeX, domeY, 22 + corePulse, 0, Math.PI * 2);
      ctx.fill();
    } else if (id === 'home') {
      // Cozy white smoke puffs billowing from home chimney
      renderSmokeColumn(bx + bw - 34, by + 8, false);
    }

    ctx.restore();
  }

  // -------------------------------------------------------------
  // BUILDING ARCHITECTURE (HANDCRAFTED MATCHING REFERENCE SCREENSHOT)
  // -------------------------------------------------------------

  // 1. Coffee Shop: Timber walls, brown tile roof, GIANT COFFEE CUP on roof!
  private drawCoffeeShop(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    // Walls
    ctx.fillStyle = '#5c3a21'; // dark timber
    ctx.fillRect(x + 12, y + 45, w - 24, h - 45);
    ctx.fillStyle = '#784d2a';
    ctx.fillRect(x + 16, y + 50, w - 32, h - 55);

    // Roof: Shingled grey-brown gabled roof
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(x + 6, y + 30, w - 12, 22);
    ctx.fillStyle = '#4e342e';
    ctx.fillRect(x + 16, y + 15, w - 32, 18);
    ctx.fillRect(x + 28, y + 4, w - 56, 14);

    // Giant Coffee Cup on the Roof (From Reference Screenshot!)
    const cupX = x + Math.floor(w / 2);
    const cupY = y - 10;
    // Cup shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(cupX - 18, cupY + 12, 36, 4);
    // White Ceramic Cup
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(cupX - 16, cupY - 14, 32, 26);
    ctx.fillRect(cupX - 14, cupY + 12, 28, 4);
    // Dark roast coffee surface
    ctx.fillStyle = '#451a03';
    ctx.fillRect(cupX - 14, cupY - 14, 28, 5);
    // Cup handle
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 4;
    ctx.strokeRect(cupX + 16, cupY - 8, 8, 14);

    // Animated Steam puffs rising from coffee
    const steamBob = Math.sin(this.animTimer * 4) * 3;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillRect(cupX - 6, cupY - 22 + steamBob, 3, 5);
    ctx.fillRect(cupX + 3, cupY - 26 - steamBob, 3, 6);

    // Red & Cream Striped Awning over entrance
    const awnX = x + Math.floor(w / 2) - 40;
    const awnY = y + h - 58;
    for (let ax = awnX; ax < awnX + 80; ax += 10) {
      const isRed = Math.floor((ax - awnX) / 10) % 2 === 0;
      ctx.fillStyle = isRed ? '#dc2626' : '#fef08a';
      ctx.fillRect(ax, awnY, 10, 14);
    }

    // Flower boxes under windows
    ctx.fillStyle = '#5c3a21';
    ctx.fillRect(x + 22, y + 84, 28, 5);
    ctx.fillRect(x + w - 50, y + 84, 28, 5);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x + 24, y + 81, 4, 3);
    ctx.fillRect(x + 32, y + 81, 4, 3);
    ctx.fillRect(x + w - 48, y + 81, 4, 3);
    ctx.fillRect(x + w - 40, y + 81, 4, 3);

    // Front Door & Warm Lit Windows
    const dx = x + Math.floor(w / 2) - 18;
    const dy = y + h - 50;
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(dx, dy, 36, 50);
    ctx.fillStyle = '#fde047'; // warm amber light
    ctx.fillRect(dx + 6, dy + 8, 24, 18);
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(dx + 17, dy + 8, 2, 18);

    // Porch Barrels
    pixelAssets.drawPixelBarrel(ctx, x + 24, y + h - 14);
    pixelAssets.drawPixelBarrel(ctx, x + w - 24, y + h - 14);
  }

  // 2. Guild Hall: Grand two-story timber hall with purple banner & crescent crest
  private drawGuildHall(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    // Stone foundation
    ctx.fillStyle = '#475569';
    ctx.fillRect(x + 10, y + h - 25, w - 20, 25);

    // Timber walls
    ctx.fillStyle = '#4a2810';
    ctx.fillRect(x + 14, y + 55, w - 28, h - 75);
    ctx.fillStyle = '#6b3e1b';
    ctx.fillRect(x + 20, y + 60, w - 40, h - 85);

    // Roof: Stepped gabled roof with dormers
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(x + 6, y + 40, w - 12, 22);
    ctx.fillStyle = '#4e342e';
    ctx.fillRect(x + 20, y + 20, w - 40, 24);
    ctx.fillRect(x + 38, y + 4, w - 76, 20);

    // Royal Purple Guild Flag with Golden Crest (From Reference Screenshot!)
    const flagX = x + Math.floor(w / 2) - 18;
    const flagY = y + 25;
    ctx.fillStyle = '#6b21a8'; // deep purple
    ctx.fillRect(flagX, flagY, 36, 44);
    // V-shaped flag bottom
    ctx.beginPath();
    ctx.moveTo(flagX, flagY + 44);
    ctx.lineTo(flagX + 18, flagY + 54);
    ctx.lineTo(flagX + 36, flagY + 44);
    ctx.closePath();
    ctx.fill();
    // Golden Crescent / Star Emblem
    ctx.fillStyle = '#fde047';
    ctx.fillRect(flagX + 13, flagY + 12, 10, 10);
    ctx.fillStyle = '#6b21a8';
    ctx.fillRect(flagX + 16, flagY + 10, 8, 10);

    // Double Grand Oak Doors
    const dw = 44;
    const dh = 55;
    const dx = x + Math.floor(w / 2) - dw / 2;
    const dy = y + h - dh;
    ctx.fillStyle = '#271202';
    ctx.fillRect(dx, dy, dw, dh);
    ctx.fillStyle = '#f59e0b'; // Brass handles
    ctx.fillRect(dx + 18, dy + 26, 3, 4);
    ctx.fillRect(dx + 23, dy + 26, 3, 4);

    // Sconces with flame
    pixelAssets.drawPixelLantern(ctx, dx - 14, dy + 15, true);
    pixelAssets.drawPixelLantern(ctx, dx + dw + 14, dy + 15, true);
  }

  // 3. Python Cave: Mountain cavern mouth with glowing Python logo & blue crystals
  private drawPythonCave(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    // Rugged mountain boulder dome
    ctx.fillStyle = '#334155';
    ctx.fillRect(x + 10, y + 20, w - 20, h - 20);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x + 24, y + 6, w - 48, 24);

    // Cavern Opening (Dark Pit)
    const mouthW = 80;
    const mouthH = 90;
    const mx = x + Math.floor(w / 2) - mouthW / 2;
    const my = y + h - mouthH;
    ctx.fillStyle = '#090d16';
    ctx.fillRect(mx, my, mouthW, mouthH);

    // Giant Glowing Python Logo Emblem above Cave Mouth (From Reference Screenshot!)
    const pyX = x + Math.floor(w / 2);
    const pyY = y + 42;
    // Blue snake top
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(pyX - 16, pyY - 14, 20, 14);
    ctx.fillRect(pyX - 10, pyY - 8, 14, 18);
    // Yellow snake bottom
    ctx.fillStyle = '#fde047';
    ctx.fillRect(pyX - 4, pyY - 2, 20, 14);
    ctx.fillRect(pyX - 4, pyY - 12, 14, 18);
    // Snake eyes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(pyX - 12, pyY - 11, 3, 3);
    ctx.fillRect(pyX + 9, pyY + 6, 3, 3);

    // Glowing Cyan Crystals flanking entrance
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(mx - 18, my + 35, 12, 35);
    ctx.fillRect(mx - 24, my + 48, 8, 22);
    ctx.fillRect(mx + mouthW + 6, my + 35, 12, 35);
    ctx.fillRect(mx + mouthW + 16, my + 48, 8, 22);
    ctx.fillStyle = '#a5f3fc';
    ctx.fillRect(mx - 15, my + 38, 4, 25);
    ctx.fillRect(mx + mouthW + 9, my + 38, 4, 25);
  }

  // 4. Garden: Fenced vegetable patch with carrots, cabbages, and flowers
  private drawGarden(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    // Tilled Soil Bed
    ctx.fillStyle = '#5c3a21';
    ctx.fillRect(x + 10, y + 10, w - 20, h - 20);
    ctx.fillStyle = '#784d2a';
    ctx.fillRect(x + 16, y + 16, w - 32, h - 32);

    // Wooden Post-and-Rail Fence
    ctx.fillStyle = '#a16207';
    // Top & bottom horizontal rails
    ctx.fillRect(x, y + 8, w, 4);
    ctx.fillRect(x, y + 18, w, 4);
    ctx.fillRect(x, y + h - 14, w, 4);
    ctx.fillRect(x, y + h - 6, w, 4);
    // Vertical fence posts
    for (let px = x; px <= x + w; px += 24) {
      ctx.fillRect(px, y + 4, 5, 20);
      ctx.fillRect(px, y + h - 18, 5, 20);
    }

    // Planted Crop Rows (Carrots, Cabbages, Flowers)
    for (let row = 0; row < 3; row++) {
      const ry = y + 42 + row * 34;
      // Orange Carrots with green fronds
      for (let cx = x + 30; cx < x + 90; cx += 16) {
        ctx.fillStyle = '#ea580c';
        ctx.fillRect(cx, ry + 4, 5, 8);
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(cx - 1, ry, 7, 4);
      }
      // Green Cabbages
      for (let cx = x + 110; cx < x + 165; cx += 18) {
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(cx, ry + 2, 10, 10);
        ctx.fillStyle = '#86efac';
        ctx.fillRect(cx + 2, ry + 4, 6, 6);
      }
      // Pink & Yellow Flowers
      for (let cx = x + 180; cx < x + w - 25; cx += 14) {
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(cx, ry + 3, 6, 6);
        ctx.fillStyle = '#fde047';
        ctx.fillRect(cx + 2, ry + 5, 2, 2);
      }
    }
  }

  // 5. Town Square Fountain: Multi-tier circular stone fountain with sparkling water spray
  private drawTownSquareFountain(ctx: CanvasRenderingContext2D, fx: number, fy: number) {
    ctx.save();
    const fountainImg = assetManager.getImage('/assets/environment/fountain.png');

    if (fountainImg) {
      ctx.imageSmoothingEnabled = false;
      const fw = 136;
      const fh = 136;
      // Fountain shadow
      ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
      ctx.beginPath();
      ctx.ellipse(fx, fy + 24, 62, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw Production Fountain Asset
      ctx.drawImage(fountainImg, fx - fw / 2, fy - fh / 2 - 8, fw, fh);
    } else {
      // Stepped Circular Stone Basin
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(fx, fy, 46, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(fx, fy, 40, 0, Math.PI * 2);
      ctx.fill();

      // Clear Sparkling Water Pool
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(fx, fy, 34, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(fx, fy, 28, 0, Math.PI * 2);
      ctx.fill();

      // Central Stone Pillar & Spout
      ctx.fillStyle = '#475569';
      ctx.fillRect(fx - 8, fy - 14, 16, 20);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(fx - 12, fy - 18, 24, 6);
    }

    // Animated water ripples inside fountain basin
    for (let r = 0; r < 3; r++) {
      const ripplePhase = (this.animTimer * 1.4 + r * 0.33) % 1.0;
      const rippleR = 8 + ripplePhase * 26;
      const alpha = (1 - ripplePhase) * 0.6;
      ctx.strokeStyle = `rgba(186, 230, 253, ${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(fx, fy + 8, rippleR, rippleR * 0.45, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Animated Sparkling Water Droplets Spraying
    const sprayBob = Math.sin(this.animTimer * 6) * 4;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(fx - 1, fy - 36 + sprayBob, 3, 10);
    ctx.fillRect(fx - 8, fy - 30 + sprayBob, 2, 6);
    ctx.fillRect(fx + 7, fy - 30 + sprayBob, 2, 6);
    ctx.fillRect(fx - 14, fy - 22 + sprayBob, 3, 3);
    ctx.fillRect(fx + 12, fy - 22 + sprayBob, 3, 3);

    ctx.restore();
  }

  // 6. SQL Mines: Mine shaft entrance with square timber frame, rails, minecart with crystals
  private drawSqlMines(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    // Rocky cave hill
    ctx.fillStyle = '#475569';
    ctx.fillRect(x + 12, y + 25, w - 24, h - 25);
    ctx.fillStyle = '#334155';
    ctx.fillRect(x + 28, y + 10, w - 56, 25);

    // Mine Shaft Opening
    const mw = 74;
    const mh = 85;
    const mx = x + Math.floor(w / 2) - mw / 2;
    const my = y + h - mh;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(mx, my, mw, mh);

    // Square Heavy Timber Frames (From Reference Screenshot!)
    ctx.fillStyle = '#78350f';
    ctx.fillRect(mx - 8, my - 8, mw + 16, 12); // top beam
    ctx.fillRect(mx - 8, my - 8, 12, mh + 8); // left post
    ctx.fillRect(mx + mw - 4, my - 8, 12, mh + 8); // right post
    ctx.fillStyle = '#92400e';
    ctx.fillRect(mx - 4, my - 4, mw + 8, 6);

    // Steel Mine Rails emerging from tunnel
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(mx + 18, my + 45, 4, mh - 45 + 18);
    ctx.fillRect(mx + mw - 22, my + 45, 4, mh - 45 + 18);
    ctx.fillStyle = '#451a03';
    for (let ty = my + 50; ty <= my + mh + 10; ty += 12) {
      ctx.fillRect(mx + 12, ty, mw - 24, 3);
    }

    // Wooden Minecart loaded with Glowing Blue Database Crystals
    const cartX = mx + 16;
    const cartY = my + mh - 24;
    ctx.fillStyle = '#5c3a21';
    ctx.fillRect(cartX, cartY, 42, 22);
    ctx.fillStyle = '#1e293b'; // iron wheels
    ctx.fillRect(cartX + 4, cartY + 20, 8, 8);
    ctx.fillRect(cartX + 30, cartY + 20, 8, 8);
    // Glowing Database Crystals
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(cartX + 8, cartY - 8, 8, 10);
    ctx.fillRect(cartX + 22, cartY - 12, 10, 14);
    ctx.fillStyle = '#67e8f9';
    ctx.fillRect(cartX + 10, cartY - 6, 4, 6);

    // Hanging miner lantern
    pixelAssets.drawPixelLantern(ctx, mx + mw + 8, my + 15, true);
  }

  // 7. Blacksmith: Forge with smoking chimney, open blazing hearth fire, stone hammer on roof
  private drawBlacksmith(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    // Stone forge masonry
    ctx.fillStyle = '#334155';
    ctx.fillRect(x + 12, y + 45, w - 24, h - 45);
    ctx.fillStyle = '#475569';
    ctx.fillRect(x + 18, y + 50, w - 36, h - 55);

    // Roof: Timber gabled roof
    ctx.fillStyle = '#451a03';
    ctx.fillRect(x + 6, y + 32, w - 12, 20);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x + 18, y + 16, w - 36, 18);
    ctx.fillRect(x + 32, y + 4, w - 64, 14);

    // Stone Chimney with billowing smoke
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x + 24, y - 24, 20, 36);
    ctx.fillStyle = 'rgba(203, 213, 225, 0.6)';
    const smokeBob = Math.sin(this.animTimer * 5) * 4;
    ctx.fillRect(x + 28, y - 36 + smokeBob, 12, 12);
    ctx.fillRect(x + 32, y - 48 + smokeBob, 16, 14);

    // Giant Stone Hammer mounted on Roof (From Reference Screenshot!)
    const hamX = x + Math.floor(w / 2);
    const hamY = y + 8;
    ctx.fillStyle = '#94a3b8'; // Stone hammer head
    ctx.fillRect(hamX - 16, hamY - 14, 32, 12);
    ctx.fillStyle = '#78350f'; // Wooden handle
    ctx.fillRect(hamX - 3, hamY - 4, 6, 20);

    // Open Roaring Hearth with Blazing Orange Fire
    const fx = x + Math.floor(w / 2) - 30;
    const fy = y + h - 60;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(fx, fy, 60, 60);

    const fFrame = Math.floor(this.animTimer * 8) % 3;
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(fx + 8, fy + 22, 44, 36);
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(fx + 12 + fFrame, fy + 16, 36, 32);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(fx + 18 - fFrame, fy + 8, 24, 26);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(fx + 24, fy + 18, 12, 14);

    // Anvil
    pixelAssets.drawPixelAnvil(ctx, x + w - 38, y + h - 16);
  }

  // 8. Library: Stone archive with blue-slate roof and books sign
  private drawLibrary(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    // Stone walls
    ctx.fillStyle = '#334155';
    ctx.fillRect(x + 12, y + 45, w - 24, h - 45);
    ctx.fillStyle = '#475569';
    ctx.fillRect(x + 18, y + 50, w - 36, h - 55);

    // Cobalt-Blue Slate Shingle Roof (From Reference Screenshot!)
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(x + 6, y + 30, w - 12, 22);
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(x + 18, y + 14, w - 36, 18);
    ctx.fillRect(x + 34, y + 2, w - 68, 14);

    // Arched Windows with warm candle glow
    for (let i = 0; i < 2; i++) {
      const wx = x + 35 + i * (w - 100);
      const wy = y + 65;
      ctx.fillStyle = '#fde047';
      ctx.fillRect(wx, wy, 26, 38);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(wx + 11, wy, 4, 38);
      ctx.fillRect(wx, wy + 18, 26, 4);
    }

    // Wooden Door
    const dx = x + Math.floor(w / 2) - 18;
    const dy = y + h - 50;
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(dx, dy, 36, 50);
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(dx + 26, dy + 24, 3, 4);

    // Book Sign
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(x + 25, y + 35, 14, 10);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(x + 27, y + 37, 10, 6);
  }

  // 9. Your Home: Red terracotta clay shingle roof house, brick chimney, mailbox
  private drawHome(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    // White/Cream timber walls
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(x + 14, y + 48, w - 28, h - 48);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(x + 18, y + 52, w - 36, h - 54);

    // Red Terracotta Clay Shingle Roof (From Reference Screenshot!)
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(x + 6, y + 32, w - 12, 22);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(x + 18, y + 16, w - 36, 18);
    ctx.fillRect(x + 36, y + 4, w - 72, 14);

    // Brick Chimney with smoke
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(x + w - 44, y - 18, 18, 30);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillRect(x + w - 40, y - 28, 8, 8);

    // Front Door
    const dx = x + Math.floor(w / 2) - 16;
    const dy = y + h - 48;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(dx, dy, 32, 48);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(dx + 22, dy + 22, 3, 3);

    // Front Windows with curtains
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(x + 30, y + 65, 24, 26);
    ctx.fillRect(x + w - 54, y + 65, 24, 26);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(x + 40, y + 65, 4, 26);
    ctx.fillRect(x + w - 44, y + 65, 4, 26);

    // Red Mailbox in Front Yard (From Reference Screenshot!)
    const mbX = x - 8;
    const mbY = y + h - 22;
    ctx.fillStyle = '#78350f'; // post
    ctx.fillRect(mbX + 4, mbY, 4, 22);
    ctx.fillStyle = '#dc2626'; // red box
    ctx.fillRect(mbX, mbY - 12, 12, 12);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(mbX + 2, mbY - 10, 8, 4);
  }

  // 10. Analytics Tower: Cylindrical stone castle tower with conical roof & blue bar-chart banner
  private drawAnalyticsTower(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    // Round Tower Stone Body
    ctx.fillStyle = '#475569';
    ctx.fillRect(x + 20, y + 55, w - 40, h - 55);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(x + 26, y + 60, w - 52, h - 65);

    // Battlements
    for (let bx = x + 16; bx <= x + w - 24; bx += 16) {
      ctx.fillStyle = '#334155';
      ctx.fillRect(bx, y + 42, 10, 14);
    }

    // Conical Slate Roof
    ctx.fillStyle = '#1e293b';
    for (let r = 0; r < 36; r += 4) {
      const rw = w - 20 - r * 4;
      const rx = x + 10 + r * 2;
      ctx.fillRect(rx, y + 42 - r, rw, 4);
    }

    // Blue Banner with Bar-Chart Icon (From Reference Screenshot!)
    const banX = x + Math.floor(w / 2) - 16;
    const banY = y + 65;
    ctx.fillStyle = '#1d4ed8'; // blue banner
    ctx.fillRect(banX, banY, 32, 42);
    // V-cut bottom
    ctx.beginPath();
    ctx.moveTo(banX, banY + 42);
    ctx.lineTo(banX + 16, banY + 50);
    ctx.lineTo(banX + 32, banY + 42);
    ctx.closePath();
    ctx.fill();
    // White Bar-Chart Icon
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(banX + 6, banY + 22, 5, 12);
    ctx.fillRect(banX + 13, banY + 14, 5, 20);
    ctx.fillRect(banX + 20, banY + 8, 5, 26);

    // Tower Archway Door
    const dx = x + Math.floor(w / 2) - 14;
    const dy = y + h - 42;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(dx, dy, 28, 42);
  }

  // 11. ML Laboratory
  private drawMLLab(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(x + 12, y + 45, w - 24, h - 45);
    // Glass Dome Roof with Glowing Neural Core
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(x + Math.floor(w / 2) - 24, y + 8, 48, 36);
    ctx.fillStyle = '#f472b6';
    ctx.fillRect(x + Math.floor(w / 2) - 16, y + 14, 32, 24);
  }

  // 12. Boss Arena
  private drawBossArena(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.fillStyle = '#881337';
    ctx.fillRect(x + 12, y + 45, w - 24, h - 45);
    // Crossed Swords Banner
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(x + Math.floor(w / 2) - 18, y + 16, 36, 32);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + Math.floor(w / 2) - 10, y + 24, 20, 4);
    ctx.fillRect(x + Math.floor(w / 2) - 2, y + 16, 4, 20);
  }

  // 13. Contact Post Office
  private drawPostOffice(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.fillStyle = '#0f766e';
    ctx.fillRect(x + 12, y + 40, w - 24, h - 40);
    ctx.fillStyle = '#14b8a6';
    ctx.fillRect(x + 18, y + 18, w - 36, 24);
  }

  // -------------------------------------------------------------
  // OVERHEAD RETRO BUILDING PLAQUE (EXACTLY MATCHING REFERENCE SCREENSHOT)
  // -------------------------------------------------------------
  private drawBuildingPlaque(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    title: string,
    subtitle: string
  ) {
    ctx.save();
    ctx.font = '700 9px "Press Start 2P", monospace';
    const titleW = ctx.measureText(title).width;

    ctx.font = '600 7px "Press Start 2P", monospace';
    const subW = ctx.measureText(subtitle).width;

    const boxW = Math.max(titleW, subW) + 24;
    const boxH = 34;
    const bx = Math.floor(x - boxW / 2);
    const by = Math.floor(y);

    // Drop Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(bx + 3, by + 3, boxW, boxH);

    // Dark Stone Card Body
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(bx, by, boxW, boxH);

    // Amber-Gold Pixel Border (Matching Reference Screenshot!)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(bx, by, boxW, boxH);

    // Title Text (Golden Yellow)
    ctx.fillStyle = '#fde047';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '700 8px "Press Start 2P", monospace';
    ctx.fillText(title, x, by + 7);

    // Subtitle Text (Muted Slate / Light Blue)
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 6px "Press Start 2P", monospace';
    ctx.fillText(subtitle, x, by + 21);

    ctx.restore();
  }

  // Oak Tree (Lush Round Pixel Foliage)
  private drawOakTree(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    ctx.save();
    const oakImg = assetManager.getImage('/assets/environment/tree_oak.png');
    if (oakImg) {
      const tw = r * 2.5;
      const th = r * 2.5;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
      ctx.beginPath();
      ctx.ellipse(x, y + r - 2, tw * 0.32, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(oakImg, x - tw / 2, y - th + r, tw, th);
      ctx.restore();
      return;
    }
    // Shadow
    ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
    ctx.fillRect(x - r + 4, y + r - 4, r * 2 - 8, 8);
    // Trunk
    ctx.fillStyle = '#5c3a21';
    ctx.fillRect(x - 5, y + 6, 10, r - 6);
    // Foliage Clusters
    ctx.fillStyle = '#2d6d42';
    ctx.fillRect(x - r, y - r, r * 2, r * 2 - 6);
    ctx.fillStyle = '#388251';
    ctx.fillRect(x - r + 4, y - r + 4, r * 2 - 8, r * 2 - 12);
    ctx.fillStyle = '#459b63';
    ctx.fillRect(x - r + 8, y - r + 6, r * 1.2, r * 0.8);
    ctx.restore();
  }

  // Pine Tree
  private drawPineTree(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    ctx.save();
    const pineImg = assetManager.getImage('/assets/environment/tree_pine.png');
    if (pineImg) {
      const tw = r * 2.5;
      const th = r * 2.5;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
      ctx.beginPath();
      ctx.ellipse(x, y + r - 2, tw * 0.32, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(pineImg, x - tw / 2, y - th + r, tw, th);
      ctx.restore();
      return;
    }
    ctx.fillStyle = '#5c3a21';
    ctx.fillRect(x - 4, y + 10, 8, r);
    ctx.fillStyle = '#1b4332';
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r, y + 10);
    ctx.lineTo(x - r, y + 10);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Cached lightmap canvas and context for additive light pools & darkness cutout
  private lightmapCanvas: HTMLCanvasElement | null = null;
  private lightmapCtx: CanvasRenderingContext2D | null = null;

  private getLightmap(width: number, height: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null {
    if (!this.lightmapCanvas || this.lightmapCanvas.width !== width || this.lightmapCanvas.height !== height) {
      this.lightmapCanvas = document.createElement('canvas');
      this.lightmapCanvas.width = width;
      this.lightmapCanvas.height = height;
      this.lightmapCtx = this.lightmapCanvas.getContext('2d');
    }
    if (!this.lightmapCtx) return null;
    return { canvas: this.lightmapCanvas, ctx: this.lightmapCtx };
  }

  // Atmospheric Lighting Shader: Single cached lightmap, additive light pools, time-of-day tints & vignette
  public renderLightingShader(
    ctx: CanvasRenderingContext2D,
    cameraX: number,
    cameraY: number,
    timeOfDay: TimeOfDay,
    player?: PlayerCharacter
  ) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const lightmap = this.getLightmap(w, h);
    if (!lightmap) return;

    const { canvas: lmCanvas, ctx: lmCtx } = lightmap;

    // 1. Reset lightmap buffer
    lmCtx.globalCompositeOperation = 'source-over';
    lmCtx.clearRect(0, 0, w, h);

    // 2. Base atmospheric ambient tint
    if (timeOfDay === 'day') {
      // Warm golden sunlight tint
      lmCtx.fillStyle = 'rgba(255, 235, 180, 0.08)';
      lmCtx.fillRect(0, 0, w, h);
    } else if (timeOfDay === 'sunset') {
      // Rich golden-hour amber/rose atmospheric tint
      lmCtx.fillStyle = 'rgba(180, 75, 45, 0.32)';
      lmCtx.fillRect(0, 0, w, h);
    } else {
      // Deep nocturnal navy/slate
      lmCtx.fillStyle = 'rgba(10, 16, 36, 0.78)';
      lmCtx.fillRect(0, 0, w, h);
    }

    // 3. For sunset and night: Additive light pools cutout
    if (timeOfDay !== 'day') {
      const isNight = timeOfDay === 'night';
      const glowAlpha = isNight ? 1.0 : 0.65;

      // Punch soft light holes through darkness using destination-out
      lmCtx.globalCompositeOperation = 'destination-out';

      const punchHole = (lx: number, ly: number, radius: number, strength: number = 1.0) => {
        const sx = Math.round(lx - cameraX);
        const sy = Math.round(ly - cameraY);
        if (sx < -radius || sx > w + radius || sy < -radius || sy > h + radius) return;

        const grad = lmCtx.createRadialGradient(sx, sy, 0, sx, sy, radius);
        grad.addColorStop(0, `rgba(0, 0, 0, ${Math.min(1, 0.92 * strength)})`);
        grad.addColorStop(0.55, `rgba(0, 0, 0, ${Math.min(1, 0.5 * strength)})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        lmCtx.fillStyle = grad;
        lmCtx.beginPath();
        lmCtx.arc(sx, sy, radius, 0, Math.PI * 2);
        lmCtx.fill();
      };

      // Street Lanterns
      const lanterns = [
        { x: 1080, y: 860 },
        { x: 1320, y: 860 },
        { x: 1080, y: 1060 },
        { x: 1320, y: 1060 },
        { x: 745, y: 740 },
        { x: 1850, y: 740 },
        { x: 755, y: 1560 },
        { x: 1840, y: 1580 },
        { x: 2160, y: 1100 }
      ];
      lanterns.forEach(lp => punchHole(lp.x, lp.y - 40, TUNING.ATMOSPHERE.LIGHT_RADII.LANTERN, glowAlpha));

      // Building Windows
      const windows = [
        { x: 715, y: 690 }, { x: 775, y: 690 },       // Coffee shop
        { x: 1160, y: 685 }, { x: 1240, y: 685 },     // Guild hall
        { x: 1165, y: 1510 }, { x: 1235, y: 1510 },   // Home
        { x: 720, y: 1520 }, { x: 790, y: 1520 },     // Library
        { x: 1170, y: 1840 }, { x: 1230, y: 1840 }    // Post office
      ];
      windows.forEach(win => punchHole(win.x, win.y, TUNING.ATMOSPHERE.LIGHT_RADII.WINDOW, glowAlpha * 0.85));

      // Blacksmith Forge Hearth
      punchHole(2300, 1110, TUNING.ATMOSPHERE.LIGHT_RADII.FORGE, glowAlpha * 1.25);

      // Python Cave Crystals
      const crystals = [
        { x: 1720, y: 560 }, { x: 1970, y: 550 },
        { x: 1730, y: 690 }, { x: 1960, y: 680 }
      ];
      crystals.forEach(cr => punchHole(cr.x, cr.y - 10, TUNING.ATMOSPHERE.LIGHT_RADII.CRYSTAL, glowAlpha * 0.95));

      // SQL Mine Shaft Lantern
      punchHole(1850, 1120, TUNING.ATMOSPHERE.LIGHT_RADII.MINES_LANTERN, glowAlpha);

      // Player small aura / lantern
      if (player) {
        punchHole(player.state.x, player.state.y, 42, 0.75);
      }

      // 4. Stamp warm colored additive light pools
      lmCtx.globalCompositeOperation = 'source-over';

      const addColorPool = (lx: number, ly: number, radius: number, color: string) => {
        const sx = Math.round(lx - cameraX);
        const sy = Math.round(ly - cameraY);
        if (sx < -radius || sx > w + radius || sy < -radius || sy > h + radius) return;

        const grad = lmCtx.createRadialGradient(sx, sy, 0, sx, sy, radius);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'transparent');
        lmCtx.fillStyle = grad;
        lmCtx.beginPath();
        lmCtx.arc(sx, sy, radius, 0, Math.PI * 2);
        lmCtx.fill();
      };

      // Lantern amber glow
      lanterns.forEach(lp => addColorPool(lp.x, lp.y - 40, TUNING.ATMOSPHERE.LIGHT_RADII.LANTERN, 'rgba(253, 224, 71, 0.35)'));

      // Forge roaring hearth
      addColorPool(2300, 1110, TUNING.ATMOSPHERE.LIGHT_RADII.FORGE, 'rgba(249, 115, 22, 0.45)');

      // Python Cave arcane cyan
      crystals.forEach(cr => addColorPool(cr.x, cr.y - 10, TUNING.ATMOSPHERE.LIGHT_RADII.CRYSTAL, 'rgba(56, 189, 248, 0.45)'));

      // Windows warm interior lighting
      windows.forEach(win => addColorPool(win.x, win.y, TUNING.ATMOSPHERE.LIGHT_RADII.WINDOW, 'rgba(251, 191, 36, 0.30)'));
    }

    // 5. Blend the lightmap onto the game canvas in a single draw call
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(lmCanvas, 0, 0);

    // 6. Subtle edge vignette and color grade
    const cxCenter = w / 2;
    const cyCenter = h / 2;
    const maxRadius = Math.hypot(cxCenter, cyCenter);
    const vignette = ctx.createRadialGradient(cxCenter, cyCenter, maxRadius * 0.55, cxCenter, cyCenter, maxRadius);
    vignette.addColorStop(0, 'transparent');
    vignette.addColorStop(1, `rgba(10, 15, 30, ${timeOfDay === 'night' ? 0.6 : TUNING.ATMOSPHERE.VIGNETTE_INTENSITY})`);
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    ctx.restore();
  }
}
