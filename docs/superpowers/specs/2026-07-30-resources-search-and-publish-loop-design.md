# Resources page: search + propose→publish loop — Design

**Date:** 2026-07-30
**Status:** Approved (design), pending implementation plan
**Author:** Andy + Claude

## Problem

The public resources page (https://artofnetworkengineering.com/resources) is a
hand-curated, statically-rendered catalog of ~200 free external resources for
network engineers. Two gaps:

1. **No search.** The page is a long static list with a jump-nav; there is no
   way to filter it. It keeps growing, which makes it harder to scan.
2. **No path from proposal to published.** The `resource_curator.py` agent
   researches and proposes new free resources monthly, but deliberately stops
   at writing a proposals JSON file and pinging Andy. Turning an approved
   proposal into an actual page edit is a manual step that was never built.

## Goals

- Add in-browser search that filters the existing catalog live.
- Close the loop so curator proposals become a reviewable PR automatically,
  with Andy's merge as the only gate to going live.
- Do both without changing the site's static-export deploy model or
  cannibalizing the paid Intelligence platform (curation, not synthesis —
  the existing curator guardrail stays intact).

## Non-goals (YAGNI)

- Fuzzy/typo-tolerant search, category filter chips, URL-persisted query
  state, match-substring highlighting. Live substring filter only for v1.
- Auto-merging or auto-publishing content. Every new resource passes through
  a human-merged PR.
- Any server/runtime search backend. Search is 100% client-side.
- Touching the `start-here` career-stages intro or dashboard widgets. Only the
  flat catalog is in scope.

## Key decisions (from brainstorming)

- **Approval model:** PR is the gate. The apply step opens ONE PR containing
  all new proposals; Andy reviews on mobile, trims unwanted lines, merges.
  Same workflow as the security-audit PRs. Nothing goes live without a merge.
- **Search UX:** Live filter-in-place. One pinned search box; typing filters
  the catalog in real time on name + note + category; empty box = today's
  full page.
- **The monthly curator now auto-opens a PR** rather than waiting for a manual
  trigger. Safe because the PR merge is still the gate.
- **Ship in two PRs:** frontend (search) first, automation (publish loop)
  second, since the loop targets the extracted data module.

## Architecture

### Part 0 — Shared foundation: extract catalog to a data module

Today the catalog lives as many `const <category>: Link[] = [...]` arrays
inside `app/resources/page.tsx`, interleaved with JSX. Extract the flat
catalog into a typed data module:

- **New file:** `app/resources/catalog.ts`
  - `export type Link = { name: string; href: string; note: string }`
  - `export type Category = { id: string; label: string; links: Link[] }`
  - `export const categories: Category[] = [...]` — one entry per existing
    section, **preserving the current anchor `id`s, labels, order, and item
    order** so nothing about the rendered page or its deep links changes.
- `page.tsx` imports `categories` instead of defining the arrays inline.
- The `start-here` career stages, dashboard groups, and `navSections` derive
  from / coexist with this module; `navSections` is generated from
  `categories` (id + label) to remove the duplicate list.

This module becomes the single insertion target for the publish loop — the
apply step edits a flat data file, never JSX.

### Part 1 — Search (live filter-in-place)

- **New client component:** `app/resources/ResourceCatalog.tsx` (`"use client"`).
  - Imports `categories` from `catalog.ts`.
  - Holds `query` state (`useState`). Renders the pinned search input, a live
    result count (with `aria-live="polite"`), the filtered sections, and the
    jump-nav.
  - Filter: case-insensitive substring match of `query` against each link's
    `name`, `note`, and its category `label`. A category renders only if it
    has ≥1 matching link; the jump-nav shows only categories with matches.
  - Empty query renders the full catalog exactly as today.
  - "No matches" empty state when nothing matches.
- **`page.tsx` stays a server component** (keeps `export const metadata` for
  SEO). It renders the static intro + `<ResourceCatalog />` island.
- No new dependencies. Filtering ~200 items on each keystroke is trivial; no
  debounce needed.

### Part 2 — Propose→publish loop (PR is the gate)

- **New script:** `/data/aone/scripts/resource_publish.py`. Runs immediately
  after `resource_curator.py` in the monthly cron.
  1. Read `/data/aone/data/resource_curator_proposals.json`.
  2. For each proposal, insert its `{ name, href, note }` into the matching
     category array in `catalog.ts` (map via `proposal.category` → `Category.id`).
     Dedup by normalized URL (reuse the curator's `_norm_url`); skip any URL
     already present.
  3. Run `npm run typecheck && npm test && npm run build` in
     `/data/aone/website`. **If any step fails, abort, leave the working tree
     clean, and Pushover an error** — never open a broken PR.
  4. On green: create a branch, commit, push, open ONE PR via `gh`
     ("Resources: N new suggestions for review"), Pushover Andy the PR link.
  5. Andy reviews, trims, merges. Merge triggers the normal Cloudflare deploy.
- **Insertion mechanics:** entries are appended to the target category's
  `links` array in `catalog.ts` in the repo's existing formatting; run the
  repo formatter/linter (prettier/eslint if present) before the build gate so
  the diff is clean. Insertion is idempotent (URL dedup).
- **Fixes folded in:**
  - Repoint the curator's `PAGE` (and any `existing_hrefs` read) from the
    stale `/home/aone/projects/aone-web` checkout to the canonical
    `/data/aone/website` — and, once `catalog.ts` exists, read the catalog
    from there so dedupe is correct.
  - Ensure every proposal carries a `category` key that maps to a
    `Category.id`; add it to the curator's research schema if missing.

## Data flow

```
monthly cron:
  resource_curator.py  → resource_curator_proposals.json  (research + dedupe + ping)
  resource_publish.py  → read proposals
                       → insert into catalog.ts (URL-dedup)
                       → typecheck + test + build  (abort on failure)
                       → branch/commit/push/open PR
                       → Pushover: "N suggestions, review PR <link>"
Andy → review PR on phone → trim → merge → Cloudflare deploys
```

## Testing

- Existing 25 vitest tests must stay green after the `catalog.ts` extraction
  (the rendered page and its anchors are unchanged).
- New unit tests:
  - **Filter logic:** query matches on name/note/category; empty query returns
    everything; no-match returns empty; case-insensitivity.
  - **Insertion function** (publish loop): inserts into the correct category,
    dedups an already-present URL, produces parseable TypeScript, is
    idempotent across repeated runs.
- Every publish-loop run is gated on a clean local `typecheck && test && build`
  before a PR is opened.
- Manual: eyeball the Cloudflare preview for PR A (search box filters, jump-nav
  updates, empty state, mobile layout).

## Sequencing / rollout

- **PR A (frontend):** Part 0 + Part 1 — extract `catalog.ts`, add search.
  Ship and verify via Cloudflare preview.
- **PR B (automation):** Part 2 — `resource_publish.py`, curator path fix,
  schema `category` key. Depends on PR A being merged (targets `catalog.ts`).

## Risks

- **Extraction regressions:** moving ~200 items risks dropped/reordered
  entries or changed anchor ids that break deep links. Mitigation: mechanical
  move, keep ids/order identical, rely on the existing tests + preview.
- **Malformed insertion breaking the build:** mitigated by the mandatory
  local build gate before any PR is opened.
- **Two divergent repo checkouts** (`/data/aone/website` vs
  `/home/aone/projects/aone-web`): the curator fix standardizes on the
  canonical repo; the stale checkout should be retired separately (noted, not
  in scope here).
