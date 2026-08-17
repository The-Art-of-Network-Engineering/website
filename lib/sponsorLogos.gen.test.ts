import { describe, it, expect } from 'vitest';
import { SPONSOR_CATEGORIES, slug, buildCategories, renderModule } from './sponsorLogos.gen';

describe('sponsor logo content-hash generation', () => {
  const stub = (s: string) => `h${s.length}`;

  it('maps display names to the correct file basenames', () => {
    expect(slug('Cisco Press')).toBe('cisco-press');
    expect(slug('NetAlly')).toBe('netally');
    expect(slug('Transit AI')).toBe('transit-ai');
  });

  it('gives every logo a content-hashed src', () => {
    const all = buildCategories(SPONSOR_CATEGORIES, stub).flatMap((c) => c.logos);
    expect(all).toHaveLength(16);
    for (const l of all) {
      expect(l.src).toMatch(/^\/sponsors\/[a-z0-9-]+\.png\?v=[a-z0-9]+$/);
    }
  });

  it('changes the URL when the content hash changes (this is what busts the cache)', () => {
    const a = buildCategories([{ category: 'X', names: ['Kentik'] }], () => 'aaaa1111');
    const b = buildCategories([{ category: 'X', names: ['Kentik'] }], () => 'bbbb2222');
    expect(a[0].logos[0].src).not.toBe(b[0].logos[0].src);
  });

  it('renders a module exporting sponsorCategories', () => {
    const src = renderModule(buildCategories(SPONSOR_CATEGORIES, stub));
    expect(src).toContain('export const sponsorCategories');
    expect(src).toContain('?v=');
  });
});
