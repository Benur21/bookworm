/**
 * Generates a random letter using an algorithm suitable
 * to use in the game.
 * @param {{ [key: string]: number }} letterUsagePerc Object with a letter as the key
 * and the probability of it appearing as the value.
 */
const generateRandomLetter = (letterUsagePerc: { [key: string]: number }) => {
  // By using letterUsagePerc, the probabilty of each letter is proportional
  // to the number of times it appears in the dictionary.
  
  // Choose a decimal number between 0 and 100
  const choice = Math.floor(Math.random() * 100);
  
  let total = 0;
  let letter;
  for (letter in letterUsagePerc) {
    if (choice >= total && choice < total + letterUsagePerc[letter]) {
      break;
    }
    total += letterUsagePerc[letter];
  }
  
  return letter;
};

export default generateRandomLetter;
