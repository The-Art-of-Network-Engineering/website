'use client';

import { useState } from 'react';
import Link from 'next/link';
import { filterByName } from '@/lib/episodes';

type GuestSummary = { name: string; slug: string; count: number; imageUrl: string | null };

export function GuestSearch({ guests }: { guests: GuestSummary[] }) {
  const [query, setQuery] = useState('');
  const filtered = filterByName(guests, query);
  const trimmed = query.trim();

  return (
    <div className="mt-8">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search guests by name…"
        aria-label="Search guests by name"
        className="w-full rounded-sm border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-accent-blue focus:outline-none"
      />
      <p className="mt-3 text-xs font-mono uppercase tracking-label text-text-muted">
        {filtered.length} {filtered.length === 1 ? 'guest' : 'guests'}
        {trimmed ? ` matching “${trimmed}”` : ''}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 text-text-muted">No guests match “{trimmed}”.</p>
      ) : (
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {filtered.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guests/${g.slug}`}
                className="group flex items-center gap-3 border border-border bg-surface hover:border-accent-blue transition-colors px-4 py-3 rounded-sm"
              >
                {g.imageUrl && (
                  <img
                    src={g.imageUrl}
                    alt=""
                    className="h-9 w-9 flex-shrink-0 rounded-full border border-border object-cover"
                  />
                )}
                <span className="text-sm text-text font-semibold group-hover:text-accent-green transition-colors">
                  {g.name}
                </span>
                <span className="ml-auto flex-shrink-0 text-xs text-text-muted font-mono uppercase tracking-label">
                  {g.count} {g.count === 1 ? 'episode' : 'episodes'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
