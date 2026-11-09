/**
 * Decide whether a link inside a blog post's markdown body points off the AONE site.
 *
 * Andy, 2026-11-06: the "Bulldozer Analogy" post's two reference links (IBM, Anthropic)
 * were opening in the same tab, pulling the reader off artofnetworkengineering.com
 * entirely. The markdown renderer (react-markdown) doesn't add target="_blank" on its
 * own, and markdown's `[text](url)` syntax has no attribute for it. This is the rule
 * that decides which links need it: anything NOT on this site. An internal link --
 * `/guests/remington-loose`, or the full `https://artofnetworkengineering.com/about#host`
 * -- keeps the reader on the site already, so it opens normally, same tab.
 */
const SITE_HOSTS = new Set(['artofnetworkengineering.com', 'www.artofnetworkengineering.com']);

export function isExternalHref(href: string | undefined | null): boolean {
  if (!href) return false;
  let url: URL;
  try {
    // Relative hrefs ("/guests/...", "#host") resolve against the site itself, so they
    // correctly come out as internal below -- they're not being guessed at, they just
    // need a base to parse against.
    url = new URL(href, 'https://artofnetworkengineering.com');
  } catch {
    return false;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return false; // mailto:, tel:, etc. -- unaffected
  return !SITE_HOSTS.has(url.hostname);
}
