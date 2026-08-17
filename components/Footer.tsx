import Link from 'next/link';
import { SectionLabel } from './SectionLabel';
import { social } from './socialLinks';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-content px-6 py-12 grid gap-12 md:grid-cols-2">
        <div>
          <SectionLabel>Connect</SectionLabel>
          <p className="mt-4 text-sm">
            <Link href="/listen">All podcast apps</Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {social.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border bg-surface text-text hover:border-accent-green hover:text-accent-green px-3 py-1.5 text-sm rounded-sm transition-colors"
              >
                <Icon aria-hidden className="shrink-0 text-[18px]" />
                <span>{label}</span>
              </a>
            ))}
          </div>
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
