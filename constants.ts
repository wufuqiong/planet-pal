import { Planet } from './types';

export const PLANETS: Planet[] = [
  {
    id: 1,
    name: 'Mercury',
    chineseName: '水星',
    color: 'radial-gradient(circle at 30% 30%, #a1a1aa, #52525b)', // Zinc/Grey
    description: 'The smallest planet in our solar system and closest to the Sun.',
    funFact: 'Mercury shrinks as it cools down over time!',
  },
  {
    id: 2,
    name: 'Venus',
    chineseName: '金星',
    color: 'radial-gradient(circle at 30% 30%, #fde047, #ca8a04)', // Yellow/Orange
    description: 'The hottest planet in our solar system.',
    funFact: 'Venus spins in the opposite direction to most other planets.',
  },
  {
    id: 3,
    name: 'Earth',
    chineseName: '地球',
    color: 'radial-gradient(circle at 30% 30%, #60a5fa, #1d4ed8, #15803d)', // Blue/Green
    description: 'Our home planet and the only known place with life.',
    funFact: 'Earth is not a perfect sphere; it bulges at the equator.',
  },
  {
    id: 4,
    name: 'Mars',
    chineseName: '火星',
    color: 'radial-gradient(circle at 30% 30%, #ef4444, #991b1b)', // Red
    description: 'Known as the Red Planet due to iron oxide rust on its surface.',
    funFact: 'Mars has the largest volcano in the solar system, Olympus Mons.',
  },
  {
    id: 5,
    name: 'Jupiter',
    chineseName: '木星',
    color: 'radial-gradient(circle at 30% 30%, #d4d4d8, #d97706, #78350f)', // Striped Brown/Orange
    description: 'The largest planet in the solar system.',
    funFact: 'The Great Red Spot is a storm that has been raging for centuries.',
  },
  {
    id: 6,
    name: 'Saturn',
    chineseName: '土星',
    color: 'radial-gradient(circle at 30% 30%, #fcd34d, #b45309)', // Gold
    description: 'Famous for its beautiful and complex ring system.',
    funFact: 'Saturn is the only planet that could float in water (if you had a big enough tub).',
  },
  {
    id: 7,
    name: 'Uranus',
    chineseName: '天王星',
    color: 'radial-gradient(circle at 30% 30%, #a5f3fc, #0891b2)', // Cyan
    description: 'An ice giant that spins on its side.',
    funFact: 'Uranus is the coldest planet in the solar system.',
  },
  {
    id: 8,
    name: 'Neptune',
    chineseName: '海王星',
    color: 'radial-gradient(circle at 30% 30%, #3b82f6, #1e3a8a)', // Deep Blue
    description: 'The windiest planet, located furthest from the Sun.',
    funFact: 'A year on Neptune lasts 165 Earth years!',
  },
];
