# Random Damage from Parasites
# Called occasionally to deal random damage

# Use randomness: deal damage every ~60 ticks (3 seconds)
# Approximately 2-5 damage per tick when hit
damage @s 2 wither

# Show blood/damage particles effect
particle minecraft:redstone_dust_particle ~ ~ ~ 0.5 0.2 0.5 1.0 10
