import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, BookOpen, BarChart2, MessageSquare, Users, Award, ChevronRight } from 'lucide-react';
import pisctLogo from '../assets/pisct.png';
import activitiesData from '../data/activities.json';
import quotesData from '../data/quotes.json';
import actorsData from '../data/actors.json';
import projectsData from '../data/projects.json';

export default function Header({ activeTab, setActiveTab, onSelectSearchResult }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const searchRef = useRef(null);

  const navItems = [
    { id: 'dashboard', name: 'Dashboard / Marco Teórico', shortName: 'Dashboard', icon: BookOpen },
    { id: 'activities', name: 'Explorador Actividades', shortName: 'Actividades', icon: BarChart2 },
    { id: 'quotes', name: 'Banco de Citas', shortName: 'Citas', icon: MessageSquare },
    { id: 'matrix', name: 'Actores y Proyectos', shortName: 'Actores/Proyectos', icon: Users },
    { id: 'logros', name: 'Logros y Proyección', shortName: 'Logros/Futuro', icon: Award },
  ];

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K to focus search input
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          setIsSearchOpen(true);
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute search results across datasets
  const searchResults = React.useMemo(() => {
    if (!globalSearch.trim() || globalSearch.length < 2) return null;
    const query = globalSearch.toLowerCase().trim();

    const matchedActivities = activitiesData.filter(a =>
      a.name.toLowerCase().includes(query) || a.date.toLowerCase().includes(query)
    ).slice(0, 4);

    const matchedQuotes = quotesData.filter(q =>
      q.text.toLowerCase().includes(query) || q.activity.toLowerCase().includes(query)
    ).slice(0, 4);

    const matchedActors = actorsData.filter(a =>
      a.name.toLowerCase().includes(query) || a.institution.toLowerCase().includes(query)
    ).slice(0, 4);

    const matchedProjects = projectsData.filter(p =>
      p.name.toLowerCase().includes(query) || p.comment.toLowerCase().includes(query)
    ).slice(0, 4);

    const totalCount = matchedActivities.length + matchedQuotes.length + matchedActors.length + matchedProjects.length;

    return {
      activities: matchedActivities,
      quotes: matchedQuotes,
      actors: matchedActors,
      projects: matchedProjects,
      totalCount
    };
  }, [globalSearch]);

  const handleResultClick = (tabId, itemData) => {
    setActiveTab(tabId);
    setIsSearchOpen(false);
    setGlobalSearch('');
    if (onSelectSearchResult) {
      onSelectSearchResult(tabId, itemData);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-surface-variant shadow-sm transition-all">
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 h-20 flex items-center justify-between gap-2 md:gap-4">
        
        {/* BRAND & LOGO */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2 md:gap-3 cursor-pointer select-none shrink-0"
        >
          <img 
            src={pisctLogo} 
            alt="PISCT KAYSEN Logo" 
            className="h-8 md:h-9 w-auto object-contain rounded"
          />
          <div className="shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-primary">
                KAYSEN
              </span>
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                Fase 1
              </span>
            </div>
            <p className="text-[10px] text-secondary hidden xl:block leading-tight">
              Informe de Cierre — U. de Chile
            </p>
          </div>
        </div>

        {/* ENHANCED SEARCH BAR PILL */}
        <div className="relative shrink-0 w-40 sm:w-48 md:w-56 lg:w-64" ref={searchRef}>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar... (Ctrl+K)"
              value={globalSearch}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setGlobalSearch(e.target.value);
                setIsSearchOpen(true);
              }}
              className="w-full pl-9 pr-7 py-1.5 text-xs bg-[#F1F3F5] border border-surface-variant/80 rounded-full focus:outline-none focus:border-primary focus:bg-white transition-all text-on-surface font-medium placeholder:text-secondary/70"
            />
            {globalSearch ? (
              <button 
                onClick={() => setGlobalSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-secondary hover:text-on-surface"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block absolute right-2.5 text-[9px] font-mono font-semibold text-secondary/60 bg-white/80 px-1.5 py-0.5 rounded border border-surface-variant/50">
                ⌘K
              </kbd>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && searchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-surface-variant shadow-2xl overflow-hidden max-h-[75vh] overflow-y-auto z-50 min-w-[280px]">
              {searchResults.totalCount > 0 ? (
                <div className="p-3 space-y-3">
                  
                  {/* Activities Results */}
                  {searchResults.activities.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold uppercase text-primary tracking-wider px-2 mb-1">
                        Actividades ({searchResults.activities.length})
                      </div>
                      {searchResults.activities.map(act => (
                        <div
                          key={act.id}
                          onClick={() => handleResultClick('activities', act)}
                          className="p-2 hover:bg-surface-container-low rounded-lg cursor-pointer transition-colors text-xs flex justify-between items-center"
                        >
                          <div>
                            <span className="font-bold text-on-surface block">{act.name}</span>
                            <span className="text-[10px] text-secondary">{act.date} • {act.sector}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-secondary shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quotes Results */}
                  {searchResults.quotes.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold uppercase text-primary tracking-wider px-2 mb-1">
                        Citas ({searchResults.quotes.length})
                      </div>
                      {searchResults.quotes.map(q => (
                        <div
                          key={q.id}
                          onClick={() => handleResultClick('quotes', q)}
                          className="p-2 hover:bg-surface-container-low rounded-lg cursor-pointer transition-colors text-xs"
                        >
                          <span className="italic text-on-surface line-clamp-2">"{q.text}"</span>
                          <span className="text-[10px] text-secondary font-semibold block mt-0.5">📍 {q.activity}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actors Results */}
                  {searchResults.actors.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold uppercase text-primary tracking-wider px-2 mb-1">
                        Actores ({searchResults.actors.length})
                      </div>
                      {searchResults.actors.map(act => (
                        <div
                          key={act.id}
                          onClick={() => handleResultClick('matrix', act)}
                          className="p-2 hover:bg-surface-container-low rounded-lg cursor-pointer transition-colors text-xs flex justify-between items-center"
                        >
                          <div>
                            <span className="font-bold text-on-surface block">{act.name}</span>
                            <span className="text-[10px] text-secondary">{act.institution} ({act.sector})</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-secondary shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Projects Results */}
                  {searchResults.projects.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold uppercase text-primary tracking-wider px-2 mb-1">
                        Proyectos ({searchResults.projects.length})
                      </div>
                      {searchResults.projects.map((p, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleResultClick('matrix', p)}
                          className="p-2 hover:bg-surface-container-low rounded-lg cursor-pointer transition-colors text-xs flex justify-between items-center"
                        >
                          <div>
                            <span className="font-bold text-on-surface block">{p.name}</span>
                            <span className="text-[10px] text-secondary">Estado: {p.status}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-secondary shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ) : (
                <div className="p-4 text-center text-xs text-secondary">
                  No se encontraron resultados para "{globalSearch}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* FIT 100% TOP NAVBAR NAVIGATION TABS */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink min-w-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-white shadow-xs font-bold'
                    : 'text-secondary hover:text-primary hover:bg-surface-container-low'
                }`}
              >
                <item.icon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden xl:inline">{item.name}</span>
                <span className="xl:hidden">{item.shortName}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-secondary hover:text-primary hover:bg-surface-container-low shrink-0"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-surface-variant px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-white font-bold'
                    : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
