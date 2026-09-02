/**
 * Publish data/metrics.json as a static endpoint alongside the episodes one.
 *
 * Same reasoning as scripts/fetch-episodes.ts: anything an outside consumer reads should
 * be published by the deploy, not scraped out of the git tree, so it cannot go stale
 * relative to the site.
 * Spec: 2026-09-02-episodes-endpoint-cannot-go-stale-design.md
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const SOURCE = resolve(process.cwd(), 'data/metrics.json');
const PUBLISHED = resolve(process.cwd(), 'public/api/metrics.json');

// Fail closed. Publishing an empty or partial metrics file over a good one would put
// wrong numbers in front of sponsors, which is the failure this whole area exists to stop.
const raw = readFileSync(SOURCE, 'utf8');
const parsed = JSON.parse(raw);
if (!parsed?.auto || !parsed?.manual || !parsed?.updated_at) {
  throw new Error(`${SOURCE} is missing auto/manual/updated_at; refusing to publish it`);
}

mkdirSync(dirname(PUBLISHED), { recursive: true });
writeFileSync(PUBLISHED, JSON.stringify(parsed, null, 2));
console.log(`Published metrics to ${PUBLISHED} (updated_at ${parsed.updated_at})`);
