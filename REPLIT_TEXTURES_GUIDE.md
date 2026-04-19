# 🖼️ TEXTURAS PARA SISTEMA DE PARÁSITOS - INSTRUCCIONES PARA REPLIT

## 📋 INFORMACIÓN GENERAL

**Proyecto**: NeiroBetterTools - Sistema de Parásitos
**Formato**: Minecraft Bedrock Edition (32x32 píxeles)
**Ubicación**: `/resource_packs/NeiroBetterTools_RP/textures/items/`
**Archivos requeridos**: 8 texturas PNG de 32x32 píxeles

---

## 🎨 PALETA DE COLORES BASE

### Colores Principales:
- **Agua turbia**: `#8B4513` (marrón tierra), `#654321` (marrón oscuro)
- **Agua clara**: `#4169E1` (azul cielo), `#00BFFF` (azul brillante)
- **Agua infectada**: `#32CD32` (verde lima), `#006400` (verde oscuro), `#FFD700` (dorado parásitos)
- **Muestra parásito**: `#FF4500` (rojo anaranjado), `#8B0000` (rojo oscuro), `#FFFF00` (amarillo)
- **Comidas infectadas**: Base comida normal + overlay verde/parásito

### Efectos Visuales:
- **Brillo**: Para items especiales
- **Partículas**: Verde para infección
- **Sombras**: Para profundidad 3D

---

## 📁 ARCHIVOS A CREAR

### 1. `turbid_water.png` - Agua Turbia
**Descripción**: Botella de agua con contenido marrón/turbio
**Estilo**: Similar a `water_bottle` pero con líquido marrón
**Elementos**:
- Botella de vidrio transparente
- Líquido marrón con partículas flotantes
- Etiqueta o marca identificatoria

### 2. `clear_water.png` - Agua Clara
**Descripción**: Botella de agua cristalina y pura
**Estilo**: Similar a `water_bottle` pero más brillante
**Elementos**:
- Botella de vidrio con reflejos
- Líquido azul cristalino
- Burbujas o destellos de luz

### 3. `infected_water.png` - Agua Infectada 🦠
**Descripción**: Botella de agua con contenido verdoso y parásitos visibles
**Estilo**: Similar a `water_bottle` pero con líquido verde y elementos extraños
**Elementos**:
- Botella de vidrio
- Líquido verde brillante
- Parásitos pequeños nadando (líneas curvas)
- Partículas doradas/parásitos
- Efecto de "contaminación"

### 4. `parasite_sample.png` - Muestra de Parásito
**Descripción**: Pequeño contenedor con parásitos vivos
**Estilo**: Tubo de ensayo o vial pequeño
**Elementos**:
- Tubo de vidrio pequeño
- Líquido verde con parásitos
- Tapa o sello
- Etiqueta de "muestra biológica"

### 5. `infected_bread.png` - Pan Infectado
**Descripción**: Pan normal con overlay de infección
**Base**: Copiar `bread.png` de Minecraft
**Modificaciones**:
- Overlay verde translúcido
- Pequeños parásitos en la superficie
- Efecto de moho/parásitos
- Color ligeramente verdoso

### 6. `infected_apple.png` - Manzana Infectada
**Descripción**: Manzana con infección parásita
**Base**: Copiar `apple.png` de Minecraft
**Modificaciones**:
- Manchas verdes en la piel
- Pequeños agujeros de parásitos
- Efecto de infección
- Brillo verdoso

### 7. `infected_cooked_beef.png` - Carne Cocida Infectada
**Descripción**: Filete de carne con parásitos
**Base**: Copiar `cooked_beef.png` de Minecraft
**Modificaciones**:
- Manchas verdes en la carne
- Parásitos visibles en la superficie
- Efecto de infección
- Color ligeramente alterado

### 8. `infected_cooked_chicken.png` - Pollo Cocido Infectado
**Descripción**: Pechuga de pollo con infección
**Base**: Copiar `cooked_chicken.png` de Minecraft
**Modificaciones**:
- Manchas verdes
- Parásitos en la superficie
- Efecto de contaminación
- Color alterado por infección

---

## 🔧 INSTRUCCIONES DETALLADAS PARA REPLIT

### Paso 1: Configurar el Entorno de Replit

```bash
# Crear nuevo proyecto en Replit
1. Ir a https://replit.com
2. Crear nuevo proyecto: "Node.js"
3. Nombre: "NeiroBetterTools-Textures"
```

### Paso 2: Instalar Dependencias

```bash
# Instalar librerías necesarias
npm install canvas fs-extra path
```

### Paso 3: Crear Estructura de Carpetas

```bash
# Crear directorio de texturas
mkdir -p textures/items
mkdir -p output/textures/items
```

### Paso 4: Crear Script Base de Generación

```javascript
// texture_generator.js
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Función para crear canvas 32x32
function createTextureCanvas() {
  return createCanvas(32, 32);
}

// Función para guardar textura
function saveTexture(canvas, filename) {
  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join('output', 'textures', 'items', filename);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Textura guardada: ${filename}`);
}

// Función para dibujar píxel
function setPixel(ctx, x, y, r, g, b, a = 255) {
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a/255})`;
  ctx.fillRect(x, y, 1, 1);
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

console.log('🎨 Generador de Texturas NeiroBetterTools iniciado...');
```

### Paso 5: Generar Textura - Agua Turbia

```javascript
// Añadir al final del script
function generateTurbidWater() {
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');
  
  // Limpiar canvas
  ctx.clearRect(0, 0, 32, 32);
  
  // Botella de vidrio (transparente con borde)
  drawRect(ctx, 12, 8, 8, 16, 200, 200, 200, 100); // Vidrio
  drawRect(ctx, 11, 7, 10, 18, 150, 150, 150, 50);  // Sombra
  
  // Líquido marrón turbio
  drawRect(ctx, 13, 10, 6, 12, 139, 69, 19, 200); // Marrón tierra
  
  // Partículas turbias
  for (let i = 0; i < 8; i++) {
    let x = 14 + Math.random() * 4;
    let y = 11 + Math.random() * 10;
    drawCircle(ctx, x, y, 0.5, 101, 67, 33, 150);
  }
  
  // Tapa de la botella
  drawRect(ctx, 11, 6, 10, 2, 100, 100, 100, 255);
  
  saveTexture(canvas, 'turbid_water.png');
}
```

### Paso 6: Generar Textura - Agua Clara

```javascript
function generateClearWater() {
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, 32, 32);
  
  // Botella de vidrio con reflejos
  drawRect(ctx, 12, 8, 8, 16, 200, 200, 255, 120); // Vidrio azulino
  
  // Líquido azul cristalino
  drawRect(ctx, 13, 10, 6, 12, 65, 105, 225, 220); // Azul cielo
  
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
```

### Paso 7: Generar Textura - Agua Infectada

```javascript
function generateInfectedWater() {
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, 32, 32);
  
  // Botella de vidrio
  drawRect(ctx, 12, 8, 8, 16, 180, 220, 180, 100);
  
  // Líquido verde infectado
  drawRect(ctx, 13, 10, 6, 12, 50, 205, 50, 200);
  
  // Parásitos nadando (líneas curvas)
  // Parásito 1
  for (let i = 0; i < 5; i++) {
    setPixel(ctx, 14 + i, 12 + Math.sin(i * 0.5) * 2, 255, 215, 0, 180);
  }
  
  // Parásito 2
  for (let i = 0; i < 4; i++) {
    setPixel(ctx, 16 + i, 16 + Math.sin(i * 0.7) * 1.5, 255, 215, 0, 160);
  }
  
  // Partículas verdes adicionales
  drawCircle(ctx, 15, 14, 0.8, 34, 139, 34, 140);
  drawCircle(ctx, 17, 18, 0.6, 34, 139, 34, 120);
  
  // Efecto de contaminación (manchas)
  drawCircle(ctx, 14, 20, 1.2, 0, 100, 0, 100);
  
  // Tapa
  drawRect(ctx, 11, 6, 10, 2, 139, 69, 19, 255); // Marrón
  
  saveTexture(canvas, 'infected_water.png');
}
```

### Paso 8: Generar Textura - Muestra de Parásito

```javascript
function generateParasiteSample() {
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, 32, 32);
  
  // Tubo de vidrio pequeño
  drawRect(ctx, 14, 8, 4, 12, 200, 200, 255, 150); // Vidrio
  drawRect(ctx, 13, 7, 6, 14, 150, 150, 200, 80);  // Sombra
  
  // Líquido con parásitos
  drawRect(ctx, 15, 10, 2, 8, 50, 205, 50, 180);
  
  // Parásitos en el líquido
  // Parásito grande
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
  
  // Etiqueta
  drawRect(ctx, 14, 19, 4, 1, 255, 0, 0, 255);
  
  saveTexture(canvas, 'parasite_sample.png');
}
```

### Paso 9: Generar Texturas de Comidas Infectadas

```javascript
// Función auxiliar para crear overlay de infección
function applyInfectionOverlay(ctx, baseColor) {
  // Overlay verde translúcido
  ctx.fillStyle = 'rgba(50, 205, 50, 0.3)';
  ctx.fillRect(0, 0, 32, 32);
  
  // Pequeños parásitos en la superficie
  for (let i = 0; i < 3; i++) {
    let x = 8 + Math.random() * 16;
    let y = 8 + Math.random() * 16;
    drawCircle(ctx, x, y, 0.8, 255, 215, 0, 120);
  }
  
  // Manchas de infección
  drawCircle(ctx, 12, 12, 2, 34, 139, 34, 80);
  drawCircle(ctx, 20, 18, 1.5, 34, 139, 34, 60);
}

function generateInfectedBread() {
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, 32, 32);
  
  // Pan base (marrón)
  drawRect(ctx, 6, 12, 20, 8, 139, 69, 19, 255);
  drawRect(ctx, 8, 10, 16, 12, 160, 82, 45, 255);
  
  // Textura del pan
  for (let i = 0; i < 20; i++) {
    let x = 8 + Math.random() * 16;
    let y = 11 + Math.random() * 10;
    setPixel(ctx, x, y, 101, 67, 33, 200);
  }
  
  // Aplicar overlay de infección
  applyInfectionOverlay(ctx, [139, 69, 19]);
  
  saveTexture(canvas, 'infected_bread.png');
}

function generateInfectedApple() {
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, 32, 32);
  
  // Manzana base (roja)
  drawCircle(ctx, 16, 16, 6, 220, 20, 60, 255);
  
  // Brillo de la manzana
  drawCircle(ctx, 14, 14, 2, 255, 100, 100, 150);
  
  // Tallo
  drawRect(ctx, 15, 8, 2, 4, 34, 139, 34, 255);
  
  // Aplicar overlay de infección
  applyInfectionOverlay(ctx, [220, 20, 60]);
  
  saveTexture(canvas, 'infected_apple.png');
}

function generateInfectedCookedBeef() {
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, 32, 32);
  
  // Carne cocida base (marrón rojiza)
  drawRect(ctx, 8, 10, 16, 12, 165, 42, 42, 255);
  
  // Textura de la carne
  for (let i = 0; i < 15; i++) {
    let x = 9 + Math.random() * 14;
    let y = 11 + Math.random() * 10;
    setPixel(ctx, x, y, 139, 0, 0, 180);
  }
  
  // Grasa/jugo
  drawRect(ctx, 12, 14, 8, 2, 255, 218, 185, 150);
  
  // Aplicar overlay de infección
  applyInfectionOverlay(ctx, [165, 42, 42]);
  
  saveTexture(canvas, 'infected_cooked_beef.png');
}

function generateInfectedCookedChicken() {
  const canvas = createTextureCanvas();
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, 32, 32);
  
  // Pollo cocido base (beige)
  drawRect(ctx, 6, 12, 20, 8, 255, 218, 185, 255);
  drawRect(ctx, 8, 10, 16, 12, 245, 222, 179, 255);
  
  // Textura del pollo
  for (let i = 0; i < 18; i++) {
    let x = 8 + Math.random() * 16;
    let y = 11 + Math.random() * 10;
    setPixel(ctx, x, y, 210, 180, 140, 200);
  }
  
  // Aplicar overlay de infección
  applyInfectionOverlay(ctx, [255, 218, 185]);
  
  saveTexture(canvas, 'infected_cooked_chicken.png');
}
```

### Paso 10: Ejecutar Generación Completa

```javascript
// Añadir al final del script
console.log('🚀 Generando todas las texturas...');

// Generar todas las texturas
generateTurbidWater();
generateClearWater();
generateInfectedWater();
generateParasiteSample();
generateInfectedBread();
generateInfectedApple();
generateInfectedCookedBeef();
generateInfectedCookedChicken();

console.log('✅ ¡Todas las texturas generadas exitosamente!');
console.log('📁 Archivos guardados en: output/textures/items/');
```

### Paso 11: Ejecutar el Script

```bash
# Ejecutar el generador
node texture_generator.js
```

### Paso 12: Verificar y Copiar Texturas

```bash
# Verificar que se crearon todos los archivos
ls -la output/textures/items/

# Copiar al proyecto NeiroBetterTools
cp output/textures/items/*.png /ruta/a/tu/proyecto/resource_packs/NeiroBetterTools_RP/textures/items/
```

---

## 🎯 RESULTADO ESPERADO

Después de ejecutar el script, deberías tener 8 archivos PNG de 32x32 píxeles:

```
output/textures/items/
├── turbid_water.png       ✅ Agua marrón turbia
├── clear_water.png        ✅ Agua azul cristalina  
├── infected_water.png     ✅ Agua verde con parásitos
├── parasite_sample.png    ✅ Tubo con parásitos
├── infected_bread.png     ✅ Pan con overlay verde
├── infected_apple.png     ✅ Manzana con manchas verdes
├── infected_cooked_beef.png    ✅ Carne con infección
└── infected_cooked_chicken.png ✅ Pollo con infección
```

---

## 🔧 PERSONALIZACIÓN

### Cambiar Colores:
```javascript
// En las funciones de generación, modificar los valores RGB:
// drawRect(ctx, x, y, w, h, R, G, B, A);
```

### Añadir Más Detalles:
```javascript
// Añadir más círculos, rectángulos o píxeles individuales
// Usar bucles for para patrones repetitivos
```

### Cambiar Tamaño:
```javascript
// Para texturas 16x16 (si es necesario):
const canvas = createCanvas(16, 16);
```

---

## 📋 CHECKLIST FINAL

- [ ] Crear proyecto Node.js en Replit
- [ ] Instalar dependencias (canvas, fs-extra, path)
- [ ] Crear estructura de carpetas
- [ ] Copiar código del generador
- [ ] Ejecutar script
- [ ] Verificar archivos generados
- [ ] Copiar texturas al proyecto principal
- [ ] Probar en Minecraft

---

## 🚀 ¡LISTO PARA USAR!

Una vez generadas las texturas, cópialas a:
`/resource_packs/NeiroBetterTools_RP/textures/items/`

¡El sistema de parásitos estará completo con texturas visuales!