# Parasite Effects - ULTRA OPTIMIZED v2.0
# Zero lag implementation using scoreboards only

# Apply effects to infected players (those with parasite_infected score > 0)
execute as @a[scores={parasite_infected=1..}] run effect @s hunger 1 1 true

# Show infection status on action bar (optimized - only for infected players)
execute as @a[scores={parasite_infected=1}] run title @s actionbar {"rawtext":[{"text":"§c§l⚠ PARASITE INFECTION ⚠§r§c Hunger x2 | Random Damage"}]}

# Decrease infection duration (ultra-efficient)
scoreboard players remove @a[scores={parasite_infected=1..,parasite_duration=1..}] parasite_duration 1

# Remove infection when duration expires (optimized)
execute as @a[scores={parasite_infected=1,parasite_duration=..0}] run scoreboard players set @s parasite_infected 0
execute as @a[scores={parasite_infected=1,parasite_duration=..0}] run title @s actionbar {"rawtext":[{"text":"§a✓ Parasites eliminated from your body"}]}

# Random damage system - ultra-optimized (only runs for infected players)
# Uses modulo operation for true randomness without JavaScript overhead
execute as @a[scores={parasite_infected=1}] store result score @s parasite_random run random value 1..50
execute as @a[scores={parasite_infected=1,parasite_random=1}] run damage @s 2 wither
