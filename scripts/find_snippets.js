import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const assetsDir = path.join(rootDir, 'dist', 'assets');
const files = fs.readdirSync(assetsDir);
const jsFile = files.find(f => f.endsWith('.js'));

const jsPath = path.join(assetsDir, jsFile);
const content = fs.readFileSync(jsPath, 'utf8');

function findSnippet(term) {
  const idx = content.indexOf(term);
  if (idx !== -1) {
    console.log(`=== FOUND "${term}" at offset ${idx} ===`);
    console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 100)));
  } else {
    console.log(`=== NOT FOUND "${term}" ===`);
  }
}

findSnippet('Vignolo');
findSnippet('Constructivismo Radical Radical');
findSnippet('Álvaro Contreras Barrios');
