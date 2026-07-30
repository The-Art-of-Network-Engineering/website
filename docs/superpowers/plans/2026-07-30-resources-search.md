# Resources Search (PR A) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add live, in-browser search to the resources page without changing the existing static layout or its deploy model.

**Architecture:** Extract the link data out of `page.tsx` into a pure, testable `catalog.ts` (data + a pure `filterCatalog` function + a flat `searchIndex`). Keep `page.tsx` a server component that renders the exact same JSX, but wrap its catalog body in a thin `"use client"` `ResourceCatalog` component. When the search box is empty it renders the untouched server-rendered children; when a query is present it renders a flat filtered list from `searchIndex`. Only the pure function is unit-tested (vitest runs in `node`, no DOM); the component is verified by build + Cloudflare preview.

**Tech Stack:** Next 15 (App Router, `output: export`), React 19, TypeScript, vitest (node env, `globals: false`), Tailwind.

**Deviation from spec (deliberate, lower risk):** The spec imagined the client component re-rendering all sections from a `categories` data model. The real page has non-uniform sections (the `dashboardGroups` internet-status block, the `vendorRoles` block with an inline playlist link, `CareerPaths`, cluster headings). Rebuilding those from data is high-risk. Instead we pass the existing server-rendered JSX through as `children` (zero reproduction risk) and only render a flat filtered list when searching. Same user-facing UX.

---

## File Structure

- **Create** `app/resources/catalog.ts` — `Link` type, the 21 link arrays (moved verbatim from `page.tsx`), a flat `searchIndex: IndexedLink[]`, and the pure `filterCatalog(query, index)` function. Single responsibility: catalog data + search.
- **Create** `app/resources/catalog.test.ts` — vitest unit tests for `filterCatalog` / `searchIndex`.
- **Create** `app/resources/ResourceCatalog.tsx` — `"use client"` wrapper: search input + state; renders `children` when empty, filtered results when searching.
- **Modify** `app/resources/page.tsx` — import the arrays from `./catalog` (remove the inline consts and `type Link`); wrap the catalog body (`JumpNav` through the "Help improve this site" section) in `<ResourceCatalog>`.

---

## Task 1: Move link data into `catalog.ts` (pure refactor, no behavior change)

**Files:**
- Create: `app/resources/catalog.ts`
- Modify: `app/resources/page.tsx:10-221` (remove `type Link` + the 21 const arrays), `app/resources/page.tsx:1-2` (add import)

- [ ] **Step 1: Create `catalog.ts` and move the data**

Cut `type Link = { name: string; href: string; note: string };` and the 21 `const … : Link[] = [ … ];` arrays currently at `page.tsx:10-221` — `certifications, courses, serviceProvider, labs, rfcs, blogs, outageMaps, cloudStatus, aiStatus, lookupTools, communities, listening, aiResources, specDriven, automation, gitGithub, diagramming, vendorRoles, careerData, books, biases` — into `app/resources/catalog.ts` **verbatim**, prefixing each with `export`:

```ts
export type Link = { name: string; href: string; note: string };

export const certifications: Link[] = [ /* …unchanged entries… */ ];
export const courses: Link[] = [ /* … */ ];
// …all 21 arrays, contents copied exactly, each `export const`…
export const biases: Link[] = [ /* … */ ];
```

Do NOT move `dashboardGroups` (it is a derived view over four arrays and stays in `page.tsx`), `navSections`, `careerStages`, or any component. Only the raw `Link[]` arrays and the `Link` type move.

- [ ] **Step 2: Re-import into `page.tsx`**

At the top of `page.tsx`, replace the removed definitions with an import (keep the existing `dashboardGroups` const in `page.tsx`, since it references the now-imported arrays):

```ts
import {
  Link,
  certifications, courses, serviceProvider, labs, rfcs, blogs,
  outageMaps, cloudStatus, aiStatus, lookupTools, communities, listening,
  aiResources, specDriven, automation, gitGithub, diagramming, vendorRoles,
  careerData, books, biases,
} from './catalog';
```

`dashboardGroups` at old `page.tsx:109-114` stays as-is (it references `outageMaps`, `cloudStatus`, `aiStatus`, `lookupTools`, which are now imported).

- [ ] **Step 3: Verify no regression**

Run: `npm run typecheck && npm test && npm run build`
Expected: typecheck clean; **25/25** tests pass; build succeeds, `out/_headers` emitted. The rendered page and all anchor ids are unchanged (pure move).

- [ ] **Step 4: Commit**

```bash
git add app/resources/catalog.ts app/resources/page.tsx
git commit -m "refactor(resources): extract link data into catalog.ts (no behavior change)"
```

---

## Task 2: Add `searchIndex` + `filterCatalog` (TDD)

**Files:**
- Modify: `app/resources/catalog.ts` (append index + function)
- Test: `app/resources/catalog.test.ts`

- [ ] **Step 1: Write the failing test**

Create `app/resources/catalog.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { filterCatalog, searchIndex } from './catalog';

describe('searchIndex', () => {
  it('indexes every catalog link with a category label', () => {
    expect(searchIndex.length).toBeGreaterThan(100);
    for (const item of searchIndex) {
      expect(item.name).toBeTruthy();
      expect(item.href).toMatch(/^https?:|^\//);
      expect(item.category).toBeTruthy();
    }
  });
});

describe('filterCatalog', () => {
  it('returns nothing for an empty or whitespace query', () => {
    expect(filterCatalog('', searchIndex)).toEqual([]);
    expect(filterCatalog('   ', searchIndex)).toEqual([]);
  });

  it('matches on name, case-insensitively', () => {
    const r = filterCatalog('CONTAINERLAB', searchIndex);
    expect(r).toHaveLength(1);
    expect(r[0].name).toBe('Containerlab');
    expect(r[0].category).toBe('Lab software');
  });

  it('matches on note text', () => {
    const r = filterCatalog('type checker', searchIndex);
    expect(r.some((x) => x.name === 'Batfish')).toBe(true);
  });

  it('matches on category label', () => {
    const r = filterCatalog('cognitive biases', searchIndex);
    expect(r.length).toBeGreaterThanOrEqual(9);
    expect(r.every((x) => x.category === 'Cognitive biases')).toBe(true);
  });

  it('returns an empty array when nothing matches', () => {
    expect(filterCatalog('zzzznotarealthing', searchIndex)).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/resources/catalog.test.ts`
Expected: FAIL — `filterCatalog`/`searchIndex` are not exported yet.

- [ ] **Step 3: Implement `searchIndex` + `filterCatalog`**

Append to `app/resources/catalog.ts`:

```ts
export type IndexedLink = Link & { category: string };

const CATEGORY_MAP: { links: Link[]; category: string }[] = [
  { links: certifications, category: 'Certifications' },
  { links: courses, category: 'Free courses' },
  { links: serviceProvider, category: 'Service provider' },
  { links: labs, category: 'Lab software' },
  { links: rfcs, category: 'Standards' },
  { links: gitGithub, category: 'Git & GitHub' },
  { links: blogs, category: 'Blogs' },
  { links: outageMaps, category: 'Outages & internet health' },
  { links: cloudStatus, category: 'Cloud & infrastructure status' },
  { links: aiStatus, category: 'AI & LLM status' },
  { links: lookupTools, category: 'Routing & lookup tools' },
  { links: communities, category: 'Communities' },
  { links: listening, category: 'Listening' },
  { links: aiResources, category: 'AI for NEs' },
  { links: specDriven, category: 'Spec-driven dev' },
  { links: automation, category: 'Automation' },
  { links: diagramming, category: 'Diagramming' },
  { links: vendorRoles, category: 'Vendor roles' },
  { links: careerData, category: 'Career data' },
  { links: books, category: 'Books' },
  { links: biases, category: 'Cognitive biases' },
];

export const searchIndex: IndexedLink[] = CATEGORY_MAP.flatMap(({ links, category }) =>
  links.map((l) => ({ ...l, category })),
);

export function filterCatalog(query: string, index: IndexedLink[] = searchIndex): IndexedLink[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return index.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.note.toLowerCase().includes(q) ||
      l.category.toLowerCase().includes(q),
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run app/resources/catalog.test.ts`
Expected: PASS (all cases). Then `npm test` → **30/30** (25 existing + 5 new).

- [ ] **Step 5: Commit**

```bash
git add app/resources/catalog.ts app/resources/catalog.test.ts
git commit -m "feat(resources): add searchIndex + filterCatalog with tests"
```

---

## Task 3: Add `ResourceCatalog` client component and wire it into the page

**Files:**
- Create: `app/resources/ResourceCatalog.tsx`
- Modify: `app/resources/page.tsx` (wrap catalog body)

- [ ] **Step 1: Create the client component**

Create `app/resources/ResourceCatalog.tsx`:

```tsx
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
```

- [ ] **Step 2: Wrap the catalog body in `page.tsx`**

Add the import at the top of `page.tsx`:

```ts
import { ResourceCatalog } from './ResourceCatalog';
```

In the returned JSX, wrap everything from `<JumpNav />` down through the closing `</section>` of the "Help improve this site" block in `<ResourceCatalog>…</ResourceCatalog>`. The `<SectionLabel>Resources</SectionLabel>`, the `<h1>`, and the intro `<p>` stay ABOVE the wrapper (always visible). Structure becomes:

```tsx
      <p className="mt-6 max-w-3xl text-text-muted text-lg"> … intro … </p>

      <ResourceCatalog>
        <JumpNav />
        <CareerPaths />
        {/* …all ClusterHeading + LinkSection + measurement + vendor-roles + books + biases… */}
        <section className="mt-16 border-t border-border pt-12 space-y-4">
          {/* …Help improve this site… */}
        </section>
      </ResourceCatalog>
    </div>
```

No section content changes — only the wrapper is added.

- [ ] **Step 3: Verify build**

Run: `npm run typecheck && npm test && npm run build`
Expected: typecheck clean; 30/30 tests; build succeeds; `out/resources.html` present and `out/_headers` still emitted.

- [ ] **Step 4: Grep the built page to confirm the search input shipped**

Run: `grep -c 'resource-search' out/resources.html`
Expected: `>= 1` (the input rendered into the static export).

- [ ] **Step 5: Commit**

```bash
git add app/resources/ResourceCatalog.tsx app/resources/page.tsx
git commit -m "feat(resources): live in-page search over the catalog"
```

---

## Task 4: Open PR A and verify on preview

- [ ] **Step 1: Push and open the PR**

```bash
git push -u origin resources-search-and-publish
gh pr create --repo The-Art-of-Network-Engineering/website --base main \
  --title "Resources: live in-page search" \
  --body "Adds a client-side search box to /resources. Extracts link data into app/resources/catalog.ts (pure move), adds a tested filterCatalog(), and a ResourceCatalog client wrapper that shows the full static page when the box is empty and a flat filtered list when searching. No deploy-model change. Tests 30/30."
```

- [ ] **Step 2: Manual preview verification (Andy)**

On the Cloudflare preview URL from the PR: type in the search box (filters live), confirm the result count updates, a no-match term shows the empty state, clearing the box restores the full page, and the layout holds on mobile.

---

## Self-Review

- **Spec coverage:** Search = Part 1 ✅. Data extraction = Part 0 ✅ (as `catalog.ts`). Publish loop (Part 2) is intentionally **PR B**, planned separately after this merges. YAGNI items (fuzzy, chips, URL state, highlight) remain out.
- **Placeholder scan:** The only "…" are explicit "copy these unchanged entries verbatim" move instructions with exact source line numbers — not logic placeholders.
- **Type consistency:** `Link`, `IndexedLink`, `searchIndex`, `filterCatalog(query, index)` names match across catalog.ts, its test, and the component.
- **Test env:** tests are pure (node env, `import { describe, it, expect } from 'vitest'`), consistent with `lib/*.test.ts`. No DOM needed.
