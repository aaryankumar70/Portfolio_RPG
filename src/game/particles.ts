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
  type: 'sakura' | 'firefly' | 'smoke' | 'spark' | 'crystal' | 'water';
  oscillation?: number;
}

export class ParticleSystem {
  public particles: Particle[] = [];

  public update(worldWidth: number, worldHeight: number, timeOfDay: string) {
    // Honor prefers-reduced-motion (reduce particle count to 0)
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.particles = [];
      return;
    }

    // 1. Crisp falling sakura petals
    const sakuraCount = this.particles.filter(p => p.type === 'sakura').length;
    if (sakuraCount < 40) {
      this.particles.push({
        x: Math.random() * worldWidth,
        y: Math.random() * (worldHeight * 0.5),
        vx: 0.5 + Math.random() * 0.5,
        vy: 0.7 + Math.random() * 0.6,
        size: 3 + Math.floor(Math.random() * 3),
        color: Math.random() > 0.4 ? '#f472b6' : '#fbcfe8',
        alpha: 0.85,
        maxLife: 350,
        life: 0,
        type: 'sakura',
        oscillation: Math.random() * Math.PI * 2
      });
    }

    // 2. Fireflies (night/sunset)
    const targetFireflies = (timeOfDay === 'night' || timeOfDay === 'sunset') ? 35 : 8;
    const fireflyCount = this.particles.filter(p => p.type === 'firefly').length;
    if (fireflyCount < targetFireflies) {
      this.particles.push({
        x: 400 + Math.random() * (worldWidth - 800),
        y: 400 + Math.random() * (worldHeight - 600),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 2,
        color: '#fef08a',
        alpha: 0.7,
        maxLife: 200 + Math.random() * 100,
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
      }

      if (p.life >= p.maxLife || p.y > worldHeight + 30 || p.x > worldWidth + 30) {
        this.particles.splice(i, 1);
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    for (const p of this.particles) {
      const screenX = Math.floor(p.x - cameraX);
      const screenY = Math.floor(p.y - cameraY);

      if (screenX < -20 || screenX > ctx.canvas.width + 20 || screenY < -20 || screenY > ctx.canvas.height + 20) {
        continue;
      }

      ctx.save();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;

      // Authentic pixel particle drawing (sharp rectangular pixel blocks)
      if (p.type === 'sakura') {
        ctx.fillRect(screenX, screenY, Math.floor(p.size), Math.floor(p.size * 0.7));
      } else if (p.type === 'firefly') {
        ctx.fillRect(screenX, screenY, 2, 2);
      } else if (p.type === 'spark') {
        ctx.fillRect(screenX, screenY, 2, 2);
      } else {
        ctx.fillRect(screenX, screenY, Math.floor(p.size), Math.floor(p.size));
      }

      ctx.restore();
    }
  }
}
