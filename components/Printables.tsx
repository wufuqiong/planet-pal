import React, { useState } from 'react';
import { PLANETS } from '../constants';
import { generateKindergartenWorksheet } from '../services/geminiService';
import { PrintableWorksheetData } from '../types';

const Printables: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'FLASHCARDS' | 'WORKSHEET'>('FLASHCARDS');
    const [worksheetData, setWorksheetData] = useState<PrintableWorksheetData | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    const handleGenerateWorksheet = async () => {
        setLoading(true);
        const data = await generateKindergartenWorksheet();
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

                <div className="flex gap-4">
                     {activeTab === 'WORKSHEET' && (
                        <button
                            onClick={handleGenerateWorksheet}
                            disabled={loading}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
                        >
                             {loading ? 'Generating...' : '✨ New Worksheet'}
                        </button>
                    )}
                    <button
                        onClick={handlePrint}
                        className="bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Print
                    </button>
                </div>
            </div>

            {/* Printable Content Container */}
            <div className="bg-white text-black p-8 shadow-2xl min-h-[1100px] w-full printable-area">
                
                {/* --- FLASHCARDS LAYOUT --- */}
                {activeTab === 'FLASHCARDS' && (
                    <div className="grid grid-cols-2 gap-4">
                        {PLANETS.map((planet) => (
                            <div key={planet.id} className="print-break-inside-avoid border-2 border-dashed border-slate-300 p-4 flex flex-row items-center gap-4 rounded-xl h-64 relative">
                                {/* Scissors Icon for cutting guide */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-slate-400 no-print">
                                    ✂️
                                </div>
                                
                                {/* Image Side */}
                                <div className="w-1/2 flex flex-col items-center justify-center border-r-2 border-slate-100 pr-4 h-full">
                                    <div 
                                        className="w-24 h-24 rounded-full mb-2 border border-slate-200"
                                        style={{ background: planet.color, printColorAdjust: 'exact' }}
                                    />
                                    <h3 className="text-3xl font-black uppercase tracking-wider text-center">{planet.name}</h3>
                                </div>

                                {/* Info Side */}
                                <div className="w-1/2 flex flex-col justify-center pl-2 h-full">
                                    <p className="text-4xl font-light text-slate-300 mb-2">{planet.chineseName}</p>
                                    <p className="text-sm font-medium text-slate-600 leading-snug">{planet.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- WORKSHEET LAYOUT --- */}
                {activeTab === 'WORKSHEET' && (
                    <div className="h-full">
                        {!worksheetData && !loading && (
                            <div className="flex flex-col items-center justify-center h-96 text-center text-slate-500">
                                <p className="mb-4 text-lg">Click "New Worksheet" to generate a unique activity page.</p>
                            </div>
                        )}

                        {loading && (
                             <div className="flex flex-col items-center justify-center h-96">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mb-4"></div>
                                <p className="text-slate-500 font-medium">Designing activities for kids...</p>
                             </div>
                        )}

                        {worksheetData && !loading && (
                            <div className="flex flex-col h-full">
                                {/* Worksheet Header */}
                                <div className="border-b-4 border-slate-800 pb-4 mb-8 flex justify-between items-end">
                                    <div>
                                        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">{worksheetData.title}</h1>
                                        <p className="text-slate-500 mt-1">Kindergarten Space Explorer</p>
                                    </div>
                                    <div className="flex gap-8">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold uppercase text-slate-400">Name</span>
                                            <div className="w-48 border-b-2 border-slate-300 h-8"></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold uppercase text-slate-400">Date</span>
                                            <div className="w-32 border-b-2 border-slate-300 h-8"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Activities Grid */}
                                <div className="grid grid-cols-1 gap-8">
                                    {worksheetData.activities.map((activity, idx) => (
                                        <div key={activity.id} className="border-2 border-slate-200 rounded-2xl p-6 relative print-break-inside-avoid">
                                            <div className="absolute -top-4 left-6 bg-white px-2 font-black text-xl text-indigo-600">
                                                ACTIVITY {idx + 1}
                                            </div>

                                            {/* TRACE ACTIVITY */}
                                            {activity.type === 'TRACE' && (
                                                <div className="flex flex-col items-center">
                                                    <p className="text-lg font-bold mb-4 w-full text-left">✍️ {activity.instruction}</p>
                                                    <div className="text-8xl font-outline-dashed font-sans tracking-[0.2em] text-slate-200" style={{WebkitTextStroke: '2px #cbd5e1', color: 'transparent'}}>
                                                        {activity.subject.toUpperCase()}
                                                    </div>
                                                </div>
                                            )}

                                            {/* COLOR ACTIVITY */}
                                            {activity.type === 'COLOR' && (
                                                <div className="flex flex-col items-center">
                                                    <p className="text-lg font-bold mb-6 w-full text-left">
                                                        🎨 {activity.instruction}
                                                        {activity.colorHex && (
                                                            <span className="inline-block w-6 h-6 rounded-full border border-slate-300 ml-2 align-middle" style={{backgroundColor: activity.colorHex, printColorAdjust: 'exact'}}></span>
                                                        )}
                                                    </p>
                                                    <div className="w-32 h-32 rounded-full border-4 border-black"></div>
                                                    <p className="mt-2 text-slate-400 text-sm font-bold uppercase">{activity.subject}</p>
                                                </div>
                                            )}

                                            {/* DRAW ACTIVITY */}
                                            {activity.type === 'DRAW' && (
                                                <div className="flex flex-col items-center w-full">
                                                     <p className="text-lg font-bold mb-4 w-full text-left">✏️ {activity.instruction}</p>
                                                     <div className="w-full h-48 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50"></div>
                                                </div>
                                            )}

                                            {/* COUNT ACTIVITY */}
                                            {activity.type === 'COUNT' && (
                                                <div className="flex flex-col items-center w-full">
                                                    <p className="text-lg font-bold mb-4 w-full text-left">🔢 {activity.instruction}</p>
                                                    <div className="flex flex-wrap gap-6 justify-center mb-6">
                                                        {Array.from({length: activity.itemsToCount || 5}).map((_, i) => (
                                                            <div key={i} className="text-4xl">⭐</div>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-end gap-2 text-2xl">
                                                        <span>Answer:</span>
                                                        <div className="w-16 border-b-2 border-black"></div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-auto pt-8 text-center text-xs text-slate-400">
                                    Generated by Planet Pal AI
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Printables;
