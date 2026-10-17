// Where each sponsor logo on /sponsor sends visitors. Kept OUT of components/sponsorLogos.ts
// on purpose: that file is generated and the AONE iOS app reads it by regex, so its shape is a
// public contract. Plain follow links (no rel="sponsored"): sponsors get real backlink credit.
// Spec: docs/specs/2026-10-13-sponsor-logo-links-design.md
export const SPONSOR_LINKS: Record<string, string> = {
  'Juniper Apstra': 'https://www.juniper.net/us/en/products/network-automation/apstra-data-center-director.html',
  'Itential': 'https://www.itential.com/',
  'Forward Networks': 'https://www.forwardnetworks.com/',
  'Unimus': 'https://unimus.net/',
  'Transit AI': 'https://transit.ai/',
  'Kentik': 'https://www.kentik.com/',
  'NetAlly': 'https://www.netally.com/',
  'PathSolutions': 'https://www.pathsolutions.com/',
  'Meter': 'https://www.meter.com/',
  'Opengear': 'https://opengear.com/',
  'Celona': 'https://celona.io/',
  'Netris': 'https://www.netris.ai/',
  'Cisco Press': 'https://www.ciscopress.com/',
  'Boson': 'https://www.boson.com/',
  'USNUA': 'https://www.usnua.com/',
  'NAF': 'https://networkautomation.forum/',
};

// Sponsors shown without a link, on purpose. Every roster name must be linked or listed here,
// so a new sponsor cannot reach the wall without someone deciding.
// Augtera: augtera.com now redirects to nvidia.com; held for a decision from Kym/Andy.
export const UNLINKED: string[] = ['Augtera'];

export const sponsorHref = (name: string): string | undefined => SPONSOR_LINKS[name];
