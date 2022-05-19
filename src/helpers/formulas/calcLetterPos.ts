import { letterSize } from "../consts";

/**
 * Calculates the position of a letter given the starting position and the index.
 * 
 * Just to centralize the formula.
 * @param {number} startingPos Starting position coordinate
 * @param {number} posIndex Index of position
 */
const calcLetterPos = (startingPos: number, posIndex: number) => {
  return startingPos + (letterSize) * posIndex;
};

export default calcLetterPos;
