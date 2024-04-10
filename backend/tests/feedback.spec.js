
import {describe, expect, it} from '@jest/globals'
import feedback from '../utils/feedback.js';

describe('feedback()', () => {
 
  it('If guess input is empty: return empty array', () => {
    const output = feedback('', 'WORD');
    expect(output).toEqual([]);
  })

  it('If guess is a number: return empty array', () => {
    const output = feedback(1, 'WORD');
    expect(output).toEqual([]);
  })

  it('If guess is a string that contains a number: return empty array', () => {
    const output = feedback('1', 'WORD');
    expect(output).toEqual([]);
  })

  it('If guess is neither number or string: return empty array', () => {
    const output = feedback(true, 'WORD');
    expect(output).toEqual([]);
  })

  it('If guess or answer are not capitalized: Make them capitalized.', () => {
    const output = feedback('sHelf', 'SHeLF');
    expect(output).toEqual([
    {letter:'S', result:'correct'},
    {letter:'H', result:'correct'},
    {letter:'E', result:'correct'},
    {letter:'L', result:'correct'},
    {letter:'F', result:'correct'}
  ])
  })

  it('If guess and answer are same: return array of objects containing attributes of each letter and result as correct', () => {
    const output = feedback('WORD', 'WORD')
    expect(output).toEqual([
      {letter:'W', result:'correct'},
      {letter:'O', result:'correct'},
      {letter:'R', result:'correct'},
      {letter:'D', result:'correct'}
    ])
  })

  it('If guess has no letters correct: return array of objects containing attributes of each letter and result as incorrect', () => {
    const output = feedback('DUCKS', 'ALIEN');
    expect(output).toEqual([
      {letter:'D', result:'incorrect'},
      {letter:'U', result:'incorrect'},
      {letter:'C', result:'incorrect'},
      {letter:'K', result:'incorrect'},
      {letter:'S', result:'incorrect'}
    ]);
  })

  it('If some of the letters in guess word are correct but in wrong place: return that letters result as misplaced', () => {
    const output = feedback('ALIEN', 'MILAN');
    expect(output).toEqual([
      {letter:'A', result:'misplaced'},
      {letter:'L', result:'misplaced'},
      {letter:'I', result:'misplaced'},
      {letter:'E', result:'incorrect'},
      {letter:'N', result:'correct'}
    ]);
  });

  it('If letter has already been identified as correct and there are no more of that letter in answer but multiple in guess: make that letters result incorrect', () => {
    const output = feedback('HALLÅ', 'CYKLA');
    expect(output).toEqual([
      {letter:'H', result:'incorrect'},
      {letter:'A', result:'misplaced'},
      {letter:'L', result:'incorrect'},
      {letter:'L', result:'correct'},
      {letter:'Å', result:'incorrect'}
    ]);
  });
})