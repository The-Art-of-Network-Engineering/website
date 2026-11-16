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

describe('logoSize (same target height, width-capped, near-square marks may grow)', () => {
  it('a wide logo gets exactly the target height', () => {
    expect(logoSize(4, LOGO_BOX).h).toBe(LOGO_BOX.height);
  });
  it('a very wide logo shrinks to the width cap and keeps its aspect', () => {
    const s = logoSize(20, LOGO_BOX);
    expect(s.w).toBe(LOGO_BOX.maxW);
    expect(s.w / s.h).toBeCloseTo(20, 0);
  });
  it('a near-square logo grows, but never past growMax x the target height', () => {
    const s = logoSize(1, LOGO_BOX);
    expect(s.h).toBeGreaterThan(LOGO_BOX.height);
    expect(s.h).toBeLessThanOrEqual(LOGO_BOX.height * LOGO_BOX.growMax + 1);
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

describe('sizeWall (the Andy complaint, as hard acceptance tests)', () => {
  const sizes = sizeWall(entries(SPONSOR_ROSTER), SPONSOR_SIZE_OVERRIDES);
  const hs = Object.values(sizes).map((s) => s.h);
  const ws = Object.values(sizes).map((s) => s.w);
  it('sizes every roster logo, NAF included', () => {
    expect(Object.keys(sizes).sort()).toEqual([...SPONSOR_ROSTER].sort());
    expect(sizes['NAF']).toBeDefined();
  });
  it('rendered heights sit in a tight band: tallest is at most 1.5x the shortest', () => {
    expect(Math.max(...hs) / Math.min(...hs)).toBeLessThanOrEqual(1.5);
  });
  it('no logo is wider than 2.2x the median width', () => {
    expect(Math.max(...ws)).toBeLessThanOrEqual(2.2 * median(ws));
  });
  it('Cisco Press, Netris, Boson, USNUA and NAF are at least 85% of the median height', () => {
    const med = median(hs);
    for (const n of ['Cisco Press', 'Netris', 'Boson', 'USNUA', 'NAF']) {
      expect(sizes[n].h / med, `${n} is ${sizes[n].h}px vs median ${med}`).toBeGreaterThanOrEqual(0.85);
    }
  });
  it('no logo exceeds the width cap or the grow cap', () => {
    for (const s of Object.values(sizes)) {
      expect(s.w).toBeLessThanOrEqual(LOGO_BOX.maxW);
      expect(s.h).toBeLessThanOrEqual(LOGO_BOX.height * LOGO_BOX.growMax + 1);
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
