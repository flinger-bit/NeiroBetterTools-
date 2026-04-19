// Parasite System - ULTRA OPTIMIZED v2.0
// Minimal JavaScript, maximum mcfunction performance
// Designed for zero lag on all devices

const parasite_system = server.registerSystem(0, 0);

parasite_system.initialize = function() {
  try {
    parasite_system.log("Parasite System Ultra-Optimized v2.0 - Zero Lag");
  } catch (error) {
    // Silent fail for production
  }
};

// Ultra-minimal update - only handle critical death detection
parasite_system.update = function() {
  try {
    // Only check for player deaths - everything else handled by optimized mcfunction
    let players = parasite_system.getComponent(Entities.EntityQueryOptions, "query.player")?.results || [];

    if (!players || players.length === 0) return;

    for (let i = 0; i < players.length; i++) {
      let player = players[i];

      if (!player) continue;

      try {
        // Ultra-efficient death detection
        let health = parasite_system.getComponent(player, "minecraft:health")?.data?.current || 20;

        if (health <= 0) {
          // Player died - check if infected and spawn zombie if needed
          // This is handled by mcfunction now for better performance
          parasite_system.executeCommand("execute as @s[scores={parasite_infected=1..}] run function parasites_zombie_spawn", {});
        }
      } catch (error) {
        // Silent fail for individual player processing
      }
    }
  } catch (error) {
    // Silent fail for entire update
  }
};

// Minimal event handling - most logic moved to mcfunction
parasite_system.listenForEvent("minecraft:entity_hurt", function(eventData) {
  try {
    if (!eventData || !eventData.entity) return;

    let entity = eventData.entity;

    // Only process if it's a player (efficient check)
    if (entity && entity.id && entity.id.includes("minecraft:player")) {
      // Infection intensity boost handled by mcfunction now
    }
  } catch (error) {
    // Silent fail
  }
});
parasite_system.listenForEvent("minecraft:player_destroyed_block", function(eventData) {
  try {
    if (!eventData || !eventData.player) return;
    
    // Check if player has infected water in inventory
    let player = eventData.player;
    let inventory = parasite_system.getComponent(player, "minecraft:inventory")?.data;
    
    if (!inventory || !inventory.container) return;
    
    // Scan for infected water items
    for (let i = 0; i < inventory.container.size; i++) {
      let item = inventory.container.getItem(i);
      if (item && item.id === "nbt:infected_water") {
        // Infect the player
        let infection = parasite_system.getComponent(player, "nbt:infection");
        if (!infection) {
          parasite_system.createComponent(player, "nbt:infection", {
            duration: 36000, // 30 minutes at 20 ticks/second
            intensity: 1
          });
        } else if (infection.data) {
          infection.data.duration = Math.max(infection.data.duration, 36000);
          infection.data.intensity = Math.min(infection.data.intensity + 1, 5);
        }
        
        // Tell player they're infected
        parasite_system.executeCommand("tell @s You feel something wrong...", {});
        return;
      }
    }
  } catch (error) {
    parasite_system.log("Error in infected water check: " + error);
  }
});

parasite_system.listenForEvent("minecraft:entity_hurt", function(eventData) {
  try {
    if (!eventData || !eventData.entity) return;
    
    let entity = eventData.entity;
    
    // Check if entity is infected and took damage
    let infection = parasite_system.getComponent(entity, "nbt:infection");
    if (infection && infection.data) {
      // Boost infection intensity on damage
      infection.data.intensity = Math.min(infection.data.intensity + 0.5, 5);
    }
  } catch (error) {
    // Silently handle errors
  }
});
