import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'About',
  description: 'About The Art of Network Engineering and host Andy Lapteff.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>About</SectionLabel>
      <h1 className="mt-4 font-display text-4xl">The Art of Network Engineering</h1>

      <div className="mt-10 grid md:grid-cols-[2fr_1fr] gap-12">
        <div className="space-y-6 text-text">
          <p>
            AONE launched in July 2020 to tell the human stories behind network engineering. Six
            years and 200+ episodes later, it's one of the largest independent media platforms
            built for network engineers and infrastructure professionals.
          </p>
          <p>
            We blend technical insight with real-world stories from engineers, innovators, and IT
            pros. From data centers on cruise ships to rockets in space. Authentic, practical,
            human.
          </p>

          <h2 className="font-display text-2xl pt-8">Host</h2>
          <p>
            <strong className="text-text">Andy Lapteff</strong> hosts and produces AONE. Network
            engineer by background, operator by necessity. He runs the show solo with help from
            occasional co-hosts and a network of friends across the industry.
          </p>

          <h2 className="font-display text-2xl pt-8">Get in touch</h2>
          <ul className="space-y-2">
            <li>
              Sponsorships:{' '}
              <a href="mailto:sponsor@artofnetworkengineering.com">
                sponsor@artofnetworkengineering.com
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
              <a href="https://discord.gg/4N2Qh47dwt" target="_blank" rel="noopener noreferrer">
                Join the Discord (3,500+ engineers)
              </a>
            </li>
          </ul>
        </div>
        <aside>
          <div className="border border-border bg-surface p-6 rounded-sm">
            <SectionLabel>By the numbers</SectionLabel>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-text-muted">Lifetime downloads</dt>
                <dd className="font-display text-2xl text-accent-green">1M+</dd>
              </div>
              <div>
                <dt className="text-text-muted">Episodes published</dt>
                <dd className="font-display text-2xl text-accent-green">200+</dd>
              </div>
              <div>
                <dt className="text-text-muted">YouTube subscribers</dt>
                <dd className="font-display text-2xl text-accent-green">9,500</dd>
              </div>
              <div>
                <dt className="text-text-muted">Discord community</dt>
                <dd className="font-display text-2xl text-accent-green">3,500+</dd>
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
