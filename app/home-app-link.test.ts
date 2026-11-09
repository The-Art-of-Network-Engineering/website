import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

// 2026-11-09 (Andy): the hero's app CTA is now a silent, looping preview video instead of a
// static image -- the video's own content already shows "Now Available" and the real Apple
// "Download on the App Store" badge, so there's no separate button bar under it like the
// image version had. "All the ways to listen" and "Get the newsletter" stay removed from the
// hero (both reachable elsewhere: header nav links /newsletter on every page, footer links
// /listen on every page, and this homepage has a full newsletter section further down).
const SRC = readFileSync(new URL('./page.tsx', import.meta.url), 'utf-8');
const STORE_URL = 'https://apps.apple.com/us/app/the-art-of-network-engineering/id6813003554';

describe('homepage app link, hero promo', () => {
  it('points at the real App Store listing', () => {
    expect(SRC).toContain(STORE_URL);
    expect(SRC).toContain('Download on the App Store');
  });

  it('is the promo video wrapped in one clickable link, not just a text link', () => {
    const link = SRC.indexOf(STORE_URL);
    const around = SRC.slice(link, link + 600);
    expect(around).toContain('/app-promo.mp4');
    expect(around).toContain('/app-promo-poster.jpg');
  });

  it('autoplays silently and loops, like a gif replacement should', () => {
    const link = SRC.indexOf(STORE_URL);
    const around = SRC.slice(link, link + 600);
    expect(around).toContain('autoPlay');
    expect(around).toContain('loop');
    expect(around).toContain('muted');
    expect(around).toContain('playsInline');
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
