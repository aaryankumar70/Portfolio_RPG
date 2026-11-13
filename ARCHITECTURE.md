# Aryan's Adventure — Engine Architecture

## 1. Game Loop & Frame Timing
The engine runs on a standard `requestAnimationFrame` loop with strict delta-time clamping (`Math.min(0.08, dt)` in `TUNING.RENDER.MAX_DELTA_TIME`) to prevent physics tunnel/spiral effects during tab switching. Input polling and entity simulations run before rendering.

## 2. Low-Res Render Pipeline & Integer Scaling
All game world graphics render directly to an offscreen Canvas buffer at fixed native 16:9 pixel resolution (640×360, `TUNING.RENDER.INTERNAL_WIDTH` × `INTERNAL_HEIGHT`). The offscreen buffer is integer-scaled to the window canvas with `imageSmoothingEnabled = false` and centered letterboxing (`#090e17`), eliminating pixel distortion and sub-pixel swimming across arbitrary screen resolutions and `devicePixelRatio` values.

## 3. Unified Baseline Y-Depth Sorting
Every entity in the scene—player, Mango the cat companion, NPCs, landmark trees, perimeter forest trees, buildings, props, and interior furniture—is pushed into a single frame `depthList`. Objects are depth-sorted by their grounded foot baseline `baseY`:
- Player: `player.y + TUNING.PLAYER.HITBOX.OFFSET_Y` (18px)
- Mango: `mango.y + 12`
- Trees: `tree.y + 20`
- Buildings: `building.y + building.height`
- Furniture: `furniture.y + furniture.height`
This ensures the player and Mango naturally walk behind tall trees, roof ridges, and bookshelves without visual clipping.

## 4. Movement Feel, Collision & Pet Physics
- **Acceleration & Friction**: Instant velocity is replaced with responsive exponential acceleration (~0.08s ramp) and deceleration (~0.06s friction stop), with normalized diagonal movement. Footsteps and dust trail puffs are tied directly to actual velocity.
- **Hitbox**: Collision uses a shallow foot capsule (`radiusX: 10, radiusY: 5`) with axis separation and 6px corner forgiveness (`TUNING.PLAYER.CORNER_FORGIVENESS`), enabling effortless sliding along walls and around corners.
- **Pet AI**: Mango follows Aryan via a critically-damped spring-damper system (`TUNING.MANGO.SPRING_K = 40.0`, `SPRING_DAMPING = 11.0`) at 28–42px distance, progressing through idle sit (2.8s), stretch (6.5s), and sleep (11.0s) states when Aryan stands still.
- **Camera Follow**: Smooth, framerate-independent exponential decay: `cam += (target - cam) * (1 - Math.exp(-k * dt))` with whole-pixel coordinate snapping.

## 5. Lighting, Shadows & Atmosphere
- **Cached Lightmap**: A single offscreen lightmap canvas is cleared once per frame, filled with the time-of-day ambient tint (day golden wash, sunset amber/rose, night navy slate).
- **Additive Light Pools**: Lanterns (44px), building windows (48px), blacksmith forge (70px), and crystals (38px) punch soft holes through the darkness using `destination-out`, followed by soft additive color stamps. The completed lightmap is blended onto the screen in a single draw call.
- **Drop Shadows**: Consistent contact shadows (`TUNING.ATMOSPHERE.SHADOW_COLOR`) are projected under buildings, trees, the player, and Mango.

## 6. Explorable Interiors
Interiors share the exact same movement feel, foot capsule, and collision system as the overworld. The camera is clamped inside room bounds (e.g. 800×560 room inside 640×360 viewport). Furniture is rendered using pixel-art PNG sprites with procedural fallbacks, and hotspots display pulsing ground highlights with retro `[E]` keycap badges.

## 7. Usability, Performance & Accessibility
- **Skip Game View**: A prominent toggle instantly switches to an accessible, responsive, non-game portfolio and resume reader reusing the underlying portfolio data.
- **F3 Debug Overlay**: Displays live FPS, frame time, player XY coordinates, camera coordinates, active entity counts, and wireframe collision hitboxes.
- **Reduced Motion**: Automatically honors `prefers-reduced-motion` by disabling screen shake, tree wind sway, and particle emitters.
- **Asset Optimization**: Concept crops are excluded from production builds via `vite.config.ts`.
