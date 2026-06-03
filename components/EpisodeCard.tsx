import Link from 'next/link';
import type { Episode } from '@/lib/episodes';
import { formatDate, formatDuration } from '@/lib/format';

export function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="block border border-border bg-surface hover:border-accent-blue transition-colors px-6 py-5 rounded-sm"
    >
      <div className="flex items-baseline justify-between gap-4 text-xs text-text-muted font-mono uppercase tracking-label">
        <span>{formatDate(episode.publishedAt)}</span>
        {episode.durationSeconds > 0 && <span>{formatDuration(episode.durationSeconds)}</span>}
      </div>
      <h3 className="mt-3 font-display text-lg text-text">{episode.title}</h3>
      {episode.guests.length > 0 && (
        <p className="mt-1 text-sm text-text-muted">
          with {episode.guests.join(', ')}
        </p>
      )}
    </Link>
  );
}
