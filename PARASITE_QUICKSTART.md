# 🦠 QUICK START - Parasite System

## 30-Second Setup

```minecraft
/function init_parasites
/give @s nbt:infected_water 1
```

Done! Drink it to get infected.

---

## Quick Recipes

### Make Infected Water
```
CRAFTING TABLE:
  P
  W
  
P = Parasite Sample (given or command)
W = Water Bucket
RESULT = Infected Water (1)
```

### Make Infected Food
```
CRAFTING TABLE (Shapeless):
  [Food] + Parasite Sample
  
RESULT = Infected [Food]

Works with:
- Bread → Infected Bread
- Apple → Infected Apple
- Cooked Beef → Infected Cooked Beef
- Cooked Chicken → Infected Cooked Chicken
```

### Make Clear Water
```
CRAFTING TABLE:
  S
  W
  
S = Sand
W = Turbid Water
RESULT = Clear Water (safe to drink)
```

---

## Quick Effects

### When Infected:
- ⚠️ Hunger II effect (food fills 50% slower)
- 💔 Random damage every 3 seconds
- 🎯 Action bar message: "PARASITE INFECTION"
- ⏱️ Lasts 30 minutes

### When You Die Infected:
- 🧟 Zombie spawns at your location
- ❤️ Possesses your corpse
- 📢 Message: "A body rises... parasites took control!"

---

## Quick Commands

```minecraft
# Give parasite sample
/give @s nbt:parasite_sample 1

# Give infected water
/give @s nbt:infected_water 1

# Check if infected
/scoreboard players get @s parasite_infected

# Check infection duration
/scoreboard players get @s parasite_duration

# Force infect
/scoreboard players set @s parasite_infected 1
/scoreboard players set @s parasite_duration 36000

# Clear infection
/scoreboard players set @s parasite_infected 0
```

---

## Quick Tips

🎯 **Best for**:
- Creating challenging water sources
- PvP base defenses (poison food)
- Zombie apocalypse roleplay
- Plague/epidemic gameplay

⚠️ **Beware of**:
- Food consumption rate increases massively
- Accidental consumption difficult to recover from
- Death spawns zombie (security/farm risk)

💡 **Strategy**:
1. Obtain parasite sample
2. Create infected water
3. Hide it in enemy territory
4. Lure enemies to drink it
5. Watch them struggle with debuffs

---

## Crafting Flow Diagram

```
Water Bucket          Dirt           Sand
    ####             [D]            {S}
     | + | = ----→ Turbid Water
     |   |          (x2)
     ####
              +
              |
              S
              |
              ↓
          Clear Water ✓ (SAFE)
          
Water Bucket + Parasite Sample → INFECTED WATER 🦠 (DANGER!)

Any Food + Parasite Sample → INFECTED [FOOD] 🦠 (DANGER!)
```

---

## Scoring System Reference

| Score | Meaning |
|-------|---------|
| `parasite_infected = 0` | Clean (no infection) |
| `parasite_infected = 1` | Infected (active) |
| `parasite_duration` | Time remaining (ticks) |
| `parasite_duration = 36000` | 30 minutes |
| `parasite_duration = 0` | Cured |

---

## Multi-Language Item Names

### English
- Infected Water
- Infected Bread / Apple / Beef / Chicken
- Parasite Sample
- Turbid Water / Clear Water

### Español
- Agua Infectada
- Pan/Manzana/Carne/Pollo Infectado(a)
- Muestra de Parásito
- Agua Turbia / Agua Clara

### Português
- Água Infectada
- Pão/Maçã/Carne/Frango Infectado
- Amostra de Parasita
- Água Turva / Água Clara

---

## Troubleshooting

**Problem**: Can't find recipes
**Solution**: Verify tick.json has parasites functions

**Problem**: Infection doesn't apply
**Solution**: Make sure player actually consumed the item

**Problem**: No zombie spawns
**Solution**: Check player is actually infected (score = 1)

**Problem**: Laggy
**Solution**: Disable random damage in parasites_effects.mcfunction

---

## Files You Need

Core system files:
- `/ items/infected_*.json`
- `/ recipes/infected_*.recipe.json`
- `/ scripts/parasites*.js`
- `/ functions/parasites_*.mcfunction`
- `/ functions/tick.json` (updated)

---

## Keep It Simple

1. **Get parasite sample** via `/give` command
2. **Make infected water** at crafting table
3. **Drink it** and experience effects
4. **Die while infected** to spawn zombie
5. **Repeat** as desired

---

## Advanced Play

- Mix infected food into community chests
- Create "contamination zones" with infected water
- Use parasite timer for raid countdowns
- Force players to defend water sources
- Create infection hotspots on map

---

**System Status**: ✅ READY TO PLAY

Go drink that infected water! 🦠
