import Link from 'next/link';

const navItems = [
  { href: '/episodes', label: 'Episodes' },
  { href: '/about', label: 'About' },
  { href: '/sponsor', label: 'Sponsor' },
  { href: '/newsletter', label: 'Newsletter' },
];

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-content px-6 py-5 flex items-center justify-between gap-8">
        <Link href="/" className="font-display text-lg tracking-tight text-text hover:text-text">
          The Art of Network Engineering
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
