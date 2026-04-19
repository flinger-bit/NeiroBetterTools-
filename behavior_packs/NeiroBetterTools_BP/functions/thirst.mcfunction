scoreboard objectives add thirst dummy Thirst
scoreboard players add @a thirst 1
execute as @a if score @s thirst matches 80.. run title @s actionbar {"rawtext":[{"text":"You are thirsty!"}]}
