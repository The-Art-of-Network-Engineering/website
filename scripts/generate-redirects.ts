import { writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const rules = [
  '/work-with-us /sponsor 301',
  '/work-with-us/ /sponsor 301',
  '/blog https://www.linkedin.com/company/the-art-of-network-engineering/posts/ 302',
  '/blog/* https://www.linkedin.com/company/the-art-of-network-engineering/posts/ 302',
];

const out = resolve(process.cwd(), 'out/_redirects');
if (!existsSync(dirname(out))) {
  console.error('out/ directory does not exist — run `next build` first');
  process.exit(1);
}
writeFileSync(out, rules.join('\n') + '\n');
console.log(`Wrote ${rules.length} redirect rules to ${out}`);
