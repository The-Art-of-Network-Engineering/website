'use client';

// Front-and-center audience proof on the homepage. Numbers come from the single source of
// truth (data/metrics.json), refreshed daily from YouTube + Buzzsprout. Numbers count up when
// the band scrolls into view — real momentum shown honestly, no fake per-second ticking.
import { useEffect, useRef, useState } from 'react';

import raw from '@/data/metrics.json';
import { SectionLabel } from '@/components/SectionLabel';

const STATS: { label: string; value: number; caption?: string }[] = [
  { label: 'Lifetime downloads', value: raw.auto.lifetime_downloads, caption: 'toward 1,000,000' },
  { label: 'YouTube subscribers', value: raw.auto.youtube_subscribers },
  { label: 'YouTube views', value: raw.auto.youtube_views },
  { label: 'Short-form views', value: raw.auto.youtube_shorts_views },
  { label: 'Episodes published', value: raw.auto.episodes },
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
      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="font-display text-3xl md:text-5xl text-accent-green tabular-nums leading-none">
              {fmt(s.value * p)}
            </div>
            <div className="mt-2 text-sm text-text">{s.label}</div>
            {s.caption && <div className="text-xs text-text-muted">{s.caption}</div>}
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-text-muted">
        In our 7th year. Updated daily from YouTube and Buzzsprout.
      </p>
    </section>
  );
}
