import React, { useState, useMemo, useEffect } from 'react';
import { Search, Users, FolderKanban, ShieldCheck, CheckCircle2, Clock, PauseCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import actorsData from '../data/actors.json';
import projectsData from '../data/projects.json';

export default function ActorsProjectsMatrix({ selectedItem }) {
  const [activeTab, setActiveTab] = useState('actors');
  const [actorSearch, setActorSearch] = useState('');
  const [actorSector, setActorSector] = useState('all');
  
  const [projectSearch, setProjectSearch] = useState('');
  const [projectStatus, setProjectStatus] = useState('all');

  // Client-side Pagination: 15 actors per page
  const [actorPage, setActorPage] = useState(1);
  const actorPageSize = 15;

  // Handle auto-focus from global search
  useEffect(() => {
    if (selectedItem) {
      if (selectedItem.sector) {
        setActiveTab('actors');
        setActorSearch(selectedItem.name);
      } else if (selectedItem.status) {
        setActiveTab('projects');
        setProjectSearch(selectedItem.name);
      }
    }
  }, [selectedItem]);

  const actorSectors = [
    'all',
    'Sector Público',
    'Sector Privado',
    'Sociedad Civil, Academia y Ciudadanía'
  ];

  const projectStatuses = [
    'all',
    'Activo',
    'En conversaciones',
    'En ejecución',
    'En pausa',
    'Cerrado'
  ];

  // Filter Actors
  const filteredActors = useMemo(() => {
    return actorsData.filter(a => {
      const matchSearch = a.name.toLowerCase().includes(actorSearch.toLowerCase()) ||
                          a.institution.toLowerCase().includes(actorSearch.toLowerCase()) ||
                          a.role.toLowerCase().includes(actorSearch.toLowerCase());
      const matchSector = actorSector === 'all' || a.sector.toLowerCase().includes(actorSector.toLowerCase());
      return matchSearch && matchSector;
    });
  }, [actorSearch, actorSector]);

  // Reset pagination on filter change
  useEffect(() => {
    setActorPage(1);
  }, [actorSearch, actorSector]);

  const totalActorPages = Math.ceil(filteredActors.length / actorPageSize) || 1;
  const paginatedActors = useMemo(() => {
    const start = (actorPage - 1) * actorPageSize;
    return filteredActors.slice(start, start + actorPageSize);
  }, [filteredActors, actorPage, actorPageSize]);

  // Filter Projects
  const filteredProjects = useMemo(() => {
    return projectsData.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
                          p.comment.toLowerCase().includes(projectSearch.toLowerCase());
      const matchStatus = projectStatus === 'all' || p.status.toLowerCase() === projectStatus.toLowerCase();
      return matchSearch && matchStatus;
    });
  }, [projectSearch, projectStatus]);

  const getStatusBadge = (status) => {
    const s = status.toLowerCase();
    if (s.includes('activo')) {
      return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: CheckCircle2 };
    }
    if (s.includes('conversaciones')) {
      return { bg: 'bg-sky-100 text-sky-800 border-sky-300', icon: Clock };
    }
    if (s.includes('ejecución') || s.includes('ejecucion')) {
      return { bg: 'bg-orange-100 text-orange-800 border-orange-300', icon: ShieldCheck };
    }
    if (s.includes('pausa') || s.includes('evaluaciones')) {
      return { bg: 'bg-amber-100 text-amber-800 border-amber-300', icon: PauseCircle };
    }
    return { bg: 'bg-slate-100 text-slate-700 border-slate-300', icon: XCircle };
  };

  return (
    <section id="matrix" className="mb-12">
      
      <div className="bg-white rounded-xl border border-surface-variant shadow-sm p-6 md:p-8">
        
        {/* Header Tabs Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-variant pb-6 mb-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Redes Territoriales & Iniciativas Catalizadas
            </span>
            <h2 className="font-serif text-3xl font-bold text-on-surface mt-1">
              Matriz de Actores Tocados & Proyectos KAYSEN
            </h2>
          </div>

          <div className="flex gap-2 bg-surface-container-low p-1.5 rounded-lg border border-surface-variant">
            <button
              onClick={() => setActiveTab('actors')}
              className={`px-5 py-2.5 text-xs font-semibold rounded-md transition-all flex items-center gap-2 ${
                activeTab === 'actors'
                  ? 'bg-white text-primary shadow-sm border border-surface-variant'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Actores Tocados ({actorsData.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-2.5 text-xs font-semibold rounded-md transition-all flex items-center gap-2 ${
                activeTab === 'projects'
                  ? 'bg-white text-primary shadow-sm border border-surface-variant'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Matriz de Proyectos ({projectsData.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ACTORES TOCADOS (Paginated 15 per page) */}
        {activeTab === 'actors' && (
          <div className="animate-fadeIn">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, institución o cargo..."
                  value={actorSearch}
                  onChange={(e) => setActorSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs md:text-sm bg-white border border-surface-variant rounded-lg focus:outline-none focus:border-primary w-full"
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {actorSectors.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setActorSector(sec)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                      actorSector === sec
                        ? 'bg-primary text-white'
                        : 'bg-surface-container-low text-secondary border border-surface-variant hover:border-primary/40'
                    }`}
                  >
                    {sec === 'all' ? 'Todos los Sectores' : sec}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-surface-variant">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high border-b border-surface-variant text-xs font-bold text-secondary uppercase tracking-wider">
                    <th className="p-3.5">Sector Macro</th>
                    <th className="p-3.5">Organización / Institución</th>
                    <th className="p-3.5">Persona "Tocada" & Cargo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container text-xs md:text-sm">
                  {paginatedActors.map((actor) => (
                    <tr key={actor.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="p-3.5 font-semibold text-primary/90 whitespace-nowrap">
                        {actor.sector}
                      </td>
                      <td className="p-3.5 font-bold text-on-surface">
                        {actor.institution}
                      </td>
                      <td className="p-3.5 text-on-surface">
                        <div className="flex items-baseline gap-2">
                          <strong className="text-on-surface">{actor.name}</strong>
                          {actor.role && (
                            <span className="text-xs text-secondary italic">
                              ({actor.role})
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Actor Table Pagination (15 per page) */}
            {totalActorPages > 1 && (
              <div className="mt-6 flex items-center justify-between bg-surface-container-low px-4 py-3 rounded-lg border border-surface-variant">
                <span className="text-xs font-medium text-secondary">
                  Mostrando {((actorPage - 1) * actorPageSize) + 1} - {Math.min(actorPage * actorPageSize, filteredActors.length)} de {filteredActors.length} actores
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActorPage(p => Math.max(p - 1, 1))}
                    disabled={actorPage === 1}
                    className="p-1.5 rounded-lg border border-surface-variant text-secondary hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-bold text-on-surface px-2">
                    Página {actorPage} de {totalActorPages}
                  </span>

                  <button
                    onClick={() => setActorPage(p => Math.min(p + 1, totalActorPages))}
                    disabled={actorPage === totalActorPages}
                    className="p-1.5 rounded-lg border border-surface-variant text-secondary hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {filteredActors.length === 0 && (
              <div className="p-8 text-center text-secondary">
                No se encontraron actores coincidentes.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MATRIZ DE PROYECTOS */}
        {activeTab === 'projects' && (
          <div className="animate-fadeIn">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar proyecto o comentario..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs md:text-sm bg-white border border-surface-variant rounded-lg focus:outline-none focus:border-primary w-full"
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {projectStatuses.map((st) => (
                  <button
                    key={st}
                    onClick={() => setProjectStatus(st)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                      projectStatus === st
                        ? 'bg-primary text-white'
                        : 'bg-surface-container-low text-secondary border border-surface-variant hover:border-primary/40'
                    }`}
                  >
                    {st === 'all' ? 'Todos los Estados' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredProjects.map((p, idx) => {
                const badge = getStatusBadge(p.status);
                const BadgeIcon = badge.icon;
                return (
                  <div key={idx} className="p-5 rounded-lg border border-surface-variant bg-white flex flex-col justify-between hover:border-primary/40 transition-colors shadow-xs">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-serif text-lg font-bold text-on-surface">
                          {p.name}
                        </h3>
                        <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border flex items-center gap-1 shrink-0 ${badge.bg}`}>
                          <BadgeIcon className="w-3.5 h-3.5" />
                          {p.status}
                        </span>
                      </div>
                      <p className="text-xs text-secondary leading-relaxed mt-2 pt-2 border-t border-surface-container">
                        {p.comment}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProjects.length === 0 && (
              <div className="p-8 text-center text-secondary">
                No se encontraron proyectos coincidentes.
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
