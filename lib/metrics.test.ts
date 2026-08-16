import { describe, it, expect } from 'vitest';
import raw from '@/data/metrics.json';
import { metrics } from './metrics';

// Anti-drift guard (spec: audience-data-everywhere, "No-drift enforcement"). The social
// follower counts on the site must match the canonical figures the media-kit deck uses.
// If someone edits data/metrics.json and drifts a number, this fails loudly.
describe('canonical social follower numbers', () => {
  it('data/metrics.json holds the canonical figures', () => {
    expect(raw.manual.x_followers).toBe(19800);
    expect(raw.manual.linkedin_followers).toBe(8690);
    expect(raw.manual.tiktok_followers).toBe(11500);
    expect(raw.manual.instagram_followers).toBe(6859);
    expect(raw.manual.discord_members).toBe(3547);
  });

  it('the metrics accessor exposes them formatted', () => {
    expect(metrics.xFollowers).toBe('19,800');
    expect(metrics.linkedinFollowers).toBe('8,690');
    expect(metrics.tiktokFollowers).toBe('11,500');
    expect(metrics.instagramFollowers).toBe('6,859');
    expect(metrics.discordMembers).toBe('3,547');
  });
});
