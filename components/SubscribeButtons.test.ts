import { describe, it, expect } from 'vitest';
import { subscribe } from './subscribeLinks';

// Vitest runs in the `node` environment here (no jsdom), so we assert on the exported
// `subscribe` data that drives the hero buttons rather than rendering the component —
// mirroring the Footer badge test. Guards that every listen platform has a brand emblem.
describe('Subscribe buttons', () => {
  it('has an emblem (icon + href) for every listen platform', () => {
    const byLabel = Object.fromEntries(subscribe.map((s) => [s.label, s]));
    const expected: Record<string, string> = {
      'Apple Podcasts':
        'https://podcasts.apple.com/us/podcast/the-art-of-network-engineering/id1525015389',
      Spotify: 'https://open.spotify.com/show/0pMKATLfuXd19vvg2xlntA',
      YouTube: 'https://www.youtube.com/@artofneteng',
      RSS: 'https://rss.buzzsprout.com/2127872.rss',
    };
    for (const [label, href] of Object.entries(expected)) {
      expect(byLabel[label], `missing emblem: ${label}`).toBeDefined();
      expect(byLabel[label].href).toBe(href);
      // every button carries a brand icon component (react-icons function)
      expect(byLabel[label].Icon).toBeTruthy();
    }
  });

  it('lists every button with a unique href', () => {
    const hrefs = subscribe.map((s) => s.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
