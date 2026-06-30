/**
 * Session: the single-challenge lifecycle plus aggregate statistics. It grades
 * via the engine, captures elapsed time passively (no timer pressure, FR-007),
 * and treats malformed input as a no-op (not a failed attempt).
 * @module game/session
 */
import { grade, explain, EngineError } from '../engine/index.js';

/**
 * @typedef {import('../engine/generate.js').Challenge} Challenge
 * @typedef {{ challengeId: string, conceptId: string, correct: boolean,
 *             elapsedMs: number, misconceptionTag?: string }} Attempt
 */

/**
 * @param {object} opts
 * @param {() => Challenge} opts.nextChallenge  Provider for the next challenge.
 * @param {() => number} [opts.now]  Clock (ms); defaults to a monotonic source.
 */
export function createSession({ nextChallenge, now = defaultNow }) {
  /** @type {Challenge | null} */
  let current = null;
  let shownAt = 0;
  /** @type {Attempt | null} */
  let lastAttempt = null;
  const stats = {
    totalAttempts: 0,
    correctCount: 0,
    accuracy: 0,
    /** @type {number[]} */ elapsedMsList: [],
    /** @type {Record<string, number>} */ mistakeCounts: {},
  };

  function refreshAccuracy() {
    stats.accuracy = stats.totalAttempts === 0 ? 0 : stats.correctCount / stats.totalAttempts;
  }

  return {
    start() {
      current = nextChallenge();
      shownAt = now();
    },
    advance() {
      current = nextChallenge();
      shownAt = now();
    },
    get current() {
      return current;
    },
    get stats() {
      return stats;
    },
    get lastAttempt() {
      return lastAttempt;
    },

    /**
     * Grade a submission against the current challenge.
     * @param {string} text
     * @returns {{ status: 'correct'|'incorrect'|'invalid', explanation?: import('../engine/generate.js').Explanation }}
     */
    submit(text) {
      if (!current) throw new Error('submit called before start');
      let result;
      try {
        result = grade(current, text);
      } catch (err) {
        if (err instanceof EngineError) return { status: 'invalid' };
        /* c8 ignore next 2 -- only EngineError is expected from grade */
        throw err;
      }
      const elapsedMs = now() - shownAt;
      const correctOption = (current.options ?? []).find((o) => o.label === text.trim());
      lastAttempt = {
        challengeId: current.id,
        conceptId: current.conceptId,
        correct: result.correct,
        elapsedMs,
        misconceptionTag: result.correct ? undefined : correctOption?.misconception,
      };
      stats.totalAttempts += 1;
      if (result.correct) stats.correctCount += 1;
      stats.elapsedMsList.push(elapsedMs);
      if (!result.correct && lastAttempt.misconceptionTag) {
        const tag = lastAttempt.misconceptionTag;
        stats.mistakeCounts[tag] = (stats.mistakeCounts[tag] ?? 0) + 1;
      }
      refreshAccuracy();
      return {
        status: result.correct ? 'correct' : 'incorrect',
        explanation: explain(current),
      };
    },
  };
}

/** Monotonic-ish clock that works in browser and Node. */
function defaultNow() {
  /* c8 ignore next -- environment-dependent; unit tests inject a clock */
  return typeof performance !== 'undefined' ? performance.now() : Date.now();
}
