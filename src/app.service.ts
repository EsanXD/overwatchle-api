import { Injectable } from '@nestjs/common';
import { abilities } from './abilities';
const seedrandom = require('seedrandom');
const { DateTime } = require('luxon');

@Injectable()
export class AppService {
  getDaily(date: string): string {
    // seed will be date in format 'dd/mm/yyyy'
    console.log(date);
    const indexes: number[] = generateRandomIndexes(date, abilities.length);
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
