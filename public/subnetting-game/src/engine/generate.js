/**
 * Challenge generation and grading. Every challenge is produced and validated by
 * the engine (Constitution Principle I, FR-001/FR-013). Distractors model named
 * misconceptions, never random noise (FR-017).
 * @module engine/generate
 */
import { EngineError } from './errors.js';
import { formatAddress, prefixToMask, canonicalize } from './address.js';
import { subnetInfo } from './subnet.js';
import { randInt } from './rng.js';

/**
 * @typedef {import('./address.js').AnswerKind} AnswerKind
 * @typedef {{ kind: AnswerKind, canonical: string }} AnswerSpec
 * @typedef {{ steps: string[], result: string }} Explanation
 * @typedef {{ label: string, isCorrect: boolean, misconception?: string }} Option
 * @typedef {{ label: string, misconception: string }} DistractorCandidate
 * @typedef {{ prompt: string, answer: AnswerSpec, acceptedFormats: string[],
 *             explanation: Explanation, distractors: DistractorCandidate[] }} RawChallenge
 * @typedef {{ id: string, conceptId: string, tierId: string, prompt: string,
 *             entryMode: 'mc'|'free-text', answer: AnswerSpec, acceptedFormats: string[],
 *             explanation: Explanation, options?: Option[] }} Challenge
 */

const DISTRACTOR_COUNT = 3;

/**
 * Generate a single engine-validated challenge.
 * @param {string} conceptId
 * @param {string} tierId
 * @param {'mc'|'free-text'} entryMode
 * @param {() => number} rng
 * @returns {Challenge}
 */
export function generateChallenge(conceptId, tierId, entryMode, rng) {
  const generator = GENERATORS[conceptId];
  if (!generator) throw new EngineError(`Unknown concept: "${conceptId}"`);
  const raw = generator(rng);

  /** @type {Challenge} */
  const challenge = {
    id: `${conceptId}:${entryMode}:${raw.answer.canonical}`,
    conceptId,
    tierId,
    prompt: raw.prompt,
    entryMode,
    answer: raw.answer,
    acceptedFormats: raw.acceptedFormats,
    explanation: raw.explanation,
  };

  if (entryMode === 'mc') {
    challenge.options = buildOptions(raw, rng);
  }

  // Self-validation: the engine must be able to grade its own answer correct.
  const check = grade(challenge, raw.answer.canonical);
  /* c8 ignore next 3 -- defensive: a generator that produced an ungradeable answer is a bug */
  if (!check.correct) {
    throw new EngineError(`Generated challenge failed self-validation: ${challenge.id}`);
  }
  return challenge;
}

/**
 * Build multiple-choice options: the correct answer plus misconception-modeled,
 * verified-incorrect, distinct distractors. Shuffled deterministically.
 * @param {RawChallenge} raw
 * @param {() => number} rng
 * @returns {Option[]}
 */
function buildOptions(raw, rng) {
  const kind = raw.answer.kind;
  const correctLabel = raw.answer.canonical;
  const wantC = canonicalize(kind, correctLabel);
  const seen = new Set([correctLabel]);
  /** @type {Option[]} */
  const distractors = [];

  const consider = (/** @type {DistractorCandidate} */ d) => {
    if (distractors.length >= DISTRACTOR_COUNT || seen.has(d.label)) return;
    let c;
    /* c8 ignore start -- defensive: generators only emit valid, non-colliding distractors */
    try {
      c = canonicalize(kind, d.label);
    } catch {
      return;
    }
    if (c === wantC) return; // not actually wrong
    /* c8 ignore stop */
    seen.add(d.label);
    distractors.push({ label: d.label, isCorrect: false, misconception: d.misconception });
  };

  raw.distractors.forEach(consider);
  // Top up with generic perturbations if the concept gave too few.
  makeDistractors(raw.answer, DISTRACTOR_COUNT).forEach((d) =>
    consider({ label: d.label, misconception: /** @type {string} */ (d.misconception) })
  );

  /** @type {Option[]} */
  const options = [{ label: correctLabel, isCorrect: true }, ...distractors];
  shuffle(options, rng);
  return options;
}

/**
 * Generic, engine-derived distractors that model common errors. Each is verified
 * to grade incorrect and to be distinct.
 * @param {AnswerSpec} answer
 * @param {number} count
 * @returns {Option[]}
 */
export function makeDistractors(answer, count) {
  const { kind, canonical } = answer;
  const wantC = canonicalize(kind, canonical);
  /** @type {Option[]} */
  const out = [];
  const seen = new Set([canonical]);
  const push = (/** @type {string} */ label, /** @type {string} */ misconception) => {
    if (out.length >= count || seen.has(label)) return;
    let c;
    /* c8 ignore start -- defensive: perturbations are always valid and non-colliding */
    try {
      c = canonicalize(kind, label);
    } catch {
      return;
    }
    if (c === wantC) return;
    /* c8 ignore stop */
    seen.add(label);
    out.push({ label, isCorrect: false, misconception });
  };

  if (kind === 'count') {
    const n = Number(canonical);
    push(String(n + 2), 'forgot-minus-2');
    push(String(Math.max(0, n - 2)), 'extra-minus-2');
    push(String(n + 1), 'off-by-one');
    push(String(Math.max(0, n - 1)), 'off-by-one');
    push(String(n * 2), 'doubled');
  } else if (kind === 'mask') {
    const p = /** @type {number} */ (wantC);
    for (const dp of [p + 1, p - 1, p + 2, p - 2]) {
      if (dp >= 0 && dp <= 32) push(prefixToMask(dp), 'adjacent-prefix');
    }
  } else {
    // address (range distractors are not used in v1 MC challenges)
    const base = /** @type {number} */ (wantC);
    push(formatAddress((base + 1) >>> 0), 'off-by-one');
    push(formatAddress((base - 1) >>> 0), 'off-by-one');
    push(formatAddress((base ^ 0x100) >>> 0), 'wrong-octet');
    push(formatAddress((base ^ 0x10000) >>> 0), 'wrong-octet');
  }
  return out.slice(0, count);
}

/**
 * Grade a learner submission. Multiple-choice: the submission is an option label.
 * Free-text: the submission is normalized; malformed input throws (the caller
 * treats it as a no-op), a parseable-but-wrong value grades incorrect.
 * @param {Challenge} challenge
 * @param {string} submitted
 * @returns {{ correct: boolean, normalized: string }}
 */
export function grade(challenge, submitted) {
  const text = String(submitted).trim();
  if (challenge.entryMode === 'mc') {
    const option = (challenge.options ?? []).find((o) => o.label === text);
    if (!option) throw new EngineError(`Not a valid option: "${submitted}"`);
    return { correct: option.isCorrect, normalized: option.label };
  }
  const kind = challenge.answer.kind;
  const want = canonicalize(kind, challenge.answer.canonical);
  let got;
  try {
    got = canonicalize(kind, text);
  } catch {
    throw new EngineError(`Malformed answer: "${submitted}"`);
  }
  return { correct: got === want, normalized: text };
}

/**
 * The step-by-step derivation for a challenge.
 * @param {Challenge} challenge
 * @returns {Explanation}
 */
export function explain(challenge) {
  return challenge.explanation;
}

/**
 * Shuffle an array in place (Fisher–Yates) using a seeded rng.
 * @template T
 * @param {T[]} arr
 * @param {() => number} rng
 */
function shuffle(arr, rng) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = randInt(rng, 0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ---------------------------------------------------------------------------
// Concept generators. Each returns a RawChallenge with misconception-tagged
// distractor candidates. Add new concepts here (US2 adds host-count, VLSM,
// supernetting).
// ---------------------------------------------------------------------------

/** @param {() => number} rng @returns {RawChallenge} */
function genBinaryDecimal(rng) {
  const value = randInt(rng, 1, 254);
  const bin = value.toString(2).padStart(8, '0');
  const places = [128, 64, 32, 16, 8, 4, 2, 1];
  const setBits = places.filter((_, i) => bin[i] === '1');
  const steps = [
    `Each bit position is a power of two: ${places.join(', ')}.`,
    `The bits set to 1 are worth: ${setBits.join(' + ')}.`,
    `Adding those gives ${value}.`,
  ];
  /** @type {DistractorCandidate[]} */
  const distractors = [
    { label: String((value + 1) & 0xff), misconception: 'off-by-one' },
    { label: String((value * 2) & 0xff), misconception: 'shift-error' },
    { label: String(value ^ 1), misconception: 'bit-flip' },
    { label: String(value ^ 2), misconception: 'bit-flip' },
  ];
  return {
    prompt: `What is the decimal value of the 8-bit binary number ${bin}?`,
    answer: { kind: 'count', canonical: String(value) },
    acceptedFormats: [String(value)],
    explanation: { steps, result: String(value) },
    distractors,
  };
}

/** @param {() => number} rng @returns {RawChallenge} */
function genMaskCidr(rng) {
  const prefix = randInt(rng, 8, 30);
  const mask = prefixToMask(prefix);
  const steps = [
    `A /${prefix} sets the first ${prefix} bits to 1 (network) and the rest to 0 (host).`,
    `Writing ${prefix} ones from the left and grouping into four octets...`,
    `...gives the mask ${mask}.`,
  ];
  /** @type {DistractorCandidate[]} */
  const distractors = [prefix - 1, prefix + 1, prefix - 2, prefix + 2]
    .filter((p) => p >= 1 && p <= 32 && p !== prefix)
    .map((p) => ({ label: prefixToMask(p), misconception: 'adjacent-prefix' }));
  return {
    prompt: `What is the dotted-decimal subnet mask for /${prefix}?`,
    answer: { kind: 'mask', canonical: mask },
    acceptedFormats: [mask, `/${prefix}`, String(prefix)],
    explanation: { steps, result: mask },
    distractors,
  };
}

/** @param {() => number} rng @returns {RawChallenge} */
function genNetworkBroadcast(rng) {
  const prefix = randInt(rng, 24, 30);
  const addr = `${randInt(rng, 1, 223)}.${randInt(rng, 0, 255)}.${randInt(rng, 0, 255)}.${randInt(rng, 0, 255)}`;
  const info = subnetInfo(addr, prefix);
  const askNetwork = rng() < 0.5;
  const canonical = /** @type {string} */ (askNetwork ? info.network : info.broadcast);
  const what = askNetwork ? 'network address' : 'broadcast address';
  const steps = askNetwork
    ? [
        `The mask for /${prefix} is ${info.mask}.`,
        `Keep the network bits of ${addr} and set every host bit to 0.`,
        `The network address is ${info.network}.`,
      ]
    : [
        `The mask for /${prefix} is ${info.mask}.`,
        `Keep the network bits of ${addr} and set every host bit to 1.`,
        `The broadcast address is ${info.broadcast}.`,
      ];
  /** @type {DistractorCandidate[]} */
  const distractors = [
    {
      label: /** @type {string} */ (askNetwork ? info.broadcast : info.network),
      misconception: 'network-broadcast-swap',
    },
    { label: /** @type {string} */ (info.firstHost), misconception: 'off-by-one' },
    { label: /** @type {string} */ (info.lastHost), misconception: 'off-by-one' },
  ];
  return {
    prompt: `For the host ${addr}/${prefix}, what is the ${what}?`,
    answer: { kind: 'address', canonical },
    acceptedFormats: [canonical],
    explanation: { steps, result: canonical },
    distractors,
  };
}

/** @type {Record<string, (rng: () => number) => RawChallenge>} */
const GENERATORS = {
  'binary-decimal': genBinaryDecimal,
  'mask-cidr': genMaskCidr,
  'network-broadcast': genNetworkBroadcast,
};
