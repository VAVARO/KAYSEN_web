import React from 'react';
import { Award, AlertTriangle, Compass, CheckCircle, HelpCircle, Lightbulb } from 'lucide-react';
import reportData from '../data/report.json';

export default function LogrosQuiebresFuturo() {
  const { sections } = reportData;

  const logrosList = [
    {
      title: 'Vinculación de Alta Calidad y Diversidad',
      desc: 'Notable cantidad de organizaciones de distinta naturaleza con las que KAYSEN ha realizado actividades. La vinculación no fue forzada, sino a través de la exploración de posibilidades y el uso estratégico de sincronías relacionales.'
    },
    {
      title: 'Activación de Actores Estratégicos',
      desc: 'Detección e interacción significativa con 96 actores clave con poder e influencia real sobre el desarrollo regional, modificando predisposiciones y alineando visiones sobre Capital Social.'
    },
    {
      title: 'Diagnóstico de Sociopatologías Locales',
      desc: 'Comprensión vivencial de inhibidores culturales regionales: invisibilización de posibilidades, desconfianza inter-organizacional, chaqueteo, falta de seriedad en compromisos no formalizados y pensamiento de funcionario público.'
    },
    {
      title: 'Aumento Sustantivo del Capital Social',
      desc: 'Maduración del proyecto y posicionamiento del concepto de Capital Social en altos niveles de decisión (Estrategia de Desarrollo Productivo Sostenible, Transforma Litoral GORE-CORFO).'
    }
  ];

  const quiebresList = [
    {
      title: 'Formalidad y Continuidad ("El Papel Vale")',
      desc: 'Los procesos sigueron caminos discretos sin visualización clara de continuidad por parte de las contrapartes. En Aysén la palabra informal suele no sostenerse; la falta de convenios o licitaciones formales actúa como freno.'
    },
    {
      title: 'Conservadurismo del Sector Público',
      desc: 'Las restricciones normativas recientes restringen el margen de acción de directivos públicos, conduciendo a comportamientos muy conservadores y reticencia a institucionalizar proyectos sin marcos formales.'
    },
    {
      title: 'Necesidad de Investigación Cultural Previa',
      desc: 'Aunque KAYSEN opera bajo el "aprender haciendo", mayor investigación previa sobre la historia social y cultural aysenina hubiese facilitado la navegación inicial del territorio.'
    },
    {
      title: 'Gestión de Expectativas & Efecto Goldilocks',
      desc: 'Sobreestimación recurrente de la capacidad/interés de ciertos actores. Las propuestas demasiado masivas o "voladas" sufren el Efecto Goldilocks: son desechadas de antemano por la mente por percibirse imposibles.'
    }
  ];

  const futuroList = [
    {
      title: 'Fortalecimiento de Seniority del Equipo',
      desc: 'Incorporar nominal o remotamente a profesionales y académicos de alto perfil (equipo C3S, U. de Chile) para dar respaldo de peso en conversaciones de alto nivel estratégico.'
    },
    {
      title: 'Presentar Propuestas Formales Tipo',
      desc: 'Entregar propuestas pre-estructuradas con un valor claro y "un papel de por medio" que reduzca la carga cognitiva de las instituciones y facilite la toma de decisiones presupuestarias.'
    },
    {
      title: 'Focalización en Proyectos de Alto Valor',
      desc: 'Concentrar recursos humanos diezmados en iniciativas prioritarias: Coloquio GORE / Transforma Litoral, validación de la Estrategia Productiva Sostenible y consolidación del caso CIEP.'
    }
  ];

  return (
    <section id="logros" className="mb-16 scroll-mt-24 space-y-12">
      
      {/* VII. Logros */}
      <div className="bg-white rounded-xl border border-surface-variant p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 border-l-4 border-emerald-600 pl-4 py-1 mb-6">
          <Award className="w-7 h-7 text-emerald-600" />
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              Sección VII del Informe
            </span>
            <h2 className="font-serif text-3xl font-bold text-on-surface">
              Logros Destacados de la Fase 1
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {logrosList.map((item, idx) => (
            <div key={idx} className="p-5 rounded-lg bg-emerald-50/50 border border-emerald-100">
              <h3 className="font-serif text-xl font-bold text-emerald-950 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                {item.title}
              </h3>
              <p className="text-xs text-emerald-900/80 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* VIII. Quiebres */}
      <div className="bg-white rounded-xl border border-surface-variant p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 border-l-4 border-amber-600 pl-4 py-1 mb-6">
          <AlertTriangle className="w-7 h-7 text-amber-600" />
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Sección VIII del Informe
            </span>
            <h2 className="font-serif text-3xl font-bold text-on-surface">
              Quiebres Generatrices
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {quiebresList.map((item, idx) => (
            <div key={idx} className="p-5 rounded-lg bg-amber-50/50 border border-amber-200/80">
              <h3 className="font-serif text-xl font-bold text-amber-950 mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                {item.title}
              </h3>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* IX. Propuesta Futuro */}
      <div className="bg-white rounded-xl border border-surface-variant p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 border-l-4 border-primary pl-4 py-1 mb-6">
          <Compass className="w-7 h-7 text-primary" />
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Sección IX del Informe
            </span>
            <h2 className="font-serif text-3xl font-bold text-on-surface">
              Propuesta de Interpretación para el Futuro
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {futuroList.map((item, idx) => (
            <div key={idx} className="p-5 rounded-lg bg-surface-container-low border border-surface-variant">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-serif font-bold text-lg flex items-center justify-center mb-3">
                {idx + 1}
              </div>
              <h3 className="font-serif text-xl font-bold text-on-surface mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
