let system = server.registerSystem(0, 0);

// Tool Enhancement Script
const TOOL_CONFIG = {
  MINING_SPEED_BONUS: 1.5,
  DURABILITY_REDUCTION: 0.8,
  EFFICIENCY_LEVEL: 4,
  UNBREAKING_CHANCE: 0.3
};

const customTools = [
  "nbt:obsidian_pickaxe",
  "nbt:obsidian_axe",
  "nbt:obsidian_shovel",
  "nbt:obsidian_hoe"
];

system.initialize = function() {
  // Monitor block break for tool benefits
  this.listenForEvent("minecraft:player_destroyed_block", (eventData) => {
    try {
      if (!eventData || !eventData.data) return;
      
      let player = eventData.data.player;
      if (!player || !player.getComponent) return;
      
      let inventory = player.getComponent("minecraft:inventory");
      if (!inventory || !inventory.container) return;
      
      let itemStack = inventory.container.getItem(inventory.container.size - 1);
      
      if (itemStack && isCustomTool(itemStack.id)) {
        applyToolBenefits(player);
      }
    } catch (e) {
      console.warn("Tool system error:", e);
    }
  });
};

function isCustomTool(itemId) {
  return customTools.includes(itemId);
}

function applyToolBenefits(player) {
  try {
    if (player.addEffect) {
      player.addEffect("haste", 1, 1, false);
    }
  } catch (e) {
    console.warn("Tool benefit error:", e);
  }
}
