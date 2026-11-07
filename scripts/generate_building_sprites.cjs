// scripts/generate_building_sprites.cjs
// Handcrafted pixel-art PNG generator for all 12 building exteriors
// Output: 256x192 transparent PNG sprites with authentic indie RPG aesthetic

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
    }
  }
  return ~c >>> 0;
}

function makePng(w, h, rgbaBuf) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(w, 0);
  ihdrData.writeUInt32BE(h, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  const ihdrCrc = Buffer.alloc(4);
  ihdrCrc.writeUInt32BE(crc32(Buffer.concat([Buffer.from('IHDR'), ihdrData])), 0);
  const ihdrChunk = Buffer.concat([Buffer.from([0, 0, 0, 13]), Buffer.from('IHDR'), ihdrData, ihdrCrc]);

  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0;
    raw.set(rgbaBuf.subarray(y * w * 4, (y + 1) * w * 4), y * (w * 4 + 1) + 1);
  }
  const compressed = zlib.deflateSync(raw, { level: 9 });
  const idatLen = Buffer.alloc(4);
  idatLen.writeUInt32BE(compressed.length, 0);
  const idatCrc = Buffer.alloc(4);
  idatCrc.writeUInt32BE(crc32(Buffer.concat([Buffer.from('IDAT'), compressed])), 0);
  const idatChunk = Buffer.concat([idatLen, Buffer.from('IDAT'), compressed, idatCrc]);

  const iendCrc = Buffer.alloc(4);
  iendCrc.writeUInt32BE(crc32(Buffer.from('IEND')), 0);
  const iendChunk = Buffer.concat([Buffer.from([0, 0, 0, 0]), Buffer.from('IEND'), iendCrc]);

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

class PixelCanvas {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.buf = Buffer.alloc(w * h * 4, 0);
  }

  setPixel(x, y, r, g, b, a = 255) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return;
    const idx = (y * this.w + x) * 4;
    if (a === 255) {
      this.buf[idx] = r;
      this.buf[idx + 1] = g;
      this.buf[idx + 2] = b;
      this.buf[idx + 3] = 255;
    } else {
      const srcA = a / 255;
      const dstA = this.buf[idx + 3] / 255;
      const outA = srcA + dstA * (1 - srcA);
      if (outA > 0) {
        this.buf[idx] = Math.round((r * srcA + this.buf[idx] * dstA * (1 - srcA)) / outA);
        this.buf[idx + 1] = Math.round((g * srcA + this.buf[idx + 1] * dstA * (1 - srcA)) / outA);
        this.buf[idx + 2] = Math.round((b * srcA + this.buf[idx + 2] * dstA * (1 - srcA)) / outA);
        this.buf[idx + 3] = Math.round(outA * 255);
      }
    }
  }

  setHex(x, y, hex, a = 255) {
    const { r, g, b } = this.parseHex(hex);
    this.setPixel(x, y, r, g, b, a);
  }

  parseHex(hex) {
    if (hex.startsWith('#')) hex = hex.slice(1);
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16)
    };
  }

  fillRect(x, y, w, h, hex, a = 255) {
    x = Math.floor(x);
    y = Math.floor(y);
    w = Math.floor(w);
    h = Math.floor(h);
    const { r, g, b } = this.parseHex(hex);
    for (let py = y; py < y + h; py++) {
      for (let px = x; px < x + w; px++) {
        this.setPixel(px, py, r, g, b, a);
      }
    }
  }

  strokeRect(x, y, w, h, hex, lineWidth = 1) {
    this.fillRect(x, y, w, lineWidth, hex);
    this.fillRect(x, y + h - lineWidth, w, lineWidth, hex);
    this.fillRect(x, y, lineWidth, h, hex);
    this.fillRect(x + w - lineWidth, y, lineWidth, h, hex);
  }

  // Draw shingled roof with individual tiles & highlights
  drawShingledRoof(x, y, w, h, baseCol, hiCol, darkCol, tileW = 10, tileH = 6) {
    this.fillRect(x, y, w, h, baseCol);
    for (let ry = y; ry < y + h; ry += tileH) {
      const rowIdx = Math.floor((ry - y) / tileH);
      const xOffset = (rowIdx % 2) * Math.floor(tileW / 2);
      // Horizontal seam
      this.fillRect(x, ry + tileH - 1, w, 1, darkCol);
      // Vertical seams & tile highlights
      for (let rx = x + xOffset; rx < x + w; rx += tileW) {
        this.fillRect(rx, ry, 1, tileH - 1, darkCol);
        this.fillRect(rx + 1, ry, tileW - 2, 1, hiCol);
      }
    }
  }

  // Draw multi-pane window with interior warm glow
  drawWindow(x, y, w, h, frameCol = '#3d2011', glowCol = '#fde047', hasCurtain = true, curtainCol = '#f8fafc') {
    // Drop shadow
    this.fillRect(x + 1, y + 1, w, h, 'rgba(0,0,0,0.4)');
    // Frame
    this.fillRect(x, y, w, h, frameCol);
    // Glass interior glow
    this.fillRect(x + 2, y + 2, w - 4, h - 4, glowCol);
    // Warm inner gradient
    this.fillRect(x + 2, y + 2, w - 4, 3, '#fef08a');
    // Mullions
    const midX = Math.floor(x + w / 2);
    const midY = Math.floor(y + h / 2);
    this.fillRect(midX - 1, y + 2, 2, h - 4, frameCol);
    this.fillRect(x + 2, midY - 1, w - 4, 2, frameCol);
    // Curtains
    if (hasCurtain) {
      this.fillRect(x + 2, y + 2, 4, h - 6, curtainCol);
      this.fillRect(x + w - 6, y + 2, 4, h - 6, curtainCol);
    }
    // Window sill
    this.fillRect(x - 2, y + h - 1, w + 4, 3, frameCol);
    this.fillRect(x - 2, y + h - 1, w + 4, 1, '#8b5e3c');
  }

  // Flower box under window
  drawFlowerBox(x, y, w) {
    this.fillRect(x, y, w, 6, '#5c3a21');
    this.fillRect(x, y, w, 1, '#784d2a');
    // Soil
    this.fillRect(x + 1, y + 1, w - 2, 2, '#38220f');
    // Flowers (red, yellow, white, green leaves)
    for (let fx = x + 2; fx < x + w - 2; fx += 4) {
      const col = fx % 8 === 0 ? '#ef4444' : fx % 6 === 0 ? '#facc15' : '#f8fafc';
      this.fillRect(fx, y - 2, 3, 3, col);
      this.fillRect(fx + 1, y - 1, 1, 1, '#fde047');
      this.fillRect(fx - 1, y, 2, 2, '#15803d');
    }
  }

  // Stone steps
  drawStoneSteps(x, y, w, steps = 3) {
    for (let s = 0; s < steps; s++) {
      const sw = w + s * 6;
      const sx = x - s * 3;
      const sy = y + s * 4;
      this.fillRect(sx, sy, sw, 4, '#64748b');
      this.fillRect(sx, sy, sw, 1, '#94a3b8');
      this.fillRect(sx, sy + 3, sw, 1, '#334155');
    }
  }

  toBuffer() {
    return makePng(this.w, this.h, this.buf);
  }
}

// -------------------------------------------------------------------
// 1. COFFEE SHOP (256 x 192)
// -------------------------------------------------------------------
function generateCoffeeShop() {
  const c = new PixelCanvas(256, 192);
  const bx = 16, by = 30, bw = 224, bh = 158;

  // Ground shadow
  c.fillRect(bx + 6, by + bh - 6, bw - 12, 10, 'rgba(15,23,42,0.4)');

  // Main Timber Walls
  c.fillRect(bx + 16, by + 45, bw - 32, bh - 50, '#5c3a21');
  // Horizontal timber wall planks
  for (let y = by + 45; y < by + bh - 10; y += 8) {
    c.fillRect(bx + 18, y, bw - 36, 7, '#784d2a');
    c.fillRect(bx + 18, y, bw - 36, 1, '#8c5d35');
    c.fillRect(bx + 18, y + 6, bw - 36, 1, '#452814');
  }

  // Corner Timber Posts
  c.fillRect(bx + 14, by + 42, 8, bh - 46, '#452814');
  c.fillRect(bx + 15, by + 42, 2, bh - 46, '#6b3e1b');
  c.fillRect(bx + bw - 22, by + 42, 8, bh - 46, '#452814');
  c.fillRect(bx + bw - 21, by + 42, 2, bh - 46, '#6b3e1b');

  // Shingled Red-Brown Mansard / Gabled Roof
  c.drawShingledRoof(bx + 6, by + 28, bw - 12, 24, '#991b1b', '#b91c1c', '#7f1d1d', 10, 6);
  c.drawShingledRoof(bx + 20, by + 12, bw - 40, 20, '#7f1d1d', '#991b1b', '#450a0a', 10, 6);
  c.fillRect(bx + 36, by + 2, bw - 72, 12, '#450a0a');
  c.fillRect(bx + 38, by + 2, bw - 76, 2, '#991b1b'); // roof ridge

  // Giant Ceramic Coffee Cup on Roof
  const cupX = bx + Math.floor(bw / 2);
  const cupY = by - 6;
  // Cup shadow
  c.fillRect(cupX - 18, cupY + 12, 36, 4, 'rgba(0,0,0,0.3)');
  // Cup Body
  c.fillRect(cupX - 16, cupY - 14, 32, 26, '#f8fafc');
  c.fillRect(cupX - 18, cupY - 14, 36, 6, '#f1f5f9');
  c.fillRect(cupX - 14, cupY + 12, 28, 4, '#e2e8f0');
  // Dark Roast Coffee Surface
  c.fillRect(cupX - 14, cupY - 12, 28, 6, '#451a03');
  c.fillRect(cupX - 10, cupY - 11, 20, 2, '#78350f');
  // Cup Handle
  c.strokeRect(cupX + 16, cupY - 8, 8, 16, '#f8fafc', 3);
  c.strokeRect(cupX + 17, cupY - 7, 6, 14, '#e2e8f0', 1);

  // Red & Cream Striped Canvas Awning over Entrance
  const awnX = bx + 60, awnY = by + 68, awnW = 104, awnH = 18;
  for (let ax = awnX; ax < awnX + awnW; ax += 12) {
    const isRed = (Math.floor((ax - awnX) / 12) % 2 === 0);
    const col = isRed ? '#dc2626' : '#fef08a';
    const hi = isRed ? '#ef4444' : '#ffffff';
    c.fillRect(ax, awnY, 12, awnH, col);
    c.fillRect(ax, awnY, 12, 2, hi);
    // Scalloped bottom fringe
    c.fillRect(ax + 2, awnY + awnH, 8, 3, col);
  }
  c.fillRect(awnX, awnY + awnH + 2, awnW, 1, '#7f1d1d');

  // Entrance Door under Awning
  const doorX = bx + Math.floor(bw / 2) - 16;
  const doorY = by + bh - 58;
  c.fillRect(doorX - 2, doorY - 2, 36, 56, '#291407');
  c.fillRect(doorX, doorY, 32, 54, '#45200c');
  c.fillRect(doorX + 2, doorY + 2, 13, 22, '#5c2d13');
  c.fillRect(doorX + 17, doorY + 2, 13, 22, '#5c2d13');
  c.fillRect(doorX + 2, doorY + 28, 13, 22, '#5c2d13');
  c.fillRect(doorX + 17, doorY + 28, 13, 22, '#5c2d13');
  c.fillRect(doorX + 26, doorY + 26, 3, 5, '#f59e0b'); // brass door knob

  // Windows with Warm Lit Interiors & Flower Boxes
  c.drawWindow(bx + 26, by + 74, 28, 32, '#3d2011', '#fde047', true);
  c.drawFlowerBox(bx + 24, by + 107, 32);

  c.drawWindow(bx + bw - 54, by + 74, 28, 32, '#3d2011', '#fde047', true);
  c.drawFlowerBox(bx + bw - 56, by + 107, 32);

  // Stone Front Steps
  c.drawStoneSteps(doorX - 4, doorY + 54, 40, 2);

  // Porch Barrels
  const drawBarrel = (px, py) => {
    c.fillRect(px, py, 16, 20, '#78350f');
    c.fillRect(px + 2, py, 12, 1, '#92400e');
    c.fillRect(px, py + 4, 16, 2, '#1c1917'); // iron hoop
    c.fillRect(px, py + 14, 16, 2, '#1c1917');
    c.fillRect(px + 2, py + 19, 12, 1, '#451a03');
  };
  drawBarrel(bx + 22, by + bh - 24);
  drawBarrel(bx + bw - 38, by + bh - 24);

  return c.toBuffer();
}

// -------------------------------------------------------------------
// 2. GUILD HALL (256 x 192)
// -------------------------------------------------------------------
function generateGuildHall() {
  const c = new PixelCanvas(256, 192);
  const bx = 12, by = 24, bw = 232, bh = 164;

  // Foundation shadow
  c.fillRect(bx + 4, by + bh - 6, bw - 8, 10, 'rgba(15,23,42,0.45)');

  // Heavy Ashlar Stone Foundation
  c.fillRect(bx + 10, by + bh - 32, bw - 20, 32, '#475569');
  for (let sy = by + bh - 32; sy < by + bh; sy += 8) {
    c.fillRect(bx + 10, sy, bw - 20, 1, '#64748b');
    for (let sx = bx + 10 + (sy % 16 === 0 ? 0 : 12); sx < bx + bw - 20; sx += 24) {
      c.fillRect(sx, sy, 1, 8, '#334155');
    }
  }

  // Grand Medieval Timber Walls
  c.fillRect(bx + 16, by + 50, bw - 32, bh - 80, '#4a2810');
  for (let y = by + 50; y < by + bh - 30; y += 10) {
    c.fillRect(bx + 18, y, bw - 36, 9, '#6b3e1b');
    c.fillRect(bx + 18, y, bw - 36, 1, '#8c5225');
  }

  // Heavy Timber Structural Columns
  const cols = [bx + 16, bx + 64, bx + bw - 72, bx + bw - 24];
  cols.forEach(cx => {
    c.fillRect(cx, by + 46, 8, bh - 76, '#331b08');
    c.fillRect(cx + 1, by + 46, 2, bh - 76, '#5a3012');
  });

  // Multi-tier Gabled Shingle Roof with Dormers
  c.drawShingledRoof(bx + 8, by + 34, bw - 16, 22, '#451a03', '#5c2406', '#2e1102', 12, 6);
  c.drawShingledRoof(bx + 24, by + 16, bw - 48, 22, '#381402', '#4a1b03', '#240b01', 12, 6);
  c.drawShingledRoof(bx + 44, by + 2, bw - 88, 18, '#240b01', '#381402', '#140600', 12, 6);

  // Roof Cresting & Ridge
  c.fillRect(bx + 44, by + 2, bw - 88, 3, '#f59e0b');

  // Royal Purple Heraldic Guild Banner
  const fx = bx + Math.floor(bw / 2) - 20, fy = by + 24;
  c.fillRect(fx - 4, fy - 2, 48, 3, '#d97706'); // brass rod
  c.fillRect(fx, fy, 40, 52, '#6b21a8');
  c.fillRect(fx + 2, fy, 36, 48, '#7e22ce');
  // V-shape cut
  for (let vy = 0; vy < 10; vy++) {
    c.fillRect(fx + vy, fy + 48 + vy, 1, 1, '#7e22ce');
    c.fillRect(fx + 39 - vy, fy + 48 + vy, 1, 1, '#7e22ce');
  }
  // Golden Crescent Crest
  c.fillRect(fx + 14, fy + 16, 12, 12, '#facc15');
  c.fillRect(fx + 18, fy + 14, 10, 12, '#7e22ce'); // crescent cut
  c.fillRect(fx + 18, fy + 20, 4, 4, '#fde047'); // star core

  // Double Grand Oak Doors with Iron Straps
  const doorW = 48, doorH = 58;
  const doorX = bx + Math.floor(bw / 2) - doorW / 2;
  const doorY = by + bh - doorH - 4;
  c.fillRect(doorX - 2, doorY - 4, doorW + 4, doorH + 6, '#1e293b'); // stone arch
  c.fillRect(doorX, doorY, doorW, doorH, '#2a1406');
  c.fillRect(doorX + 2, doorY + 2, doorW / 2 - 3, doorH - 4, '#42200a');
  c.fillRect(doorX + doorW / 2 + 1, doorY + 2, doorW / 2 - 3, doorH - 4, '#42200a');

  // Iron Hinges & Studs
  c.fillRect(doorX + 2, doorY + 12, doorW - 4, 3, '#1c1917');
  c.fillRect(doorX + 2, doorY + 38, doorW - 4, 3, '#1c1917');
  // Brass Ring Knockers
  c.fillRect(doorX + 16, doorY + 26, 4, 6, '#f59e0b');
  c.fillRect(doorX + doorW - 20, doorY + 26, 4, 6, '#f59e0b');

  // Windows with Iron Grilles
  c.drawWindow(bx + 28, by + 68, 26, 34, '#24130a', '#fde047', true);
  c.drawWindow(bx + bw - 54, by + 68, 26, 34, '#24130a', '#fde047', true);

  // Twin Carriage Lanterns
  const drawLantern = (lx, ly) => {
    c.fillRect(lx, ly, 6, 10, '#f59e0b');
    c.fillRect(lx + 1, ly + 2, 4, 6, '#ffffff');
    c.strokeRect(lx - 1, ly - 2, 8, 14, '#1c1917', 1);
  };
  drawLantern(doorX - 12, doorY + 20);
  drawLantern(doorX + doorW + 6, doorY + 20);

  // Stone Platform Steps
  c.drawStoneSteps(doorX - 6, doorY + doorH - 2, doorW + 12, 3);

  return c.toBuffer();
}

// -------------------------------------------------------------------
// 3. PYTHON CAVE (256 x 192)
// -------------------------------------------------------------------
function generatePythonCave() {
  const c = new PixelCanvas(256, 192);
  const cx = 128, cy = 110;

  // Mountain Rock Base Polygon
  c.fillRect(20, 40, 216, 145, '#334155');

  // Shaded Slate Crags & Layers
  for (let y = 30; y < 185; y += 6) {
    const w = 220 - Math.abs(y - 120) * 0.4;
    const x = cx - w / 2;
    c.fillRect(x, y, w, 5, y % 12 === 0 ? '#475569' : '#1e293b');
  }

  // Deep Cavern Dark Archway
  const caveW = 84, caveH = 75;
  const caveX = cx - caveW / 2, caveY = 185 - caveH;
  for (let r = 0; r < caveH; r++) {
    const rw = caveW * Math.sin((r / caveH) * Math.PI);
    c.fillRect(cx - rw / 2, caveY + (caveH - r), rw, 1, '#020617');
  }

  // Giant Sculpted Python Logo (Cyan & Golden Yellow)
  const pyX = cx - 18, pyY = caveY - 26;
  // Cyan serpent (Top)
  c.fillRect(pyX, pyY, 24, 10, '#38bdf8');
  c.fillRect(pyX + 16, pyY, 14, 18, '#0284c7');
  c.fillRect(pyX + 4, pyY + 3, 3, 3, '#ffffff'); // eye
  // Yellow serpent (Bottom)
  c.fillRect(pyX + 8, pyY + 12, 24, 10, '#facc15');
  c.fillRect(pyX + 4, pyY + 6, 14, 18, '#eab308');
  c.fillRect(pyX + 26, pyY + 18, 3, 3, '#020617'); // eye

  // Glowing Blue & Cyan Crystal Formations Flanking Cave
  const drawCrystals = (baseX, baseY) => {
    // Large crystal
    c.fillRect(baseX - 6, baseY - 36, 12, 36, '#0284c7');
    c.fillRect(baseX - 4, baseY - 34, 8, 32, '#38bdf8');
    c.fillRect(baseX - 2, baseY - 30, 4, 24, '#e0f2fe');
    // Side cluster
    c.fillRect(baseX - 16, baseY - 24, 10, 24, '#0369a1');
    c.fillRect(baseX - 14, baseY - 22, 6, 20, '#38bdf8');
    c.fillRect(baseX + 6, baseY - 20, 10, 20, '#0369a1');
    c.fillRect(baseX + 8, baseY - 18, 6, 16, '#7dd3fc');
  };
  drawCrystals(caveX - 16, 185);
  drawCrystals(caveX + caveW + 16, 185);

  // Creeping Moss & Hanging Ivy Vines
  c.fillRect(cx - 50, caveY - 6, 20, 14, '#15803d');
  c.fillRect(cx + 30, caveY - 8, 24, 16, '#166534');
  c.fillRect(caveX - 6, caveY + 10, 4, 28, '#15803d');
  c.fillRect(caveX + caveW + 2, caveY + 14, 4, 24, '#15803d');

  return c.toBuffer();
}

// -------------------------------------------------------------------
// 4. SQL MINES (256 x 192)
// -------------------------------------------------------------------
function generateSqlMines() {
  const c = new PixelCanvas(256, 192);
  const cx = 128;

  // Mountain Rock Outcrop
  c.fillRect(24, 45, 208, 140, '#44403c');
  for (let y = 35; y < 185; y += 6) {
    const w = 210 - Math.abs(y - 110) * 0.35;
    c.fillRect(cx - w / 2, y, w, 5, y % 12 === 0 ? '#57534e' : '#292524');
  }

  // Heavy Timber Structural Supports Bracing Cave Mouth
  const mw = 90, mh = 80;
  const mx = cx - mw / 2, my = 185 - mh;

  // Dark Shaft Opening
  c.fillRect(mx + 8, my + 8, mw - 16, mh - 8, '#0c0a09');

  // Timber Beam Lintel (Top)
  c.fillRect(mx, my, mw, 12, '#451a03');
  c.fillRect(mx + 2, my + 2, mw - 4, 4, '#78350f');
  // Timber Support Posts (Left & Right)
  c.fillRect(mx, my, 12, mh, '#451a03');
  c.fillRect(mx + 2, my + 2, 4, mh - 2, '#78350f');
  c.fillRect(mx + mw - 12, my, 12, mh, '#451a03');
  c.fillRect(mx + mw - 10, my + 2, 4, mh - 2, '#78350f');

  // Railway Tracks Emerging onto Wooden Ties
  const trackY = 185 - 16;
  c.fillRect(cx - 24, trackY - 20, 48, 22, '#292524');
  for (let ty = trackY - 18; ty <= trackY + 8; ty += 6) {
    c.fillRect(cx - 20, ty, 40, 2, '#451a03'); // wooden ties
  }
  c.fillRect(cx - 14, trackY - 20, 2, 30, '#94a3b8'); // steel rails
  c.fillRect(cx + 12, trackY - 20, 2, 30, '#94a3b8');

  // Mine Cart loaded with Glowing Golden Ore & Crystals
  const cartX = cx - 18, cartY = trackY - 14;
  c.fillRect(cartX, cartY, 36, 18, '#451a03'); // wooden box
  c.strokeRect(cartX, cartY, 36, 18, '#1c1917', 2);
  // Wheels
  c.fillRect(cartX + 2, cartY + 16, 8, 8, '#1c1917');
  c.fillRect(cartX + 26, cartY + 16, 8, 8, '#1c1917');
  // Golden Crystals & Nuggets in Cart
  c.fillRect(cartX + 6, cartY - 6, 10, 8, '#facc15');
  c.fillRect(cartX + 8, cartY - 8, 6, 4, '#fef08a');
  c.fillRect(cartX + 18, cartY - 8, 12, 10, '#f59e0b');
  c.fillRect(cartX + 20, cartY - 10, 8, 4, '#fef08a');

  // Hanging Miner's Lantern
  c.fillRect(mx + 16, my + 14, 2, 8, '#1c1917');
  c.fillRect(mx + 13, my + 22, 8, 12, '#f59e0b');
  c.fillRect(mx + 15, my + 24, 4, 6, '#ffffff');

  return c.toBuffer();
}

// -------------------------------------------------------------------
// 5. BLACKSMITH (256 x 192)
// -------------------------------------------------------------------
function generateBlacksmith() {
  const c = new PixelCanvas(256, 192);
  const bx = 16, by = 28, bw = 224, bh = 160;

  // Heavy Stone Masonry Walls
  c.fillRect(bx + 16, by + 46, bw - 32, bh - 50, '#475569');
  for (let y = by + 46; y < by + bh - 10; y += 8) {
    c.fillRect(bx + 16, y, bw - 32, 1, '#64748b');
    for (let x = bx + 16 + (y % 16 === 0 ? 0 : 12); x < bx + bw - 16; x += 24) {
      c.fillRect(x, y, 1, 8, '#334155');
    }
  }

  // Stone Chimney with Smoke Flue
  const chimX = bx + bw - 52, chimY = by - 10;
  c.fillRect(chimX, chimY, 26, 60, '#334155');
  c.fillRect(chimX - 2, chimY, 30, 4, '#64748b');
  c.fillRect(chimX + 4, chimY + 4, 18, 54, '#475569');

  // Heavy Timber Gabled Roof
  c.drawShingledRoof(bx + 8, by + 28, bw - 16, 24, '#78350f', '#92400e', '#451a03', 10, 6);
  c.drawShingledRoof(bx + 24, by + 12, bw - 48, 20, '#5c2b09', '#78350f', '#361502', 10, 6);
  c.fillRect(bx + 40, by + 2, bw - 80, 12, '#361502');

  // Arched Forge Hearth Furnace with Roaring Glow
  const forgeW = 54, forgeH = 50;
  const forgeX = bx + Math.floor(bw / 2) - forgeW / 2;
  const forgeY = by + bh - forgeH - 6;
  c.fillRect(forgeX - 4, forgeY - 6, forgeW + 8, forgeH + 8, '#1e293b'); // stone arch
  c.fillRect(forgeX, forgeY, forgeW, forgeH, '#0f172a'); // inner oven
  // Glowing Coals & Fire
  c.fillRect(forgeX + 6, forgeY + 16, forgeW - 12, forgeH - 18, '#dc2626');
  c.fillRect(forgeX + 10, forgeY + 20, forgeW - 20, forgeH - 24, '#f97316');
  c.fillRect(forgeX + 16, forgeY + 24, forgeW - 32, forgeH - 30, '#fde047');
  c.fillRect(forgeX + 22, forgeY + 28, forgeW - 44, forgeH - 36, '#ffffff');

  // Anvil on Wooden Stump (Courtyard)
  const anvilX = bx + 36, anvilY = by + bh - 32;
  c.fillRect(anvilX, anvilY + 8, 22, 16, '#78350f'); // wooden stump
  c.fillRect(anvilX - 4, anvilY, 28, 8, '#1c1917'); // iron anvil horn
  c.fillRect(anvilX - 6, anvilY, 6, 4, '#475569');
  c.fillRect(anvilX + 2, anvilY + 2, 20, 2, '#94a3b8');

  // Water Quench Trough
  const troughX = bx + bw - 58, troughY = by + bh - 28;
  c.fillRect(troughX, troughY, 28, 18, '#451a03');
  c.fillRect(troughX + 2, troughY + 2, 24, 14, '#0284c7'); // water
  c.fillRect(troughX + 4, troughY + 4, 20, 2, '#38bdf8');

  // Giant Hammer Signboard hanging above
  c.fillRect(bx + 48, by + 56, 18, 4, '#94a3b8');
  c.fillRect(bx + 54, by + 52, 6, 12, '#475569');

  return c.toBuffer();
}

// -------------------------------------------------------------------
// 6. YOUR HOME (256 x 192)
// -------------------------------------------------------------------
function generateHome() {
  const c = new PixelCanvas(256, 192);
  const bx = 16, by = 26, bw = 224, bh = 162;

  // Stucco & Timber Walls
  c.fillRect(bx + 18, by + 46, bw - 36, bh - 50, '#f8fafc');
  c.fillRect(bx + 20, by + 48, bw - 40, bh - 54, '#f1f5f9');
  // Half-timbering beams
  c.fillRect(bx + 18, by + 46, 8, bh - 50, '#5c3a21');
  c.fillRect(bx + bw - 26, by + 46, 8, bh - 50, '#5c3a21');
  c.fillRect(bx + 18, by + 95, bw - 36, 6, '#5c3a21');

  // Brick Chimney
  const chimX = bx + bw - 48, chimY = by - 12;
  c.fillRect(chimX, chimY, 20, 48, '#991b1b');
  c.fillRect(chimX - 2, chimY, 24, 4, '#7f1d1d');
  for (let cy = chimY + 4; cy < chimY + 48; cy += 6) {
    c.fillRect(chimX, cy, 20, 1, '#7f1d1d');
  }

  // Red Terracotta Clay Shingled Roof
  c.drawShingledRoof(bx + 8, by + 30, bw - 16, 24, '#dc2626', '#ef4444', '#991b1b', 10, 6);
  c.drawShingledRoof(bx + 24, by + 14, bw - 48, 20, '#b91c1c', '#dc2626', '#7f1d1d', 10, 6);
  c.fillRect(bx + 42, by + 2, bw - 84, 14, '#7f1d1d');
  c.fillRect(bx + 44, by + 2, bw - 88, 2, '#ef4444'); // ridge

  // Front Door
  const doorW = 34, doorH = 52;
  const doorX = bx + Math.floor(bw / 2) - doorW / 2;
  const doorY = by + bh - doorH - 4;
  c.fillRect(doorX - 2, doorY - 2, doorW + 4, doorH + 4, '#5c3a21');
  c.fillRect(doorX, doorY, doorW, doorH, '#78350f');
  c.fillRect(doorX + 2, doorY + 2, 13, 22, '#92400e');
  c.fillRect(doorX + 17, doorY + 2, 13, 22, '#92400e');
  c.fillRect(doorX + 2, doorY + 26, 13, 22, '#92400e');
  c.fillRect(doorX + 17, doorY + 26, 13, 22, '#92400e');
  c.fillRect(doorX + 26, doorY + 24, 3, 4, '#fde047'); // brass handle

  // Double Casement Windows with Curtains & Flower Boxes
  c.drawWindow(bx + 30, by + 68, 28, 30, '#5c3a21', '#38bdf8', true, '#ffffff');
  c.drawFlowerBox(bx + 28, by + 99, 32);

  c.drawWindow(bx + bw - 58, by + 68, 28, 30, '#5c3a21', '#38bdf8', true, '#ffffff');
  c.drawFlowerBox(bx + bw - 60, by + 99, 32);

  // Red Mailbox on Post in Front Yard
  const mbX = bx - 2, mbY = by + bh - 32;
  c.fillRect(mbX + 4, mbY + 8, 4, 24, '#78350f'); // wooden post
  c.fillRect(mbX, mbY - 4, 14, 14, '#dc2626'); // red box
  c.fillRect(mbX + 1, mbY - 3, 12, 4, '#ef4444');
  c.fillRect(mbX + 3, mbY + 2, 8, 4, '#ffffff'); // white envelope slot
  c.fillRect(mbX + 12, mbY - 2, 4, 2, '#fde047'); // yellow flag

  // Stone Welcome Mat
  c.drawStoneSteps(doorX - 4, doorY + doorH - 2, doorW + 8, 2);

  return c.toBuffer();
}

// -------------------------------------------------------------------
// 7. ANALYTICS TOWER (256 x 220)
// -------------------------------------------------------------------
function generateAnalyticsTower() {
  const c = new PixelCanvas(256, 220);
  const cx = 128, by = 20, tw = 176, th = 196;
  const bx = cx - tw / 2;

  // Cylindrical Stone Body
  c.fillRect(bx + 16, by + 48, tw - 32, th - 52, '#475569');
  for (let y = by + 48; y < by + th - 6; y += 8) {
    c.fillRect(bx + 16, y, tw - 32, 1, '#64748b');
    for (let x = bx + 16 + (y % 16 === 0 ? 0 : 10); x < bx + tw - 16; x += 20) {
      c.fillRect(x, y, 1, 8, '#334155');
    }
  }

  // Stone Battlements / Crenellations
  c.fillRect(bx + 10, by + 36, tw - 20, 14, '#334155');
  for (let x = bx + 12; x < bx + tw - 20; x += 18) {
    c.fillRect(x, by + 26, 10, 12, '#334155');
    c.fillRect(x + 1, by + 26, 8, 2, '#64748b');
  }

  // Conical Slate Spire Roof
  for (let r = 0; r < 36; r += 2) {
    const rw = tw - 40 - r * 3.5;
    const rx = cx - rw / 2;
    c.fillRect(rx, by + 26 - r, rw, 2, r % 4 === 0 ? '#1e293b' : '#0f172a');
  }
  // Finial
  c.fillRect(cx - 2, by - 14, 4, 16, '#f59e0b');

  // Royal Blue Banner with Bar-Chart Emblem
  const banW = 38, banH = 50;
  const banX = cx - banW / 2, banY = by + 56;
  c.fillRect(banX, banY, banW, banH, '#1d4ed8');
  c.fillRect(banX + 2, banY + 2, banW - 4, banH - 4, '#2563eb');
  // V cut
  c.fillRect(banX, banY + banH, banW, 8, '#1d4ed8');
  // White Bar Chart
  c.fillRect(banX + 8, banY + 24, 5, 16, '#ffffff');
  c.fillRect(banX + 16, banY + 16, 5, 24, '#ffffff');
  c.fillRect(banX + 24, banY + 8, 5, 32, '#ffffff');

  // Arched Illuminated Blue Windows
  c.drawWindow(bx + 28, by + 80, 20, 32, '#1e293b', '#38bdf8', false);
  c.drawWindow(bx + tw - 48, by + 80, 20, 32, '#1e293b', '#38bdf8', false);

  // Arched Portal Doorway
  const doorW = 34, doorH = 46;
  const doorX = cx - doorW / 2, doorY = by + th - doorH - 4;
  c.fillRect(doorX - 3, doorY - 4, doorW + 6, doorH + 6, '#1e293b');
  c.fillRect(doorX, doorY, doorW, doorH, '#0f172a');
  c.fillRect(doorX + 2, doorY + 2, doorW - 4, doorH - 4, '#1e1b4b');

  return c.toBuffer();
}

// -------------------------------------------------------------------
// 8. LIBRARY (256 x 192)
// -------------------------------------------------------------------
function generateLibrary() {
  const c = new PixelCanvas(256, 192);
  const bx = 16, by = 26, bw = 224, bh = 160;

  // Ashlar Stone Walls
  c.fillRect(bx + 16, by + 46, bw - 32, bh - 50, '#cbd5e1');
  for (let y = by + 46; y < by + bh - 10; y += 8) {
    c.fillRect(bx + 16, y, bw - 32, 1, '#94a3b8');
    for (let x = bx + 16 + (y % 16 === 0 ? 0 : 12); x < bx + bw - 16; x += 24) {
      c.fillRect(x, y, 1, 8, '#64748b');
    }
  }

  // Cobalt Blue Slate Mansard Roof
  c.drawShingledRoof(bx + 8, by + 28, bw - 16, 24, '#1d4ed8', '#2563eb', '#1e3a8a', 10, 6);
  c.drawShingledRoof(bx + 24, by + 12, bw - 48, 20, '#1e3a8a', '#1d4ed8', '#172554', 10, 6);
  c.fillRect(bx + 40, by + 2, bw - 80, 12, '#172554');
  c.fillRect(bx + 42, by + 2, bw - 84, 2, '#38bdf8'); // ridge

  // Classical Carved Pediment & Book Emblem
  const pedW = 68, pedH = 24;
  const pedX = bx + Math.floor(bw / 2) - pedW / 2, pedY = by + 42;
  c.fillRect(pedX, pedY, pedW, 8, '#475569');
  // Carved Open Book
  c.fillRect(pedX + 24, pedY - 8, 20, 12, '#f8fafc');
  c.fillRect(pedX + 33, pedY - 8, 2, 12, '#334155'); // spine
  c.fillRect(pedX + 26, pedY - 6, 6, 2, '#94a3b8');
  c.fillRect(pedX + 36, pedY - 6, 6, 2, '#94a3b8');

  // Arched Candlelit Windows
  c.drawWindow(bx + 26, by + 70, 24, 36, '#334155', '#fde047', true, '#60a5fa');
  c.drawWindow(bx + bw - 50, by + 70, 24, 36, '#334155', '#fde047', true, '#60a5fa');

  // Double Arched Grand Entry Doors
  const doorW = 44, doorH = 54;
  const doorX = bx + Math.floor(bw / 2) - doorW / 2;
  const doorY = by + bh - doorH - 4;
  c.fillRect(doorX - 3, doorY - 4, doorW + 6, doorH + 6, '#334155');
  c.fillRect(doorX, doorY, doorW, doorH, '#1e1b4b');
  c.fillRect(doorX + 2, doorY + 2, doorW / 2 - 3, doorH - 4, '#312e81');
  c.fillRect(doorX + doorW / 2 + 1, doorY + 2, doorW / 2 - 3, doorH - 4, '#312e81');
  c.fillRect(doorX + 16, doorY + 24, 3, 5, '#f59e0b');
  c.fillRect(doorX + doorW - 19, doorY + 24, 3, 5, '#f59e0b');

  // Wide Stone Entrance Steps
  c.drawStoneSteps(doorX - 8, doorY + doorH - 2, doorW + 16, 3);

  return c.toBuffer();
}

// -------------------------------------------------------------------
// 9. ML LABORATORY (256 x 192)
// -------------------------------------------------------------------
function generateMLLaboratory() {
  const c = new PixelCanvas(256, 192);
  const bx = 16, by = 26, bw = 224, bh = 160;

  // Polished Slate Walls with Copper Conduit Trims
  c.fillRect(bx + 18, by + 50, bw - 36, bh - 54, '#1e1b4b');
  c.fillRect(bx + 20, by + 52, bw - 40, bh - 58, '#312e81');
  // Copper Conduit Pipes
  c.fillRect(bx + 22, by + 56, 4, bh - 64, '#b45309');
  c.fillRect(bx + bw - 26, by + 56, 4, bh - 64, '#b45309');
  c.fillRect(bx + 22, by + 86, bw - 44, 3, '#b45309');

  // Glass Conservatory Dome with Glowing Neural Lattice Core
  const domeR = 34;
  const domeX = bx + Math.floor(bw / 2), domeY = by + 36;
  // Glass Dome Frame
  for (let r = 0; r < domeR; r++) {
    const rw = Math.round(Math.sqrt(domeR * domeR - r * r) * 2);
    c.fillRect(domeX - rw / 2, domeY - r, rw, 1, 'rgba(236,72,153,0.35)');
  }
  // Glowing Pink/Purple Neural Core Sphere
  c.fillRect(domeX - 12, domeY - 24, 24, 24, '#ec4899');
  c.fillRect(domeX - 8, domeY - 20, 16, 16, '#f472b6');
  c.fillRect(domeX - 4, domeY - 16, 8, 8, '#ffffff');

  // High-Tech Airlock Portal Door
  const doorW = 38, doorH = 50;
  const doorX = bx + Math.floor(bw / 2) - doorW / 2;
  const doorY = by + bh - doorH - 4;
  c.fillRect(doorX - 2, doorY - 2, doorW + 4, doorH + 4, '#4338ca');
  c.fillRect(doorX, doorY, doorW, doorH, '#0f172a');
  c.fillRect(doorX + 4, doorY + 6, doorW - 8, 12, '#38bdf8'); // digital scanner
  c.fillRect(doorX + 6, doorY + 8, doorW - 12, 8, '#ffffff');

  // Windows with Glowing Cyan Data Waves
  c.drawWindow(bx + 28, by + 74, 26, 32, '#4338ca', '#ec4899', false);
  c.drawWindow(bx + bw - 54, by + 74, 26, 32, '#4338ca', '#38bdf8', false);

  return c.toBuffer();
}

// -------------------------------------------------------------------
// 10. GARDEN (256 x 192)
// -------------------------------------------------------------------
function generateGarden() {
  const c = new PixelCanvas(256, 192);

  // Grass Plot
  c.fillRect(16, 20, 224, 160, '#388251');
  c.fillRect(20, 24, 216, 152, '#459b63');

  // Wooden Post-and-Rail Fence Perimeter
  const fx = 16, fy = 20, fw = 224, fh = 160;
  c.strokeRect(fx, fy, fw, fh, '#78350f', 3);
  c.strokeRect(fx + 2, fy + 2, fw - 4, fh - 4, '#92400e', 1);

  // Open Gate at Bottom Center
  c.fillRect(fx + Math.floor(fw / 2) - 20, fy + fh - 4, 40, 8, '#b89772'); // path

  // Raised Vegetable Garden Beds
  // 1. Carrots
  c.fillRect(36, 44, 70, 48, '#52361b');
  for (let vx = 42; vx < 100; vx += 12) {
    for (let vy = 50; vy < 88; vy += 14) {
      c.fillRect(vx, vy, 4, 4, '#ea580c'); // carrot top
      c.fillRect(vx - 1, vy - 3, 6, 3, '#22c55e'); // greens
    }
  }
  // 2. Cabbages
  c.fillRect(150, 44, 70, 48, '#52361b');
  for (let vx = 156; vx < 214; vx += 14) {
    for (let vy = 50; vy < 88; vy += 14) {
      c.fillRect(vx, vy, 8, 8, '#22c55e'); // cabbage head
      c.fillRect(vx + 2, vy + 2, 4, 4, '#86efac');
    }
  }

  // Blooming Flower Beds (Bottom halves)
  const drawFlowers = (startX, startY, endX, endY) => {
    for (let x = startX; x < endX; x += 8) {
      for (let y = startY; y < endY; y += 8) {
        const col = (x + y) % 3 === 0 ? '#ef4444' : (x + y) % 2 === 0 ? '#facc15' : '#c084fc';
        c.fillRect(x, y, 4, 4, col);
        c.fillRect(x + 1, y + 1, 2, 2, '#ffffff');
      }
    }
  };
  drawFlowers(36, 110, 106, 154);
  drawFlowers(150, 110, 220, 154);

  // Stone Birdbath in Center
  const cx = 128, cy = 96;
  c.fillRect(cx - 8, cy - 8, 16, 16, '#64748b');
  c.fillRect(cx - 6, cy - 6, 12, 12, '#38bdf8'); // water

  return c.toBuffer();
}

// -------------------------------------------------------------------
// 11. BOSS ARENA (256 x 192)
// -------------------------------------------------------------------
function generateBossArena() {
  const c = new PixelCanvas(256, 192);
  const bx = 16, by = 26, bw = 224, bh = 160;

  // Crimson Fortified Stone Colosseum
  c.fillRect(bx + 16, by + 46, bw - 32, bh - 50, '#881337');
  for (let y = by + 46; y < by + bh - 10; y += 8) {
    c.fillRect(bx + 16, y, bw - 32, 1, '#9f1239');
    for (let x = bx + 16 + (y % 16 === 0 ? 0 : 12); x < bx + bw - 16; x += 24) {
      c.fillRect(x, y, 1, 8, '#4c0519');
    }
  }

  // Spiked Parapets & Crenellations
  c.fillRect(bx + 10, by + 34, bw - 20, 14, '#4c0519');
  for (let x = bx + 14; x < bx + bw - 20; x += 16) {
    c.fillRect(x, by + 22, 8, 14, '#4c0519');
    c.fillRect(x + 2, by + 18, 4, 4, '#e11d48'); // spikes
  }

  // Crossed Swords Banner
  const fx = bx + Math.floor(bw / 2) - 18, fy = by + 50;
  c.fillRect(fx, fy, 36, 44, '#be123c');
  c.fillRect(fx + 2, fy + 2, 32, 40, '#e11d48');
  // Crossed Swords
  c.fillRect(fx + 8, fy + 12, 20, 4, '#ffffff');
  c.fillRect(fx + 16, fy + 4, 4, 20, '#ffffff');
  c.fillRect(fx + 10, fy + 24, 16, 2, '#fbbf24');

  // Iron Portcullis Battle Gate
  const doorW = 44, doorH = 52;
  const doorX = bx + Math.floor(bw / 2) - doorW / 2;
  const doorY = by + bh - doorH - 4;
  c.fillRect(doorX - 2, doorY - 4, doorW + 4, doorH + 6, '#4c0519');
  c.fillRect(doorX, doorY, doorW, doorH, '#1c1917');
  // Portcullis Grille
  for (let gx = doorX + 4; gx < doorX + doorW; gx += 8) {
    c.fillRect(gx, doorY, 2, doorH, '#94a3b8');
  }
  for (let gy = doorY + 6; gy < doorY + doorH; gy += 10) {
    c.fillRect(doorX, gy, doorW, 2, '#94a3b8');
  }

  return c.toBuffer();
}

// -------------------------------------------------------------------
// 12. CONTACT POST OFFICE (256 x 192)
// -------------------------------------------------------------------
function generatePostOffice() {
  const c = new PixelCanvas(256, 192);
  const bx = 16, by = 26, bw = 224, bh = 160;

  // Stucco & Timber Walls
  c.fillRect(bx + 18, by + 46, bw - 36, bh - 50, '#f1f5f9');
  c.fillRect(bx + 18, by + 46, 8, bh - 50, '#0f766e');
  c.fillRect(bx + bw - 26, by + 46, 8, bh - 50, '#0f766e');

  // Teal-Green Slate Shingled Roof
  c.drawShingledRoof(bx + 8, by + 28, bw - 16, 24, '#0f766e', '#14b8a6', '#115e59', 10, 6);
  c.drawShingledRoof(bx + 24, by + 12, bw - 48, 20, '#115e59', '#0f766e', '#134e4a', 10, 6);
  c.fillRect(bx + 40, by + 2, bw - 80, 12, '#134e4a');
  c.fillRect(bx + 42, by + 2, bw - 84, 2, '#2dd4bf'); // ridge

  // Brass Post Horn Signboard
  const hornX = bx + 50, hornY = by + 60;
  c.fillRect(hornX, hornY, 16, 12, '#042f2e');
  c.fillRect(hornX + 2, hornY + 2, 12, 8, '#f59e0b'); // horn icon

  // Windows with Warm Glow
  c.drawWindow(bx + 28, by + 74, 26, 32, '#0f766e', '#fde047', true);
  c.drawWindow(bx + bw - 54, by + 74, 26, 32, '#0f766e', '#fde047', true);

  // Front Door
  const doorW = 34, doorH = 50;
  const doorX = bx + Math.floor(bw / 2) - doorW / 2;
  const doorY = by + bh - doorH - 4;
  c.fillRect(doorX - 2, doorY - 2, doorW + 4, doorH + 4, '#0f766e');
  c.fillRect(doorX, doorY, doorW, doorH, '#115e59');
  c.fillRect(doorX + 2, doorY + 2, doorW - 4, doorH - 4, '#0d9488');
  c.fillRect(doorX + 26, doorY + 24, 3, 5, '#f59e0b');

  // Red Mail Drop Box in Courtyard
  const mbX = bx + bw - 38, mbY = by + bh - 32;
  c.fillRect(mbX, mbY, 16, 24, '#dc2626');
  c.fillRect(mbX + 1, mbY + 1, 14, 4, '#ef4444');
  c.fillRect(mbX + 3, mbY + 8, 10, 3, '#ffffff'); // mail slot

  // Wooden Parcel Crates
  c.fillRect(bx + 24, by + bh - 24, 18, 18, '#78350f');
  c.strokeRect(bx + 24, by + bh - 24, 18, 18, '#451a03', 1);

  return c.toBuffer();
}

// -------------------------------------------------------------------
// EXECUTE GENERATION
// -------------------------------------------------------------------
const buildings = {
  coffee_shop: generateCoffeeShop,
  guild_hall: generateGuildHall,
  python_cave: generatePythonCave,
  sql_mines: generateSqlMines,
  blacksmith: generateBlacksmith,
  home: generateHome,
  analytics_tower: generateAnalyticsTower,
  library: generateLibrary,
  ml_laboratory: generateMLLaboratory,
  garden: generateGarden,
  boss_arena: generateBossArena,
  post_office: generatePostOffice
};

const outDir = path.resolve(__dirname, '../public/assets/buildings');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const [name, fn] of Object.entries(buildings)) {
  const filePath = path.join(outDir, `${name}.png`);
  const pngBuf = fn();
  fs.writeFileSync(filePath, pngBuf);
  console.log(`Generated ${name}.png (${pngBuf.length} bytes)`);
}

console.log('All 12 building exterior sprites generated successfully!');
