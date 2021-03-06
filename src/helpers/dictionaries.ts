import { DictWords } from './types';
import { Dicionary, dictionaryLanguage } from './consts';
import normalize from './formulas/normalize';

/**
 * Loads, parses and returns the words from the dictionary
 */
const getWords = async () => {
  let raw: string = '';
  switch (dictionaryLanguage) {
    case Dicionary.PT:
      const { words_ptbr } = await import('../dictionaries/parsed/words_ptbr');
      raw = words_ptbr;
      break;
    case Dicionary.EN:
    default:
      const { words_en } = await import('../dictionaries/parsed/words_en');
      raw = words_en;
      break;
  }
  
  // remove empty lines in start and end and convert string to array
  const words = raw.trim().split('\n');
  
  let dict: DictWords = {};
  
  words.forEach(word => {
    dict[normalize(word)] = word;
  });
  
  return dict;
}

export default getWords;
