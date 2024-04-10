
import { describe, expect, it } from '@jest/globals';
import randomWord from '../utils/randomWord.js';

describe('randomWord()', () => {
  it('Always return type of string as output', () => {
    const output = randomWord(list, 3, true);
    expect(typeof output).toBe('string');
  });

  it('If input length criteria is three: Output should return random word from list with three letters', () => {
    for (let i = 0; i < 4; i++) {
      const output = randomWord(list, 3, true);
      if (output != 'HUS' && output != 'NOD') {
        expect(output).toBe('BAS');
      } else if (output != 'BAS' && output != 'HUS') {
        expect(output).toBe('NOD');
      } else if (output != 'BAS' && output != 'NOD') {
        expect(output).toBe('HUS');
      }
    }
  });

  it('If uniqueletters input criteria is false: Output should return a random word that matches length criteria.', () => {
    for (let i = 0; i < 4; i++) {
      const output = randomWord(list, 5, false);
      if (output != 'AGENT' && output != 'CYKEL') {
        expect(output).toBe('HALLÅ');
      } else if (output != 'AGENT' && output != 'HALLÅ') {
        expect(output).toBe('CYKEL');
      } else if (output != 'CYKEL' && output != 'HALLÅ') {
        expect(output).toBe('AGENT');
      }
    }
  });

  it('If uniqueletters input criteria is true: Output should return a random word that matches length criteria and only has unique letters.', () => {
    for (let i = 0; i < 4; i++) {
      const output = randomWord(list, 5, true);
      if (output != 'CYKEL') {
        expect(output).toBe('AGENT');
      } else if (output != 'AGENT') {
        expect(output).toBe('CYKEL');
      }
    }
  });

  it('If there are no matching words for input parameters: Output should throw error with message', () => {
    const output = randomWord(list, 7, true)
    
    expect(output).toBe('');
  })

  it('If there are no words found on server: Output should throw error with message.', () => {
    const output = randomWord([],7, true)
    
    expect(output).toBe('');
  })

  it('If list input is undefined or not type of array: Output should throw error with message.', () => {
    const output = randomWord(undefined, 7, true)
    
    expect(output).toBe('');
    
  })

})

const list = ['BABBEL', 'CYKEL', 'HUS', 'HALLÅ', 'HUND', 'KATT', 'VARULV', 'BAS', 'te', 'KORRIDOR','AGGREGAT', 'ABBORRE', 'ADVOKAT', 'NOD', 'AGENT'];
