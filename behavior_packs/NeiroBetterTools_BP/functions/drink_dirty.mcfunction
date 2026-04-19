scoreboard players remove @s thirst 45
scoreboard players set @s[scores={thirst=..0}] thirst 0
playsound nbt.water.dirty @s
effect @s nausea 8 0 true
effect @s hunger 12 0 true
clear @s nbt:water_bottle_dirty 0 1
