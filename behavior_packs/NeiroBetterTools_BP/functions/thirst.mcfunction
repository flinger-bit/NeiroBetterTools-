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
