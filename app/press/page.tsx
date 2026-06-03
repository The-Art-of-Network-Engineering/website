import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Press kit',
  description: 'AONE press kit, media kit, and brand assets.',
};

export default function PressPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Press</SectionLabel>
      <h1 className="mt-4 font-display text-4xl">Media & press kit</h1>
      <p className="mt-4 max-w-2xl text-text-muted">
        Resources for journalists, podcast networks, and partners. Email{' '}
        <a href="mailto:andy@artofnetworkengineering.com">andy@artofnetworkengineering.com</a> for
        interview requests or anything not below.
      </p>

      <section className="mt-12 grid md:grid-cols-2 gap-6">
        <a
          href="/media-kit-2026.pdf"
          className="block bg-surface border border-border p-6 rounded-sm hover:border-accent-blue transition-colors"
        >
          <SectionLabel>Download</SectionLabel>
          <h2 className="mt-3 font-display text-2xl">2026 media kit</h2>
          <p className="mt-2 text-sm text-text-muted">
            Full audience, distribution, and sponsorship overview (PDF).
          </p>
        </a>
        <div className="bg-surface border border-border p-6 rounded-sm">
          <SectionLabel>Brand assets</SectionLabel>
          <h2 className="mt-3 font-display text-2xl">Logos & artwork</h2>
          <p className="mt-2 text-sm text-text-muted">
            Logo pack available on request. Email{' '}
            <a href="mailto:andy@artofnetworkengineering.com">andy@artofnetworkengineering.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
