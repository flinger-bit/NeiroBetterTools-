scoreboard objectives add thirst dummy "Thirst Level"
scoreboard objectives add thirst_immune dummy "Thirst Immunity"
scoreboard objectives add holy_water_count dummy "Holy Water Count"
scoreboard objectives add hydration_count dummy "Hydration Count"
scoreboard players add @a thirst 1
scoreboard players add @a thirst_immune 0
execute as @a[scores={thirst=80}] at @s run playsound nbt.thirst.low @s
execute as @a[scores={thirst=120}] at @s run playsound nbt.thirst.warning @s
execute as @a[scores={thirst=80..119}] run title @s actionbar {"rawtext":[{"text":"§eYou are getting thirsty."}]}
execute as @a[scores={thirst=120..179}] run title @s actionbar {"rawtext":[{"text":"§6You need water soon."}]}
execute as @a[scores={thirst=180..}] run title @s actionbar {"rawtext":[{"text":"§cYou are dehydrated!"}]}
effect @a[scores={thirst=120..}] slowness 2 0 true
effect @a[scores={thirst=180..}] weakness 2 0 true
execute as @a if entity @s[hasitem={item=minecraft:water_bucket}] run effect @s resistance 1 0 true
execute as @a if entity @s[hasitem={item=nbt:hydration_potion}] run effect @s regeneration 1 0 true
execute as @a if entity @s[hasitem={item=nbt:holy_water}] run effect @s regeneration 2 1 true
scoreboard players set @a[scores={thirst=220..}] thirst 220
