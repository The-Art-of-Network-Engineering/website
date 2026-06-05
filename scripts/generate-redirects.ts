import { writeFileSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import matter from 'gray-matter';

// Manual redirects (not derived from data)
const manualRules = [
  '/work-with-us /sponsor 301',
  '/work-with-us/ /sponsor 301',
];

// Auto-generate 301s from the old WordPress URL pattern (/YYYY/MM/DD/slug/)
// to the new /blog/slug paths. Reads frontmatter from every post markdown file.
function blogRedirectRules(): string[] {
  const postsDir = resolve(process.cwd(), 'content/posts');
  if (!existsSync(postsDir)) return [];
  const rules: string[] = [];
  for (const filename of readdirSync(postsDir)) {
    if (!filename.endsWith('.md')) continue;
    const raw = readFileSync(join(postsDir, filename), 'utf-8');
    const { data } = matter(raw);
    const slug = String(data.slug ?? filename.replace(/\.md$/, ''));
    const published = String(data.publishedAt ?? '').slice(0, 10);
    const [yyyy, mm, dd] = published.split('-');
    if (!yyyy || !mm || !dd) continue;
    // Guard the data -> _redirects boundary: a slug or date with whitespace/newlines
    // would inject extra rules. Each component must be a safe URL-path segment.
    if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
      console.warn(`Skipping ${filename}: slug "${slug}" contains unsafe characters`);
      continue;
    }
    if (!/^\d{4}$/.test(yyyy) || !/^\d{2}$/.test(mm) || !/^\d{2}$/.test(dd)) continue;
    const wpPath = `/${yyyy}/${mm}/${dd}/${slug}`;
    // Cover both with and without trailing slash
    rules.push(`${wpPath} /blog/${slug} 301`);
    rules.push(`${wpPath}/ /blog/${slug} 301`);
  }
  return rules;
}

const rules = [...manualRules, ...blogRedirectRules()];

const out = resolve(process.cwd(), 'out/_redirects');
if (!existsSync(dirname(out))) {
  console.error('out/ directory does not exist — run `next build` first');
  process.exit(1);
}
writeFileSync(out, rules.join('\n') + '\n');
console.log(`Wrote ${rules.length} redirect rules to ${out}`);
