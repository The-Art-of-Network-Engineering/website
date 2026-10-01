import { describe, expect, it } from 'vitest';
import { isPublic, publicationMoment } from './posts';

describe('publicationMoment', () => {
  it('maps an EDT date to 12:00 UTC (8 AM EDT)', () => {
    const m = publicationMoment('2026-06-17');
    expect(m.toISOString()).toBe('2026-06-17T12:00:00.000Z');
  });

  it('maps an EST date to 13:00 UTC (8 AM EST)', () => {
    const m = publicationMoment('2026-01-15');
    expect(m.toISOString()).toBe('2026-01-15T13:00:00.000Z');
  });
});

// The 8 AM ET wait exists so a blog post can drop in sync with the podcast episode
// it accompanies. A post with no episodeSlug isn't coordinating with anything, so it
// publishes as soon as its date arrives in ET, any time of day.
describe('isPublic — episode-tied posts (gated to 8 AM ET so the post and the episode drop together)', () => {
  const EPISODE_POST = { publishedAt: '2026-06-17', episodeSlug: 'some-episode' };

  it('hides a post whose 8am-ET moment is in the future', () => {
    // 2026-06-16 23:00 UTC = 2026-06-16 19:00 EDT — before tomorrow's 8 AM ET
    const now = new Date('2026-06-16T23:00:00.000Z');
    expect(isPublic(EPISODE_POST, now)).toBe(false);
  });

  it('reveals a post once 8 AM ET arrives', () => {
    // 2026-06-17 12:00 UTC = 2026-06-17 08:00 EDT — exactly the threshold
    const now = new Date('2026-06-17T12:00:00.000Z');
    expect(isPublic(EPISODE_POST, now)).toBe(true);
  });

  it('keeps a past post visible', () => {
    const post = { publishedAt: '2025-11-19', episodeSlug: 'some-episode' };
    const now = new Date('2026-06-16T20:00:00.000Z');
    expect(isPublic(post, now)).toBe(true);
  });

  it('hides a post the morning of, before 8 AM ET', () => {
    // 2026-06-17 11:59 UTC = 2026-06-17 07:59 EDT
    const now = new Date('2026-06-17T11:59:00.000Z');
    expect(isPublic(EPISODE_POST, now)).toBe(false);
  });
});

describe('isPublic — standalone posts with no episodeSlug (public from the start of their date in ET, no 8 AM wait)', () => {
  const STANDALONE_POST = { publishedAt: '2026-06-17' };

  it('is public right at midnight ET on its date, well before 8 AM', () => {
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
