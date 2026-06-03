import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';
import { StatCard } from '@/components/StatCard';

export const metadata: Metadata = {
  title: 'Sponsor AONE',
  description: 'Sponsor The Art of Network Engineering. Reach 2,800 network engineers per episode.',
};

const stats = [
  { value: '1M+', label: 'Lifetime downloads', caption: 'Approaching, 906K and counting' },
  { value: '2,800', label: 'Downloads per episode', caption: '+26% YoY, first 60 days' },
  { value: '306K', label: 'Total platform touchpoints', caption: '+14.2% YoY' },
  { value: '9,300', label: 'YouTube subscribers', caption: '+35.4% YoY' },
];

const audience = [
  { value: '70%', label: 'Aged 26–44 (prime buying age)' },
  { value: '20%', label: 'Director / VP / C-Suite' },
  { value: '80%', label: 'Hands-on practitioners' },
  { value: '64%', label: 'North America (20% Europe)' },
];

const products = [
  {
    name: 'Pre-roll ad',
    price: '$600 / episode',
    detail:
      '30-second host-read spot at the top of a single audio episode. Permanent placement. 2,800 impressions per episode.',
  },
  {
    name: 'Featured episode',
    price: '$1,500 / episode',
    detail:
      '60-second host-read spot in a single episode. Audio + video bundled. Permanent placement.',
  },
  {
    name: 'Dynamic audio ad',
    price: '$6,000 / month',
    detail:
      '15–30s pre-roll and 45–90s mid-roll dynamically inserted into all 200+ audio episodes for your contract term. 9,300 monthly impressions.',
  },
  {
    name: 'Dedicated interview',
    price: '$11,000 / episode',
    detail:
      'Full-length episode dedicated to your product, team, or story. Audio + video.',
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
        AONE is one of the largest independent media platforms built for network engineers and
        infrastructure professionals. Sponsors aren't buying generic impressions — they're earning
        attention from one of the most targeted practitioner audiences in network infrastructure.
      </p>

      {/* Stats */}
      <section className="mt-16">
        <SectionLabel>By the numbers</SectionLabel>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Audience */}
      <section className="mt-16">
        <SectionLabel>Audience</SectionLabel>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {audience.map((a) => (
            <StatCard key={a.label} value={a.value} label={a.label} />
          ))}
        </div>
        <p className="mt-6 text-sm text-text-muted">
          Typical employers: Enterprise IT, Service Providers, Cloud Infrastructure, Education,
          Federal / Government.
        </p>
      </section>

      {/* Why podcasts */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Why podcasts work for B2B</SectionLabel>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-surface border border-border p-6 rounded-sm">
            <p className="font-display text-3xl text-accent-green">60%</p>
            <p className="mt-2 text-sm text-text">
              of the B2B buying journey is now complete before a buyer contacts sales.
            </p>
            <p className="mt-1 text-xs text-text-muted">6sense, 2025</p>
          </div>
          <div className="bg-surface border border-border p-6 rounded-sm">
            <p className="font-display text-3xl text-accent-green">86%</p>
            <p className="mt-2 text-sm text-text">
              of daily podcast listeners recall an ad they heard in the past week — the highest of
              any medium.
            </p>
            <p className="mt-1 text-xs text-text-muted">Sounds Profitable, 2025</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Products & pricing</SectionLabel>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p.name} className="bg-surface border border-border p-6 rounded-sm">
              <h3 className="font-display text-xl">{p.name}</h3>
              <p className="mt-2 font-display text-2xl text-accent-green">{p.price}</p>
              <p className="mt-3 text-sm text-text-muted">{p.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-text-muted">
          Category exclusivity available ($1,000/month, stacks on any package). Bulk discounts on
          multi-episode and multi-quarter commitments.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Become a sponsor</SectionLabel>
        <h2 className="mt-4 font-display text-3xl">Request the full 2026 media kit.</h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          Email{' '}
          <a href="mailto:sponsor@artofnetworkengineering.com">
            sponsor@artofnetworkengineering.com
          </a>
          {' '}or download the kit directly.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="mailto:sponsor@artofnetworkengineering.com?subject=AONE%20Sponsorship%20Inquiry"
            className="inline-block bg-accent-green text-bg font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
          >
            Email sponsor@aone
          </a>
          <a
            href="/media-kit-2026.pdf"
            className="inline-block border border-border bg-surface text-text font-semibold px-6 py-3 rounded-sm hover:border-accent-blue transition-colors"
          >
            Download media kit (PDF)
          </a>
        </div>
      </section>
    </div>
  );
}
