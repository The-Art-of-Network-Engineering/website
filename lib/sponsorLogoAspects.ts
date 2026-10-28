// Measured aspect ratio (width / height of the visible ink) for each logo in public/sponsors.
// Kept OUT of components/sponsorLogos.ts on purpose: that file is generated and the iOS app reads
// it by regex. Measured with PIL on the alpha channel (pixels with alpha > 16), 2026-10-28:
//   Image.open(f).convert('RGBA').split()[3].point(lambda v: 255 if v > 16 else 0).getbbox()
// lib/sponsorLogoSize.test.ts re-checks every entry against the PNG header, so replacing a logo
// with a different shape fails the build until this table is refreshed.
export const SPONSOR_ASPECTS: Record<string, number> = {
  'Juniper Apstra': 900 / 180,
  'Itential': 5300 / 1585,
  'Forward Networks': 1596 / 318,
  'Unimus': 584 / 163,
  'Transit AI': 2509 / 426,
  'Kentik': 871 / 183,
  'NetAlly': 857 / 180,
  'PathSolutions': 298 / 47,
  'Augtera': 499 / 103,
  'Meter': 2048 / 617,
  'Opengear': 414 / 114,
  'Celona': 667 / 162,
  'Netris': 498 / 244,
  'Cisco Press': 254 / 173,
  'Boson': 1200 / 580,
  'USNUA': 984 / 347,
  'NAF': 1200 / 259,
};
