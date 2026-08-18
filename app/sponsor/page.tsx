import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';
import { StatCard } from '@/components/StatCard';
import { StatsBand } from '@/components/StatsBand';
// Sponsor roster: single source of truth is sponsors.toml on the server, synced
// here by sync_website_sponsors.py. Do not hand-edit this list.
import { sponsorLogos } from '@/components/sponsorLogos';
// Reviewed reach numbers (native Buzzsprout windows + YoY). Same file the snapshot
// PDF reads, so the two never drift. Derived from the 12-month YoY analysis.
import reachData from '@/data/media_kit_reach.json';
import { metrics } from '@/lib/metrics';

export const metadata: Metadata = {
  title: 'Sponsor AONE',
  description:
    'Sponsor The Art of Network Engineering. Reach thousands of network engineers per episode — a targeted practitioner audience growing double digits year over year.',
};

const audience = [
  { value: '70%', label: 'Aged 26–44, prime buying age' },
  { value: '80%', label: 'Hands-on practitioners, recommend & specify tools' },
  { value: '20%', label: 'Director / VP / C-Suite, decision-making authority' },
  { value: '64%', label: 'North America (20% Europe, global reach)' },
];

const reach = reachData.windows;

// Matches the media-kit "Products & Pricing" slide. Prices stay private (rate card is
// 1:1 collateral), so the public page shows the products and points to a call for pricing.
const packages = [
  {
    name: 'Baked-in Pre-roll Ad',
    tag: 'Host-read · audio + video',
    desc: 'A 30-second host-read ad baked into one episode, permanent, in both the audio and the YouTube video. Roughly 2,500 impressions per episode, with 4-packs available.',
  },
  {
    name: 'Baked-in Mid-roll Ad',
    tag: 'Host-read · audio + video',
    desc: 'A 60-second host-read ad baked into one episode, permanent, in both the audio and the YouTube video. Our best-read spot, with 4-packs available.',
  },
  {
    name: 'Dynamic Audio Ad',
    tag: 'Recurring · entire catalog',
    desc: `A dynamically inserted spot across all 200+ episodes for your contract term, as a pre-roll, mid-roll, or post-roll. Roughly ${metrics.catalogMonthly} impressions every month from the back catalog alone.`,
  },
  {
    name: 'Dedicated Interview',
    tag: 'Full episode · audio + video',
    desc: 'A full-length episode built around your product, team, or story. Andy hosts, you bring a voice. Audio and YouTube.',
  },
  {
    name: 'Newsletter Ad',
    tag: 'The Shortest Path newsletter',
    desc: 'Your message in The Shortest Path, our newsletter for network engineers, priced by placement: featured, standard, or classified.',
  },
  {
    name: 'Sponsored Blog Post',
    tag: 'Evergreen · SEO',
    desc: 'An AONE-written blog post covering your company, product, or service. Permanent and searchable on the AONE blog, and promoted across our channels.',
  },
  {
    name: 'Category Exclusivity',
    tag: 'Add-on · limited',
    desc: 'One partner per category. No competitors run on the show for your contract term. Stacks on any package.',
  },
  {
    name: 'Short-form Video',
    tag: 'Add-on',
    desc: 'A highlight cut from your sponsored episode, with captions, published across all AONE channels. Dedicated standalone clips are available too.',
  },
];

export default function SponsorPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      {/* Hero */}
      <SectionLabel>Sponsor AONE</SectionLabel>
      <h1 className="mt-4 font-display text-5xl leading-tight">
        Reach the network engineers who{' '}
        <span className="text-accent-green">build, evaluate, and buy</span>.
      </h1>
      <p className="mt-6 max-w-3xl text-text-muted text-lg">
        Each AONE episode reaches 2,500+ network engineers and architects in its first 90 days and
        4,000+ over its lifetime, with every window up double digits year over year. 80% are
        hands-on practitioners who recommend and specify what their teams buy. They aren't generic
        impressions. They're one of the most targeted practitioner audiences in network
        infrastructure.
      </p>

      {/* Live audience proof — auto-refreshed daily from metrics.json (same band as the homepage) */}
      <div className="mt-12">
        <StatsBand />
        <p className="mt-6 text-sm text-text-muted">2026 USNUA Media Partner.</p>
      </div>

      {/* Audience */}
      <section className="mt-16">
        <SectionLabel>Audience</SectionLabel>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {audience.map((a) => (
            <StatCard key={a.label} value={a.value} label={a.label} />
          ))}
        </div>
      </section>

      {/* Reach profile */}
      <section className="mt-16">
        <SectionLabel>Reach profile</SectionLabel>
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          {reach.map((r) => (
            <div key={r.window} className="bg-surface border border-border p-6 rounded-sm">
              <p className="text-xs uppercase tracking-label text-text-muted">{r.window}</p>
              <p className="mt-3 font-display text-2xl text-accent-green">
                {r.downloads.toLocaleString('en-US')}{' '}
                <span className="text-sm text-text-muted font-sans">downloads</span>
              </p>
              <p className="mt-1 text-xs font-mono text-accent-blue">+{r.yoy}% YoY</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-text-muted">
          We don't rely on viral episodes. Sponsors get consistent, predictable reach across every
          release, and every window is up double digits year over year. Episodes keep earning
          downloads for years, averaging {reachData.lifetime_per_episode.toLocaleString('en-US')}+ over
          their lifetime.
        </p>
      </section>

      {/* Why podcasts */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Why podcasts work for B2B</SectionLabel>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-surface border border-border p-6 rounded-sm">
            <p className="font-display text-3xl text-accent-green">60%</p>
            <p className="mt-2 text-text">
              of the B2B buying journey is now complete before a buyer contacts sales.
            </p>
            <p className="mt-1 text-xs text-text-muted">6sense, 2025</p>
          </div>
          <div className="bg-surface border border-border p-6 rounded-sm">
            <p className="font-display text-3xl text-accent-green">86%</p>
            <p className="mt-2 text-text">
              of daily podcast listeners recall an ad they heard in the past week, the highest of
              any medium.
            </p>
            <p className="mt-1 text-xs text-text-muted">Sounds Profitable, 2025</p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Brands that partner with us</SectionLabel>
        {/* Flat wall, no category headings: the roster speaks for itself, and
            grouping mislabelled partners while implying a category was taken. */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-10 items-center">
          {sponsorLogos.map(({ name, src }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={name}
              src={src}
              alt={name}
              className="h-9 w-auto max-w-full object-contain justify-self-center"
            />
          ))}
        </div>
      </section>

      {/* Ways to sponsor */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Ways to sponsor</SectionLabel>
        <p className="mt-4 max-w-3xl text-text">
          Several ways to reach the audience, from a single host-read ad to an always-on catalog
          campaign. Bulk discounts and category exclusivity available. Book a call and we'll build a
          package around your goals.
        </p>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {packages.map((p) => (
            <div key={p.name} className="bg-surface border border-border p-6 rounded-sm">
              <p className="text-xs uppercase tracking-label text-accent-blue">{p.tag}</p>
              <h3 className="mt-2 font-display text-xl">{p.name}</h3>
              <p className="mt-2 text-sm text-text-muted">{p.desc}</p>
            </div>
          ))}
          <div className="bg-surface border border-border p-6 rounded-sm flex flex-col justify-center md:col-span-2">
            <h3 className="font-display text-xl text-accent-green">Pricing</h3>
            <p className="mt-2 text-sm text-text-muted">
              Rates depend on the mix and term. Book a 15-minute call or request the media kit and
              we'll send pricing that fits your campaign.
            </p>
            <a
              href="https://calendly.com/theartofnetworkengineering/sponsor-fit-call-15-min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-accent-blue"
            >
              Book a call for pricing →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Become a sponsor</SectionLabel>
        <h2 className="mt-4 text-3xl">Request the full 2026 media kit.</h2>
        <p className="mt-4 max-w-2xl text-text">
          Book a quick 15-minute call, email{' '}
          <a href="mailto:sponsor@artofnetworkengineering.com">
            sponsor@artofnetworkengineering.com
          </a>
          , or download the one-page overview below.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="https://calendly.com/theartofnetworkengineering/sponsor-fit-call-15-min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent-green text-bg font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
          >
            Book a 15-min sponsor call
          </a>
          <a
            href="mailto:sponsor@artofnetworkengineering.com?subject=AONE%20Sponsorship%20Inquiry"
            className="inline-block border border-border bg-surface text-text font-semibold px-6 py-3 rounded-sm hover:border-accent-blue transition-colors"
          >
            Email sponsor@aone
          </a>
          <a
            href="/aone-sponsor-snapshot-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-border bg-surface text-text font-semibold px-6 py-3 rounded-sm hover:border-accent-blue transition-colors"
          >
            Download the sponsor overview (PDF)
          </a>
        </div>
      </section>
    </div>
  );
}
