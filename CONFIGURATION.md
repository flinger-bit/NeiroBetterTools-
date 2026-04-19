# NeiroBetterTools Configuration Guide

## Overview
This document explains how to configure various aspects of the NeiroBetterTools add-on.

## Quick Start
1. Extract both BP and RP folders to your world
2. Run: `/function init_nbt_systems`
3. Give yourself items: `/function give_nbt_items`

## 1. Thirst System Configuration

### Location
`behavior_packs/NeiroBetterTools_BP/scripts/thirst.js`

### Parameters
```javascript
const THIRST_CONFIG = {
  MAX_THIRST: 20,                    // Maximum thirst level
  THIRST_DRAIN_RATE: 1,             // Per interval
  THIRST_DRAIN_INTERVAL: 6000,      // In ticks (5 min)
  THIRST_REGEN_RATE: 2,             // Recovery rate
  WATER_RESTORATION: 4,              // Water bucket restores
  HOLY_WATER_RESTORATION: 8,         // Holy water restores
  HYDRATION_POTION_RESTORATION: 6,   // Hydration potion restores
  DAMAGE_THRESHOLD: 3,               // Damage starts below this
  DAMAGE_INTERVAL: 4000              // Damage frequency
};
```

### Examples
- **Fast Thirst Drain**: Set `THIRST_DRAIN_RATE: 2`
- **More Potent Water**: Set `WATER_RESTORATION: 6`
- **Harder Gameplay**: Set `DAMAGE_THRESHOLD: 8`
- **Easier Gameplay**: Set `THIRST_DRAIN_RATE: 0.5`

## 2. Combat System Configuration

### Location
`behavior_packs/NeiroBetterTools_BP/scripts/combat.js`

### Parameters
```javascript
const COMBAT_CONFIG = {
  DAMAGE_MULTIPLIER: 1.5,    // Weapon damage increase
  CRIT_CHANCE: 0.25,         // 25% crit chance
  CRIT_DAMAGE: 2.0,          // 2x damage on crit
  ENCHANTMENT_LEVEL: 3       // Enchantment power
};
```

### Examples
- **Balanced Combat**: `DAMAGE_MULTIPLIER: 1.3`, `CRIT_CHANCE: 0.15`
- **High Damage**: `DAMAGE_MULTIPLIER: 2.0`, `CRIT_CHANCE: 0.4`
- **Low Damage**: `DAMAGE_MULTIPLIER: 1.1`, `CRIT_CHANCE: 0.1`

## 3. Tool System Configuration

### Location
`behavior_packs/NeiroBetterTools_BP/scripts/tools.js`

### Parameters
```javascript
const TOOL_CONFIG = {
  MINING_SPEED_BONUS: 1.5,        // Mining speed increase
  DURABILITY_REDUCTION: 0.8,      // Durability reduction
  EFFICIENCY_LEVEL: 4,             // Enchantment level
  UNBREAKING_CHANCE: 0.3          // 30% chance no damage
};
```

### Examples
- **Fast Mining**: `MINING_SPEED_BONUS: 2.5`
- **Durable Tools**: `UNBREAKING_CHANCE: 0.6`
- **Balanced**: `UNBREAKING_CHANCE: 0.4`

## 4. Item Customization

### Modify Item Damage
Edit `behavior_packs/NeiroBetterTools_BP/items/[item].json`:
```json
"minecraft:damage": 8,  // Change this number
```

### Modify Durability
```json
"minecraft:durability": {
  "max_durability": 250  // Change this number
}
```

### Modify Item Stacking
```json
"minecraft:max_stack_size": 1  // 1 = no stacking, 64 = max
```

## 5. Recipe Customization

### Location
`behavior_packs/NeiroBetterTools_BP/recipes/[recipe].json`

### Change Output Amount
```json
"result": {
  "item": "nbt:obsidian_sword",
  "count": 1  // Change this number
}
```

### Change Recipe Pattern
```json
"pattern": [
  "O",
  "O",
  "S"
]
```

### Change Ingredients
```json
"key": {
  "O": { "item": "minecraft:obsidian" },
  "S": { "item": "minecraft:stick" }
}
```

## 6. Loot Table Customization

### Location
`behavior_packs/NeiroBetterTools_BP/loot_tables/[table].json`

### Adjust Drop Weights
```json
"entries": [
  {
    "type": "item",
    "name": "nbt:obsidian_sword",
    "weight": 5          // Higher = more common
  }
]
```

### Change Drop Count
```json
"functions": [
  {
    "function": "set_count",
    "count": {
      "min": 1,
      "max": 5   // Max amount to drop
    }
  }
]
```

## 7. Language & Localization

### Add New Language
1. Create new file: `resource_packs/NeiroBetterTools_RP/texts/[lang_code].lang`
2. Use format: `item.nbt:item_name=Display Name`
3. Example: `es_ES.lang` for Spanish (Spain)

### Edit Existing Translations
Edit any `.lang` file in `texts/` folder.

## 8. Function Customization

### Main Thirst Function
`behavior_packs/NeiroBetterTools_BP/functions/thirst.mcfunction`

### Create Custom Function
1. Create new `.mcfunction` file in `functions/` folder
2. Add commands (no `#!` prefix needed)
3. Call with: `/function [function_name]`

### Example Custom Function
```mcfunction
# my_custom_function.mcfunction
give @s minecraft:diamond 64
title @s title {"rawtext":[{"text":"§6You got diamonds!"}]}
effect @s regeneration 20 2
```

## 9. Performance Optimization

### Reduce Tick Load
- Lower `THIRST_DRAIN_INTERVAL` value
- Reduce script event listeners
- Simplify loot table weights

### Improve Compatibility
- Check for conflicting add-ons
- Disable experimental features if not needed
- Test in isolation first

## 10. Troubleshooting Configurations

### Items Don't Work
1. Check item identifier format: `nbt:[item_name]`
2. Verify JSON syntax (use validator)
3. Check texture file exists

### Recipes Don't Show
1. Verify recipe format version
2. Check item identifiers match
3. Ensure recipe is valid JSON

### Scripts Don't Execute
1. Check manifest includes script
2. Verify tick.json exists
3. Check for syntax errors in JS

### Languages Not Loading
1. Check file encoding (UTF-8)
2. Verify format: `item.nbt:name=Translation`
3. Check file name matches language code

## 11. Advanced Customization

### Custom Damage Types
Modify in `combat.js`:
```javascript
entity.applyDamage(damage, "custom_damage_type");
```

### Particle Effects
Add to functions:
```mcfunction
particle minecraft:critical @s
```

### Custom Sounds
Reference in functions:
```mcfunction
playsound random.levelup @s
```

## 12. Enable/Disable Features

### Disable Thirst System
Comment out in `thirst.mcfunction`:
```mcfunction
# scoreboard objectives add thirst dummy "Thirst Level"
```

### Disable Combat Buff
Remove or comment:
```mcfunction
# execute as @a[scores={thirst=0..2}] run damage @s 1
```

### Disable All Scripts
Remove script entries from `manifest.json`

---

**Need help?** Check syntax with JSON validators and MCFunction validators online.
