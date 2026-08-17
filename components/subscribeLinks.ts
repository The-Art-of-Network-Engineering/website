import type { IconType } from 'react-icons';
import { SiApplepodcasts, SiSpotify, SiYoutube, SiRss } from 'react-icons/si';

// The "subscribe" set for the homepage hero + episode pages: where to press play or grab
// the feed. Same brand-emblem treatment as the footer's social row (socialLinks.ts). Kept
// in a plain .ts module (no JSX) so the guard test can import the data without a render.
export const subscribe: { href: string; label: string; Icon: IconType }[] = [
  { href: 'https://podcasts.apple.com/us/podcast/the-art-of-network-engineering/id1525015389', label: 'Apple Podcasts', Icon: SiApplepodcasts },
  { href: 'https://open.spotify.com/show/0pMKATLfuXd19vvg2xlntA', label: 'Spotify', Icon: SiSpotify },
  { href: 'https://www.youtube.com/@artofneteng', label: 'YouTube', Icon: SiYoutube },
  { href: 'https://rss.buzzsprout.com/2127872.rss', label: 'RSS', Icon: SiRss },
];
