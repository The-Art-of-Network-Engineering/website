import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import feed from '@/data/episodes.json';
import type { Feed, Episode } from '@/lib/episodes';
import { guestSlug } from '@/lib/episodes';
import { EpisodeCard } from '@/components/EpisodeCard';
import { SectionLabel } from '@/components/SectionLabel';

const typedFeed = feed as Feed;

// Resolve a guest slug back to the canonical display name (first spelling we see),
// along with every episode featuring that guest, newest first.
function guestForSlug(slug: string): { name: string; episodes: Episode[] } | null {
  let name: string | null = null;
  const episodes: Episode[] = [];
  for (const ep of typedFeed.episodes) {
    const match = ep.guests.find((g) => guestSlug(g.name) === slug);
    if (match) {
      if (name === null) name = match.name;
      episodes.push(ep);
    }
  }
  if (name === null) return null;
  episodes.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return { name, episodes };
}

export function generateStaticParams() {
  const slugs = new Set<string>();
  for (const ep of typedFeed.episodes) {
    for (const g of ep.guests) {
      slugs.add(guestSlug(g.name));
    }
  }
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guest = guestForSlug(slug);
  if (!guest) return { title: 'Guest not found' };
  return {
    title: `Episodes with ${guest.name}`,
    description: `Every episode of The Art of Network Engineering featuring ${guest.name}.`,
    alternates: { canonical: `/guests/${slug}` },
  };
}

export default async function GuestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guest = guestForSlug(slug);
  if (!guest) notFound();

  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <Link
        href="/guests"
        className="text-xs font-mono uppercase tracking-label text-text-muted hover:text-accent-blue"
      >
        ← All guests
      </Link>
      <div className="mt-6">
        <SectionLabel>Guest</SectionLabel>
      </div>
      <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">{guest.name}</h1>
      <p className="mt-3 text-text-muted">
        {guest.episodes.length} {guest.episodes.length === 1 ? 'episode' : 'episodes'}
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {guest.episodes.map((ep) => (
          <EpisodeCard key={ep.id} episode={ep} />
        ))}
      </div>
    </div>
  );
}
