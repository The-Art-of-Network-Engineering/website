import { describe, it, expect } from 'vitest';
import overrides from '../data/youtube_overrides.json';
import ytMap from '../data/youtube_map.json';
import feed from '../data/episodes.json';

/**
 * Episodes were paired to YouTube videos by fuzzy title match. Then the SEO retitle
 * renamed 146 podcast titles while only 79 videos were renamed, so 37 episodes stopped
 * matching and silently lost their video (e.g. the Josh Warcop episode: recall fell to
 * 0.57 against a 0.70 threshold).
 *
 * An explicit slug -> video_id override cannot drift when a title changes. These guard
 * the overrides themselves.
 */
const map = ytMap as { videos: { video_id: string; title: string }[] };
const ov = overrides as Record<string, string>;
const episodes = (feed as { episodes: { slug: string }[] }).episodes;

describe('youtube overrides', () => {
  it('every override points at a video that exists on the channel', () => {
    const known = new Set(map.videos.map((v) => v.video_id));
    const missing = Object.entries(ov).filter(([, id]) => !known.has(id));
    expect(missing, `override points at a video not in the channel snapshot`).toEqual([]);
  });

  it('every override points at a real episode', () => {
    const slugs = new Set(episodes.map((e) => e.slug));
    const orphaned = Object.keys(ov).filter((s) => !slugs.has(s));
    expect(orphaned, 'override for a slug that is not an episode').toEqual([]);
  });

  it('no two episodes claim the same video', () => {
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const [slug, id] of Object.entries(ov)) {
      if (seen.has(id)) dupes.push(`${slug} and ${seen.get(id)} both claim ${id}`);
      seen.set(id, slug);
    }
    expect(dupes).toEqual([]);
  });

  it('the retitled Warcop episode resolves to its video', () => {
    // The episode that surfaced this whole class of bug.
    expect(ov['ep-131-a-comprehensive-guide-to-media-networking-with-expert-josh-warcop'])
      .toBe('Mad45raQ_bM');
  });
});
