# Aryan's Adventure — 16-Bit Living RPG Portfolio

An interactive, cozy 16-bit RPG developer portfolio built with **React 18**, **TypeScript**, **Vite**, and a handcrafted custom **HTML5 Canvas 2D engine**. Explore 12 architectural town buildings, interact with autonomous NPCs, solve data science and machine learning quests, enter detailed interiors, or switch instantly to an accessible resume reader.

---

## 🎮 Key Features & Game Feel

- **Native Low-Res Render Pipeline**: Internal 640×360 16:9 pixel-art buffer integer-scaled to any display with nearest-neighbor crispness and letterboxing (`#090e17`).
- **Responsive Character Controller**: Exponential acceleration (0.08s ramp) and deceleration (0.06s friction stop), normalized diagonals, footstep audio tied to velocity, and wide shallow foot capsule with 6px corner forgiveness.
- **Mango the Pet Companion**: Autonomous orange tabby cat follower featuring spring-damper tracking physics (`TUNING.MANGO.SPRING_K = 40.0`, `SPRING_DAMPING = 11.0`), obstacle avoidance, meowing interactions, and idle state machine (sit, stretch, sleep).
- **Unified Baseline Y-Depth Sorting**: Dynamic depth sorting for the player, companion, NPCs, landmark trees, forest perimeter trees, buildings, props, and interior furniture.
- **Atmospheric Lighting & Cached Lightmap**: Single cached offscreen lightmap canvas with destination-out cutouts for street lanterns, windows, the blacksmith forge, and crystals. Multiply time-of-day tints (day, sunset, night) and subtle edge vignette.
- **Explorable Interiors**: Clamped camera viewports, pixel-art PNG furniture, ambient lighting (warm golden cafe glow, arcane blue cave crystals), and retro `[E]` interaction badges.
- **Accessibility & "Skip Game" View**: Instant one-click toggle to a clean, fast, accessible portfolio and resume reader for recruiters and low-power devices.
- **Performance & Reduced Motion**: Excludes heavy concept art assets from production builds; automatically honors `prefers-reduced-motion` (disables screen shake, particles, and wind sway).
- **F3 Debug Overlay**: Real-time FPS counter, frame time, player/camera coordinates, entity count, and live wireframe collision hitbox visualizer.

---

## 🕹 Controls

| Action | Control |
|---|---|
| **Move** | `W` `A` `S` `D` or `Arrow Keys` |
| **Sprint** | Hold `Shift` while moving |
| **Interact / Enter Building** | `E`, `Space`, or `Enter` |
| **Click-to-Move** | Left Click on ground / door |
| **Pet Mango** | Left Click on Mango the Cat 🐾 |
| **Debug Overlay & Hitboxes** | `F3` |
| **Direct Resume & Projects View** | Click **"Skip Game: Resume & Projects"** (Top Right) |

---

## 🛠 Centralized Game Feel Tuning (`src/game/TUNING.ts`)

All gameplay, rendering, physics, and atmospheric constants are centralized in `src/game/TUNING.ts`:
- **Render**: Internal resolution (640×360), frame time clamps, pixel snapping.
- **Player**: Walk/run speeds, acceleration/friction curves, foot capsule dimensions, corner forgiveness.
- **Camera**: Damping factor `k = 8.5` in $cam += (target - cam) \times (1 - e^{-k \cdot dt})$.
- **Mango**: Spring stiffness, damping, follow distance (28–42px), idle transition timers.
- **Atmosphere**: Shadow colors/offsets, light radii, day/sunset/night color tints, vignette intensity.
- **Interior**: Interior camera damping and prompt pulse rates.

---

## 🚀 Development & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Typecheck and build production distribution (zero errors)
npm run build

# Preview production build locally
npm run preview
```
