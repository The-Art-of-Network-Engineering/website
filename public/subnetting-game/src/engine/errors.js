/**
 * Error thrown by the engine for any invalid input. The engine never returns a
 * wrong or unverifiable value (Constitution Principle I); it throws instead.
 */
export class EngineError extends Error {
  /** @param {string} message */
  constructor(message) {
    super(message);
    this.name = 'EngineError';
  }
}

/** Number of bits in an IPv4 address. */
export const ADDRESS_BITS = 32;
/** Maximum IPv4 address value as an unsigned 32-bit integer. */
export const MAX_UINT32 = 0xffffffff;
/** Largest valid octet value. */
export const MAX_OCTET = 255;
/** Number of octets in an IPv4 address. */
export const OCTET_COUNT = 4;
