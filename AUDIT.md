# Aryan's Adventure - Architecture & Game-Feel Audit

## Executive 10-Line Summary
1. Procedural Terrain: WorldRenderer draws wildflower clusters, grass tufts, and meadow tone shifts with canvas primitives instead of `/assets/environment/flower_*.png` and tileset sprites.
2. Procedural Water & Bridge: Eastern riverbank stones, water basin geometry, and timber bridge are hardcoded canvas paths rather than environment sprites.
3. Procedural Props Fallbacks: Fountain, stepping stones, lanterns, and foliage fall back to multi-line canvas polygon/ellipse routines in PixelArtAssets.
4. Procedural Building Fallbacks: Over 600 lines of procedural vector rendering exist in WorldRenderer for 12 building fallbacks when PNGs are unmounted.
5. Camera Lerp Inaccuracy: GameCanvas uses Euler linear damping `cam += (target - cam) * (k * dt)` instead of framerate-independent exponential smoothing `(1 - Math.exp(-k * dt))`.
6. Instant Player Velocity: PlayerCharacter updates position with instantaneous speed switching (0 to 180/270 px/s) lacking acceleration, friction, and diagonal normalization.
7. Hitbox Mismatch: Player collision uses a rigid 12px circle centered at the sprite instead of a wide, shallow foot capsule for natural Y-overlap under buildings/trees.
8. Mango Pet Physics: MangoPet updates with discrete linear distance thresholds rather than a smooth spring-damper follow and obstacle avoidance model.
9. Interior Furniture in Code: All 12 interior configs in `interiorConfig.ts` define procedural `draw(ctx)` methods (counters, tables, bookshelves, beds, computers) ignoring existing sprites in `/assets/interiors/`.
10. Uncached Dynamic Allocations: Per-frame loops in WorldRenderer and InteriorRenderer dynamically allocate `createRadialGradient` and `createLinearGradient` objects causing GC pressure.
