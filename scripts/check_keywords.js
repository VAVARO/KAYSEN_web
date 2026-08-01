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
    
    // Search for quote keywords
    const matchesMaturana = content.match(/Maturana/gi);
    const matchesGlasersfeld = content.match(/Glasersfeld/gi);
    const matchesConsolidados = content.match(/Consolidados/gi);
    const matchesVignolo = content.match(/Vignolo/gi);
    const matchesAlvaro = content.match(/Álvaro|Alvaro/gi);
    
    console.log(`Results for ${file}:`);
    console.log('- Maturana matches:', matchesMaturana ? matchesMaturana.length : 0);
    console.log('- Glasersfeld matches:', matchesGlasersfeld ? matchesGlasersfeld.length : 0);
    console.log('- Consolidados matches:', matchesConsolidados ? matchesConsolidados.length : 0);
    console.log('- Vignolo matches:', matchesVignolo ? matchesVignolo.length : 0);
    console.log('- Álvaro matches:', matchesAlvaro ? matchesAlvaro.length : 0);
  }
});
