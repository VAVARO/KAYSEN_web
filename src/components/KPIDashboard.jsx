import React from 'react';
import { Users, Calendar, Building2, UserCheck, Star, Hammer } from 'lucide-react';
import reportData from '../data/report.json';

export default function KPIDashboard() {
  const { kpis } = reportData;

  const cards = [
    {
      label: 'Asistentes e Impactados',
      value: kpis.asistentes.toLocaleString('es-CL'),
      suffix: 'personas',
      icon: Users,
      description: 'Asistencia acumulada en talleres, charlas y conversatorios.'
    },
    {
      label: 'Actividades Totales',
      value: kpis.actividadesTotales,
      suffix: 'instancias',
      icon: Calendar,
      description: '22 evaluadas cuantitativamente + 22 de articulación y difusión.'
    },
    {
      label: 'Organizaciones Vinc.',
      value: kpis.organizaciones,
      suffix: 'instituciones',
      icon: Building2,
      description: 'Instituciones públicas, privadas y de sociedad civil en Aysén.'
    },
    {
      label: 'Actores Clave Tocados',
      value: kpis.actoresClave,
      suffix: 'líderes',
      icon: UserCheck,
      description: 'Interacciones significativas con toma de decisión regional.'
    },
    {
      label: 'Beneficio Percibido',
      value: `${kpis.promedioBeneficio.toFixed(2)}`,
      suffix: '/ 7.0',
      icon: Star,
      description: 'Promedio ponderado de beneficio individual reportado.'
    },
    {
      label: 'Rol Constructor',
      value: `${kpis.promedioConstructor.toFixed(2)}`,
      suffix: '/ 7.0',
      icon: Hammer,
      description: 'Autoevaluación de co-creación en las jornadas.'
    }
  ];

  return (
    <section className="mb-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-lg border border-surface-variant shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                  {card.label}
                </span>
                <card.icon className="w-5 h-5 text-primary/70" />
              </div>
              <div className="flex items-baseline gap-1 my-1">
                <span className="font-serif text-3xl font-bold text-primary">
                  {card.value}
                </span>
                <span className="text-xs text-secondary font-medium">{card.suffix}</span>
              </div>
            </div>
            <p className="text-[11px] text-secondary/80 mt-2 pt-2 border-t border-surface-container leading-tight">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
