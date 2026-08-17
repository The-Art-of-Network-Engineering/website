// Regenerates components/sponsorLogos.ts with a content hash in each logo's src, so a
// changed image busts caches automatically. Runs in `prebuild`, so every deploy is fresh.
// The interesting logic lives in lib/sponsorLogos.gen.ts (unit-tested); this is just I/O.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SPONSOR_CATEGORIES, buildCategories, renderModule } from '../lib/sponsorLogos.gen';

const pubDir = resolve(process.cwd(), 'public', 'sponsors');

const hashFn = (slug: string): string =>
  createHash('sha256').update(readFileSync(resolve(pubDir, `${slug}.png`))).digest('hex').slice(0, 8);

const categories = buildCategories(SPONSOR_CATEGORIES, hashFn);
writeFileSync(resolve(process.cwd(), 'components', 'sponsorLogos.ts'), renderModule(categories));
const n = categories.reduce((acc, c) => acc + c.logos.length, 0);
console.log(`generated components/sponsorLogos.ts with content hashes for ${n} logos`);
