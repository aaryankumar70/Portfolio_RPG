# Integration guide — Aryan's Adventure

This package supplies visual references for the existing React + TypeScript + Vite game. Preserve the current custom Canvas engine and React UI. Do not replace it with another game framework or restructure the portfolio to fit these boards.

## Existing integration points

- `src/game/PixelArtAssets.ts` currently creates procedural tile patterns and draws the player. This is the natural place to add explicit image loading/caching and, only after obtaining clean production art, sprite-frame drawing methods.
- `src/game/PlayerCharacter.ts` calls `pixelAssets.drawPlayerSprite(...)` during its existing render path. Keep movement, collision, direction, frame timing, and camera behavior intact while changing only the visual drawing backend when valid sprite frames exist.
- `src/game/WorldRenderer.ts` owns terrain, roads, river, trees, buildings, and depth-sorted rendering. Keep world layout and Y-sorting here. Do not use a whole concept crop as a repeating tile or map atlas.
- `src/game/GameCanvas.tsx` is the React Canvas lifecycle/input bridge. Keep it responsible for canvas sizing, input, and the existing animation loop; do not duplicate the game loop in React components.
- Existing UI lives in `src/components/ui/` and `src/components/modals/`. Treat the UI crop as style guidance; retain existing React interaction/state and replace visuals only through intentional, reviewed component changes.
- `src/game/NPCManager.ts` owns NPC state/rendering; the NPC sample board can guide appearance but it does not contain validated isolated NPC sprites.

## Recommended use order

1. Keep the two full sheets available to the implementation agent as canonical reference material.
2. Consult the crops for focused visual matching, but do not import them as finished game sprites.
3. For the current implementation, first document which procedural methods in `PixelArtAssets.ts` are intended to be replaced or supplemented, then make targeted asset-loading changes that preserve current APIs where practical.
4. Use the boards to produce a precise list of required production exports: transparent character frames, transparent cat frames, isolated building art, clean tile atlas with measured tile size, and separate UI elements. Request/prepare those files as a distinct asset-authoring step before claiming production integration.
5. When proper assets are available, use nearest-neighbor scaling (`imageSmoothingEnabled = false`) and preserve the existing world coordinates, collisions, building data, interaction logic, and scene transitions.

## Mapping concepts to game content

- Aryan → `PlayerCharacter.ts` / `PixelArtAssets.drawPlayerSprite`
- Mango, the orange cat → companion/NPC rendering path; verify the existing cat behavior and API before wiring art
- Grass, paths, water, trees, props → `WorldRenderer.ts` and `PixelArtAssets.ts`
- Building exteriors → existing `BuildingData[]` and the world renderer's building draw path
- Interiors → existing files under `src/components/interiors/`; concept panels are mood/layout references only
- Dialogue and HUD → existing React UI components under `src/components/ui/` and modals

Do not infer exact sprite sizes, frame order, transparent bounds, hitboxes, or tile adjacency from the concept boards. Those data are not encoded reliably in these images.
