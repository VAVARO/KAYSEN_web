import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const viteCache = path.join(rootDir, 'node_modules', '.vite');
const distDir = path.join(rootDir, 'dist');
const rootAssetsDir = path.join(rootDir, 'assets');
const rootIndex = path.join(rootDir, 'index.html');

console.log('Cleaning build cache and resetting entry point...');

if (fs.existsSync(viteCache)) {
  fs.rmSync(viteCache, { recursive: true, force: true });
  console.log('- Removed node_modules/.vite cache');
}

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
  console.log('- Removed dist directory');
}

if (fs.existsSync(rootAssetsDir)) {
  fs.rmSync(rootAssetsDir, { recursive: true, force: true });
  console.log('- Removed old root assets directory');
}

// Reset root index.html to source main.jsx
const sourceIndexHtml = `<!DOCTYPE html>
<html lang="es" class="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KAYSEN: Informe de Cierre Fase 1</title>
    <!-- Google Fonts: EB Garamond (Serif) & Libre Franklin (Sans) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Libre+Franklin:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-background text-on-surface font-sans antialiased selection:bg-primary selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

fs.writeFileSync(rootIndex, sourceIndexHtml, 'utf8');
console.log('- Reset root index.html to point to /src/main.jsx');

console.log('Clean completed successfully!');
