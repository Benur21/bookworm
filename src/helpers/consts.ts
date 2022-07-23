
// letters are squares 60px by 60px, see also the css
export const letterSize = 60;

export const matrixSize = 4;

export enum Dicionary {
  PT,
  EN,
}
export const dictionaryLanguage: Dicionary = Dicionary.EN;

export enum Language {
  EN = 'en',
  PT = 'pt',
}
export const fallBackLang = Language.EN;

export const letters = "abcdefghijklmnopqrstuvwxyz";