import type { Metadata } from 'next';
import feed from '@/data/episodes.json';
import type { Feed } from '@/lib/episodes';
import { EpisodeList } from '@/components/EpisodeList';
import { SectionLabel } from '@/components/SectionLabel';

const typedFeed = feed as Feed;

export const metadata: Metadata = {
  title: 'Episodes',
  description: 'Browse all episodes of The Art of Network Engineering.',
};

export default function EpisodesPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Archive</SectionLabel>
      <h1 className="mt-4 font-display text-4xl">All episodes</h1>
      <p className="mt-3 text-text-muted">
        {typedFeed.episodes.length} episodes since July 2020. Search by topic, guest name, or
        keyword.
      </p>
      <div className="mt-10">
        <EpisodeList episodes={typedFeed.episodes} />
      </div>
    </div>
  );
}
