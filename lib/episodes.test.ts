import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseFeed, orderedGuests } from './episodes';

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

describe('showNotesHtml sanitization', () => {
  // Show notes are rendered via dangerouslySetInnerHTML on the episode page, so
  // anything Buzzsprout returns has to pass through the sanitizer first. These
  // tests guard the allowlist: if a future Buzzsprout change starts emitting
  // scripts/iframes/event-handlers, they have to stay stripped.
  const withNotes = (notes: string): string => `<?xml version="1.0"?>
<rss><channel>
  <title>Test</title>
  <description>Test</description>
  <link>https://example.com</link>
  <item>
    <title>Ep</title>
    <pubDate>Wed, 01 Jan 2025 00:00:00 +0000</pubDate>
    <guid>Buzzsprout-1</guid>
    <enclosure url="https://example.com/1-ep.mp3" length="0" type="audio/mpeg" />
    <itunes:duration>0</itunes:duration>
    <description><![CDATA[${notes}]]></description>
  </item>
</channel></rss>`;

  it('strips script tags', () => {
    const out = parseFeed(withNotes('<p>ok</p><script>alert(1)</script>')).episodes[0].showNotesHtml;
    expect(out).not.toMatch(/<script/i);
    expect(out).toContain('<p>ok</p>');
  });

  it('strips iframe, style, and event handlers', () => {
    const out = parseFeed(
      withNotes('<iframe src="https://evil.example"></iframe><style>x{}</style><p onclick="alert(1)">x</p>'),
    ).episodes[0].showNotesHtml;
    expect(out).not.toMatch(/<iframe|<style|onclick/i);
  });

  it('strips javascript: links but keeps https links with safe rel/target', () => {
    const out = parseFeed(
      withNotes('<a href="javascript:alert(1)">bad</a> <a href="https://example.com">good</a>'),
    ).episodes[0].showNotesHtml;
    expect(out).not.toMatch(/javascript:/i);
    expect(out).toMatch(/<a [^>]*href="https:\/\/example\.com"/);
    expect(out).toMatch(/rel="noopener noreferrer"/);
    expect(out).toMatch(/target="_blank"/);
  });

  it('preserves the allowed formatting tags Buzzsprout actually uses', () => {
    const out = parseFeed(
      withNotes('<p><strong>bold</strong> <em>em</em> <b>b</b> <i>i</i></p><ul><li>x</li></ul>'),
    ).episodes[0].showNotesHtml;
    expect(out).toContain('<strong>bold</strong>');
    expect(out).toContain('<em>em</em>');
    expect(out).toContain('<ul>');
    expect(out).toContain('<li>x</li>');
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
