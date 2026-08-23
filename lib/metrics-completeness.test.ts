/**
 * Completeness gate (spec: 2026-08-23-metrics-pipeline-completeness-design).
 *
 * The invariant last week's work was missing: every number a visitor can see on a public page
 * MUST come from a data source (an expression like `{metrics.x}` / `{reach.y}` / a mapped
 * external_citations entry), never a hand-typed literal. A metric-shaped literal sitting in page
 * source is a hand-typed metric by definition — this test fails the build on it, so map- and
 * page-completeness stop living in a human's head.
 *
 * "Metric-shaped" = comma-grouped numbers (2,500), percentages (86%), or "N+" claims (200+).
 * Ad lengths (30-second), call lengths (15-min), day windows (90 days) and bare years (2026)
 * are deliberately NOT matched. Genuinely-static non-metric exceptions go in ALLOWLIST with a
 * reason; there should be almost none.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const APP_DIR = join(__dirname, '..', 'app');

// Single ordered alternation: the "N+" form wins first so "2,500+" is one hit, not also "2,500".
//   \d[\d,]*\+      "N+" claims: 200+  2,500+  4,000+
//   \d{1,3}(,\d{3})+  comma-grouped: 2,500  4,000  246,000
//   \d+%            percentages: 60%  86%
const METRIC_RE = /\d[\d,]*\+|\d{1,3}(?:,\d{3})+|\d+%/g;

// Non-metric literals that are legitimately allowed on a page. Add with a one-line reason.
// Non-metric literals allowed on a SPECIFIC page, each with a reason. Keep this tiny.
const ALLOWLIST: { file: string; literal: string; reason: string }[] = [
  {
    file: 'app/press/page.tsx',
    literal: '800+',
    reason: "AutoCon audience size in Andy's bio — a historical event fact, not an AONE audience metric.",
  },
];

function collectPages(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...collectPages(full));
    else if (entry === 'page.tsx') out.push(full);
  }
  return out;
}

/**
 * Reduce to what a visitor actually reads: rendered JSX text + content strings. Strip imports,
 * comments, and the code contexts where numbers are layout, not metrics — className/style
 * (Tailwind like `w-[100%]`, inline styles) and href/src URLs (encoded chars like `%20`).
 */
function scannableText(src: string): string {
  return src
    .split('\n')
    .filter((l) => !l.trimStart().startsWith('import '))
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/className="[^"]*"/g, '')
    .replace(/className=\{[^}]*\}/g, '')
    .replace(/style=\{\{[^}]*\}\}/g, '')
    .replace(/(?:href|src)="[^"]*"/g, '')
    // Dimensional CSS is layout, not a metric: width="100%", height="100%", width: '100%'.
    .replace(/\b(?:min|max)?(?:width|height)="[^"]*"/gi, '')
    .replace(/\b(?:min|max)?(?:width|height):\s*['"][^'"]*['"]/gi, '');
}

function findMetricLiterals(src: string): string[] {
  const text = scannableText(src);
  const hits: string[] = [];
  for (const m of text.matchAll(METRIC_RE)) hits.push(m[0]);
  return hits;
}

describe('metrics completeness', () => {
  it('scannableText helper strips import lines and comments', () => {
    const src = "import x from '@/data/metrics.json';\n// 9,999 in a comment\nconst a = '2,500';";
    const t = scannableText(src);
    expect(t).not.toContain('metrics.json');
    expect(t).not.toContain('9,999');
    expect(t).toContain('2,500');
  });

  it('findMetricLiterals catches comma-numbers, percents, and N+ but not ad/day/year forms', () => {
    const src = `const s = 'reaches 2,500+ in 90 days, 60% recall, 30-second read, in 2026';`;
    expect(findMetricLiterals(src).sort()).toEqual(['2,500+', '60%']);
  });

  it('no hardcoded metric literals on any public page', () => {
    const pages = collectPages(APP_DIR);
    const offenders: string[] = [];
    for (const file of pages) {
      const rel = file.slice(file.indexOf('/app/') + 1);
      for (const lit of findMetricLiterals(readFileSync(file, 'utf8'))) {
        if (ALLOWLIST.some((a) => rel.endsWith(a.file) && a.literal === lit)) continue;
        offenders.push(`${rel}: "${lit}"`);
      }
    }
    if (offenders.length) {
      throw new Error(
        'Hardcoded metric literals found — every metric must be data-driven ' +
          '(expression from a pipeline data file) or a mapped external_citations entry:\n' +
          offenders.map((o) => `  ${o}`).join('\n'),
      );
    }
    expect(offenders).toEqual([]);
  });
});
