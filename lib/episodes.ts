import { XMLParser } from 'fast-xml-parser';
import sanitizeHtml from 'sanitize-html';
import slugOverrides from '../data/slug_overrides.json';
import contributorsData from '../data/contributors.json';

// Buzzsprout show notes arrive as raw <content:encoded> HTML and are rendered
// via dangerouslySetInnerHTML on the episode page. Sanitize at the parse
// boundary so only a narrow allowlist of formatting tags survives into
// data/episodes.json. Current feed content uses only p/br/a/li/b/ul/em with
// https links, so this is lossless today while closing the injection path for
// anything future. Links are forced to open safely in a new tab.
export const sanitizeShowNotes = (html: string): string =>
  sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'ul', 'ol', 'li', 'a', 'b', 'strong', 'i', 'em'],
    allowedAttributes: { a: ['href', 'title', 'rel', 'target'] },
    allowedSchemes: ['https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer', target: '_blank' }),
    },
  });

export type Guest = {
  name: string;
  imageUrl: string | null;
  href: string | null;
};

// Buzzsprout exposes guests alphabetically, which buries the headliner when their
// last name sorts late (e.g. Lexie Cooper before Radia Perlman). When a guest's
// first or last name appears in the episode title, treat them as the featured guest.
export function orderedGuests(episode: { title: string; guests: Guest[] }): Guest[] {
  if (episode.guests.length < 2) return episode.guests;
  const titleLower = episode.title.toLowerCase();
  const featuredIdx = episode.guests.findIndex((g) =>
    g.name
      .toLowerCase()
      .split(/\s+/)
      .filter((part) => part.length > 2)
      .some((part) => titleLower.includes(part)),
  );
  if (featuredIdx <= 0) return episode.guests;
  const reordered = [...episode.guests];
  const [featured] = reordered.splice(featuredIdx, 1);
  reordered.unshift(featured);
  return reordered;
}

// Stable URL slug for a guest name: lowercase, spaces → hyphens, strip anything
// that isn't [a-z0-9-], and collapse repeated hyphens. e.g. "Radia Perlman" → "radia-perlman".
export function guestSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export type YoutubeRef = {
  videoId: string;
  thumbnailUrl: string;
  watchUrl: string;
};

export type Episode = {
  id: string;
  slug: string;
  title: string;
  publishedAt: string; // ISO 8601
  durationSeconds: number;
  audioUrl: string;
  showNotesHtml: string;
  summary: string;
  guests: Guest[];
  artworkUrl: string | null;
  youtube: YoutubeRef | null;
};

export type Show = {
  title: string;
  description: string;
  image: string;
  link: string;
};

export type Feed = {
  show: Show;
  episodes: Episode[];
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  cdataPropName: '#cdata',
  parseAttributeValue: false,
  trimValues: true,
  // fast-xml-parser v5 stopped decoding numeric character references (e.g. &#39;)
  // by default (v4 did). Buzzsprout feeds use &#39; for apostrophes in plain-text
  // titles/summaries, so without this they render literally. CDATA (show notes)
  // is unaffected and still handled by sanitizeShowNotes.
  htmlEntities: true,
});

// Pin each episode's URL slug to its stable Buzzsprout ID. Buzzsprout regenerates
// the audio filename from the title when an episode is renamed, so deriving the
// slug from the filename alone would silently change episode URLs (and break
// video overrides / backlinks) on the next build. The ID never changes, so we map
// it back to the original slug. Unknown IDs (genuinely new episodes) derive normally.
export const slugFromAudioUrl = (url: string): string => {
  const filename = url.split('/').pop() ?? '';
  const stem = filename.replace(/\.mp3$/i, '');
  const match = stem.match(/^(\d+)-(.+)$/);
  const id = match?.[1];
  const overrides = slugOverrides as Record<string, string>;
  if (id && overrides[id]) return overrides[id];
  return (match?.[2] ?? stem).toLowerCase();
};

// Guest bios come from data/contributors.json (synced weekly from the Buzzsprout
// admin by scripts/sync_contributors.py). Headshot + personal URL are NOT here —
// they're already public in each episode's guest entry (imageUrl/href), so a guest
// page combines the public headshot/link with this admin-only bio + role.
export type ContributorProfile = { name: string; role: string; bio: string };

const contributorProfiles = (contributorsData as {
  profiles: Record<string, ContributorProfile>;
}).profiles;

// The bio HTML is sanitized here (same allowlist as show notes) before it reaches
// dangerouslySetInnerHTML on the guest page — defense in depth on scraped content.
export function guestProfile(slug: string): (ContributorProfile & { bioHtml: string }) | null {
  const p = contributorProfiles[slug];
  if (!p) return null;
  return { ...p, bioHtml: p.bio ? sanitizeShowNotes(p.bio) : '' };
}

// Every guest of the episode a blog post is about, as {name, slug} for linking to
// their profile. Used by the blog template so each post auto-links its guests.
export function guestsForEpisodeSlug(
  feed: Feed,
  episodeSlug: string,
): { name: string; slug: string }[] {
  const ep = feed.episodes.find((e) => e.slug === episodeSlug);
  if (!ep) return [];
  return orderedGuests(ep).map((g) => ({ name: g.name, slug: guestSlug(g.name) }));
}

const safeIsoDate = (raw: string): string => {
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? new Date(0).toISOString() : d.toISOString();
};

const textOf = (node: unknown): string => {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number' || typeof node === 'boolean') return String(node);
  if (typeof node === 'object') {
    const rec = node as Record<string, unknown>;
    if ('#cdata' in rec) {
      const c = rec['#cdata'];
      if (typeof c === 'string') return c;
      if (Array.isArray(c)) return c.filter((v) => typeof v === 'string').join('');
    }
    if ('#text' in rec) {
      const t = rec['#text'];
      if (typeof t === 'string') return t;
      if (typeof t === 'number') return String(t);
    }
  }
  return '';
};

const arrayOf = <T>(node: T | T[] | undefined): T[] => {
  if (node == null) return [];
  return Array.isArray(node) ? node : [node];
};

export function parseFeed(xml: string): Feed {
  const parsed = parser.parse(xml);
  if (!parsed?.rss?.channel) {
    throw new Error('Invalid RSS feed: missing rss.channel');
  }
  const channel = parsed.rss.channel;

  const show: Show = {
    title: textOf(channel.title),
    description: textOf(channel.description),
    image: channel['itunes:image']?.['@_href'] ?? channel.image?.url ?? '',
    link: textOf(channel.link),
  };

  const items = arrayOf(channel.item);

  const episodes: Episode[] = items.map((item: Record<string, unknown>) => {
    const audioUrl =
      ((item.enclosure as Record<string, unknown>)?.['@_url'] as string) ?? '';
    const persons = arrayOf(item['podcast:person'] as unknown);
    const guests: Guest[] = persons
      .filter((p) => {
        const role = (p as Record<string, unknown>)?.['@_role'];
        return typeof role === 'string' && role.toLowerCase() === 'guest';
      })
      .map((p) => {
        const rec = p as Record<string, unknown>;
        const rawImg = typeof rec['@_img'] === 'string' ? (rec['@_img'] as string).trim() : '';
        const rawHref = typeof rec['@_href'] === 'string' ? (rec['@_href'] as string).trim() : '';
        return {
          name: textOf(p).trim(),
          imageUrl: rawImg.length > 0 ? rawImg : null,
          href: rawHref.length > 0 ? rawHref : null,
        };
      })
      .filter((g) => g.name.length > 0);

    return {
      id: textOf(item.guid),
      slug: slugFromAudioUrl(audioUrl),
      title: textOf(item.title),
      publishedAt: safeIsoDate(textOf(item.pubDate)),
      durationSeconds: Number(textOf(item['itunes:duration'])) || 0,
      audioUrl,
      showNotesHtml: sanitizeShowNotes(textOf(item['content:encoded']) || textOf(item.description)),
      summary: textOf(item['itunes:summary']),
      guests,
      artworkUrl:
        ((item['itunes:image'] as Record<string, unknown>)?.['@_href'] as string) ??
        null,
      youtube: null,
    };
  });

  episodes.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const seenSlugs = new Set<string>();
  for (const ep of episodes) {
    if (seenSlugs.has(ep.slug)) {
      throw new Error(
        `Duplicate episode slug detected: "${ep.slug}". Two episodes would render at the same URL.`,
      );
    }
    seenSlugs.add(ep.slug);
  }

  return { show, episodes };
}
