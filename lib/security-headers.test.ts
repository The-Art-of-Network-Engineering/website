import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

// Guards the exact bug that broke the subnetting game: the global clickjacking
// headers (X-Frame-Options: DENY / frame-ancestors 'none') forbid ALL framing,
// including the same-origin <iframe> the /subnetting page uses to embed the game.
// The /subnetting-game/* rule must relax framing to same-origin, and the global
// default must stay strict.
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
  it('keeps the global default strict (DENY / frame-ancestors none)', () => {
    const global = blockFor('/*');
    expect(global).toMatch(/X-Frame-Options:\s*DENY/);
    expect(global).toMatch(/frame-ancestors 'none'/);
  });

  it('allows the subnetting game to be framed by our own origin', () => {
    const game = blockFor('/subnetting-game/*');
    expect(game).not.toBe('');
    expect(game).toMatch(/X-Frame-Options:\s*SAMEORIGIN/);
    expect(game).toMatch(/frame-ancestors 'self'/);
    // must NOT re-forbid framing for this path
    expect(game).not.toMatch(/frame-ancestors 'none'/);
    expect(game).not.toMatch(/X-Frame-Options:\s*DENY/);
  });
});
