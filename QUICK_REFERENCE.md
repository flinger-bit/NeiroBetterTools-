# NeiroBetterTools - Quick Reference Card

## 📋 Item IDs

### Weapons
| Item | ID | Damage | Durability |
|------|---|--------|-----------|
| Dirt Sword | `nbt:dirt_sword` | 4 | 60 |
| Obsidian Sword | `nbt:obsidian_sword` | 8 | 250 |
| Crystal Wand | `nbt:crystal_wand` | 3 | 100 |

### Tools
| Tool | ID | Dmg | Dur |
|------|---|-----|-----|
| Obsidian Pickaxe | `nbt:obsidian_pickaxe` | 7 | 280 |
| Obsidian Axe | `nbt:obsidian_axe` | 9 | 260 |
| Obsidian Shovel | `nbt:obsidian_shovel` | 5 | 240 |
| Obsidian Hoe | `nbt:obsidian_hoe` | - | 220 |

### Armor
| Piece | ID | Protection | Durability |
|-------|---|-----------|-----------|
| Helmet | `nbt:obsidian_helmet` | 4 | 360 |
| Chestplate | `nbt:obsidian_chestplate` | 7 | 480 |
| Leggings | `nbt:obsidian_leggings` | 6 | 450 |
| Boots | `nbt:obsidian_boots` | 4 | 390 |

### Consumables & Special
| Item | ID | Type | Effect |
|------|---|------|--------|
| Hydration Potion | `nbt:hydration_potion` | Drink | Resistance |
| Holy Water | `nbt:holy_water` | Drink | Regeneration |
| Dirty Water | `nbt:water_bottle_dirty` | Drink | - |
| Amethyst Crystal | `nbt:amethyst_crystal` | Ingredient | - |
| Wooden Spear | `nbt:spear_wood` | Weapon | - |

## 🎮 Essential Commands

```mcfunction
# System Setup
/function init_nbt_systems              # Initialize all systems
/function give_nbt_items                # Get all NBT items (admin)

# Combat & Mining
/function combat_buff                   # Strength, Speed, Haste
/function mining_buff                   # Haste, Efficiency

# Thirst System
/function thirst_drink_water            # Restore thirst from water
/function thirst_drink_hydration        # Restore via hydration potion
/function thirst_drink_holy_water       # Restore via holy water

# Events
/function special_events                # Trigger achievement system
```

## 🛠️ Crafting Recipes

### Obsidian Sword
```
O
O
S
= nbt:obsidian_sword
```

### Obsidian Pickaxe
```
O O O
  S
  S
= nbt:obsidian_pickaxe
```

### Obsidian Armor (All Variants)
```
O O O      O O      O O O      O   O
O   O  or  O O  or  O   O  or  O   O
= helmet   = chest  = legs    = boots
```

### Hydration Potion
```
Glass Bottle + Water Bucket + Amethyst Crystal
= 3x Hydration Potion
```

### Holy Water
```
Glass Bottle + Water Bucket + Amethyst Crystal + Glowstone
= 1x Holy Water
```

## 📊 Damage & Protection

### Weapon Damage Output
```
Dirt Sword:        4 ❤️
Wooden Spear:      5 ❤️
Obsidian Sword:    8 ❤️
Obsidian Axe:      9 ❤️
```

### Armor Protection
```
Single Piece:     4 armor
Two Pieces:       11 armor
Three Pieces:     16 armor
Full Set:         21 armor
```

## 💧 Thirst Mechanics

### Thirst Levels
- **0-2**: CRITICAL (damage taken)
- **3-5**: Very Thirsty (effects shown)
- **6-10**: Normal
- **20**: Maximum

### Thirst Restoration
- Water Bottle: +4
- Hydration Potion: +6
- Holy Water: +8

### Thirst Drain
- Drains 1 point per 5 minutes in-game
- Damage taken every ~3 minutes at critical level
- Effects visible in action bar

## ⚡ Effects Applied

### Combat Buff
- Strength II (30 sec)
- Speed I (20 sec)
- Haste II (20 sec)

### Mining Buff
- Haste II (40 sec)
- Efficiency III (40 sec)

### Item Effects
- Wearing obsidian gear: Resistance I
- Drinking potions: Regeneration effects
- Holding tools: Haste I

## 🎯 Selectors

### Select by Item
```mcfunction
@a[hasitem={item=nbt:obsidian_sword}]
@a[hasitem={item=nbt:hydration_potion,quantity=1..5}]
```

### Select by Thirst
```mcfunction
@a[scores={thirst=0..2}]
@a[scores={thirst=15..}]
```

### Select All Players
```mcfunction
@a                          # All players
@s                          # Self
@p                          # Nearest player
@e[type=minecraft:player]   # All player entities
```

## 🌍 Language Codes

- `en_US` - English (US)
- `es_ES` - Spanish (Spain)
- `es_MX` - Spanish (Mexico)
- `pt_BR` - Portuguese (Brazil)
- `fr_FR` - French (France) - Coming soon
- `de_DE` - German - Coming soon

## 📝 Scoreboard Objectives

```mcfunction
thirst                 # Player thirst level (0-20)
thirst_immune          # Immunity timer
player_level          # Player custom level
player_kills          # Kills counter
first_join            # First join tracker
nbt_setup            # System initialization
```

## 🔧 Configuration Files

| File | Type | Purpose |
|------|------|---------|
| `scripts/thirst.js` | JavaScript | Thirst mechanics |
| `scripts/combat.js` | JavaScript | Combat enhancements |
| `scripts/tools.js` | JavaScript | Tool bonuses |
| `scripts/armor.js` | JavaScript | Armor protection |
| `scripts/enchantments.js` | JavaScript | Custom enchantments |
| `scripts/events.js` | JavaScript | Achievement system |

## 📦 Resources

- **All items have textures**: 64x64 PNG
- **Multiple languages**: Easy translation system
- **Loot tables**: 4 different loot systems
- **Format version**: 1.12-1.20 compatible

## 🔗 Key File Locations

```
behavior_packs/NeiroBetterTools_BP/
├── items/                 # All item definitions
├── recipes/              # Crafting recipes
├── functions/            # McFunctions
├── scripts/              # JavaScript engine
└── loot_tables/         # Drop tables

resource_packs/NeiroBetterTools_RP/
├── texts/                # Languages
└── textures/items/      # Item graphics
```

## ✅ Checklist

- [ ] Add-on installed in correct folders
- [ ] Both BP and RP packs enabled
- [ ] World has experimental features on
- [ ] `/function init_nbt_systems` executed
- [ ] Created first item with recipe
- [ ] Tested thirst system
- [ ] Tested combat buff
- [ ] All languages showing correctly

## 🚀 Pro Tips

1. **Bulk Crafting**: Make multiple items at once
2. **Thirst Management**: Keep Holy Water for emergencies
3. **Combat**: Use Crystal Wand for speed advantage
4. **Mining**: Obsidian tools work in Nether
5. **Enchanting**: Add enchantments to custom tools
6. **Creative Mode**: Test items freely without recipes
7. **Multiplayer**: Each player has own thirst levels
8. **Backup**: Save worlds before major updates

## 📞 Support

**Issues?**
1. Check INSTALLATION.md for setup
2. Review CONFIGURATION.md for settings
3. See DEVELOPMENT.md for code help
4. Check main README.md for features

---

**Print this card for quick reference!** 🎮
