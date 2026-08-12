import type { Metadata } from 'next';
import feed from '@/data/episodes.json';
import type { Feed } from '@/lib/episodes';
import { guestSlug } from '@/lib/episodes';
import { SectionLabel } from '@/components/SectionLabel';
import { GuestSearch } from '@/components/GuestSearch';

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
      <GuestSearch guests={guests} />
    </div>
  );
}
