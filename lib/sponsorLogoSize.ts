// One sizing rule for the sponsor logo wall: the same target HEIGHT for every logo.
// Spec: docs/specs/2026-10-23-sponsor-logos-one-roster-every-surface-design.md (server repo)
// The media kit deck uses the same rule (brands_logo_layout.py in aone-platform); keep them equal.
//
// History: equal height made squarer marks (Cisco Press, Netris, Boson, USNUA) tiny beside wide
// wordmarks. Equal area (the first fix) overcorrected: those marks stood about 2.5x taller than
// Juniper Apstra and Itential. The eye reads a wall by its height, so every logo gets the same
// target height, with two clamps: a very wide wordmark shrinks to maxW, and a near-square or tall
// mark may grow, up to growMax x the target height and never more, until it is minW wide.
export type LogoBox = { height: number; maxW: number; minW: number; growMax: number };
export type Size = { w: number; h: number };

// Numbers chosen from the rendered preview, not guessed. Change them in one place.
export const LOGO_BOX: LogoBox = { height: 56, maxW: 320, minW: 140, growMax: 1.3 };

export function logoSize(aspect: number, box: LogoBox): Size {
  if (typeof aspect !== 'number' || !Number.isFinite(aspect) || aspect <= 0) {
    throw new Error(`logoSize: unreadable aspect ratio ${String(aspect)}`);
  }
  let h = box.height;
  let w = h * aspect;
  if (w < box.minW) { h = Math.min(box.minW / aspect, box.height * box.growMax); w = h * aspect; }
  if (w > box.maxW) { w = box.maxW; h = w / aspect; }
  return { w: Math.round(w), h: Math.round(h) };
}

export type WallEntry = { name: string; aspect: number };
export type Override = { scale: number; reason: string };

/** Size every logo on the wall. An override scales the target height and must carry a reason. */
export function sizeWall(
  entries: WallEntry[],
  overrides: Record<string, Override> = {},
  box: LogoBox = LOGO_BOX,
): Record<string, Size> {
  const out: Record<string, Size> = {};
  for (const { name, aspect } of entries) {
    const o = overrides[name];
    if (o && !o.reason) throw new Error(`size override for ${name} needs a reason`);
    out[name] = logoSize(aspect, o ? { ...box, height: box.height * o.scale } : box);
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
