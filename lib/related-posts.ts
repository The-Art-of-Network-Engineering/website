import { isPublic, type Post } from './posts';

/**
 * Traffic used to flow one way: posts linked to episodes, episodes linked to
 * nothing. So the pages that draw visitors (episodes) had no route to the pages
 * that draw none (posts). The Transit AI sponsored post recorded zero pageloads
 * in its first 11 days while its episode page took 60.
 *
 * These helpers close that loop and guard it.
 */

/** Posts that belong to one episode, newest first, public only. */
export function postsForEpisode(posts: Post[], episodeSlug: string, now: Date = new Date()): Post[] {
  return posts
    .filter((p) => p.episodeSlug === episodeSlug && isPublic(p, now))
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/** Every episode slug mapped to the public posts that reference it. */
export function episodeLinkedPosts(posts: Post[], now: Date = new Date()): Map<string, Post[]> {
  const idx = new Map<string, Post[]>();
  for (const p of posts) {
    if (!p.episodeSlug || !isPublic(p, now)) continue;
    const list = idx.get(p.episodeSlug) ?? [];
    list.push(p);
    idx.set(p.episodeSlug, list);
  }
  for (const [k, list] of idx) {
    idx.set(k, list.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)));
  }
  return idx;
}

const EPISODE_LINK = /\/episodes\/([a-z0-9-]+)/i;

/**
 * Posts whose body points at an episode but which never declare episodeSlug.
 * Those are orphans: the reader can get from the post to the episode, but no
 * visitor on the episode page will ever find the post. A build failure here is
 * cheaper than another sponsored article nobody reads.
 */
export function missingCrossLinks(posts: Post[]): Post[] {
  return posts.filter((p) => !p.episodeSlug && EPISODE_LINK.test(p.bodyMarkdown ?? ''));
}
