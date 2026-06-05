import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Merch',
  description:
    'Official AONE merch on Crowdmade: shirts, hoodies, and gear for network engineers and infrastructure pros.',
};

export default function MerchPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Merch</SectionLabel>
      <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
        Wear the show.
      </h1>
      <p className="mt-6 max-w-2xl text-text-muted text-lg">
        Official AONE shirts, hoodies, and gear. Print-on-demand through Crowdmade. Ships
        worldwide.
      </p>

      <div className="mt-10">
        <a
          href="https://crowdmade.com/collections/artofneteng"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent-green text-bg font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
        >
          Shop on Crowdmade →
        </a>
      </div>

      <p className="mt-12 max-w-2xl text-text-muted text-sm">
        Crowdmade handles printing, fulfillment, and customer service. AONE doesn't see your
        shipping or payment info. Order questions go directly to{' '}
        <a
          href="https://crowdmade.com/contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          Crowdmade support
        </a>
        .
      </p>
    </div>
  );
}
