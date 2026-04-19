const { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } = require('fs');
const { join, relative, sep } = require('path');

const root = process.cwd();
const distDir = join(root, 'dist');
const outFile = join(distDir, 'NeiroBetterTools.mcaddon');
const packs = [
  'behavior_packs/NeiroBetterTools_BP',
  'resource_packs/NeiroBetterTools_RP',
  'skin_packs/NeiroBetterTools_Skins'
].filter((pack) => existsSync(join(root, pack)));
const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const filePath = join(dir, entry);
    const stats = statSync(filePath);
    return stats.isDirectory() ? walk(filePath) : [filePath];
  });
}

function validateJsonFiles() {
  const jsonFiles = packs.flatMap((pack) => walk(join(root, pack))).filter((file) => file.endsWith('.json'));
  for (const file of jsonFiles) JSON.parse(readFileSync(file, 'utf8'));
  return jsonFiles.length;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date) {
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const day = Math.max(date.getFullYear() - 1980, 0);
  const dosDate = (day << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time, date: dosDate };
}

function uint16(value) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt16LE(value);
  return buffer;
}

function uint32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(value >>> 0);
  return buffer;
}

function zipEntries(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  for (const file of files) {
    const data = readFileSync(file);
    const name = Buffer.from(relative(root, file).split(sep).join('/'));
    const stamp = dosDateTime(statSync(file).mtime);
    const checksum = crc32(data);
    const localHeader = Buffer.concat([
      uint32(0x04034b50), uint16(20), uint16(0), uint16(0), uint16(stamp.time), uint16(stamp.date), uint32(checksum), uint32(data.length), uint32(data.length), uint16(name.length), uint16(0), name
    ]);
    const centralHeader = Buffer.concat([
      uint32(0x02014b50), uint16(20), uint16(20), uint16(0), uint16(0), uint16(stamp.time), uint16(stamp.date), uint32(checksum), uint32(data.length), uint32(data.length), uint16(name.length), uint16(0), uint16(0), uint16(0), uint16(0), uint32(0), uint32(offset), name
    ]);
    localParts.push(localHeader, data);
    centralParts.push(centralHeader);
    offset += localHeader.length + data.length;
  }
  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.concat([
    uint32(0x06054b50), uint16(0), uint16(0), uint16(files.length), uint16(files.length), uint32(centralDirectory.length), uint32(offset), uint16(0)
  ]);
  return Buffer.concat([...localParts, centralDirectory, end]);
}

function packageAddon() {
  mkdirSync(distDir, { recursive: true });
  const files = packs.flatMap((pack) => walk(join(root, pack)));
  writeFileSync(outFile, zipEntries(files));
  return outFile;
}

const jsonCount = validateJsonFiles();
const packagedFile = packageAddon();
const displayPath = relative(root, packagedFile).split(sep).join('/');
console.log(`Validated ${jsonCount} JSON files across ${packs.length} packs.`);
console.log(`Created ${displayPath}.`);
