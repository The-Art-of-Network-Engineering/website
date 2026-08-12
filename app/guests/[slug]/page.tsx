import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import feed from '@/data/episodes.json';
import type { Feed, Episode } from '@/lib/episodes';
import { guestSlug, guestProfile } from '@/lib/episodes';
import { EpisodeCard } from '@/components/EpisodeCard';
import { SectionLabel } from '@/components/SectionLabel';

const typedFeed = feed as Feed;

// Resolve a guest slug back to the canonical display name (first spelling we see),
// their public headshot + personal URL (from the episode guest entry), and every
// episode featuring them, newest first.
function guestForSlug(
  slug: string,
): { name: string; imageUrl: string | null; href: string | null; episodes: Episode[] } | null {
  let name: string | null = null;
  let imageUrl: string | null = null;
  let href: string | null = null;
  const episodes: Episode[] = [];
  for (const ep of typedFeed.episodes) {
    const match = ep.guests.find((g) => guestSlug(g.name) === slug);
    if (match) {
      if (name === null) name = match.name;
      if (imageUrl === null && match.imageUrl) imageUrl = match.imageUrl;
      if (href === null && match.href) href = match.href;
      episodes.push(ep);
    }
  }
  if (name === null) return null;
  episodes.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return { name, imageUrl, href, episodes };
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

  const profile = guestProfile(slug);

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

      <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-6">
        {guest.imageUrl && (
          <img
            src={guest.imageUrl}
            alt={guest.name}
            className="h-28 w-28 flex-shrink-0 rounded-full border border-border object-cover"
          />
        )}
        <div>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">{guest.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
            <span>
              {guest.episodes.length} {guest.episodes.length === 1 ? 'episode' : 'episodes'}
            </span>
            {guest.href && (
              <a
                href={guest.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:text-accent-green"
              >
                Personal link ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {profile?.bioHtml && (
        <div
          className="mt-8 max-w-2xl text-text leading-relaxed [&_p]:mt-4 [&_a]:text-accent-blue [&_a:hover]:text-accent-green"
          dangerouslySetInnerHTML={{ __html: profile.bioHtml }}
        />
      )}

      <div className="mt-12">
        <SectionLabel>Episodes</SectionLabel>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {guest.episodes.map((ep) => (
          <EpisodeCard key={ep.id} episode={ep} />
        ))}
      </div>
    </div>
  );
}
