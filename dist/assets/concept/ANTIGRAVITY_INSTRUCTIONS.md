# Antigravity instructions — Aryan's Adventure assets

Use the supplied artwork in `reference-sheets/` as the visual source of truth for the Aryan's Adventure art direction. The `concept-crops/` folder contains convenient close-up references from the second sheet.

## Non-negotiable asset rule

Reuse and match the exact supplied visual concepts. Do not invent, redraw, replace, regenerate, or substitute alternate characters, the orange cat, buildings, terrain, props, interiors, or UI. Do not call an image generator or create a competing art direction. If a requested item cannot be extracted cleanly from these files, keep its existing implementation and report that a clean production asset is needed; never fabricate a sprite and present it as supplied artwork.

## Important technical limits

The sheets are composite concept boards. Crops retain panel backgrounds, labels, borders, and neighboring visual context. They are for visual reference only. Do not present any crop as a transparent sprite, animation-ready sheet, seamless tile, or tilemap-ready atlas. Do not use a full sheet/crop as a repeating terrain texture or display it as a game object.

## Preserve the current game

The current project is React + TypeScript + Vite with a custom Canvas engine. Preserve its architecture, input, movement, collision, camera, world layout, building interactions, NPC behavior, and React UI state. Use `INTEGRATION_GUIDE.md` and map changes onto the existing classes/components. Make only targeted visual changes. Do not migrate to Phaser, Next.js, or another engine/framework.

Before coding, inspect the current source and identify the exact methods/components to change. Where no clean production asset exists, write down the required export specification and leave the existing renderer intact until a suitable supplied asset is available.
