import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import SponsorPage from './page';
import { SPONSOR_ROSTER } from '@/lib/sponsorLogos.gen';
import { UNLINKED } from '@/lib/sponsorLinks';

const html = renderToStaticMarkup(<SponsorPage />);
const src = readFileSync(resolve(__dirname, 'page.tsx'), 'utf8');

describe('/sponsor logo wall', () => {
  it('renders every roster logo, including NAF', () => {
    for (const n of SPONSOR_ROSTER) expect(html).toContain(`alt="${n}"`);
    expect(html).toContain('alt="NAF"');
  });
  it('centres every row (flex, justify-center), no left-packed grid', () => {
    const rows = html.match(/<div class="[^"]*" data-testid="sponsor-wall-row"/g) ?? [];
    expect(rows.length).toBeGreaterThanOrEqual(2);
    for (const r of rows) {
      expect(r).toContain('justify-center');
      expect(r).not.toContain('grid');
    }
    const wall = html.match(/<div class="[^"]*" data-testid="sponsor-wall"/)![0];
    expect(wall).not.toContain('grid');
  });
  it('keeps roster order across the rows', () => {
    const order = [...html.matchAll(/<img src="\/sponsors\/[^"]*" alt="([^"]+)"/g)].map((m) => m[1]);
    expect(order).toEqual(SPONSOR_ROSTER);
  });
  it('gives each logo an explicit size from the sizing rule', () => {
    const imgs = html.match(/<img [^>]*>/g)!.filter((t) => t.includes('/sponsors/'));
    expect(imgs.length).toBe(SPONSOR_ROSTER.length);
    for (const t of imgs) expect(t).toMatch(/width:\d+px/);
  });
  it('keeps link behaviour: new tab, noopener, Augtera unlinked', () => {
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener"');
    for (const n of UNLINKED) expect(html).not.toMatch(new RegExp(`<a [^>]*><img[^>]*alt="${n}"`));
  });
  it('has no hard-coded sponsor-name list in the page source', () => {
    const named = SPONSOR_ROSTER.filter((n) => src.includes(`'${n}'`) || src.includes(`"${n}"`));
    expect(named, `page.tsx hard-codes: ${named.join(', ')}`).toEqual([]);
  });
});
