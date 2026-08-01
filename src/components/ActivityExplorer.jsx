import React, { useState, useMemo, useEffect } from 'react';
import { Search, Calendar, Star, Hammer, ChevronRight, PieChart, MessageSquare, X, ChevronLeft } from 'lucide-react';
import activitiesData from '../data/activities.json';
import quotesData from '../data/quotes.json';

export default function ActivityExplorer({ selectedItem }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  // Client-side Pagination: Max 8 activities per page
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Handle auto-opening item passed from global search
  useEffect(() => {
    if (selectedItem && selectedItem.name) {
      setSelectedActivity(selectedItem);
    }
  }, [selectedItem]);

  const years = ['all', 2022, 2023, 2024, 2025, 2026];
  const sectors = [
    'all',
    'Sector Público',
    'Sector Privado / Comunidad',
    'Sociedad Civil / Academia'
  ];

  // Filter activities
  const filteredActivities = useMemo(() => {
    return activitiesData.filter(act => {
      const matchesSearch = act.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            act.date.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = selectedYear === 'all' || act.year === Number(selectedYear);
      const matchesSector = selectedSector === 'all' || act.sector === selectedSector;
      return matchesSearch && matchesYear && matchesSector;
    });
  }, [searchQuery, selectedYear, selectedSector]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear, selectedSector]);

  const totalPages = Math.ceil(filteredActivities.length / pageSize) || 1;
  const paginatedActivities = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredActivities.slice(start, start + pageSize);
  }, [filteredActivities, currentPage, pageSize]);

  // Find quotes for selected activity modal
  const selectedActivityQuotes = useMemo(() => {
    if (!selectedActivity) return [];
    return quotesData.filter(q => 
      q.activity.toLowerCase().trim() === selectedActivity.name.toLowerCase().trim() ||
      selectedActivity.name.toLowerCase().includes(q.activity.toLowerCase()) ||
      q.activity.toLowerCase().includes(selectedActivity.name.toLowerCase())
    );
  }, [selectedActivity]);

  return (
    <section id="activities" className="mb-12">
      
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 bg-white p-6 rounded-xl border border-surface-variant shadow-sm">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            Evaluaciones Cuantitativas & Cualitativas
          </span>
          <h2 className="font-serif text-3xl font-bold text-on-surface mt-1">
            Explorador de Actividades Evaluadas ({filteredActivities.length})
          </h2>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar actividad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs md:text-sm bg-white border border-surface-variant rounded-lg focus:outline-none focus:border-primary w-44 sm:w-60"
            />
          </div>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 text-xs md:text-sm bg-white border border-surface-variant rounded-lg focus:outline-none focus:border-primary text-secondary font-semibold"
          >
            <option value="all">Todos los Años</option>
            {years.filter(y => y !== 'all').map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-3 py-2 text-xs md:text-sm bg-white border border-surface-variant rounded-lg focus:outline-none focus:border-primary text-secondary font-semibold"
          >
            <option value="all">Todos los Sectores</option>
            {sectors.filter(s => s !== 'all').map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Activities Grid (Paginated max 8) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedActivities.map((act) => {
          const benefitScoreNum = parseFloat(act.benefitScore) || 0;
          const constructorScoreNum = parseFloat(act.constructorScore) || 0;

          return (
            <div
              key={act.id}
              onClick={() => setSelectedActivity(act)}
              className="bg-white rounded-xl border border-surface-variant shadow-sm hover:shadow-md hover:border-primary/40 transition-all p-5 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full truncate max-w-[140px]">
                    {act.sector}
                  </span>
                  <span className="text-xs font-semibold text-secondary flex items-center gap-1 shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    {act.year}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-on-surface group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {act.name}
                </h3>

                <p className="text-xs text-secondary mb-4 flex items-center gap-1.5 flex-wrap">
                  <span>📅 {act.date}</span>
                  <span>•</span>
                  <span>👥 N={act.nEvaluations}</span>
                </p>

                {/* Score Meters */}
                <div className="space-y-2.5 pt-3 border-t border-surface-container">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-secondary flex items-center gap-1 text-[11px]">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        Beneficio
                      </span>
                      <span className="font-bold text-on-surface">{act.benefitScore}</span>
                    </div>
                    {act.benefitScore !== 'N/A' && (
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${(benefitScoreNum / 7) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-secondary flex items-center gap-1 text-[11px]">
                        <Hammer className="w-3.5 h-3.5 text-secondary" />
                        Constructor
                      </span>
                      <span className="font-bold text-on-surface">{act.constructorScore}</span>
                    </div>
                    {act.constructorScore !== 'N/A' && (
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-secondary h-full rounded-full"
                          style={{ width: `${(constructorScoreNum / 7) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                <span>Ver Detalle & Citas</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-surface-variant shadow-sm">
          <span className="text-xs font-medium text-secondary">
            Mostrando {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, filteredActivities.length)} de {filteredActivities.length} actividades
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-surface-variant text-secondary hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-8 h-8 text-xs font-bold rounded-lg transition-colors ${
                    currentPage === num
                      ? 'bg-primary text-white'
                      : 'text-secondary hover:bg-surface-container-low'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-surface-variant text-secondary hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {filteredActivities.length === 0 && (
        <div className="bg-white p-12 rounded-xl text-center border border-surface-variant">
          <p className="text-secondary">No se encontraron actividades con los filtros seleccionados.</p>
        </div>
      )}

      {/* Modal / Slide-over Drawer for Extended Activity Details */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-surface-variant w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-scaleUp">
            
            <div className="p-6 bg-surface-container-low border-b border-surface-variant flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full uppercase">
                  {selectedActivity.sector} — {selectedActivity.year}
                </span>
                <h3 className="font-serif text-2xl font-bold text-on-surface mt-2">
                  {selectedActivity.name}
                </h3>
                <p className="text-xs text-secondary mt-1">
                  Fecha: {selectedActivity.date} | Total Evaluaciones: N={selectedActivity.nEvaluations}
                </p>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="p-2 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-variant/50 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-8 flex-1">
              
              <div className="grid grid-cols-3 gap-4 bg-surface-container-lowest p-4 rounded-lg border border-surface-variant text-center">
                <div>
                  <span className="text-xs text-secondary font-medium block">Evaluación General</span>
                  <span className="font-serif text-2xl font-bold text-primary">{selectedActivity.generalScore}</span>
                </div>
                <div>
                  <span className="text-xs text-secondary font-medium block">Beneficios Obtenidos</span>
                  <span className="font-serif text-2xl font-bold text-primary">{selectedActivity.benefitScore}</span>
                </div>
                <div>
                  <span className="text-xs text-secondary font-medium block">Rol como Constructor</span>
                  <span className="font-serif text-2xl font-bold text-primary">{selectedActivity.constructorScore}</span>
                </div>
              </div>

              {selectedActivity.moods && selectedActivity.moods.length > 0 && (
                <div>
                  <h4 className="font-serif text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    Distribución de Estados de Ánimo Declarados
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedActivity.moods.map((m, idx) => (
                      <div key={idx} className="bg-surface-container-low p-2.5 rounded border border-surface-variant flex items-center justify-between text-xs">
                        <span className="font-semibold text-on-surface">{m.mood}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">{m.count} menciones</span>
                          <span className="text-secondary">({m.percentage})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-serif text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Citas Cualitativas ({selectedActivityQuotes.length})
                </h4>

                {selectedActivityQuotes.length > 0 ? (
                  <div className="space-y-3">
                    {selectedActivityQuotes.map((q) => (
                      <div key={q.id} className="p-4 rounded-lg border border-surface-variant bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-semibold text-secondary bg-surface-container-high px-2 py-0.5 rounded">
                            {q.category}
                          </span>
                          <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            Puntaje Emocional: {q.score}
                          </span>
                        </div>
                        <p className="text-sm text-on-surface leading-relaxed italic">
                          "{q.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-secondary italic">No se registraron citas adicionales para esta actividad.</p>
                )}
              </div>

            </div>

            <div className="p-4 bg-surface-container-low border-t border-surface-variant text-right">
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Cerrar Detalle
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
