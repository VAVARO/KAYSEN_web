import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const assetsDir = path.join(rootDir, 'dist', 'assets');
const files = fs.readdirSync(assetsDir);

files.forEach(file => {
  if (file.endsWith('.js')) {
    const content = fs.readFileSync(path.join(assetsDir, file), 'utf8');
    console.log(`Checking ${file} (${content.length} bytes)...`);
    
    if (content.includes('Vignolo')) {
      console.log('-> FOUND "Vignolo" in ' + file);
    } else {
      console.log('-> NOT FOUND "Vignolo" in ' + file);
    }
    
    if (content.includes('Constructivismo Radical Radical')) {
      console.log('-> FOUND "Constructivismo Radical Radical" in ' + file);
    } else {
      console.log('-> NOT FOUND "Constructivismo Radical Radical" in ' + file);
    }
    
    if (content.includes('Álvaro Contreras Barrios')) {
      console.log('-> FOUND "Álvaro Contreras Barrios" in ' + file);
    } else {
      console.log('-> NOT FOUND "Álvaro Contreras Barrios" in ' + file);
    }
  }
});
