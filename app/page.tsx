import Link from 'next/link';
import feed from '@/data/episodes.json';
import type { Feed } from '@/lib/episodes';
import { NewsletterForm } from '@/components/NewsletterForm';
import { SectionLabel } from '@/components/SectionLabel';
import { SubscribeButtons } from '@/components/SubscribeButtons';

const typedFeed = feed as Feed;

// Apple Podcasts show ID, kept as a fallback when the latest episode has no
// YouTube match yet (e.g. brand-new episode published before youtube_map refresh).
const APPLE_SHOW_ID = '1525015389';

// Extract the numeric Buzzsprout episode ID from a guid like "Buzzsprout-19195553"
// so we can build the audio player iframe URL.
const buzzsproutPlayerId = (guid: string): string | null => {
  const m = guid.match(/^Buzzsprout-(\d+)$/);
  return m ? m[1] : null;
};

export default function Home() {
  const latest = typedFeed.episodes[0];
  const latestYt = latest.youtube?.videoId ?? null;
  const latestAudioPlayerId = buzzsproutPlayerId(latest.id);

  return (
    <div className="mx-auto max-w-content px-6">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <h1 className="font-display text-5xl md:text-6xl leading-tight">
          Behind every network is a{' '}
          <span className="text-accent-green">story</span>.
        </h1>
        <p className="mt-6 max-w-3xl text-text-muted text-lg">
          The Art of Network Engineering delivers authentic conversations with engineers,
          architects, and innovators building the infrastructure running our digital lives.
          Technical depth, career insight, and compelling stories from the front lines of IT.
        </p>
        <div className="mt-10">
          <SubscribeButtons />
        </div>
      </section>

      {/* Latest episode */}
      <section className="py-12 border-t border-border">
        <SectionLabel>Latest episode</SectionLabel>
        <h2 className="mt-4 font-display text-2xl md:text-3xl leading-snug max-w-3xl">
          {latest.title}
        </h2>
        <div className="mt-6 max-w-4xl space-y-6">
          {latestYt ? (
            <div>
              <p className="text-xs font-mono uppercase tracking-label text-text-muted mb-2">
                Watch
              </p>
              <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${latestYt}`}
                  title={`YouTube: ${latest.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border border-border rounded-sm"
                />
              </div>
            </div>
          ) : (
            <iframe
              allow="autoplay *; encrypted-media *; clipboard-write"
              height="450"
              style={{
                width: '100%',
                maxWidth: '720px',
                overflow: 'hidden',
                borderRadius: '10px',
              }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src={`https://embed.podcasts.apple.com/us/podcast/the-art-of-network-engineering/id${APPLE_SHOW_ID}?theme=auto`}
              title="The Art of Network Engineering on Apple Podcasts"
            />
          )}
          {latestAudioPlayerId && (
            <div>
              <p className="text-xs font-mono uppercase tracking-label text-text-muted mb-2">
                Or listen
              </p>
              <iframe
                src={`https://www.buzzsprout.com/2127872/episodes/${latestAudioPlayerId}?client_source=small_player&iframe=true`}
                loading="lazy"
                width="100%"
                height="200"
                allow="autoplay"
                className="border border-border rounded-sm"
                title={`Audio player: ${latest.title}`}
              />
            </div>
          )}
        </div>
        <div className="mt-8 flex flex-wrap gap-6">
          <Link href={`/episodes/${latest.slug}`} className="text-sm text-accent-blue">
            Show notes →
          </Link>
          <Link href="/episodes" className="text-sm text-accent-blue">
            Browse all {typedFeed.episodes.length} episodes →
          </Link>
        </div>
      </section>

      {/* Sponsor CTA */}
      <section className="py-16 border-t border-border">
        <SectionLabel>For Sponsors</SectionLabel>
        <h2 className="mt-4 font-display text-3xl">
          Reach the network engineers who <span className="text-accent-green">build, evaluate, and buy</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          One million lifetime downloads. 2,800 engineers per episode. 9,300 monthly catalog
          impressions across 200+ shows.
        </p>
        <div className="mt-6">
          <Link
            href="/sponsor"
            className="inline-block bg-accent-green text-bg font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
          >
            See sponsor options
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 border-t border-border">
        <SectionLabel>Newsletter</SectionLabel>
        <h2 className="mt-4 font-display text-3xl">
          The Shortest Path. <span className="text-text-muted">Launching Summer 2026.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          Practical career guidance from our industry's brightest minds, delivered to your inbox
          every week.
        </p>
        <div className="mt-3 max-w-xl">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
