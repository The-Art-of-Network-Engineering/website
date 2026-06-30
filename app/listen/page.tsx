import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Listen everywhere',
  description:
    'Every app and directory where The Art of Network Engineering is available: Apple Podcasts, Spotify, YouTube, Amazon Music, Overcast, Pocket Casts, and more. New episodes every other week.',
};

const RSS = 'https://feeds.buzzsprout.com/2127872.rss';

const apps: { label: string; href: string }[] = [
  { label: 'Apple Podcasts', href: 'https://podcasts.apple.com/us/podcast/the-art-of-network-engineering/id1525015389' },
  { label: 'Spotify', href: 'https://open.spotify.com/show/0pMKATLfuXd19vvg2xlntA' },
  { label: 'YouTube', href: 'https://www.youtube.com/@artofneteng' },
  { label: 'Amazon Music', href: 'https://music.amazon.com/podcasts/428cc1e0-e0ed-43c5-b609-83c8f3d9af93' },
  { label: 'Audible', href: 'https://www.audible.com/podcast/The-Art-of-Network-Engineering/B08K56D2N2' },
  { label: 'iHeartRadio', href: 'https://www.iheart.com/podcast/269-the-art-of-network-enginee-69194311/' },
  { label: 'TuneIn', href: 'https://tunein.com/podcasts/Technology-Podcasts/The-Art-of-Network-Engineering-p3509639/' },
  { label: 'Pocket Casts', href: 'https://pca.st/e12wyfxm' },
  { label: 'Overcast', href: 'https://overcast.fm/itunes1525015389' },
  { label: 'Castro', href: 'https://castro.fm/itunes/1525015389' },
  { label: 'Castbox', href: 'https://castbox.fm/channel/The-Art-of-Network-Engineering-id6812158' },
  { label: 'Podcast Addict', href: 'https://podcastaddict.com/podcast/the-art-of-network-engineering/6180937' },
  { label: 'Player FM', href: 'https://player.fm/series/series-3444546' },
  { label: 'Deezer', href: 'https://www.deezer.com/en/show/5707597' },
  { label: 'Podbean', href: 'https://www.podbean.com/podcast-detail/2t23m-2a544a/The-Art-of-Network-Engineering-Podcast' },
];

const directories: { label: string; href: string }[] = [
  { label: 'Podchaser', href: 'https://www.podchaser.com/podcasts/the-art-of-network-engineering-1361920' },
  { label: 'Listen Notes', href: 'https://www.listennotes.com/podcasts/the-art-of-network-engineering-aj-andy-dan-TQ_hupY03s2/' },
  { label: 'Goodpods', href: 'https://goodpods.com/podcasts/the-art-of-network-engineering-194704' },
  { label: 'Podcast Index', href: 'https://podcastindex.org/podcast/6011605' },
  { label: 'TrueFans', href: 'https://truefans.fm/8e5acb2c-c7f8-58b7-848a-102c5cbecde7' },
  { label: 'Podtail', href: 'https://podtail.com/podcast/the-art-of-network-engineering/' },
  { label: 'Podcast Republic', href: 'https://podcastrepublic.net/podcast/1525015389' },
];

function AppButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-border bg-surface hover:border-accent-green hover:text-accent-green text-text px-4 py-3 text-sm rounded-sm transition-colors text-center"
    >
      {label}
    </a>
  );
}

export default function ListenPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Listen</SectionLabel>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">Listen everywhere</h1>
      <p className="mt-4 max-w-2xl text-text-muted">
        New episodes every other week. Subscribe in whatever app you already use, and it will show
        up automatically. Not seeing your app? Paste the{' '}
        <a href={RSS} target="_blank" rel="noopener noreferrer" className="text-accent-blue">
          RSS feed
        </a>{' '}
        into any podcast player and you are set.
      </p>

      <section className="mt-10">
        <SectionLabel>Apps</SectionLabel>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {apps.map((a) => (
            <AppButton key={a.href} {...a} />
          ))}
          <AppButton label="RSS feed" href={RSS} />
        </div>
      </section>

      <section className="mt-12">
        <SectionLabel>Also indexed on</SectionLabel>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-muted">
          {directories.map((d) => (
            <a
              key={d.href}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-green"
            >
              {d.label}
            </a>
          ))}
        </p>
      </section>
    </div>
  );
}
