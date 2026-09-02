/**
 * The AONE iPhone + Apple Watch app reads this repo's files directly from `main`
 * (raw.githubusercontent.com), with no API in between. That makes their shape a public
 * contract, and it is a contract nothing else in this repo protects: rename a field and
 * typecheck passes, the other tests pass, `next build` succeeds, the site renders
 * perfectly, and the app breaks on a stranger's phone with no signal to us at all.
 *
 * Spec: /data/aone/docs/specs/2026-09-02-mobile-app-data-contract-design.md
 * App:  github.com/automateyournetwork/AONE_Mobile (AONECore/Sources/AONECore/Feeds)
 *
 * These assertions are derived from the app's Swift decoders, not from prose. Swift
 * fails the ENTIRE decode when a non-optional key is missing, so a field listed here is
 * one whose rename is fatal rather than cosmetic.
 *
 * Guards shape, never values. Downloads going up is not this test's business.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(__dirname, '..')
const CONSUMER =
  'The AONE mobile app (github.com/automateyournetwork/AONE_Mobile) reads this file ' +
  'directly and will fail to decode. Coordinate with John Capobianco before changing it.'

/**
 * Swift decodes with `.iso8601`, which is strict. JavaScript will happily parse
 * "2026-08-26 10:00:00" and the site will render it, while the app rejects the whole
 * file. So presence is not enough; the format itself is part of the contract.
 */
const STRICT_ISO8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/

function readJSON(rel: string) {
  return JSON.parse(readFileSync(join(ROOT, rel), 'utf8'))
}

describe('data/episodes.json is still readable by the mobile app', () => {
  const file = readJSON('data/episodes.json')

  it('is an object with an episodes array', () => {
    expect(Array.isArray(file.episodes), CONSUMER).toBe(true)
    expect(file.episodes.length, 'an empty feed would empty the app').toBeGreaterThan(0)
  })

  it('every episode carries the fields the app cannot decode without', () => {
    for (const ep of file.episodes) {
      const where = `episode ${ep.slug ?? ep.id ?? '<unidentifiable>'}: ${CONSUMER}`
      expect(typeof ep.id, where).toBe('string')
      expect(typeof ep.slug, where).toBe('string')
      expect(typeof ep.title, where).toBe('string')
      expect(typeof ep.durationSeconds, where).toBe('number')
      expect(ep.slug, where).not.toHaveLength(0)
    }
  })

  it('every publishedAt is strict ISO8601, not merely parseable by JavaScript', () => {
    for (const ep of file.episodes) {
      expect(ep.publishedAt, `episode ${ep.slug}: ${CONSUMER}`).toMatch(STRICT_ISO8601)
    }
  })

  it('every episode has a guests array, even when empty', () => {
    // Non-optional in the app's decoder. Dropping the key entirely on guest-less
    // episodes would fail the whole file, not just that episode.
    for (const ep of file.episodes) {
      expect(Array.isArray(ep.guests), `episode ${ep.slug}: ${CONSUMER}`).toBe(true)
      for (const g of ep.guests) {
        expect(typeof g.name, `guest in ${ep.slug}: ${CONSUMER}`).toBe('string')
      }
    }
  })

  it('a youtube block, where present, carries videoId and thumbnailUrl', () => {
    // The block itself is optional. Its innards are not.
    for (const ep of file.episodes) {
      if (!ep.youtube) continue
      const where = `episode ${ep.slug}: ${CONSUMER}`
      expect(typeof ep.youtube.videoId, where).toBe('string')
      expect(typeof ep.youtube.thumbnailUrl, where).toBe('string')
    }
  })
})

describe('data/metrics.json is still readable by the mobile app', () => {
  const m = readJSON('data/metrics.json')

  it('carries the four numbers the Welcome screen decodes', () => {
    expect(typeof m.auto?.youtube_subscribers, CONSUMER).toBe('number')
    expect(typeof m.auto?.episodes, CONSUMER).toBe('number')
    expect(typeof m.auto?.lifetime_downloads, CONSUMER).toBe('number')
    expect(typeof m.manual?.discord_members, CONSUMER).toBe('number')
  })

  it('has a strict ISO8601 updated_at', () => {
    expect(m.updated_at, CONSUMER).toMatch(STRICT_ISO8601)
  })
})

describe('components/sponsorLogos.ts is still readable by the mobile app', () => {
  // Read by regex, not parsed, because it is generated and flat. Reformatting it into a
  // different shape breaks the app's sponsor wall while leaving the site untouched.
  const src = readFileSync(join(ROOT, 'components/sponsorLogos.ts'), 'utf8')

  it('still contains { name, src } object literals the app can extract', () => {
    const matches = src.match(/"name"\s*:\s*"[^"]+"[\s\S]{0,80}?"src"\s*:\s*"[^"]+"/g) ?? []
    expect(matches.length, CONSUMER).toBeGreaterThan(0)
  })
})

describe('content/posts is still where the app looks for the blog', () => {
  it('exists and holds markdown posts', () => {
    const dir = join(ROOT, 'content/posts')
    expect(existsSync(dir), CONSUMER).toBe(true)
    const posts = readdirSync(dir).filter((f) => f.endsWith('.md'))
    expect(posts.length, CONSUMER).toBeGreaterThan(0)
  })
})
