import { WeatherType } from '../types';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  maxLife: number;
  life: number;
  type: 'sakura' | 'firefly' | 'smoke' | 'spark' | 'crystal' | 'water' | 'rain' | 'splash' | 'mist';
  oscillation?: number;
}

export class ParticleSystem {
  public particles: Particle[] = [];

  public update(worldWidth: number, worldHeight: number, timeOfDay: string, weather: WeatherType = 'clear') {
    // Honor prefers-reduced-motion (reduce particle count to 0)
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.particles = [];
      return;
    }

    // 1. Sakura / Leaf Breeze (heavier during sakura_breeze, light during clear)
    const targetSakura = weather === 'sakura_breeze' ? 85 : (weather === 'rain' || weather === 'storm') ? 10 : 32;
    const sakuraCount = this.particles.filter(p => p.type === 'sakura').length;
    if (sakuraCount < targetSakura) {
      const windX = weather === 'sakura_breeze' ? 1.4 : weather === 'storm' ? 2.4 : 0.55;
      this.particles.push({
        x: Math.random() * worldWidth,
        y: Math.random() * (worldHeight * 0.65),
        vx: windX + Math.random() * 0.6,
        vy: 0.65 + Math.random() * 0.6,
        size: 3 + Math.floor(Math.random() * 3),
        color: Math.random() > 0.35 ? '#f472b6' : Math.random() > 0.5 ? '#fbcfe8' : '#fde047',
        alpha: 0.85,
        maxLife: 320,
        life: 0,
        type: 'sakura',
        oscillation: Math.random() * Math.PI * 2
      });
    }

    // 1b. Rain & Storm streaks
    if (weather === 'rain' || weather === 'storm') {
      const targetRain = weather === 'storm' ? 190 : 110;
      const rainCount = this.particles.filter(p => p.type === 'rain').length;
      const spawnBatch = Math.min(18, targetRain - rainCount);
      for (let r = 0; r < spawnBatch; r++) {
        this.particles.push({
          x: Math.random() * (worldWidth + 200) - 100,
          y: Math.random() * (worldHeight * 0.85),
          vx: weather === 'storm' ? -3.2 : -1.4,
          vy: weather === 'storm' ? 12.5 + Math.random() * 4 : 8.5 + Math.random() * 3,
          size: weather === 'storm' ? 12 : 8,
          color: weather === 'storm' ? '#bae6fd' : '#7dd3fc',
          alpha: weather === 'storm' ? 0.65 : 0.48,
          maxLife: 45 + Math.random() * 30,
          life: 0,
          type: 'rain'
        });
      }
    }

    // 1c. Drifting Mist Wisps
    if (weather === 'mist') {
      const mistCount = this.particles.filter(p => p.type === 'mist').length;
      if (mistCount < 28) {
        this.particles.push({
          x: Math.random() * worldWidth,
          y: 350 + Math.random() * (worldHeight - 450),
          vx: 0.35 + Math.random() * 0.35,
          vy: (Math.random() - 0.5) * 0.1,
          size: 38 + Math.random() * 36,
          color: '#e2e8f0',
          alpha: 0.08 + Math.random() * 0.08,
          maxLife: 340,
          life: 0,
          type: 'mist',
          oscillation: Math.random() * Math.PI * 2
        });
      }
    }

    // 2. Fireflies (night/sunset, suppressed in heavy rain/storm)
    const targetFireflies = (weather === 'rain' || weather === 'storm')
      ? 2
      : (timeOfDay === 'night' || timeOfDay === 'sunset')
        ? 45
        : 6;
    const fireflyCount = this.particles.filter(p => p.type === 'firefly').length;
    if (fireflyCount < targetFireflies) {
      this.particles.push({
        x: 350 + Math.random() * (worldWidth - 700),
        y: 380 + Math.random() * (worldHeight - 550),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: 2,
        color: Math.random() > 0.3 ? '#fef08a' : '#86efac',
        alpha: 0.85,
        maxLife: 200 + Math.random() * 120,
        life: 0,
        type: 'firefly',
        oscillation: Math.random() * Math.PI * 2
      });
    }

    // 3. Smoke puffs from chimneys
    const chimneys = [
      { x: 860, y: 1080 },
      { x: 1950, y: 810 }
    ];
    chimneys.forEach(ch => {
      if (Math.random() < 0.15) {
        this.particles.push({
          x: ch.x,
          y: ch.y,
          vx: 0.2 + (Math.random() - 0.5) * 0.2,
          vy: -0.8 - Math.random() * 0.4,
          size: 4,
          color: '#cbd5e1',
          alpha: 0.4,
          maxLife: 80,
          life: 0,
          type: 'smoke'
        });
      }
    });

    // 4. Blacksmith Anvil Sparks
    if (Math.random() < 0.2) {
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 1.2 + Math.random() * 2;
        this.particles.push({
          x: 1815,
          y: 965,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 1,
          size: 2,
          color: Math.random() > 0.5 ? '#f59e0b' : '#ef4444',
          alpha: 1,
          maxLife: 20,
          life: 0,
          type: 'spark'
        });
      }
    }

    // 5. Campfire Embers (Directly from Hyper Light Drifter reference)
    if (Math.random() < 0.45) {
      this.particles.push({
        x: 1420 + (Math.random() - 0.5) * 16,
        y: 1235,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.7 - Math.random() * 0.9,
        size: 2,
        color: Math.random() > 0.4 ? '#fef08a' : '#f97316',
        alpha: 0.95,
        maxLife: 60 + Math.random() * 40,
        life: 0,
        type: 'spark'
      });
    }

    // 6. Floating Cosmic Stardust Motes
    const stardustCount = this.particles.filter(p => p.type === 'crystal').length;
    if (stardustCount < 18) {
      this.particles.push({
        x: Math.random() * worldWidth,
        y: 300 + Math.random() * (worldHeight - 400),
        vx: 0.2 + Math.random() * 0.3,
        vy: -0.3 + (Math.random() - 0.5) * 0.2,
        size: 2,
        color: Math.random() > 0.5 ? '#22d3ee' : '#e879f9',
        alpha: 0.8,
        maxLife: 220,
        life: 0,
        type: 'crystal',
        oscillation: Math.random() * Math.PI * 2
      });
    }

    // Update active particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;

      if (p.type === 'sakura') {
        p.oscillation = (p.oscillation || 0) + 0.03;
        p.x += p.vx + Math.sin(p.oscillation) * 0.6;
        p.y += p.vy;
      } else if (p.type === 'firefly') {
        p.oscillation = (p.oscillation || 0) + 0.05;
        p.x += p.vx + Math.cos(p.oscillation) * 0.5;
        p.y += p.vy + Math.sin(p.oscillation) * 0.5;
      } else if (p.type === 'smoke') {
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.04;
      } else if (p.type === 'spark') {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
      } else if (p.type === 'crystal') {
        p.oscillation = (p.oscillation || 0) + 0.04;
        p.x += p.vx + Math.sin(p.oscillation) * 0.4;
        p.y += p.vy;
      } else if (p.type === 'rain') {
        p.x += p.vx;
        p.y += p.vy;
        if (p.life >= p.maxLife - 1 && Math.random() < 0.35) {
          this.particles.push({
            x: p.x,
            y: p.y,
            vx: 0,
            vy: 0,
            size: 2,
            color: '#bae6fd',
            alpha: 0.6,
            maxLife: 10,
            life: 0,
            type: 'splash'
          });
        }
      } else if (p.type === 'splash') {
        p.size += 0.65;
        p.alpha = Math.max(0, 0.6 * (1 - p.life / p.maxLife));
      } else if (p.type === 'mist') {
        p.oscillation = (p.oscillation || 0) + 0.015;
        p.x += p.vx;
        p.y += Math.sin(p.oscillation) * 0.15;
      }

      if (p.life >= p.maxLife || p.y > worldHeight + 30 || p.x > worldWidth + 120) {
        this.particles.splice(i, 1);
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    for (const p of this.particles) {
      const screenX = Math.floor(p.x - cameraX);
      const screenY = Math.floor(p.y - cameraY);

      const pad = p.type === 'mist' ? 80 : 20;
      if (screenX < -pad || screenX > ctx.canvas.width + pad || screenY < -pad || screenY > ctx.canvas.height + pad) {
        continue;
      }

      ctx.save();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;

      // Authentic pixel particle drawing
      if (p.type === 'sakura') {
        ctx.fillRect(screenX, screenY, Math.floor(p.size), Math.floor(p.size * 0.7));
      } else if (p.type === 'firefly') {
        const pulse = 0.45 + 0.55 * Math.abs(Math.sin((p.oscillation || 0) * 1.8));
        ctx.globalAlpha = p.alpha * pulse;
        ctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
        ctx.fillRect(screenX - 2, screenY - 2, 6, 6);
        ctx.fillStyle = p.color;
        ctx.fillRect(screenX, screenY, 2, 2);
      } else if (p.type === 'rain') {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(screenX, screenY);
        ctx.lineTo(screenX + p.vx * 0.85, screenY + p.size);
        ctx.stroke();
      } else if (p.type === 'splash') {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(screenX, screenY, p.size, p.size * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else if (p.type === 'mist') {
        const fade = Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.globalAlpha = p.alpha * fade;
        ctx.beginPath();
        ctx.ellipse(screenX, screenY, p.size, p.size * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'spark') {
        ctx.fillRect(screenX, screenY, 2, 2);
      } else {
        ctx.fillRect(screenX, screenY, Math.floor(p.size), Math.floor(p.size));
      }

      ctx.restore();
    }
  }
}
