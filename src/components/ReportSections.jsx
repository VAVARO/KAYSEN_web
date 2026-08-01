import React, { useState, useRef } from 'react';
import { BookOpen, Target, Brain, Wrench, Building, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import reportData from '../data/report.json';

export default function ReportSections() {
  const [activeTab, setActiveTab] = useState('contexto');
  const scrollContainerRef = useRef(null);
  const { sections } = reportData;

  const tabs = [
    { id: 'contexto', label: 'I. Introducción y Contexto', icon: BookOpen },
    { id: 'objetivos', label: 'II. Objetivos del Programa', icon: Target },
    { id: 'marco', label: 'III. Marco Teórico', icon: Brain },
    { id: 'metodologia', label: 'IV. Metodología & Redes', icon: Wrench },
    { id: 'organizaciones', label: 'V. Organizaciones (21)', icon: Building },
    { id: 'resultados', label: 'VI. Principales Resultados', icon: TrendingUp },
  ];

  const theoreticalFramework = [
    {
      title: 'Biología del Conocer',
      authors: 'Humberto Maturana & Francisco Varela',
      description: 'El ser humano como sistema determinado en su estructura, que existe en el lenguaje y emocionar. La autopoiesis y la clausura operacional aplicadas al entendimiento del tejido social.',
      tag: 'Paradigma Central'
    },
    {
      title: 'Constructivismo Radical Radical',
      authors: 'Epistemología & Paradigma',
      description: 'El conocimiento no se traslada pasivamente sino que es construido activamente por el sujeto. Las soluciones no son impuestas, sino co-creadas desde la propia experiencia territorial.',
      tag: 'Filosofía de Base'
    },
    {
      title: 'Teoría de Sistemas Complejos Dinámicos',
      authors: 'Ciencias de la Complejidad',
      description: 'Las comunidades e instituciones operan como sistemas no lineales con comportamientos emergentes. Los cambios sostenibles surgen de pequeños impulsos en puntos de apalancamiento.',
      tag: 'Modelo Sistémico'
    },
    {
      title: 'Sociotecnología',
      authors: 'Tecnologías para Capital Social',
      description: 'Diseño e implementación de dispositivos conversacionales estructurados ("Evaluando", "Coloquios", "Team Building") para fortalecer redes relacionales, confianza e identidad.',
      tag: 'Metodología Aplicada'
    },
    {
      title: 'Neurociencia y Neuroplasticidad',
      authors: 'Avances Neurocientíficos',
      description: 'Fundamentación del cambio de hábitos conversacionales y predisposiciones emocionales a través de la experiencia reflexiva compartida.',
      tag: 'Evidencia Científica'
    }
  ];

  const partnerOrgs = [
    'Gobierno Regional de Aysén',
    'Servicio de Salud de Aysén',
    'Universidad de Aysén',
    'Centro de Investigación en Estudios de la Patagonia (CIEP)',
    'Hospital Regional de Coyhaique',
    'CESFAM de Puerto Aysén',
    'Gendarmería Regional de Aysén',
    'CET de Valle Verde',
    'I. Municipalidad de Aysén',
    'Club de Leones de Coyhaique',
    'CECOSF de Ribera Sur, Puerto Aysén',
    'Organizaciones Sociales de Puerto Aysén',
    'Hospital de Puerto Aysén',
    'CFT Estatal de Aysén',
    'CorpAysén',
    'Liceo Politécnico de Puerto Aysén',
    'Liceo Pedro Aguirre Cerda de Islas Huichas',
    'Agrupación de Trabajadores Sociales de Puerto Aysén',
    'Red Pro Emprendimiento de la Región de Aysén',
    'Emporcha',
    'Centro de Medio Ambiente y Energía de SOFOFA'
  ];

  const scrollTabs = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="framework" className="mb-16 scroll-mt-24">
      <div className="bg-white rounded-xl border border-surface-variant shadow-sm overflow-hidden">
        
        {/* Navigation Tabs Header with Left/Right Chevrons & Gradient Overflow Mask */}
        <div className="relative border-b border-surface-variant bg-surface-container-low flex items-center">
          
          {/* Scroll Left Button */}
          <button
            onClick={() => scrollTabs('left')}
            className="z-10 p-2.5 text-secondary hover:text-primary hover:bg-white/80 border-r border-surface-variant/60 transition-colors bg-surface-container-low shrink-0"
            aria-label="Desplazar pestañas a la izquierda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex overflow-x-auto gap-2 p-2 scrollbar-none scroll-smooth relative"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-3 text-xs md:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-primary shadow-sm border border-surface-variant/80 font-bold'
                      : 'text-secondary hover:text-on-surface hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-secondary'}`} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Gradient Overflow Mask */}
          <div className="absolute right-10 top-0 bottom-0 w-12 bg-gradient-to-l from-surface-container-low via-surface-container-low/70 to-transparent pointer-events-none z-10" />

          {/* Scroll Right Button */}
          <button
            onClick={() => scrollTabs('right')}
            className="z-10 p-2.5 text-secondary hover:text-primary hover:bg-white/80 border-l border-surface-variant/60 transition-colors bg-surface-container-low shrink-0"
            aria-label="Desplazar pestañas a la derecha"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

        {/* Tab Contents */}
        <div className="p-6 md:p-10">
          
          {/* Contexto */}
          {activeTab === 'contexto' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-l-4 border-primary pl-4 py-1">
                <span className="text-xs font-bold text-primary tracking-widest uppercase">
                  Programa de Fortalecimiento del Capital Social
                </span>
                <h3 className="font-serif text-3xl font-bold text-on-surface mt-1">
                  Introducción y Diagnóstico Territorial
                </h3>
              </div>
              <p className="text-base text-on-surface/90 leading-relaxed font-sans">
                El Programa <strong className="text-primary font-serif">KAYSEN</strong>, resultado del codiseño y co-ejecución entre el Programa de Innovación y Sociotecnología del Departamento de Ingeniería Industrial de la Universidad de Chile y organizaciones del litoral de Aysén, se enfoca en el fortalecimiento del Capital Social y la promoción de una cultura de innovación.
              </p>
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-surface-container-low p-6 rounded-lg border border-surface-variant">
                  <h4 className="font-serif text-xl font-bold text-primary mb-2">Desafío del Capital Social</h4>
                  <p className="text-sm text-secondary leading-relaxed">
                    Dada la baja confianza interpersonal en Chile en comparación con otros países de la OCDE, el fortalecimiento de este aspecto es crítico para un desarrollo sustentable y sostenible en la comuna de Aysén.
                  </p>
                </div>
                <div className="bg-surface-container-low p-6 rounded-lg border border-surface-variant">
                  <h4 className="font-serif text-xl font-bold text-primary mb-2">Alcance del Programa</h4>
                  <p className="text-sm text-secondary leading-relaxed">
                    Desde su inicio en mayo de 2022, KAYSEN ha tenido un impacto positivo directo en más de 1.100 participantes de instituciones clave en Aysén, aplicando metodologías probadas de sociotecnología.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Objetivos */}
          {activeTab === 'objetivos' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-l-4 border-primary pl-4 py-1">
                <h3 className="font-serif text-3xl font-bold text-on-surface">
                  Objetivos Estratégicos del Programa
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {[
                  {
                    num: '01',
                    title: 'Fortalecer el Capital Social',
                    desc: 'Fortalecer el Capital Social de las organizaciones de mayor relevancia en la región y de la comunidad en general.'
                  },
                  {
                    num: '02',
                    title: 'Articular Actores Clave',
                    desc: 'Articular actores relevantes del territorio con entes nacionales e internacionales en pos de activar y/o potenciar proyectos de gran beneficio social para la comuna.'
                  },
                  {
                    num: '03',
                    title: 'Cultura de Innovación',
                    desc: 'Contribuir a generar una Cultura de Innovación en esas organizaciones, en sus directivos y funcionarios, y en toda la comunidad.'
                  },
                  {
                    num: '04',
                    title: 'Consciencia de Sí y de Mundo',
                    desc: 'Expandir Consciencia de Sí y de Mundo sobre las nuevas posibilidades que abre la ciencia y la tecnología en autoridades y líderes actuales y potenciales de Aysén.'
                  }
                ].map((obj) => (
                  <div key={obj.num} className="flex gap-4 p-5 rounded-lg border border-surface-variant bg-white hover:border-primary/40 transition-colors">
                    <span className="font-serif text-3xl font-bold text-primary/40">{obj.num}</span>
                    <div>
                      <h4 className="font-serif text-xl font-semibold text-primary mb-1">{obj.title}</h4>
                      <p className="text-sm text-secondary leading-relaxed">{obj.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Marco Teórico */}
          {activeTab === 'marco' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-l-4 border-primary pl-4 py-1">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Fundamentación Científica y Filosófica</span>
                <h3 className="font-serif text-3xl font-bold text-on-surface mt-1">
                  Marco Teórico & Epistemológico
                </h3>
              </div>
              
              <blockquote className="p-4 italic bg-surface-container-low border-l-4 border-primary text-secondary font-serif text-lg shadow-xs rounded-r-lg">
                "Sin Capital Social nada Florece" — Carlos Vignolo
              </blockquote>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {theoreticalFramework.map((item, idx) => (
                  <div key={idx} className="bg-surface-container-low p-6 rounded-lg border border-surface-variant hover:shadow-sm transition-shadow">
                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">
                      {item.tag}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-on-surface mt-3 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-secondary mb-3">{item.authors}</p>
                    <p className="text-xs text-on-surface/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metodología */}
          {activeTab === 'metodologia' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-l-4 border-primary pl-4 py-1">
                <h3 className="font-serif text-3xl font-bold text-on-surface">
                  Metodología de Intervención Sociotécnica
                </h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  'Conversatorios y Charlas de Apertura',
                  'Articulación Dinámica de Actores',
                  'Aprovechamiento de Sincronías',
                  'Activación y Potenciación de Proyectos',
                  'Talleres Prácticos de Capital Social',
                  'Diplomados de Habilidades Directivas',
                  'Coloquios de Construcción Social',
                  'Asesorías, Mentoring y Coaching'
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-surface-container-low border border-surface-variant flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-on-surface">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Organizaciones */}
          {activeTab === 'organizaciones' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-l-4 border-primary pl-4 py-1">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Ecosistema Territorial</span>
                <h3 className="font-serif text-3xl font-bold text-on-surface mt-1">
                  21 Organizaciones Integradas en Aysén
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {partnerOrgs.map((org, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg border border-surface-variant bg-white flex items-center gap-3 hover:border-primary/40 transition-colors">
                    <Building className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium text-on-surface">{org}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resultados */}
          {activeTab === 'resultados' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-l-4 border-primary pl-4 py-1">
                <h3 className="font-serif text-3xl font-bold text-on-surface">
                  Síntesis de Principales Resultados
                </h3>
              </div>
              <p className="text-sm text-on-surface/90 leading-relaxed">
                Desde 2022 a la fecha, se han llevado a cabo un total de <strong>44 actividades</strong> (incluyendo talleres, charlas y conversatorios). Los talleres evaluados cuantitativamente registran un promedio de <strong>6.36/7.0</strong> en beneficio individual y <strong>6.02/7.0</strong> en rol como constructor.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-surface-container-low p-5 rounded-lg border border-surface-variant">
                  <h4 className="font-serif text-lg font-bold text-primary mb-2">Talleres de Fortalecimiento</h4>
                  <p className="text-2xl font-serif font-bold text-on-surface mb-1">14 actividades</p>
                  <p className="text-xs text-secondary">379 Asistentes evaluados en instituciones públicas y comunitarias.</p>
                </div>
                <div className="bg-surface-container-low p-5 rounded-lg border border-surface-variant">
                  <h4 className="font-serif text-lg font-bold text-primary mb-2">Conversatorios</h4>
                  <p className="text-2xl font-serif font-bold text-on-surface mb-1">8 actividades</p>
                  <p className="text-xs text-secondary">80 Asistentes clave con autoridades regionales.</p>
                </div>
                <div className="bg-surface-container-low p-5 rounded-lg border border-surface-variant">
                  <h4 className="font-serif text-lg font-bold text-primary mb-2">Difusión & Eventos</h4>
                  <p className="text-2xl font-serif font-bold text-on-surface mb-1">22 actividades</p>
                  <p className="text-xs text-secondary">725 Asistentes en Ferias del Libro, Festivales de Ciencia y Cenas.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
