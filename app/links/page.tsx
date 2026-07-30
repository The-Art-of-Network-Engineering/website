import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Links',
  description:
    'Everywhere to find The Art of Network Engineering: listen, subscribe to the newsletter, join the community, and more.',
};

// A lightweight, mobile-first link hub, our own replacement for Linktree.
// Owned on our domain: our brand, our analytics, our traffic.
type LinkItem = { label: string; href: string; external?: boolean };
type Group = { heading: string; items: LinkItem[] };

const GROUPS: Group[] = [
  {
    heading: 'Listen & watch',
    items: [
      {
        label: 'Apple Podcasts',
        href: 'https://podcasts.apple.com/us/podcast/the-art-of-network-engineering/id1525015389',
        external: true,
      },
      { label: 'Spotify', href: 'https://open.spotify.com/show/0pMKATLfuXd19vvg2xlntA', external: true },
      { label: 'YouTube', href: 'https://www.youtube.com/@artofneteng', external: true },
      { label: 'All episodes', href: '/episodes' },
    ],
  },
  {
    heading: 'Stay connected',
    items: [
      { label: 'The Shortest Path — our newsletter', href: '/newsletter' },
      { label: 'Join the Discord community', href: 'https://discord.com/invite/3PRxe7wMDa', external: true },
      { label: 'Resources for network engineers', href: '/resources' },
    ],
  },
  {
    heading: 'More',
    items: [
      { label: 'Sponsor the show', href: '/sponsor' },
      { label: 'Merch', href: '/merch' },
      { label: 'About AONE', href: '/about' },
    ],
  },
];

function Row({ item }: { item: LinkItem }) {
  const className =
    'block w-full rounded-sm border border-border bg-surface px-5 py-4 text-center text-text ' +
    'hover:border-accent-green hover:text-accent-green transition-colors';
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {item.label}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

export default function LinksPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-14">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-label text-accent-blue">
          The Art of Network Engineering
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight">
          Behind every network is a <span className="text-accent-green">story</span>.
        </h1>
        <p className="mt-3 text-sm text-text-muted">
          Pick your spot. Everything AONE, in one place.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {GROUPS.map((g) => (
          <section key={g.heading}>
            <p className="mb-3 font-mono text-xs uppercase tracking-label text-text-muted">{g.heading}</p>
            <div className="space-y-3">
              {g.items.map((item) => (
                <Row key={item.href} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
