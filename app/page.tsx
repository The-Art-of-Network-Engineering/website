import Link from 'next/link';
import feed from '@/data/episodes.json';
import type { Feed } from '@/lib/episodes';
import { EpisodeCard } from '@/components/EpisodeCard';
import { SectionLabel } from '@/components/SectionLabel';
import { SubscribeButtons } from '@/components/SubscribeButtons';

const typedFeed = feed as Feed;

export default function Home() {
  const latest = typedFeed.episodes[0];
  const recent = typedFeed.episodes.slice(1, 4);

  return (
    <div className="mx-auto max-w-content px-6">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <SectionLabel>The Art of Network Engineering</SectionLabel>
        <h1 className="mt-6 font-display text-5xl md:text-6xl leading-tight">
          Stories from the engineers who{' '}
          <span className="text-accent-green">build the internet</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-text-muted text-lg">
          AONE blends technical insight with real-world stories from engineers, innovators, and IT
          pros. From data centers on cruise ships to rockets in space. Authentic, practical, human.
        </p>
        <div className="mt-10">
          <SubscribeButtons />
        </div>
      </section>

      {/* Latest episode */}
      <section className="py-12 border-t border-border">
        <SectionLabel>Latest episode</SectionLabel>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <EpisodeCard episode={latest} />
          </div>
          <div className="md:col-span-1 grid gap-6">
            {recent.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>
        </div>
        <div className="mt-8">
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
        <h2 className="mt-4 font-display text-3xl">Launching Summer 2026.</h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          A quarterly dispatch from the AONE archive — what we learned, who we talked to, what's
          worth your time.
        </p>
        <div className="mt-6">
          <Link href="/newsletter" className="text-sm text-accent-blue">
            Subscribe →
          </Link>
        </div>
      </section>
    </div>
  );
}
