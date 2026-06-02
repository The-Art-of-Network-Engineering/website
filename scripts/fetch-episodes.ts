import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { parseFeed } from '../lib/episodes';

const RSS_URL = 'https://rss.buzzsprout.com/2127872.rss';
const OUT_PATH = resolve(process.cwd(), 'data/episodes.json');

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
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(feed, null, 2));
  console.log(`Wrote ${feed.episodes.length} episodes to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
