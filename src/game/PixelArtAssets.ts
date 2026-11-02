// PixelArtAssets.ts - Hyper Light Drifter & Vibrant Fantasy Pixel Art Engine
// Generates crisp, authentic 16-bit / 32-bit pixel sprites and tilesets with vibrant cyan, magenta, lavender, and teal palettes.

export class PixelArtAssets {
  private cache: Map<string, HTMLCanvasElement> = new Map();

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
  // 1. TILE PATTERNS (Vibrant Hyper Light Drifter Fantasy Style)
  // -------------------------------------------------------------

  // Flagstone Pattern: Radiant pale lavender & rose-mauve stone with cyan-lit runes
  public getFlagstonePattern(ctx: CanvasRenderingContext2D): CanvasPattern {
    const key = 'pattern_flagstone_fantasy_v2';
    if (!this.cache.has(key)) {
      const { canvas, ctx: c } = this.createCanvas(32, 32);
      // Base deep royal plum grout seam
      this.fillPixelRect(c, 0, 0, 32, 32, '#2a1638');

      // Tile 1 (top-left) - Radiant Lavender stone plateau
      this.fillPixelRect(c, 1, 1, 14, 14, '#cfa4c4');
      this.fillPixelRect(c, 2, 2, 12, 12, '#dfb8d4');
      this.setPixel(c, 3, 3, '#eed4e7');
      this.setPixel(c, 4, 3, '#eed4e7');
      // Bioluminescent cyan rune specks
      this.setPixel(c, 10, 8, '#22d3ee');
      this.setPixel(c, 11, 8, '#67e8f9');

      // Tile 2 (top-right) - Soft dusty rose stone
      this.fillPixelRect(c, 17, 1, 14, 14, '#c59cb9');
      this.fillPixelRect(c, 18, 2, 12, 12, '#d6adc8');
      this.setPixel(c, 19, 3, '#ebd0e2');
      // Vivid magenta rune
      this.setPixel(c, 22, 10, '#f43f5e');

      // Tile 3 (bottom-left)
      this.fillPixelRect(c, 1, 17, 14, 14, '#c59cb9');
      this.fillPixelRect(c, 2, 18, 12, 12, '#d6adc8');
      this.setPixel(c, 3, 19, '#ebd0e2');
      this.setPixel(c, 8, 24, '#2dd4bf');

      // Tile 4 (bottom-right)
      this.fillPixelRect(c, 17, 17, 14, 14, '#cfa4c4');
      this.fillPixelRect(c, 18, 18, 12, 12, '#dfb8d4');
      this.setPixel(c, 19, 19, '#eed4e7');
      this.setPixel(c, 26, 26, '#e879f9');

      // Grout seams with subtle violet-shadow
      c.fillStyle = '#22112e';
      c.fillRect(0, 0, 32, 1);
      c.fillRect(0, 16, 32, 1);
      c.fillRect(0, 0, 1, 32);
      c.fillRect(16, 0, 1, 32);

      this.cache.set(key, canvas);
    }
    return ctx.createPattern(this.cache.get(key)!, 'repeat')!;
  }

  // Cobblestone Pattern: Mauve-slate pavers with glowing cyan circuit inlays
  public getCobblePattern(ctx: CanvasRenderingContext2D): CanvasPattern {
    const key = 'pattern_cobble_fantasy_v2';
    if (!this.cache.has(key)) {
      const { canvas, ctx: c } = this.createCanvas(24, 24);
      this.fillPixelRect(c, 0, 0, 24, 24, '#1f132b');

      const stones = [
        { x: 1, y: 1, w: 10, h: 6, col: '#a27b9c', hi: '#be99b8' },
        { x: 13, y: 1, w: 9, h: 5, col: '#8d6887', hi: '#a983a3' },
        { x: 1, y: 9, w: 7, h: 6, col: '#8d6887', hi: '#a983a3' },
        { x: 10, y: 8, w: 12, h: 7, col: '#a27b9c', hi: '#be99b8' },
        { x: 2, y: 17, w: 11, h: 6, col: '#a27b9c', hi: '#be99b8' },
        { x: 15, y: 17, w: 7, h: 6, col: '#7e5b79', hi: '#997393' }
      ];

      stones.forEach(s => {
        this.fillPixelRect(c, s.x, s.y, s.w, s.h, s.col);
        this.fillPixelRect(c, s.x + 1, s.y + 1, s.w - 2, 1, s.hi);
        // Ambient crystal speck
        this.setPixel(c, s.x + 2, s.y + 2, '#22d3ee');
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
  // 2. CHARACTER SPRITES (Hyper Light Drifter Adventurer Style)
  // -------------------------------------------------------------

  public drawPlayerSprite(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    direction: 'down' | 'up' | 'left' | 'right',
    frame: number,
    isMoving: boolean
  ) {
    const scale = 2.5;
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));
    ctx.scale(scale, scale);

    // Dynamic Campfire / Mana Glow beneath feet
    ctx.fillStyle = 'rgba(217, 70, 239, 0.25)';
    ctx.fillRect(-8, -2, 16, 4);
    ctx.fillStyle = 'rgba(7, 9, 15, 0.6)';
    ctx.fillRect(-6, -2, 12, 3);

    const f = isMoving ? frame % 4 : 0;
    const legOffset = f === 1 ? -2 : f === 3 ? 2 : 0;
    const bob = (f === 1 || f === 3) ? 1 : 0;

    // Hyper Light Drifter Palette:
    const cSuitDark = '#0e1726';
    const cSuitHighlight = '#1e293b';
    const cCloakDark = '#86198f';       // Deep fuchsia / magenta
    const cCloakMid = '#c026d3';        // Vibrant magenta
    const cCloakLight = '#f43f5e';      // Glowing crimson edge
    const cVisor = '#22d3ee';           // Glowing electric cyan visor
    const cVisorGlow = '#67e8f9';
    const cBoot = '#1e1b4b';
    const cBackpack = '#3b0764';
    const cSword = '#38bdf8';           // Energy sword on back

    if (direction === 'down') {
      // 1. Cloak flowing behind
      ctx.fillStyle = cCloakDark;
      ctx.fillRect(-6, -16 + bob, 12, 12);
      ctx.fillStyle = cCloakMid;
      ctx.fillRect(-5, -15 + bob, 10, 11);
      ctx.fillStyle = cCloakLight;
      ctx.fillRect(-4, -13 + bob, 8, 2);

      // 2. Legs / Boots
      ctx.fillStyle = cBoot;
      ctx.fillRect(-5, -6 + legOffset, 4, 6);
      ctx.fillRect(1, -6 - legOffset, 4, 6);

      // 3. Body / Tunic
      ctx.fillStyle = cSuitDark;
      ctx.fillRect(-5, -16 + bob, 10, 10);
      ctx.fillStyle = cSuitHighlight;
      ctx.fillRect(-4, -15 + bob, 4, 8);

      // Energy core / belt
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-5, -9 + bob, 10, 2);
      ctx.fillStyle = cVisor;
      ctx.fillRect(-1, -9 + bob, 2, 2);

      // 4. Scarf knot
      ctx.fillStyle = cCloakLight;
      ctx.fillRect(-3, -17 + bob, 6, 3);
      ctx.fillRect(-2, -14 + bob, 4, 3);

      // 5. Head / Drifter Helmet & Cyan Visor
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-4, -22 + bob, 8, 6);
      // Glowing Cyan Visor Line
      ctx.fillStyle = cVisor;
      ctx.fillRect(-3, -20 + bob, 6, 2);
      ctx.fillStyle = cVisorGlow;
      ctx.fillRect(-2, -20 + bob, 4, 1);

      // Drifter Hood / Crest
      ctx.fillStyle = cCloakDark;
      ctx.fillRect(-5, -25 + bob, 10, 4);
      ctx.fillRect(-5, -22 + bob, 2, 4);
      ctx.fillRect(3, -22 + bob, 2, 4);
    } else if (direction === 'up') {
      // 1. Flowing Cloak
      ctx.fillStyle = cCloakDark;
      ctx.fillRect(-6, -16 + bob, 12, 13);
      ctx.fillStyle = cCloakMid;
      ctx.fillRect(-5, -15 + bob, 10, 11);

      // 2. Legs
      ctx.fillStyle = cBoot;
      ctx.fillRect(-5, -6 + legOffset, 4, 6);
      ctx.fillRect(1, -6 - legOffset, 4, 6);

      // 3. Energy Sword strapped on back (Glowing Cyan blade!)
      ctx.fillStyle = cSword;
      ctx.fillRect(3, -22 + bob, 2, 16);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(3, -18 + bob, 1, 10);
      // Backpack module
      ctx.fillStyle = cBackpack;
      ctx.fillRect(-5, -16 + bob, 7, 8);

      // 4. Hood from behind
      ctx.fillStyle = cCloakDark;
      ctx.fillRect(-5, -25 + bob, 10, 8);
      ctx.fillRect(-4, -18 + bob, 8, 2);
    } else if (direction === 'right') {
      // 1. Trailing Magenta Cape (flutters in wind)
      const flutter = isMoving ? (f % 2 === 0 ? 2 : -2) : 0;
      ctx.fillStyle = cCloakDark;
      ctx.fillRect(-11, -17 + bob + flutter, 6, 5);
      ctx.fillStyle = cCloakMid;
      ctx.fillRect(-9, -16 + bob + flutter, 5, 4);
      ctx.fillStyle = cCloakLight;
      ctx.fillRect(-7, -15 + bob + flutter, 2, 2);

      // 2. Legs
      ctx.fillStyle = cBoot;
      ctx.fillRect(-4 + legOffset, -6, 4, 6);
      ctx.fillRect(0 - legOffset, -6, 4, 6);

      // 3. Body & Sword
      ctx.fillStyle = cSuitDark;
      ctx.fillRect(-3, -16 + bob, 7, 10);
      ctx.fillStyle = cSword;
      ctx.fillRect(-5, -20 + bob, 2, 14);

      // 4. Profile Head & Cyan Visor
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-2, -22 + bob, 6, 6);
      ctx.fillStyle = cVisor;
      ctx.fillRect(2, -20 + bob, 3, 2);
      ctx.fillStyle = cVisorGlow;
      ctx.fillRect(3, -20 + bob, 2, 1);

      ctx.fillStyle = cCloakDark;
      ctx.fillRect(-4, -25 + bob, 8, 4);
      ctx.fillRect(-4, -22 + bob, 3, 5);
    } else {
      // Facing Left
      const flutter = isMoving ? (f % 2 === 0 ? 2 : -2) : 0;
      ctx.fillStyle = cCloakDark;
      ctx.fillRect(5, -17 + bob + flutter, 6, 5);
      ctx.fillStyle = cCloakMid;
      ctx.fillRect(4, -16 + bob + flutter, 5, 4);
      ctx.fillStyle = cCloakLight;
      ctx.fillRect(5, -15 + bob + flutter, 2, 2);

      ctx.fillStyle = cBoot;
      ctx.fillRect(0 + legOffset, -6, 4, 6);
      ctx.fillRect(-4 - legOffset, -6, 4, 6);

      ctx.fillStyle = cSuitDark;
      ctx.fillRect(-4, -16 + bob, 7, 10);
      ctx.fillStyle = cSword;
      ctx.fillRect(3, -20 + bob, 2, 14);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-4, -22 + bob, 6, 6);
      ctx.fillStyle = cVisor;
      ctx.fillRect(-5, -20 + bob, 3, 2);
      ctx.fillStyle = cVisorGlow;
      ctx.fillRect(-5, -20 + bob, 2, 1);

      ctx.fillStyle = cCloakDark;
      ctx.fillRect(-4, -25 + bob, 8, 4);
      ctx.fillRect(1, -22 + bob, 3, 5);
    }

    // 6. Hyper Light Drifter Hovering Companion Drone / Mana Spirit
    const droneSide = (direction === 'left') ? 8 : -8;
    const droneBob = Math.sin(frame * 0.8 + 1.2) * 2;
    const dx = droneSide;
    const dy = -20 + droneBob;

    // Glowing aura
    ctx.fillStyle = 'rgba(34, 211, 238, 0.35)';
    ctx.fillRect(dx - 2, dy - 2, 5, 5);
    // Cyan Diamond Drone Core
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(dx - 1, dy - 1, 3, 3);
    ctx.fillRect(dx, dy - 2, 1, 5);
    ctx.fillRect(dx - 2, dy, 5, 1);
    // Brilliant White Center Eye
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

  // Mochi the Cat (pure white with glowing cyan tail tip)
  public drawCatSprite(ctx: CanvasRenderingContext2D, x: number, y: number, animTime: number) {
    const scale = 2.2;
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));
    ctx.scale(scale, scale);

    ctx.fillStyle = 'rgba(7, 9, 15, 0.4)';
    ctx.fillRect(-5, -1, 11, 2);

    const frame = Math.floor(animTime * 3) % 4;
    const leg = frame % 2 === 0 ? 1 : 0;

    ctx.fillStyle = '#fdf4ff';
    ctx.fillRect(-5, -7, 10, 5);

    ctx.fillStyle = '#e879f9';
    ctx.fillRect(-4 + leg, -2, 2, 2);
    ctx.fillRect(2 - leg, -2, 2, 2);

    ctx.fillStyle = '#fdf4ff';
    ctx.fillRect(3, -10, 5, 5);
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(4, -12, 1, 2);
    ctx.fillRect(6, -12, 1, 2);
    ctx.fillStyle = '#22d3ee'; // luminous cyan eyes
    ctx.fillRect(6, -8, 1, 1);

    const tailY = Math.sin(animTime * 4) * 2;
    ctx.fillStyle = '#fdf4ff';
    ctx.fillRect(-7, -8 + tailY, 2, 2);
    ctx.fillStyle = '#22d3ee'; // glowing cyan tail tip
    ctx.fillRect(-8, -10 + tailY, 2, 3);

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
