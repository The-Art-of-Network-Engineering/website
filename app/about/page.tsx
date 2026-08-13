import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionLabel } from '@/components/SectionLabel';
import { metrics } from '@/lib/metrics';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The Art of Network Engineering tells the human stories behind network engineering. Built by and for the practitioners who run the internet.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>About</SectionLabel>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">The Art of Network Engineering</h1>

      {/* Why statement, from Andy's positioning doc */}
      <p className="mt-10 max-w-3xl text-text text-xl md:text-2xl leading-snug">
        We tell the human stories behind network engineering so every engineer feels seen,
        supported, and inspired to grow in a rapidly changing industry.
      </p>

      <div className="mt-12 grid md:grid-cols-[2fr_1fr] gap-12">
        <div className="space-y-8 text-text">
          <section>
            <SectionLabel>What we do</SectionLabel>
            <div className="mt-4 space-y-4">
              <p>
                The Art of Network Engineering blends technical insight with real-world stories
                from engineers, innovators, and IT pros. From data centers on cruise ships to
                rockets in space, we explore the people, tools, and trends shaping the future of
                networking, while keeping it authentic, practical, and human.
              </p>
              <p>
                Most networking content feeds your brain. AONE is built to feed your journey.
                We pair deep technical conversations with the personal stuff that rarely gets
                aired: career pivots, burnout, breaking into the industry, building a name when
                no one's watching, learning new things when the floor keeps moving.
              </p>
            </div>
          </section>

          <section>
            <SectionLabel>Where it started</SectionLabel>
            <div className="mt-4 space-y-4">
              <p>
                AONE launched in July 2020. Six years and 200+ episodes later, it's one of the
                largest independent media platforms built specifically for network engineers
                and infrastructure professionals, with {metrics.lifetimeDownloads} lifetime downloads
                and a per-episode audience that grows year over year.
              </p>
              <p>
                What started as a podcast has grown into a multi-channel platform: long-form
                audio interviews, short and long-form video on YouTube, a Discord community of
                {' '}{metrics.discordMembers} engineers, and The Shortest Path, our newsletter for network engineers.
              </p>
            </div>
          </section>

          <section>
            <SectionLabel>What you'll find here</SectionLabel>
            <ul className="mt-4 space-y-3 list-disc pl-5 marker:text-accent-green">
              <li>
                <span className="text-text font-semibold">Conversations with practitioners.</span>{' '}
                Engineers, architects, vendors, educators, and founders. The people doing the
                work, in their own words.
              </li>
              <li>
                <span className="text-text font-semibold">Career stories, not just career advice.</span>{' '}
                How people break in, level up, change tracks, get hired, and stay sane.
              </li>
              <li>
                <span className="text-text font-semibold">Practical technical depth.</span>{' '}
                Cloud, automation, AI, wireless, security, routing, observability. Taught by
                the people writing the playbooks.
              </li>
              <li>
                <span className="text-text font-semibold">A community that shows up.</span>{' '}
                Discord, comments, in-person meetups, listener stories on the show.
              </li>
            </ul>
          </section>

          <section>
            <SectionLabel>Host</SectionLabel>
            <div className="mt-4 flex flex-col sm:flex-row gap-6 items-start">
              <img
                src="/andy-lapteff.jpg"
                alt="Andy Lapteff"
                loading="lazy"
                className="w-40 h-auto rounded-sm border border-border flex-shrink-0"
              />
              <div className="space-y-3">
                <p>
                  <strong className="text-text">Andy Lapteff</strong> hosts and produces AONE.
                  Network engineer by background, operator by necessity. He runs the show solo
                  with help from occasional co-hosts and a network of friends across the industry.
                </p>
                <p className="text-sm">
                  <a
                    href="https://www.permitipandyandy.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-blue hover:text-accent-green"
                  >
                    More at permitipandyandy.com →
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <SectionLabel>Get in touch</SectionLabel>
            <ul className="mt-4 space-y-2">
              <li>
                Sponsorships:{' '}
                <a href="mailto:sponsor@artofnetworkengineering.com">
                  sponsor@artofnetworkengineering.com
                </a>
              </li>
              <li>
                Newsletter signup:{' '}
                <a href="mailto:newsletter@artofnetworkengineering.com">
                  newsletter@artofnetworkengineering.com
                </a>
              </li>
              <li>
                General:{' '}
                <a href="mailto:andy@artofnetworkengineering.com">
                  andy@artofnetworkengineering.com
                </a>
              </li>
              <li>
                Community:{' '}
                <a href="https://artofnetworkengineering.com/iaatj" target="_blank" rel="noopener noreferrer">
                  Join the Discord ({metrics.discordMembers}+ engineers)
                </a>
              </li>
            </ul>
          </section>
        </div>

        <aside>
          <div className="border border-border bg-surface p-6 rounded-sm">
            <SectionLabel>By the numbers</SectionLabel>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-text-muted">Lifetime downloads</dt>
                <dd className="font-display text-2xl text-accent-green">{metrics.lifetimeDownloadsShort}</dd>
              </div>
              <div>
                <dt className="text-text-muted">Episodes published</dt>
                <dd className="font-display text-2xl text-accent-green">200+</dd>
              </div>
              <div>
                <dt className="text-text-muted">Downloads per episode</dt>
                <dd className="font-display text-2xl text-accent-green">{metrics.perEpisodeLifetime}+</dd>
              </div>
              <div>
                <dt className="text-text-muted">YouTube subscribers</dt>
                <dd className="font-display text-2xl text-accent-green">{metrics.youtubeSubscribers}</dd>
              </div>
              <div>
                <dt className="text-text-muted">Discord community</dt>
                <dd className="font-display text-2xl text-accent-green">{metrics.discordMembers}+</dd>
              </div>
            </dl>
          </div>
          <div className="mt-6">
            <Link href="/sponsor" className="text-sm text-accent-blue">
              Sponsor inquiries →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
