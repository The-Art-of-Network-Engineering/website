'use client';

import { useMemo, useState } from 'react';
import type { Episode } from '@/lib/episodes';
import { EpisodeCard } from './EpisodeCard';

export function EpisodeList({ episodes }: { episodes: Episode[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return episodes;
    return episodes.filter((ep) => {
      const hay = `${ep.title} ${ep.guests.join(' ')} ${ep.summary}`.toLowerCase();
      return hay.includes(q);
    });
  }, [episodes, query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search episodes, guests, topics..."
        className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-text placeholder:text-text-muted focus:outline-none focus:border-accent-blue"
      />
      <p className="mt-3 text-xs text-text-muted font-mono uppercase tracking-label">
        {filtered.length} {filtered.length === 1 ? 'episode' : 'episodes'}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((ep) => (
          <EpisodeCard key={ep.id} episode={ep} />
        ))}
      </div>
    </div>
  );
}
