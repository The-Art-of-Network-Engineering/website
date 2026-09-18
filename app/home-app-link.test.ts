import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

// Pre-launch: the homepage points at the first-look video because there is no
// App Store link yet (2026-09-18: the app repo's latest commits are "document
// App Store release steps" and the LLC signing fix). This test is MEANT to go
// red at launch. When the store URL replaces the video, update it here on
// purpose, so the flip is a decision and not something that drifts.
const SRC = readFileSync(new URL('./page.tsx', import.meta.url), 'utf-8');
const VIDEO = 'https://youtu.be/jz2SkYU3i9I';

describe('homepage app link, pre-launch', () => {
  it('points at the first-look video until there is a store link', () => {
    expect(SRC).toContain(VIDEO);
    expect(SRC).toContain('The AONE app is coming');
  });

  it('sits in the hero link row, not in a section of its own', () => {
    const row = SRC.indexOf('All the ways to listen');
    const link = SRC.indexOf(VIDEO);
    expect(row).toBeGreaterThan(-1);
    expect(link).toBeGreaterThan(row);
    expect(link - row).toBeLessThan(600);
  });

  it('opens in a new tab like the other external links on the page', () => {
    const around = SRC.slice(SRC.indexOf(VIDEO), SRC.indexOf(VIDEO) + 200);
    expect(around).toContain('target="_blank"');
    expect(around).toContain('rel="noopener noreferrer"');
  });
});
