import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Subscribe to The Shortest Path, the AONE newsletter. One idea per issue for network engineers and the people breaking into the field.',
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Newsletter</SectionLabel>
      <h1 className="mt-4 font-display text-4xl">
        The Shortest Path. <span className="text-text-muted">Now live.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-text text-lg">
        Practical career guidance from our industry's brightest minds, delivered to your inbox
        every week.
      </p>
      <p className="mt-4 max-w-2xl text-text-muted">
        No filler, no list-padding sponsors, no AI slop. Subscribe and the next issue lands in your
        inbox. <a href="https://theshortestpath.beehiiv.com/" className="text-accent-blue">Read the latest issue.</a>
      </p>
      <div className="mt-6 max-w-xl">
        <NewsletterForm />
      </div>
    </div>
  );
}
