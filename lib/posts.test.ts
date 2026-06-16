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

describe('isPublic', () => {
  it('hides a post whose 8am-ET moment is in the future', () => {
    const post = { publishedAt: '2026-06-17' };
    // 2026-06-16 23:00 UTC = 2026-06-16 19:00 EDT — before tomorrow's 8 AM ET
    const now = new Date('2026-06-16T23:00:00.000Z');
    expect(isPublic(post, now)).toBe(false);
  });

  it('reveals a post once 8 AM ET arrives', () => {
    const post = { publishedAt: '2026-06-17' };
    // 2026-06-17 12:00 UTC = 2026-06-17 08:00 EDT — exactly the threshold
    const now = new Date('2026-06-17T12:00:00.000Z');
    expect(isPublic(post, now)).toBe(true);
  });

  it('keeps a past post visible', () => {
    const post = { publishedAt: '2025-11-19' };
    const now = new Date('2026-06-16T20:00:00.000Z');
    expect(isPublic(post, now)).toBe(true);
  });

  it('hides a post the morning of, before 8 AM ET', () => {
    const post = { publishedAt: '2026-06-17' };
    // 2026-06-17 11:59 UTC = 2026-06-17 07:59 EDT
    const now = new Date('2026-06-17T11:59:00.000Z');
    expect(isPublic(post, now)).toBe(false);
  });
});
