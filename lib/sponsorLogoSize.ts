// One sizing rule for the sponsor logo wall: equal visual weight, not equal height.
// Spec: docs/specs/2026-10-23-sponsor-logos-one-roster-every-surface-design.md (server repo)
//
// Equal height made squarer marks (Cisco Press, Netris, Boson, USNUA) tiny next to wide
// wordmarks. Here every logo gets the same AREA, clamped by a box, then a set-level floor
// lifts any logo narrower than a share of the median width so the small marks read like the rest.
export type LogoBox = { area: number; maxW: number; maxH: number; minWidthShare: number };
export type Size = { w: number; h: number };

// Numbers chosen from the before/after preview, not guessed. Change them in one place.
export const LOGO_BOX: LogoBox = { area: 5200, maxW: 210, maxH: 88, minWidthShare: 0.9 };

export function logoSize(aspect: number, box: LogoBox): Size {
  if (typeof aspect !== 'number' || !Number.isFinite(aspect) || aspect <= 0) {
    throw new Error(`logoSize: unreadable aspect ratio ${String(aspect)}`);
  }
  let w = Math.sqrt(box.area * aspect);
  let h = w / aspect;
  if (w > box.maxW) { w = box.maxW; h = w / aspect; }
  if (h > box.maxH) { h = box.maxH; w = h * aspect; }
  return { w: Math.round(w), h: Math.round(h) };
}

const median = (xs: number[]): number => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

export type WallEntry = { name: string; aspect: number };
export type Override = { scale: number; reason: string };

/** Size every logo on the wall: equal area, per-logo overrides, then the narrow-logo floor. */
export function sizeWall(
  entries: WallEntry[],
  overrides: Record<string, Override> = {},
  box: LogoBox = LOGO_BOX,
): Record<string, Size> {
  const base = entries.map(({ name, aspect }) => {
    const o = overrides[name];
    const s = logoSize(aspect, o ? { ...box, area: box.area * o.scale * o.scale } : box);
    return { name, aspect, ...s };
  });
  const floor = box.minWidthShare * median(base.map((b) => b.w));
  const out: Record<string, Size> = {};
  for (const b of base) {
    let { w, h } = b;
    if (w < floor) {
      w = Math.min(Math.round(floor), box.maxW, Math.round(box.maxH * b.aspect));
      h = Math.round(w / b.aspect);
    }
    out[b.name] = { w, h };
  }
  return out;
}

export type Row = { items: number[]; left: number };

/**
 * Split logos (in roster order) into the fewest rows that fit, then even the rows out so the
 * last one is never a lone orphan. Every row is centred: `left` is its offset from the edge.
 * The page renders each row as its own centred flex line, so the short row sits in the middle.
 */
export function balanceRows(widths: number[], containerW: number, gap: number): Row[] {
  const n = widths.length;
  const span = (a: number, b: number) => {
    let t = gap * (b - a - 1);
    for (let i = a; i < b; i++) t += widths[i];
    return t;
  };
  for (let k = 1; k <= n; k++) {
    // best[r][i]: smallest possible widest-row when the first i logos go into r rows.
    const best = Array.from({ length: k + 1 }, () => new Array<number>(n + 1).fill(Infinity));
    const cut = Array.from({ length: k + 1 }, () => new Array<number>(n + 1).fill(0));
    best[0][0] = 0;
    for (let r = 1; r <= k; r++) {
      for (let i = r; i <= n; i++) {
        for (let j = r - 1; j < i; j++) {
          const v = Math.max(best[r - 1][j], span(j, i));
          if (v < best[r][i]) { best[r][i] = v; cut[r][i] = j; }
        }
      }
    }
    if (best[k][n] <= containerW) {
      const rows: Row[] = [];
      let end = n;
      for (let r = k; r >= 1; r--) {
        const start = cut[r][end];
        rows.unshift({ items: widths.slice(start, end), left: (containerW - span(start, end)) / 2 });
        end = start;
      }
      return rows;
    }
  }
  throw new Error('balanceRows: a single logo is wider than the container');
}
