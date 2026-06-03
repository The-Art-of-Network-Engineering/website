import Link from 'next/link';

const navItems = [
  { href: '/episodes', label: 'Episodes' },
  { href: '/about', label: 'About' },
  { href: '/what-is-network-engineering', label: 'What Is NE?' },
  { href: '/sponsor', label: 'Sponsor' },
  { href: '/newsletter', label: 'Newsletter' },
];

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-content px-6 py-4 flex items-center justify-between gap-8">
        <Link
          href="/"
          title="The Art of Network Engineering Home"
          aria-label="The Art of Network Engineering Home"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <img
            src="/aone-logo-dark.png"
            alt="The Art of Network Engineering"
            className="h-20 md:h-24 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-text hover:text-accent-green">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
