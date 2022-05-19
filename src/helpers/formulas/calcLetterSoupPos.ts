import { letterSize, matrixSize } from "../consts";

/**
 * Calculates the position of the letter soup.
 * 
 * Just to centralize the formula.
 */
const calcLetterSoupPos = () => {
  return window.innerWidth / 2 - (letterSize * matrixSize) / 2;
};

export default calcLetterSoupPos;
