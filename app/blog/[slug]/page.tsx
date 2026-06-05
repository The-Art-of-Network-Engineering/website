import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { SectionLabel } from '@/components/SectionLabel';
import { formatDate } from '@/lib/format';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
      url: `/blog/${post.slug}`,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-content px-6 py-16">
      <Link
        href="/blog"
        className="text-xs font-mono uppercase tracking-label text-text-muted hover:text-accent-blue"
      >
        ← All posts
      </Link>
      <div className="mt-6">
        <SectionLabel>Blog</SectionLabel>
      </div>
      <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">{post.title}</h1>
      <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono uppercase tracking-label text-text-muted">
        <span>{formatDate(post.publishedAt)}</span>
        <span>by {post.author}</span>
      </div>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt=""
          className="mt-10 w-full max-w-4xl rounded-sm border border-border"
        />
      )}

      <div className="mt-12 grid md:grid-cols-[2fr_1fr] gap-12">
        <div className="prose prose-invert max-w-none text-text [&_a]:text-accent-blue [&_a:hover]:text-accent-green">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.bodyMarkdown}</ReactMarkdown>
        </div>
        <aside>
          {post.episodeSlug && (
            <div className="border border-border bg-surface p-6 rounded-sm">
              <SectionLabel>Related episode</SectionLabel>
              <Link
                href={`/episodes/${post.episodeSlug}`}
                className="mt-3 inline-block text-accent-blue hover:text-accent-green text-sm"
              >
                Listen to the episode →
              </Link>
            </div>
          )}
          <div className={`${post.episodeSlug ? 'mt-6 ' : ''}border border-border bg-surface p-6 rounded-sm`}>
            <SectionLabel>The newsletter</SectionLabel>
            <p className="mt-3 text-sm text-text">
              The Shortest Path: practical career guidance from network engineering's brightest
              minds, delivered weekly.
            </p>
            <Link href="/newsletter" className="mt-4 inline-block text-sm text-accent-blue">
              Sign up →
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
