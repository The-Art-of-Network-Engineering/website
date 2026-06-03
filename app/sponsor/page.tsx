import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';
import { StatCard } from '@/components/StatCard';

export const metadata: Metadata = {
  title: 'Sponsor AONE',
  description:
    'Sponsor The Art of Network Engineering. Reach ~2,800 network engineers per episode with consistent, predictable delivery.',
};

const stats = [
  { value: '1M', label: 'Lifetime downloads', caption: 'Approaching, 905K and counting' },
  { value: '2,800', label: 'Downloads per episode', caption: '+26% YoY, first 60 days' },
  { value: '306K', label: 'Platform touchpoints', caption: '+14.2% YoY' },
  { value: '9,300', label: 'YouTube subscribers', caption: '+35.4% YoY' },
];

const audience = [
  { value: '70%', label: 'Aged 26–44,prime buying age' },
  { value: '80%', label: 'Hands-on practitioners,recommend & specify tools' },
  { value: '64%', label: 'Director / VP / C-Suite,decision-making authority' },
  { value: '80%', label: 'North America (20% Europe,global reach)' },
];

const reach = [
  { window: 'First 7 days', dl: '1,500 downloads' },
  { window: 'First 30 days', dl: '2,300 downloads' },
  { window: 'First 60 days', dl: '2,800 downloads' },
  { window: 'Catalog / month', dl: '9,300 downloads' },
];

const partners = [
  'Cisco Press',
  'Meter',
  'Juniper Apstra',
  'Itential',
  'Forward Networks',
  'Kentik',
  'NetAlly',
  'Opengear',
  'Celona',
  'PathSolutions',
  'Augtera',
  'Netris',
  'Unimus',
  'Boson',
  'USNUA',
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
        infrastructure professionals. Authentic. Practical. Human. We blend technical insight with
        real-world stories from engineers, innovators, and IT pros,from data centers on cruise
        ships to rockets in space.
      </p>

      {/* Stats */}
      <section className="mt-16">
        <SectionLabel>By the numbers</SectionLabel>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-text-muted">
          Discord community: <span className="text-text font-semibold">3,500 members</span>.
          2026 USNUA Media Partner.
        </p>
      </section>

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
              <p className="mt-3 font-display text-2xl text-accent-green">{r.dl}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-text-muted">
          We don't rely on viral episodes. Sponsors get consistent, predictable reach across every
          release,and that baseline is growing year over year.
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
              of daily podcast listeners recall an ad they heard in the past week,the highest of
              any medium.
            </p>
            <p className="mt-1 text-xs text-text-muted">Sounds Profitable, 2025</p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Brands that partner with us</SectionLabel>
        <div className="mt-6 flex flex-wrap gap-3">
          {partners.map((p) => (
            <span
              key={p}
              className="bg-surface border border-border text-text px-4 py-2 text-sm rounded-sm"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* Placements */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Placements</SectionLabel>
        <p className="mt-4 max-w-3xl text-text">
          Host-read, video, and dynamic catalog placements available. Category exclusivity by
          request. We tailor packages to your campaign goals,talk to us about what you want to
          accomplish and we'll build something that fits.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Become a sponsor</SectionLabel>
        <h2 className="mt-4 text-3xl">Request the full 2026 media kit.</h2>
        <p className="mt-4 max-w-2xl text-text">
          Email{' '}
          <a href="mailto:sponsor@artofnetworkengineering.com">
            sponsor@artofnetworkengineering.com
          </a>
          {' '}or grab the sponsor snapshot below.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="mailto:sponsor@artofnetworkengineering.com?subject=AONE%20Sponsorship%20Inquiry"
            className="inline-block bg-accent-green text-bg font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
          >
            Email sponsor@aone
          </a>
          <a
            href="/aone-sponsor-snapshot-2026.pdf"
            className="inline-block border border-border bg-surface text-text font-semibold px-6 py-3 rounded-sm hover:border-accent-blue transition-colors"
          >
            Download sponsor snapshot (PDF)
          </a>
        </div>
      </section>
    </div>
  );
}
