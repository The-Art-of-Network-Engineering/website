import { describe, it, expect } from 'vitest';
import { getAllPosts } from './posts';
import { missingCrossLinks } from './related-posts';
import feed from '../data/episodes.json';

/**
 * Runs against the REAL content, not fixtures. This is the gate: a post that
 * points at an episode without declaring episodeSlug is unreachable from the
 * page that actually draws traffic, and it ships silently.
 *
 * The Transit AI sponsored post did exactly that for 11 days.
 */
describe('blog content integrity', () => {
  it('no post links an episode without declaring episodeSlug', () => {
    const orphans = missingCrossLinks(getAllPosts());
    expect(
      orphans.map((p) => p.slug),
      `these posts reference an episode but set no episodeSlug, so nothing on the ` +
      `site links to them:\n  ${orphans.map((p) => p.slug).join('\n  ')}`,
    ).toEqual([]);
  });

  it('every post that declares an episodeSlug points at a real episode', () => {
    const posts = getAllPosts().filter((p) => p.episodeSlug);
    const known = new Set(
      (feed as { episodes: { slug: string }[] }).episodes.map((e) => e.slug));
    const broken = posts.filter((p) => !known.has(p.episodeSlug as string));
    expect(
      broken.map((p) => `${p.slug} -> ${p.episodeSlug}`),
      'these posts point at an episode slug that does not exist',
    ).toEqual([]);
  });
});
