import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * No published number may be pinned to a literal in a test.
 *
 * Every audience number is collected live, published from one canonical file, and
 * verified against its real source by probes. A test that types the number in by hand
 * re-creates the exact problem all that work removed: it goes stale on its own, fails
 * when reality legitimately moves, and trains everyone to ignore a red build.
 *
 * This has now cost Andy time twice. Enforced here rather than remembered.
 * Spec: 2026-09-02-episodes-endpoint-cannot-go-stale-design.md
 */
const METRIC_KEYS = [
  'x_followers', 'linkedin_followers', 'tiktok_followers', 'instagram_followers',
  'discord_members', 'lifetime_downloads', 'youtube_subscribers', 'youtube_views',
  'xFollowers', 'linkedinFollowers', 'tiktokFollowers', 'instagramFollowers',
  'discordMembers', 'lifetimeDownloads', 'youtubeSubscribers',
];

/** `.toBe(8690)` or `.toBe('8,690')` — a literal value, as opposed to a derived one. */
const PINNED_LITERAL = /\.toBe(?:Closeto)?\(\s*(?:'[\d,]+'|"[\d,]+"|[\d_]{3,})\s*\)/;

function testFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) testFiles(full, found);
    else if (/\.test\.tsx?$/.test(entry)) found.push(full);
  }
  return found;
}

describe('no test hardcodes a published metric', () => {
  it('every metric assertion is derived from canonical data, never typed in', () => {
    const offenders: string[] = [];
    for (const file of testFiles(join(__dirname, '..'))) {
      readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
        // Scan code, not prose. A comment explaining why the old literal was wrong is
        // not itself a violation.
        const trimmed = line.trim();
        if (trimmed.startsWith('*') || trimmed.startsWith('//') || trimmed.startsWith('/*')) return;
        if (!METRIC_KEYS.some((k) => line.includes(k))) return;
        if (PINNED_LITERAL.test(line)) {
          offenders.push(`${file.split('/').slice(-2).join('/')}:${i + 1}  ${line.trim()}`);
        }
      });
    }
    expect(
      offenders,
      'these pin a live number to a literal. Compare against data/metrics.json instead; ' +
        'whether the canonical number is TRUE is the probes\' job, not a test\'s.',
    ).toEqual([]);
  });
});
