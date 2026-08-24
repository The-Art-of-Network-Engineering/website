import { describe, it, expect } from 'vitest';
import { stripSelfLinks } from './self-links';

/**
 * The episode-links backfill (2026-08-18) appended to every Buzzsprout show note:
 *
 *   Full show notes, transcript and links: https://artofnetworkengineering.com/episodes/<slug>
 *
 * That is correct and valuable in Apple and Spotify, where it is the only route back to the
 * site. But the site renders the same show notes verbatim, so on the episode page the link
 * points at the page you are already reading. Andy found it as a loop.
 *
 * Strip it at render time only. The feed keeps it.
 */
describe('stripSelfLinks', () => {
  const slug = 'ep-122-what-is-ot-vs-it';
  const self = `https://artofnetworkengineering.com/episodes/${slug}`;

  it('removes the whole "full show notes" line when it links to this episode', () => {
    const html = `<p>Real notes.</p><p>Full show notes, transcript and links: <a href="${self}">${self}</a></p>`;
    const out = stripSelfLinks(html, slug);
    expect(out).not.toContain(self);
    expect(out).not.toContain('Full show notes');
    expect(out).toContain('Real notes.');
  });

  it('keeps links to OTHER episodes', () => {
    const other = 'https://artofnetworkengineering.com/episodes/some-other-episode';
    const html = `<p>See also <a href="${other}">that one</a></p>`;
    expect(stripSelfLinks(html, slug)).toContain(other);
  });

  it('keeps external links', () => {
    const html = '<p><a href="https://www.traceroutellc.com/">Traceroute LLC</a></p>';
    expect(stripSelfLinks(html, slug)).toContain('traceroutellc.com');
  });

  it('keeps the site homepage link', () => {
    // "For everything AONE: https://artofnetworkengineering.com/" is not a self-link.
    const html = '<p>For everything AONE: <a href="https://artofnetworkengineering.com/">home</a></p>';
    expect(stripSelfLinks(html, slug)).toContain('artofnetworkengineering.com/');
  });

  it('handles single quotes, as the real feed uses them', () => {
    const html = `<p>Full show notes, transcript and links: <a href='${self}'>${self}</a></p>`;
    expect(stripSelfLinks(html, slug)).not.toContain(self);
  });

  it('tolerates a trailing slash on the self URL', () => {
    const html = `<p>Full show notes: <a href="${self}/">link</a></p>`;
    expect(stripSelfLinks(html, slug)).not.toContain(`${slug}/`);
  });

  it('leaves show notes with no self-link untouched', () => {
    const html = '<p>Just notes.</p>';
    expect(stripSelfLinks(html, slug)).toBe(html);
  });

  it('does not blow up on empty input', () => {
    expect(stripSelfLinks('', slug)).toBe('');
  });

  it('removes a bare self URL even without an anchor tag', () => {
    const html = `<p>Full show notes, transcript and links: ${self}</p>`;
    const out = stripSelfLinks(html, slug);
    expect(out).not.toContain(self);
  });
});
