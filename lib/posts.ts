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

// Returns the moment a post becomes public: 8 AM America/New_York on the
// publishedAt date. Picks the UTC hour (12 or 13) that maps to 08:00 ET on
// that calendar date, so EDT/EST transitions are handled automatically.
export function publicationMoment(publishedAt: string): Date {
  const [y, m, d] = publishedAt.split('-').map(Number);
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    hour12: false,
  });
  for (const hourUTC of [12, 13]) {
    const candidate = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1, hourUTC, 0, 0));
    const localHour = parseInt(fmt.format(candidate), 10);
    if (localHour === 8) return candidate;
  }
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1, 12, 0, 0));
}

export function isPublic(post: Pick<Post, 'publishedAt'>, now: Date = new Date()): boolean {
  return now.getTime() >= publicationMoment(post.publishedAt).getTime();
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
