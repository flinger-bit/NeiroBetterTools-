# NeiroBetterTools - Development Guide

## Getting Started

This guide explains the structure and how to extend NeiroBetterTools.

## File Organization

```
behavior_packs/NeiroBetterTools_BP/
├── manifest.json          # Add-on metadata
├── functions/             # .mcfunction files
├── items/                 # Item definitions
├── recipes/              # Crafting recipes
├── scripts/              # JavaScript logic
└── loot_tables/         # Loot generation
```

## Item Development

### Creating a New Item

1. **Create Item File** (`items/my_item.json`):
```json
{
  "format_version": "1.16.100",
  "minecraft:item": {
    "description": {
      "identifier": "nbt:my_item",
      "category": "Equipment"
    },
    "components": {
      "minecraft:icon": "textures/items/my_item",
      "minecraft:max_stack_size": 64,
      "minecraft:damage": 5
    }
  }
}
```

2. **Add Texture** (`resource_packs/NeiroBetterTools_RP/textures/items/my_item.png`)
   - 64x64 PNG file
   - Use transparent background

3. **Add Translation** (`resource_packs/NeiroBetterTools_RP/texts/en_US.lang`):
```
item.nbt:my_item=My Item Name
```

4. **Create Recipe** (optional) - `recipes/my_item.recipe.json`

### Component Reference

```json
"components": {
  "minecraft:icon": "textures/items/icon_name",
  "minecraft:max_stack_size": 64,
  "minecraft:damage": 5,
  "minecraft:durability": { "max_durability": 100 },
  "minecraft:food": { "nutrition": 4, "saturation_modifier": 0.8 },
  "minecraft:armor": { "protection": 5, "slot": "chest" },
  "minecraft:enchantable": { "slot": "sword_enchantments", "value": 20 },
  "minecraft:glint": true
}
```

## Recipe Development

### Shaped Recipe (Pattern-based)

```json
{
  "format_version": "1.12",
  "minecraft:recipe_shaped": {
    "description": { "identifier": "recipe:my_recipe" },
    "tags": ["crafting_table"],
    "pattern": [
      "XXX",
      "XYX",
      "XXX"
    ],
    "key": {
      "X": { "item": "minecraft:obsidian" },
      "Y": { "item": "minecraft:diamond" }
    },
    "result": {
      "item": "nbt:my_item",
      "count": 1
    }
  }
}
```

### Shapeless Recipe (Ingredient-based)

```json
{
  "format_version": "1.12",
  "minecraft:recipe_shapeless": {
    "description": { "identifier": "recipe:potion" },
    "tags": ["crafting_table"],
    "ingredients": [
      { "item": "minecraft:glass_bottle" },
      { "item": "minecraft:water_bucket" }
    ],
    "result": {
      "item": "nbt:hydration_potion",
      "count": 2
    }
  }
}
```

## Function Development

### Basic Function

```mcfunction
# my_function.mcfunction
give @s minecraft:diamond
title @s actionbar {"rawtext":[{"text":"§6You got a diamond!"}]}
effect @s regeneration 20 2
```

### Tags and Selectors

```mcfunction
# Execute for all players
execute as @a run title @s actionbar {"rawtext":[{"text":"Test"}]}

# Execute for specific items
execute as @a[hasitem={item=nbt:obsidian_sword}] run ...

# Execute with condition
execute as @a[scores={thirst=0..5}] run ...
```

### Messaging

```mcfunction
# Title (above player)
title @s title {"rawtext":[{"text":"§6Big Text"}]}

# Subtitle
title @s subtitle {"rawtext":[{"text":"Small Text"}]}

# Action bar (above hotbar)
title @s actionbar {"rawtext":[{"text":"Quick Message"}]}

# Chat
tellraw @s {"rawtext":[{"text":"§6[NBT] §aMessage in chat"}]}
```

## Script Development

### Script Template

```javascript
let system = server.registerSystem(0, 0);

system.initialize = function() {
  // Initialization code
  this.listenForEvent("minecraft:entity_tick", (eventData) => {
    try {
      // Event handling
    } catch (e) {
      console.warn("Error:", e);
    }
  });
};

// Helper functions
function myHelper() {
  // Logic here
}
```

### Event Types

```javascript
// Player events
"minecraft:player_attacked"
"minecraft:player_destroyed_block"
"minecraft:player_placed_block"
"minecraft:entity_tick"

// World events
"minecraft:block_destroyed"
"minecraft:entity_hurt"
"minecraft:entity_death"
```

### Getting Player Inventory

```javascript
let player = eventData.data.player;
let inventory = player.getComponent("minecraft:inventory").container;
let itemStack = inventory.getItem(player.selectedSlot);

if (itemStack && itemStack.id === "nbt:my_item") {
  // Do something
}
```

## Loot Table Development

### Basic Structure

```json
{
  "pools": [
    {
      "rolls": 1,  // Number of rolls
      "entries": [
        {
          "type": "item",
          "name": "nbt:item_name",
          "weight": 10
        }
      ]
    }
  ]
}
```

### With Functions

```json
{
  "type": "item",
  "name": "minecraft:diamond",
  "weight": 50,
  "functions": [
    {
      "function": "set_count",
      "count": { "min": 1, "max": 5 }
    },
    {
      "function": "set_name",
      "name": "§6Custom Diamond"
    }
  ]
}
```

## Manifest Configuration

### Structure

```json
{
  "format_version": 2,
  "header": {
    "name": "NeiroBetterTools BP",
    "description": "Description here",
    "uuid": "unique-id-here",
    "version": [1, 0, 0],
    "min_engine_version": [1, 20, 0]
  },
  "modules": [
    {
      "type": "data",
      "uuid": "another-unique-id",
      "version": [1, 0, 0]
    },
    {
      "type": "script",
      "uuid": "script-unique-id",
      "version": [1, 0, 0],
      "entry": "scripts/main.js"
    }
  ],
  "dependencies": [
    {
      "uuid": "resource-pack-uuid",
      "version": [1, 0, 0]
    }
  ]
}
```

## Testing & Debugging

### Test New Items
```mcfunction
/give @s nbt:my_item 1
```

### Test Functions
```mcfunction
/function my_function
```

### Debug Scripts
Check browser console if using scripting API viewer.

### Validate JSON
Use online JSON validators before testing.

## Best Practices

1. **Item Naming**: Use lowercase with underscores (`my_item_name`)
2. **Identifiers**: Always prefix with namespace (`nbt:item_name`)
3. **Colors**: Use format codes (`§6` for gold, `§c` for red)
4. **Documentation**: Comment complex logic
5. **Testing**: Test each component individually
6. **Performance**: Avoid heavy loops in scripts
7. **UUIDs**: Generate unique UUIDs for each module

## Adding New Features

### Feature Checklist
- [ ] Create item file (if needed)
- [ ] Add texture (if visual)
- [ ] Create recipe (if craftable)
- [ ] Add translations
- [ ] Write script logic (if needed)
- [ ] Create function (if needed)
- [ ] Update README documentation
- [ ] Test thoroughly
- [ ] Validate all JSON files

## Common Issues

### Items Not Showing
- Check identifier format
- Verify texture file exists
- Check translation entries

### Recipes Not Working
- Verify format version
- Check item identifiers
- Validate JSON syntax

### Scripts Not Running
- Check manifest includes script
- Verify tick.json exists
- Check for JS syntax errors

---

**Happy developing!**
