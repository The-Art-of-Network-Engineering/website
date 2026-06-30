/**
 * Declarative learning content: ordered concepts, their lessons, and (in US2)
 * their tier grouping. Keeping this data-driven guarantees a lesson precedes the
 * first challenge of every concept (FR-020) and that difficulty is predictable.
 * @module game/content
 */

/**
 * @typedef {{ id: string, title: string, body: string }} Lesson
 */

/** Ordered concept ids taught in tier 1 (US1 scope). */
export const TIER1_CONCEPTS = ['binary-decimal', 'mask-cidr', 'network-broadcast'];

/** @type {Record<string, Lesson>} */
export const LESSONS = {
  'binary-decimal': {
    id: 'binary-decimal',
    title: 'Binary and decimal',
    body:
      'An IPv4 address is four numbers (octets), each 8 bits. Each bit is a power of two: ' +
      '128, 64, 32, 16, 8, 4, 2, 1. Add the values of the bits set to 1 to get the decimal ' +
      'number. For example, 11000000 = 128 + 64 = 192.',
  },
  'mask-cidr': {
    id: 'mask-cidr',
    title: 'Masks and CIDR notation',
    body:
      'A subnet mask marks which bits are the network (1s) and which are the host (0s). ' +
      'CIDR notation writes the count of network bits after a slash: /24 means 24 network ' +
      'bits, which is the mask 255.255.255.0.',
  },
  'network-broadcast': {
    id: 'network-broadcast',
    title: 'Network and broadcast addresses',
    body:
      'Within a subnet, the network address has every host bit set to 0, and the broadcast ' +
      'address has every host bit set to 1. The usable host addresses are everything in ' +
      'between.',
  },
};

/**
 * Look up the lesson for a concept.
 * @param {string} conceptId
 * @returns {Lesson}
 */
export function getLesson(conceptId) {
  const lesson = LESSONS[conceptId];
  /* c8 ignore next -- every concept in the sequence has a lesson by construction */
  if (!lesson) throw new Error(`No lesson for concept "${conceptId}"`);
  return lesson;
}
