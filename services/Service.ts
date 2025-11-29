import { WorksheetData, QuestionType, PrintableWorksheetData, PrintableActivityType } from "../types";

// Helper to get random planet names for context
const getPlanetNames = () => ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

// Predefined worksheet content
const EASY_WORKSHEET: WorksheetData = {
  title: "Solar System Explorer - Easy",
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
    },
    {
      id: '3',
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Which planet is known as the 'Blue Planet'?",
      options: ["Earth", "Neptune", "Uranus", "Jupiter"],
      correctAnswer: "Earth"
    },
    {
      id: '4',
      type: QuestionType.FILL_BLANK,
      question: "The largest planet in our solar system is ______.",
      correctAnswer: "Jupiter"
    },
    {
      id: '5',
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Which planet has beautiful rings?",
      options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
      correctAnswer: "Saturn"
    }
  ]
};

const HARD_WORKSHEET: WorksheetData = {
  title: "Solar System Challenge - Hard",
  questions: [
    {
      id: '1',
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Which planet has the Great Red Spot?",
      options: ["Jupiter", "Saturn", "Mars", "Venus"],
      correctAnswer: "Jupiter"
    },
    {
      id: '2',
      type: QuestionType.FILL_BLANK,
      question: "The planet with the most extensive ring system is ______.",
      correctAnswer: "Saturn"
    },
    {
      id: '3',
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Which planet has the highest mountain in the solar system?",
      options: ["Mars", "Earth", "Venus", "Mercury"],
      correctAnswer: "Mars"
    },
    {
      id: '4',
      type: QuestionType.FILL_BLANK,
      question: "Venus is the hottest planet due to its thick ______ atmosphere.",
      correctAnswer: "carbon dioxide"
    },
    {
      id: '5',
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Which planet rotates on its side?",
      options: ["Uranus", "Neptune", "Saturn", "Jupiter"],
      correctAnswer: "Uranus"
    }
  ]
};

// Predefined fun facts for each planet
const PLANET_FUN_FACTS: Record<string, string[]> = {
  Mercury: [
    "Mercury is the smallest planet in our solar system!",
    "A year on Mercury is only 88 Earth days long!",
    "Mercury has no moons or rings around it."
  ],
  Venus: [
    "Venus is the hottest planet in our solar system!",
    "Venus rotates in the opposite direction of most planets!",
    "A day on Venus is longer than a year on Venus!"
  ],
  Earth: [
    "Earth is the only planet known to have life!",
    "Earth's atmosphere protects us from meteoroids!",
    "Our planet is mostly covered in water!"
  ],
  Mars: [
    "Mars is called the Red Planet because of its color!",
    "Mars has the largest volcano in the solar system!",
    "Scientists are looking for signs of life on Mars!"
  ],
  Jupiter: [
    "Jupiter is the largest planet in our solar system!",
    "Jupiter's Great Red Spot is a giant storm!",
    "Jupiter has at least 79 moons orbiting it!"
  ],
  Saturn: [
    "Saturn has beautiful rings made of ice and rock!",
    "Saturn is the lightest planet - it would float in water!",
    "Saturn's rings are thousands of miles wide but very thin!"
  ],
  Uranus: [
    "Uranus rotates on its side like a rolling ball!",
    "Uranus was the first planet discovered with a telescope!",
    "Uranus has 13 faint rings around it!"
  ],
  Neptune: [
    "Neptune has the strongest winds in the solar system!",
    "It takes Neptune 165 Earth years to orbit the Sun!",
    "Neptune was discovered through mathematical calculations!"
  ]
};

// Refined worksheet data with 8 separate worksheets
const PLANET_WORKSHEETS: Record<string, PrintableWorksheetData> = {
  MERCURY: {
    title: "Mercury Adventure",
    activities: [
      {
        id: 'mercury-trace',
        type: 'TRACE',
        instruction: 'Trace the name of the smallest planet',
        subject: 'MERCURY'
      },
      {
        id: 'mercury-color',
        type: 'COLOR',
        instruction: 'Color Mercury gray like the moon',
        subject: 'MERCURY',
        colorHex: '#6b7280'
      },
      {
        id: 'mercury-draw',
        type: 'DRAW',
        instruction: 'Draw craters on Mercury surface',
        subject: 'MERCURY'
      },
      {
        id: 'mercury-count',
        type: 'COUNT',
        instruction: 'Count Mercury moons (hint: zero!)',
        subject: 'MOONS',
        itemsToCount: 0
      }
    ]
  },
  VENUS: {
    title: "Venus Adventure",
    activities: [
      {
        id: 'venus-trace',
        type: 'TRACE',
        instruction: 'Trace the name of the hottest planet',
        subject: 'VENUS'
      },
      {
        id: 'venus-color',
        type: 'COLOR',
        instruction: 'Color Venus bright yellow',
        subject: 'VENUS',
        colorHex: '#fbbf24'
      },
      {
        id: 'venus-draw',
        type: 'DRAW',
        instruction: 'Draw thick clouds around Venus',
        subject: 'VENUS'
      },
      {
        id: 'venus-count',
        type: 'COUNT',
        instruction: 'Count Venus moons (hint: zero!)',
        subject: 'MOONS',
        itemsToCount: 0
      }
    ]
  },
  EARTH: {
    title: "Earth Adventure",
    activities: [
      {
        id: 'earth-trace',
        type: 'TRACE',
        instruction: 'Trace the name of our home planet',
        subject: 'EARTH'
      },
      {
        id: 'earth-color',
        type: 'COLOR',
        instruction: 'Color Earth with blue and green',
        subject: 'EARTH',
        colorHex: '#3b82f6'
      },
      {
        id: 'earth-draw',
        type: 'DRAW',
        instruction: 'Draw people living on Earth',
        subject: 'EARTH'
      },
      {
        id: 'earth-count',
        type: 'COUNT',
        instruction: 'Count Earth moons',
        subject: 'MOONS',
        itemsToCount: 1
      }
    ]
  },
  MARS: {
    title: "Mars Adventure",
    activities: [
      {
        id: 'mars-trace',
        type: 'TRACE',
        instruction: 'Trace the name of the Red Planet',
        subject: 'MARS'
      },
      {
        id: 'mars-color',
        type: 'COLOR',
        instruction: 'Color Mars rusty red',
        subject: 'MARS',
        colorHex: '#ef4444'
      },
      {
        id: 'mars-draw',
        type: 'DRAW',
        instruction: 'Draw a rover exploring Mars',
        subject: 'MARS'
      },
      {
        id: 'mars-count',
        type: 'COUNT',
        instruction: 'Count Mars moons',
        subject: 'MOONS',
        itemsToCount: 2
      }
    ]
  },
  JUPITER: {
    title: "Jupiter Adventure",
    activities: [
      {
        id: 'jupiter-trace',
        type: 'TRACE',
        instruction: 'Trace the name of the largest planet',
        subject: 'JUPITER'
      },
      {
        id: 'jupiter-color',
        type: 'COLOR',
        instruction: 'Color Jupiter with orange stripes',
        subject: 'JUPITER',
        colorHex: '#f59e0b'
      },
      {
        id: 'jupiter-draw',
        type: 'DRAW',
        instruction: 'Draw the Great Red Spot storm',
        subject: 'JUPITER'
      },
      {
        id: 'jupiter-count',
        type: 'COUNT',
        instruction: 'Count Jupiter moons (many!)',
        subject: 'MOONS',
        itemsToCount: 95
      }
    ]
  },
  SATURN: {
    title: "Saturn Adventure",
    activities: [
      {
        id: 'saturn-trace',
        type: 'TRACE',
        instruction: 'Trace the name of the ringed planet',
        subject: 'SATURN'
      },
      {
        id: 'saturn-color',
        type: 'COLOR',
        instruction: 'Color Saturn and its rings',
        subject: 'SATURN',
        colorHex: '#f59e0b'
      },
      {
        id: 'saturn-draw',
        type: 'DRAW',
        instruction: 'Draw beautiful rings around Saturn',
        subject: 'SATURN'
      },
      {
        id: 'saturn-count',
        type: 'COUNT',
        instruction: 'Count Saturn moons (so many!)',
        subject: 'MOONS',
        itemsToCount: 146
      }
    ]
  },
  URANUS: {
    title: "Uranus Adventure",
    activities: [
      {
        id: 'uranus-trace',
        type: 'TRACE',
        instruction: 'Trace the name of the sideways planet',
        subject: 'URANUS'
      },
      {
        id: 'uranus-color',
        type: 'COLOR',
        instruction: 'Color Uranus light blue',
        subject: 'URANUS',
        colorHex: '#a5f3fc'
      },
      {
        id: 'uranus-draw',
        type: 'DRAW',
        instruction: 'Draw Uranus spinning on its side',
        subject: 'URANUS'
      },
      {
        id: 'uranus-count',
        type: 'COUNT',
        instruction: 'Count Uranus moons',
        subject: 'MOONS',
        itemsToCount: 28
      }
    ]
  },
  NEPTUNE: {
    title: "Neptune Adventure",
    activities: [
      {
        id: 'neptune-trace',
        type: 'TRACE',
        instruction: 'Trace the name of the windiest planet',
        subject: 'NEPTUNE'
      },
      {
        id: 'neptune-color',
        type: 'COLOR',
        instruction: 'Color Neptune deep blue',
        subject: 'NEPTUNE',
        colorHex: '#3b82f6'
      },
      {
        id: 'neptune-draw',
        type: 'DRAW',
        instruction: 'Draw strong winds on Neptune',
        subject: 'NEPTUNE'
      },
      {
        id: 'neptune-count',
        type: 'COUNT',
        instruction: 'Count Neptune moons',
        subject: 'MOONS',
        itemsToCount: 16
      }
    ]
  }
};

export const generateWorksheet = async (difficulty: 'easy' | 'hard'): Promise<WorksheetData> => {
  // Simulate a small delay to mimic async operation
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return difficulty === 'hard' ? HARD_WORKSHEET : EASY_WORKSHEET;
};

export const generateMoreFunFacts = async (planetName: string): Promise<string> => {
  // Simulate a small delay
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const planetFacts = PLANET_FUN_FACTS[planetName] || 
    PLANET_FUN_FACTS[getPlanetNames()[Math.floor(Math.random() * getPlanetNames().length)]];
  
  const randomFact = planetFacts[Math.floor(Math.random() * planetFacts.length)];
  return randomFact || `${planetName} is a fascinating world in our solar system!`;
}

// Updated service function to return worksheets for specific planets
export const generateKindergartenWorksheet = async (planetName?: string): Promise<PrintableWorksheetData[]> => {
  // Simulate a small delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (planetName) {
    // Return specific planet worksheet
    const planetWorksheet = PLANET_WORKSHEETS[planetName.toUpperCase()];
    return planetWorksheet ? [planetWorksheet] : [PLANET_WORKSHEETS.MERCURY];
  }
  
  // Return all 8 planet worksheets
  return Object.values(PLANET_WORKSHEETS);
}