import React from 'react';
import { Table, TrendingUp, CalendarX, FileSpreadsheet } from 'lucide-react';
import reportData from '../data/report.json';

export default function AnnexesSection() {
  const { globalMoods, unEvaluatedActivities } = reportData;

  return (
    <section id="annexes" className="mb-16 scroll-mt-24 space-y-12">
      
      {/* Section Header */}
      <div className="bg-white rounded-xl border border-surface-variant p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 border-l-4 border-primary pl-4 py-1 mb-6">
          <FileSpreadsheet className="w-7 h-7 text-primary" />
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Anexos & Consolidado Estadístico
            </span>
            <h2 className="font-serif text-3xl font-bold text-on-surface">
              Anexos Cuantitativos y Registro Complementario
            </h2>
          </div>
        </div>

        {/* Pearson Correlation Card */}
        <div className="bg-gradient-to-r from-primary/5 via-surface-container-low to-white p-6 rounded-xl border border-primary/20 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Análisis Estadístico de Asociación</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-on-surface">
              Correlación Positiva Alta entre Co-creación y Beneficio
            </h3>
            <p className="text-xs text-secondary max-w-2xl leading-relaxed">
              El análisis de las 314 evaluaciones individuales pareadas revela un coeficiente de correlación de Pearson de <strong className="text-primary font-serif text-base">r = 0.66</strong>. A mayor involucramiento activo de las personas como "constructores" del espacio, mayor es el beneficio personal percibido.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-surface-variant text-center shrink-0 shadow-sm">
            <span className="text-xs text-secondary font-semibold block">Coeficiente de Pearson</span>
            <span className="font-serif text-4xl font-bold text-primary">r = 0.66</span>
            <span className="text-[11px] text-emerald-700 font-bold block mt-1">Asociación Positiva Moderada-Alta</span>
          </div>
        </div>

        {/* Global Moods Table */}
        <div className="mb-10">
          <h3 className="font-serif text-2xl font-bold text-on-surface mb-3 flex items-center gap-2">
            <Table className="w-5 h-5 text-primary" />
            Tabla de Frecuencia Global de Estados de Ánimo (39 Categorías)
          </h3>
          <p className="text-xs text-secondary mb-4">
            Total de menciones acumuladas en la totalidad de encuestas procesadas durante la Fase 1.
          </p>

          <div className="overflow-x-auto rounded-lg border border-surface-variant">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-surface-container-high border-b border-surface-variant text-xs font-bold text-secondary uppercase tracking-wider">
                  <th className="p-3">Estado de Ánimo</th>
                  <th className="p-3">Frecuencia Total</th>
                  <th className="p-3">% del Total de Menciones</th>
                  <th className="p-3 w-1/3">Distribución Visual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {globalMoods.map((m, idx) => {
                  const pctNum = parseFloat(m.percentage) || 0;
                  return (
                    <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                      <td className="p-3 font-semibold text-on-surface">
                        {m.mood}
                      </td>
                      <td className="p-3 font-bold text-primary">
                        {m.count}
                      </td>
                      <td className="p-3 font-medium text-secondary">
                        {m.percentage}
                      </td>
                      <td className="p-3">
                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{ width: `${Math.min(pctNum * 5, 100)}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Un-evaluated Activities */}
        <div>
          <h3 className="font-serif text-2xl font-bold text-on-surface mb-3 flex items-center gap-2">
            <CalendarX className="w-5 h-5 text-primary" />
            Otras Actividades KAYSEN de Difusión y Articulación sin Evaluación Escrita ({unEvaluatedActivities.length})
          </h3>
          <p className="text-xs text-secondary mb-4">
            Instancias territoriales, conversatorios informales, ferias y asesorías ejecutadas durante el periodo 2022-2026.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {unEvaluatedActivities.map((act, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-surface-variant bg-surface-container-low text-xs font-semibold text-on-surface flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span>{act}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
