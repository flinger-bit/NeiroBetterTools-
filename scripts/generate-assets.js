const { mkdirSync, writeFileSync, existsSync, rmSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');
const zlib = require('zlib');

const root = process.cwd();
const rp = join(root, 'resource_packs', 'NeiroBetterTools_RP');
const bp = join(root, 'behavior_packs', 'NeiroBetterTools_BP');
const itemDir = join(rp, 'textures', 'items');
const soundsDir = join(rp, 'sounds', 'neiro');

mkdirSync(itemDir, { recursive: true });
mkdirSync(soundsDir, { recursive: true });

function crcTable() {
  return Array.from({ length: 256 }, (_, index) => {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    return value >>> 0;
  });
}

const table = crcTable();

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
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

function canvas(size) {
  const pixels = Buffer.alloc(size * size * 4);
  return { size, pixels };
}

function color(hex, alpha = 255) {
  const value = hex.replace('#', '');
  return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16), alpha];
}

function setPixel(img, x, y, rgba) {
  if (x < 0 || y < 0 || x >= img.size || y >= img.size) return;
  const i = (Math.floor(y) * img.size + Math.floor(x)) * 4;
  img.pixels[i] = rgba[0];
  img.pixels[i + 1] = rgba[1];
  img.pixels[i + 2] = rgba[2];
  img.pixels[i + 3] = rgba[3];
}

function rect(img, x, y, w, h, rgba) {
  for (let yy = y; yy < y + h; yy += 1) {
    for (let xx = x; xx < x + w; xx += 1) setPixel(img, xx, yy, rgba);
  }
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
  for (let y = cy - r; y <= cy + r; y += 1) {
    for (let x = cx - r; x <= cx + r; x += 1) {
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r ** 2) setPixel(img, x, y, rgba);
    }
  }
}

function saveImage(name, draw) {
  const img = canvas(32);
  draw(img);
  writeFileSync(join(itemDir, name), png(img.size, img.size, img.pixels));
}

function sword(img, blade, edge, handle) {
  line(img, 9, 23, 23, 9, 5, color(edge));
  line(img, 10, 22, 22, 10, 3, color(blade));
  line(img, 7, 25, 13, 19, 3, color(handle));
  line(img, 6, 20, 12, 26, 3, color('#6b4423'));
  rect(img, 5, 24, 4, 4, color('#2b1b12'));
}

saveImage('dirt_sword.png', (img) => {
  sword(img, '#8a5a2b', '#4d2f15', '#3f2a19');
  rect(img, 14, 15, 3, 3, color('#5f3d1c'));
  rect(img, 18, 11, 2, 2, color('#a86f38'));
  rect(img, 11, 20, 2, 2, color('#6f461f'));
});

saveImage('obsidian_sword.png', (img) => {
  sword(img, '#241449', '#0b0715', '#3b254f');
  rect(img, 15, 15, 2, 2, color('#7c3aed'));
  rect(img, 19, 11, 2, 2, color('#a78bfa'));
  rect(img, 12, 19, 2, 2, color('#4c1d95'));
});

saveImage('spear_wood.png', (img) => {
  line(img, 8, 25, 23, 10, 3, color('#8b5a2b'));
  line(img, 9, 24, 24, 9, 1, color('#c08242'));
  line(img, 21, 7, 26, 12, 2, color('#d9d2c3'));
  line(img, 23, 6, 27, 10, 1, color('#f4efe4'));
  rect(img, 7, 24, 4, 4, color('#4b2e16'));
});

saveImage('water_dirty.png', (img) => {
  rect(img, 11, 5, 10, 3, color('#c7d2fe'));
  rect(img, 12, 8, 8, 16, color('#dbeafe', 170));
  rect(img, 10, 12, 12, 13, color('#8a6f33', 220));
  rect(img, 13, 14, 3, 2, color('#4a3719', 230));
  rect(img, 17, 20, 2, 2, color('#5d461f', 230));
  rect(img, 12, 8, 2, 16, color('#ffffff', 80));
  rect(img, 10, 24, 12, 2, color('#64748b'));
});

saveImage('water_clean.png', (img) => {
  rect(img, 11, 5, 10, 3, color('#c7d2fe'));
  rect(img, 12, 8, 8, 16, color('#dbeafe', 170));
  rect(img, 10, 12, 12, 13, color('#38bdf8', 210));
  rect(img, 14, 14, 6, 2, color('#7dd3fc', 200));
  rect(img, 12, 8, 2, 16, color('#ffffff', 100));
  rect(img, 10, 24, 12, 2, color('#64748b'));
});

function packIcon(path) {
  const img = canvas(128);
  for (let y = 0; y < 128; y += 1) {
    for (let x = 0; x < 128; x += 1) {
      setPixel(img, x, y, color((x + y) % 20 < 10 ? '#17324f' : '#10243a'));
    }
  }
  circle(img, 64, 64, 38, color('#38bdf8'));
  circle(img, 64, 58, 24, color('#7dd3fc'));
  line(img, 37, 91, 91, 37, 10, color('#1f2937'));
  line(img, 40, 88, 88, 40, 6, color('#a78bfa'));
  line(img, 48, 96, 96, 48, 8, color('#8b5a2b'));
  writeFileSync(path, png(img.size, img.size, img.pixels));
}

packIcon(join(rp, 'pack_icon.png'));
packIcon(join(bp, 'pack_icon.png'));

writeFileSync(join(rp, 'textures', 'item_texture.json'), JSON.stringify({
  resource_pack_name: 'NeiroBetterTools_RP',
  texture_name: 'atlas.items',
  texture_data: {
    dirt_sword: { textures: 'textures/items/dirt_sword' },
    obsidian_sword: { textures: 'textures/items/obsidian_sword' },
    spear_wood: { textures: 'textures/items/spear_wood' },
    water_dirty: { textures: 'textures/items/water_dirty' },
    water_clean: { textures: 'textures/items/water_clean' }
  }
}, null, 2) + '\n');

function wav(name, notes) {
  const sampleRate = 44100;
  const samples = [];
  for (const note of notes) {
    const count = Math.floor(sampleRate * note.duration);
    for (let i = 0; i < count; i += 1) {
      const t = i / sampleRate;
      const envelope = Math.max(0, 1 - i / count);
      const wave = Math.sin(2 * Math.PI * note.frequency * t) * envelope * note.volume;
      const noise = (Math.random() * 2 - 1) * (note.noise || 0) * envelope;
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

wav('thirst_low', [
  { frequency: 260, duration: 0.16, volume: 0.25, noise: 0.02 },
  { frequency: 210, duration: 0.22, volume: 0.22, noise: 0.03 }
]);
wav('thirst_warning', [
  { frequency: 180, duration: 0.18, volume: 0.3, noise: 0.05 },
  { frequency: 150, duration: 0.25, volume: 0.25, noise: 0.08 }
]);
wav('water_drink', [
  { frequency: 520, duration: 0.12, volume: 0.16, noise: 0.08 },
  { frequency: 430, duration: 0.18, volume: 0.18, noise: 0.12 },
  { frequency: 360, duration: 0.18, volume: 0.13, noise: 0.1 }
]);
wav('dirty_water', [
  { frequency: 300, duration: 0.18, volume: 0.18, noise: 0.16 },
  { frequency: 190, duration: 0.25, volume: 0.16, noise: 0.18 }
]);
wav('spear_throw', [
  { frequency: 740, duration: 0.06, volume: 0.2, noise: 0.18 },
  { frequency: 410, duration: 0.14, volume: 0.16, noise: 0.12 }
]);

writeFileSync(join(rp, 'sounds', 'sound_definitions.json'), JSON.stringify({
  'nbt.thirst.low': { sounds: ['sounds/neiro/thirst_low'] },
  'nbt.thirst.warning': { sounds: ['sounds/neiro/thirst_warning'] },
  'nbt.water.drink': { sounds: ['sounds/neiro/water_drink'] },
  'nbt.water.dirty': { sounds: ['sounds/neiro/dirty_water'] },
  'nbt.spear.throw': { sounds: ['sounds/neiro/spear_throw'] }
}, null, 2) + '\n');

console.log('Generated item textures, pack icons, item atlas, and custom sounds.');
