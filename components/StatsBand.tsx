'use client';

// Front-and-center audience proof on the homepage. Numbers come from the single source of
// truth (data/metrics.json), refreshed daily from YouTube + Buzzsprout (auto) plus hand-
// maintained social counts (manual). Numbers count up when the band scrolls into view: real
// momentum shown honestly, no fake per-second ticking.
import { useEffect, useRef, useState } from 'react';

import raw from '@/data/metrics.json';
import { SectionLabel } from '@/components/SectionLabel';

// Reach: views, downloads, episodes. Non-overlapping (long-form excludes Shorts).
const REACH: { label: string; value: number; caption?: string }[] = [
  { label: 'Lifetime downloads', value: raw.auto.lifetime_downloads },
  // Long-form only: the channel viewCount INCLUDES Shorts, so subtract Shorts to avoid
  // double-counting them against the Short-form tile.
  { label: 'Long-form views', value: raw.auto.youtube_views - raw.auto.youtube_shorts_views },
  // Short-form spans both platforms: YouTube Shorts + TikTok (TikTok has no free API, so it's
  // hand-maintained in metrics.json).
  {
    label: 'Short-form views',
    value: raw.auto.youtube_shorts_views + raw.manual.tiktok_post_views_365d,
    caption: 'YouTube + TikTok',
  },
  { label: 'Episodes published', value: raw.auto.episodes },
];

// Following: per-channel audience. YouTube is auto-pulled; the rest are hand-maintained.
const FOLLOWERS: { label: string; value: number }[] = [
  { label: 'YouTube subscribers', value: raw.auto.youtube_subscribers },
  { label: 'TikTok followers', value: raw.manual.tiktok_followers },
  { label: 'X followers', value: raw.manual.x_followers },
  { label: 'LinkedIn followers', value: raw.manual.linkedin_followers },
  { label: 'Discord members', value: raw.manual.discord_members },
];

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // 0 -> 1 count-up progress

  useEffect(() => {
    const el = ref.current;
    let raf = 0;
    const animate = () => {
      let start: number | null = null;
      const ms = 1400;
      const tick = (t: number) => {
        if (start === null) start = t;
        const prog = Math.min(1, (t - start) / ms);
        setP(1 - Math.pow(1 - prog, 3)); // ease-out cubic
        if (prog < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (!el || typeof IntersectionObserver === 'undefined') {
      animate();
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

  return (
    <section ref={ref} className="py-10 md:py-12 border-t border-border">
      <SectionLabel>The reach</SectionLabel>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
        {REACH.map((s) => (
          <div key={s.label}>
            <div className="font-display text-3xl md:text-5xl text-accent-green tabular-nums leading-none">
              {fmt(s.value * p)}
            </div>
            <div className="mt-2 text-sm text-text">{s.label}</div>
            {s.caption && <div className="text-xs text-text-muted">{s.caption}</div>}
          </div>
        ))}
      </div>

      <div className="mt-10">
        <SectionLabel>Following</SectionLabel>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8">
        {FOLLOWERS.map((s) => (
          <div key={s.label}>
            <div className="font-display text-2xl md:text-4xl text-accent-blue tabular-nums leading-none">
              {fmt(s.value * p)}
            </div>
            <div className="mt-2 text-sm text-text">{s.label}</div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-text-muted">
        In our 7th year. Updated daily from YouTube and Buzzsprout.
      </p>
    </section>
  );
}
