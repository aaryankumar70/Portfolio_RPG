// src/game/TUNING.ts
// Central configuration for all game-feel, physics, camera, rendering, and atmospheric tuning

export const TUNING = {
  // 1. Render Pipeline
  RENDER: {
    INTERNAL_WIDTH: 640,
    INTERNAL_HEIGHT: 360,
    TARGET_FPS: 60,
    MAX_DELTA_TIME: 0.08, // clamp dt to avoid physics spiral
    SNAP_PIXELS: true,
  },

  // 2. Player Movement Feel
  PLAYER: {
    WALK_SPEED: 175,      // px/s
    RUN_SPEED: 260,       // px/s
    ACCEL_TIME: 0.08,     // ~0.08s ramp-up to full speed
    DECEL_TIME: 0.06,     // ~0.06s friction stop
    RUN_ACCEL_TIME: 0.12, // slightly longer ramp for sprint
    RUN_DECEL_TIME: 0.08,
    FOOTSTEP_INTERVAL_WALK: 0.34, // s
    FOOTSTEP_INTERVAL_RUN: 0.24,  // s
    // Wide, shallow foot hitbox (capsule/ellipse)
    HITBOX: {
      RADIUS_X: 10,       // 20px wide
      RADIUS_Y: 5,        // 10px high
      OFFSET_Y: 18,       // offset from player root to feet
    },
    CORNER_FORGIVENESS: 6, // px of corner glide
  },

  // 3. Camera Damping (Frame-rate independent exponential decay)
  CAMERA: {
    DAMPING: 8.5, // k in (1 - Math.exp(-k * dt))
    LEAD_FACTOR: 0.15, // slight look-ahead based on velocity
  },

  // 4. Mango Pet Companion Physics & Behavior
  MANGO: {
    FOLLOW_DIST_MIN: 28,  // px
    FOLLOW_DIST_MAX: 42,  // px
    CATCHUP_DIST: 120,    // px
    SPRING_K: 40.0,       // spring stiffness
    SPRING_DAMPING: 11.0, // critically damped spring
    MAX_SPEED: 250,       // px/s
    WALK_SPEED: 140,      // px/s
    IDLE_SIT_DELAY: 2.8,  // seconds before sit
    IDLE_STRETCH_DELAY: 6.5,
    IDLE_SLEEP_DELAY: 11.0,
    OBSTACLE_AVOID_RADIUS: 16,
  },

  // 5. Lighting, Shadows & Atmosphere
  ATMOSPHERE: {
    SHADOW_ALPHA: 0.32,
    SHADOW_COLOR: 'rgba(11, 16, 28, 0.32)',
    SHADOW_OFFSET_X: 1.5,
    SHADOW_OFFSET_Y: 3.0,
    VIGNETTE_INTENSITY: 0.24,
    LIGHTMAP_DOWNSCALE: 2, // 1/2 res lightmap for performance & soft filtering
    LIGHT_RADII: {
      LANTERN: 44,
      WINDOW: 48,
      FORGE: 70,
      CRYSTAL: 38,
      MINES_LANTERN: 42,
      HEARTH: 60,
    },
    TINTS: {
      morning: { r: 1.0, g: 0.85, b: 0.78, a: 0.14 },
      day: { r: 1.0, g: 1.0, b: 0.96, a: 0.04 },
      afternoon: { r: 1.0, g: 0.88, b: 0.68, a: 0.14 },
      sunset: { r: 0.85, g: 0.36, b: 0.24, a: 0.34 },
      night: { r: 0.05, g: 0.08, b: 0.20, a: 0.78 },
    },
  },

  // 6. Day/Night & Weather Cycles
  CYCLE: {
    DAY_PHASE_DURATION_MS: 45000,     // 45s per time-of-day phase
    WEATHER_PHASE_DURATION_MS: 40000, // 40s per weather phase
    TIME_ORDER: ['morning', 'day', 'afternoon', 'sunset', 'night'] as const,
    WEATHER_ORDER: ['clear', 'sakura_breeze', 'mist', 'rain', 'storm'] as const,
  },

  // 7. Interiors
  INTERIOR: {
    CAMERA_DAMPING: 10.0,
    PROMPT_PULSE_SPEED: 3.8,
    PROMPT_BOB_AMPLITUDE: 3,
    DOOR_FADE_DURATION: 0.25, // seconds
  },
} as const;
