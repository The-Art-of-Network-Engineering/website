const platforms = [
  { href: 'https://podcasts.apple.com/us/podcast/the-art-of-network-engineering/id1525015389', label: 'Apple Podcasts' },
  { href: 'https://open.spotify.com/show/0pMKATLfuXd19vvg2xlntA', label: 'Spotify' },
  { href: 'https://www.youtube.com/@artofnetworkengineering', label: 'YouTube' },
  { href: 'https://rss.buzzsprout.com/2127872.rss', label: 'RSS' },
];

export function SubscribeButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      {platforms.map((p) => (
        <a
          key={p.href}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border bg-surface hover:border-accent-green hover:text-accent-green text-text px-4 py-2 text-sm rounded-sm transition-colors"
        >
          {p.label}
        </a>
      ))}
    </div>
  );
}
