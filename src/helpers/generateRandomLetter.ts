import { letters } from "./consts";

/**
 * Generates a random letter using an algorithm suitable
 * to use in the game
 */
const generateRandomLetter = () => {
  return letters[Math.floor(Math.random() * letters.length)];
}

export default generateRandomLetter;
