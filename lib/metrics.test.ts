import { describe, it, expect } from 'vitest';
import raw from '@/data/metrics.json';
import { metrics } from './metrics';

/**
 * Anti-drift guard (spec: audience-data-everywhere, "No-drift enforcement").
 *
 * This used to assert literals: `expect(raw.manual.linkedin_followers).toBe(8690)`.
 * Those numbers are now collected live and written by the automated sync, so the test
 * failed the moment LinkedIn grew, and a red build caused by ordinary growth is a build
 * everyone learns to ignore.
 *
 * What it protects is the RELATIONSHIP: the number the site renders is the number in the
 * canonical file, whatever that number is today. Whether the canonical number is TRUE is
 * a separate job, already done by the probes that go and ask LinkedIn directly.
 */
const fmt = (n: number) => n.toLocaleString('en-US');

describe('the site renders the canonical numbers, whatever they are', () => {
  it('every social figure the site shows comes from data/metrics.json', () => {
    expect(metrics.xFollowers).toBe(fmt(raw.manual.x_followers));
    expect(metrics.linkedinFollowers).toBe(fmt(raw.manual.linkedin_followers));
    expect(metrics.tiktokFollowers).toBe(fmt(raw.manual.tiktok_followers));
    expect(metrics.instagramFollowers).toBe(fmt(raw.manual.instagram_followers));
    expect(metrics.discordMembers).toBe(fmt(raw.manual.discord_members));
  });

  it('the canonical figures are present and plausible, not absent or zero', () => {
    // Fail closed: a collector that writes 0 or drops a key must not reach a sponsor.
    for (const [key, value] of Object.entries({
      x_followers: raw.manual.x_followers,
      linkedin_followers: raw.manual.linkedin_followers,
      tiktok_followers: raw.manual.tiktok_followers,
      instagram_followers: raw.manual.instagram_followers,
      discord_members: raw.manual.discord_members,
    })) {
      expect(typeof value, `${key} missing from data/metrics.json`).toBe('number');
      expect(value, `${key} is zero or negative`).toBeGreaterThan(0);
    }
  });
});
