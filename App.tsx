import React, { useState } from 'react';
import { PLANETS } from './constants';
import Flashcard from './components/Flashcard';
import Worksheet from './components/Worksheet';
import Printables from './components/Printables';
import { AppMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.FLASHCARDS);
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);

  const nextPlanet = () => {
    setCurrentPlanetIndex((prev) => (prev + 1) % PLANETS.length);
  };

  const prevPlanet = () => {
    setCurrentPlanetIndex((prev) => (prev - 1 + PLANETS.length) % PLANETS.length);
  };

  return (
    <div className={`min-h-screen ${mode === AppMode.PRINTABLES ? 'bg-slate-100' : "bg-[url('https://picsum.photos/seed/space/1920/1080')] bg-cover bg-center bg-fixed bg-no-repeat"} relative`}>
      {/* Dark Overlay for digital modes */}
      {mode !== AppMode.PRINTABLES && (
         <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm z-0 no-print"></div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen">
        
        {/* Header - Hidden when Printing */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 no-print">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl">🪐</div>
             <div>
                 <h1 className={`text-3xl font-bold bg-clip-text text-transparent ${mode === AppMode.PRINTABLES ? 'bg-gradient-to-r from-slate-700 to-slate-900' : 'bg-gradient-to-r from-indigo-300 to-purple-300'}`}>
                    Planet Pal
                 </h1>
                 <p className={mode === AppMode.PRINTABLES ? 'text-slate-500 text-sm' : 'text-slate-400 text-sm'}>Explore the Solar System</p>
             </div>
          </div>

          <nav className="bg-slate-800/50 p-1 rounded-xl flex gap-1">
            <button
              onClick={() => setMode(AppMode.FLASHCARDS)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                mode === AppMode.FLASHCARDS
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Flashcards
            </button>
            <button
              onClick={() => setMode(AppMode.WORKSHEET)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                mode === AppMode.WORKSHEET
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Quiz
            </button>
            <button
              onClick={() => setMode(AppMode.PRINTABLES)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                mode === AppMode.PRINTABLES
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              🖨️ Printables
            </button>
          </nav>
        </header>

        {/* Content Area - Simplified for printing */}
        <main className="flex-grow flex flex-col items-center justify-center w-full">
          
          {mode === AppMode.FLASHCARDS && (
            <div className="w-full max-w-4xl flex flex-col items-center gap-8">
              
              <div className="w-full flex justify-between items-center px-4 md:px-12 text-slate-300">
                <button onClick={prevPlanet} className="p-3 hover:bg-white/10 rounded-full transition-colors group">
                    <svg className="w-8 h-8 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                
                <div className="text-center">
                    <span className="text-sm font-bold tracking-widest text-indigo-400">PLANET {currentPlanetIndex + 1} OF {PLANETS.length}</span>
                </div>

                <button onClick={nextPlanet} className="p-3 hover:bg-white/10 rounded-full transition-colors group">
                    <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>

              <div className="w-full">
                <Flashcard planet={PLANETS[currentPlanetIndex]} />
              </div>

              {/* Mini Navigation Dots */}
              <div className="flex gap-2 mt-4 flex-wrap justify-center">
                {PLANETS.map((planet, idx) => (
                    <button 
                        key={planet.id}
                        onClick={() => setCurrentPlanetIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            idx === currentPlanetIndex ? 'bg-indigo-400 scale-125' : 'bg-slate-600 hover:bg-slate-500'
                        }`}
                        title={planet.name}
                    />
                ))}
              </div>
            </div>
          )}

          {mode === AppMode.WORKSHEET && (
             <Worksheet />
          )}

          {mode === AppMode.PRINTABLES && (
             <Printables />
          )}

        </main>

        <footer className="mt-8 text-center text-slate-500 text-sm no-print">
           <p>© {new Date().getFullYear()} Planet Pal Education. Powered by Gemini AI.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;