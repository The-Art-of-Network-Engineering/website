import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { parseFeed } from '../lib/episodes';
import { buildYoutubeMatcher } from '../lib/youtube-match';

const RSS_URL = 'https://rss.buzzsprout.com/2127872.rss';
const OUT_PATH = resolve(process.cwd(), 'data/episodes.json');
const YT_MAP_PATH = resolve(process.cwd(), 'data/youtube_map.json');

async function main() {
  console.log(`Fetching ${RSS_URL}`);
  let xml: string;
  try {
    const res = await fetch(RSS_URL, { headers: { 'User-Agent': 'aone-web build' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    xml = await res.text();
  } catch (err) {
    console.warn(`Fetch failed (${(err as Error).message}); falling back to existing ${OUT_PATH}`);
    if (!existsSync(OUT_PATH)) {
      throw new Error(`No cached episodes.json to fall back to. Original error: ${(err as Error).message}`);
    }
    return; // keep existing data
  }

  const feed = parseFeed(xml);

  // Enrich with YouTube matches when the channel snapshot is available.
  if (existsSync(YT_MAP_PATH)) {
    const ytMap = JSON.parse(readFileSync(YT_MAP_PATH, 'utf-8'));
    const match = buildYoutubeMatcher(ytMap);
    let matched = 0;
    for (const ep of feed.episodes) {
      const m = match(ep.title);
      if (m) {
        ep.youtube = m;
        matched++;
      }
    }
    console.log(`Matched ${matched}/${feed.episodes.length} episodes to YouTube videos`);
  } else {
    console.warn(`No youtube_map.json at ${YT_MAP_PATH}; skipping YouTube enrichment`);
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(feed, null, 2));
  console.log(`Wrote ${feed.episodes.length} episodes to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
