'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { NewsletterForm } from '@/components/NewsletterForm';

// One-time, scroll-triggered newsletter prompt. Rules:
// - never fires on page load (only after ~45% scroll depth)
// - shows at most once per visitor (localStorage flag), so repeat visitors are never nagged
// - dismissible via the X, the backdrop, or Escape
const SEEN_KEY = 'tsp_newsletter_popup_seen';

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
        className="relative w-full max-w-md overflow-hidden rounded-sm border border-border bg-surface"
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
        <div className="p-6">
          <p className="text-text-muted">
            One idea per issue for network engineers. No filler. Subscribe and the next one lands in
            your inbox.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
