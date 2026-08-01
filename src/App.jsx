import React, { useState } from 'react';
import Header from './components/Header';
import KPIDashboard from './components/KPIDashboard';
import ReportSections from './components/ReportSections';
import ActivityExplorer from './components/ActivityExplorer';
import QuoteLibrary from './components/QuoteLibrary';
import ActorsProjectsMatrix from './components/ActorsProjectsMatrix';
import LogrosQuiebresFuturo from './components/LogrosQuiebresFuturo';
import AnnexesSection from './components/AnnexesSection';
import { MapPin } from 'lucide-react';

export default function App() {
  // Container Layout Tab State (Only renders active tab's view component)
  // Tab options: 'dashboard', 'activities', 'quotes', 'matrix', 'logros'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSearchResultItem, setSelectedSearchResultItem] = useState(null);

  const handleSearchResultClick = (tabId, itemData) => {
    setActiveTab(tabId);
    setSelectedSearchResultItem(itemData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      
      {/* Top Fixed Navbar with Global Search & Tab Switcher */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectSearchResult={handleSearchResultClick}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-28 pb-16 px-4 md:px-8 max-w-container-max mx-auto w-full">
        
        {/* Header Banner (Persistent across views) */}
        <header className="mb-8 border-l-8 border-primary pl-6 md:pl-8 py-4 bg-white rounded-r-xl border-y border-r border-surface-variant shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">
              Programa de Innovación y Sociotecnología — Ingeniería Industrial, Universidad de Chile
            </span>
            <h1 className="font-serif text-2xl md:text-4xl font-bold text-on-surface tracking-tight mb-1">
              KAYSEN: Informe de Cierre Fase 1
            </h1>
            <p className="text-xs md:text-sm text-secondary font-sans">
              Programa de Fortalecimiento del Capital Social y Generación de una Cultura de Innovación en Aysén
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-xs font-semibold text-secondary border border-surface-variant">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              Puerto Aysén & Región de Aysén
            </span>
          </div>
        </header>

        {/* View State Router — Renders ONLY the Active Tab's View */}
        
        {/* Tab 1: Dashboard / Marco Teórico */}
        {activeTab === 'dashboard' && (
          <div className="animate-fadeIn space-y-8">
            <KPIDashboard />
            <ReportSections />
          </div>
        )}

        {/* Tab 2: Explorador de Actividades */}
        {activeTab === 'activities' && (
          <div className="animate-fadeIn">
            <ActivityExplorer selectedItem={selectedSearchResultItem} />
          </div>
        )}

        {/* Tab 3: Banco de Citas */}
        {activeTab === 'quotes' && (
          <div className="animate-fadeIn">
            <QuoteLibrary />
          </div>
        )}

        {/* Tab 4: Actores y Proyectos */}
        {activeTab === 'matrix' && (
          <div className="animate-fadeIn">
            <ActorsProjectsMatrix selectedItem={selectedSearchResultItem} />
          </div>
        )}

        {/* Tab 5: Logros y Proyección */}
        {activeTab === 'logros' && (
          <div className="animate-fadeIn space-y-8">
            <LogrosQuiebresFuturo />
            <AnnexesSection />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-surface-variant py-8 px-4 md:px-8 mt-auto">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="./logo.png" 
              alt="KAYSEN Logo" 
              className="h-8 w-auto object-contain rounded"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <p className="font-serif font-bold text-sm text-primary">Proyecto KAYSEN — Fase 1</p>
              <p className="text-[11px] text-secondary">
                Departamento de Ingeniería Industrial, Universidad de Chile
              </p>
            </div>
          </div>
          <p className="text-xs text-secondary text-center md:text-right font-medium">
            Desarrollado por Álvaro Contreras Barrios — Documento de uso interno.
          </p>
        </div>
      </footer>

    </div>
  );
}
