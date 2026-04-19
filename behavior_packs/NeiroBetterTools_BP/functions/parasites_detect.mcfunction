# Parasite Detection - ULTRA OPTIMIZED v2.0
# Scoreboard-based detection, zero JavaScript overhead

# Detect infected water consumption (optimized)
execute as @a if entity @s[hasitem={item=nbt:infected_water}] run scoreboard players set @s parasite_infected 1
execute as @a if entity @s[hasitem={item=nbt:infected_water}] run scoreboard players set @s parasite_duration 36000

# Detect infected food consumption (ultra-efficient batch processing)
execute as @a if entity @s[hasitem={item=nbt:infected_bread}] run scoreboard players set @s parasite_infected 1
execute as @a if entity @s[hasitem={item=nbt:infected_bread}] run scoreboard players set @s parasite_duration 36000

execute as @a if entity @s[hasitem={item=nbt:infected_apple}] run scoreboard players set @s parasite_infected 1
execute as @a if entity @s[hasitem={item=nbt:infected_apple}] run scoreboard players set @s parasite_duration 36000

execute as @a if entity @s[hasitem={item=nbt:infected_cooked_beef}] run scoreboard players set @s parasite_infected 1
execute as @a if entity @s[hasitem={item=nbt:infected_cooked_beef}] run scoreboard players set @s parasite_duration 36000

execute as @a if entity @s[hasitem={item=nbt:infected_cooked_chicken}] run scoreboard players set @s parasite_infected 1
execute as @a if entity @s[hasitem={item=nbt:infected_cooked_chicken}] run scoreboard players set @s parasite_duration 36000

# Clear expired infections (failsafe)
execute as @a[scores={parasite_infected=1,parasite_duration=..0}] run scoreboard players set @s parasite_infected 0
