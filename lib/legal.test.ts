import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { privacy, support, SUPPORT_EMAIL } from './legal';

// These pages are App Store submission blockers, not decoration. Apple requires a privacy
// policy URL for every iOS app (App Store Connect: "Required for iOS and macOS apps") and
// contact information reachable from the Support URL (App Review Guideline 1.5). A refactor
// that quietly drops either one blocks a release, so the disclosures are asserted here.
// Spec: docs/specs/2026-09-05-app-legal-pages-design.md

const root = (p: string) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const bodyText = (sections: { heading: string; paragraphs: string[] }[]) =>
  sections.flatMap((s) => [s.heading, ...s.paragraphs]).join('\n').toLowerCase();

describe('legal routes exist', () => {
  it('has a /privacy page, the URL App Store Connect requires', () => {
    expect(existsSync(root('app/privacy/page.tsx'))).toBe(true);
  });

  it('has a /support page, the URL App Review Guideline 1.5 requires', () => {
    expect(existsSync(root('app/support/page.tsx'))).toBe(true);
  });
});

describe('privacy policy discloses what the app actually does', () => {
  const text = bodyText(privacy.sections);

  it('discloses the APNs device token, the only user datum that reaches a server', () => {
    expect(text).toContain('device token');
  });

  it('states the token is only collected after the person opts in', () => {
    expect(text).toMatch(/opt in|opt-in|permission|allow notifications/);
  });

  it('names every third-party service the app contacts', () => {
    // Verified from AONE_Mobile source: GitHub raw fetches, Buzzsprout RSS, YouTube Data API,
    // and Apple's push service. A reader has to know requests leave the device.
    for (const service of ['github', 'buzzsprout', 'youtube', 'apple']) {
      expect(text, `privacy policy never mentions ${service}`).toContain(service);
    }
  });

  it('states plainly that there is no analytics, tracking or sale of data', () => {
    expect(text).toMatch(/no analytics|does not use analytics|no tracking/);
    expect(text).toMatch(/never sold|do not sell|not sold/);
  });

  it('gives a deletion and revocation path with a reachable contact', () => {
    expect(text).toMatch(/delete|deletion/);
    expect(text).toContain(SUPPORT_EMAIL.toLowerCase());
  });

  it('carries a last-updated date so the reader can judge its currency', () => {
    expect(privacy.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('support page gives a real way to reach a human', () => {
  const text = bodyText(support.sections);

  it('publishes a contact address', () => {
    expect(text).toContain(SUPPORT_EMAIL.toLowerCase());
  });

  it('sets an expectation for a reply, so the contact is not a black hole', () => {
    expect(text).toMatch(/within|reply|respond/);
  });

  it('uses an artofnetworkengineering.com address, not a placeholder', () => {
    expect(SUPPORT_EMAIL).toMatch(/@artofnetworkengineering\.com$/);
    expect(SUPPORT_EMAIL).not.toMatch(/example|test|placeholder|your-?email/i);
  });
});
