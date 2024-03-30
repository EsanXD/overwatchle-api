import { Injectable } from '@nestjs/common';
import { abilities } from './abilities';
const seedrandom = require('seedrandom');

@Injectable()
export class AppService {
  getDaily(): string {
    const currentDate = new Date();
    const seed = currentDate.toISOString().split('T')[0]; // Use the date portion as the seed
    const indexes: number[] = generateRandomIndexes(seed, abilities.length);
    const dailyAbilities = indexes.map((index) => abilities[index]);
    return btoa(btoa(btoa(JSON.stringify(dailyAbilities).toLowerCase())));
    // return JSON.stringify(dailyAbilities).toLowerCase();
  }
}

const generateRandomIndexes = (seed, length): number[] => {
  const rng = seedrandom(seed);
  const indexes = new Set<number>();
  while (indexes.size < 3) {
    const index = Math.floor((rng() * 10000000) % length);
    indexes.add(index);
  }
  return Array.from(indexes);
};
