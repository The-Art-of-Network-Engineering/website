import { describe, expect, it } from 'vitest';
import { isPublic, publicationMoment } from './posts';

describe('publicationMoment', () => {
  it('maps an EDT date to 10:00 UTC (6 AM EDT)', () => {
    const m = publicationMoment('2026-06-17');
    expect(m.toISOString()).toBe('2026-06-17T10:00:00.000Z');
  });

  it('maps an EST date to 11:00 UTC (6 AM EST)', () => {
    const m = publicationMoment('2026-01-15');
    expect(m.toISOString()).toBe('2026-01-15T11:00:00.000Z');
  });

  it('follows the clock change: 6 AM ET on the first EST morning and the first EDT morning', () => {
    expect(publicationMoment('2026-11-01').toISOString()).toBe('2026-11-01T11:00:00.000Z');
    expect(publicationMoment('2026-03-08').toISOString()).toBe('2026-03-08T10:00:00.000Z');
  });
});

// The 6 AM ET wait exists (the episode goes live at 6 AM ET; until 2026-10-20 this said 8) so a blog post can drop in sync with the podcast episode
// it accompanies. A post with no episodeSlug isn't coordinating with anything, so it
// publishes as soon as its date arrives in ET, any time of day.
describe('isPublic — episode-tied posts (gated to 6 AM ET so the post and the episode drop together)', () => {
  const EPISODE_POST = { publishedAt: '2026-06-17', episodeSlug: 'some-episode' };

  it('hides a post whose 6am-ET moment is in the future', () => {
    // 2026-06-16 23:00 UTC = 2026-06-16 19:00 EDT — before tomorrow's 6 AM ET
    const now = new Date('2026-06-16T23:00:00.000Z');
    expect(isPublic(EPISODE_POST, now)).toBe(false);
  });

  it('reveals a post once 6 AM ET arrives', () => {
    // 2026-06-17 10:00 UTC = 2026-06-17 06:00 EDT — exactly the threshold
    const now = new Date('2026-06-17T10:00:00.000Z');
    expect(isPublic(EPISODE_POST, now)).toBe(true);
  });

  it('keeps a past post visible', () => {
    const post = { publishedAt: '2025-11-19', episodeSlug: 'some-episode' };
    const now = new Date('2026-06-16T20:00:00.000Z');
    expect(isPublic(post, now)).toBe(true);
  });

  it('hides a post the morning of, before 6 AM ET', () => {
    // 2026-06-17 09:59 UTC = 2026-06-17 05:59 EDT
    const now = new Date('2026-06-17T09:59:00.000Z');
    expect(isPublic(EPISODE_POST, now)).toBe(false);
  });
});

describe('isPublic — standalone posts with no episodeSlug (public from the start of their date in ET, no 6 AM wait)', () => {
  const STANDALONE_POST = { publishedAt: '2026-06-17' };

  it('is public right at midnight ET on its date, well before 6 AM', () => {
    // 2026-06-17 04:05 UTC = 2026-06-17 00:05 EDT
    const now = new Date('2026-06-17T04:05:00.000Z');
    expect(isPublic(STANDALONE_POST, now)).toBe(true);
  });

  it('is still hidden the evening before, in ET', () => {
    // 2026-06-16 23:00 UTC = 2026-06-16 19:00 EDT — still June 16 in ET
    const now = new Date('2026-06-16T23:00:00.000Z');
    expect(isPublic(STANDALONE_POST, now)).toBe(false);
  });

  it('keeps a past post visible', () => {
    const post = { publishedAt: '2025-11-19' };
    const now = new Date('2026-06-16T20:00:00.000Z');
    expect(isPublic(post, now)).toBe(true);
  });
});
