import type { Metadata } from 'next';
import Image from 'next/image';
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
      <div className="mt-4 max-w-3xl overflow-hidden rounded-sm border border-border">
        <Image
          src="/shortest-path-banner.png"
          alt="The Shortest Path — Your Career's Control Plane"
          width={1200}
          height={400}
          className="h-auto w-full"
          priority
        />
        <div className="bg-surface p-6 md:p-8">
          <p className="text-text text-lg">
            Practical career guidance from network engineering&apos;s brightest minds, one idea per
            issue.
          </p>
          <p className="mt-3 text-text-muted">
            No filler, no list-padding sponsors, no AI slop. Subscribe and the next issue lands in
            your inbox.
          </p>
          <div className="mt-6">
            <a
              href="https://theshortestpath.beehiiv.com/p/proof-beats-permission"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent-green text-bg font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
            >
              Read the latest issue →
            </a>
          </div>
          <div className="mt-8 max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
