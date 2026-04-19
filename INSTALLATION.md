# NeiroBetterTools Installation Guide

## System Requirements

- **Minecraft Bedrock Edition** v1.20.0 or higher
- **Windows 10/11**, **Xbox One**, **Mobile (iOS/Android)**, or **Nintendo Switch**
- **Recommended**: At least 2GB available storage
- **Optional**: Enable experimental gameplay for full script support

## Step-by-Step Installation

### Method 1: Manual Installation

#### Step 1: Download Add-on Files
- Download the NeiroBetterTools package
- Extract all files to a temporary location

#### Step 2: Locate Minecraft Folder
**Windows 10/11:**
```
C:\Users\[YourUsername]\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang
```

**Alternative (Launcher):**
- Open Minecraft Launcher
- Click `Launch Options`
- Select your profile
- Note the "Game directory"
- Navigate to: `[Game directory]\com.mojang`

#### Step 3: Create World (or Use Existing)
1. Launch Minecraft
2. Create a new world (or select existing)
3. Note the world name

#### Step 4: Copy Add-on Files
1. Navigate to:
```
[Game folder]\com.mojang\minecraftWorlds\[WorldName]\
```

2. Create folders if they don't exist:
   - `behavior_packs/`
   - `resource_packs/`

3. Copy the folders:
   - `NeiroBetterTools_BP/` → `behavior_packs/`
   - `NeiroBetterTools_RP/` → `resource_packs/`

#### Step 5: Enable Add-on in World
1. Open Minecraft
2. Select your world
3. Click "Edit World" → "Manage Packs"
4. **Resource Packs** section:
   - Find "NeiroBetterTools RP"
   - Click → "Activate"
   - Move to "Active" section
5. **Behavior Packs** section:
   - Find "NeiroBetterTools BP"
   - Click → "Activate"
   - Move to "Active" section
6. Click "Done"

#### Step 6: Enable Experimental Features (Recommended)
1. Back in world settings
2. Scroll to "Experimental Features"
3. Enable:
   - ✅ **Holiday Creator Features**
   - ✅ **Additional Modding Capabilities**
   - ✅ **GameTest Framework**
4. Click "Create World"

### Method 2: Quick Installation (Launcher)

1. Extract add-on to any folder
2. Double-click add-on folder (if .mcpack file)
3. Select "Import to Minecraft"
4. Launch Minecraft
5. Create/select world
6. Enable packs in world settings

## Post-Installation

### Initialize Systems
Join the world and run in chat:
```
/function init_nbt_systems
```

Expected output:
```
§6[NBT] §9NeiroBetterTools Systems Initialized!
```

### Give Starter Items
```
/function give_nbt_items
```

This gives you:
- ✅ Full obsidian tool set
- ✅ Full obsidian armor
- ✅ Potions
- ✅ Crystal Wand
- ✅ Amethyst Crystals

### Verify Installation
Check in creative inventory that you have:
- [ ] Obsidian Sword
- [ ] Obsidian Pickaxe
- [ ] Hydration Potion
- [ ] Holy Water
- [ ] All armor pieces

## Troubleshooting Installation

### Add-ons Not Showing in World Settings
**Solution:**
1. Close Minecraft completely
2. Restart your device
3. Reopen Minecraft
4. Check folders are in correct location
5. Verify folder names match exactly (case-sensitive on some systems)

### Items Don't Appear
**Solution:**
1. Restart world (close and reopen)
2. Verify resource pack is active
3. Check network connection (if applicable)
4. Clear Minecraft cache:
   - Go to Settings → Storage → Clear Cache

### Script Errors in Console
**Solution:**
1. Enable experimental features
2. Ensure manifest.json is valid
3. Check script file paths in manifest
4. Verify all JavaScript files have correct syntax

### Recipes Don't Work
**Solution:**
1. Verify you're in Survival mode (not Creative)
2. Check you have correct ingredients
3. Try closing and reopening world
4. Clear recipe cache by:
   - Restart game
   - Delete `recipes_database.json` if found

### Can't Find World Folder
**Solution:**
1. Open Minecraft
2. Create a NEW world (note the name)
3. Close Minecraft
4. Find world in `minecraftWorlds` folder
5. This shows correct file path for future reference

## Advanced Installation

### For Multiple Worlds
Copy the add-on to each world's folder:
```
[WorldName]/behavior_packs/NeiroBetterTools_BP/
[WorldName]/resource_packs/NeiroBetterTools_RP/
```

### For LAN/Multiplayer
1. Host enables add-ons on world
2. Players must have same add-on version
3. Best practice: Use same installation method

### For Cross-Platform (Phone, Xbox, etc.)
1. Install on primary device
2. Log into Microsoft account
3. Purchased/installed add-ons sync automatically
4. Install on secondary devices through Marketplace (if available)

## Uninstallation

### Remove Add-on
1. Delete folders:
   - `behavior_packs/NeiroBetterTools_BP/`
   - `resource_packs/NeiroBetterTools_RP/`

2. Option: Keep world data
   - Scoreboards/players keep existing scores
   - Items in inventory stay

### Clean Remove
1. Remove add-on folders (above)
2. Delete scoreboard data:
   - `level.dat` backup
   - Scoreboards will reset
3. Restart world

## Version Updates

### Update to Newer Version
1. Backup world folder
2. Remove old add-on folders
3. Copy new version folders
4. Enable in world settings
5. Run: `/function init_nbt_systems` (if needed)

### Compatibility Check
Version `1.0.0` requires:
- Minecraft v1.20.0+
- Bedrock Edition (Java not supported)
- All platforms (Windows, Mobile, Xbox, Switch)

## Getting Help

### Installation Issues
- [ ] Check folder structure matches guide
- [ ] Verify add-on UUID in manifests
- [ ] Restart device and Minecraft
- [ ] Reinstall from clean files

### Performance Issues
- [ ] Disable unnecessary packs
- [ ] Reduce render distance
- [ ] Disable background apps
- [ ] Check free device storage

### Gameplay Issues
- [ ] Run: `/reload`
- [ ] Run: `/function init_nbt_systems`
- [ ] Restart world
- [ ] Reinstall add-on

### Still Having Issues?
1. Note the error message
2. Check console logs (if available)
3. Try fresh installation:
   - Delete entire add-on folder
   - Clear Minecraft cache
   - Download fresh copy
   - Install according to this guide

## Quick Reference

### File Locations (Windows)
```
C:\Users\[User]\AppData\Local\Packages\
Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\
games\com.mojang\minecraftWorlds\[World]\
```

### Required Folders After Installation
```
behavior_packs/
  NeiroBetterTools_BP/
    ├── manifest.json
    ├── functions/
    ├── items/
    ├── recipes/
    ├── scripts/
    └── loot_tables/

resource_packs/
  NeiroBetterTools_RP/
    ├── manifest.json
    ├── texts/
    └── textures/
```

### Essential Commands
```mcfunction
/function init_nbt_systems       # Initialize on first join
/function give_nbt_items          # Give all NBT items
/function combat_buff             # Temporary combat boost
/function mining_buff             # Temporary mining boost
/function special_events          # Trigger special events
```

---

**Installation Complete! Enjoy NeiroBetterTools!** 🎮
