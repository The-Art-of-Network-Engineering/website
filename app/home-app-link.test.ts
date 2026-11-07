import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

// Launched 2026-11-07 (Andy): the App Store link replaced the first-look video in the
// homepage hero row. This file used to assert the pre-launch state on purpose, so the
// flip would be a decision and not something that drifted -- this is that decision.
const SRC = readFileSync(new URL('./page.tsx', import.meta.url), 'utf-8');
const STORE_URL = 'https://apps.apple.com/us/app/the-art-of-network-engineering/id6813003554';

describe('homepage app link, post-launch', () => {
  it('points at the real App Store listing', () => {
    expect(SRC).toContain(STORE_URL);
    expect(SRC).toContain('Get the AONE app');
  });

  it('sits in the hero link row, not in a section of its own', () => {
    const row = SRC.indexOf('All the ways to listen');
    const link = SRC.indexOf(STORE_URL);
    expect(row).toBeGreaterThan(-1);
    expect(link).toBeGreaterThan(row);
    expect(link - row).toBeLessThan(600);
  });

  it('opens in a new tab like the other external links on the page', () => {
    const around = SRC.slice(SRC.indexOf(STORE_URL), SRC.indexOf(STORE_URL) + 200);
    expect(around).toContain('target="_blank"');
    expect(around).toContain('rel="noopener noreferrer"');
  });
});
