# Special Events Handler Function

# Initialize scoreboards for tracking
scoreboard objectives add player_kills dummy "Player Kills"
scoreboard objectives add player_level dummy "Player Level"
scoreboard objectives add first_join dummy "First Join"

# Award starter items on first join
execute as @a[scores={first_join=0}] run function give_nbt_items
execute as @a[scores={first_join=0}] run scoreboard players set @s first_join 1
execute as @a[scores={first_join=0}] run tellraw @s {"rawtext":[{"text":"§6[NBT] §aWelcome to NeiroBetterTools!"}]}

# Reward system - give effects to well-equipped players
execute as @a[hasitem={item=nbt:obsidian_sword},hasitem={item=nbt:obsidian_pickaxe},hasitem={item=nbt:crystal_wand}] run effect @s regeneration 1 0 true

# Level up rewards
execute as @a[scores={player_level=10..}] run tellraw @s {"rawtext":[{"text":"§6[NBT] §aYou are now a Master of Tools!"}]}

# Kill milestone announcements
execute as @a[scores={player_kills=5}] run tellraw @a {"rawtext":[{"text":"§6[NBT] §eA player has achieved 5 kills!"}]}
execute as @a[scores={player_kills=10}] run tellraw @a {"rawtext":[{"text":"§6[NBT] §eA legendary player has achieved 10 kills!"}]}
