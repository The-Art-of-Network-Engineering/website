import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Subscribe to the AONE newsletter. Launching Summer 2026.',
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Newsletter</SectionLabel>
      <h1 className="mt-4 font-display text-4xl">
        The Shortest Path. <span className="text-text-muted">Launching Summer 2026.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-text text-lg">
        Practical career guidance from our industry's brightest minds, delivered to your inbox
        every week.
      </p>
      <p className="mt-4 max-w-2xl text-text-muted">
        No filler, no list-padding sponsors, no AI slop. Sign up and we'll let you know the day it
        goes live.
      </p>
      <div className="mt-6 max-w-xl">
        <NewsletterForm />
      </div>
    </div>
  );
}
