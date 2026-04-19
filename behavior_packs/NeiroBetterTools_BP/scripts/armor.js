let system = server.registerSystem(0, 0);

// Armor Enhancement Script
const ARMOR_CONFIG = {
  PROTECTION_BONUS: 1.3,
  ABSORPTION_HEALTH: 2,
  FIRE_RESISTANCE_LEVEL: 1,
  KNOCKBACK_REDUCTION: 0.7
};

const customArmor = [
  "nbt:obsidian_helmet",
  "nbt:obsidian_chestplate",
  "nbt:obsidian_leggings",
  "nbt:obsidian_boots"
];

system.initialize = function() {
  // Monitor entity hurt for armor benefits
  this.listenForEvent("minecraft:entity_hurt", (eventData) => {
    try {
      if (!eventData || !eventData.data) return;
      
      let entity = eventData.data.entity;
      
      if (!entity || !entity.getComponent) return;
      
      if (isWearingCustomArmor(entity)) {
        let protectionLevel = getArmorProtection(entity);
        if (entity.addEffect) {
          entity.addEffect("resistance", 5, Math.max(0, protectionLevel - 1), false);
        }
      }
    } catch (e) {
      console.warn("Armor system error:", e);
    }
  });
};

function isWearingCustomArmor(entity) {
  try {
    if (!entity.getComponent) return false;
    
    let inventory = entity.getComponent("minecraft:inventory");
    if (!inventory || !inventory.container) return false;
    
    // Check all slots for armor
    for (let i = 0; i < inventory.container.size; i++) {
      let item = inventory.container.getItem(i);
      if (item && customArmor.includes(item.id)) {
        return true;
      }
    }
  } catch (e) {
    return false;
  }
  
  return false;
}

function getArmorProtection(entity) {
  let protection = 0;
  
  try {
    if (!entity.getComponent) return 0;
    
    let inventory = entity.getComponent("minecraft:inventory");
    if (!inventory || !inventory.container) return 0;
    
    for (let i = 0; i < inventory.container.size; i++) {
      let item = inventory.container.getItem(i);
      if (item && customArmor.includes(item.id)) {
        protection++;
      }
    }
  } catch (e) {
    return 0;
  }
  
  return Math.min(protection, 4);
}
