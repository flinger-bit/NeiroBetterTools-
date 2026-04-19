const { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync, rmSync } = require('fs');
const { join, basename } = require('path');
const { spawnSync } = require('child_process');
const zlib = require('zlib');

const root = process.cwd();
const rp = join(root, 'resource_packs', 'NeiroBetterTools_RP');
const bp = join(root, 'behavior_packs', 'NeiroBetterTools_BP');
const itemDir = join(rp, 'textures', 'items');
const soundsDir = join(rp, 'sounds', 'neiro');
const skinDir = join(rp, 'textures', 'entity', 'skins');
const sp = join(root, 'skin_packs', 'NeiroBetterTools_Skins');
const skinPackDir = join(sp, 'skins');
const armorDir = join(rp, 'textures', 'models', 'armor');

for (const dir of [itemDir, soundsDir, skinDir, skinPackDir, armorDir, join(rp, 'textures'), join(sp, 'texts')]) mkdirSync(dir, { recursive: true });

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const name = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, crc]);
}

function png(width, height, pixels) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (width * 4 + 1)] = 0;
    for (let x = 0; x < width; x += 1) {
      const source = (y * width + x) * 4;
      const target = y * (width * 4 + 1) + 1 + x * 4;
      raw[target] = pixels[source];
      raw[target + 1] = pixels[source + 1];
      raw[target + 2] = pixels[source + 2];
      raw[target + 3] = pixels[source + 3];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

function canvas(width, height = width) {
  return { width, height, pixels: Buffer.alloc(width * height * 4) };
}

function color(hex, alpha = 255) {
  const value = hex.replace('#', '');
  return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16), alpha];
}

function setPixel(img, x, y, rgba) {
  x = Math.floor(x);
  y = Math.floor(y);
  if (x < 0 || y < 0 || x >= img.width || y >= img.height) return;
  const i = (y * img.width + x) * 4;
  img.pixels[i] = rgba[0];
  img.pixels[i + 1] = rgba[1];
  img.pixels[i + 2] = rgba[2];
  img.pixels[i + 3] = rgba[3];
}

function rect(img, x, y, w, h, rgba) {
  for (let yy = y; yy < y + h; yy += 1) for (let xx = x; xx < x + w; xx += 1) setPixel(img, xx, yy, rgba);
}

function line(img, x0, y0, x1, y1, width, rgba) {
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
  for (let i = 0; i <= steps; i += 1) {
    const t = steps === 0 ? 0 : i / steps;
    const x = Math.round(x0 + (x1 - x0) * t);
    const y = Math.round(y0 + (y1 - y0) * t);
    rect(img, x - Math.floor(width / 2), y - Math.floor(width / 2), width, width, rgba);
  }
}

function circle(img, cx, cy, r, rgba) {
  for (let y = cy - r; y <= cy + r; y += 1) for (let x = cx - r; x <= cx + r; x += 1) if ((x - cx) ** 2 + (y - cy) ** 2 <= r ** 2) setPixel(img, x, y, rgba);
}

function savePng(path, img) {
  writeFileSync(path, png(img.width, img.height, img.pixels));
}

function saveItem(name, draw) {
  const img = canvas(32);
  draw(img);
  savePng(join(itemDir, `${name}.png`), img);
}

function sword(img, blade, edge, handle) {
  line(img, 9, 23, 23, 9, 5, color(edge));
  line(img, 10, 22, 22, 10, 3, color(blade));
  line(img, 7, 25, 13, 19, 3, color(handle));
  line(img, 6, 20, 12, 26, 3, color('#6b4423'));
  rect(img, 5, 24, 4, 4, color('#2b1b12'));
}

function tool(img, kind, blade, edge) {
  line(img, 8, 25, 23, 10, 3, color('#7a4a24'));
  line(img, 9, 24, 24, 9, 1, color('#c0843f'));
  if (kind === 'pickaxe') {
    line(img, 13, 9, 27, 9, 4, color(edge));
    line(img, 14, 10, 26, 10, 2, color(blade));
  } else if (kind === 'axe') {
    rect(img, 18, 7, 8, 8, color(edge));
    rect(img, 19, 8, 6, 6, color(blade));
    rect(img, 22, 13, 3, 3, color(edge));
  } else if (kind === 'shovel') {
    circle(img, 23, 9, 5, color(edge));
    circle(img, 23, 9, 3, color(blade));
  } else if (kind === 'hoe') {
    line(img, 18, 8, 27, 8, 4, color(edge));
    line(img, 18, 9, 26, 9, 2, color(blade));
  }
}

function bottle(img, liquid, cap = '#64748b', particles = []) {
  rect(img, 11, 5, 10, 3, color('#c7d2fe'));
  rect(img, 12, 8, 8, 16, color('#dbeafe', 150));
  rect(img, 10, 12, 12, 13, color(liquid, 220));
  rect(img, 12, 8, 2, 16, color('#ffffff', 90));
  rect(img, 10, 24, 12, 2, color(cap));
  for (const [x, y, c] of particles) rect(img, x, y, 2, 2, color(c, 230));
}

function armor(img, piece) {
  const dark = color('#120824');
  const main = color('#241449');
  const glow = color('#a78bfa');
  if (piece === 'helmet') {
    rect(img, 8, 8, 16, 10, dark);
    rect(img, 10, 10, 12, 8, main);
    rect(img, 11, 14, 10, 2, color('#0b0715'));
    rect(img, 14, 10, 4, 2, glow);
  } else if (piece === 'chestplate') {
    rect(img, 7, 8, 18, 18, dark);
    rect(img, 10, 10, 12, 16, main);
    rect(img, 5, 11, 5, 8, dark);
    rect(img, 22, 11, 5, 8, dark);
    rect(img, 15, 10, 2, 13, glow);
  } else if (piece === 'leggings') {
    rect(img, 9, 8, 14, 8, dark);
    rect(img, 10, 16, 5, 11, main);
    rect(img, 17, 16, 5, 11, main);
    rect(img, 11, 9, 10, 2, glow);
  } else {
    rect(img, 8, 19, 7, 7, dark);
    rect(img, 17, 19, 7, 7, dark);
    rect(img, 9, 20, 5, 4, main);
    rect(img, 18, 20, 5, 4, main);
    rect(img, 10, 19, 3, 1, glow);
    rect(img, 19, 19, 3, 1, glow);
  }
}

function infectedFood(img, base, shape) {
  if (shape === 'apple') {
    circle(img, 16, 16, 6, color(base));
    rect(img, 15, 8, 2, 4, color('#2f7d32'));
  } else if (shape === 'bread') {
    rect(img, 6, 12, 20, 8, color('#8b4513'));
    rect(img, 8, 10, 16, 12, color(base));
  } else if (shape === 'chicken') {
    rect(img, 7, 12, 17, 9, color(base));
    rect(img, 21, 17, 5, 3, color('#f8e0bd'));
  } else {
    rect(img, 8, 10, 16, 12, color(base));
    rect(img, 12, 14, 8, 2, color('#ffd8b5', 150));
  }
  rect(img, 0, 0, 32, 32, color('#32cd32', 45));
  circle(img, 12, 12, 2, color('#228b22', 120));
  circle(img, 20, 18, 2, color('#228b22', 100));
  rect(img, 15, 13, 2, 2, color('#ffd700', 180));
  rect(img, 19, 20, 2, 2, color('#ffd700', 150));
}

function crystal(img, wand = false) {
  if (wand) {
    line(img, 8, 25, 22, 11, 3, color('#5b3718'));
    line(img, 9, 24, 23, 10, 1, color('#c0843f'));
    circle(img, 23, 9, 5, color('#7c3aed'));
    circle(img, 23, 9, 3, color('#c4b5fd'));
  } else {
    line(img, 16, 7, 23, 16, 5, color('#7c3aed'));
    line(img, 16, 7, 9, 16, 5, color('#6d28d9'));
    rect(img, 12, 16, 8, 8, color('#a78bfa'));
    rect(img, 15, 9, 2, 16, color('#ddd6fe'));
  }
}

const drawers = {
  dirt_sword: img => sword(img, '#8a5a2b', '#4d2f15', '#3f2a19'),
  obsidian_sword: img => sword(img, '#241449', '#0b0715', '#3b254f'),
  spear_wood: img => { line(img, 8, 25, 23, 10, 3, color('#8b5a2b')); line(img, 21, 7, 27, 13, 3, color('#d9d2c3')); line(img, 23, 6, 28, 11, 1, color('#ffffff')); },
  obsidian_pickaxe: img => tool(img, 'pickaxe', '#241449', '#0b0715'),
  obsidian_axe: img => tool(img, 'axe', '#241449', '#0b0715'),
  obsidian_shovel: img => tool(img, 'shovel', '#241449', '#0b0715'),
  obsidian_hoe: img => tool(img, 'hoe', '#241449', '#0b0715'),
  obsidian_helmet: img => armor(img, 'helmet'),
  obsidian_chestplate: img => armor(img, 'chestplate'),
  obsidian_leggings: img => armor(img, 'leggings'),
  obsidian_boots: img => armor(img, 'boots'),
  water_bottle_dirty: img => bottle(img, '#8a6f33', '#64748b', [[13, 14, '#4a3719'], [17, 20, '#5d461f']]),
  water_dirty: img => bottle(img, '#8a6f33', '#64748b', [[13, 14, '#4a3719'], [17, 20, '#5d461f']]),
  water_clean: img => bottle(img, '#38bdf8', '#64748b', [[14, 14, '#7dd3fc']]),
  clear_water: img => bottle(img, '#38bdf8', '#60a5fa', [[15, 14, '#e0f2fe'], [18, 18, '#bae6fd']]),
  turbid_water: img => bottle(img, '#8b4513', '#7c2d12', [[14, 14, '#513016'], [17, 17, '#69411e']]),
  infected_water: img => bottle(img, '#32cd32', '#7c2d12', [[15, 14, '#ffd700'], [18, 18, '#14532d'], [14, 20, '#ffd700']]),
  hydration_potion: img => bottle(img, '#0ea5e9', '#2563eb', [[15, 14, '#e0f2fe'], [17, 18, '#ffffff']]),
  holy_water: img => bottle(img, '#fde68a', '#d97706', [[15, 14, '#ffffff'], [17, 17, '#fef3c7']]),
  parasite_sample: img => { rect(img, 14, 7, 5, 16, color('#dbeafe', 140)); rect(img, 15, 10, 3, 9, color('#22c55e', 190)); rect(img, 13, 6, 7, 2, color('#7c2d12')); line(img, 15, 12, 18, 16, 1, color('#ffd700')); rect(img, 14, 20, 5, 2, color('#dc2626')); },
  infected_bread: img => infectedFood(img, '#a0522d', 'bread'),
  infected_apple: img => infectedFood(img, '#dc143c', 'apple'),
  infected_cooked_beef: img => infectedFood(img, '#a52a2a', 'beef'),
  infected_cooked_chicken: img => infectedFood(img, '#f5deb3', 'chicken'),
  crystal_wand: img => crystal(img, true),
  amethyst_crystal: img => crystal(img, false)
};

function collectItemTextures() {
  const files = readdirSync(join(bp, 'items')).filter(file => file.endsWith('.json')).sort();
  const names = new Set(['water_clean']);
  for (const file of files) {
    const json = JSON.parse(readFileSync(join(bp, 'items', file), 'utf8'));
    const id = json['minecraft:item']?.description?.identifier || '';
    const icon = json['minecraft:item']?.components?.['minecraft:icon'];
    const raw = typeof icon === 'string' ? icon : icon?.texture;
    const fallback = id.includes(':') ? id.split(':')[1] : file.replace(/\.json$/, '');
    const name = raw ? basename(raw) : fallback;
    names.add(name);
    if (raw && raw !== name) names.add(raw);
  }
  return [...names].sort();
}

function generateItems() {
  const textureKeys = collectItemTextures();
  const baseNames = [...new Set(textureKeys.map(name => basename(name)))].sort();
  for (const name of baseNames) saveItem(name, drawers[name] || (img => crystal(img, false)));
  const textureData = {};
  for (const key of textureKeys) textureData[key] = { textures: `textures/items/${basename(key)}` };
  writeFileSync(join(rp, 'textures', 'item_texture.json'), JSON.stringify({ resource_pack_name: 'NeiroBetterTools_RP', texture_name: 'atlas.items', texture_data: textureData }, null, 2) + '\n');
  return baseNames.length;
}

function packIcon(path) {
  const img = canvas(128);
  for (let y = 0; y < 128; y += 1) for (let x = 0; x < 128; x += 1) setPixel(img, x, y, color((x + y) % 20 < 10 ? '#17324f' : '#10243a'));
  circle(img, 64, 64, 38, color('#38bdf8'));
  circle(img, 64, 58, 24, color('#7dd3fc'));
  line(img, 37, 91, 91, 37, 10, color('#1f2937'));
  line(img, 40, 88, 88, 40, 6, color('#a78bfa'));
  line(img, 48, 96, 96, 48, 8, color('#8b5a2b'));
  savePng(path, img);
}

function skin(path, palette) {
  const img = canvas(64, 64);
  const skinColor = color(palette.skin);
  const shirt = color(palette.shirt);
  const pants = color(palette.pants);
  const hair = color(palette.hair);
  const accent = color(palette.accent);
  rect(img, 8, 8, 8, 8, skinColor);
  rect(img, 8, 8, 8, 3, hair);
  rect(img, 9, 12, 2, 1, color('#111827'));
  rect(img, 13, 12, 2, 1, color('#111827'));
  rect(img, 20, 20, 8, 12, shirt);
  rect(img, 20, 20, 8, 2, accent);
  rect(img, 44, 20, 4, 12, shirt);
  rect(img, 36, 52, 4, 12, pants);
  rect(img, 4, 20, 4, 12, shirt);
  rect(img, 20, 52, 4, 12, pants);
  rect(img, 40, 20, 8, 12, shirt);
  rect(img, 40, 20, 8, 2, accent);
  rect(img, 16, 20, 4, 12, shirt);
  rect(img, 32, 52, 4, 12, pants);
  rect(img, 0, 20, 4, 12, shirt);
  rect(img, 16, 52, 4, 12, pants);
  rect(img, 48, 48, 8, 8, accent);
  savePng(path, img);
}

function armorLayer(path, variant) {
  const img = canvas(64, 32);
  const dark = color('#0b0715');
  const main = color('#241449');
  const glow = color('#a78bfa');
  rect(img, 0, 0, 64, 32, color('#000000', 0));
  for (let y = 0; y < 32; y += 8) for (let x = 0; x < 64; x += 8) rect(img, x + 1, y + 1, 6, 6, (x + y + variant) % 16 === 0 ? glow : ((x + y) % 16 === 0 ? main : dark));
  savePng(path, img);
}

function wav(name, notes) {
  const sampleRate = 44100;
  const samples = [];
  for (const note of notes) {
    const count = Math.floor(sampleRate * note.duration);
    for (let i = 0; i < count; i += 1) {
      const t = i / sampleRate;
      const envelope = Math.max(0, 1 - i / count);
      const wave = Math.sin(2 * Math.PI * note.frequency * t) * envelope * note.volume;
      const noise = Math.sin(2 * Math.PI * (note.frequency * 7.13) * t) * (note.noise || 0) * envelope;
      samples.push(Math.max(-1, Math.min(1, wave + noise)));
    }
  }
  const data = Buffer.alloc(samples.length * 2);
  samples.forEach((sample, index) => data.writeInt16LE(Math.round(sample * 32767), index * 2));
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(data.length, 40);
  const wavPath = join(soundsDir, `${name}.wav`);
  const oggPath = join(soundsDir, `${name}.ogg`);
  writeFileSync(wavPath, Buffer.concat([header, data]));
  const converted = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', wavPath, '-c:a', 'libvorbis', '-q:a', '4', oggPath]);
  if (converted.status === 0 && existsSync(oggPath)) rmSync(wavPath);
}

const itemCount = generateItems();
packIcon(join(rp, 'pack_icon.png'));
packIcon(join(bp, 'pack_icon.png'));
skin(join(skinDir, 'neiro_survivor.png'), { skin: '#c68642', shirt: '#2563eb', pants: '#1f2937', hair: '#2f1b0c', accent: '#38bdf8' });
skin(join(skinDir, 'water_guardian.png'), { skin: '#8ecae6', shirt: '#0ea5e9', pants: '#075985', hair: '#0f172a', accent: '#fde68a' });
skin(join(skinDir, 'parasite_hunter.png'), { skin: '#d4a373', shirt: '#d4a373', pants: '#292524', hair: '#111827', accent: '#a3e635' });
skin(join(skinPackDir, 'neiro_survivor.png'), { skin: '#c68642', shirt: '#2563eb', pants: '#1f2937', hair: '#2f1b0c', accent: '#38bdf8' });
skin(join(skinPackDir, 'water_guardian.png'), { skin: '#8ecae6', shirt: '#0ea5e9', pants: '#075985', hair: '#0f172a', accent: '#fde68a' });
skin(join(skinPackDir, 'parasite_hunter.png'), { skin: '#d4a373', shirt: '#14532d', pants: '#292524', hair: '#111827', accent: '#a3e635' });
armorLayer(join(armorDir, 'obsidian_layer_1.png'), 1);
armorLayer(join(armorDir, 'obsidian_layer_2.png'), 2);
wav('thirst_low', [{ frequency: 260, duration: 0.16, volume: 0.25, noise: 0.02 }, { frequency: 210, duration: 0.22, volume: 0.22, noise: 0.03 }]);
wav('thirst_warning', [{ frequency: 180, duration: 0.18, volume: 0.3, noise: 0.05 }, { frequency: 150, duration: 0.25, volume: 0.25, noise: 0.08 }]);
wav('water_drink', [{ frequency: 520, duration: 0.12, volume: 0.16, noise: 0.08 }, { frequency: 430, duration: 0.18, volume: 0.18, noise: 0.12 }, { frequency: 360, duration: 0.18, volume: 0.13, noise: 0.1 }]);
wav('dirty_water', [{ frequency: 300, duration: 0.18, volume: 0.18, noise: 0.16 }, { frequency: 190, duration: 0.25, volume: 0.16, noise: 0.18 }]);
wav('spear_throw', [{ frequency: 740, duration: 0.06, volume: 0.2, noise: 0.18 }, { frequency: 410, duration: 0.14, volume: 0.16, noise: 0.12 }]);
wav('holy_water', [{ frequency: 660, duration: 0.12, volume: 0.18, noise: 0.01 }, { frequency: 880, duration: 0.24, volume: 0.15, noise: 0.01 }]);
wav('parasite_infect', [{ frequency: 140, duration: 0.22, volume: 0.22, noise: 0.18 }, { frequency: 110, duration: 0.2, volume: 0.2, noise: 0.2 }]);
wav('crystal_cast', [{ frequency: 880, duration: 0.08, volume: 0.2, noise: 0.02 }, { frequency: 1175, duration: 0.18, volume: 0.16, noise: 0.01 }]);
wav('obsidian_hit', [{ frequency: 120, duration: 0.08, volume: 0.28, noise: 0.08 }, { frequency: 95, duration: 0.14, volume: 0.22, noise: 0.1 }]);
wav('armor_equip', [{ frequency: 220, duration: 0.08, volume: 0.22, noise: 0.1 }, { frequency: 330, duration: 0.1, volume: 0.18, noise: 0.06 }]);
writeFileSync(join(rp, 'sounds', 'sound_definitions.json'), JSON.stringify({
  'nbt.thirst.low': { sounds: ['sounds/neiro/thirst_low'] },
  'nbt.thirst.warning': { sounds: ['sounds/neiro/thirst_warning'] },
  'nbt.water.drink': { sounds: ['sounds/neiro/water_drink'] },
  'nbt.water.dirty': { sounds: ['sounds/neiro/dirty_water'] },
  'nbt.water.holy': { sounds: ['sounds/neiro/holy_water'] },
  'nbt.spear.throw': { sounds: ['sounds/neiro/spear_throw'] },
  'nbt.parasite.infect': { sounds: ['sounds/neiro/parasite_infect'] },
  'nbt.crystal.cast': { sounds: ['sounds/neiro/crystal_cast'] },
  'nbt.obsidian.hit': { sounds: ['sounds/neiro/obsidian_hit'] },
  'nbt.armor.equip': { sounds: ['sounds/neiro/armor_equip'] }
}, null, 2) + '\n');
const skinsJson = {
  serialize_name: 'NeiroBetterTools',
  localization_name: 'NeiroBetterTools',
  skins: [
    { localization_name: 'neiro_survivor', geometry: 'geometry.humanoid.custom', texture: 'neiro_survivor.png', type: 'free' },
    { localization_name: 'water_guardian', geometry: 'geometry.humanoid.custom', texture: 'water_guardian.png', type: 'free' },
    { localization_name: 'parasite_hunter', geometry: 'geometry.humanoid.custom', texture: 'parasite_hunter.png', type: 'free' }
  ]
};
writeFileSync(join(rp, 'skins.json'), JSON.stringify({ ...skinsJson, skins: [
  { localization_name: 'neiro_survivor', geometry: 'geometry.humanoid.custom', texture: 'textures/entity/skins/neiro_survivor.png', type: 'free' },
  { localization_name: 'water_guardian', geometry: 'geometry.humanoid.custom', texture: 'textures/entity/skins/water_guardian.png', type: 'free' },
  { localization_name: 'parasite_hunter', geometry: 'geometry.humanoid.custom', texture: 'textures/entity/skins/parasite_hunter.png', type: 'free' }
] }, null, 2) + '\n');
writeFileSync(join(sp, 'skins.json'), JSON.stringify(skinsJson, null, 2) + '\n');
writeFileSync(join(sp, 'manifest.json'), JSON.stringify({
  format_version: 1,
  header: {
    name: 'NeiroBetterTools Skins',
    uuid: '9e0841a5-38d1-4c3b-97bb-67e2b7ad7129',
    version: [1, 0, 0]
  },
  modules: [{
    type: 'skin_pack',
    uuid: 'a7346f2f-cf92-4971-9d3f-57d141cbaf32',
    version: [1, 0, 0]
  }]
}, null, 2) + '\n');
writeFileSync(join(sp, 'texts', 'en_US.lang'), 'skinpack.NeiroBetterTools=NeiroBetterTools Skins\nskin.NeiroBetterTools.neiro_survivor=Neiro Survivor\nskin.NeiroBetterTools.water_guardian=Water Guardian\nskin.NeiroBetterTools.parasite_hunter=Parasite Hunter\n');
writeFileSync(join(sp, 'texts', 'es_MX.lang'), 'skinpack.NeiroBetterTools=Skins NeiroBetterTools\nskin.NeiroBetterTools.neiro_survivor=Superviviente Neiro\nskin.NeiroBetterTools.water_guardian=Guardián del Agua\nskin.NeiroBetterTools.parasite_hunter=Cazador de Parásitos\n');
packIcon(join(sp, 'pack_icon.png'));
console.log(`Generated ${itemCount} item textures, 3 skins, a skin pack, armor layers, pack icons, atlas, and 10 sounds.`);
