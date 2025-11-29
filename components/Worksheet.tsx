import React, { useState } from 'react';
import { generateWorksheet } from '../services/geminiService';
import { WorksheetData, QuestionType } from '../types';

const Worksheet: React.FC = () => {
  const [worksheet, setWorksheet] = useState<WorksheetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleGenerate = async (difficulty: 'easy' | 'hard') => {
    setLoading(true);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    try {
      const data = await generateWorksheet(difficulty);
      setWorksheet(data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate worksheet. Please check API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (!worksheet) return;
    let newScore = 0;
    worksheet.questions.forEach(q => {
      const userAnswer = answers[q.id]?.trim().toLowerCase();
      const correct = q.correctAnswer.trim().toLowerCase();
      if (userAnswer === correct) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-white animate-pulse">
        <div className="text-6xl mb-4">🚀</div>
        <h2 className="text-2xl font-bold">Generating Worksheet...</h2>
        <p className="text-slate-400">Consulting the AI stars</p>
      </div>
    );
  }

  if (!worksheet) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Create a Worksheet</h2>
        <p className="text-slate-300 mb-8 max-w-md">
          Use AI to generate a unique practice worksheet to test your knowledge about the planets.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => handleGenerate('easy')}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1"
          >
            Easy Mode
          </button>
          <button
            onClick={() => handleGenerate('hard')}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1"
          >
            Hard Mode
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden my-4">
      {/* Worksheet Header */}
      <div className="bg-slate-100 p-6 border-b border-slate-200">
        <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-slate-800">{worksheet.title}</h2>
            <button 
                onClick={() => setWorksheet(null)}
                className="text-sm text-slate-500 hover:text-red-500"
            >
                Close
            </button>
        </div>
        <p className="text-slate-500 text-sm mt-1">Answer the questions below to test your skills.</p>
      </div>

      {/* Questions List */}
      <div className="p-8 space-y-8">
        {worksheet.questions.map((q, index) => (
          <div key={q.id} className="relative">
            <p className="font-semibold text-lg text-slate-800 mb-3">
              <span className="text-indigo-600 mr-2">{index + 1}.</span>
              {q.question}
            </p>

            {q.type === QuestionType.MULTIPLE_CHOICE && q.options && (
              <div className="space-y-2 ml-6">
                {q.options.map((opt) => (
                  <label key={opt} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      answers[q.id] === opt 
                        ? 'bg-indigo-50 border-indigo-300' 
                        : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleAnswerChange(q.id, opt)}
                      disabled={submitted}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === QuestionType.FILL_BLANK && (
              <div className="ml-6">
                <input
                  type="text"
                  placeholder="Type your answer..."
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  disabled={submitted}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            )}

            {/* Feedback after submission */}
            {submitted && (
                <div className="ml-6 mt-2 text-sm">
                    {answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim() ? (
                        <p className="text-green-600 font-bold flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Correct!
                        </p>
                    ) : (
                        <p className="text-red-500 font-bold flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            Incorrect. Answer: {q.correctAnswer}
                        </p>
                    )}
                </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer / Actions */}
      <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-between items-center">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-indigo-700 transition-colors"
          >
            Submit Worksheet
          </button>
        ) : (
            <div className="w-full flex justify-between items-center">
                <div className="text-xl font-bold text-slate-800">
                    Score: <span className={score === worksheet.questions.length ? "text-green-600" : "text-indigo-600"}>{score}</span> / {worksheet.questions.length}
                </div>
                <button
                    onClick={() => setWorksheet(null)}
                    className="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors"
                >
                    Try Another
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Worksheet;