# NeiroBetterTools

## Overview
Minecraft Bedrock add-on project containing a behavior pack and resource pack. Replit runs a small Node.js preview/download server that validates JSON files and packages both packs into `dist/NeiroBetterTools.mcaddon`.

## Project structure
- `behavior_packs/NeiroBetterTools_BP`: behavior pack files, custom items, recipes, loot, and thirst/water functions.
- `resource_packs/NeiroBetterTools_RP`: resource pack manifest, generated item textures, custom sound definitions, sounds, and localization.
- `scripts/generate-assets.js`: generates valid PNG textures/icons, item atlas JSON, and OGG sounds.
- `scripts/package-addon.js`: validates JSON and builds the `.mcaddon` archive.
- `server.js`: serves the Replit preview page and download endpoint on port 5000.

## Commands
- `npm run dev`: start the preview/download server.
- `npm run build`: regenerate assets and build `dist/NeiroBetterTools.mcaddon`.
