import Link from 'next/link';
import { SectionLabel } from './SectionLabel';

const social = [
  { href: 'https://podcasts.apple.com/us/podcast/the-art-of-network-engineering/id1525015389', label: 'Apple Podcasts' },
  { href: 'https://open.spotify.com/show/0pMKATLfuXd19vvg2xlntA', label: 'Spotify' },
  { href: 'https://www.youtube.com/@artofneteng', label: 'YouTube' },
  { href: 'https://artofnetworkengineering.com/iaatj', label: 'Discord' },
  { href: 'https://www.linkedin.com/company/artofneteng/', label: 'LinkedIn' },
  { href: 'https://x.com/artofneteng', label: 'X / Twitter' },
  { href: 'https://linktr.ee/artofneteng', label: 'Linktree' },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-content px-6 py-12 grid gap-12 md:grid-cols-3">
        <div>
          <SectionLabel>Connect</SectionLabel>
          <ul className="mt-4 space-y-2 text-sm">
            {social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionLabel>Articles</SectionLabel>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="https://www.linkedin.com/company/artofneteng/posts/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read on LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div>
          <SectionLabel>Contact</SectionLabel>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="mailto:sponsor@artofnetworkengineering.com">
                sponsor@artofnetworkengineering.com
              </a>
            </li>
            <li><Link href="/press">Press kit</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-content px-6 py-6 text-xs text-text-muted">
          © {new Date().getFullYear()} The Art of Network Engineering
        </div>
      </div>
    </footer>
  );
}
