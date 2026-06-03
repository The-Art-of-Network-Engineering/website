import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import feed from '@/data/episodes.json';
import type { Feed, Episode } from '@/lib/episodes';
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

  return (
    <article className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Episode</SectionLabel>
      <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">{ep.title}</h1>
      <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono uppercase tracking-label text-text-muted">
        <span>{formatDate(ep.publishedAt)}</span>
        {ep.durationSeconds > 0 && <span>{formatDuration(ep.durationSeconds)}</span>}
        {ep.guests.length > 0 && <span>with {ep.guests.join(', ')}</span>}
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
