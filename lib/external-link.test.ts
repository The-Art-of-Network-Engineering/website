import { describe, it, expect } from 'vitest';
import { isExternalHref } from './external-link';

describe('isExternalHref', () => {
  it('flags a plain external link', () => {
    expect(isExternalHref('https://www.ibm.com/think/topics/ai-agent-types')).toBe(true);
    expect(isExternalHref('https://www.anthropic.com/engineering/building-effective-agents')).toBe(true);
  });

  it('does not flag a relative link on the site', () => {
    expect(isExternalHref('/guests/remington-loose')).toBe(false);
    expect(isExternalHref('/about#host')).toBe(false);
  });

  it('does not flag a full AONE url, with or without www', () => {
    expect(isExternalHref('https://artofnetworkengineering.com/about#host')).toBe(false);
    expect(isExternalHref('https://www.artofnetworkengineering.com/episodes/foo')).toBe(false);
  });

  it('does not flag mailto or tel links', () => {
    expect(isExternalHref('mailto:andy@artofnetworkengineering.com')).toBe(false);
    expect(isExternalHref('tel:+15555555555')).toBe(false);
  });

  it('is false for nothing to check', () => {
    expect(isExternalHref(undefined)).toBe(false);
    expect(isExternalHref(null)).toBe(false);
    expect(isExternalHref('')).toBe(false);
  });

  it('flags a lookalike host, not just a lookalike substring', () => {
    // A real failure mode for a naive "includes the site name" check.
    expect(isExternalHref('https://artofnetworkengineering.com.evil.example/')).toBe(true);
    expect(isExternalHref('https://notartofnetworkengineering.com/')).toBe(true);
  });
});
