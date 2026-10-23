import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { SectionLabel } from '@/components/SectionLabel';
import { BlogSearch } from '@/components/BlogSearch';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Long-form writing from The Art of Network Engineering. Career, automation, AI, and the practical realities of running networks.',
};

export default function BlogIndex() {
  const posts = getAllPosts();
  // The body crosses to the client too now (2026-10-23), for search ONLY -- never
  // rendered, see BlogSearch's PostCard type. This is a fully static export
  // (output: 'export' in next.config), so there is no server to search on; client-
  // side is the only option. Title/excerpt-only search missed real posts by their
  // actual topic, only finding them by headline wording -- confirmed live, the
  // Munich / John Capobianco post for "spec driven development" (in the body five
  // times, in neither the title nor the excerpt).
  const cards = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    publishedAt: p.publishedAt,
    excerpt: p.excerpt,
    coverImage: p.coverImage,
    body: p.bodyMarkdown,
  }));

  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-content px-6 py-16">
        <SectionLabel>Blog</SectionLabel>
        <h1 className="mt-4 font-display text-4xl">Blog</h1>
        <p className="mt-6 text-text-muted">Posts coming soon.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Blog</SectionLabel>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">Notes from the field.</h1>
      <p className="mt-6 max-w-2xl text-text-muted text-lg">
        Long-form writing on career, automation, AI, and the practical realities of running
        networks.
      </p>

      <BlogSearch posts={cards} />
    </div>
  );
}
