import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const srcImage = path.join(rootDir, 'pisct.png', 'screen.png');

const publicDir = path.join(rootDir, 'public');
const srcAssetsDir = path.join(rootDir, 'src', 'assets');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (!fs.existsSync(srcAssetsDir)) {
  fs.mkdirSync(srcAssetsDir, { recursive: true });
}

if (fs.existsSync(srcImage)) {
  fs.copyFileSync(srcImage, path.join(publicDir, 'pisct.png'));
  fs.copyFileSync(srcImage, path.join(srcAssetsDir, 'pisct.png'));
  console.log('pisct.png copied to public/pisct.png and src/assets/pisct.png!');
} else {
  console.log('Error: pisct.png source image not found at', srcImage);
}
