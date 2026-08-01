import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (stat.isFile() && (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.html') || file.endsWith('.md'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('Glasersfeld')) {
        console.log('Glasersfeld found in:', fullPath);
      }
      if (content.includes('Consolidados oficiales')) {
        console.log('Consolidados oficiales found in:', fullPath);
      }
      if (content.includes('Vignolo')) {
        console.log('Vignolo found in:', fullPath);
      }
    }
  }
}

console.log('Searching all files in repo...');
searchDir(rootDir);
console.log('Done search!');
