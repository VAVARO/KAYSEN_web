import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const srcDataDir = path.join(rootDir, 'src', 'data');

if (!fs.existsSync(srcDataDir)) {
  fs.mkdirSync(srcDataDir, { recursive: true });
}

// File paths
const pathMainReport = path.join(rootDir, 'INFORME CIERRE FASE 1 PROY KAYSEN.docx.md');
const pathCuanti = path.join(rootDir, 'consolidado_cuantitativo_kaysen_v2.md');
const pathCuali = path.join(rootDir, 'consolidado_cualitativo_kaysenv2.md');

console.log('Reading source files...');
const mainReportText = fs.readFileSync(pathMainReport, 'utf8');
const cuantiText = fs.readFileSync(pathCuanti, 'utf8');
const cualiText = fs.readFileSync(pathCuali, 'utf8');

// -------------------------------------------------------------
// 1. PARSE MAIN REPORT
// -------------------------------------------------------------
function parseMainReport(text) {
  const kpis = {
    asistentes: 1184,
    actividadesTotales: 44,
    organizaciones: 21,
    actoresClave: 95,
    promedioBeneficio: 6.36,
    promedioConstructor: 6.02,
    promedioGeneral: 6.46
  };

  const sections = {};
  const sectionHeadings = [
    { key: 'sec1', title: 'I. Introducción', regex: /## \*\*I\. Introducción\*\*([\s\S]*?)(?=## \*\*II\.|$)/ },
    { key: 'sec2', title: 'II. Objetivos del Programa', regex: /## \*\*II\. Objetivos del Programa\*\*([\s\S]*?)(?=## \*\*III\.|$)/ },
    { key: 'sec3', title: 'III. Marco Teórico', regex: /## \*\*III\. Marco Teórico\*\*([\s\S]*?)(?=## \*\*IV\.|$)/ },
    { key: 'sec4', title: 'IV. Metodología', regex: /## \*\*IV\. Metodología\*\*([\s\S]*?)(?=## \*\*V\.|$)/ },
    { key: 'sec5', title: 'V. Organizaciones con las que hemos trabajado', regex: /## \*\*V\. Organizaciones con las que hemos trabajado\*\*([\s\S]*?)(?=## \*\*VI\.|$)/ },
    { key: 'sec6', title: 'VI. Principales Resultados', regex: /## \*\*VI\. Principales Resultados\*\*([\s\S]*?)(?=## \*\*VII\.|$)/ },
    { key: 'sec7', title: 'VII. Logros', regex: /## \*\*VII\. Logros\*\*([\s\S]*?)(?=## \*\*VIII\.|$)/ },
    { key: 'sec8', title: 'VIII. Quiebres', regex: /## \*\*VIII\. Quiebres\*\*([\s\S]*?)(?=## \*\*IX\.|$)/ },
    { key: 'sec9', title: 'IX. Propuesta de Interpretación para el futuro', regex: /## \*\*IX\. Propuesta de Interpretación para el futuro\*\*([\s\S]*?)(?=## |### Anexos|$)/ }
  ];

  sectionHeadings.forEach(s => {
    const match = text.match(s.regex);
    sections[s.key] = {
      title: s.title,
      content: match ? match[1].trim() : ''
    };
  });

  // Parse Projects Table
  const projects = [];
  const projectsMatch = text.match(/### Listado de Proyectos KAYSEN y su Estado[\s\S]*?\| Proyecto \| Estado \| Comentario \|[\s\S]*?\n([\s\S]*?)(?=\n###|\n\n###|$)/);
  if (projectsMatch) {
    const lines = projectsMatch[1].split('\n');
    lines.forEach(line => {
      const parts = line.split('|').map(p => p.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (parts.length >= 3 && !parts[0].startsWith(':--') && !parts[0].startsWith('---')) {
        const name = parts[0];
        const status = parts[1];
        const comment = parts[2];
        if (name && status) {
          projects.push({ name, status, comment });
        }
      }
    });
  }

  // Parse Actores Tocados Table
  const actors = [];
  const actorsMatch = text.match(/### Personas “tocadas” por KAYSEN[\s\S]*?\| Sector Macro \| Organización \/ Institución \| Persona\(s\) "Tocada\(s\)" y Detalle \/ Cargo \|[\s\S]*?\n([\s\S]*?)(?=\n\n|\n[^|]|$)/);
  if (actorsMatch) {
    const lines = actorsMatch[1].split('\n');
    let currentSector = '';
    lines.forEach(line => {
      const parts = line.split('|').map(p => p.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (parts.length >= 3 && !parts[0].startsWith(':--')) {
        if (parts[0]) currentSector = parts[0].replace(/\*\*/g, '');
        const institution = parts[1].replace(/\*\*/g, '');
        let rawPeople = parts[2];
        
        rawPeople = rawPeople.replace(/\)\s+([A-Z][a-z]+\s+[A-Z][a-z]+)\s+\(/g, ') • **$1** (');
        
        const peopleList = rawPeople.split(/•\s*/).filter(p => p.trim().length > 0);
        peopleList.forEach(p => {
          const cleanP = p.trim();
          const nameMatch = cleanP.match(/\*\*(.*?)\*\*(?:\s*\*\((.*?)\*\*)?/);
          let name = cleanP;
          let role = '';
          if (nameMatch) {
            name = nameMatch[1];
            role = nameMatch[2] || '';
          } else {
            const altMatch = cleanP.match(/(.*?)\s*\*\((.*?)\*\*/);
            if (altMatch) {
              name = altMatch[1].replace(/\*/g, '').trim();
              role = altMatch[2].trim();
            }
          }
          actors.push({
            id: `actor-${actors.length + 1}`,
            sector: currentSector,
            institution: institution,
            name: name.replace(/\*/g, '').trim(),
            role: role.replace(/\*/g, '').trim(),
            rawText: cleanP
          });
        });
      }
    });
  }

  // Parse Global Moods Table
  const globalMoods = [];
  const moodsMatch = text.match(/### Tabla de Frecuencia Global de Estados de Ánimo[\s\S]*?\| Estado de Ánimo \| Frecuencia Total \| % del Total de Menciones \|[\s\S]*?\n([\s\S]*?)(?=\n###|\n\n###|$)/);
  if (moodsMatch) {
    const lines = moodsMatch[1].split('\n');
    lines.forEach(line => {
      const parts = line.split('|').map(p => p.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (parts.length >= 3 && !parts[0].startsWith(':--')) {
        const mood = parts[0];
        const count = parseInt(parts[1], 10);
        const percentage = parts[2];
        if (mood && !isNaN(count)) {
          globalMoods.push({ mood, count, percentage });
        }
      }
    });
  }

  // Parse Un-evaluated activities list
  const unEvaluatedActivities = [];
  const unEvalMatch = text.match(/### Otras Actividades KAYSEN sin Evaluación[\s\S]*?\n\n([\s\S]*?)(?=\n###|\n\n###|$)/);
  if (unEvalMatch) {
    const lines = unEvalMatch[1].split('\n');
    lines.forEach(l => {
      const trimmed = l.replace(/^\*\s*/, '').trim();
      if (trimmed) unEvaluatedActivities.push(trimmed);
    });
  }

  return { kpis, sections, projects, actors, globalMoods, unEvaluatedActivities };
}

// -------------------------------------------------------------
// 2. PARSE QUANTITATIVE DATA (consolidado_cuantitativo_kaysen_v2.md)
// -------------------------------------------------------------
function parseQuantitative(text) {
  const activities = [];
  const blocks = text.split(/\n###\s+/);
  
  blocks.forEach(block => {
    const lines = block.split('\n');
    const header = lines[0].trim();
    
    if (header.includes('Consolidado Final') || header.includes('Tabla de Frecuencia Global') || header.includes('Tabla Comparativa') || header.includes('Conclusiones Cualitativas') || header.startsWith('1. Procesamiento')) {
      return;
    }
    
    const actName = header;
    let dateStr = '';
    let nEvaluations = 0;
    let generalScore = 'N/A';
    let benefitScore = 'N/A';
    let constructorScore = 'N/A';
    const moods = [];
    
    lines.forEach(line => {
      if (line.includes('Fecha / Metadata identificada:')) {
        dateStr = line.split(':')[1].replace(/\*/g, '').trim();
      } else if (line.includes('N° de Evaluaciones Recibidas:')) {
        nEvaluations = parseInt(line.split(':')[1].replace(/\*/g, '').trim(), 10) || 0;
      } else if (line.includes('Evaluación General:')) {
        generalScore = line.split(':')[1].replace(/\*/g, '').trim();
      } else if (line.includes('Beneficios Obtenidos:')) {
        benefitScore = line.split(':')[1].replace(/\*/g, '').trim();
      } else if (line.includes('Rol como Constructor:')) {
        constructorScore = line.split(':')[1].replace(/\*/g, '').trim();
      }
    });

    const moodTableMatch = block.match(/\| Estado de Ánimo \| Frecuencia \| % del Total \|[\s\S]*?\n([\s\S]*?)(?=\n\s*\*|\n\n|\n---|$)/);
    if (moodTableMatch) {
      const moodLines = moodTableMatch[1].split('\n');
      moodLines.forEach(l => {
        const parts = l.split('|').map(p => p.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (parts.length >= 3 && !parts[0].startsWith(':--')) {
          const mood = parts[0];
          const count = parseInt(parts[1], 10);
          const pct = parts[2];
          if (mood && !isNaN(count)) {
            moods.push({ mood, count, percentage: pct });
          }
        }
      });
    }

    let year = 2025;
    const yearMatch = dateStr.match(/202\d/) || actName.match(/202\d/);
    if (yearMatch) {
      year = parseInt(yearMatch[0], 10);
    }

    let sector = 'Otro';
    const lower = actName.toLowerCase();
    if (lower.includes('gendarmería') || lower.includes('gore') || lower.includes('cesfam') || lower.includes('servicio de salud') || lower.includes('hospital') || lower.includes('municipalidad')) {
      sector = 'Sector Público';
    } else if (lower.includes('ciep') || lower.includes('cft') || lower.includes('liceo') || lower.includes('pace') || lower.includes('dirigentes')) {
      sector = 'Sociedad Civil / Academia';
    } else if (lower.includes('negocios') || lower.includes('cena') || lower.includes('viaje')) {
      sector = 'Sector Privado / Comunidad';
    }

    if (actName && (nEvaluations > 0 || benefitScore !== 'N/A' || constructorScore !== 'N/A')) {
      activities.push({
        id: actName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: actName,
        date: dateStr,
        year: year,
        sector: sector,
        nEvaluations,
        generalScore,
        benefitScore,
        constructorScore,
        moods
      });
    }
  });

  return activities;
}

// -------------------------------------------------------------
// 3. PARSE QUALITATIVE QUOTES (consolidado_cualitativo_kaysenv2.md)
// -------------------------------------------------------------
function parseQualitative(text) {
  const quotes = [];
  const top15Quotes = [];

  // Parse Top 15 Table
  const top15Match = text.match(/### Top 15 de Citas con Mayor Impacto Emocional de la Fase 1[\s\S]*?\| Taller de Origen \| Categoría de Pregunta \| Cita Destacada \(Literal\) \| Puntaje Emocional \|[\s\S]*?\n([\s\S]*?)(?=\n###|\n\n###|$)/);
  if (top15Match) {
    const lines = top15Match[1].split('\n');
    lines.forEach((line, idx) => {
      const parts = line.split('|').map(p => p.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (parts.length >= 4 && !parts[0].startsWith(':--')) {
        top15Quotes.push({
          rank: idx + 1,
          activity: parts[0],
          category: parts[1],
          text: parts[2].replace(/^"/, '').replace(/"$/, ''),
          score: parseFloat(parts[3]) || 0
        });
      }
    });
  }

  // Parse activity quote sections
  const activityBlocks = text.split(/\n### Actividad:\s+/);

  activityBlocks.forEach(block => {
    if (!block.trim() || block.startsWith('# Reporte')) return;
    
    const lines = block.split('\n');
    const activityName = lines[0].trim();
    
    const categoryBlocks = block.split(/\n#### Categoría:\s+/);
    
    categoryBlocks.forEach((catBlock, idx) => {
      if (idx === 0) return;
      
      const catLines = catBlock.split('\n');
      const categoryName = catLines[0].trim();
      
      catLines.forEach(line => {
        if (line.includes('|') && !line.includes('Cita Destacada') && !line.includes(':--')) {
          const parts = line.split('|').map(p => p.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
          if (parts.length >= 3) {
            const indexCol = parts[0].replace('\\', '').trim();
            if (!isNaN(parseInt(indexCol, 10))) {
              const rawQuote = parts[1].replace(/^"/, '').replace(/"$/, '');
              const score = parseFloat(parts[2]) || 0;
              if (rawQuote && rawQuote !== 'N/A') {
                quotes.push({
                  id: `q-${quotes.length + 1}`,
                  activity: activityName,
                  category: categoryName,
                  text: rawQuote,
                  score: score
                });
              }
            }
          }
        }
      });
    });
  });

  return { quotes, top15Quotes };
}

// Run processing
console.log('Parsing main report data...');
const mainReportData = parseMainReport(mainReportText);

console.log('Parsing quantitative activities data...');
const activitiesData = parseQuantitative(cuantiText);

console.log('Parsing qualitative quotes data...');
const qualitativeData = parseQualitative(cualiText);

console.log('Writing JSON artifacts to src/data/...');
fs.writeFileSync(path.join(srcDataDir, 'report.json'), JSON.stringify(mainReportData, null, 2));
fs.writeFileSync(path.join(srcDataDir, 'activities.json'), JSON.stringify(activitiesData, null, 2));
fs.writeFileSync(path.join(srcDataDir, 'quotes.json'), JSON.stringify(qualitativeData.quotes, null, 2));
fs.writeFileSync(path.join(srcDataDir, 'top15_quotes.json'), JSON.stringify(qualitativeData.top15Quotes, null, 2));
fs.writeFileSync(path.join(srcDataDir, 'actors.json'), JSON.stringify(mainReportData.actors, null, 2));
fs.writeFileSync(path.join(srcDataDir, 'projects.json'), JSON.stringify(mainReportData.projects, null, 2));
fs.writeFileSync(path.join(srcDataDir, 'moods.json'), JSON.stringify(mainReportData.globalMoods, null, 2));

console.log(`\nSuccessfully processed data!`);
console.log(`- KPIs & Sections parsed: ${Object.keys(mainReportData.sections).length} sections`);
console.log(`- Evaluated Activities parsed: ${activitiesData.length}`);
console.log(`- Total Qualitative Quotes parsed: ${qualitativeData.quotes.length}`);
console.log(`- Top 15 Quotes parsed: ${qualitativeData.top15Quotes.length}`);
console.log(`- Total Actores Tocados parsed: ${mainReportData.actors.length}`);
console.log(`- Total Projects parsed: ${mainReportData.projects.length}`);
console.log(`- Global Moods parsed: ${mainReportData.globalMoods.length}`);
