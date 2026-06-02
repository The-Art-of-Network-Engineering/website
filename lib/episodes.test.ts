import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseFeed } from './episodes';

const fixture = readFileSync('scripts/rss-fixture.xml', 'utf-8');

describe('parseFeed', () => {
  const result = parseFeed(fixture);

  it('extracts the show title and description', () => {
    expect(result.show.title).toBe('The Art of Network Engineering');
    expect(result.show.description).toMatch(/blends technical insight/i);
    expect(result.show.image).toMatch(/^https:\/\/storage\.buzzsprout\.com\//);
  });

  it('returns at least one episode', () => {
    expect(result.episodes.length).toBeGreaterThan(0);
  });

  it('parses episode fields correctly', () => {
    const ep = result.episodes[0];
    expect(ep.id).toMatch(/^Buzzsprout-\d+$/);
    expect(ep.title.length).toBeGreaterThan(0);
    expect(ep.slug).toMatch(/^[a-z0-9-]+$/);
    expect(ep.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(ep.audioUrl).toMatch(/^https:\/\/.*\.mp3$/);
    expect(ep.durationSeconds).toBeGreaterThan(0);
    expect(ep.showNotesHtml.length).toBeGreaterThan(0);
  });

  it('derives slug from the audio URL filename, not the title', () => {
    const ep = result.episodes[0];
    expect(ep.audioUrl).toContain(ep.slug);
  });

  it('extracts guest names when present (host is excluded from guests)', () => {
    const ep = result.episodes.find((e) => e.guests.length > 0);
    expect(ep, 'fixture should contain at least one episode with a guest').toBeDefined();
    expect(ep!.guests.every((g) => g.toLowerCase() !== 'andy lapteff')).toBe(true);
  });

  it('episodes are sorted newest-first', () => {
    const dates = result.episodes.map((e) => new Date(e.publishedAt).getTime());
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
    }
  });
});
