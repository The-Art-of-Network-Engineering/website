// Fuzzy-match podcast episode titles to YouTube videos so we can use the
// YouTube thumbnail as an episode visual when no guest headshot or per-episode
// artwork is available.
//
// The youtube_map.json is a snapshot of AONE's channel videos. Matching is
// title-based and intentionally conservative: only declare a match when most
// of the episode's significant words appear in the YouTube title.

type YTVideo = {
  video_id: string;
  title: string;
  title_norm?: string;
  url: string;
  published_at?: string;
};

type YTMap = {
  channel_id: string;
  videos: YTVideo[];
};

export type YoutubeMatch = {
  videoId: string;
  thumbnailUrl: string;
  watchUrl: string;
};

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'for', 'on', 'in', 'with',
  'vs', 'your', 'our', 'my', 'is', 'are', 'was', 'were', 'be', 'this',
  'that', 'these', 'those', 'at', 'by', 'from', 'as', 'it', 'its', 'you',
  'we', 'us', 'i', 'no', 'not', 'do', 'does', 'did', 'how', 'why', 'what',
  'when', 'where', 'who',
]);

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/['‘’]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function significantTokens(s: string): Set<string> {
  return new Set(
    normalize(s)
      .split(' ')
      .filter((t) => t.length > 2 && !STOPWORDS.has(t)),
  );
}

const SHORTS_RX = /\bshorts\b|#shorts/i;

export function buildYoutubeMatcher(map: YTMap) {
  const candidates = map.videos.filter((v) => !SHORTS_RX.test(v.title));
  const indexed = candidates.map((v) => ({ video: v, tokens: significantTokens(v.title) }));

  return function match(episodeTitle: string): YoutubeMatch | null {
    const eTokens = significantTokens(episodeTitle);
    if (eTokens.size < 3) return null;

    let best: { recall: number; precision: number; video: YTVideo } | null = null;
    for (const { video, tokens: vTokens } of indexed) {
      if (vTokens.size === 0) continue;
      let intersection = 0;
      for (const t of eTokens) if (vTokens.has(t)) intersection++;
      const recall = intersection / eTokens.size;
      const precision = intersection / vTokens.size;
      if (recall < 0.7) continue;
      if (!best || recall + precision > best.recall + best.precision) {
        best = { recall, precision, video };
      }
    }

    if (!best) return null;
    return {
      videoId: best.video.video_id,
      thumbnailUrl: `https://i.ytimg.com/vi/${best.video.video_id}/maxresdefault.jpg`,
      watchUrl: best.video.url,
    };
  };
}
