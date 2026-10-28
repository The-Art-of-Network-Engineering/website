// Per-logo size nudges, applied on top of the equal-weight rule in sponsorLogoSize.ts.
// Every entry MUST carry a reason (a test enforces it). Empty on purpose: the measured aspect
// ratio is enough for all 17 logos today. Add an entry only after looking at the preview.
export type SizeOverride = { scale: number; reason: string };
export const SPONSOR_SIZE_OVERRIDES: Record<string, SizeOverride> = {};
