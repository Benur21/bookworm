/**
 * Repeats a function in a loop n times.
 * @param {number} n Number of times to loop fn
 * @param {number} fn Function to run over and over; receives the current index
 * as param (0 to n-1)
 */
const repeat = (n: number, fn: Function) => {
  for (let i = 0; i < n; i++) {
    fn(i);
  }
};

export default repeat;
