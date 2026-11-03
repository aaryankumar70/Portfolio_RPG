import { BuildingData, TimeOfDay, NPC, DepthObject } from '../types';
import { pixelAssets } from './PixelArtAssets';
import { PlayerCharacter } from './PlayerCharacter';
import { NPCManager } from './NPCManager';
import { MangoPet } from './MangoPet';
import { assetManager } from './AssetManager';

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

    // 4. Perimeter Tree Groves
    this.drawPerimeterTrees(ctx, cameraX, cameraY);

    // 5. Birds in the Sky
    this.drawBirds(ctx, cameraX, cameraY);

    // 6. Y-Sorted Entities (Buildings, Fountain, NPCs, Mango, Player, Foliage)
    this.drawYSortedEntities(ctx, cameraX, cameraY, timeOfDay, buildings, npcManager, player, mangoPet);
  }

  // 1. Natural Green Grass Meadow Terrain
  private drawTerrain(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number, timeOfDay: TimeOfDay) {
    const grassPattern = pixelAssets.getGrassPattern(ctx);
    ctx.fillStyle = grassPattern;
    ctx.fillRect(-cameraX, -cameraY, this.worldWidth, this.worldHeight);

    // Soft organic grass clump accents
    ctx.fillStyle = '#2d6d42';
    for (let gx = 100; gx < this.worldWidth - 100; gx += 160) {
      for (let gy = 360; gy < this.worldHeight - 100; gy += 130) {
        const px = gx - cameraX;
        const py = gy - cameraY;
        ctx.fillRect(px, py, 18, 6);
        ctx.fillRect(px + 4, py - 3, 10, 3);
      }
    }
  }

  // 2. Connected Cobblestone / Dirt Road Network & Central Circular Plaza
  private drawRoadsAndPlaza(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    ctx.save();
    const cobblePattern = pixelAssets.getCobblePattern(ctx);
    ctx.fillStyle = cobblePattern;

    const centerX = 1200 - cameraX;
    const centerY = 960 - cameraY;

    // A. Central Circular Plaza around Fountain (Radius ~160px)
    ctx.beginPath();
    ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
    ctx.fill();

    // Cobblestone border rim
    ctx.strokeStyle = '#5c3a21';
    ctx.lineWidth = 4;
    ctx.stroke();

    // B. Connected Radial Roads to all locations (Matching Reference Screenshot):
    const roadWidth = 64;

    // Road North to Guild Hall (1200, 480)
    ctx.fillRect(centerX - roadWidth / 2, centerY - 480, roadWidth, 480);

    // Road North-West to Coffee Shop (620, 520)
    this.drawDiagonalPath(ctx, centerX - 100, centerY - 100, 745 - cameraX, 710 - cameraY, 56);

    // Road North-East to Python Cave (1720, 520)
    this.drawDiagonalPath(ctx, centerX + 100, centerY - 100, 1850 - cameraX, 720 - cameraY, 56);

    // Road West to Garden (620, 920)
    ctx.fillRect(740 - cameraX, centerY - roadWidth / 2, centerX - (740 - cameraX), roadWidth);

    // Road East to SQL Mines (1720, 920) and Blacksmith (2180, 900)
    ctx.fillRect(centerX, centerY - roadWidth / 2, 2300 - cameraX - centerX, roadWidth);

    // Road South-West to Library (620, 1320)
    this.drawDiagonalPath(ctx, centerX - 100, centerY + 100, 755 - cameraX, 1540 - cameraY, 56);

    // Road South to Your Home (1160, 1320) & Post Office (1160, 1680)
    ctx.fillRect(centerX - roadWidth / 2, centerY, roadWidth, 900);

    // Road South-East to Analytics Tower (1720, 1320)
    this.drawDiagonalPath(ctx, centerX + 100, centerY + 100, 1840 - cameraX, 1560 - cameraY, 56);

    // Road from Blacksmith North to ML Lab (2180, 520)
    ctx.fillRect(2300 - cameraX - roadWidth / 2, 720 - cameraY, roadWidth, 400);

    // Road from Analytics Tower East to Boss Arena (2180, 1320)
    ctx.fillRect(1840 - cameraX, 1530 - cameraY - roadWidth / 2, 460, roadWidth);

    ctx.restore();
  }

  // Draw smooth angled path connecting road hubs
  private drawDiagonalPath(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    width: number
  ) {
    ctx.save();
    ctx.lineWidth = width;
    ctx.strokeStyle = pixelAssets.getCobblePattern(ctx);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  // 3. Eastern Winding River with Stone Bank Borders & Bridge
  private drawRiver(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    ctx.save();
    const riverStartX = 2520 - cameraX;

    // River Water (Animated Pixel Water Tile or Sparkling Blue)
    const waterFrame = (Math.floor(this.animTimer * 3) % 3) + 1;
    const waterImg = assetManager.getImage(`/assets/tilesets/water_0${waterFrame}.png`);
    if (waterImg) {
      const pat = ctx.createPattern(waterImg, 'repeat');
      ctx.fillStyle = pat ? pat : '#2563eb';
    } else {
      ctx.fillStyle = '#2563eb';
    }
    ctx.beginPath();
    ctx.moveTo(riverStartX, 0);
    ctx.bezierCurveTo(riverStartX - 50, 600, riverStartX + 60, 1200, riverStartX - 30, 2200);
    ctx.lineTo(this.worldWidth - cameraX, 2200);
    ctx.lineTo(this.worldWidth - cameraX, 0);
    ctx.closePath();
    ctx.fill();

    // River Stone Bank Border
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(riverStartX, 0);
    ctx.bezierCurveTo(riverStartX - 50, 600, riverStartX + 60, 1200, riverStartX - 30, 2200);
    ctx.stroke();

    // Water Shimmer Ripples
    ctx.fillStyle = '#93c5fd';
    const flow = Math.floor(this.animTimer * 5);
    for (let i = 0; i < 20; i++) {
      const rx = riverStartX + 40 + ((i * 37) % 140);
      const ry = ((flow * 14 + i * 110) % 2100);
      ctx.fillRect(rx, ry, 28, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(rx + 6, ry, 12, 1);
      ctx.fillStyle = '#93c5fd';
    }

    // Wooden Bridge Crossing River at Y: 900-960
    const bridgeX = 2460 - cameraX;
    const bridgeY = 900 - cameraY;
    const bridgeW = 150;
    const bridgeH = 64;

    ctx.fillStyle = '#451a03'; // dark timber
    ctx.fillRect(bridgeX, bridgeY, bridgeW, bridgeH);
    ctx.fillStyle = '#78350f';
    for (let by = 0; by < bridgeH; by += 8) {
      ctx.fillRect(bridgeX, bridgeY + by, bridgeW, 6);
    }
    // Bridge rails
    ctx.fillStyle = '#291003';
    ctx.fillRect(bridgeX, bridgeY - 3, bridgeW, 4);
    ctx.fillRect(bridgeX, bridgeY + bridgeH - 1, bridgeW, 4);

    ctx.restore();
  }

  // 4. Perimeter Rounded Oak & Pine Trees (Enclosing the Town)
  private drawPerimeterTrees(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    ctx.save();
    // Left border trees
    for (let ty = 340; ty < this.worldHeight; ty += 120) {
      this.drawOakTree(ctx, 400 - cameraX, ty - cameraY, 46);
      this.drawPineTree(ctx, 320 - cameraX, ty + 50 - cameraY, 38);
    }
    // Top border trees
    for (let tx = 400; tx < this.worldWidth - 300; tx += 140) {
      this.drawOakTree(ctx, tx - cameraX, 340 - cameraY, 44);
    }
    ctx.restore();
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
      const bx = Math.floor(b.x - cameraX);
      const by = Math.floor(b.y - cameraY);
      const baseY = b.y + b.height;

      depthList.push({
        y: baseY,
        render: (c) => {
          c.save();
          const spritePath = WorldRenderer.BUILDING_SPRITE_MAP[b.id];
          const img = spritePath ? assetManager.getImage(spritePath) : null;

          if (img) {
            const scale = b.id === 'analytics_tower' ? 2.0 : 2.2;
            const destW = Math.floor(img.naturalWidth * scale);
            const destH = Math.floor(img.naturalHeight * scale);
            const destX = Math.floor(bx + (b.width - destW) / 2);
            const destY = Math.floor(by + b.height - destH);

            // Ground contact shadow
            c.fillStyle = 'rgba(15, 23, 42, 0.45)';
            c.beginPath();
            c.ellipse(bx + Math.floor(b.width / 2), by + b.height - 4, Math.floor(destW * 0.46), 14, 0, 0, Math.PI * 2);
            c.fill();

            c.imageSmoothingEnabled = false;
            c.drawImage(img, destX, destY, destW, destH);
          } else {
            // Drop shadow fallback
            c.fillStyle = 'rgba(15, 23, 42, 0.4)';
            c.fillRect(bx - 6, by + b.height - 8, b.width + 12, 16);

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

          // Overhead floating plaque matching reference screenshot!
          this.drawBuildingPlaque(c, bx + Math.floor(b.width / 2), by - 14, b.name, b.subtitle);
          c.restore();
        }
      });
    });

    // 2. Central Town Square Fountain (Centered at 1200, 960)
    depthList.push({
      y: 960 + 35,
      render: (c) => this.drawTownSquareFountain(c, 1200 - cameraX, 960 - cameraY)
    });

    // 3. Street Lanterns & Lamp Posts
    const lanterns = [
      { x: 1060, y: 840 },
      { x: 1340, y: 840 },
      { x: 1060, y: 1080 },
      { x: 1340, y: 1080 },
      { x: 740, y: 730 },
      { x: 1850, y: 740 },
      { x: 750, y: 1530 },
      { x: 1840, y: 1550 },
      { x: 2160, y: 1100 }
    ];
    lanterns.forEach((lp) => {
      depthList.push({
        y: lp.y + 4,
        render: (c) => {
          const lampImg = assetManager.getImage('/assets/environment/lamp_post.png');
          if (lampImg) {
            c.save();
            c.imageSmoothingEnabled = false;
            c.fillStyle = 'rgba(15, 23, 42, 0.4)';
            c.beginPath();
            c.ellipse(lp.x - cameraX, lp.y - cameraY + 2, 8, 4, 0, 0, Math.PI * 2);
            c.fill();
            c.drawImage(lampImg, lp.x - cameraX - 16, lp.y - cameraY - 58, 32, 64);
            c.restore();
          } else {
            pixelAssets.drawPixelLantern(c, lp.x - cameraX, lp.y - cameraY, false);
          }
        }
      });
    });

    // 4. Town Benches (near central plaza and gardens)
    const benches = [
      { x: 1100, y: 920 },
      { x: 1300, y: 920 },
      { x: 1100, y: 1020 },
      { x: 1300, y: 1020 }
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

    // 5. Environmental Crates & Barrels
    const barrelsAndCrates = [
      { x: 2160, y: 940, type: 'barrel' },
      { x: 2176, y: 954, type: 'crate' },
      { x: 605, y: 550, type: 'barrel' },
      { x: 620, y: 565, type: 'crate' },
      { x: 1700, y: 950, type: 'crate' },
      { x: 1715, y: 960, type: 'barrel' }
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

    // 6. Natural Trees inside the Town (Gardens, Courtyards, Riverbanks)
    const townTrees = [
      { x: 660, y: 440, type: 'oak' },
      { x: 860, y: 450, type: 'cherry' },
      { x: 1680, y: 450, type: 'pine' },
      { x: 1980, y: 460, type: 'autumn' },
      { x: 570, y: 1260, type: 'oak' },
      { x: 870, y: 1250, type: 'cherry' },
      { x: 1670, y: 1260, type: 'pine' },
      { x: 1980, y: 1260, type: 'autumn' },
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
            c.fillStyle = 'rgba(15, 23, 42, 0.4)';
            c.beginPath();
            c.ellipse(t.x - cameraX, t.y - cameraY + 20, 36, 12, 0, 0, Math.PI * 2);
            c.fill();
            c.drawImage(img, t.x - cameraX - 58, t.y - cameraY - 90, 116, 116);
            c.restore();
          } else {
            this.drawOakTree(c, t.x - cameraX, t.y - cameraY, 44);
          }
        }
      });
    });

    // 7. NPCs (Production Idle Spritesheets)
    npcManager.npcs.forEach((npc) => {
      depthList.push({
        y: npc.y,
        render: (c) => npcManager.renderNPC(c, npc, cameraX, cameraY, this.animTimer)
      });
    });

    // 8. Mango the Cat Pet Companion (Autonomous Follow AI & Animations)
    if (mangoPet) {
      depthList.push({
        y: mangoPet.y,
        render: (c) => mangoPet.render(c, cameraX, cameraY)
      });
    }

    // 9. Player Character (Aryan - 4-Direction Walk / Idle Cycles)
    depthList.push({
      y: player.state.y,
      render: (c) => player.render(c, cameraX, cameraY)
    });

    // Sort all entities by base Y (depth-sorting)
    depthList.sort((a, b) => a.y - b.y);

    depthList.forEach((item) => item.render(ctx));
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

  // Atmospheric Lighting Shader (Warm natural sunlight)
  public renderLightingShader(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number, timeOfDay: TimeOfDay) {
    ctx.save();
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    // Subtle edge vignette
    const cxCenter = w / 2;
    const cyCenter = h / 2;
    const maxRadius = Math.hypot(cxCenter, cyCenter);
    const vignette = ctx.createRadialGradient(cxCenter, cyCenter, maxRadius * 0.55, cxCenter, cyCenter, maxRadius);
    vignette.addColorStop(0, 'transparent');
    vignette.addColorStop(1, timeOfDay === 'night' ? 'rgba(10, 15, 30, 0.7)' : 'rgba(15, 23, 42, 0.25)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    ctx.restore();
  }
}
