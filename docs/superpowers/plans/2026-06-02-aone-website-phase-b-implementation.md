# AONE Website Phase B Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a statically-generated Next.js marketing site for The Art of Network Engineering that replaces the WordPress.com site. Site pulls episodes from Buzzsprout RSS at build time and renders five page types with the brand visual direction from the 2026 media kit.

**Architecture:** Next.js 14 App Router with `output: 'export'` for fully static output. Tailwind CSS for styling, design tokens in `tailwind.config.ts`. Episode data fetched from Buzzsprout RSS by a build-time Node script that writes `data/episodes.json`. No runtime DB, no API routes, no auth. Each page is a server component that reads the JSON at build time. Deploys to Cloudflare Pages from a GitHub repo (Cloudflare setup happens in Phase C, not in this plan).

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, `fast-xml-parser`, `clsx`, `vitest` for tests, `next/font` for Orbitron + Inter. Node 20+.

---

## Context references

- **Spec:** `/home/aone/projects/aone-web/docs/superpowers/specs/2026-06-02-aone-website-phase-0-design.md`
- **Brand assets:** `/data/aone/brand/` (media kit PDF, sponsor snapshot PDF — sponsor snapshot is the closest visual reference)
- **Buzzsprout RSS URL:** `https://rss.buzzsprout.com/2127872.rss`
- **Project root:** `/home/aone/projects/aone-web/`
- **Dev URL for Andy's preview:** `http://192.168.1.200:3000` (Next.js dev server bound to `0.0.0.0`)
- **Phase A (DNS) is complete** — DNS is on Cloudflare, all records correct. Don't touch DNS in this plan.

## File structure

```
/home/aone/projects/aone-web/
├── .gitignore
├── .nvmrc                              # Node 20
├── README.md                           # short — repo purpose, commands
├── package.json
├── tsconfig.json
├── next.config.mjs                     # output: 'export', redirects()
├── postcss.config.mjs
├── tailwind.config.ts                  # brand tokens
├── vitest.config.ts                    # unit test config
├── app/
│   ├── globals.css                     # CSS vars, base styles
│   ├── layout.tsx                      # root layout: fonts, Header, Footer
│   ├── page.tsx                        # /
│   ├── not-found.tsx                   # 404
│   ├── about/page.tsx
│   ├── episodes/
│   │   ├── page.tsx                    # /episodes
│   │   └── [slug]/page.tsx             # /episodes/[slug]
│   ├── newsletter/page.tsx             # /newsletter (Beehiiv form lives here + on /)
│   ├── press/page.tsx
│   └── sponsor/page.tsx
├── components/
│   ├── EpisodeCard.tsx
│   ├── EpisodeList.tsx                 # client component, owns search filter
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── NewsletterForm.tsx              # Beehiiv embed
│   ├── SectionLabel.tsx                # the "→ LABEL" / "— LABEL" style
│   ├── StatCard.tsx                    # big-number cards from media kit
│   └── SubscribeButtons.tsx            # Apple/Spotify/YouTube/RSS
├── data/
│   └── episodes.json                   # committed; refreshed by prebuild script
├── lib/
│   ├── episodes.ts                     # Episode type + load helper
│   ├── episodes.test.ts                # unit tests for parsing
│   └── format.ts                       # date + duration helpers
├── public/
│   ├── media-kit-2026.pdf
│   └── brand/
│       └── (logos copied later)
└── scripts/
    ├── fetch-episodes.ts               # runs as prebuild hook
    └── rss-fixture.xml                 # test fixture (real RSS sample)
```

## Working assumptions

- This plan covers **only Phase B** (build). Phase C (deploy to Cloudflare Pages) and Phase D (cancel WordPress) are operational steps Andy executes from the spec.
- The project directory `/home/aone/projects/aone-web/` exists. Spec lives at `docs/superpowers/specs/` inside it.
- Git is not yet initialized in the project directory. Task 1 handles that.
- No existing code to refactor. Greenfield.
- Tests use **vitest** (faster than jest for this scale, no babel config needed).

---

## Task 1: Project scaffold + base config

**Files:**
- Create: `/home/aone/projects/aone-web/.gitignore`
- Create: `/home/aone/projects/aone-web/.nvmrc`
- Create: `/home/aone/projects/aone-web/package.json`
- Create: `/home/aone/projects/aone-web/tsconfig.json`
- Create: `/home/aone/projects/aone-web/next.config.mjs`
- Create: `/home/aone/projects/aone-web/postcss.config.mjs`
- Create: `/home/aone/projects/aone-web/README.md`

- [ ] **Step 1: Initialize git in the project directory**

```bash
cd /home/aone/projects/aone-web
git init -b main
```

- [ ] **Step 2: Write `.gitignore`**

```
node_modules
.next
out
.env.local
.DS_Store
*.log
.vercel
```

- [ ] **Step 3: Write `.nvmrc`**

```
20
```

- [ ] **Step 4: Write `package.json`**

```json
{
  "name": "aone-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "fetch-episodes": "tsx scripts/fetch-episodes.ts",
    "prebuild": "npm run fetch-episodes",
    "dev": "next dev -H 0.0.0.0 -p 3000",
    "build": "next build",
    "start": "next start -H 0.0.0.0 -p 3000",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "fast-xml-parser": "^4.5.0",
    "next": "14.2.18",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20.16.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.1",
    "eslint-config-next": "14.2.18",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.14",
    "tsx": "^4.19.2",
    "typescript": "^5.6.3",
    "vitest": "^2.1.5"
  }
}
```

- [ ] **Step 5: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out"]
}
```

- [ ] **Step 6: Write `next.config.mjs` (redirects added in later task)**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 7: Write `postcss.config.mjs`**

```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
```

- [ ] **Step 8: Write `README.md`**

```markdown
# AONE Web

Static marketing site for The Art of Network Engineering.

## Commands

```
npm install
npm run dev          # http://192.168.1.200:3000
npm run build        # static export to out/
npm test
```

Episode data is fetched from Buzzsprout RSS at build time. To refresh after publishing a new episode, re-run `npm run build`.

See `docs/superpowers/specs/` for the design spec and `docs/superpowers/plans/` for the implementation plan.
```

- [ ] **Step 9: Install dependencies**

Run: `cd /home/aone/projects/aone-web && npm install`
Expected: completes without errors; `node_modules/` created.

- [ ] **Step 10: Commit**

```bash
git add .gitignore .nvmrc package.json package-lock.json tsconfig.json next.config.mjs postcss.config.mjs README.md
git commit -m "chore: initialize Next.js project scaffold"
```

---

## Task 2: Brand tokens + global styles

**Files:**
- Create: `/home/aone/projects/aone-web/tailwind.config.ts`
- Create: `/home/aone/projects/aone-web/app/globals.css`

Brand values are extracted from `/data/aone/brand/AONE Media Kit 2026.pdf` and `AONE_Sponsor_Snapshot_2026.pdf`. Exact hex values are approximations from sampling the PDFs; refine in Task 14 if visually off.

- [ ] **Step 1: Write `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A1628',
        surface: '#13243A',
        surfaceMuted: '#0F1C30',
        border: '#1F3354',
        accent: {
          green: '#5DDB9D',
          blue: '#3FB8DA',
        },
        text: {
          DEFAULT: '#F4F7FB',
          muted: '#8AA1BD',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        label: '0.18em',
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Write `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply bg-bg text-text antialiased;
  }
  body {
    @apply font-sans;
  }
  h1, h2, h3, h4 {
    @apply font-display tracking-tight;
  }
  a {
    @apply text-accent-blue hover:text-accent-green transition-colors;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: add brand design tokens and global styles"
```

---

## Task 3: Episode types + RSS parser (TDD)

**Files:**
- Create: `/home/aone/projects/aone-web/lib/episodes.ts`
- Create: `/home/aone/projects/aone-web/lib/episodes.test.ts`
- Create: `/home/aone/projects/aone-web/scripts/rss-fixture.xml`
- Create: `/home/aone/projects/aone-web/vitest.config.ts`

This task has real logic worth testing (slug extraction, guest filtering, date parsing). UI tasks downstream use visual verification, not unit tests.

- [ ] **Step 1: Write `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { environment: 'node', globals: false },
});
```

- [ ] **Step 2: Capture a real RSS fixture**

```bash
curl -sL https://rss.buzzsprout.com/2127872.rss | head -c 200000 > /home/aone/projects/aone-web/scripts/rss-fixture.xml
```

Check the file is non-empty and contains `<item>` tags:

```bash
grep -c '<item>' /home/aone/projects/aone-web/scripts/rss-fixture.xml
```

Expected: a positive integer (the count of items captured).

- [ ] **Step 3: Write the test FIRST — `lib/episodes.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseFeed } from './episodes';

const fixture = readFileSync('scripts/rss-fixture.xml', 'utf-8');

describe('parseFeed', () => {
  const result = parseFeed(fixture);

  it('extracts the show title and description', () => {
    expect(result.show.title).toBe('The Art of Network Engineering');
    expect(result.show.description).toMatch(/blends technical insight/i);
    expect(result.show.image).toMatch(/^https:\/\/storage\.buzzsprout\.com\//);
  });

  it('returns at least one episode', () => {
    expect(result.episodes.length).toBeGreaterThan(0);
  });

  it('parses episode fields correctly', () => {
    const ep = result.episodes[0];
    expect(ep.id).toMatch(/^Buzzsprout-\d+$/);
    expect(ep.title.length).toBeGreaterThan(0);
    expect(ep.slug).toMatch(/^[a-z0-9-]+$/);
    expect(ep.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(ep.audioUrl).toMatch(/^https:\/\/.*\.mp3$/);
    expect(ep.durationSeconds).toBeGreaterThan(0);
    expect(ep.showNotesHtml.length).toBeGreaterThan(0);
  });

  it('derives slug from the audio URL filename, not the title', () => {
    // Buzzsprout's URL slugs are stable and de-duped; titles can be edited.
    const ep = result.episodes[0];
    expect(ep.audioUrl).toContain(ep.slug);
  });

  it('extracts guest names when present (host is excluded from guests)', () => {
    const ep = result.episodes.find((e) => e.guests.length > 0);
    expect(ep, 'fixture should contain at least one episode with a guest').toBeDefined();
    expect(ep!.guests.every((g) => g.toLowerCase() !== 'andy lapteff')).toBe(true);
  });

  it('episodes are sorted newest-first', () => {
    const dates = result.episodes.map((e) => new Date(e.publishedAt).getTime());
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
    }
  });
});
```

- [ ] **Step 4: Run test, confirm it fails**

Run: `cd /home/aone/projects/aone-web && npm test`
Expected: FAIL — `parseFeed` does not exist.

- [ ] **Step 5: Implement `lib/episodes.ts`**

```ts
import { XMLParser } from 'fast-xml-parser';

export type Episode = {
  id: string;
  slug: string;
  title: string;
  publishedAt: string; // ISO 8601
  durationSeconds: number;
  audioUrl: string;
  showNotesHtml: string;
  summary: string;
  guests: string[];
  artworkUrl: string | null;
};

export type Show = {
  title: string;
  description: string;
  image: string;
  link: string;
};

export type Feed = {
  show: Show;
  episodes: Episode[];
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  cdataPropName: '#cdata',
  parseAttributeValue: false,
  trimValues: true,
});

const slugFromAudioUrl = (url: string): string => {
  // .../episodes/19195553-some-slug-here.mp3 -> some-slug-here
  const filename = url.split('/').pop() ?? '';
  const stem = filename.replace(/\.mp3$/i, '');
  const match = stem.match(/^\d+-(.+)$/);
  return (match?.[1] ?? stem).toLowerCase();
};

const textOf = (node: unknown): string => {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'object' && '#cdata' in (node as Record<string, unknown>)) {
    const c = (node as Record<string, unknown>)['#cdata'];
    return typeof c === 'string' ? c : '';
  }
  return '';
};

const arrayOf = <T>(node: T | T[] | undefined): T[] => {
  if (node == null) return [];
  return Array.isArray(node) ? node : [node];
};

export function parseFeed(xml: string): Feed {
  const parsed = parser.parse(xml);
  const channel = parsed.rss.channel;

  const show: Show = {
    title: textOf(channel.title),
    description: textOf(channel.description),
    image: channel['itunes:image']?.['@_href'] ?? channel.image?.url ?? '',
    link: textOf(channel.link),
  };

  const items = arrayOf(channel.item);

  const episodes: Episode[] = items.map((item: Record<string, unknown>) => {
    const audioUrl = (item.enclosure as Record<string, unknown>)?.['@_url'] as string ?? '';
    const persons = arrayOf(item['podcast:person'] as unknown);
    const guests = persons
      .filter((p) => {
        const role = (p as Record<string, unknown>)['@_role'];
        return typeof role === 'string' && role.toLowerCase() === 'guest';
      })
      .map((p) => textOf((p as Record<string, unknown>)['#text'] ?? p))
      .filter((name) => name.length > 0);

    return {
      id: textOf(item.guid),
      slug: slugFromAudioUrl(audioUrl),
      title: textOf(item.title),
      publishedAt: new Date(textOf(item.pubDate)).toISOString(),
      durationSeconds: Number(textOf(item['itunes:duration'])) || 0,
      audioUrl,
      showNotesHtml: textOf(item['content:encoded']) || textOf(item.description),
      summary: textOf(item['itunes:summary']),
      guests,
      artworkUrl: (item['itunes:image'] as Record<string, unknown>)?.['@_href'] as string ?? null,
    };
  });

  episodes.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return { show, episodes };
}
```

Note on the `podcast:person` parsing: `fast-xml-parser` puts the element text under `#text` when attributes are also present. Verify in Step 6; if the actual shape differs (e.g. the value is on the node itself), adjust the `textOf` access pattern.

- [ ] **Step 6: Run test, iterate until pass**

Run: `npm test`
Expected: all tests pass. If guest extraction fails, console.log the raw `podcast:person` shape from the parsed XML and adjust the access pattern.

- [ ] **Step 7: Commit**

```bash
git add lib/episodes.ts lib/episodes.test.ts scripts/rss-fixture.xml vitest.config.ts
git commit -m "feat: add RSS feed parser with episode types"
```

---

## Task 4: Build-time RSS fetch script

**Files:**
- Create: `/home/aone/projects/aone-web/scripts/fetch-episodes.ts`
- Create: `/home/aone/projects/aone-web/data/episodes.json`

- [ ] **Step 1: Write `scripts/fetch-episodes.ts`**

```ts
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { parseFeed } from '../lib/episodes';

const RSS_URL = 'https://rss.buzzsprout.com/2127872.rss';
const OUT_PATH = resolve(process.cwd(), 'data/episodes.json');

async function main() {
  console.log(`Fetching ${RSS_URL}`);
  let xml: string;
  try {
    const res = await fetch(RSS_URL, { headers: { 'User-Agent': 'aone-web build' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    xml = await res.text();
  } catch (err) {
    console.warn(`Fetch failed (${(err as Error).message}); falling back to existing ${OUT_PATH}`);
    if (!existsSync(OUT_PATH)) {
      throw new Error(`No cached episodes.json to fall back to. Original error: ${(err as Error).message}`);
    }
    return; // keep existing data
  }

  const feed = parseFeed(xml);
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(feed, null, 2));
  console.log(`Wrote ${feed.episodes.length} episodes to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Run it**

Run: `cd /home/aone/projects/aone-web && npm run fetch-episodes`
Expected: prints `Wrote N episodes` where N is the live episode count (~200+). `data/episodes.json` exists and is multi-MB.

- [ ] **Step 3: Spot-check the output**

```bash
jq '.show.title, (.episodes | length), .episodes[0].title, .episodes[0].slug' /home/aone/projects/aone-web/data/episodes.json
```

Expected: show title is `"The Art of Network Engineering"`, episode count > 100, first episode has a sane title and slug.

- [ ] **Step 4: Commit**

```bash
git add scripts/fetch-episodes.ts data/episodes.json
git commit -m "feat: fetch episodes from Buzzsprout RSS at build time"
```

---

## Task 5: Root layout + fonts + Header + Footer

**Files:**
- Create: `/home/aone/projects/aone-web/app/layout.tsx`
- Create: `/home/aone/projects/aone-web/components/Header.tsx`
- Create: `/home/aone/projects/aone-web/components/Footer.tsx`
- Create: `/home/aone/projects/aone-web/components/SectionLabel.tsx`

- [ ] **Step 1: Write `app/layout.tsx` with font loading**

```tsx
import type { Metadata } from 'next';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const display = Orbitron({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'The Art of Network Engineering', template: '%s — AONE' },
  description:
    'The Art of Network Engineering blends technical insight with real-world stories from engineers, innovators, and IT pros.',
  metadataBase: new URL('https://artofnetworkengineering.com'),
  openGraph: { type: 'website', siteName: 'The Art of Network Engineering' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Write `components/SectionLabel.tsx`**

```tsx
import clsx from 'clsx';

export function SectionLabel({
  children,
  prefix = '→',
  className,
}: {
  children: React.ReactNode;
  prefix?: '→' | '—';
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'font-mono text-xs uppercase tracking-label text-accent-blue',
        className,
      )}
    >
      <span aria-hidden="true" className="mr-2">
        {prefix}
      </span>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Write `components/Header.tsx`**

```tsx
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
```

Note: a hamburger menu for mobile is intentionally omitted in Phase 0. The header navigation hides on mobile; primary routes are accessible via the homepage CTAs and the footer. Revisit in Phase 1 if usage data shows a need.

- [ ] **Step 4: Write `components/Footer.tsx`**

```tsx
import Link from 'next/link';
import { SectionLabel } from './SectionLabel';

const social = [
  { href: 'https://podcasts.apple.com/us/podcast/the-art-of-network-engineering/id1525015389', label: 'Apple Podcasts' },
  { href: 'https://open.spotify.com/show/0pMKATLfuXd19vvg2xlntA', label: 'Spotify' },
  { href: 'https://www.youtube.com/@artofnetworkengineering', label: 'YouTube' },
  { href: 'https://discord.gg/4N2Qh47dwt', label: 'Discord' },
  { href: 'https://www.linkedin.com/company/the-art-of-network-engineering/', label: 'LinkedIn' },
  { href: 'https://x.com/artofneteng', label: 'X / Twitter' },
  { href: 'https://linktr.ee/artofneteng', label: 'Linktree' },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-content px-6 py-12 grid gap-12 md:grid-cols-3">
        <div>
          <SectionLabel>Connect</SectionLabel>
          <ul className="mt-4 space-y-2 text-sm">
            {social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionLabel>Articles</SectionLabel>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="https://www.linkedin.com/company/the-art-of-network-engineering/posts/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read on LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div>
          <SectionLabel>Contact</SectionLabel>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="mailto:sponsor@artofnetworkengineering.com">
                sponsor@artofnetworkengineering.com
              </a>
            </li>
            <li><Link href="/press">Press kit</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-content px-6 py-6 text-xs text-text-muted">
          © {new Date().getFullYear()} The Art of Network Engineering
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Create a placeholder homepage so dev server runs**

Write minimal `app/page.tsx`:

```tsx
export default function Home() {
  return (
    <div className="mx-auto max-w-content px-6 py-24">
      <h1 className="text-4xl">AONE — homepage placeholder (Task 6 will replace this)</h1>
    </div>
  );
}
```

- [ ] **Step 6: Start the dev server and visually verify**

Run: `cd /home/aone/projects/aone-web && npm run dev`
Open in browser: `http://192.168.1.200:3000`
Expected:
- Dark navy background, white text
- Orbitron display font on the placeholder h1 and header logo
- Header at top with nav links (Episodes, About, Sponsor, Newsletter)
- Footer at bottom with three columns
- Social links open in new tabs

If the header/footer look broken, check that Tailwind classes are being applied (inspect element). Fix and re-verify before committing.

Stop the dev server (Ctrl-C) before committing.

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx app/page.tsx components/Header.tsx components/Footer.tsx components/SectionLabel.tsx
git commit -m "feat: add root layout, header, footer with brand fonts"
```

---

## Task 6: Format helpers + StatCard + EpisodeCard

**Files:**
- Create: `/home/aone/projects/aone-web/lib/format.ts`
- Create: `/home/aone/projects/aone-web/components/StatCard.tsx`
- Create: `/home/aone/projects/aone-web/components/EpisodeCard.tsx`

- [ ] **Step 1: Write `lib/format.ts`**

```ts
export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export const formatDuration = (seconds: number): string => {
  if (!seconds || seconds <= 0) return '';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
};
```

- [ ] **Step 2: Write `components/StatCard.tsx`**

```tsx
import clsx from 'clsx';

export function StatCard({
  value,
  label,
  caption,
  className,
}: {
  value: string;
  label: string;
  caption?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'border-t-2 border-accent-blue bg-surface px-6 py-6 rounded-sm',
        className,
      )}
    >
      <div className="font-display text-4xl text-accent-green">{value}</div>
      <div className="mt-2 text-sm text-text">{label}</div>
      {caption && <div className="mt-1 text-xs text-text-muted">{caption}</div>}
    </div>
  );
}
```

- [ ] **Step 3: Write `components/EpisodeCard.tsx`**

```tsx
import Link from 'next/link';
import type { Episode } from '@/lib/episodes';
import { formatDate, formatDuration } from '@/lib/format';

export function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="block border border-border bg-surface hover:border-accent-blue transition-colors px-6 py-5 rounded-sm"
    >
      <div className="flex items-baseline justify-between gap-4 text-xs text-text-muted font-mono uppercase tracking-label">
        <span>{formatDate(episode.publishedAt)}</span>
        {episode.durationSeconds > 0 && <span>{formatDuration(episode.durationSeconds)}</span>}
      </div>
      <h3 className="mt-3 font-display text-lg text-text">{episode.title}</h3>
      {episode.guests.length > 0 && (
        <p className="mt-1 text-sm text-text-muted">
          with {episode.guests.join(', ')}
        </p>
      )}
    </Link>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/format.ts components/StatCard.tsx components/EpisodeCard.tsx
git commit -m "feat: add format helpers and StatCard / EpisodeCard components"
```

---

## Task 7: SubscribeButtons + Homepage

**Files:**
- Create: `/home/aone/projects/aone-web/components/SubscribeButtons.tsx`
- Modify: `/home/aone/projects/aone-web/app/page.tsx`

- [ ] **Step 1: Write `components/SubscribeButtons.tsx`**

```tsx
const platforms = [
  { href: 'https://podcasts.apple.com/us/podcast/the-art-of-network-engineering/id1525015389', label: 'Apple Podcasts' },
  { href: 'https://open.spotify.com/show/0pMKATLfuXd19vvg2xlntA', label: 'Spotify' },
  { href: 'https://www.youtube.com/@artofnetworkengineering', label: 'YouTube' },
  { href: 'https://rss.buzzsprout.com/2127872.rss', label: 'RSS' },
];

export function SubscribeButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      {platforms.map((p) => (
        <a
          key={p.href}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border bg-surface hover:border-accent-green hover:text-accent-green text-text px-4 py-2 text-sm rounded-sm transition-colors"
        >
          {p.label}
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `app/page.tsx`**

```tsx
import Link from 'next/link';
import feed from '@/data/episodes.json';
import type { Feed } from '@/lib/episodes';
import { EpisodeCard } from '@/components/EpisodeCard';
import { SectionLabel } from '@/components/SectionLabel';
import { SubscribeButtons } from '@/components/SubscribeButtons';

const typedFeed = feed as Feed;

export default function Home() {
  const latest = typedFeed.episodes[0];
  const recent = typedFeed.episodes.slice(1, 4);

  return (
    <div className="mx-auto max-w-content px-6">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <SectionLabel>The Art of Network Engineering</SectionLabel>
        <h1 className="mt-6 font-display text-5xl md:text-6xl leading-tight">
          Stories from the engineers who{' '}
          <span className="text-accent-green">build the internet</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-text-muted text-lg">
          AONE blends technical insight with real-world stories from engineers, innovators, and IT
          pros. From data centers on cruise ships to rockets in space. Authentic, practical, human.
        </p>
        <div className="mt-10">
          <SubscribeButtons />
        </div>
      </section>

      {/* Latest episode */}
      <section className="py-12 border-t border-border">
        <SectionLabel>Latest episode</SectionLabel>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <EpisodeCard episode={latest} />
          </div>
          <div className="md:col-span-1 grid gap-6">
            {recent.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>
        </div>
        <div className="mt-8">
          <Link href="/episodes" className="text-sm text-accent-blue">
            Browse all {typedFeed.episodes.length} episodes →
          </Link>
        </div>
      </section>

      {/* Sponsor CTA */}
      <section className="py-16 border-t border-border">
        <SectionLabel>For Sponsors</SectionLabel>
        <h2 className="mt-4 font-display text-3xl">
          Reach the network engineers who <span className="text-accent-green">build, evaluate, and buy</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          One million lifetime downloads. 2,800 engineers per episode. 9,300 monthly catalog
          impressions across 200+ shows.
        </p>
        <div className="mt-6">
          <Link
            href="/sponsor"
            className="inline-block bg-accent-green text-bg font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
          >
            See sponsor options
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 border-t border-border">
        <SectionLabel>Newsletter</SectionLabel>
        <h2 className="mt-4 font-display text-3xl">Launching Summer 2026.</h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          A quarterly dispatch from the AONE archive — what we learned, who we talked to, what's
          worth your time.
        </p>
        <div className="mt-6">
          <Link href="/newsletter" className="text-sm text-accent-blue">
            Subscribe →
          </Link>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Visually verify**

Run: `npm run dev`
Open: `http://192.168.1.200:3000`
Check:
- Hero with "build the internet" in mint-green
- Subscribe buttons (Apple, Spotify, YouTube, RSS) render and are clickable
- Latest episode card shows real data from RSS
- 3 recent-episode cards in the side column
- "Browse all N episodes" link
- Sponsor and Newsletter sections render with their CTAs

Stop the dev server before committing.

- [ ] **Step 4: Commit**

```bash
git add components/SubscribeButtons.tsx app/page.tsx
git commit -m "feat: implement homepage with hero, latest episode, sponsor CTA"
```

---

## Task 8: Episodes index (`/episodes`) with search

**Files:**
- Create: `/home/aone/projects/aone-web/app/episodes/page.tsx`
- Create: `/home/aone/projects/aone-web/components/EpisodeList.tsx`

The search filter requires client-side state, so the list is a client component. The page itself stays a server component.

- [ ] **Step 1: Write `components/EpisodeList.tsx`**

```tsx
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
```

- [ ] **Step 2: Write `app/episodes/page.tsx`**

```tsx
import type { Metadata } from 'next';
import feed from '@/data/episodes.json';
import type { Feed } from '@/lib/episodes';
import { EpisodeList } from '@/components/EpisodeList';
import { SectionLabel } from '@/components/SectionLabel';

const typedFeed = feed as Feed;

export const metadata: Metadata = {
  title: 'Episodes',
  description: 'Browse all episodes of The Art of Network Engineering.',
};

export default function EpisodesPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Archive</SectionLabel>
      <h1 className="mt-4 font-display text-4xl">All episodes</h1>
      <p className="mt-3 text-text-muted">
        {typedFeed.episodes.length} episodes since July 2020. Search by topic, guest name, or
        keyword.
      </p>
      <div className="mt-10">
        <EpisodeList episodes={typedFeed.episodes} />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Visually verify**

Run: `npm run dev`
Open: `http://192.168.1.200:3000/episodes`
Check:
- All episodes render in a 2-column grid
- Search input filters live as you type (try "automation", "Tom", a known guest name)
- Count updates with filter
- Clicking a card navigates to /episodes/[slug] (404 is fine right now — Task 9 builds that page)

Stop dev server before committing.

- [ ] **Step 4: Commit**

```bash
git add app/episodes/page.tsx components/EpisodeList.tsx
git commit -m "feat: implement episodes index with client-side search"
```

---

## Task 9: Episode detail page (`/episodes/[slug]`)

**Files:**
- Create: `/home/aone/projects/aone-web/app/episodes/[slug]/page.tsx`

- [ ] **Step 1: Write `app/episodes/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import feed from '@/data/episodes.json';
import type { Feed, Episode } from '@/lib/episodes';
import { SectionLabel } from '@/components/SectionLabel';
import { SubscribeButtons } from '@/components/SubscribeButtons';
import { formatDate, formatDuration } from '@/lib/format';

const typedFeed = feed as Feed;

const findEpisode = (slug: string): Episode | undefined =>
  typedFeed.episodes.find((ep) => ep.slug === slug);

export function generateStaticParams() {
  return typedFeed.episodes.map((ep) => ({ slug: ep.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ep = findEpisode(params.slug);
  if (!ep) return { title: 'Episode not found' };
  return {
    title: ep.title,
    description: ep.summary.slice(0, 200),
  };
}

// Extract numeric Buzzsprout episode id from "Buzzsprout-19195553" for player embed
const playerIdFromGuid = (id: string): string | null => {
  const match = id.match(/^Buzzsprout-(\d+)$/);
  return match ? match[1] : null;
};

export default function EpisodePage({ params }: { params: { slug: string } }) {
  const ep = findEpisode(params.slug);
  if (!ep) notFound();

  const playerId = playerIdFromGuid(ep.id);

  return (
    <article className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Episode</SectionLabel>
      <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">{ep.title}</h1>
      <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono uppercase tracking-label text-text-muted">
        <span>{formatDate(ep.publishedAt)}</span>
        {ep.durationSeconds > 0 && <span>{formatDuration(ep.durationSeconds)}</span>}
        {ep.guests.length > 0 && <span>with {ep.guests.join(', ')}</span>}
      </div>

      {playerId && (
        <div className="mt-10 aspect-[16/4] min-h-[200px]">
          <iframe
            src={`https://www.buzzsprout.com/2127872/episodes/${playerId}?client_source=small_player&iframe=true`}
            loading="lazy"
            width="100%"
            height="200"
            allow="autoplay"
            className="border border-border rounded-sm"
            title={`Player for: ${ep.title}`}
          />
        </div>
      )}

      <div className="mt-12 grid md:grid-cols-[2fr_1fr] gap-12">
        <div>
          <SectionLabel>Show notes</SectionLabel>
          <div
            className="prose prose-invert max-w-none mt-4 text-text [&_a]:text-accent-blue [&_a:hover]:text-accent-green"
            dangerouslySetInnerHTML={{ __html: ep.showNotesHtml }}
          />
        </div>
        <aside>
          <SectionLabel>Listen elsewhere</SectionLabel>
          <div className="mt-4">
            <SubscribeButtons />
          </div>
          <div className="mt-8">
            <SectionLabel>Direct audio</SectionLabel>
            <a
              href={ep.audioUrl}
              className="mt-4 inline-block text-sm text-accent-blue break-all"
            >
              MP3 download
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}
```

Note on `dangerouslySetInnerHTML`: Buzzsprout show notes are HTML strings from the RSS feed. We trust Buzzsprout as the source (Andy owns the account, no third-party content). If Andy ever has another author write show notes that contain untrusted HTML, swap this for a sanitizer like `sanitize-html`. Not Phase 0 work.

- [ ] **Step 2: Visually verify**

Run: `npm run dev`
Navigate from `/episodes` to an episode by clicking a card.
Check:
- Title, date, duration, guest line
- Buzzsprout audio player iframe loads and plays
- Show notes render with links styled
- "Listen elsewhere" buttons in the sidebar
- MP3 download link works (open in new tab, audio file loads)

Try a bad slug: `http://192.168.1.200:3000/episodes/this-does-not-exist`
Expected: 404 page (default Next.js 404 for now — Task 13 customizes it).

Stop dev server before committing.

- [ ] **Step 3: Commit**

```bash
git add app/episodes/[slug]/page.tsx
git commit -m "feat: implement episode detail page with player and show notes"
```

---

## Task 10: About page

**Files:**
- Create: `/home/aone/projects/aone-web/app/about/page.tsx`

- [ ] **Step 1: Write `app/about/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'About',
  description: 'About The Art of Network Engineering and host Andy Lapteff.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>About</SectionLabel>
      <h1 className="mt-4 font-display text-4xl">The Art of Network Engineering</h1>

      <div className="mt-10 grid md:grid-cols-[2fr_1fr] gap-12">
        <div className="space-y-6 text-text">
          <p>
            AONE launched in July 2020 to tell the human stories behind network engineering. Six
            years and 200+ episodes later, it's one of the largest independent media platforms
            built for network engineers and infrastructure professionals.
          </p>
          <p>
            We blend technical insight with real-world stories from engineers, innovators, and IT
            pros. From data centers on cruise ships to rockets in space. Authentic, practical,
            human.
          </p>

          <h2 className="font-display text-2xl pt-8">Host</h2>
          <p>
            <strong className="text-text">Andy Lapteff</strong> hosts and produces AONE. Network
            engineer by background, operator by necessity. He runs the show solo with help from
            occasional co-hosts and a network of friends across the industry.
          </p>

          <h2 className="font-display text-2xl pt-8">Get in touch</h2>
          <ul className="space-y-2">
            <li>
              Sponsorships:{' '}
              <a href="mailto:sponsor@artofnetworkengineering.com">
                sponsor@artofnetworkengineering.com
              </a>
            </li>
            <li>
              General:{' '}
              <a href="mailto:andy@artofnetworkengineering.com">
                andy@artofnetworkengineering.com
              </a>
            </li>
            <li>
              Community:{' '}
              <a href="https://discord.gg/4N2Qh47dwt" target="_blank" rel="noopener noreferrer">
                Join the Discord (3,500+ engineers)
              </a>
            </li>
          </ul>
        </div>
        <aside>
          <div className="border border-border bg-surface p-6 rounded-sm">
            <SectionLabel>By the numbers</SectionLabel>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-text-muted">Lifetime downloads</dt>
                <dd className="font-display text-2xl text-accent-green">1M+</dd>
              </div>
              <div>
                <dt className="text-text-muted">Episodes published</dt>
                <dd className="font-display text-2xl text-accent-green">200+</dd>
              </div>
              <div>
                <dt className="text-text-muted">YouTube subscribers</dt>
                <dd className="font-display text-2xl text-accent-green">9,500</dd>
              </div>
              <div>
                <dt className="text-text-muted">Discord community</dt>
                <dd className="font-display text-2xl text-accent-green">3,500+</dd>
              </div>
            </dl>
          </div>
          <div className="mt-6">
            <Link href="/sponsor" className="text-sm text-accent-blue">
              Sponsor inquiries →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
```

Note: bio content above is a starting draft. Andy will likely want to rewrite the host paragraph during review. Leave placeholders out — the prose above is plain enough to ship and edit later.

- [ ] **Step 2: Visually verify**

Open: `http://192.168.1.200:3000/about`
Check layout, side card, links, mailto: behavior.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: implement about page with bio and stats"
```

---

## Task 11: Sponsor page

**Files:**
- Create: `/home/aone/projects/aone-web/app/sponsor/page.tsx`

- [ ] **Step 1: Write `app/sponsor/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';
import { StatCard } from '@/components/StatCard';

export const metadata: Metadata = {
  title: 'Sponsor AONE',
  description: 'Sponsor The Art of Network Engineering. Reach 2,800 network engineers per episode.',
};

const stats = [
  { value: '1M+', label: 'Lifetime downloads', caption: 'Approaching, 906K and counting' },
  { value: '2,800', label: 'Downloads per episode', caption: '+26% YoY, first 60 days' },
  { value: '306K', label: 'Total platform touchpoints', caption: '+14.2% YoY' },
  { value: '9,300', label: 'YouTube subscribers', caption: '+35.4% YoY' },
];

const audience = [
  { value: '70%', label: 'Aged 26–44 (prime buying age)' },
  { value: '20%', label: 'Director / VP / C-Suite' },
  { value: '80%', label: 'Hands-on practitioners' },
  { value: '64%', label: 'North America (20% Europe)' },
];

const products = [
  {
    name: 'Pre-roll ad',
    price: '$600 / episode',
    detail:
      '30-second host-read spot at the top of a single audio episode. Permanent placement. 2,800 impressions per episode.',
  },
  {
    name: 'Featured episode',
    price: '$1,500 / episode',
    detail:
      '60-second host-read spot in a single episode. Audio + video bundled. Permanent placement.',
  },
  {
    name: 'Dynamic audio ad',
    price: '$6,000 / month',
    detail:
      '15–30s pre-roll and 45–90s mid-roll dynamically inserted into all 200+ audio episodes for your contract term. 9,300 monthly impressions.',
  },
  {
    name: 'Dedicated interview',
    price: '$11,000 / episode',
    detail:
      'Full-length episode dedicated to your product, team, or story. Audio + video.',
  },
];

export default function SponsorPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      {/* Hero */}
      <SectionLabel>Sponsor AONE</SectionLabel>
      <h1 className="mt-4 font-display text-5xl leading-tight">
        Reach the network engineers who{' '}
        <span className="text-accent-green">build, evaluate, and buy</span>.
      </h1>
      <p className="mt-6 max-w-3xl text-text-muted text-lg">
        AONE is one of the largest independent media platforms built for network engineers and
        infrastructure professionals. Sponsors aren't buying generic impressions — they're earning
        attention from one of the most targeted practitioner audiences in network infrastructure.
      </p>

      {/* Stats */}
      <section className="mt-16">
        <SectionLabel>By the numbers</SectionLabel>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Audience */}
      <section className="mt-16">
        <SectionLabel>Audience</SectionLabel>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {audience.map((a) => (
            <StatCard key={a.label} value={a.value} label={a.label} />
          ))}
        </div>
        <p className="mt-6 text-sm text-text-muted">
          Typical employers: Enterprise IT, Service Providers, Cloud Infrastructure, Education,
          Federal / Government.
        </p>
      </section>

      {/* Why podcasts */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Why podcasts work for B2B</SectionLabel>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-surface border border-border p-6 rounded-sm">
            <p className="font-display text-3xl text-accent-green">60%</p>
            <p className="mt-2 text-sm text-text">
              of the B2B buying journey is now complete before a buyer contacts sales.
            </p>
            <p className="mt-1 text-xs text-text-muted">6sense, 2025</p>
          </div>
          <div className="bg-surface border border-border p-6 rounded-sm">
            <p className="font-display text-3xl text-accent-green">86%</p>
            <p className="mt-2 text-sm text-text">
              of daily podcast listeners recall an ad they heard in the past week — the highest of
              any medium.
            </p>
            <p className="mt-1 text-xs text-text-muted">Sounds Profitable, 2025</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Products & pricing</SectionLabel>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p.name} className="bg-surface border border-border p-6 rounded-sm">
              <h3 className="font-display text-xl">{p.name}</h3>
              <p className="mt-2 font-display text-2xl text-accent-green">{p.price}</p>
              <p className="mt-3 text-sm text-text-muted">{p.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-text-muted">
          Category exclusivity available ($1,000/month, stacks on any package). Bulk discounts on
          multi-episode and multi-quarter commitments.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-16 border-t border-border pt-12">
        <SectionLabel>Become a sponsor</SectionLabel>
        <h2 className="mt-4 font-display text-3xl">Request the full 2026 media kit.</h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          Email{' '}
          <a href="mailto:sponsor@artofnetworkengineering.com">
            sponsor@artofnetworkengineering.com
          </a>
          {' '}or download the kit directly.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="mailto:sponsor@artofnetworkengineering.com?subject=AONE%20Sponsorship%20Inquiry"
            className="inline-block bg-accent-green text-bg font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
          >
            Email sponsor@aone
          </a>
          <a
            href="/media-kit-2026.pdf"
            className="inline-block border border-border bg-surface text-text font-semibold px-6 py-3 rounded-sm hover:border-accent-blue transition-colors"
          >
            Download media kit (PDF)
          </a>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Visually verify**

Open `http://192.168.1.200:3000/sponsor`. Compare side-by-side with `/data/aone/brand/AONE_Sponsor_Snapshot_2026.pdf`. They should feel like the same brand — stat cards, mint accent words, monospace section labels. The PDF download link will 404 until Task 14 copies the PDF; that's expected.

- [ ] **Step 3: Commit**

```bash
git add app/sponsor/page.tsx
git commit -m "feat: implement sponsor page with stats, products, CTA"
```

---

## Task 12: Newsletter page + Beehiiv embed

**Files:**
- Create: `/home/aone/projects/aone-web/components/NewsletterForm.tsx`
- Create: `/home/aone/projects/aone-web/app/newsletter/page.tsx`
- Modify: `/home/aone/projects/aone-web/app/page.tsx` (replace Newsletter section with the form)

The Beehiiv embed URL has a placeholder publication ID. Andy will need to create the Beehiiv publication (free tier) and paste the embed URL during Phase B review. Until then, the component renders a static "coming soon" with the embed prepared.

- [ ] **Step 1: Write `components/NewsletterForm.tsx`**

```tsx
// Beehiiv publication ID — set after Andy creates the free Beehiiv account.
// Until then, BEEHIIV_PUB_ID is null and the form renders a "coming soon" placeholder.
const BEEHIIV_PUB_ID: string | null = null; // e.g. "abc123def-..."

export function NewsletterForm() {
  if (!BEEHIIV_PUB_ID) {
    return (
      <div className="bg-surface border border-border rounded-sm p-6">
        <p className="text-sm text-text-muted">
          Newsletter signup opens shortly. Email{' '}
          <a href="mailto:andy@artofnetworkengineering.com?subject=Newsletter">
            andy@artofnetworkengineering.com
          </a>{' '}
          to be added manually in the meantime.
        </p>
      </div>
    );
  }

  return (
    <iframe
      src={`https://embeds.beehiiv.com/${BEEHIIV_PUB_ID}?slim=true`}
      title="Subscribe to the AONE newsletter"
      data-test-id="beehiiv-embed"
      frameBorder="0"
      scrolling="no"
      style={{ margin: 0, borderRadius: 4, backgroundColor: 'transparent' }}
      className="w-full min-h-[80px]"
    />
  );
}
```

- [ ] **Step 2: Write `app/newsletter/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Subscribe to the AONE newsletter — launching Summer 2026.',
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Newsletter</SectionLabel>
      <h1 className="mt-4 font-display text-4xl">Launching Summer 2026.</h1>
      <p className="mt-6 max-w-2xl text-text-muted text-lg">
        A quarterly dispatch from the AONE archive: what we learned, who we talked to, what's
        worth your time. One email per quarter, no filler.
      </p>
      <div className="mt-10 max-w-xl">
        <NewsletterForm />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Update homepage to use `NewsletterForm`**

In `app/page.tsx`, replace the Newsletter section's "Subscribe →" link with the actual form:

```tsx
import { NewsletterForm } from '@/components/NewsletterForm';
// ... rest of imports
```

Replace the existing Newsletter section block with:

```tsx
      {/* Newsletter */}
      <section className="py-16 border-t border-border">
        <SectionLabel>Newsletter</SectionLabel>
        <h2 className="mt-4 font-display text-3xl">Launching Summer 2026.</h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          A quarterly dispatch from the AONE archive — what we learned, who we talked to, what's
          worth your time.
        </p>
        <div className="mt-6 max-w-xl">
          <NewsletterForm />
        </div>
      </section>
```

- [ ] **Step 4: Visually verify**

Open `/newsletter` and `/`. Both should render the placeholder card (no Beehiiv ID set yet).

- [ ] **Step 5: Commit**

```bash
git add app/newsletter/page.tsx components/NewsletterForm.tsx app/page.tsx
git commit -m "feat: add newsletter page and signup placeholder"
```

---

## Task 13: Press page + custom 404

**Files:**
- Create: `/home/aone/projects/aone-web/app/press/page.tsx`
- Create: `/home/aone/projects/aone-web/app/not-found.tsx`

- [ ] **Step 1: Write `app/press/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Press kit',
  description: 'AONE press kit, media kit, and brand assets.',
};

export default function PressPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Press</SectionLabel>
      <h1 className="mt-4 font-display text-4xl">Media & press kit</h1>
      <p className="mt-4 max-w-2xl text-text-muted">
        Resources for journalists, podcast networks, and partners. Email{' '}
        <a href="mailto:andy@artofnetworkengineering.com">andy@artofnetworkengineering.com</a> for
        interview requests or anything not below.
      </p>

      <section className="mt-12 grid md:grid-cols-2 gap-6">
        <a
          href="/media-kit-2026.pdf"
          className="block bg-surface border border-border p-6 rounded-sm hover:border-accent-blue transition-colors"
        >
          <SectionLabel>Download</SectionLabel>
          <h2 className="mt-3 font-display text-2xl">2026 media kit</h2>
          <p className="mt-2 text-sm text-text-muted">
            Full audience, distribution, and sponsorship overview (PDF).
          </p>
        </a>
        <div className="bg-surface border border-border p-6 rounded-sm">
          <SectionLabel>Brand assets</SectionLabel>
          <h2 className="mt-3 font-display text-2xl">Logos & artwork</h2>
          <p className="mt-2 text-sm text-text-muted">
            Logo pack available on request. Email{' '}
            <a href="mailto:andy@artofnetworkengineering.com">andy@artofnetworkengineering.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Write `app/not-found.tsx`**

```tsx
import Link from 'next/link';
import { SectionLabel } from '@/components/SectionLabel';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-6 py-32 text-center">
      <SectionLabel className="justify-center">404</SectionLabel>
      <h1 className="mt-6 font-display text-5xl">Page not found</h1>
      <p className="mt-4 text-text-muted">
        The page you're looking for doesn't exist.
      </p>
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-block bg-accent-green text-bg font-semibold px-6 py-3 rounded-sm"
        >
          Home
        </Link>
        <Link
          href="/episodes"
          className="inline-block border border-border bg-surface text-text font-semibold px-6 py-3 rounded-sm"
        >
          Browse episodes
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Visually verify**

Open `/press` and `/this-does-not-exist`. Both render correctly.

- [ ] **Step 4: Commit**

```bash
git add app/press/page.tsx app/not-found.tsx
git commit -m "feat: add press page and custom 404"
```

---

## Task 14: Redirects + brand assets + analytics hook

**Files:**
- Modify: `/home/aone/projects/aone-web/next.config.mjs`
- Modify: `/home/aone/projects/aone-web/app/layout.tsx`
- Copy: media kit PDF into `public/`

- [ ] **Step 1: Add redirects to `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  async redirects() {
    return [
      // Known live URL from Linktree — must redirect to new sponsor page
      { source: '/work-with-us', destination: '/sponsor', permanent: true },
      { source: '/work-with-us/', destination: '/sponsor', permanent: true },
      // Old WP blog content lives on LinkedIn now
      { source: '/blog', destination: 'https://www.linkedin.com/company/the-art-of-network-engineering/posts/', permanent: false },
      { source: '/blog/:slug*', destination: 'https://www.linkedin.com/company/the-art-of-network-engineering/posts/', permanent: false },
    ];
  },
};

export default nextConfig;
```

Note on `output: 'export'`: static export does NOT execute `redirects()` at runtime — Cloudflare Pages reads them at build time and emits a `_redirects` file. Verify in Task 15 by checking `out/_redirects` exists post-build.

If `next build` doesn't emit `_redirects` automatically (Next.js static export historically doesn't), we generate it ourselves in `scripts/fetch-episodes.ts` or as a `postbuild` script. See Task 15 for the fallback.

- [ ] **Step 2: Copy media kit PDF into public**

```bash
cp "/data/aone/brand/AONE Media Kit 2026.pdf" /home/aone/projects/aone-web/public/media-kit-2026.pdf
ls -la /home/aone/projects/aone-web/public/media-kit-2026.pdf
```

Expected: file exists, size ~672KB.

- [ ] **Step 3: Add Cloudflare Web Analytics script to root layout**

In `app/layout.tsx`, add the script tag inside the `<body>` (Cloudflare gives you a snippet after enabling Web Analytics for your zone). Until Andy enables it and provides the token, leave a placeholder constant that renders nothing:

```tsx
// In app/layout.tsx, just below the imports:
const CF_ANALYTICS_TOKEN: string | null = null; // set after Andy enables Cloudflare Web Analytics

// In the return, just before </body>:
{CF_ANALYTICS_TOKEN && (
  <script
    defer
    src="https://static.cloudflareinsights.com/beacon.min.js"
    data-cf-beacon={`{"token": "${CF_ANALYTICS_TOKEN}"}`}
  />
)}
```

Security note on this script: the standard hardening is `integrity="sha384-..."` Subresource Integrity, which pins the script to a known hash so a compromised CDN can't push malicious code. We deliberately omit it here because Cloudflare rotates `beacon.min.js` and does not publish a stable SRI hash — adding one would break analytics on the next rotation. The trust model is: we trust Cloudflare's CDN integrity as a vendor (same vendor as DNS and Pages hosting). If that trust ever changes, the right response is to swap analytics providers, not to add an SRI hash that will silently break. The Beehiiv iframe in Task 12 is the other third-party resource; iframes are sandboxed by the browser and don't take SRI.

- [ ] **Step 4: Visually verify**

Open `http://192.168.1.200:3000/work-with-us` — should redirect to `/sponsor` (302 in dev, 301 in production export).
Open `http://192.168.1.200:3000/media-kit-2026.pdf` — should download the PDF.

- [ ] **Step 5: Commit**

```bash
git add next.config.mjs app/layout.tsx public/media-kit-2026.pdf
git commit -m "feat: add redirects, media kit asset, and analytics hook"
```

---

## Task 15: Production build verification + cleanup

**Files:**
- Possibly create: `/home/aone/projects/aone-web/scripts/generate-redirects.ts`
- Possibly modify: `/home/aone/projects/aone-web/package.json`

- [ ] **Step 1: Run production build**

```bash
cd /home/aone/projects/aone-web && npm run build
```

Expected: build succeeds. Output lists every static route. `out/` directory created.

If build fails on type errors, fix them. If it fails on `redirects()` being incompatible with `output: 'export'` (Next.js has been known to warn or error on this combo), go to Step 2; otherwise skip to Step 3.

- [ ] **Step 2 (conditional): Generate `_redirects` manually for Cloudflare Pages**

If Next.js refuses to include `redirects()` in static export, write a small `postbuild` script that writes `out/_redirects` directly in the Cloudflare Pages format.

Create `scripts/generate-redirects.ts`:

```ts
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const rules = [
  '/work-with-us /sponsor 301',
  '/work-with-us/ /sponsor 301',
  '/blog https://www.linkedin.com/company/the-art-of-network-engineering/posts/ 302',
  '/blog/* https://www.linkedin.com/company/the-art-of-network-engineering/posts/ 302',
];

const out = resolve(process.cwd(), 'out/_redirects');
if (!existsSync(dirname(out))) {
  console.error('out/ directory does not exist — run `next build` first');
  process.exit(1);
}
writeFileSync(out, rules.join('\n') + '\n');
console.log(`Wrote ${rules.length} redirect rules to ${out}`);
```

Add to `package.json` scripts:

```json
"postbuild": "tsx scripts/generate-redirects.ts"
```

Remove the `redirects()` block from `next.config.mjs` since it's not effective in static export.

Re-run `npm run build` and verify `out/_redirects` exists with the expected contents.

- [ ] **Step 3: Inspect `out/` directory**

```bash
ls /home/aone/projects/aone-web/out/
find /home/aone/projects/aone-web/out/ -name "*.html" | head -20
```

Expected: HTML files for `/`, `/about/`, `/sponsor/`, `/press/`, `/episodes/`, `/newsletter/`, and one HTML per episode under `out/episodes/`.

- [ ] **Step 4: Serve `out/` locally to verify the static build**

```bash
cd /home/aone/projects/aone-web/out && python3 -m http.server 3001 --bind 0.0.0.0
```

In a browser, open `http://192.168.1.200:3001/`. Click through every page type and at least 2-3 episode pages. Check redirect: `http://192.168.1.200:3001/work-with-us` (the python server won't honor `_redirects`, so test this on Cloudflare Pages later — for now just verify the file exists).

Stop the http.server (Ctrl-C).

- [ ] **Step 5: Lighthouse check**

Run from anywhere (or use Chrome DevTools Lighthouse panel against `http://192.168.1.200:3001/`):

```bash
npx lighthouse http://192.168.1.200:3001/ --only-categories=performance,accessibility,seo --output=json --quiet --chrome-flags="--headless" > /tmp/lh.json 2>&1 || true
jq '.categories | {perf: .performance.score, a11y: .accessibility.score, seo: .seo.score}' /tmp/lh.json
```

Expected: performance ≥ 0.9, accessibility ≥ 0.9, seo ≥ 0.9. If any fail, note the audit and fix obvious wins (missing alt text, color contrast on `--text-muted`, render-blocking resources).

- [ ] **Step 6: Run unit tests one final time**

```bash
cd /home/aone/projects/aone-web && npm test
```

Expected: all pass.

- [ ] **Step 7: Final commit**

```bash
git add -A
git status  # confirm only intended files
git commit -m "chore: production build verification + cleanup"
```

- [ ] **Step 8: Handoff to Andy for review**

Site is ready at `http://192.168.1.200:3000` (run `npm run dev`) for Andy's walkthrough. Once Andy approves, Phase C from the spec (push to GitHub + Cloudflare Pages + domain swap) is operational work he executes.

Tell Andy:
1. What URLs to check (every page + a few episodes + `/work-with-us` redirect)
2. What he still owes the project before Phase C:
   - Create a Beehiiv account (free) and paste the publication ID into `components/NewsletterForm.tsx`
   - Enable Cloudflare Web Analytics for the zone and paste the token into `app/layout.tsx`
   - Final pass on the About page bio prose
   - Create a GitHub repo and push (Phase C step 1)

---

## Self-review notes

**Spec coverage:**
- ✅ Goal (replace WP site): Tasks 1–15
- ✅ Five page types + press: Tasks 7, 8, 9, 10, 11, 13
- ✅ Header/footer: Task 5
- ✅ Next.js + static export: Tasks 1, 15
- ✅ Tailwind brand tokens: Task 2
- ✅ Buzzsprout RSS at build time: Tasks 3, 4
- ✅ Brand visual direction: Tasks 2, 6, 7
- ✅ Local preview on `aoneproduction:3000`: Tasks 5, 7, 8, 9, 10, 11
- ✅ Redirect for `/work-with-us`: Task 14
- ✅ Newsletter signup (Beehiiv placeholder): Task 12
- ✅ Analytics (Cloudflare): Task 14
- ✅ Custom 404: Task 13
- ✅ Lighthouse ≥ 90: Task 15

Not in this plan (deliberately deferred):
- DNS work (Phase A — done; Phase C — operational)
- GitHub repo creation and Cloudflare Pages deploy (Phase C operational)
- WordPress cancellation (Phase D operational)
- Blog migration (cut per Andy's answer)
- Hosts page beyond a paragraph (single-host; spec answered)
- Beehiiv publication creation (operational, Andy owns the account)

**Outstanding placeholder constants the plan acknowledges:**
- `BEEHIIV_PUB_ID` in `components/NewsletterForm.tsx` — Andy provides during review
- `CF_ANALYTICS_TOKEN` in `app/layout.tsx` — Andy provides after enabling CW Analytics

Both render gracefully as null/disabled until set. No broken pages.
