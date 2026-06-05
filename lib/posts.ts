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

  return posts;
}

export function getAllPosts(): Post[] {
  return readAllPostFiles();
}

export function getPostBySlug(slug: string): Post | undefined {
  return readAllPostFiles().find((p) => p.slug === slug);
}
