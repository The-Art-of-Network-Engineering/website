import type { IconType } from 'react-icons';
import {
  SiApplepodcasts,
  SiSpotify,
  SiYoutube,
  SiDiscord,
  SiTiktok,
  SiInstagram,
  SiX,
} from 'react-icons/si';
// Simple Icons dropped LinkedIn's mark over trademark policy, so LinkedIn comes from
// Font Awesome's monochrome "in" glyph — same currentColor behavior as the SI icons.
import { FaLinkedinIn } from 'react-icons/fa6';

// Recognizable brand badges instead of plain-text links. Icons inherit currentColor so the
// hover:text-accent-green transition recolors the glyph too. Kept in a plain .ts module (no
// JSX) so the Footer badge test can import the data without a component render.
export const social: { href: string; label: string; Icon: IconType }[] = [
  { href: 'https://podcasts.apple.com/us/podcast/the-art-of-network-engineering/id1525015389', label: 'Apple Podcasts', Icon: SiApplepodcasts },
  { href: 'https://open.spotify.com/show/0pMKATLfuXd19vvg2xlntA', label: 'Spotify', Icon: SiSpotify },
  { href: 'https://www.youtube.com/@artofneteng', label: 'YouTube', Icon: SiYoutube },
  { href: 'https://artofnetworkengineering.com/iaatj', label: 'Discord', Icon: SiDiscord },
  { href: 'https://www.linkedin.com/company/artofneteng/', label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: 'https://x.com/artofneteng', label: 'X', Icon: SiX },
  { href: 'https://www.tiktok.com/@artofneteng', label: 'TikTok', Icon: SiTiktok },
  { href: 'https://www.instagram.com/artofneteng/', label: 'Instagram', Icon: SiInstagram },
];
