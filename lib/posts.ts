import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

export type Post = {
  slug: string;
  title: string;
  publishedAt: string; // ISO date "YYYY-MM-DD"
  excerpt: string;
  author: string;
  episodeSlug?: string;
  coverImage?: string;
  bodyMarkdown: string;
};

const POSTS_DIR = join(process.cwd(), 'content/posts');

// Returns the moment a post becomes public: 6 AM America/New_York on the
// publishedAt date, the minute the podcast episode goes live. Picks the UTC hour
// (10 or 11) that maps to 06:00 ET on that calendar date, so EDT/EST transitions
// are handled automatically. (Was 8 AM until 2026-10-20, which put every episode's
// post two hours behind it. trigger-pages-rebuild.sh already rebuilds at 06:05 ET.)
export function publicationMoment(publishedAt: string): Date {
  const [y, m, d] = publishedAt.split('-').map(Number);
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    hour12: false,
  });
  for (const hourUTC of [10, 11]) {
    const candidate = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1, hourUTC, 0, 0));
    const localHour = parseInt(fmt.format(candidate), 10);
    if (localHour === 6) return candidate;
  }
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1, 10, 0, 0));
}

// YYYY-MM-DD for a moment, read in America/New_York. Used to compare calendar
// dates without the hour-boundary edge cases (like Intl's midnight "24") that
// come with computing an exact moment.
function etDateString(d: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(d);
}

// Episode-tied posts wait for 6 AM ET so the post and the episode it accompanies
// drop together. A post with no episodeSlug isn't coordinating with anything, so
// it's public as soon as its date arrives in ET, any time of day.
export function isPublic(
  post: Pick<Post, 'publishedAt' | 'episodeSlug'>,
  now: Date = new Date()
): boolean {
  if (post.episodeSlug) {
    return now.getTime() >= publicationMoment(post.publishedAt).getTime();
  }
  return etDateString(now) >= post.publishedAt;
}

function readAllPostFiles(): Post[] {
  let filenames: string[] = [];
  try {
    filenames = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  } catch {
    return []; // directory may not exist yet during early dev
  }

  const posts = filenames.map((filename) => {
    const raw = readFileSync(join(POSTS_DIR, filename), 'utf-8');
    const parsed = matter(raw);
    const slug = (parsed.data.slug as string | undefined) ?? filename.replace(/\.md$/, '');
    const publishedAt = String(parsed.data.publishedAt ?? '1970-01-01').slice(0, 10);
    return {
      slug,
      title: String(parsed.data.title ?? 'Untitled'),
      publishedAt,
      excerpt: String(parsed.data.excerpt ?? ''),
      author: String(parsed.data.author ?? 'Andy Lapteff'),
      episodeSlug: parsed.data.episodeSlug ? String(parsed.data.episodeSlug) : undefined,
      coverImage: parsed.data.coverImage ? String(parsed.data.coverImage) : undefined,
      bodyMarkdown: parsed.content,
    };
  });

  // Newest first
  posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  // Detect duplicate slugs at build time — fail loudly
  const seen = new Set<string>();
  for (const p of posts) {
    if (seen.has(p.slug)) {
      throw new Error(`Duplicate blog post slug detected: "${p.slug}"`);
    }
    seen.add(p.slug);
  }

  // Hide future-dated posts unless SHOW_DRAFTS=1 (for local preview).
  if (process.env.SHOW_DRAFTS === '1') return posts;
  const now = new Date();
  return posts.filter((p) => isPublic(p, now));
}

export function getAllPosts(): Post[] {
  return readAllPostFiles();
}

export function getPostBySlug(slug: string): Post | undefined {
  return readAllPostFiles().find((p) => p.slug === slug);
}
