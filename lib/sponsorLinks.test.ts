import { describe, it, expect } from 'vitest';
import { SPONSOR_ROSTER } from './sponsorLogos.gen';
import { SPONSOR_LINKS, UNLINKED, sponsorHref } from './sponsorLinks';

describe('sponsor logo links', () => {
  it('only links sponsors that are on the wall (no orphans after a rename)', () => {
    for (const name of Object.keys(SPONSOR_LINKS)) {
      expect(SPONSOR_ROSTER, `${name} is linked but not in SPONSOR_ROSTER`).toContain(name);
    }
  });

  it('every sponsor on the wall is either linked or deliberately unlinked', () => {
    for (const name of SPONSOR_ROSTER) {
      const decided = name in SPONSOR_LINKS || UNLINKED.includes(name);
      expect(decided, `${name} has no link and is not in UNLINKED`).toBe(true);
    }
  });

  it('a sponsor is never both linked and unlinked', () => {
    for (const name of UNLINKED) expect(SPONSOR_LINKS).not.toHaveProperty(name);
  });

  it('every link is a clean https URL with no tracking query', () => {
    for (const [name, href] of Object.entries(SPONSOR_LINKS)) {
      const u = new URL(href);
      expect(u.protocol, name).toBe('https:');
      expect(u.search, `${name} carries a query string`).toBe('');
    }
  });

  it('sponsorHref returns the link, or undefined for an unlinked sponsor', () => {
    expect(sponsorHref('Kentik')).toBe('https://www.kentik.com/');
    expect(sponsorHref('Augtera')).toBeUndefined();
    expect(sponsorHref('Not A Sponsor')).toBeUndefined();
  });
});
