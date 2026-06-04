import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import feed from '@/data/episodes.json';
import type { Feed, Episode } from '@/lib/episodes';
import { orderedGuests } from '@/lib/episodes';
import { SectionLabel } from '@/components/SectionLabel';
import { SubscribeButtons } from '@/components/SubscribeButtons';
import { formatDate, formatDuration } from '@/lib/format';

const typedFeed = feed as Feed;

const findEpisode = (slug: string): Episode | undefined =>
  typedFeed.episodes.find((ep) => ep.slug === slug);

export function generateStaticParams() {
  return typedFeed.episodes.map((ep) => ({ slug: ep.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ep = findEpisode(params.slug);
  if (!ep) return { title: 'Episode not found' };
  return {
    title: ep.title,
    description: ep.summary.slice(0, 200),
  };
}

// Extract numeric Buzzsprout episode id from "Buzzsprout-19195553" for player embed
const playerIdFromGuid = (id: string): string | null => {
  const match = id.match(/^Buzzsprout-(\d+)$/);
  return match ? match[1] : null;
};

export default function EpisodePage({ params }: { params: { slug: string } }) {
  const ep = findEpisode(params.slug);
  if (!ep) notFound();

  const playerId = playerIdFromGuid(ep.id);
  const guests = orderedGuests(ep);

  return (
    <article className="mx-auto max-w-content px-6 py-16">
      <Link
        href="/episodes"
        className="text-xs font-mono uppercase tracking-label text-text-muted hover:text-accent-blue"
      >
        ← All episodes
      </Link>
      <div className="mt-6">
        <SectionLabel>Episode</SectionLabel>
      </div>
      <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">{ep.title}</h1>
      <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono uppercase tracking-label text-text-muted">
        <span>{formatDate(ep.publishedAt)}</span>
        {ep.durationSeconds > 0 && <span>{formatDuration(ep.durationSeconds)}</span>}
        {guests.length > 0 && (
          <span>with {guests.map((g) => g.name).join(', ')}</span>
        )}
      </div>

      {playerId && (
        <div className="mt-10">
          <iframe
            src={`https://www.buzzsprout.com/2127872/episodes/${playerId}?client_source=small_player&iframe=true`}
            loading="lazy"
            width="100%"
            height="200"
            allow="autoplay"
            className="border border-border rounded-sm"
            title={`Player for: ${ep.title}`}
          />
        </div>
      )}

      <div className="mt-12 grid md:grid-cols-[2fr_1fr] gap-12">
        <div>
          <SectionLabel>Show notes</SectionLabel>
          <div
            className="prose prose-invert max-w-none mt-4 text-text [&_a]:text-accent-blue [&_a:hover]:text-accent-green"
            dangerouslySetInnerHTML={{ __html: ep.showNotesHtml }}
          />
        </div>
        <aside>
          {guests.length > 0 && (
            <div className="mb-8">
              <SectionLabel>Guests</SectionLabel>
              <ul className="mt-4 space-y-4">
                {guests.map((g) => {
                  const inner = (
                    <div className="flex items-center gap-3">
                      {g.imageUrl ? (
                        <img
                          src={g.imageUrl}
                          alt=""
                          loading="lazy"
                          className="h-12 w-12 object-cover rounded-full border border-border bg-bg"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full border border-border bg-bg flex items-center justify-center text-text-muted text-xs font-display">
                          {g.name
                            .split(/\s+/)
                            .map((part) => part[0])
                            .filter(Boolean)
                            .slice(0, 2)
                            .join('')
                            .toUpperCase()}
                        </div>
                      )}
                      <span className="text-sm text-text font-semibold">{g.name}</span>
                    </div>
                  );
                  return (
                    <li key={`${g.name}-${g.href ?? ''}`}>
                      {g.href ? (
                        <a
                          href={g.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:opacity-90"
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <SectionLabel>Listen elsewhere</SectionLabel>
          <div className="mt-4">
            <SubscribeButtons />
          </div>
          <div className="mt-8">
            <SectionLabel>Direct audio</SectionLabel>
            <a
              href={ep.audioUrl}
              className="mt-4 inline-block text-sm text-accent-blue break-all"
            >
              MP3 download
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}
