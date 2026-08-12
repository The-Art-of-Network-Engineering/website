import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

// Guards the bug that broke the subnetting game: the global clickjacking headers
// (X-Frame-Options: DENY / frame-ancestors 'none') forbid ALL framing, including
// the same-origin <iframe> the /subnetting page uses to embed the game. Because
// Cloudflare Pages _headers APPENDS per-path rules (it does not override a
// same-named header), the framing policy has to be set once globally to
// SAMEORIGIN / frame-ancestors 'self': permit our own origin to frame us, still
// block every cross-origin framer.
const headers = readFileSync('public/_headers', 'utf-8');

function blockFor(pathGlob: string): string {
  const lines = headers.split('\n');
  const start = lines.findIndex((l) => l.trim() === pathGlob);
  if (start === -1) return '';
  const out: string[] = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (/^\S/.test(lines[i]) && lines[i].trim() !== '') break; // next path rule
    if (lines[i].trim().startsWith('#')) continue; // ignore explanatory comments
    out.push(lines[i]);
  }
  return out.join('\n');
}

describe('_headers framing policy', () => {
  const global = blockFor('/*');

  it('allows same-origin framing so the embedded subnetting game loads', () => {
    expect(global).toMatch(/X-Frame-Options:\s*SAMEORIGIN/);
    expect(global).toMatch(/frame-ancestors 'self'/);
  });

  it('does NOT use a policy that blocks all framing (DENY / none)', () => {
    expect(global).not.toMatch(/X-Frame-Options:\s*DENY/);
    expect(global).not.toMatch(/frame-ancestors 'none'/);
  });

  it('still blocks cross-origin framers (no wildcard frame-ancestors)', () => {
    expect(global).not.toMatch(/frame-ancestors[^;]*\*/);
  });

  it('does not add a stacked per-path framing rule (Pages appends, so it would not override)', () => {
    // A /subnetting-game/* rule setting X-Frame-Options again would ship a second,
    // conflicting header. The policy must live only in the global /* block.
    expect(blockFor('/subnetting-game/*')).toBe('');
  });
});
