import Link from 'next/link';
import type { Episode } from '@/lib/episodes';
import { orderedGuests } from '@/lib/episodes';
import { formatDate, formatDuration } from '@/lib/format';
import feed from '@/data/episodes.json';

const SHOW_FALLBACK_IMAGE = (feed as { show: { image: string } }).show.image;

export function EpisodeCard({ episode }: { episode: Episode }) {
  const guests = orderedGuests(episode);
  const primaryImage =
    episode.youtube?.thumbnailUrl ??
    guests.find((g) => g.imageUrl)?.imageUrl ??
    episode.artworkUrl ??
    SHOW_FALLBACK_IMAGE;
  const guestNames = guests.map((g) => g.name);

  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="group flex gap-4 border border-border bg-surface hover:border-accent-blue transition-colors p-4 rounded-sm"
    >
      <div className="flex-shrink-0 w-32 sm:w-40 aspect-video overflow-hidden rounded-sm border border-border bg-bg">
        <img
          src={primaryImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4 text-xs text-text-muted font-mono uppercase tracking-label">
          <span>{formatDate(episode.publishedAt)}</span>
          {episode.durationSeconds > 0 && <span>{formatDuration(episode.durationSeconds)}</span>}
        </div>
        <h3 className="mt-2 text-base text-text font-semibold leading-snug group-hover:text-accent-green transition-colors">
          {episode.title}
        </h3>
        {guestNames.length > 0 && (
          <p className="mt-1 text-sm text-text-muted truncate">with {guestNames.join(', ')}</p>
        )}
      </div>
    </Link>
  );
}
