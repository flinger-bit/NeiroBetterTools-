<<<<<<< HEAD
scoreboard objectives add thirst dummy Thirst
scoreboard players add @a thirst 1
execute as @a[scores={thirst=80}] at @s run playsound nbt.thirst.low @s
execute as @a[scores={thirst=120}] at @s run playsound nbt.thirst.warning @s
execute as @a[scores={thirst=80..119}] run title @s actionbar {"rawtext":[{"text":"You are getting thirsty."}]}
execute as @a[scores={thirst=120..179}] run title @s actionbar {"rawtext":[{"text":"You need water soon."}]}
execute as @a[scores={thirst=180..}] run title @s actionbar {"rawtext":[{"text":"You are dehydrated!"}]}
execute as @a[scores={thirst=120..}] run effect @s slowness 2 0 true
execute as @a[scores={thirst=180..}] run effect @s weakness 2 0 true
scoreboard players set @a[scores={thirst=220..}] thirst 220
=======
# Thirst System Main Function - Run every tick

# Initialize scoreboards (run only once per world)
scoreboard objectives add thirst dummy "Thirst Level"
scoreboard objectives add thirst_immune dummy "Thirst Immunity"
scoreboard objectives add holy_water_count dummy "Holy Water Count"
scoreboard objectives add hydration_count dummy "Hydration Count"

# Ensure all players have scoress con lcoreboard players add @a thirst 0
scoreboard players add @a thirst_immune 0

# Apply visual feedback for thirst levels
execute as @a[scores={thirst=0..2}] run title @s actionbar {"rawtext":[{"text":"§cYou are VERY THIRSTY!"}]}
execute as @a[scores={thirst=3..5}] run title @s actionbar {"rawtext":[{"text":"§eYou are thirsty."}]}
execute as @a[scores={thirst=6..19}] run title @s actionbar {"rawtext":[{"text":"§aYou feel okay."}]}
execute as @a[scores={thirst=20..}] run title @s actionbar {"rawtext":[{"text":"§bYou are fully hydrated!"}]}

# Apply effects based on thirst level
effect @a[scores={thirst=0..2}] weakness 1 0 true
effect @a[scores={thirst=3..5}] slowness 1 0 true

# Restore thirst with items being held (positive effects)
execute as @a if entity @s[hasitem={item=minecraft:water_bucket}] run effect @s resistance 1 0 true
execute as @a if entity @s[hasitem={item=nbt:hydration_potion}] run effect @s regeneration 1 0 true
execute as @a if entity @s[hasitem={item=nbt:holy_water}] run effect @s regeneration 2 1 true
>>>>>>> 24a3e00 (feat: add new tools and water system)
