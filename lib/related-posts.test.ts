import { describe, it, expect } from 'vitest';
import { postsForEpisode, episodeLinkedPosts, missingCrossLinks } from './related-posts';
import type { Post } from './posts';

// No `as Post` cast: the cast is what let an earlier version of this test
// exercise a field (`content`) that does not exist on Post, so the guard read
// undefined and could never have flagged anything.
const post = (over: Partial<Post>): Post => ({
  slug: 'p', title: 'T', excerpt: '', publishedAt: '2026-08-05',
  author: 'The AONE Team', bodyMarkdown: '', ...over,
});

describe('postsForEpisode', () => {
  it('returns posts that name the episode', () => {
    const posts = [
      post({ slug: 'a', episodeSlug: 'ep-one' }),
      post({ slug: 'b', episodeSlug: 'ep-two' }),
    ];
    expect(postsForEpisode(posts, 'ep-one').map((p) => p.slug)).toEqual(['a']);
  });

  it('returns an empty list when nothing links to it', () => {
    expect(postsForEpisode([post({ episodeSlug: 'other' })], 'ep-one')).toEqual([]);
  });

  it('ignores posts with no episodeSlug at all', () => {
    expect(postsForEpisode([post({})], 'ep-one')).toEqual([]);
  });

  it('returns newest first when several posts link to one episode', () => {
    const posts = [
      post({ slug: 'older', episodeSlug: 'e', publishedAt: '2026-01-01' }),
      post({ slug: 'newer', episodeSlug: 'e', publishedAt: '2026-08-01' }),
    ];
    expect(postsForEpisode(posts, 'e').map((p) => p.slug)).toEqual(['newer', 'older']);
  });

  it('never surfaces a post that is not public yet', () => {
    const future = post({ slug: 'f', episodeSlug: 'e', publishedAt: '2099-01-01' });
    expect(postsForEpisode([future], 'e')).toEqual([]);
  });
});

describe('missingCrossLinks', () => {
  // The Transit AI post sat unreachable for 11 days because nothing on the site
  // pointed at it. This is the guard that makes that a build failure.
  it('flags a post whose body links an episode but carries no episodeSlug', () => {
    const p = post({
      slug: 'orphan',
      bodyMarkdown: 'listen here: https://artofnetworkengineering.com/episodes/cursor-for-network-engineers-meet-transit-ai',
    });
    expect(missingCrossLinks([p]).map((x) => x.slug)).toEqual(['orphan']);
  });

  it('accepts a post that declares episodeSlug', () => {
    const p = post({
      slug: 'linked', episodeSlug: 'cursor-for-network-engineers-meet-transit-ai',
      bodyMarkdown: 'listen: /episodes/cursor-for-network-engineers-meet-transit-ai',
    });
    expect(missingCrossLinks([p])).toEqual([]);
  });

  it('leaves ordinary posts alone', () => {
    expect(missingCrossLinks([post({ bodyMarkdown: 'no episode reference here' })])).toEqual([]);
  });

  it('catches a relative episode link too', () => {
    const p = post({ slug: 'rel', bodyMarkdown: 'see [the episode](/episodes/whoami-network-engineering-s-identity-crisis)' });
    expect(missingCrossLinks([p]).map((x) => x.slug)).toEqual(['rel']);
  });
});

describe('episodeLinkedPosts', () => {
  it('indexes posts by the episode they belong to', () => {
    const posts = [post({ slug: 'a', episodeSlug: 'e1' }), post({ slug: 'b', episodeSlug: 'e1' }),
                   post({ slug: 'c', episodeSlug: 'e2' })];
    const idx = episodeLinkedPosts(posts);
    expect(idx.get('e1')?.length).toBe(2);
    expect(idx.get('e2')?.length).toBe(1);
  });
});
