// texture_generator.js - COPIA ESTE ARCHIVO COMPLETO A REPLIT
// Generador automático de texturas para NeiroBetterTools - Sistema de Parásitos

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Función para crear canvas 32x32
function createTextureCanvas() {
  return createCanvas(32, 32);
}

// Función para guardar textura
function saveTexture(canvas, filename) {
  // Crear directorio si no existe
  const dir = path.dirname(path.join('output', 'textures', 'items', filename));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join('output', 'textures', 'items', filename);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Textura guardada: ${filename}`);
}

// Función para dibujar rectángulo
function drawRect(ctx, x, y, w, h, r, g, b, a = 255) {
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a/255})`;
  ctx.fillRect(x, y, w, h);
}

// Función para dibujar círculo
function drawCircle(ctx, x, y, radius, r, g, b, a = 255) {
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a/255})`;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

// Función para dibujar píxel individual
function setPixel(ctx, x, y, r, g, b, a = 255) {
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a/255})`;
  ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

console.log('🎨 Generador de Texturas NeiroBetterTools - Sistema de Parásitos');
console.log('🚀 Iniciando generación de texturas...\n');

// =====================================================================================
// 1. AGUA TURBIA (turbid_water.png)
// =====================================================================================

function generateTurbidWater() {
  console.log('🌊 Generando agua turbia...');
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 32, 32);

  // Botella de vidrio
  drawRect(ctx, 12, 8, 8, 16, 200, 200, 200, 100); // Vidrio
  drawRect(ctx, 11, 7, 10, 18, 150, 150, 150, 50);  // Sombra

  // Líquido marrón turbio
  drawRect(ctx, 13, 10, 6, 12, 139, 69, 19, 200); // Marrón tierra

  // Partículas turbias
  for (let i = 0; i < 12; i++) {
    let x = 14 + Math.random() * 4;
    let y = 11 + Math.random() * 10;
    drawCircle(ctx, x, y, 0.5, 101, 67, 33, 150);
  }

  // Tapa de la botella
  drawRect(ctx, 11, 6, 10, 2, 100, 100, 100, 255);

  saveTexture(canvas, 'turbid_water.png');
}

// =====================================================================================
// 2. AGUA CLARA (clear_water.png)
// =====================================================================================

function generateClearWater() {
  console.log('💧 Generando agua clara...');
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 32, 32);

  // Botella de vidrio con reflejos
  drawRect(ctx, 12, 8, 8, 16, 200, 200, 255, 120);

  // Líquido azul cristalino
  drawRect(ctx, 13, 10, 6, 12, 65, 105, 225, 220);

  // Burbujas y destellos
  drawCircle(ctx, 15, 12, 1, 255, 255, 255, 200);
  drawCircle(ctx, 17, 15, 0.8, 255, 255, 255, 180);
  drawCircle(ctx, 14, 18, 0.6, 255, 255, 255, 160);

  // Reflejos en el vidrio
  drawRect(ctx, 13, 9, 2, 1, 255, 255, 255, 150);
  drawRect(ctx, 17, 11, 1, 2, 255, 255, 255, 120);

  // Tapa
  drawRect(ctx, 11, 6, 10, 2, 100, 100, 100, 255);

  saveTexture(canvas, 'clear_water.png');
}

// =====================================================================================
// 3. AGUA INFECTADA (infected_water.png)
// =====================================================================================

function generateInfectedWater() {
  console.log('🦠 Generando agua infectada...');
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 32, 32);

  // Botella de vidrio
  drawRect(ctx, 12, 8, 8, 16, 180, 220, 180, 100);

  // Líquido verde infectado
  drawRect(ctx, 13, 10, 6, 12, 50, 205, 50, 200);

  // Parásitos nadando (líneas curvas doradas)
  for (let i = 0; i < 5; i++) {
    setPixel(ctx, 14 + i, 12 + Math.sin(i * 0.5) * 2, 255, 215, 0, 180);
  }

  for (let i = 0; i < 4; i++) {
    setPixel(ctx, 16 + i, 16 + Math.sin(i * 0.7) * 1.5, 255, 215, 0, 160);
  }

  // Partículas verdes adicionales
  drawCircle(ctx, 15, 14, 0.8, 34, 139, 34, 140);
  drawCircle(ctx, 17, 18, 0.6, 34, 139, 34, 120);

  // Efecto de contaminación
  drawCircle(ctx, 14, 20, 1.2, 0, 100, 0, 100);

  // Tapa marrón
  drawRect(ctx, 11, 6, 10, 2, 139, 69, 19, 255);

  saveTexture(canvas, 'infected_water.png');
}

// =====================================================================================
// 4. MUESTRA DE PARÁSITO (parasite_sample.png)
// =====================================================================================

function generateParasiteSample() {
  console.log('🧪 Generando muestra de parásito...');
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 32, 32);

  // Tubo de vidrio pequeño
  drawRect(ctx, 14, 8, 4, 12, 200, 200, 255, 150);
  drawRect(ctx, 13, 7, 6, 14, 150, 150, 200, 80);

  // Líquido con parásitos
  drawRect(ctx, 15, 10, 2, 8, 50, 205, 50, 180);

  // Parásitos en el líquido
  for (let i = 0; i < 6; i++) {
    let x = 15 + Math.sin(i * 0.3) * 1.5;
    let y = 11 + i * 0.8;
    setPixel(ctx, x, y, 255, 69, 0, 200);
  }

  // Parásitos pequeños
  drawCircle(ctx, 16, 13, 0.5, 255, 215, 0, 160);
  drawCircle(ctx, 15, 16, 0.4, 255, 215, 0, 140);

  // Tapa del tubo
  drawRect(ctx, 13, 6, 6, 2, 139, 69, 19, 255);

  // Etiqueta roja
  drawRect(ctx, 14, 19, 4, 1, 255, 0, 0, 255);

  saveTexture(canvas, 'parasite_sample.png');
}

// =====================================================================================
// FUNCIONES PARA COMIDAS INFECTADAS
// =====================================================================================

// Función auxiliar para crear overlay de infección
function applyInfectionOverlay(ctx) {
  // Overlay verde translúcido
  ctx.fillStyle = 'rgba(50, 205, 50, 0.3)';
  ctx.fillRect(0, 0, 32, 32);

  // Pequeños parásitos en la superficie
  for (let i = 0; i < 4; i++) {
    let x = 8 + Math.random() * 16;
    let y = 8 + Math.random() * 16;
    drawCircle(ctx, x, y, 0.8, 255, 215, 0, 120);
  }

  // Manchas de infección
  drawCircle(ctx, 12, 12, 2, 34, 139, 34, 80);
  drawCircle(ctx, 20, 18, 1.5, 34, 139, 34, 60);
}

// =====================================================================================
// 5. PAN INFECTADO (infected_bread.png)
// =====================================================================================

function generateInfectedBread() {
  console.log('🍞 Generando pan infectado...');
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 32, 32);

  // Pan base
  drawRect(ctx, 6, 12, 20, 8, 139, 69, 19, 255);
  drawRect(ctx, 8, 10, 16, 12, 160, 82, 45, 255);

  // Textura del pan
  for (let i = 0; i < 25; i++) {
    let x = 8 + Math.random() * 16;
    let y = 11 + Math.random() * 10;
    setPixel(ctx, x, y, 101, 67, 33, 200);
  }

  // Aplicar overlay de infección
  applyInfectionOverlay(ctx);

  saveTexture(canvas, 'infected_bread.png');
}

// =====================================================================================
// 6. MANZANA INFECTADA (infected_apple.png)
// =====================================================================================

function generateInfectedApple() {
  console.log('🍎 Generando manzana infectada...');
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 32, 32);

  // Manzana base
  drawCircle(ctx, 16, 16, 6, 220, 20, 60, 255);

  // Brillo de la manzana
  drawCircle(ctx, 14, 14, 2, 255, 100, 100, 150);

  // Tallo
  drawRect(ctx, 15, 8, 2, 4, 34, 139, 34, 255);

  // Aplicar overlay de infección
  applyInfectionOverlay(ctx);

  saveTexture(canvas, 'infected_apple.png');
}

// =====================================================================================
// 7. CARNE COCIDA INFECTADA (infected_cooked_beef.png)
// =====================================================================================

function generateInfectedCookedBeef() {
  console.log('🥩 Generando carne cocida infectada...');
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 32, 32);

  // Carne cocida base
  drawRect(ctx, 8, 10, 16, 12, 165, 42, 42, 255);

  // Textura de la carne
  for (let i = 0; i < 20; i++) {
    let x = 9 + Math.random() * 14;
    let y = 11 + Math.random() * 10;
    setPixel(ctx, x, y, 139, 0, 0, 180);
  }

  // Grasa/jugo
  drawRect(ctx, 12, 14, 8, 2, 255, 218, 185, 150);

  // Aplicar overlay de infección
  applyInfectionOverlay(ctx);

  saveTexture(canvas, 'infected_cooked_beef.png');
}

// =====================================================================================
// 8. POLLO COCIDO INFECTADO (infected_cooked_chicken.png)
// =====================================================================================

function generateInfectedCookedChicken() {
  console.log('🍗 Generando pollo cocido infectado...');
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 32, 32);

  // Pollo cocido base
  drawRect(ctx, 6, 12, 20, 8, 255, 218, 185, 255);
  drawRect(ctx, 8, 10, 16, 12, 245, 222, 179, 255);

  // Textura del pollo
  for (let i = 0; i < 22; i++) {
    let x = 8 + Math.random() * 16;
    let y = 11 + Math.random() * 10;
    setPixel(ctx, x, y, 210, 180, 140, 200);
  }

  // Aplicar overlay de infección
  applyInfectionOverlay(ctx);

  saveTexture(canvas, 'infected_cooked_chicken.png');
}

// =====================================================================================
// EJECUCIÓN PRINCIPAL
// =====================================================================================

console.log('\n🚀 Generando todas las texturas del sistema de parásitos...\n');

// Generar todas las texturas
generateTurbidWater();
generateClearWater();
generateInfectedWater();
generateParasiteSample();
generateInfectedBread();
generateInfectedApple();
generateInfectedCookedBeef();
generateInfectedCookedChicken();

console.log('\n✅ ¡TODAS LAS TEXTURAS GENERADAS EXITOSAMENTE!');
console.log('📁 Archivos guardados en: output/textures/items/');
console.log('📋 Lista de archivos generados:');
console.log('   • turbid_water.png');
console.log('   • clear_water.png');
console.log('   • infected_water.png');
console.log('   • parasite_sample.png');
console.log('   • infected_bread.png');
console.log('   • infected_apple.png');
console.log('   • infected_cooked_beef.png');
console.log('   • infected_cooked_chicken.png');
console.log('\n🎮 ¡Listo para copiar al proyecto NeiroBetterTools!');