# NeiroBetterTools

## Overview
Minecraft Bedrock add-on project containing a behavior pack, resource pack, and generated skin pack. Replit runs a small Node.js preview/download server that validates JSON files and packages all packs into `dist/NeiroBetterTools.mcaddon`.

## Project structure
- `behavior_packs/NeiroBetterTools_BP`: behavior pack files, custom items, recipes, loot, scripts, parasite functions, and thirst/water functions.
- `resource_packs/NeiroBetterTools_RP`: resource pack manifest, generated item textures, armor model textures, sound definitions, sounds, skins, and localization.
- `skin_packs/NeiroBetterTools_Skins`: standalone Bedrock skin pack generated with three 64x64 skins.
- `scripts/generate-assets.js`: generates valid PNG item textures/icons, armor layers, skins, item atlas JSON, skin pack files, and OGG sounds.
- `scripts/package-addon.js`: validates JSON across all packs and builds the `.mcaddon` archive.
- `server.js`: serves the Replit preview page and download endpoint on port 5000.

## Commands
- `npm run dev`: start the preview/download server.
- `npm run build`: regenerate assets and build `dist/NeiroBetterTools.mcaddon`.
