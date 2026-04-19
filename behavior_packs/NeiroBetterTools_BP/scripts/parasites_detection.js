// Parasite Detection System - More Reliable Consumption Detection
// Tracks inventory changes to detect when infected items are consumed

const parasites_detection = server.registerSystem(0, 0);

// Store player inventory snapshots for comparison
let playerInventoryCache = {};

parasites_detection.initialize = function() {
  try {
    parasites_detection.log("Parasite Detection System Initialized");
  } catch (error) {
    parasites_detection.error("Error initializing parasites detection: " + error);
  }
};

parasites_detection.update = function() {
  try {
    // Get all players
    let players = parasites_detection.getComponent(Entities.EntityQueryOptions, "query.player")?.results || [];
    
    if (!players || players.length === 0) return;
    
    // Process each player
    for (let i = 0; i < players.length; i++) {
      let player = players[i];
      
      if (!player) continue;
      
      try {
        // Get player inventory
        let inventory = parasites_detection.getComponent(player, "minecraft:inventory");
        if (!inventory || !inventory.data || !inventory.data.container) continue;
        
        let playerId = player.id;
        let infectedItems = [
          "nbt:infected_water",
          "nbt:infected_bread",
          "nbt:infected_apple",
          "nbt:infected_cooked_beef",
          "nbt:infected_cooked_chicken"
        ];
        
        // Check current inventory for infected items
        for (let j = 0; j < inventory.data.container.size; j++) {
          let item = inventory.data.container.getItem(j);
          
          if (item && infectedItems.includes(item.id)) {
            // Infected item detected
            if (!playerInventoryCache[playerId]) {
              playerInventoryCache[playerId] = {};
            }
            
            // Check if this item was just consumed (compare count)
            let previousCount = playerInventoryCache[playerId][item.id] || item.count;
            
            if (item.count < previousCount) {
              // Item was consumed! Infect player
              parasites_detection.executeCommand("scoreboard players set @s parasite_infected 1", {});
              parasites_detection.executeCommand("scoreboard players set @s parasite_duration 36000", {});
              parasites_detection.log("Player " + playerId + " consumed infected item: " + item.id);
            }
            
            // Update cache
            playerInventoryCache[playerId][item.id] = item.count;
          }
        }
        
        // Clean up old cache entries periodically
        if (Math.random() < 0.01) { // 1% chance per tick to clean
          delete playerInventoryCache[playerId];
        }
      } catch (error) {
        // Continue processing other players
      }
    }
  } catch (error) {
    // Silent fail
  }
};

// Listen for entity hurt events to increase infection intensity
parasites_detection.listenForEvent("minecraft:entity_hurt", function(eventData) {
  try {
    if (!eventData || !eventData.entity) return;
    
    // Check if player, and if infected, increase intensity
    let entity = eventData.entity;
    if (entity && entity.id && entity.id.includes("minecraft:player")) {
      // This player took damage while potentially infected
    }
  } catch (error) {
    // Silent fail
  }
});
