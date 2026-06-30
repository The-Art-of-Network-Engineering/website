/**
 * Special-case host logic for /31 point-to-point links (RFC 3021) and /32 host
 * routes. Kept separate so the rules are explicit and individually testable.
 * @module engine/special-cases
 */
import { ADDRESS_BITS } from './errors.js';

/** Prefix for a point-to-point link (RFC 3021). */
export const SLASH_31 = 31;
/** Prefix for a host route. */
export const SLASH_32 = 32;

/**
 * Usable host count for a prefix, including the documented exceptions:
 * /31 -> 2 (both addresses usable, no network/broadcast), /32 -> 1.
 * Assumes the prefix has already been validated.
 * @param {number} prefix
 * @returns {number}
 */
export function usableHostsForPrefix(prefix) {
  if (prefix === SLASH_32) return 1;
  if (prefix === SLASH_31) return 2;
  const hostBits = ADDRESS_BITS - prefix;
  return Math.pow(2, hostBits) - 2;
}

/**
 * Whether a prefix has distinct network and broadcast addresses.
 * @param {number} prefix
 * @returns {boolean}
 */
export function hasNetworkAndBroadcast(prefix) {
  return prefix !== SLASH_31 && prefix !== SLASH_32;
}
