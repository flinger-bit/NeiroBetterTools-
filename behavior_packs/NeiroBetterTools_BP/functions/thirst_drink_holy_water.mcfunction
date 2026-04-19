# Thirst drink holy water - Restores 8 thirst levels
scoreboard objectives add drink_holy dummy "Drink Holy Water"
execute as @a[hasitem={item=nbt:holy_water}] run clear @s nbt:holy_water 1
execute as @a[hasitem={item=nbt:holy_water}] run effect @s regeneration 20 3
execute as @a[hasitem={item=nbt:holy_water}] run playsound random.drink @a
