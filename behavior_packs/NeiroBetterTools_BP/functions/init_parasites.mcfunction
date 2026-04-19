# Parasites System Initialization Function
# Run this once per world or on load

# Initialize infection scoreboards
scoreboard objectives add parasite_infected dummy "Parasite Infection"
scoreboard objectives add parasite_duration dummy "Infection Duration"
scoreboard objectives add parasite_intensity dummy "Infection Intensity"

# Tell players the system loaded
tell @a[tag=admin] Parasite system loaded
