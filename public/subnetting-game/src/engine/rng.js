/**
 * Tiny seedable PRNG (mulberry32). Used so challenge generation is deterministic
 * given a seed — required by the engine determinism guarantee and by tests.
 * @module engine/rng
 */

/**
 * Create a deterministic random function from a numeric seed.
 * @param {number} seed
 * @returns {() => number} a function returning a float in [0, 1)
 */
export function makeRng(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Integer in [min, max] inclusive from an rng.
 * @param {() => number} rng
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randInt(rng, min, max) {
  return min + Math.floor(rng() * (max - min + 1));
}
