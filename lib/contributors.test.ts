import { describe, it, expect } from 'vitest';
import { guestProfile, guestsForEpisodeSlug, filterByName, filterPosts } from './episodes';
import type { Feed } from './episodes';

// Minimal synthetic feed for the pure episode->guests mapping.
const feed = {
  show: { title: '', description: '', image: '', link: '' },
  episodes: [
    {
      id: '1',
      slug: 'ep-with-two-guests',
      title: 'Radia Perlman on spanning tree',
      publishedAt: '2026-01-01',
      durationSeconds: 0,
      audioUrl: '',
      showNotesHtml: '',
      summary: '',
      artworkUrl: null,
      youtube: null,
      guests: [
        { name: 'Lexie Cooper', imageUrl: null, href: null },
        { name: 'Radia Perlman', imageUrl: null, href: null },
      ],
    },
    {
      id: '2',
      slug: 'ep-no-guests',
      title: 'Solo episode',
      publishedAt: '2026-01-02',
      durationSeconds: 0,
      audioUrl: '',
      showNotesHtml: '',
      summary: '',
      artworkUrl: null,
      youtube: null,
      guests: [],
    },
  ],
} as unknown as Feed;

describe('guestsForEpisodeSlug', () => {
  it('returns the episode guests as {name, slug}, headliner first', () => {
    const guests = guestsForEpisodeSlug(feed, 'ep-with-two-guests');
    // orderedGuests floats the title-named guest (Radia) to the front
    expect(guests).toEqual([
      { name: 'Radia Perlman', slug: 'radia-perlman' },
      { name: 'Lexie Cooper', slug: 'lexie-cooper' },
    ]);
  });

  it('returns [] for an episode with no guests', () => {
    expect(guestsForEpisodeSlug(feed, 'ep-no-guests')).toEqual([]);
  });

  it('returns [] for an unknown episode slug', () => {
    expect(guestsForEpisodeSlug(feed, 'does-not-exist')).toEqual([]);
  });
});

describe('filterByName', () => {
  const people = [{ name: 'Radia Perlman' }, { name: 'Scott Robohn' }, { name: 'Mike Bushong' }];
  it('returns all items for an empty/whitespace query', () => {
    expect(filterByName(people, '')).toHaveLength(3);
    expect(filterByName(people, '   ')).toHaveLength(3);
  });
  it('matches case-insensitively on a substring', () => {
    expect(filterByName(people, 'robo')).toEqual([{ name: 'Scott Robohn' }]);
    expect(filterByName(people, 'MIKE')).toEqual([{ name: 'Mike Bushong' }]);
  });
  it('matches on last name too', () => {
    expect(filterByName(people, 'perlman')).toEqual([{ name: 'Radia Perlman' }]);
  });
  it('returns [] when nothing matches', () => {
    expect(filterByName(people, 'zzz')).toEqual([]);
  });
});

describe('filterPosts', () => {
  const posts = [
    { title: '500 Hours of Foosball', excerpt: 'Mike Bushong on effort and optionality.' },
    { title: 'You Belong Here', excerpt: 'On imposter syndrome in network engineering.' },
    { title: 'Untitled', excerpt: undefined },
  ];
  it('returns all posts for an empty query', () => {
    expect(filterPosts(posts, '  ')).toHaveLength(3);
  });
  it('matches on the title', () => {
    expect(filterPosts(posts, 'foosball').map((p) => p.title)).toEqual(['500 Hours of Foosball']);
  });
  it('matches on the excerpt when not in the title', () => {
    expect(filterPosts(posts, 'imposter').map((p) => p.title)).toEqual(['You Belong Here']);
  });
  it('tolerates a missing excerpt and returns [] on no match', () => {
    expect(filterPosts(posts, 'zzz')).toEqual([]);
  });
  it('matches on the body when the term is in neither the title nor the excerpt', () => {
    // Real bug, 2026-10-23: a post can be about a topic without that topic's exact
    // wording appearing in its headline or excerpt.
    const withBodies = [
      {
        title: 'Can Network Engineers Build Real Software with AI?',
        excerpt: 'A trip to Munich and a subnetting game.',
        body: 'John taught me spec-driven development and I became hopeful.',
      },
      { title: 'Unrelated', excerpt: 'Nothing to do with it.', body: 'Also unrelated text.' },
    ];
    expect(filterPosts(withBodies, 'spec driven development').map((p) => p.title)).toEqual([
      'Can Network Engineers Build Real Software with AI?',
    ]);
  });
  it('tolerates posts with no body field at all, not just an empty one', () => {
    expect(filterPosts(posts, 'foosball').map((p) => p.title)).toEqual(['500 Hours of Foosball']);
  });
  it('treats hyphens and spaces as the same word boundary in either direction', () => {
    const p = [{ title: 'T', excerpt: 'spec-driven development', body: undefined }];
    expect(filterPosts(p, 'spec driven')).toHaveLength(1);       // spaced query, hyphenated text
    const q = [{ title: 'T', excerpt: 'spec driven development', body: undefined }];
    expect(filterPosts(q, 'spec-driven')).toHaveLength(1);       // hyphenated query, spaced text
  });
});

describe('guestProfile', () => {
  it('returns a sanitized bio for a known contributor', () => {
    // scott-robohn is seeded in data/contributors.json from the Buzzsprout admin
    const p = guestProfile('scott-robohn');
    expect(p).not.toBeNull();
    expect(p!.bioHtml.length).toBeGreaterThan(0);
    // sanitized: no script/style/onclick survives the allowlist
    expect(p!.bioHtml).not.toMatch(/<script|onclick=/i);
  });

  it('returns null for a slug with no contributor entry', () => {
    expect(guestProfile('nobody-here-xyz')).toBeNull();
  });
});
