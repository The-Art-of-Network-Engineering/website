import type { Metadata } from 'next';
import Link from 'next/link';
import feed from '@/data/episodes.json';
import type { Feed } from '@/lib/episodes';
import { guestSlug } from '@/lib/episodes';
import { SectionLabel } from '@/components/SectionLabel';

const typedFeed = feed as Feed;

export const metadata: Metadata = {
  title: 'Guests',
  description: 'Browse every guest who has appeared on The Art of Network Engineering.',
  alternates: { canonical: '/guests' },
};

type GuestSummary = { name: string; slug: string; count: number; imageUrl: string | null };

function allGuests(): GuestSummary[] {
  const bySlug = new Map<string, GuestSummary>();
  for (const ep of typedFeed.episodes) {
    for (const g of ep.guests) {
      const slug = guestSlug(g.name);
      const existing = bySlug.get(slug);
      if (existing) {
        existing.count += 1;
        if (!existing.imageUrl && g.imageUrl) existing.imageUrl = g.imageUrl;
      } else {
        bySlug.set(slug, { name: g.name, slug, count: 1, imageUrl: g.imageUrl });
      }
    }
  }
  return Array.from(bySlug.values()).sort((a, b) =>
    a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
  );
}

export default function GuestsPage() {
  const guests = allGuests();

  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Archive</SectionLabel>
      <h1 className="mt-4 font-display text-4xl">All guests</h1>
      <p className="mt-3 text-text-muted">
        {guests.length} guests across the show. Browse every conversation by the people in it.
      </p>
      <ul className="mt-10 grid gap-3 md:grid-cols-2">
        {guests.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guests/${g.slug}`}
              className="group flex items-center gap-3 border border-border bg-surface hover:border-accent-blue transition-colors px-4 py-3 rounded-sm"
            >
              {g.imageUrl && (
                <img
                  src={g.imageUrl}
                  alt=""
                  className="h-9 w-9 flex-shrink-0 rounded-full border border-border object-cover"
                />
              )}
              <span className="text-sm text-text font-semibold group-hover:text-accent-green transition-colors">
                {g.name}
              </span>
              <span className="ml-auto flex-shrink-0 text-xs text-text-muted font-mono uppercase tracking-label">
                {g.count} {g.count === 1 ? 'episode' : 'episodes'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
