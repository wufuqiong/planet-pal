export interface Planet {
  id: number;
  name: string;
  chineseName: string;
  color: string; // CSS radial gradient or hex
  description: string;
  funFact: string; // Default static fact
}

export enum AppMode {
  FLASHCARDS = 'FLASHCARDS',
  WORKSHEET = 'WORKSHEET',
  PRINTABLES = 'PRINTABLES',
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  FILL_BLANK = 'FILL_BLANK',
}

export interface WorksheetQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // For multiple choice
  correctAnswer: string;
}

export interface WorksheetData {
  title: string;
  questions: WorksheetQuestion[];
}

export type PrintableActivityType = 'TRACE' | 'COLOR' | 'DRAW' | 'COUNT';

export interface PrintableActivity {
  id: string;
  type: PrintableActivityType;
  instruction: string;
  subject: string;
  colorHex?: string; // For coloring guides
  itemsToCount?: number;
}

export interface PrintableWorksheetData {
  title: string;
  activities: PrintableActivity[];
}