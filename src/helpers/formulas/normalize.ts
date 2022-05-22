/**
 * Converts a string with accents, etc, to one with no accents and lower case.
 * https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript#37511463
 */
const normalize = (str: string) => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export default normalize;
