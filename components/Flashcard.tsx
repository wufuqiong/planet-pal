import React, { useState, useEffect } from 'react';
import { Planet } from '../types';
import { generateMoreFunFacts } from '../services/Service';

interface FlashcardProps {
  planet: Planet;
}

const Flashcard: React.FC<FlashcardProps> = ({ planet }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [aiFact, setAiFact] = useState<string | null>(null);
  const [loadingFact, setLoadingFact] = useState(false);

  // Reset state when planet changes
  useEffect(() => {
    setIsFlipped(false);
    setAiFact(null);
  }, [planet]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(planet.name);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleLoadAiFact = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingFact(true);
    const fact = await generateMoreFunFacts(planet.name);
    setAiFact(fact);
    setLoadingFact(false);
  };

  return (
    <div className="group w-full max-w-sm h-96 cursor-pointer perspective-1000 mx-auto" onClick={handleFlip}>
      <div
        className={`relative w-full h-full duration-700 transform-style-3d transition-all ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-2xl overflow-hidden bg-slate-800 border-2 border-slate-600 flex flex-col items-center justify-center p-6">
            
          {/* Visual Representation of Planet using CSS Gradient */}
          <div 
            className="w-48 h-48 rounded-full shadow-lg mb-6 transition-transform duration-500 hover:scale-105"
            style={{ background: planet.color, boxShadow: `0 0 30px ${planet.color.split(',')[1] || '#fff'}40` }}
          />

          <h2 className="text-4xl font-bold text-white mb-2">{planet.name}</h2>
          <p className="text-xl text-slate-400 font-light">{planet.chineseName}</p>

          <button
            onClick={handleSpeak}
            className="mt-6 p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg z-10"
            aria-label="Pronounce"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
          
          <div className="absolute bottom-4 text-xs text-slate-500 uppercase tracking-widest">Tap to flip</div>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-2xl overflow-hidden bg-white text-slate-900 p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-indigo-900">{planet.name}</h3>
                <span className="text-lg text-slate-500">{planet.chineseName}</span>
            </div>
            
            <p className="text-lg leading-relaxed text-slate-700 mb-6 border-l-4 border-indigo-400 pl-4">
                {planet.description}
            </p>

            <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="font-semibold text-indigo-800 text-sm mb-1">Did you know?</p>
                <p className="text-slate-700 italic">
                    {aiFact || planet.funFact}
                </p>
            </div>
          </div>

          <div className="mt-4">
             {!aiFact && (
                 <button 
                    onClick={handleLoadAiFact}
                    disabled={loadingFact}
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
                 >
                    {loadingFact ? (
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                        <><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 9a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1zm0 9a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" /></svg> New AI Fact</>
                    )}
                 </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;