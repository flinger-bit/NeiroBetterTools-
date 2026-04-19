# Thirst drink water bucket - Restores 4 thirst levels
scoreboard objectives add drink_water dummy "Drink Water"
execute as @a[hasitem={item=minecraft:water_bucket}] run effect @s resistance 8 1
execute as @a[hasitem={item=minecraft:water_bucket}] run playsound random.drink @a
