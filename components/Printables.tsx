// Updated React component
import React, { useState } from 'react';
import { PLANETS } from '../constants';
import { generateKindergartenWorksheet } from '../services/Service';
import { PrintableWorksheetData } from '../types';

const Printables: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'FLASHCARDS' | 'WORKSHEET'>('FLASHCARDS');
    const [worksheetData, setWorksheetData] = useState<PrintableWorksheetData[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState<string>('ALL');

    const handlePrint = () => {
        window.print();
    };

    const handleGenerateWorksheet = async (planet: string = 'ALL') => {
        setLoading(true);
        setSelectedPlanet(planet);
        const data = await generateKindergartenWorksheet(planet === 'ALL' ? undefined : planet);
        setWorksheetData(data);
        setLoading(false);
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Screen-only Controls */}
            <div className="no-print mb-8 bg-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex bg-slate-700 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('FLASHCARDS')}
                        className={`px-4 py-2 rounded-md transition-all font-medium ${activeTab === 'FLASHCARDS' ? 'bg-indigo-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        Flashcards
                    </button>
                    <button
                        onClick={() => setActiveTab('WORKSHEET')}
                        className={`px-4 py-2 rounded-md transition-all font-medium ${activeTab === 'WORKSHEET' ? 'bg-indigo-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        K-Worksheet
                    </button>
                </div>

                {activeTab === 'WORKSHEET' && (
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleGenerateWorksheet('ALL')}
                                disabled={loading}
                                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 text-sm"
                            >
                                All Planets
                            </button>
                            {PLANETS.map(planet => (
                                <button
                                    key={planet.id}
                                    onClick={() => handleGenerateWorksheet(planet.name)}
                                    disabled={loading}
                                    className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-2 rounded-lg font-medium transition-colors text-xs"
                                >
                                    {planet.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        onClick={handlePrint}
                        className="bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                        </svg>
                        Print
                    </button>
                </div>
            </div>

            {/* Printable Content Container */}
            <div className="bg-white text-black p-8 shadow-2xl w-full printable-area">
                
                {/* FLASHCARDS LAYOUT */}
                {activeTab === 'FLASHCARDS' && (
                    <div className="grid grid-cols-2 gap-3 flashcard-grid">
                        {PLANETS.map((planet) => (
                            <div key={planet.id} className="print-break-inside-avoid border-2 border-dashed border-slate-300 p-3 flex flex-row items-center gap-3 rounded-xl h-48 relative flashcard-item">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-slate-400 no-print">
                                    ✂️
                                </div>
                                
                                <div className="w-1/2 flex flex-col items-center justify-center border-r-2 border-slate-100 pr-3 h-full">
                                    <div 
                                        className="w-16 h-16 rounded-full mb-2 border border-slate-200"
                                        style={{ background: planet.color, printColorAdjust: 'exact' }}
                                    />
                                    <h3 className="text-xl font-black uppercase tracking-wider text-center">{planet.name}</h3>
                                </div>

                                <div className="w-1/2 flex flex-col justify-center pl-2 h-full">
                                    <p className="text-2xl font-light text-slate-300 mb-2">{planet.chineseName}</p>
                                    <p className="text-xs font-medium text-slate-600 leading-snug">{planet.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* WORKSHEET LAYOUT - UPDATED FOR MULTIPLE WORKSHEETS */}
                {activeTab === 'WORKSHEET' && (
                    <div className="worksheet-container">
                        {!worksheetData && !loading && (
                            <div className="flex flex-col items-center justify-center h-96 text-center text-slate-500">
                                <p className="mb-4 text-lg">Select a planet or "All Planets" to generate worksheets</p>
                                <p className="text-sm">Each worksheet includes TRACE, COLOR, DRAW, and COUNT activities!</p>
                            </div>
                        )}

                        {loading && (
                            <div className="flex flex-col items-center justify-center h-96">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mb-4"></div>
                                <p className="text-slate-500 font-medium">Creating {selectedPlanet === 'ALL' ? 'all planet' : selectedPlanet} worksheets...</p>
                            </div>
                        )}

                        {worksheetData && !loading && (
                            <div className="space-y-8">
                                {worksheetData.map((worksheet, worksheetIndex) => (
                                    <div key={worksheetIndex} className="print-break-after-page worksheet-page border-2 border-slate-200 rounded-xl p-6">
                                        {/* Worksheet Header */}
                                        <div className="border-b-4 border-slate-800 pb-3 mb-6 flex justify-between items-end">
                                            <div>
                                                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{worksheet.title}</h1>
                                                <p className="text-slate-500 mt-1 text-sm">Kindergarten Space Explorer</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold uppercase text-slate-400">Name</span>
                                                    <div className="w-32 border-b-2 border-slate-300 h-6"></div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold uppercase text-slate-400">Date</span>
                                                    <div className="w-24 border-b-2 border-slate-300 h-6"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Activities Grid */}
                                        <div className="grid grid-cols-2 gap-6 activities-grid">
                                            {worksheet.activities.map((activity, activityIndex) => (
                                                <div key={activity.id} className="border-2 border-slate-200 rounded-xl p-4 activity-item">
                                                    <div className="font-black text-lg text-indigo-600 mb-2">
                                                        ACTIVITY {activityIndex + 1}
                                                    </div>

                                                    {/* TRACE ACTIVITY */}
                                                    {activity.type === 'TRACE' && (
                                                        <div className="flex flex-col items-center">
                                                            <p className="text-base font-bold mb-3 w-full text-left">✍️ {activity.instruction}</p>
                                                            <div className="text-4xl font-outline-dashed font-sans tracking-[0.2em] text-slate-200" style={{WebkitTextStroke: '2px #cbd5e1', color: 'transparent'}}>
                                                                {activity.subject}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* COLOR ACTIVITY */}
                                                    {activity.type === 'COLOR' && (
                                                        <div className="flex flex-col items-center">
                                                            <p className="text-base font-bold mb-4 w-full text-left">
                                                                🎨 {activity.instruction}
                                                                {activity.colorHex && (
                                                                    <span className="inline-block w-4 h-4 rounded-full border border-slate-300 ml-2 align-middle" style={{backgroundColor: activity.colorHex, printColorAdjust: 'exact'}}></span>
                                                                )}
                                                            </p>
                                                            <div className="w-20 h-20 rounded-full border-4 border-black"></div>
                                                            <p className="mt-2 text-slate-400 text-xs font-bold uppercase">{activity.subject}</p>
                                                        </div>
                                                    )}

                                                    {/* DRAW ACTIVITY */}
                                                    {activity.type === 'DRAW' && (
                                                        <div className="flex flex-col items-center w-full">
                                                            <p className="text-base font-bold mb-3 w-full text-left">✏️ {activity.instruction}</p>
                                                            <div className="w-full h-24 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50"></div>
                                                        </div>
                                                    )}

                                                    {/* COUNT ACTIVITY */}
                                                    {activity.type === 'COUNT' && (
                                                        <div className="flex flex-col items-center w-full">
                                                            <p className="text-base font-bold mb-3 w-full text-left">🔢 {activity.instruction}</p>
                                                            <div className="flex flex-wrap gap-3 justify-center mb-4">
                                                                {Array.from({length: activity.itemsToCount || 5}).map((_, i) => (
                                                                    <div key={i} className="text-2xl">⭐</div>
                                                                ))}
                                                            </div>
                                                            <div className="flex items-end gap-2 text-lg">
                                                                <span>Answer:</span>
                                                                <div className="w-12 border-b-2 border-black"></div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="mt-4 pt-4 text-center text-xs text-slate-400 border-t border-slate-200">
                                            Planet Pal Worksheets - {worksheet.title}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Printables;