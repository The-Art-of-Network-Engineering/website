/**
 * Remove links in an episode's show notes that point at that same episode's page.
 *
 * The episode-links backfill (2026-08-18) appended this to every Buzzsprout show note:
 *
 *   Full show notes, transcript and links: https://artofnetworkengineering.com/episodes/<slug>
 *
 * In Apple and Spotify that line is the only route a listener has back to the site, so it
 * earns its place in the feed and stays there. The site renders the same show notes verbatim,
 * where the link points at the page you are already reading.
 *
 * Stripped at render time only. The feed is untouched.
 */
const SITE = 'artofnetworkengineering.com';

export function stripSelfLinks(html: string, slug: string): string {
  if (!html || !slug) return html;
  const selfPath = `/episodes/${slug}`;
  const escaped = selfPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // 1. a whole paragraph whose only purpose is the self link
  let out = html.replace(
    new RegExp(`<p>(?:(?!</p>).)*${escaped}(?:(?!</p>).)*</p>`, 'gis'),
    '',
  );

  // 2. an anchor to this episode left inline elsewhere: unwrap, keep the text
  out = out.replace(
    new RegExp(`<a[^>]*href=["']https?://(?:www\\.)?${SITE}${escaped}/?["'][^>]*>(.*?)</a>`, 'gis'),
    '$1',
  );

  // 3. a bare self URL with no anchor
  out = out.replace(
    new RegExp(`https?://(?:www\\.)?${SITE}${escaped}/?`, 'gi'),
    '',
  );

  return out;
}
