'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// One-time, scroll-triggered newsletter prompt. Rules:
// - never fires on page load (only after ~45% scroll depth)
// - shows at most once per visitor (localStorage flag), so repeat visitors are never nagged
// - dismissible via the X, the backdrop, or Escape
//
// The signup is a compact custom row (email + button) that hands off to beehiiv's
// own subscribe page with the email carried over. We use beehiiv's hosted page on
// submit (rather than embedding their form) so the popup stays small and on-brand;
// beehiiv doesn't expose a stable public form-submit endpoint to POST to directly.
const SEEN_KEY = 'tsp_newsletter_popup_seen';
const SUBSCRIBE_URL = 'https://theshortestpath.beehiiv.com/subscribe';

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(SEEN_KEY)) return;
    const onScroll = () => {
      const reached = window.scrollY + window.innerHeight;
      const pct = reached / document.documentElement.scrollHeight;
      if (pct >= 0.45) {
        setOpen(true);
        localStorage.setItem(SEEN_KEY, '1');
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Subscribe to The Shortest Path"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-sm border border-border bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-2 z-10 text-2xl leading-none text-text-muted hover:text-text"
        >
          ×
        </button>
        <Image
          src="/shortest-path-banner.png"
          alt="The Shortest Path, Your Career's Control Plane"
          width={1200}
          height={360}
          className="h-auto w-full"
        />
        <div className="p-4">
          <p className="text-sm text-text-muted">
            One idea per issue for network engineers. No filler.
          </p>
          <form
            action={SUBSCRIBE_URL}
            method="GET"
            target="_blank"
            onSubmit={() => setTimeout(() => setOpen(false), 100)}
            className="mt-3 flex gap-2"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className="min-w-0 flex-1 rounded-sm border border-border bg-bg px-3 py-2 text-text placeholder:text-text-muted focus:border-accent-green focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-sm bg-accent-green px-4 py-2 font-semibold text-bg hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
