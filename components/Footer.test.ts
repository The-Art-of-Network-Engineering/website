import { describe, it, expect } from 'vitest';
import { social } from './socialLinks';

// Vitest runs in the `node` environment here (no jsdom), so we assert on the exported
// `social` data that drives the badge row rather than rendering the component. This guards
// the badge set and, in particular, the newly added Instagram link (spec: "Add the
// Instagram link (currently absent from the site)").
describe('Footer social badges', () => {
  it('includes the Instagram link that was previously missing', () => {
    const instagram = social.find((s) => s.label === 'Instagram');
    expect(instagram?.href).toBe('https://www.instagram.com/artofneteng/');
  });

  it('has a badge (icon + href) for every expected platform', () => {
    const byLabel = Object.fromEntries(social.map((s) => [s.label, s]));
    const expected: Record<string, string> = {
      'Apple Podcasts':
        'https://podcasts.apple.com/us/podcast/the-art-of-network-engineering/id1525015389',
      Spotify: 'https://open.spotify.com/show/0pMKATLfuXd19vvg2xlntA',
      YouTube: 'https://www.youtube.com/@artofneteng',
      Discord: 'https://artofnetworkengineering.com/iaatj',
      LinkedIn: 'https://www.linkedin.com/company/artofneteng/',
      X: 'https://x.com/artofneteng',
      TikTok: 'https://www.tiktok.com/@artofneteng',
      Instagram: 'https://www.instagram.com/artofneteng/',
    };
    for (const [label, href] of Object.entries(expected)) {
      expect(byLabel[label], `missing badge: ${label}`).toBeDefined();
      expect(byLabel[label].href).toBe(href);
      // every badge carries a brand icon component (react-icons functions/objects)
      expect(byLabel[label].Icon).toBeTruthy();
    }
  });

  it('lists every badge with a unique href', () => {
    const hrefs = social.map((s) => s.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
