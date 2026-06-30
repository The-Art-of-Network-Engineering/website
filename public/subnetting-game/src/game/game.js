/**
 * Game controller: drives the lesson → challenge → feedback loop, sequences
 * concepts, and applies per-concept answer scaffolding (multiple choice to
 * introduce a concept, free-text to master it — FR-017). It owns no rendering
 * and no DOM; the UI layer reads its state and calls its methods.
 * @module game/game
 */
import { generateChallenge } from '../engine/index.js';
import { createSession } from './session.js';
import { TIER1_CONCEPTS, getLesson } from './content.js';

/**
 * @typedef {import('../engine/generate.js').Challenge} Challenge
 * @typedef {'lesson'|'challenge'|'feedback'} GameState
 */

const DEFAULT_CHALLENGES_PER_CONCEPT = 4;

/**
 * @param {object} opts
 * @param {() => number} opts.rng  Seeded random source for generation.
 * @param {() => number} [opts.now]  Clock for passive speed measurement.
 * @param {string[]} [opts.concepts]  Ordered concept ids (defaults to tier 1).
 * @param {number} [opts.challengesPerConcept]
 */
export function createGame({
  rng,
  now,
  concepts = TIER1_CONCEPTS,
  challengesPerConcept = DEFAULT_CHALLENGES_PER_CONCEPT,
}) {
  let conceptIndex = 0;
  let challengeInConcept = 0;
  /** @type {GameState} */
  let state = 'lesson';
  /** @type {import('./content.js').Lesson} */
  let currentLesson = getLesson(concepts[0]);
  /** @type {{ status: 'correct'|'incorrect', correctAnswer: string, explanation: import('../engine/generate.js').Explanation } | null} */
  let lastResult = null;

  const currentConcept = () => concepts[conceptIndex % concepts.length];
  /** @param {number} idx @returns {'mc'|'free-text'} */
  const entryModeFor = (idx) => (idx === 0 ? 'mc' : 'free-text');

  const session = createSession({
    nextChallenge: () =>
      generateChallenge(currentConcept(), 'tier-1', entryModeFor(challengeInConcept), rng),
    ...(now ? { now } : {}),
  });

  return {
    get state() {
      return state;
    },
    get currentLesson() {
      return currentLesson;
    },
    get currentChallenge() {
      return session.current;
    },
    get lastResult() {
      return lastResult;
    },
    get stats() {
      return session.stats;
    },

    /** Begin practice for the current concept (lesson → first challenge). */
    startPractice() {
      challengeInConcept = 0;
      session.start();
      state = 'challenge';
    },

    /**
     * Submit an answer. Malformed input is a no-op that keeps the challenge on
     * screen; otherwise we move to feedback.
     * @param {string} text
     * @returns {'correct'|'incorrect'|'invalid'}
     */
    submit(text) {
      const res = session.submit(text);
      if (res.status === 'invalid') return 'invalid';
      lastResult = {
        status: res.status,
        correctAnswer: /** @type {import('../engine/generate.js').Explanation} */ (res.explanation)
          .result,
        explanation: /** @type {import('../engine/generate.js').Explanation} */ (res.explanation),
      };
      state = 'feedback';
      return res.status;
    },

    /** Advance from feedback to the next challenge, or to the next concept's lesson. */
    next() {
      challengeInConcept += 1;
      if (challengeInConcept >= challengesPerConcept) {
        conceptIndex += 1;
        challengeInConcept = 0;
        currentLesson = getLesson(currentConcept());
        state = 'lesson';
      } else {
        session.advance();
        state = 'challenge';
      }
    },
  };
}
