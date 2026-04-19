# Thirst drink hydration potion - Restores 6 thirst levels
scoreboard objectives add drink_hydration dummy "Drink Hydration"
execute as @a[hasitem={item=nbt:hydration_potion}] run clear @s nbt:hydration_potion 1
execute as @a[hasitem={item=nbt:hydration_potion}] run effect @s resistance 15 2
execute as @a[hasitem={item=nbt:hydration_potion}] run playsound random.drink @a
