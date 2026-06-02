# AONE Website — Phase 0 Design

**Owner:** Andy Lapteff
**Date:** 2026-06-02
**Deadline:** WordPress Premium renews ~2026-06-16 — site must be off WordPress by then
**Status:** Draft for review

---

## Goal

Replace artofnetworkengineering.com with a self-owned static site before the WordPress renewal. Keep the scope small enough to actually ship in 2 weeks. Build locally on `aoneproduction` (192.168.1.200) so Andy can preview the design before anything goes public.

This spec deliberately supersedes the May 2026 three-tier plan at `/data/aone/aone-website-plan.md` as the *active* spec. That larger plan is not wrong — it's just not Phase 0. The sponsor dashboard, transcript search, Intelligence SaaS, guest pages, topic hubs all remain on the roadmap as Phase 1+, but none of them block getting off WordPress.

## Non-goals (explicitly cut from Phase 0)

- Sponsor dashboard / Meter integration
- Cross-transcript search and topic hubs
- Guest directory and per-guest pages
- AONE Intelligence paid product
- Newsletter platform decision and integration (placeholder signup only)
- CMS — no Sanity/Contentful/Payload
- Blog migration (the WordPress blog content stays where it is for now; we link out if needed)

If any of these become must-haves, they belong in Phase 1 with their own spec.

## Scope (what Phase 0 ships)

A statically-generated marketing site with five page types:

| Route | Purpose |
|---|---|
| `/` | Hero, latest episode, "what is AONE", subscribe-anywhere buttons, sponsor inquiry CTA, newsletter signup |
| `/episodes` | Reverse-chronological list of all episodes (pulled from Buzzsprout RSS), filterable by search box only |
| `/episodes/[slug]` | Single episode: title, date, embedded player, show notes (from RSS `description`), guest names if available, links to listen on each platform |
| `/about` | Story, hosts, contact, links to socials/Discord |
| `/sponsor` | One-page sponsor inquiry: stats, pricing tiers, downloadable media kit PDF, mailto: link to sponsor@artofnetworkengineering.com |

Plus a global header, footer, and a `/press` route that's just the media kit download + logo pack.

## Architecture

- **Framework:** Next.js (App Router) with TypeScript, static export (`output: 'export'`)
- **Styling:** Tailwind CSS, no UI kit. Brand tokens (colors, fonts, spacing) from the new media kit live in `tailwind.config.ts` and a small `globals.css`. Fonts loaded via `next/font` (Orbitron for display, a clean sans for body — Inter is fine until we confirm the media kit's body face)
- **Episode data:** A build-time fetch from the Buzzsprout RSS feed. Parsed into a typed array of episodes. No runtime DB, no API routes
- **Hosting target:** Cloudflare Pages (free, fast, easy custom domain). Vercel is the alternate
- **Dev environment:** Runs on `aoneproduction` at `http://192.168.1.200:3000` for Andy's local preview before deploy

## Data flow

```
Buzzsprout RSS  ─┐
                 │  build step (node script in repo)
                 ▼
        episodes.json  ──►  Next.js static build  ──►  out/ directory  ──►  Cloudflare Pages
```

The build script (`scripts/fetch-episodes.ts`) runs as a `prebuild` npm hook. It hits the RSS URL, parses XML, writes `data/episodes.json`. Episode pages are generated via `generateStaticParams` at build time. To publish a new episode after Buzzsprout, we just re-run the build.

Failure mode: if the RSS fetch fails during build, fall back to the previously-committed `data/episodes.json` so a Buzzsprout outage never blocks a deploy.

## Visual direction

Two source-of-truth assets live at `/data/aone/brand/`:
- `AONE Media Kit 2026.pdf` — full media kit; canonical for typography, palette, palette logo
- `AONE_Sponsor_Snapshot_2026.pdf` — one-page sponsor summary; **closest existing reference to the look we want on web** (cards, mint accent words, monospace section labels, big-number stats). Treat it as a near-direct visual reference for the homepage and `/sponsor`.

Extracted design tokens (refine when implementing by sampling the PDFs):

| Token | Value | Use |
|---|---|---|
| `--bg` | very dark navy, near-black (`#0A1628` / `#0D1B2A`) | page background |
| `--surface` | slightly raised navy panel (`#13243A`-ish) | stat cards, content panels |
| `--accent-green` | bright mint/lime (`~#5DDB9D` to `#A6D63E`) | headline accent words, primary stat numbers, CTAs |
| `--accent-blue` | bright cyan (`~#3FB8DA`) | section labels, secondary numbers, links |
| `--text` | white / off-white | body |
| `--muted` | mid-gray | captions, footnotes |
| Display font | Orbitron-style geometric (from logotype) | hero, section heads |
| Body font | Clean sans (Inter is fine until media kit body face is confirmed) | everything else |
| Label style | UPPERCASE, tracked, often monospace, prefixed `→` or `—` | section labels (e.g. "→ WHY SPONSORS CHOOSE AONE") |

Layout cues from the sponsor snapshot worth carrying into the site:
- Card-based stat blocks with thin top-border accents
- Generous padding, low density
- Big numbers with small labels
- Brand-logo grid in subtle bordered cards

Anti-goals: generic-podcast-template, corporate-brochure, "fan site." The site should look like the sponsor snapshot, rendered as a web app.

## Repo layout

```
/home/aone/projects/aone-web/
├── docs/superpowers/specs/2026-06-02-aone-website-phase-0-design.md
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # /
│   ├── episodes/
│   │   ├── page.tsx             # /episodes
│   │   └── [slug]/page.tsx      # /episodes/[slug]
│   ├── about/page.tsx
│   ├── sponsor/page.tsx
│   └── press/page.tsx
├── components/                  # Header, Footer, EpisodeCard, Player, etc.
├── data/episodes.json           # committed; refreshed by prebuild
├── public/
│   ├── media-kit-2026.pdf
│   └── brand/                   # logos, hero imagery
├── scripts/fetch-episodes.ts
├── tailwind.config.ts
├── next.config.mjs              # output: 'export'
└── package.json
```

## Deployment

Two-step:
1. **Local preview on the server:** `npm run dev` exposes `http://192.168.1.200:3000`. Andy reviews. Iterate until he signs off.
2. **Public deploy:** `npm run build` produces `out/`. Push the repo to GitHub. Connect Cloudflare Pages to the repo for auto-build on push. Point the domain.

Domain cutover happens *only* after Andy approves the local preview. WordPress can stay live until the DNS flip.

## DNS & domain cutover

### State as of 2026-06-02 (inventoried)

- **Registrar:** Hover (both `artofnetworkengineering.com` and `artofneteng.com`)
- **DNS authority for `artofnetworkengineering.com`:** WordPress.com (`ns1/ns2/ns3.wordpress.com`) — set via nameservers at Hover
- **DNS authority for `artofneteng.com`:** Hover (`ns1/ns2.hover.com`); its A records point directly to WordPress IPs, so its "redirect to artofnetworkengineering.com" is actually happening inside WordPress
- **Email:** Google Workspace via `MX @ → smtp.google.com`. DKIM signed via `google._domainkey` TXT. `andy@artofnetworkengineering.com` is load-bearing
- **Podcast:** Buzzsprout via `CNAME podcast → app.buzzsprout.com`. Load-bearing
- **Old URL shortener:** `link.artofnetworkengineering.com → 52.72.49.79` (Rebrandly). No longer in active use but old short-links may exist in the wild
- **Linktree:** hosted at `linktr.ee/artofneteng` (not on the apex domain — no DNS impact)

### Canonical record list (from `dig` + WP DNS panel screenshot)

| Type | Name | Value | Migration action |
|---|---|---|---|
| A | `@` | `192.0.78.24` + `192.0.78.25` | Phase A: copy as-is. Phase C: change to Cloudflare Pages target |
| CNAME | `www` | `artofnetworkengineering.com` | Phase A: copy as-is |
| CNAME | `podcast` | `app.buzzsprout.com` | Phase A: copy as-is |
| CNAME | `*` (wildcard) | `artofnetworkengineering.com` | Phase A: copy as-is. Reconsider later |
| A | `link` | `52.72.49.79` | Phase A: copy as-is. Phase C: replace with 301 redirect to `https://linktr.ee/artofneteng` via Cloudflare Bulk Redirect |
| MX | `@` | `smtp.google.com` priority 1 | Phase A: copy as-is. Never changes |
| TXT | `google._domainkey` | full RSA DKIM key | Phase A: copy as-is. Never changes |
| TXT | `@` | `google-site-verification=gc51XYH-kOq6AGWyxvPSk3zbW9jXWIRs9c_zyImABEY` | Phase A: copy as-is |
| TXT | `_domainconnect` | `public-api.wordpress.com/rest/v1.3/domain-connect` | **Drop.** WordPress-only, dead after migration |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | **New in Phase A.** Fixes existing SPF gap |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:andy@artofnetworkengineering.com` | **New in Phase A** (optional but recommended) |

### Phase A — Move DNS off WordPress, change nothing functional (~3 days)

The goal: get WordPress out of the critical path so its cancellation has nothing to do with email, podcast, or DNS.

1. Andy creates a free Cloudflare account and adds `artofnetworkengineering.com` as a zone
2. Cloudflare auto-imports records via public DNS scan. We verify against the table above. Manually add the two `_domainconnect` gets dropped, and we add the new SPF and DMARC
3. Cloudflare displays two nameservers (e.g. `aragorn.ns.cloudflare.com`, `bella.ns.cloudflare.com`)
4. Andy logs into **Hover** → `artofnetworkengineering.com` → Nameservers → changes from `ns*.wordpress.com` to the Cloudflare pair
5. Wait 24–48h for propagation. Verify with `dig` from this server: NS, A, MX, DKIM all match expected
6. Test: send and receive mail on `andy@`, hit `podcast.artofnetworkengineering.com`, load the WordPress site. All should work identically to before

After Phase A, WordPress is still hosting the website but no longer holds DNS. The renewal deadline now only pressures the *website*, not email or podcast.

### Phase B — Build the Next.js site (target ~7 days)

No DNS work. Build the site per the rest of this spec, preview on `aoneproduction:3000`, iterate until approved.

### Phase C — Switch the website (~30 min + propagation)

1. Deploy the Next.js build to Cloudflare Pages on its `*.pages.dev` URL. Verify it works
2. In Cloudflare Pages, add `artofnetworkengineering.com` and `www.artofnetworkengineering.com` as custom domains. Cloudflare auto-updates the apex A records and `www` CNAME to point to Pages
3. Replace the `A link` record with a Cloudflare Bulk Redirect: `link.artofnetworkengineering.com/*` → `https://linktr.ee/artofneteng` (301). Old short-links land somewhere useful instead of failing
4. Watch the apex domain for 24–48h. The previous A records are gone — site is now served by Cloudflare Pages

### Phase D — Cancel WordPress (any time after Phase C verified)

WordPress is no longer serving anything load-bearing. Cancel Premium. Domain registration stays at Hover and is unaffected.

### Bonus: artofneteng.com

Today it lives on Hover DNS but its A records point at WordPress IPs. After Phase D, those WordPress IPs may stop serving the redirect. Fix:
- Add `artofneteng.com` as a second Cloudflare zone (free), or
- Use Hover's built-in URL forwarding to 301 → `https://artofnetworkengineering.com`

Either way: set up before WordPress is cancelled.

### Hard rule

Don't cancel WordPress before Phase C is verified working, even if the renewal date pressures it. Paying one extra month of WordPress is much cheaper than breaking email for a week.

## Cost

- Cloudflare Pages: $0
- Domain registration: already owned
- Buzzsprout: unchanged
- Total new monthly cost: **$0**

## Success criteria

1. Site is live at `artofnetworkengineering.com` before 2026-06-16
2. WordPress Premium is not renewed (or extended one month max for a safe cutover)
3. Email to `andy@`, `sponsor@`, and any other current forwarded addresses keeps working through and after cutover
4. No inbound deep links from social posts, podcast directories, or LinkedIn articles break (or they redirect cleanly)
5. Andy can publish a new podcast episode and have it appear on the site without writing code (just re-trigger the build)
6. Page weight under 200KB per route on initial load; Lighthouse performance ≥ 90 on mobile
7. Sponsor inquiry path is visible from the homepage in under 5 seconds

## Open questions for Andy

1. **Newsletter signup placeholder:** static "coming Summer 2026" message, or capture emails into a simple list (Buttondown/ConvertKit/Beehiiv free tier) now even though the newsletter isn't launching yet?
2. **Blog:** drop entirely from Phase 0, or include a stub `/blog` that just redirects to a forwarding URL for now?
3. **Hosts page content:** is the current "About → Team" content on the WordPress site current, or do you want to rewrite the hosts section as part of this?
4. **Analytics:** Plausible (paid, privacy-friendly), Cloudflare Web Analytics (free), or skip until Phase 1?
5. **Inbound links to preserve:** any specific URLs on the current site that you know are linked from elsewhere (Linktree, episode show notes, LinkedIn articles) that we must redirect, not 404?
6. **Wildcard subdomain `*`:** keep it post-Phase-C (catches typos, points to website) or drop it for cleanliness? Default: keep.
7. **`artofneteng.com` redirect:** Cloudflare second-zone or Hover URL forwarding? Either works.

**Resolved:**
- Q5/Q6 (registrar / email) — answered by DNS inventory: Hover is registrar, Google Workspace handles email, `andy@` is the only confirmed live address.
- Q7 (link.artofneteng.com) — answered: dormant Rebrandly. Replace with redirect to Linktree in Phase C.
