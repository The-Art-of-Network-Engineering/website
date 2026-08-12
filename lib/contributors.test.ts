import { describe, it, expect } from 'vitest';
import { guestProfile, guestsForEpisodeSlug, filterByName } from './episodes';
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
