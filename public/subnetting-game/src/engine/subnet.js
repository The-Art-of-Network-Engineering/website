/**
 * Core subnet computation: network/broadcast/host ranges, usable counts, VLSM,
 * and supernetting. Pure functions over 32-bit integers.
 * @module engine/subnet
 */
import { EngineError, ADDRESS_BITS, MAX_UINT32 } from './errors.js';
import {
  parseAddress,
  formatAddress,
  prefixToMask,
  prefixToMaskInt,
  assertPrefix,
} from './address.js';
import { usableHostsForPrefix, hasNetworkAndBroadcast } from './special-cases.js';

/**
 * @typedef {object} SubnetInfo
 * @property {string} network
 * @property {string|null} broadcast  Null for /31 and /32.
 * @property {string|null} firstHost
 * @property {string|null} lastHost
 * @property {number} usableHosts
 * @property {number} totalAddresses
 * @property {number} prefix
 * @property {string} mask
 */

/**
 * Total addresses in a block of the given prefix.
 * @param {number} prefix
 * @returns {number}
 */
export function totalAddresses(prefix) {
  assertPrefix(prefix);
  return Math.pow(2, ADDRESS_BITS - prefix);
}

/**
 * Usable host count for a prefix (with /31, /32 exceptions).
 * @param {number} prefix
 * @returns {number}
 */
export function usableHosts(prefix) {
  assertPrefix(prefix);
  return usableHostsForPrefix(prefix);
}

/**
 * Full subnet computation for an address within a prefix.
 * @param {string} addr dotted-decimal
 * @param {number} prefix
 * @returns {SubnetInfo}
 */
export function subnetInfo(addr, prefix) {
  assertPrefix(prefix);
  const ip = parseAddress(addr);
  const maskInt = prefixToMaskInt(prefix);
  const networkInt = (ip & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;

  if (!hasNetworkAndBroadcast(prefix)) {
    // /31: both addresses usable; /32: single host. No network/broadcast.
    const last = prefix === ADDRESS_BITS ? networkInt : broadcastInt;
    return {
      network: formatAddress(networkInt),
      broadcast: null,
      firstHost: formatAddress(networkInt),
      lastHost: formatAddress(last),
      usableHosts: usableHostsForPrefix(prefix),
      totalAddresses: totalAddresses(prefix),
      prefix,
      mask: prefixToMask(prefix),
    };
  }

  const firstHostInt = (networkInt + 1) >>> 0;
  const lastHostInt = (broadcastInt - 1) >>> 0;
  return {
    network: formatAddress(networkInt),
    broadcast: formatAddress(broadcastInt),
    firstHost: formatAddress(firstHostInt),
    lastHost: formatAddress(lastHostInt),
    usableHosts: usableHostsForPrefix(prefix),
    totalAddresses: totalAddresses(prefix),
    prefix,
    mask: prefixToMask(prefix),
  };
}

/**
 * Smallest prefix whose usable-host capacity satisfies a host requirement.
 * @param {number} hosts required usable hosts (>0)
 * @returns {number} prefix
 */
export function prefixForHosts(hosts) {
  if (!Number.isInteger(hosts) || hosts <= 0) {
    throw new EngineError(`Host requirement must be a positive integer: ${hosts}`);
  }
  if (hosts > usableHostsForPrefix(0)) {
    throw new EngineError(`No prefix can satisfy ${hosts} hosts`);
  }
  // Widen from /32 until the block's usable capacity covers the requirement.
  // Terminates at /0 at the latest (guarded above).
  let prefix = ADDRESS_BITS;
  while (usableHostsForPrefix(prefix) < hosts) {
    prefix -= 1;
  }
  return prefix;
}

/**
 * Allocate VLSM subnets for a list of host requirements within a base block.
 * Largest requirement first, packed from the base address.
 * @param {string} base dotted-decimal base network
 * @param {number} basePrefix
 * @param {number[]} hostReqs
 * @returns {SubnetInfo[]}
 */
export function vlsmAllocate(base, basePrefix, hostReqs) {
  assertPrefix(basePrefix);
  if (!Array.isArray(hostReqs) || hostReqs.length === 0) {
    throw new EngineError('hostReqs must be a non-empty array');
  }
  const baseInfo = subnetInfo(base, basePrefix);
  const baseStart = parseAddress(baseInfo.network);
  const baseEnd = (baseStart + totalAddresses(basePrefix) - 1) >>> 0;

  const ordered = [...hostReqs].sort((a, b) => b - a);
  /** @type {SubnetInfo[]} */
  const result = [];
  let cursor = baseStart;
  for (const req of ordered) {
    const prefix = prefixForHosts(req);
    const size = totalAddresses(prefix);
    // Align cursor to this subnet's boundary.
    const aligned = (Math.ceil(cursor / size) * size) >>> 0;
    const end = aligned + size - 1;
    if (end > baseEnd) {
      throw new EngineError(`VLSM requests do not fit in ${base}/${basePrefix}`);
    }
    result.push(subnetInfo(formatAddress(aligned), prefix));
    cursor = aligned + size;
  }
  return result;
}

/**
 * Aggregate a list of networks into the smallest single covering block.
 * @param {{addr: string, prefix: number}[]} networks
 * @returns {{addr: string, prefix: number}}
 */
export function supernet(networks) {
  if (!Array.isArray(networks) || networks.length === 0) {
    throw new EngineError('supernet requires a non-empty list of networks');
  }
  let lo = MAX_UINT32;
  let hi = 0;
  for (const n of networks) {
    const info = subnetInfo(n.addr, n.prefix);
    const start = parseAddress(info.network);
    const end = (start + totalAddresses(n.prefix) - 1) >>> 0;
    if (start < lo) lo = start;
    if (end > hi) hi = end;
  }
  // Find the smallest prefix whose block contains [lo, hi]. The block start is
  // `lo & mask`, which is always <= lo, so we only need to test the high end.
  // Widen until the block covers hi; /0 covers everything, so this terminates.
  const blockEnd = /** @param {number} prefix */ (prefix) =>
    (((lo & prefixToMaskInt(prefix)) >>> 0) | (~prefixToMaskInt(prefix) >>> 0)) >>> 0;
  let prefix = ADDRESS_BITS;
  while (hi > blockEnd(prefix)) {
    prefix -= 1;
  }
  const blockStart = (lo & prefixToMaskInt(prefix)) >>> 0;
  return { addr: formatAddress(blockStart), prefix };
}
