'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { filterCatalog, searchIndex, type IndexedLink } from './catalog';

export function ResourceCatalog({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');
  const searching = query.trim().length > 0;
  const results = useMemo(() => filterCatalog(query, searchIndex), [query]);

  return (
    <>
      <div className="sticky top-0 z-30 -mx-6 mb-8 px-6 py-4 bg-bg/90 backdrop-blur-sm border-b border-border">
        <label htmlFor="resource-search" className="sr-only">
          Search resources
        </label>
        <input
          id="resource-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources by name, description, or category"
          className="w-full rounded-sm border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted focus:border-accent-green focus:outline-none"
        />
        {searching && (
          <p
            className="mt-2 text-xs font-mono uppercase tracking-label text-text-muted"
            aria-live="polite"
          >
            {results.length} {results.length === 1 ? 'resource' : 'resources'}
          </p>
        )}
      </div>

      {searching ? <SearchResults results={results} /> : children}
    </>
  );
}

function SearchResults({ results }: { results: IndexedLink[] }) {
  if (results.length === 0) {
    return (
      <p className="mt-8 text-text-muted">
        No resources match that search. Try a broader term, or clear the box to browse everything.
      </p>
    );
  }
  return (
    <ul className="mt-4 space-y-4">
      {results.map((l) => (
        <li key={l.href} className="border border-border bg-surface p-5 rounded-sm">
          <div className="flex items-baseline justify-between gap-4">
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text font-semibold hover:text-accent-green"
            >
              {l.name}
            </a>
            <span className="shrink-0 text-xs font-mono uppercase tracking-label text-text-muted">
              {l.category}
            </span>
          </div>
          <p className="mt-1 text-sm text-text-muted">{l.note}</p>
        </li>
      ))}
    </ul>
  );
}
