# Spawn Parasitic Zombie on Death
# When an infected player dies, spawn a zombie as if parasites took over their corpse

# This function is called via detection in JavaScript when health <= 0

# Spawn zombie at player death location
summon zombie ~ ~ ~ minecraft:entity_born

# Give the zombie properties to make it seem controlled by parasites
effect @e[type=zombie,c=1,r=2] hunger 1 2 true
effect @e[type=zombie,c=1,r=2] wither 30 0 true

# Play scary particles
particle minecraft:redstone_dust_particle ~ ~ ~ 1.0 0.5 1.0 1.5 20

# Message
tellraw @a[r=32] {"rawtext":[{"text":"§c A body rises... the parasites have taken control!"}]}

# Clear infection scoreboards
scoreboard players set @s parasite_infected 0
scoreboard players set @s parasite_duration 0
