// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { createElement } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

// No JSX in this file on purpose: the project's tsconfig sets `jsx: preserve` for Next, so
// the test runner doesn't transform JSX. createElement needs no transform.

// The mobile menu is a native <details>. Next navigates client-side without remounting the
// header, so `open` used to survive the page change: you tapped a link, the next page loaded
// underneath, and the menu stayed on screen until you dismissed it by hand.
let pathname = '/';
vi.mock('next/navigation', () => ({ usePathname: () => pathname }));
vi.mock('next/link', () => ({
  default: ({ children, href, onClick }: { children: unknown; href: string; onClick?: () => void }) =>
    createElement('a', { href, onClick }, children as never),
}));

const { Header } = await import('./Header');

afterEach(() => { cleanup(); pathname = '/'; });

const renderOpen = () => {
  const r = render(createElement(Header));
  const details = r.container.querySelector('details') as HTMLDetailsElement;
  details.open = true;
  return { ...r, details };
};

describe('mobile menu closes on navigation', () => {
  it('closes when the route changes', () => {
    const { details, rerender } = renderOpen();
    expect(details.open).toBe(true);

    pathname = '/episodes';                  // client-side navigation
    rerender(createElement(Header));

    expect(details.open).toBe(false);
  });

  it('closes when you tap the link for the page you are already on', () => {
    // A same-page tap never changes the pathname, so the route effect never fires.
    const { details, container } = renderOpen();
    fireEvent.click(container.querySelector('details a[href="/about"]') as HTMLAnchorElement);
    expect(details.open).toBe(false);
  });

  it('does not force the menu shut while you are still on the same page', () => {
    const { details } = renderOpen();
    expect(details.open).toBe(true);
  });

  it('keeps every nav destination in the mobile menu', () => {
    const { container } = renderOpen();
    const hrefs = [...container.querySelectorAll('details a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/sponsor');
    expect(hrefs).toContain('/episodes');
    expect(hrefs.length).toBeGreaterThanOrEqual(10);
  });
});
