import repeat from "./repeat";

/**
 * Clears all timeouts created by delays. Use in the return function of useEffect.
 */
 const clearAllTimeouts = () => {
  repeat(Number(setTimeout(() => {}, 0))+1, (n: number) =>{clearTimeout(n)});
};

export default clearAllTimeouts;
