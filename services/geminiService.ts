import { GoogleGenAI, Type } from "@google/genai";
import { WorksheetData, QuestionType, PrintableWorksheetData, PrintableActivityType } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to get random planet names for context
const getPlanetNames = () => ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

export const generateWorksheet = async (difficulty: 'easy' | 'hard'): Promise<WorksheetData> => {
  const isHard = difficulty === 'hard';
  
  const systemInstruction = `You are an educational content generator for children learning English. 
  Create a worksheet about Solar System planets. 
  For 'easy' difficulty, focus on simple identification and basic facts (colors, size). 
  For 'hard' difficulty, focus on order, atmosphere, and specific characteristics.
  Output JSON only.`;

  const prompt = `Create a ${difficulty} worksheet with 5 questions.
  Mix Multiple Choice and Fill in the Blank questions.
  Provide a creative title for the worksheet.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING, enum: [QuestionType.MULTIPLE_CHOICE, QuestionType.FILL_BLANK] },
                  question: { type: Type.STRING },
                  options: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    nullable: true 
                  },
                  correctAnswer: { type: Type.STRING }
                },
                required: ['id', 'type', 'question', 'correctAnswer']
              }
            }
          },
          required: ['title', 'questions']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as WorksheetData;

  } catch (error) {
    console.error("Gemini Worksheet Error:", error);
    // Fallback data if API fails
    return {
      title: "Solar System Practice (Offline Mode)",
      questions: [
        {
          id: '1',
          type: QuestionType.MULTIPLE_CHOICE,
          question: "Which planet is closest to the Sun?",
          options: ["Earth", "Venus", "Mercury", "Mars"],
          correctAnswer: "Mercury"
        },
        {
          id: '2',
          type: QuestionType.FILL_BLANK,
          question: "The Red Planet is named ______.",
          correctAnswer: "Mars"
        }
      ]
    };
  }
};

export const generateMoreFunFacts = async (planetName: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Tell me a short, fascinating, one-sentence fun fact about the planet ${planetName} for a kid.`,
        });
        return response.text || `Did you know ${planetName} is amazing?`;
    } catch (e) {
        return `${planetName} is a fascinating world to explore!`;
    }
}

export const generateKindergartenWorksheet = async (): Promise<PrintableWorksheetData> => {
    const prompt = `Create a printable kindergarten worksheet about the solar system with 4 distinct simple activities.
    Activities should be:
    1. 'TRACE': A planet name for the child to trace.
    2. 'COLOR': Instruction to color a specific planet a specific color.
    3. 'DRAW': A simple drawing prompt (e.g. Draw a star).
    4. 'COUNT': A prompt to count items (e.g. Count the moons).
    
    Return JSON.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        activities: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING },
                                    type: { type: Type.STRING, enum: ['TRACE', 'COLOR', 'DRAW', 'COUNT'] },
                                    instruction: { type: Type.STRING },
                                    subject: { type: Type.STRING },
                                    colorHex: { type: Type.STRING, nullable: true },
                                    itemsToCount: { type: Type.INTEGER, nullable: true }
                                },
                                required: ['id', 'type', 'instruction', 'subject']
                            }
                        }
                    },
                    required: ['title', 'activities']
                }
            }
        });

        const text = response.text;
        if (!text) throw new Error("No response");
        return JSON.parse(text) as PrintableWorksheetData;
    } catch (e) {
        // Fallback
        return {
            title: "My Space Adventure",
            activities: [
                { id: '1', type: 'TRACE', instruction: 'Trace the name of our home planet', subject: 'EARTH' },
                { id: '2', type: 'COLOR', instruction: 'Color Mars RED', subject: 'MARS', colorHex: '#ef4444' },
                { id: '3', type: 'DRAW', instruction: 'Draw a rocket ship going to the moon', subject: 'ROCKET' },
                { id: '4', type: 'COUNT', instruction: 'Count the stars', subject: 'STARS', itemsToCount: 5 }
            ]
        };
    }
}
