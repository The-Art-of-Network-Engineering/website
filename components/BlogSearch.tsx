'use client';

import { useState } from 'react';
import Link from 'next/link';
import { filterPosts } from '@/lib/episodes';
import { formatDate } from '@/lib/format';

type PostCard = {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt?: string;
  coverImage?: string;
};

export function BlogSearch({ posts }: { posts: PostCard[] }) {
  const [query, setQuery] = useState('');
  const filtered = filterPosts(posts, query);
  const trimmed = query.trim();

  return (
    <div className="mt-8">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts by title or topic…"
        aria-label="Search blog posts"
        className="w-full max-w-xl rounded-sm border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-accent-blue focus:outline-none"
      />
      <p className="mt-3 text-xs font-mono uppercase tracking-label text-text-muted">
        {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
        {trimmed ? ` matching “${trimmed}”` : ''}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 text-text-muted">No posts match “{trimmed}”.</p>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {filtered.map((post) => (
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
      )}
    </div>
  );
}
