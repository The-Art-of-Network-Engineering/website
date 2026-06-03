import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Subscribe to the AONE newsletter — launching Summer 2026.',
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Newsletter</SectionLabel>
      <h1 className="mt-4 font-display text-4xl">Launching Summer 2026.</h1>
      <p className="mt-6 max-w-2xl text-text-muted text-lg">
        A quarterly dispatch from the AONE archive: what we learned, who we talked to, what's
        worth your time. One email per quarter, no filler.
      </p>
      <div className="mt-10 max-w-xl">
        <NewsletterForm />
      </div>
    </div>
  );
}
