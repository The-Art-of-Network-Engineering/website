import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

// 2026-11-07 (Andy): made the app the hero's headline CTA -- a clickable promo image plus a
// real "Download on the App Store" button, replacing the small text-link row (which also
// carried "All the ways to listen" and "Get the newsletter"; both stay reachable, the header
// nav links to /newsletter on every page and the footer links to /listen on every page, and
// this same homepage already has a full newsletter section of its own further down).
const SRC = readFileSync(new URL('./page.tsx', import.meta.url), 'utf-8');
const STORE_URL = 'https://apps.apple.com/us/app/the-art-of-network-engineering/id6813003554';

describe('homepage app link, hero promo', () => {
  it('points at the real App Store listing with a real download prompt', () => {
    expect(SRC).toContain(STORE_URL);
    expect(SRC).toContain('Download on the App Store');
  });

  it('is the promo image wrapped in one clickable link, not just a text link', () => {
    const link = SRC.indexOf(STORE_URL);
    const around = SRC.slice(link, link + 600);
    expect(around).toContain('/app-promo.jpg');
  });

  it('opens in a new tab like the other external links on the page', () => {
    const around = SRC.slice(SRC.indexOf(STORE_URL), SRC.indexOf(STORE_URL) + 200);
    expect(around).toContain('target="_blank"');
    expect(around).toContain('rel="noopener noreferrer"');
  });

  it('no longer duplicates the newsletter and listen links the hero used to carry', () => {
    // Removed on purpose, not a drift -- both stay reachable elsewhere (header nav,
    // footer, and this page's own newsletter section further down).
    const heroEnd = SRC.indexOf('{/* Latest episode */}');
    const hero = SRC.slice(0, heroEnd);
    expect(hero).not.toContain('All the ways to listen');
    expect(hero).not.toContain('Get the newsletter');
  });
});
