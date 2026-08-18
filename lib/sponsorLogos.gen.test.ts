import { describe, it, expect } from 'vitest';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { SPONSOR_ROSTER, slug, buildLogos, renderModule } from './sponsorLogos.gen';

describe('sponsor logo content-hash generation', () => {
  const stub = (s: string) => `h${s.length}`;

  it('maps display names to the correct file basenames', () => {
    expect(slug('Cisco Press')).toBe('cisco-press');
    expect(slug('NetAlly')).toBe('netally');
    expect(slug('Transit AI')).toBe('transit-ai');
  });

  it('gives every logo a content-hashed src', () => {
    const all = buildLogos(SPONSOR_ROSTER, stub);
    expect(all).toHaveLength(16);
    for (const l of all) {
      expect(l.src).toMatch(/^\/sponsors\/[a-z0-9-]+\.png\?v=[a-z0-9]+$/);
    }
  });

  it('preserves roster order (the wall reads in the order we curate)', () => {
    expect(buildLogos(SPONSOR_ROSTER, stub).map((l) => l.name)).toEqual(SPONSOR_ROSTER);
  });

  it('changes the URL when the content hash changes (this is what busts the cache)', () => {
    const a = buildLogos(['Kentik'], () => 'aaaa1111');
    const b = buildLogos(['Kentik'], () => 'bbbb2222');
    expect(a[0].src).not.toBe(b[0].src);
  });

  it('renders a module exporting a flat sponsorLogos list, with no categories', () => {
    const src = renderModule(buildLogos(SPONSOR_ROSTER, stub));
    expect(src).toContain('export const sponsorLogos');
    expect(src).toContain('?v=');
    // The wall is deliberately uncategorised: categories forced judgement calls that
    // mislabelled partners and implied a category was already taken.
    expect(src).not.toContain('sponsorCategories');
    expect(src).not.toContain('category');
  });
});

// Fail-closed: a roster name with no image file renders a broken <img> on the sponsor
// page, which is the page prospects judge us by. Catch it at build, not in a screenshot.
describe('sponsor roster matches the shipped image files', () => {
  const files = readdirSync(resolve(process.cwd(), 'public', 'sponsors'))
    .filter((f) => f.endsWith('.png'))
    .map((f) => f.replace(/\.png$/, ''));

  it('every roster entry has a logo file', () => {
    const missing = SPONSOR_ROSTER.filter((n) => !files.includes(slug(n)));
    expect(missing, `no /public/sponsors/<slug>.png for: ${missing.join(', ')}`).toEqual([]);
  });

  it('every logo file is on the roster (no orphans silently unused)', () => {
    const roster = SPONSOR_ROSTER.map(slug);
    const orphans = files.filter((f) => !roster.includes(f));
    expect(orphans, `logo files not referenced by the roster: ${orphans.join(', ')}`).toEqual([]);
  });
});
