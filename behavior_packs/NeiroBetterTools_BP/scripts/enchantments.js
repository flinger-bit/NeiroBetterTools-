let system = server.registerSystem(0, 0);

// Custom Enchantment System
const ENCHANTMENT_EFFECTS = {
  "nbt:obsidian_sword": {
    multiplier: 1.5,
    effects: ["strength"]
  },
  "nbt:obsidian_pickaxe": {
    multiplier: 1.3,
    effects: ["haste"]
  },
  "nbt:crystal_wand": {
    multiplier: 1.2,
    effects: ["speed"]
  }
};

system.initialize = function() {
  // Apply effects when holding custom items
  this.listenForEvent("minecraft:entity_tick", (eventData) => {
    try {
      if (!eventData || !eventData.data) return;
      
      let entity = eventData.data.entity;
      if (!entity || !entity.getComponent) return;
      
      let inventory = entity.getComponent("minecraft:inventory");
      if (!inventory || !inventory.container) return;
      
      let itemStack = inventory.container.getItem(inventory.container.size - 1);
      
      if (itemStack && ENCHANTMENT_EFFECTS[itemStack.id]) {
        applyEnchantmentEffects(entity, itemStack.id);
      }
    } catch (e) {
      console.warn("Enchantment system error:", e);
    }
  });
};

function applyEnchantmentEffects(player, itemId) {
  try {
    let effectData = ENCHANTMENT_EFFECTS[itemId];
    if (!effectData || !effectData.effects) return;
    
    if (!player.addEffect) return;
    
    // Apply effects based on item
    for (let effect of effectData.effects) {
      let duration = 5;
      let amplifier = 0;
      
      player.addEffect(effect, duration, amplifier, false);
    }
  } catch (e) {
    console.warn("Apply enchantment error:", e);
  }
}
