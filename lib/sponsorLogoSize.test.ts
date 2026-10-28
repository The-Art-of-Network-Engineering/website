import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { SPONSOR_ROSTER, slug } from './sponsorLogos.gen';
import { SPONSOR_ASPECTS } from './sponsorLogoAspects';
import { SPONSOR_SIZE_OVERRIDES } from './sponsorLogoOverrides';
import { LOGO_BOX, logoSize, sizeWall, balanceRows } from './sponsorLogoSize';

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const entries = (names: string[]) => names.map((name) => ({ name, aspect: SPONSOR_ASPECTS[name] }));

describe('logoSize (equal visual weight)', () => {
  it('a wide and a near-square logo get equal area within tolerance', () => {
    const wide = logoSize(5, LOGO_BOX);
    const square = logoSize(1.5, LOGO_BOX);
    expect(Math.abs(wide.w * wide.h - square.w * square.h) / (wide.w * wide.h)).toBeLessThan(0.05);
    expect(square.h).toBeGreaterThan(wide.h);
  });
  it('keeps the aspect ratio', () => {
    const s = logoSize(4, LOGO_BOX);
    expect(s.w / s.h).toBeCloseTo(4, 1);
  });
  it('never exceeds the caps', () => {
    for (const a of [0.2, 1, 3, 8, 40]) {
      const s = logoSize(a, LOGO_BOX);
      expect(s.w).toBeLessThanOrEqual(LOGO_BOX.maxW);
      expect(s.h).toBeLessThanOrEqual(LOGO_BOX.maxH);
    }
  });
  it('fails loudly on unreadable aspects instead of sizing to zero', () => {
    for (const bad of [0, -1, NaN, Infinity, undefined as unknown as number]) {
      expect(() => logoSize(bad, LOGO_BOX)).toThrow();
    }
  });
});

describe('the measured aspect table', () => {
  it('covers every roster name and nothing else', () => {
    expect(Object.keys(SPONSOR_ASPECTS).sort()).toEqual([...SPONSOR_ROSTER].sort());
  });
  it('still matches the real PNG files (a replaced logo must refresh the table)', () => {
    const dir = resolve(process.cwd(), 'public', 'sponsors');
    for (const name of SPONSOR_ROSTER) {
      const buf = readFileSync(resolve(dir, `${slug(name)}.png`));
      const w = buf.readUInt32BE(16);
      const h = buf.readUInt32BE(20);
      const ratio = w / h / SPONSOR_ASPECTS[name];
      expect(ratio, `${name} file is ${w}x${h}`).toBeGreaterThan(0.95);
      expect(ratio, `${name} file is ${w}x${h}`).toBeLessThan(1.05);
    }
  });
  it('has a PNG for every roster name and no stray PNGs', () => {
    const files = readdirSync(resolve(process.cwd(), 'public', 'sponsors')).filter((f) => f.endsWith('.png'));
    expect(files.sort()).toEqual(SPONSOR_ROSTER.map((n) => `${slug(n)}.png`).sort());
  });
});

describe('overrides', () => {
  it('every override names a roster logo and gives a reason', () => {
    for (const [name, o] of Object.entries(SPONSOR_SIZE_OVERRIDES)) {
      expect(SPONSOR_ROSTER).toContain(name);
      expect(o.reason.trim().length, `${name} override has no reason`).toBeGreaterThan(10);
      expect(o.scale).toBeGreaterThan(0);
    }
  });
});

describe('sizeWall (the Andy complaint, as a test)', () => {
  const sizes = sizeWall(entries(SPONSOR_ROSTER), SPONSOR_SIZE_OVERRIDES);
  it('sizes every roster logo', () => {
    expect(Object.keys(sizes).sort()).toEqual([...SPONSOR_ROSTER].sort());
  });
  it('Cisco Press, Netris, Boson and USNUA are at least 85% of the median logo width', () => {
    const med = median(Object.values(sizes).map((s) => s.w));
    for (const n of ['Cisco Press', 'Netris', 'Boson', 'USNUA']) {
      expect(sizes[n].w / med, `${n} is ${sizes[n].w}px vs median ${med}`).toBeGreaterThanOrEqual(0.85);
    }
  });
  it('no logo exceeds the caps', () => {
    for (const s of Object.values(sizes)) {
      expect(s.w).toBeLessThanOrEqual(LOGO_BOX.maxW);
      expect(s.h).toBeLessThanOrEqual(LOGO_BOX.maxH);
    }
  });
});

describe('balanceRows (centred rows, no orphan)', () => {
  const real = Object.values(sizeWall(entries(SPONSOR_ROSTER), SPONSOR_SIZE_OVERRIDES)).map((s) => s.w);
  for (const n of [16, 17, 18]) {
    it(`${n} logos: nothing lost or reordered, no overflow, every row centred, no orphan row`, () => {
      const widths = Array.from({ length: n }, (_, i) => real[i % real.length]);
      const rows = balanceRows(widths, 1104, 40);
      expect(rows.flatMap((r) => r.items)).toEqual(widths);
      for (const r of rows) {
        const used = r.items.reduce((a, b) => a + b, 0) + 40 * (r.items.length - 1);
        expect(used).toBeLessThanOrEqual(1104);
        expect(r.left).toBeCloseTo((1104 - used) / 2, 5);
        expect(r.left).toBeGreaterThanOrEqual(0);
      }
      const last = rows[rows.length - 1];
      expect(last.items.length, 'last row is a lone logo').toBeGreaterThanOrEqual(3);
    });
  }
  it('rejects a logo wider than the container', () => {
    expect(() => balanceRows([2000], 1104, 40)).toThrow();
  });
});
