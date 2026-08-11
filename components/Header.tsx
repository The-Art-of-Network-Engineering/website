import Link from 'next/link';

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/episodes', label: 'Episodes' },
  { href: '/guests', label: 'Guests' },
  { href: '/merch', label: 'Merch' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/press', label: 'Press' },
  { href: '/resources', label: 'Resources' },
  { href: '/sponsor', label: 'Sponsor' },
  { href: '/what-is-network-engineering', label: 'What Is NE?' },
];

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-content px-6 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          title="The Art of Network Engineering Home"
          aria-label="The Art of Network Engineering Home"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <img
            src="/aone-logo-dark.png"
            alt="The Art of Network Engineering"
            className="h-16 md:h-24 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-text hover:text-accent-green">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu: native <details>/<summary> works in static export, no JS needed */}
        <details className="md:hidden relative group">
          <summary
            aria-label="Open menu"
            className="list-none cursor-pointer text-text p-2 -mr-2 rounded-sm hover:bg-surface [&::-webkit-details-marker]:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="group-open:hidden"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="hidden group-open:block"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </summary>
          <nav className="absolute right-0 top-full mt-2 bg-surface border border-border rounded-sm py-2 flex flex-col min-w-[220px] z-50 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text hover:text-accent-green hover:bg-bg px-4 py-3 text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
