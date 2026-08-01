import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distAssetsDir = path.join(distDir, 'assets');
const rootAssetsDir = path.join(rootDir, 'assets');

console.log('Copying dist files to root directory for GitHub Pages root deployment...');

// 1. Copy dist/assets to root assets/
if (fs.existsSync(distAssetsDir)) {
  if (!fs.existsSync(rootAssetsDir)) {
    fs.mkdirSync(rootAssetsDir, { recursive: true });
  }
  
  const files = fs.readdirSync(distAssetsDir);
  files.forEach(file => {
    const srcFile = path.join(distAssetsDir, file);
    const destFile = path.join(rootAssetsDir, file);
    fs.copyFileSync(srcFile, destFile);
    console.log(`- Copied assets/${file}`);
  });
}

// 2. Copy dist/index.html to root index.html
const distIndex = path.join(distDir, 'index.html');
const rootIndex = path.join(rootDir, 'index.html');

if (fs.existsSync(distIndex)) {
  fs.copyFileSync(distIndex, rootIndex);
  console.log('- Copied dist/index.html to root index.html');
}

console.log('Successfully updated root files for GitHub Pages deployment!');
