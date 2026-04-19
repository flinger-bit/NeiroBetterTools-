<<<<<<< HEAD
# NeiroBetterTools

Minecraft Bedrock add-on with custom tools, water items, generated textures, custom sounds, and a simple thirst system.

Run `npm run build` to regenerate assets and create `dist/NeiroBetterTools.mcaddon`.
=======
# NeiroBetterTools - Minecraft Bedrock Edition Add-on

**v1.0.0** - A comprehensive enhancement pack for Minecraft Bedrock Edition featuring custom items, advanced thirst mechanics, and combat enhancements.

## 🎮 Features

### ⚔️ Custom Weapons & Tools
- **Obsidian Arsenal**: Full set of obsidian tools and weapons with enhanced durability
  - Obsidian Sword (8 damage, 250 durability)
  - Obsidian Pickaxe (7 damage, 280 durability)
  - Obsidian Axe (9 damage, 260 durability)
  - Obsidian Shovel (5 damage, 240 durability)
  - Obsidian Hoe (220 durability)

- **Classic Weapons**
  - Dirt Sword (4 damage, 60 durability)
  - Wooden Spear
  - Crystal Wand (3 damage, 100 durability)

### 🛡️ Complete Armor Sets
- **Obsidian Armor Suite** (highest tier)
  - Obsidian Helmet (4 protection, 360 durability)
  - Obsidian Chestplate (7 protection, 480 durability)
  - Obsidian Leggings (6 protection, 450 durability)
  - Obsidian Boots (4 protection, 390 durability)

### 💧 Advanced Thirst System
- Dynamic hydration tracking
- Configurable thirst drain rates
- Duration-based effects
- Hydration potions restore thirst levels
- Damage from dehydration when thirst is critical
- Visual feedback through action bar
- Multiple language support

### 🧪 Special Items & Potions
- **Hydration Potion**: Restores thirst and provides resistance
- **Holy Water**: Premium potion with regeneration and resistance
- **Amethyst Crystal**: Crafting ingredient for special items
- **Water Bottle (Dirty)**: Craftable consumable

### 📚 Crafting Recipes
All items have complete crafting recipes:
- **Obsidian Tools**: Obsidian + Sticks in specific patterns
- **Obsidian Armor**: Arranged obsidian blocks
- **Potions**: Glass bottles + Water + Amethyst Crystal (+ optional ingredients)
- **Crystal Wand**: Amethyst Crystals + Stick

### 💥 Combat System
- Enhanced weapon damage with multipliers
- Critical hit mechanics with visual effects
- Combat buff function
- Tool-specific enhancements
- Custom damage calculations

### ⛏️ Mining System
- Mining speed bonuses for obsidian tools
- Tool durability reduction effects
- Unbreaking chance mechanic
- Efficiency enhancements
- Mining buff function

### 🎯 Gameplay Functions

#### Admin Commands
- `/function give_nbt_items` - Grants complete NBT tool set
- `/function init_nbt_systems` - Initialize all systems
- `/function combat_buff` - Apply temporary combat enhancement
- `/function mining_buff` - Apply temporary mining enhancement
- `/function thirst_drink_holy_water` - Drink holy water effect
- `/function thirst_drink_hydration` - Drink hydration potion effect
- `/function thirst_drink_water` - Drink water effect

### 📦 Loot Tables
Multiple loot tables for varied drops:
- `water_loot.json` - Water-themed loot
- `obsidian_loot.json` - Obsidian weapons and tools
- `potion_loot.json` - Potions and consumables
- `armor_loot.json` - Armor drops

## 📁 Project Structure

```
NeiroBetterTools/
├── behavior_packs/
│   └── NeiroBetterTools_BP/
│       ├── manifest.json
│       ├── functions/
│       │   ├── thirst.mcfunction
│       │   ├── tick.json
│       │   ├── thirst_drink_*.mcfunction
│       │   ├── give_nbt_items.mcfunction
│       │   ├── init_nbt_systems.mcfunction
│       │   ├── combat_buff.mcfunction
│       │   └── mining_buff.mcfunction
│       ├── items/
│       │   ├── dirt_sword.json
│       │   ├── obsidian_*.json
│       │   ├── crystal_wand.json
│       │   ├── amethyst_crystal.json
│       │   ├── hydration_potion.json
│       │   ├── holy_water.json
│       │   ├── spear_wood.json
│       │   └── water_bottle_dirty.json
│       ├── recipes/
│       │   ├── obsidian_*.recipe.json
│       │   ├── hydration_potion.recipe.json
│       │   ├── holy_water.recipe.json
│       │   ├── crystal_wand.recipe.json
│       │   └── spear.recipe.json
│       ├── scripts/
│       │   ├── thirst.js
│       │   ├── combat.js
│       │   ├── tools.js
│       │   └── armor.js
│       └── loot_tables/
│           ├── water_loot.json
│           ├── obsidian_loot.json
│           ├── potion_loot.json
│           └── armor_loot.json
└── resource_packs/
    └── NeiroBetterTools_RP/
        ├── manifest.json
        ├── texts/
        │   ├── en_US.lang
        │   ├── es_ES.lang
        │   ├── es_MX.lang
        │   └── pt_BR.lang
        ├── textures/
        │   └── items/
        │       ├── dirt_sword.png
        │       ├── obsidian_*.png
        │       ├── hydration_potion.png
        │       ├── holy_water.png
        │       ├── crystal_wand.png
        │       └── amethyst_crystal.png
        └── models/
            └── README.md
```

## 🌍 Language Support

Currently supported languages:
- 🇺🇸 English (US) - `en_US.lang`
- 🇪🇸 Español (Spain) - `es_ES.lang`
- 🇲🇽 Español (Mexico) - `es_MX.lang`
- 🇧🇷 Português (Brazil) - `pt_BR.lang`

## 🛠️ Installation

1. Download the add-on package
2. Extract the `behavior_packs/NeiroBetterTools_BP/` folder
3. Extract the `resource_packs/NeiroBetterTools_RP/` folder
4. Move both folders to your Minecraft Bedrock Edition world
5. Enable the pack in world settings
6. Run `/function init_nbt_systems` to initialize

## 📊 Item Statistics

### Weapons Comparison
| Item | Damage | Durability | Enchantability |
|------|--------|-----------|-----------------|
| Dirt Sword | 4 | 60 | 10 |
| Obsidian Sword | 8 | 250 | 20 |
| Crystal Wand | 3 | 100 | 15 |

### Tools Comparison
| Tool | Damage | Durability | Type |
|------|--------|-----------|------|
| Obsidian Pickaxe | 7 | 280 | Mining |
| Obsidian Axe | 9 | 260 | Chopping |
| Obsidian Shovel | 5 | 240 | Digging |
| Obsidian Hoe | - | 220 | Farming |

### Armor Comparison
| Piece | Protection | Durability |
|-------|-----------|-----------|
| Helmet | 4 | 360 |
| Chestplate | 7 | 480 |
| Leggings | 6 | 450 |
| Boots | 4 | 390 |

## ⚙️ Configuration

### Thirst System Config
Edit `scripts/thirst.js`:
- `MAX_THIRST`: Maximum thirst level (default: 20)
- `THIRST_DRAIN_RATE`: How much thirst drains per interval (default: 1)
- `THIRST_DRAIN_INTERVAL`: Drain interval in ticks (default: 6000)
- `WATER_RESTORATION`: Thirst restored by water (default: 4)
- `HOLY_WATER_RESTORATION`: Thirst restored by holy water (default: 8)
- `DAMAGE_THRESHOLD`: Thirst level at which damage starts (default: 3)

### Combat Config
Edit `scripts/combat.js`:
- `DAMAGE_MULTIPLIER`: Weapon damage multiplier (default: 1.5)
- `CRIT_CHANCE`: Critical hit probability (default: 0.25)
- `CRIT_DAMAGE`: Damage multiplier on critical hit (default: 2.0)

### Tool Config
Edit `scripts/tools.js`:
- `MINING_SPEED_BONUS`: Mining speed increase (default: 1.5)
- `DURABILITY_REDUCTION`: Durability reduction factor (default: 0.8)
- `UNBREAKING_CHANCE`: Chance tool doesn't lose durability (default: 0.3)

## 🎨 Textures & Models

All custom items include:
- 64x64 texture files in PNG format
- Properly referenced in item definitions
- Render offset configuration for tools

Place your textures in:
```
resource_packs/NeiroBetterTools_RP/textures/items/
```

## 🐛 Troubleshooting

### Items not appearing?
- Ensure resource pack is enabled
- Check texture files exist in correct folder
- Verify manifest.json UUIDs match

### Thirst system not working?
- Ensure script file path is correct in manifest
- Check tick.json calls thirst function
- Verify server.registerSystem() is initialized

### Recipes not working?
- Verify recipe format version matches
- Check item identifiers match item definition files
- Ensure recipes are in correct folder

## 📝 Notes

- This add-on requires Minecraft Bedrock Edition v1.20.0+
- Some features require experimental gameplay enabled
- Scripts require scripting experimental feature enabled
- Tested on Windows 10/11, Xbox One, and mobile platforms

## 📄 License

This add-on is free to use and modify for personal use.

## 🤝 Support

For issues or suggestions, check the project repository.

---

**Created**: 2026
**Version**: 1.0.0
**Minecraft**: Bedrock Edition 1.20+
>>>>>>> 24a3e00 (feat: add new tools and water system)
