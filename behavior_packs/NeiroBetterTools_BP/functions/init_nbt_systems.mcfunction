# Support function - Initialize NBT Systems
scoreboard objectives add nbt_setup dummy "NBT Setup"

# Create objectives for tracking
scoreboard objectives add player_level dummy "Player Level"
scoreboard objectives add custom_damage dummy "Custom Damage"
scoreboard objectives add special_effect dummy "Special Effect"

# Setup initial players
scoreboard players set @a nbt_setup 0

tellraw @a {"rawtext":[{"text":"§6[NBT] §9NeiroBetterTools Systems Initialized!"}]}
