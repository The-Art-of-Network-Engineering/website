import { XMLParser } from 'fast-xml-parser';

export type Episode = {
  id: string;
  slug: string;
  title: string;
  publishedAt: string; // ISO 8601
  durationSeconds: number;
  audioUrl: string;
  showNotesHtml: string;
  summary: string;
  guests: string[];
  artworkUrl: string | null;
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
});

const slugFromAudioUrl = (url: string): string => {
  const filename = url.split('/').pop() ?? '';
  const stem = filename.replace(/\.mp3$/i, '');
  const match = stem.match(/^\d+-(.+)$/);
  return (match?.[1] ?? stem).toLowerCase();
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
    const guests = persons
      .filter((p) => {
        const role = (p as Record<string, unknown>)?.['@_role'];
        return typeof role === 'string' && role.toLowerCase() === 'guest';
      })
      .map((p) => textOf(p))
      .filter((name) => name.length > 0);

    return {
      id: textOf(item.guid),
      slug: slugFromAudioUrl(audioUrl),
      title: textOf(item.title),
      publishedAt: new Date(textOf(item.pubDate)).toISOString(),
      durationSeconds: Number(textOf(item['itunes:duration'])) || 0,
      audioUrl,
      showNotesHtml: textOf(item['content:encoded']) || textOf(item.description),
      summary: textOf(item['itunes:summary']),
      guests,
      artworkUrl:
        ((item['itunes:image'] as Record<string, unknown>)?.['@_href'] as string) ??
        null,
    };
  });

  episodes.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return { show, episodes };
}
