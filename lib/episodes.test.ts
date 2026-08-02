import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseFeed, orderedGuests, sanitizeShowNotes, slugFromAudioUrl } from './episodes';

const fixture = readFileSync('scripts/rss-fixture.xml', 'utf-8');
const result = parseFeed(fixture);

describe('parseFeed', () => {
  it('extracts the show title and description', () => {
    expect(result.show.title).toBe('The Art of Network Engineering');
    expect(result.show.description).toMatch(/blends technical insight/i);
    expect(result.show.image).toMatch(/^https:\/\/storage\.buzzsprout\.com\//);
  });

  it('returns at least one episode', () => {
    expect(result.episodes.length).toBeGreaterThan(0);
  });

  it('parses episode fields correctly', () => {
    const ep = result.episodes[0];
    expect(ep.id).toMatch(/^Buzzsprout-\d+$/);
    expect(ep.title.length).toBeGreaterThan(0);
    expect(ep.slug).toMatch(/^[a-z0-9-]+$/);
    expect(ep.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(ep.audioUrl).toMatch(/^https:\/\/.*\.mp3$/);
    expect(ep.durationSeconds).toBeGreaterThan(0);
    expect(ep.showNotesHtml.length).toBeGreaterThan(0);
  });

  it('derives slug from the audio URL filename, not the title', () => {
    const ep = result.episodes[0];
    expect(ep.audioUrl).toContain(ep.slug);
  });

  it('extracts guest names when present (host is excluded from guests)', () => {
    const ep = result.episodes.find((e) => e.guests.length > 0);
    expect(ep, 'fixture should contain at least one episode with a guest').toBeDefined();
    expect(ep!.guests.every((g) => g.name.toLowerCase() !== 'andy lapteff')).toBe(true);
  });

  it('captures guest image URLs and hrefs when the RSS provides them', () => {
    const withImage = result.episodes
      .flatMap((e) => e.guests)
      .find((g) => g.imageUrl);
    expect(withImage, 'fixture should contain at least one guest with an image').toBeDefined();
    expect(withImage!.imageUrl).toMatch(/^https:\/\//);

    const withHref = result.episodes
      .flatMap((e) => e.guests)
      .find((g) => g.href);
    expect(withHref, 'fixture should contain at least one guest with an href').toBeDefined();
    expect(withHref!.href).toMatch(/^https?:\/\//);
  });

  it('episodes are sorted newest-first', () => {
    const dates = result.episodes.map((e) => new Date(e.publishedAt).getTime());
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
    }
  });
});

describe('parseFeed error handling and edge cases', () => {
  it('throws a helpful error on malformed XML', () => {
    expect(() => parseFeed('<html><body>not RSS</body></html>')).toThrow(/missing rss\.channel/i);
  });

  it('falls back to epoch for invalid pubDate', () => {
    const xml = `<?xml version="1.0"?>
<rss><channel>
  <title>Test</title>
  <description>Test</description>
  <link>https://example.com</link>
  <item>
    <title>Bad date episode</title>
    <pubDate>not-a-date</pubDate>
    <guid>Buzzsprout-1</guid>
    <enclosure url="https://example.com/1-test.mp3" length="0" type="audio/mpeg" />
    <itunes:duration>0</itunes:duration>
    <description>x</description>
  </item>
</channel></rss>`;
    const result = parseFeed(xml);
    expect(result.episodes[0].publishedAt).toBe(new Date(0).toISOString());
  });

  it('trims whitespace from guest names', () => {
    const ep = result.episodes.find((e) => e.guests.length > 0);
    expect(ep, 'fixture should contain at least one episode with a guest').toBeDefined();
    for (const g of ep!.guests) {
      expect(g.name).toBe(g.name.trim());
      expect(g.name.length).toBeGreaterThan(0);
    }
  });

  it('throws on duplicate slugs', () => {
    const xml = `<?xml version="1.0"?>
<rss><channel>
  <title>Test</title>
  <description>Test</description>
  <link>https://example.com</link>
  <item>
    <title>Ep A</title>
    <pubDate>Wed, 01 Jan 2025 00:00:00 +0000</pubDate>
    <guid>Buzzsprout-1</guid>
    <enclosure url="https://example.com/1-same-slug.mp3" length="0" type="audio/mpeg" />
    <itunes:duration>0</itunes:duration>
    <description>x</description>
  </item>
  <item>
    <title>Ep B</title>
    <pubDate>Wed, 02 Jan 2025 00:00:00 +0000</pubDate>
    <guid>Buzzsprout-2</guid>
    <enclosure url="https://example.com/2-same-slug.mp3" length="0" type="audio/mpeg" />
    <itunes:duration>0</itunes:duration>
    <description>x</description>
  </item>
</channel></rss>`;
    expect(() => parseFeed(xml)).toThrow(/duplicate episode slug/i);
  });

  it('orderedGuests promotes the guest named in the title (Buzzsprout alphabetises and buries the headliner)', () => {
    const ep = {
      title: "Radia Perlman: You're Solving the Wrong Problem",
      guests: [
        { name: 'Lexie Cooper', imageUrl: 'a', href: null },
        { name: 'Radia Perlman', imageUrl: 'b', href: null },
      ],
    };
    expect(orderedGuests(ep)[0].name).toBe('Radia Perlman');
  });

  it('orderedGuests is a no-op when no guest matches the title', () => {
    const ep = {
      title: 'Tech Careers Are Built on Relationships',
      guests: [
        { name: 'Lexie Cooper', imageUrl: 'a', href: null },
        { name: 'Radia Perlman', imageUrl: 'b', href: null },
      ],
    };
    expect(orderedGuests(ep)[0].name).toBe('Lexie Cooper');
  });

  it('excludes hosts even on episodes with no guests', () => {
    // Find an episode that has at least one podcast:person with role=host but no guests.
    // In the fixture, the May 6, 2026 episode "Tech Careers Are Built on Relationships, Not Resumes"
    // has only the host listed. (If that episode no longer matches in a refreshed fixture, find another.)
    const hostOnlyEp = result.episodes.find(
      (e) => e.title.toLowerCase().includes('tech careers are built on relationships'),
    );
    expect(hostOnlyEp, 'fixture should contain the host-only episode').toBeDefined();
    expect(hostOnlyEp!.guests).toEqual([]);
  });
});

describe('sanitizeShowNotes', () => {
  it('strips <script> and its contents', () => {
    const dirty = '<p>hello</p><script>alert(1)</script>';
    const clean = sanitizeShowNotes(dirty);
    expect(clean).not.toContain('<script');
    expect(clean).not.toContain('alert(1)');
    expect(clean).toContain('<p>hello</p>');
  });

  it('drops disallowed tags but keeps their text (iframe, style, img)', () => {
    const clean = sanitizeShowNotes(
      '<iframe src="https://evil.test"></iframe><style>body{}</style><img src="x" onerror="alert(1)">keep me',
    );
    expect(clean).not.toContain('<iframe');
    expect(clean).not.toContain('<style');
    expect(clean).not.toContain('<img');
    expect(clean).not.toContain('onerror');
    expect(clean).toContain('keep me');
  });

  it('removes event-handler attributes and javascript: hrefs', () => {
    const clean = sanitizeShowNotes('<a href="javascript:alert(1)" onclick="steal()">click</a>');
    expect(clean).not.toContain('javascript:');
    expect(clean).not.toContain('onclick');
    expect(clean).toContain('click');
  });

  it('keeps https links and forces safe target/rel', () => {
    const clean = sanitizeShowNotes('<a href="https://example.com">link</a>');
    expect(clean).toContain('href="https://example.com"');
    expect(clean).toContain('rel="noopener noreferrer"');
    expect(clean).toContain('target="_blank"');
  });

  it('preserves the formatting tags real show notes use', () => {
    const clean = sanitizeShowNotes('<p>intro<br /><b>bold</b> <ul><li>one</li></ul></p>');
    expect(clean).toContain('<p>');
    expect(clean).toContain('<br');
    expect(clean).toContain('<b>bold</b>');
    expect(clean).toContain('<li>one</li>');
  });
});

describe('parseFeed entity decoding (fast-xml-parser v5 regression)', () => {
  const xml = [
    '<?xml version="1.0"?>',
    '<rss><channel>',
    "<title>Show &amp; Co&#39;s Podcast</title>",
    '<item>',
    "<title>whoami: Network Engineering&#39;s Identity Crisis</title>",
    '<enclosure url="https://example.com/123-whoami.mp3"/>',
    '<guid>Buzzsprout-1</guid>',
    '<pubDate>Tue, 21 Feb 2023 11:00:00 -0500</pubDate>',
    '</item>',
    '</channel></rss>',
  ].join('');
  const feed = parseFeed(xml);

  it('decodes numeric character references in episode titles', () => {
    expect(feed.episodes[0].title).toBe("whoami: Network Engineering's Identity Crisis");
    expect(feed.episodes[0].title).not.toContain('&#39;');
  });

  it('decodes both &amp; and &#39; in the show title without double-decoding', () => {
    expect(feed.show.title).toBe("Show & Co's Podcast");
  });
});

describe('slugFromAudioUrl slug pinning', () => {
  it('keeps the canonical slug when a renamed file changes the filename', () => {
    // Buzzsprout ID 12179016 is pinned to ep-01-meet-the-team; the title was
    // renamed so the filename now reflects the new title, but the URL must not move.
    const renamed =
      'https://www.buzzsprout.com/2127872/episodes/12179016-meet-the-art-of-network-engineering-podcast-team.mp3';
    expect(slugFromAudioUrl(renamed)).toBe('ep-01-meet-the-team');
  });

  it('derives the slug from the filename for an unknown (new) episode ID', () => {
    const fresh = 'https://www.buzzsprout.com/2127872/episodes/99999999-brand-new-episode.mp3';
    expect(slugFromAudioUrl(fresh)).toBe('brand-new-episode');
  });
});
