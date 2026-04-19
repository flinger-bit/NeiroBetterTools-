let system = server.registerSystem(0, 0);

// Special Events & Achievements System
const SPECIAL_EVENTS = {
  "first_kill": { achieved: false, reward: "congratulations" },
  "collect_all_items": { achieved: false, reward: "complete" },
  "max_thirst": { achieved: false, reward: "hydration" }
};

let playerEvents = new Map();

system.initialize = function() {
  // Track entity death for achievements
  this.listenForEvent("minecraft:entity_death", (eventData) => {
    try {
      if (!eventData || !eventData.data) return;
      // Basic tracking - more complex logic would require additional API
    } catch (e) {
      console.warn("Event system error:", e);
    }
  });

  // Track item collection
  this.listenForEvent("minecraft:entity_tick", (eventData) => {
    try {
      if (!eventData || !eventData.data) return;
      
      let entity = eventData.data.entity;
      if (entity && entity.getComponent) {
        trackItemCollection(entity);
      }
    } catch (e) {
      console.warn("Item tracking error:", e);
    }
  });
};

function trackItemCollection(player) {
  try {
    if (!player.getComponent) return;
    
    let inventory = player.getComponent("minecraft:inventory");
    if (!inventory || !inventory.container) return;
    
    let hasAllItems = true;
    
    const itemsToCheck = [
      "nbt:obsidian_sword",
      "nbt:obsidian_pickaxe",
      "nbt:crystal_wand"
    ];
    
    for (let item of itemsToCheck) {
      let found = false;
      for (let i = 0; i < inventory.container.size; i++) {
        let slot = inventory.container.getItem(i);
        if (slot && slot.id === item) {
          found = true;
          break;
        }
      }
      if (!found) hasAllItems = false;
    }
    
    if (hasAllItems) {
      SPECIAL_EVENTS["collect_all_items"].achieved = true;
    }
  } catch (e) {
    console.warn("Collection tracking error:", e);
  }
}
