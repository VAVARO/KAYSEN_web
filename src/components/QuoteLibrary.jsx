import React, { useState, useMemo, useEffect } from 'react';
import { Search, Sparkles, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import quotesData from '../data/quotes.json';
import top15Data from '../data/top15_quotes.json';

export default function QuoteLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('score-desc');
  
  // Client-side Pagination: 10 quotes per page
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const categories = [
    { id: 'all', label: 'Todas las Citas' },
    { id: 'Balance del Taller', label: 'Balance del Taller' },
    { id: 'Nuevas Posibilidades Personales', label: 'Posibilidades Personales' },
    { id: 'Nuevas Posibilidades Institucionales', label: 'Posibilidades Institucionales' },
    { id: 'Preguntas de Cierre', label: 'Preguntas de Cierre' },
  ];

  // Filter & Sort quotes
  const processedQuotes = useMemo(() => {
    let result = quotesData.filter(q => {
      const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            q.activity.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'all' || 
                         q.category.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCat;
    });

    result.sort((a, b) => {
      if (sortBy === 'score-desc') return b.score - a.score;
      if (sortBy === 'score-asc') return a.score - b.score;
      if (sortBy === 'activity') return a.activity.localeCompare(b.activity);
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(processedQuotes.length / pageSize) || 1;
  const paginatedQuotes = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedQuotes.slice(start, start + pageSize);
  }, [processedQuotes, currentPage, pageSize]);

  return (
    <section id="quotes" className="mb-12">
      
      {/* Top 15 Highlight Section */}
      <div className="mb-10 bg-gradient-to-br from-white to-surface-container-low p-6 md:p-8 rounded-xl border border-surface-variant shadow-sm">
        <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest mb-1">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Máximo Impacto Emocional & Reflexivo</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-on-surface mb-2">
          Top 15 Citas Destacadas de la Fase 1
        </h2>
        <p className="text-sm text-secondary mb-6 max-w-3xl">
          Citas cualitativas con mayores puntajes de carga emocional extraídas directamente de las evaluaciones de los participantes.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {top15Data.map((item) => (
            <div key={item.rank} className="bg-white p-5 rounded-lg border border-surface-variant flex flex-col justify-between hover:border-primary/50 transition-colors shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center font-serif">
                    #{item.rank}
                  </span>
                  <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Puntaje: {item.score}
                  </span>
                </div>
                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                  {item.category}
                </p>
                <p className="text-xs text-on-surface italic leading-relaxed my-2 line-clamp-3">
                  "{item.text}"
                </p>
              </div>
              <p className="text-[11px] text-secondary font-medium mt-2 pt-2 border-t border-surface-container">
                📍 {item.activity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Repository Header */}
      <div className="bg-white p-6 rounded-xl border border-surface-variant shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-surface-variant pb-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Repositorio Textual Completo (Sin Omisiones)
            </span>
            <h2 className="font-serif text-3xl font-bold text-on-surface mt-1">
              Banco de Citas ({processedQuotes.length} de {quotesData.length})
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar en citas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs md:text-sm bg-white border border-surface-variant rounded-lg focus:outline-none focus:border-primary w-52 sm:w-64"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-white border border-surface-variant px-3 py-2 rounded-lg text-xs font-semibold text-secondary">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none text-secondary"
              >
                <option value="score-desc">Mayor Puntaje Emocional</option>
                <option value="score-asc">Menor Puntaje Emocional</option>
                <option value="activity">Por Actividad</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-container-low text-secondary border border-surface-variant hover:border-primary/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quotes Cards Grid (Paginated 10 per page) */}
      <div className="grid md:grid-cols-2 gap-4">
        {paginatedQuotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white rounded-xl border border-surface-variant p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold text-secondary bg-surface-container-high px-2.5 py-0.5 rounded">
                  {quote.category}
                </span>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  Puntaje: {quote.score}
                </span>
              </div>

              <div className="relative pl-3.5 border-l-2 border-primary/40 my-2">
                <p className="text-xs md:text-sm text-on-surface leading-relaxed italic">
                  "{quote.text}"
                </p>
              </div>
            </div>

            <p className="text-xs text-secondary font-medium mt-3 pt-2.5 border-t border-surface-container">
              📍 <strong className="text-on-surface">{quote.activity}</strong>
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Controls (10 quotes per page) */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-surface-variant shadow-sm">
          <span className="text-xs font-medium text-secondary">
            Mostrando {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, processedQuotes.length)} de {processedQuotes.length} citas
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-surface-variant text-secondary hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-bold text-on-surface px-3">
              Página {currentPage} de {totalPages}
            </span>

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

      {processedQuotes.length === 0 && (
        <div className="bg-white p-12 rounded-xl text-center border border-surface-variant">
          <p className="text-secondary">No se encontraron citas coincidentes.</p>
        </div>
      )}

    </section>
  );
}
