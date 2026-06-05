import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { SectionLabel } from '@/components/SectionLabel';
import { formatDate } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Long-form writing from The Art of Network Engineering. Career, automation, AI, and the practical realities of running networks.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

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

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block border border-border bg-surface hover:border-accent-blue transition-colors rounded-sm overflow-hidden"
          >
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt=""
                loading="lazy"
                className="w-full h-48 object-cover border-b border-border"
              />
            )}
            <div className="p-6">
              <p className="text-xs font-mono uppercase tracking-label text-text-muted">
                {formatDate(post.publishedAt)}
              </p>
              <h2 className="mt-3 font-display text-xl text-text group-hover:text-accent-green transition-colors leading-snug">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-3 text-sm text-text-muted line-clamp-3">{post.excerpt}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
