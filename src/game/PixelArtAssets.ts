// PixelArtAssets.ts - Hyper Light Drifter & Vibrant Fantasy Pixel Art Engine
// Generates crisp, authentic 16-bit / 32-bit pixel sprites and tilesets with vibrant cyan, magenta, lavender, and teal palettes.

import { assetManager } from './AssetManager';

export class PixelArtAssets {
  private cache: Map<string, HTMLCanvasElement> = new Map();
  private imageCache: Map<string, HTMLImageElement> = new Map();

  // Async loader and cache for production sprite art
  public loadImage(key: string, src: string): Promise<HTMLImageElement> {
    if (this.imageCache.has(key)) {
      return Promise.resolve(this.imageCache.get(key)!);
    }
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.imageCache.set(key, img);
        resolve(img);
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  public getImage(key: string): HTMLImageElement | undefined {
    return this.imageCache.get(key);
  }

  private createCanvas(width: number, height: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    ctx.imageSmoothingEnabled = false;
    return { canvas, ctx };
  }

  private setPixel(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
  }

  private fillPixelRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
  }

  // -------------------------------------------------------------
  // 1. TILE PATTERNS (Vibrant 16-Bit / 32-Bit RPG Style)
  // -------------------------------------------------------------

  // Natural Green Grass Pattern (Matching Reference Screenshot)
  public getGrassPattern(ctx: CanvasRenderingContext2D): CanvasPattern {
    const grassImg = assetManager.getImage('/assets/tilesets/grass_01.png');
    if (grassImg) {
      const pat = ctx.createPattern(grassImg, 'repeat');
      if (pat) return pat;
    }
    const key = 'pattern_natural_grass_rpg';
    if (!this.cache.has(key)) {
      const { canvas, ctx: c } = this.createCanvas(32, 32);
      // Base vibrant meadow green
      this.fillPixelRect(c, 0, 0, 32, 32, '#388251');

      // Varied grass clumps and natural dithering
      const patches = [
        { x: 2, y: 3, w: 8, h: 6, col: '#459b63' },
        { x: 18, y: 5, w: 10, h: 7, col: '#459b63' },
        { x: 6, y: 18, w: 11, h: 8, col: '#2d6d42' },
        { x: 22, y: 20, w: 8, h: 7, col: '#459b63' }
      ];
      patches.forEach(p => this.fillPixelRect(c, p.x, p.y, p.w, p.h, p.col));

      // Grass blades highlights
      const blades = [
        [4, 4], [5, 3], [12, 10], [20, 7], [21, 6], [27, 14],
        [8, 20], [9, 19], [15, 26], [24, 22], [25, 21], [30, 28]
      ];
      c.fillStyle = '#66ca89';
      blades.forEach(([bx, by]) => c.fillRect(bx, by, 1, 2));

      // Tiny natural wild flowers (Red, Yellow, White dots)
      this.setPixel(c, 7, 8, '#fde047');   // yellow daisy
      this.setPixel(c, 26, 12, '#f43f5e'); // red poppy
      this.setPixel(c, 14, 22, '#fdf4ff'); // white clover
      this.setPixel(c, 29, 25, '#c084fc'); // lavender violet

      this.cache.set(key, canvas);
    }
    return ctx.createPattern(this.cache.get(key)!, 'repeat')!;
  }

  // Cobblestone Road Pattern: Warm earthy stone road matching reference screenshot
  public getCobblePattern(ctx: CanvasRenderingContext2D): CanvasPattern {
    const cobbleImg = assetManager.getImage('/assets/tilesets/cobblestone.png');
    if (cobbleImg) {
      const pat = ctx.createPattern(cobbleImg, 'repeat');
      if (pat) return pat;
    }
    const key = 'pattern_cobble_road_rpg';
    if (!this.cache.has(key)) {
      const { canvas, ctx: c } = this.createCanvas(24, 24);
      this.fillPixelRect(c, 0, 0, 24, 24, '#8b5e3c'); // Earthy grout seam

      const stones = [
        { x: 1, y: 1, w: 10, h: 6, col: '#d4a373', hi: '#faedcd' },
        { x: 13, y: 1, w: 9, h: 5, col: '#c59263', hi: '#e9d8a6' },
        { x: 1, y: 9, w: 7, h: 6, col: '#c59263', hi: '#e9d8a6' },
        { x: 10, y: 8, w: 12, h: 7, col: '#d4a373', hi: '#faedcd' },
        { x: 2, y: 17, w: 11, h: 6, col: '#d4a373', hi: '#faedcd' },
        { x: 15, y: 17, w: 7, h: 6, col: '#b88255', hi: '#d4a373' }
      ];

      stones.forEach(s => {
        this.fillPixelRect(c, s.x, s.y, s.w, s.h, s.col);
        this.fillPixelRect(c, s.x + 1, s.y + 1, s.w - 2, 1, s.hi);
        this.setPixel(c, s.x + 2, s.y + 3, '#eed9b0');
      });

      this.cache.set(key, canvas);
    }
    return ctx.createPattern(this.cache.get(key)!, 'repeat')!;
  }

  // Town Square Flagstone Pattern for central plaza
  public getFlagstonePattern(ctx: CanvasRenderingContext2D): CanvasPattern {
    const key = 'pattern_town_square_plaza';
    if (!this.cache.has(key)) {
      const { canvas, ctx: c } = this.createCanvas(32, 32);
      this.fillPixelRect(c, 0, 0, 32, 32, '#64748b'); // Slate seam

      const tiles = [
        { x: 1, y: 1, w: 14, h: 14, col: '#cbd5e1', hi: '#f1f5f9' },
        { x: 17, y: 1, w: 14, h: 14, col: '#94a3b8', hi: '#e2e8f0' },
        { x: 1, y: 17, w: 14, h: 14, col: '#94a3b8', hi: '#e2e8f0' },
        { x: 17, y: 17, w: 14, h: 14, col: '#cbd5e1', hi: '#f1f5f9' }
      ];

      tiles.forEach(t => {
        this.fillPixelRect(c, t.x, t.y, t.w, t.h, t.col);
        this.fillPixelRect(c, t.x + 1, t.y + 1, t.w - 2, 1, t.hi);
      });

      this.cache.set(key, canvas);
    }
    return ctx.createPattern(this.cache.get(key)!, 'repeat')!;
  }

  // Boardwalk Plank Pattern: Dark mahogany with cyan-moss edges
  public getWoodPlankPattern(ctx: CanvasRenderingContext2D): CanvasPattern {
    const key = 'pattern_wood_fantasy';
    if (!this.cache.has(key)) {
      const { canvas, ctx: c } = this.createCanvas(24, 16);
      this.fillPixelRect(c, 0, 0, 24, 16, '#180e14');
      for (let y = 0; y < 16; y += 4) {
        this.fillPixelRect(c, 0, y, 24, 3, '#331a28');
        this.fillPixelRect(c, 0, y, 24, 1, '#4f2940');
        this.fillPixelRect(c, 0, y + 3, 24, 1, '#11070d');
        // Cyan nail heads
        this.setPixel(c, 3, y + 1, '#2dd4bf');
        this.setPixel(c, 20, y + 1, '#2dd4bf');
      }
      this.cache.set(key, canvas);
    }
    return ctx.createPattern(this.cache.get(key)!, 'repeat')!;
  }

  // -------------------------------------------------------------
  // 2. CHARACTER SPRITES (Aryan - RPG Data Explorer Style)
  // -------------------------------------------------------------

  public drawPlayerSprite(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    direction: 'down' | 'up' | 'left' | 'right',
    frame: number,
    isMoving: boolean
  ) {
    const img = assetManager.getImage('/assets/characters/aryan/aryan_spritesheet.png');
    if (img) {
      // Row layout from animations.json:
      // Row 0: idle_down, Row 1: idle_left, Row 2: idle_right, Row 3: idle_up
      // Row 4: walk_down, Row 5: walk_left, Row 6: walk_right, Row 7: walk_up
      let row = 0;
      if (isMoving) {
        if (direction === 'down') row = 4;
        else if (direction === 'left') row = 5;
        else if (direction === 'right') row = 6;
        else if (direction === 'up') row = 7;
      } else {
        if (direction === 'down') row = 0;
        else if (direction === 'left') row = 1;
        else if (direction === 'right') row = 2;
        else if (direction === 'up') row = 3;
      }

      const col = frame % 4;
      const frameW = 32;
      const frameH = 48;
      const scale = 1.7;
      const destW = frameW * scale;
      const destH = frameH * scale;

      ctx.save();
      ctx.translate(Math.floor(x), Math.floor(y));
      ctx.imageSmoothingEnabled = false;

      // Soft ground drop shadow beneath feet
      ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
      ctx.beginPath();
      ctx.ellipse(0, -2, destW * 0.32, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Render sprite frame anchored to ground
      ctx.drawImage(
        img,
        col * frameW,
        row * frameH,
        frameW,
        frameH,
        Math.floor(-destW / 2),
        Math.floor(-destH + 4),
        Math.floor(destW),
        Math.floor(destH)
      );

      ctx.restore();
      return;
    }

    const scale = 2.5;
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));
    ctx.scale(scale, scale);

    // Natural pixel drop shadow beneath feet
    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.fillRect(-7, -2, 14, 4);

    const f = isMoving ? frame % 4 : 0;
    const legOffset = f === 1 ? -2 : f === 3 ? 2 : 0;
    const armSwing = f === 1 ? 2 : f === 3 ? -2 : 0;
    const bob = (f === 1 || f === 3) ? 1 : 0;

    // Aryan's Color Palette (Matching Reference Screenshot)
    const cHair = '#1c1917';        // Dark styled hair
    const cHairHi = '#292524';
    const cSkin = '#fde68a';        // Warm skin tone
    const cSkinShade = '#fcd34d';
    const cJacket = '#1e40af';      // Deep blue blazer/jacket
    const cJacketTrim = '#1d4ed8';
    const cShirt = '#f8fafc';       // White collared inner shirt
    const cPants = '#334155';       // Charcoal grey trousers
    const cBoots = '#0f172a';       // Dark boots
    const cEyes = '#0f172a';

    if (direction === 'down') {
      // 1. Legs / Trousers & Boots
      ctx.fillStyle = cPants;
      ctx.fillRect(-4, -6 + legOffset, 3, 5);
      ctx.fillRect(1, -6 - legOffset, 3, 5);
      ctx.fillStyle = cBoots;
      ctx.fillRect(-5, -2 + legOffset, 4, 2);
      ctx.fillRect(1, -2 - legOffset, 4, 2);

      // 2. Jacket & Shirt Body
      ctx.fillStyle = cJacket;
      ctx.fillRect(-5, -15 + bob, 10, 9);
      // White inner shirt V-neck
      ctx.fillStyle = cShirt;
      ctx.fillRect(-1, -15 + bob, 2, 6);
      ctx.fillStyle = cJacketTrim;
      ctx.fillRect(-5, -15 + bob, 2, 9);
      ctx.fillRect(3, -15 + bob, 2, 9);

      // 3. Arms
      ctx.fillStyle = cJacket;
      ctx.fillRect(-7, -14 + bob - armSwing, 2, 6);
      ctx.fillRect(5, -14 + bob + armSwing, 2, 6);
      // Hands
      ctx.fillStyle = cSkin;
      ctx.fillRect(-7, -8 + bob - armSwing, 2, 2);
      ctx.fillRect(5, -8 + bob + armSwing, 2, 2);

      // 4. Head & Face
      ctx.fillStyle = cSkin;
      ctx.fillRect(-4, -22 + bob, 8, 7);
      // Eyes
      ctx.fillStyle = cEyes;
      ctx.fillRect(-3, -19 + bob, 2, 2);
      ctx.fillRect(1, -19 + bob, 2, 2);
      // Confident smile
      ctx.fillStyle = '#b45309';
      ctx.fillRect(-1, -16 + bob, 2, 1);

      // 5. Styled Dark Hair (Side-parted with volume)
      ctx.fillStyle = cHair;
      ctx.fillRect(-5, -25 + bob, 10, 4);
      ctx.fillRect(-5, -22 + bob, 2, 4);
      ctx.fillRect(3, -22 + bob, 2, 3);
      ctx.fillStyle = cHairHi;
      ctx.fillRect(-3, -24 + bob, 6, 2);
    } else if (direction === 'up') {
      // 1. Legs
      ctx.fillStyle = cPants;
      ctx.fillRect(-4, -6 + legOffset, 3, 5);
      ctx.fillRect(1, -6 - legOffset, 3, 5);
      ctx.fillStyle = cBoots;
      ctx.fillRect(-5, -2 + legOffset, 4, 2);
      ctx.fillRect(1, -2 - legOffset, 4, 2);

      // 2. Jacket from behind
      ctx.fillStyle = cJacket;
      ctx.fillRect(-5, -15 + bob, 10, 9);
      ctx.fillStyle = cJacketTrim;
      ctx.fillRect(-4, -14 + bob, 8, 2);

      // 3. Arms
      ctx.fillStyle = cJacket;
      ctx.fillRect(-7, -14 + bob - armSwing, 2, 6);
      ctx.fillRect(5, -14 + bob + armSwing, 2, 6);

      // 4. Hair from behind
      ctx.fillStyle = cHair;
      ctx.fillRect(-5, -25 + bob, 10, 9);
      ctx.fillStyle = cHairHi;
      ctx.fillRect(-4, -24 + bob, 8, 3);
    } else if (direction === 'right') {
      // 1. Legs
      ctx.fillStyle = cPants;
      ctx.fillRect(-3 + legOffset, -6, 3, 5);
      ctx.fillRect(0 - legOffset, -6, 3, 5);
      ctx.fillStyle = cBoots;
      ctx.fillRect(-3 + legOffset, -2, 4, 2);
      ctx.fillRect(0 - legOffset, -2, 4, 2);

      // 2. Body
      ctx.fillStyle = cJacket;
      ctx.fillRect(-3, -15 + bob, 7, 9);
      ctx.fillStyle = cShirt;
      ctx.fillRect(2, -14 + bob, 2, 4);

      // 3. Arm swinging
      ctx.fillStyle = cJacket;
      ctx.fillRect(-1 + armSwing, -14 + bob, 3, 6);
      ctx.fillStyle = cSkin;
      ctx.fillRect(-1 + armSwing, -8 + bob, 2, 2);

      // 4. Face & Profile Hair
      ctx.fillStyle = cSkin;
      ctx.fillRect(-2, -22 + bob, 6, 7);
      ctx.fillStyle = cEyes;
      ctx.fillRect(2, -19 + bob, 2, 2);

      ctx.fillStyle = cHair;
      ctx.fillRect(-4, -25 + bob, 8, 5);
      ctx.fillRect(-4, -20 + bob, 3, 3);
      ctx.fillStyle = cHairHi;
      ctx.fillRect(-2, -24 + bob, 5, 2);
    } else {
      // Facing Left
      // 1. Legs
      ctx.fillStyle = cPants;
      ctx.fillRect(0 + legOffset, -6, 3, 5);
      ctx.fillRect(-3 - legOffset, -6, 3, 5);
      ctx.fillStyle = cBoots;
      ctx.fillRect(-1 + legOffset, -2, 4, 2);
      ctx.fillRect(-4 - legOffset, -2, 4, 2);

      // 2. Body
      ctx.fillStyle = cJacket;
      ctx.fillRect(-4, -15 + bob, 7, 9);
      ctx.fillStyle = cShirt;
      ctx.fillRect(-4, -14 + bob, 2, 4);

      // 3. Arm swinging
      ctx.fillStyle = cJacket;
      ctx.fillRect(-2 - armSwing, -14 + bob, 3, 6);
      ctx.fillStyle = cSkin;
      ctx.fillRect(-2 - armSwing, -8 + bob, 2, 2);

      // 4. Face & Profile Hair
      ctx.fillStyle = cSkin;
      ctx.fillRect(-4, -22 + bob, 6, 7);
      ctx.fillStyle = cEyes;
      ctx.fillRect(-4, -19 + bob, 2, 2);

      ctx.fillStyle = cHair;
      ctx.fillRect(-4, -25 + bob, 8, 5);
      ctx.fillRect(1, -20 + bob, 3, 3);
      ctx.fillStyle = cHairHi;
      ctx.fillRect(-3, -24 + bob, 5, 2);
    }

    // 6. Cipher the AI Companion (Floating Drone / Wisp Companion beside shoulder)
    const droneSide = (direction === 'left') ? 9 : -9;
    const droneBob = Math.sin(frame * 0.8 + 1.2) * 2;
    const dx = droneSide;
    const dy = -22 + droneBob;

    // Friendly Cyan Pixel Companion (Matching screenshot top-right)
    ctx.fillStyle = 'rgba(34, 211, 238, 0.35)';
    ctx.fillRect(dx - 3, dy - 3, 7, 7);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(dx - 2, dy - 2, 5, 5);
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(dx - 1, dy - 1, 3, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(dx, dy, 1, 1);

    ctx.restore();
  }

  // -------------------------------------------------------------
  // 3. ANIMATED CAMPFIRE LANDMARK (From Reference Image!)
  // -------------------------------------------------------------
  public drawCampfire(ctx: CanvasRenderingContext2D, x: number, y: number, animTime: number) {
    const scale = 2.5;
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));
    ctx.scale(scale, scale);

    // Radiant Ambient Campfire Light Halo on Ground
    const glowRad = 28 + Math.sin(animTime * 8) * 3;
    const glow = ctx.createRadialGradient(0, 0, 2, 0, 0, glowRad);
    glow.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
    glow.addColorStop(0.4, 'rgba(244, 63, 94, 0.25)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, glowRad, 0, Math.PI * 2);
    ctx.fill();

    // Campfire Stones & Logs Ring
    ctx.fillStyle = '#1e1b2e';
    ctx.fillRect(-7, -2, 14, 5);
    ctx.fillStyle = '#451a03'; // charred logs
    ctx.fillRect(-5, -3, 10, 3);

    // Multilayer Animated Pixel Fire
    const f = Math.floor(animTime * 10) % 4;
    // Outer flame (Vibrant Red-Orange)
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(-4, -10 + (f % 2), 8, 8);
    ctx.fillRect(-3, -13 + (f % 3), 6, 5);

    // Mid flame (Vibrant Golden Yellow)
    ctx.fillStyle = '#fde047';
    ctx.fillRect(-2, -9 + (f % 2), 5, 7);
    ctx.fillRect(-1, -12 + (f % 2), 3, 4);

    // Core flame (Pure White)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-1, -7, 3, 5);

    // Drifting campfire sparks
    if (Math.floor(animTime * 12) % 2 === 0) {
      ctx.fillStyle = '#fde047';
      ctx.fillRect(Math.sin(animTime * 5) * 6, -16 - (f * 2), 1, 1);
      ctx.fillRect(-Math.sin(animTime * 7) * 5, -19 - (f * 2), 1, 1);
    }

    ctx.restore();
  }

  // -------------------------------------------------------------
  // 4. NPCS & COMPANIONS
  // -------------------------------------------------------------

  // Blacksmith Torvald (striking neon-lit forge anvil)
  public drawBlacksmithSprite(ctx: CanvasRenderingContext2D, x: number, y: number, animTime: number) {
    const scale = 2.5;
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));
    ctx.scale(scale, scale);

    ctx.fillStyle = 'rgba(7, 9, 15, 0.5)';
    ctx.fillRect(-8, -2, 16, 4);

    const strikeFrame = Math.floor(animTime * 4) % 4;

    ctx.fillStyle = '#1e1b2e';
    ctx.fillRect(-5, -14, 10, 10);
    ctx.fillStyle = '#7c2d12'; // blacksmith apron
    ctx.fillRect(-4, -13, 8, 6);

    ctx.fillStyle = '#f43f5e'; // glowing neon gauntlet
    ctx.fillRect(-7, -13, 3, 6);
    ctx.fillRect(4, -13, 3, 6);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-5, -4, 4, 4);
    ctx.fillRect(1, -4, 4, 4);

    ctx.fillStyle = '#fbcfe8';
    ctx.fillRect(-4, -20, 8, 6);
    ctx.fillStyle = '#c026d3'; // vibrant hair/beard
    ctx.fillRect(-5, -17, 10, 6);
    ctx.fillRect(-5, -23, 10, 3);

    // Neon Plasma Hammer
    ctx.fillStyle = '#22d3ee';
    if (strikeFrame === 0 || strikeFrame === 3) {
      ctx.fillRect(5, -24, 6, 4);
      ctx.fillStyle = '#7c2d12';
      ctx.fillRect(5, -20, 2, 8);
    } else if (strikeFrame === 1) {
      ctx.fillRect(7, -15, 6, 4);
      ctx.fillStyle = '#7c2d12';
      ctx.fillRect(5, -13, 6, 2);
    } else {
      ctx.fillRect(4, -8, 6, 4);
      ctx.fillStyle = '#7c2d12';
      ctx.fillRect(2, -7, 6, 2);
    }

    ctx.restore();
  }

  // Archivist Elenora (holding glowing cyan/fuchsia grimoire)
  public drawLibrarianSprite(ctx: CanvasRenderingContext2D, x: number, y: number, animTime: number) {
    const scale = 2.5;
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));
    ctx.scale(scale, scale);

    ctx.fillStyle = 'rgba(7, 9, 15, 0.5)';
    ctx.fillRect(-6, -2, 12, 3);

    const bob = Math.sin(animTime * 2) > 0 ? 1 : 0;

    // Violet & Cyan Scholar Robes
    ctx.fillStyle = '#3b0764';
    ctx.fillRect(-5, -15 + bob, 10, 13);
    ctx.fillStyle = '#6b21a8';
    ctx.fillRect(-4, -14 + bob, 4, 11);
    ctx.fillStyle = '#22d3ee'; // cyan sash
    ctx.fillRect(-1, -15 + bob, 2, 13);

    ctx.fillStyle = '#fbcfe8';
    ctx.fillRect(-4, -21 + bob, 8, 6);
    ctx.fillStyle = '#22d3ee'; // cyan visor glasses
    ctx.fillRect(-3, -19 + bob, 3, 2);
    ctx.fillRect(1, -19 + bob, 3, 2);

    ctx.fillStyle = '#e879f9'; // lavender/silver hair
    ctx.fillRect(-5, -24 + bob, 10, 4);
    ctx.fillRect(-5, -21 + bob, 2, 7);

    // Glowing Tome
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(-5, -11 + bob, 10, 5);
    ctx.fillStyle = '#67e8f9';
    ctx.fillRect(-4, -10 + bob, 8, 3);

    ctx.restore();
  }

  // Mango the Orange Tabby Cat (Warm ginger coat, tabby stripes, cream chest & swishing tail)
  public drawCatSprite(ctx: CanvasRenderingContext2D, x: number, y: number, animTime: number) {
    const img = assetManager.getImage('/assets/characters/mango/mango_spritesheet.png');
    if (img) {
      const frame = Math.floor(animTime * 4) % 4;
      const frameW = 32;
      const frameH = 32;
      const scale = 1.6;
      const destW = frameW * scale;
      const destH = frameH * scale;

      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.beginPath();
      ctx.ellipse(x, y - 2, destW * 0.32, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Row 0 is idle animation
      ctx.drawImage(
        img,
        frame * frameW,
        0,
        frameW,
        frameH,
        Math.floor(x - destW / 2),
        Math.floor(y - destH + 6),
        destW,
        destH
      );
      ctx.restore();
      return;
    }

    const scale = 2.4;
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));
    ctx.scale(scale, scale);

    // Natural pixel drop shadow
    ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.fillRect(-6, -1, 13, 2);

    const frame = Math.floor(animTime * 3) % 4;
    const leg = frame % 2 === 0 ? 1 : 0;

    // Ginger Orange Body
    ctx.fillStyle = '#ea580c'; // Warm rich ginger
    ctx.fillRect(-5, -7, 10, 5);
    // Darker Tabby Stripes across back
    ctx.fillStyle = '#9a3412';
    ctx.fillRect(-3, -7, 1, 4);
    ctx.fillRect(0, -7, 1, 4);
    ctx.fillRect(3, -7, 1, 4);

    // Soft Cream Belly / Chest
    ctx.fillStyle = '#ffedd5';
    ctx.fillRect(-2, -4, 6, 2);

    // Paws & Legs (with walking offset)
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(-4 + leg, -2, 2, 2);
    ctx.fillRect(2 - leg, -2, 2, 2);
    // White socks on paws
    ctx.fillStyle = '#ffedd5';
    ctx.fillRect(-4 + leg, -1, 2, 1);
    ctx.fillRect(2 - leg, -1, 2, 1);

    // Head
    ctx.fillStyle = '#f97316';
    ctx.fillRect(3, -11, 6, 6);
    // Cream Muzzle
    ctx.fillStyle = '#ffedd5';
    ctx.fillRect(6, -8, 3, 3);
    // Pink nose
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(8, -8, 1, 1);

    // Pointed Ears with Pink interior
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(4, -13, 2, 2);
    ctx.fillRect(7, -13, 2, 2);
    ctx.fillStyle = '#fda4af';
    ctx.fillRect(4, -12, 1, 1);
    ctx.fillRect(7, -12, 1, 1);

    // Lively Emerald/Amber Eyes
    ctx.fillStyle = '#10b981';
    ctx.fillRect(6, -9, 1.5, 1.5);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(6.5, -9, 0.5, 1.5);

    // Swishing Orange Tabby Tail
    const tailY = Math.sin(animTime * 5) * 2;
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(-7, -8 + tailY, 2, 2);
    ctx.fillStyle = '#9a3412';
    ctx.fillRect(-8, -9 + tailY, 2, 2);
    // Cream tail tip
    ctx.fillStyle = '#ffedd5';
    ctx.fillRect(-9, -11 + tailY, 2, 3);

    ctx.restore();
  }

  // Flying Birds
  public drawBird(ctx: CanvasRenderingContext2D, x: number, y: number, frame: number) {
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));
    ctx.fillStyle = '#e879f9'; // mystical twilight bird
    if (frame % 2 === 0) {
      ctx.fillRect(-3, -2, 2, 2);
      ctx.fillRect(-1, 0, 2, 2);
      ctx.fillRect(1, -2, 2, 2);
    } else {
      ctx.fillRect(-4, 0, 8, 2);
    }
    ctx.restore();
  }

  // -------------------------------------------------------------
  // 5. PROPS (Bioluminescent Lanterns, Crates, Barrels, Anvils)
  // -------------------------------------------------------------

  public drawPixelLantern(ctx: CanvasRenderingContext2D, x: number, y: number, isNight: boolean) {
    const scale = 2;
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));
    ctx.scale(scale, scale);

    if (isNight) {
      ctx.fillStyle = 'rgba(34, 211, 238, 0.22)';
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#111827';
    ctx.fillRect(-1, -12, 2, 12);
    ctx.fillRect(-1, -12, 5, 2);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(3, -11, 6, 7);

    // Glowing Cyan / Pink flame inside
    ctx.fillStyle = isNight ? '#22d3ee' : '#f43f5e';
    ctx.fillRect(4, -10, 4, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(5, -9, 2, 3);

    ctx.restore();
  }

  public drawPixelAnvil(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const scale = 2;
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));
    ctx.scale(scale, scale);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-4, -3, 8, 3);
    ctx.fillRect(-2, -6, 4, 3);
    ctx.fillRect(-7, -10, 14, 4);
    ctx.fillStyle = '#22d3ee'; // cyan metallic rune
    ctx.fillRect(-6, -10, 12, 1);

    // Hot glowing plasma ingot
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(-2, -11, 6, 1);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(0, -11, 2, 1);

    ctx.restore();
  }

  public drawPixelBarrel(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const scale = 2;
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));
    ctx.scale(scale, scale);

    ctx.fillStyle = '#311028';
    ctx.fillRect(-4, -10, 8, 10);
    ctx.fillStyle = '#4a193c';
    ctx.fillRect(-3, -9, 6, 8);
    // Cyan iron bands
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(-4, -8, 8, 1);
    ctx.fillRect(-4, -3, 8, 1);

    ctx.restore();
  }

  public drawPixelCrate(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const scale = 2;
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));
    ctx.scale(scale, scale);

    ctx.fillStyle = '#2b1028';
    ctx.fillRect(-5, -10, 10, 10);
    ctx.fillStyle = '#451a40';
    ctx.fillRect(-4, -9, 8, 8);
    // Glowing rune outline
    ctx.fillStyle = '#e879f9';
    ctx.fillRect(-5, -10, 10, 1);
    ctx.fillRect(-5, -1, 10, 1);
    ctx.fillRect(-5, -10, 1, 10);
    ctx.fillRect(4, -10, 1, 10);

    ctx.restore();
  }

  // Ancient Titan Ruin Monolith (Directly from Hyper Light Drifter reference)
  public drawAncientRuinMonolith(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.save();
    const bx = Math.floor(x - w / 2);
    const by = Math.floor(y - h);

    // Deep obsidian-slate body
    ctx.fillStyle = '#181b30';
    ctx.fillRect(bx, by, w, h);
    ctx.fillStyle = '#252a48';
    ctx.fillRect(bx + 4, by + 4, w - 8, h - 8);

    // Top emerald-cyan moss cap
    ctx.fillStyle = '#10b981';
    ctx.fillRect(bx - 2, by - 4, w + 4, 8);
    ctx.fillStyle = '#2dd4bf';
    ctx.fillRect(bx, by - 2, w, 3);

    // Cyan energy fissure / runic circuitry
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(bx + Math.floor(w / 2) - 1, by + 8, 2, Math.floor(h * 0.6));
    ctx.fillRect(bx + Math.floor(w / 2) - 6, by + 18, 12, 2);

    // Magenta ocular core
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(bx + Math.floor(w / 2) - 3, by + 16, 6, 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bx + Math.floor(w / 2) - 1, by + 18, 2, 2);

    // Hanging moss drippings
    ctx.fillStyle = '#059669';
    ctx.fillRect(bx + 6, by + h - 6, 3, 10);
    ctx.fillRect(bx + w - 10, by + h - 8, 4, 14);

    ctx.restore();
  }

  // Stepping Stone in Lagoon / River
  public drawSteppingStone(ctx: CanvasRenderingContext2D, x: number, y: number, rad: number) {
    ctx.save();
    const sx = Math.floor(x);
    const sy = Math.floor(y);

    // Dark water rim / shadow
    ctx.fillStyle = '#064e43';
    ctx.fillRect(sx - rad - 2, sy - rad + 2, rad * 2 + 4, rad * 2);

    // Stone base
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(sx - rad, sy - rad, rad * 2, rad * 2);

    // Luminous moss top
    ctx.fillStyle = '#10b981';
    ctx.fillRect(sx - rad + 2, sy - rad + 1, rad * 2 - 4, rad * 2 - 4);
    ctx.fillStyle = '#2dd4bf';
    ctx.fillRect(sx - rad + 3, sy - rad + 2, rad * 2 - 8, 3);

    ctx.restore();
  }
}

export const pixelAssets = new PixelArtAssets();
