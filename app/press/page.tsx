import type { Metadata } from 'next';
import Image from 'next/image';
import { SectionLabel } from '@/components/SectionLabel';
import { CopyButton } from '@/components/CopyButton';

export const metadata: Metadata = {
  title: 'Press & media kit',
  description:
    'Press and media kit for The Art of Network Engineering and host Andy Lapteff: bios, headshot, show boilerplate, logos, and audience snapshot. Everything a podcast host, journalist, or partner needs in one place.',
};

const SHORT_BIO =
  'Andy Lapteff is the host of The Art of Network Engineering podcast and Senior Product Marketing Manager for Data Center at Nokia. A network engineer at Verizon, Comcast, Fiserv, and Juniper before moving into product marketing, he now champions the people behind the infrastructure that runs our digital lives.';

const LONG_BIO =
  'Andy Lapteff spent years in the trenches of network engineering, with technical roles at Verizon, Comcast, Fiserv, and Juniper, before moving into product marketing, where he now serves as Senior Product Marketing Manager for Data Center at Nokia, turning deep technical material into conversations engineers actually want to hear. In 2020 he launched The Art of Network Engineering, a podcast exploring the human side of building and running networks, now with over 1 million lifetime downloads and a 3,500+ member Discord community. Andy also helps lead PANUG, the Pennsylvania Network User Group and a local chapter of USNUA, and is a passionate advocate for newcomers breaking into IT. Off the mic, he is usually outdoors with his family, behind a camera, or at the grill.';

const SHOW_ONELINER =
  'Insight, careers, and community for the people who build the world\'s networks.';

const SHOW_BOILERPLATE =
  'The Art of Network Engineering is where network engineers come to grow. Every episode pairs real technical insight with honest conversations about careers, community, and the people behind the infrastructure that runs the world. From data centers on cruise ships to networks reaching into space, we explore the tools, trends, and ideas shaping what comes next, and send you back to work sharper, more connected, and more confident.\n\nAuthentic, practical, and human, it is a platform where every network engineer feels seen, supported, and equipped with the confidence to thrive in a fast-changing industry.';

const facts = [
  { label: 'Host', value: 'Andy Lapteff' },
  { label: 'Day job', value: 'Sr. PMM, Data Center at Nokia' },
  { label: 'Launched', value: '2020' },
  { label: 'Lifetime downloads', value: '1,000,000+' },
  { label: 'YouTube subscribers', value: '9,700+' },
  { label: 'Discord members', value: '3,500+' },
  { label: 'Cadence', value: 'New episodes every other week' },
];

const logos = [
  { name: 'Primary logo (PNG)', href: '/press/logos/aone-logo-primary.png', note: 'Color logo for light backgrounds.' },
  { name: 'Dark-background logo (PNG)', href: '/press/logos/aone-logo-dark.png', note: 'For dark or photographic backgrounds.' },
];

const links = [
  { href: 'https://artofnetworkengineering.com', label: 'Website' },
  { href: 'https://podcasts.apple.com/us/podcast/the-art-of-network-engineering/id1525015389', label: 'Apple Podcasts' },
  { href: 'https://open.spotify.com/show/0pMKATLfuXd19vvg2xlntA', label: 'Spotify' },
  { href: 'https://www.youtube.com/@artofneteng', label: 'YouTube' },
  { href: 'https://rss.buzzsprout.com/2127872.rss', label: 'RSS feed' },
  { href: 'https://artofnetworkengineering.com/iaatj', label: 'Discord' },
  { href: 'https://www.linkedin.com/company/artofneteng/', label: 'LinkedIn' },
  { href: 'https://x.com/artofneteng', label: 'X / Twitter' },
  { href: 'https://linktr.ee/artofneteng', label: 'Linktree' },
];

export default function PressPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      {/* Header */}
      <SectionLabel>Press</SectionLabel>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">Press &amp; media kit</h1>
      <p className="mt-4 max-w-2xl text-text-muted">
        Everything a podcast host, journalist, or partner needs to feature The Art of Network
        Engineering: bios, headshot, show boilerplate, and logos, all ready to copy or download.
        Anything else? Email{' '}
        <a href="mailto:andy@artofnetworkengineering.com" className="text-accent-blue">
          andy@artofnetworkengineering.com
        </a>
        .
      </p>

      {/* Headshot + quick facts */}
      <section className="mt-14 grid md:grid-cols-[260px_1fr] gap-8 items-start">
        <div>
          <Image
            src="/press/andy-lapteff-headshot.jpg"
            alt="Andy Lapteff, host of The Art of Network Engineering"
            width={765}
            height={1100}
            priority
            className="w-full h-auto rounded-sm border border-border"
          />
          <a
            href="/press/andy-lapteff-headshot-hires.jpg"
            download
            className="mt-3 inline-block text-sm text-accent-blue"
          >
            Download high-res headshot (JPEG, 3375×4853) →
          </a>
        </div>
        <div>
          <SectionLabel>At a glance</SectionLabel>
          <dl className="mt-4 divide-y divide-border border-y border-border">
            {facts.map((f) => (
              <div key={f.label} className="flex justify-between gap-6 py-2.5">
                <dt className="text-sm text-text-muted">{f.label}</dt>
                <dd className="text-sm text-right">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Bios */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Bios</SectionLabel>
        <div className="mt-6 space-y-8 max-w-3xl">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl">Short bio</h2>
              <CopyButton text={SHORT_BIO} />
            </div>
            <p className="mt-3 text-text-muted">{SHORT_BIO}</p>
          </div>
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl">Long bio</h2>
              <CopyButton text={LONG_BIO} />
            </div>
            <p className="mt-3 text-text-muted">{LONG_BIO}</p>
          </div>
        </div>
      </section>

      {/* Show boilerplate */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Show description (boilerplate)</SectionLabel>
        <p className="mt-3 max-w-3xl text-sm text-text-muted">
          Copy-and-paste ready. Drop this straight into your show notes, episode intro, or article.
        </p>
        <div className="mt-6 space-y-8 max-w-3xl">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl">One-liner</h2>
              <CopyButton text={SHOW_ONELINER} />
            </div>
            <p className="mt-3 text-text-muted">{SHOW_ONELINER}</p>
          </div>
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl">Full description</h2>
              <CopyButton text={SHOW_BOILERPLATE} />
            </div>
            {SHOW_BOILERPLATE.split('\n\n').map((para, i) => (
              <p key={i} className="mt-3 text-text-muted">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Logos</SectionLabel>
        <div className="mt-6 grid sm:grid-cols-2 gap-6 max-w-3xl">
          {logos.map((l) => (
            <a
              key={l.href}
              href={l.href}
              download
              className="block bg-surface border border-border p-6 rounded-sm hover:border-accent-blue transition-colors"
            >
              <h3 className="font-display text-lg">{l.name}</h3>
              <p className="mt-2 text-sm text-text-muted">{l.note}</p>
              <span className="mt-3 inline-block text-sm text-accent-blue">Download →</span>
            </a>
          ))}
        </div>
        <a href="/press/aone-logo-pack.zip" download className="mt-6 inline-block text-sm text-accent-blue">
          Download all logos (.zip) →
        </a>
      </section>

      {/* Audience snapshot */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Audience snapshot</SectionLabel>
        <h2 className="mt-4 font-display text-2xl">Reach &amp; demographics</h2>
        <p className="mt-3 max-w-2xl text-text-muted">
          A one-page overview of the audience, distribution, and reach (no rate card). For
          sponsorship pricing, see the{' '}
          <a href="/sponsor" className="text-accent-blue">
            sponsor page
          </a>
          .
        </p>
        <a
          href="/aone-sponsor-snapshot-2026.pdf"
          download
          className="mt-5 inline-block bg-accent-green text-bg font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
        >
          Download audience snapshot (PDF)
        </a>
      </section>

      {/* Links */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Links</SectionLabel>
        <div className="mt-6 flex flex-wrap gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border bg-surface hover:border-accent-green hover:text-accent-green text-text px-4 py-2 text-sm rounded-sm transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Contact</SectionLabel>
        <p className="mt-4 text-text-muted">
          Interview requests, fact-checks, or anything else not covered above? Email{' '}
          <a href="mailto:andy@artofnetworkengineering.com" className="text-accent-blue">
            andy@artofnetworkengineering.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
