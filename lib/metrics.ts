// Single source of truth for AONE audience numbers.
// Values come from data/metrics.json, which the weekly metrics agent
// refreshes from the YouTube and Buzzsprout APIs (auto fields) and from
// hand-maintained social counts (manual fields). Update a number in one
// place (metrics.json), and every page that imports from here updates.
import raw from '@/data/metrics.json';
// Reviewed reach numbers (native windows + YoY + lifetime/episode). Second
// canonical source alongside metrics.json; both feed this one accessor so no
// page ever hand-types a metric. See scripts/podcast_stats.py for how it's built.
import reach from '@/data/media_kit_reach.json';

const nf = (n: number) => n.toLocaleString('en-US'); // 9870 -> "9,870"
const kFormat = (n: number) => `${Math.floor(n / 1000)}K`; // 920555 -> "920K"
const window = (name: string) => reach.windows.find((w) => w.window === name);

export const metrics = {
  // auto (API-pulled)
  youtubeSubscribers: nf(raw.auto.youtube_subscribers),
  youtubeViews: nf(raw.auto.youtube_views),
  episodes: raw.auto.episodes,
  lifetimeDownloads: nf(raw.auto.lifetime_downloads),
  lifetimeDownloadsShort: kFormat(raw.auto.lifetime_downloads),
  // manual (hand-maintained in metrics.json)
  xFollowers: nf(raw.manual.x_followers),
  linkedinFollowers: nf(raw.manual.linkedin_followers),
  discordMembers: nf(raw.manual.discord_members),
  updatedAt: raw.updated_at,
  // reviewed reach (media_kit_reach.json) — the canonical per-episode + catalog numbers
  perEpisode90d: nf(window('First 90 days')?.downloads ?? 0),
  perEpisodeLifetime: nf(reach.lifetime_per_episode),
  catalogMonthly: nf(window('Catalog / month')?.downloads ?? 0),
};
