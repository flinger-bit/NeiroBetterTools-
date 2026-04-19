let system = server.registerSystem(0, 0);

// Thirst System Configuration
const THIRST_CONFIG = {
  MAX_THIRST: 20,
  THIRST_DRAIN_RATE: 1,
  THIRST_DRAIN_INTERVAL: 6000,
  THIRST_REGEN_RATE: 2,
  WATER_RESTORATION: 4,
  HOLY_WATER_RESTORATION: 8,
  HYDRATION_POTION_RESTORATION: 6,
  DAMAGE_THRESHOLD: 3,
  DAMAGE_INTERVAL: 4000
};

// Store player thirst data
let playerThirstData = new Map();

system.initialize = function() {
  // Monitor entity ticks for all players
  this.listenForEvent("minecraft:entity_tick", (eventData) => {
    try {
      let entity = eventData.data.entity;
      // Check if entity is a player safely
      if (entity && entity.id && typeof entity.id === "string" && entity.id.includes("minecraft:player")) {
        updatePlayerThirst(entity);
      }
    } catch (e) {
      console.warn("Thirst system error:", e);
    }
  });
};

function updatePlayerThirst(player) {
  try {
    let playerId = player.id;
    
    if (!playerThirstData.has(playerId)) {
      playerThirstData.set(playerId, {
        thirst: THIRST_CONFIG.MAX_THIRST,
        lastDrainTick: 0,
        lastDamageTick: 0
      });
    }

    let thirstData = playerThirstData.get(playerId);
    let currentTick = Date.now();

    // Drain thirst over time
    if (currentTick - thirstData.lastDrainTick > THIRST_CONFIG.THIRST_DRAIN_INTERVAL) {
      thirstData.thirst = Math.max(0, thirstData.thirst - THIRST_CONFIG.THIRST_DRAIN_RATE);
      thirstData.lastDrainTick = currentTick;
    }

    // Apply damage when thirsty
    if (thirstData.thirst < THIRST_CONFIG.DAMAGE_THRESHOLD) {
      if (currentTick - thirstData.lastDamageTick > THIRST_CONFIG.DAMAGE_INTERVAL) {
        if (player.health !== undefined && player.health > 0.5) {
          player.health = Math.max(0.5, player.health - 1);
        }
        thirstData.lastDamageTick = currentTick;
      }
    }
  } catch (e) {
    console.warn("Update player thirst error:", e);
  }
}

function restoreThirst(player, amount) {
  try {
    let playerId = player.id;
    if (playerThirstData.has(playerId)) {
      let thirstData = playerThirstData.get(playerId);
      thirstData.thirst = Math.min(THIRST_CONFIG.MAX_THIRST, thirstData.thirst + amount);
    }
  } catch (e) {
    console.warn("Restore thirst error:", e);
  }
}
