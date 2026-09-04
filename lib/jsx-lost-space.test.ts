import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * JSX removes the newline between a line of text and a following {expression}, so
 *
 *   ... monthly catalog impressions across
 *   {metrics.episodesRounded} shows.
 *
 * renders as "impressions across200+ shows." on the live homepage, in the section we
 * point sponsors at. The fix is an explicit {' '} at the end of the text line.
 *
 * This catches the class rather than the instance. It looks only at prose lines (three
 * or more lowercase words, ending mid-sentence) so object literals and array entries,
 * which legitimately sit next to a brace, are not flagged.
 */
function tsxFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next' || entry.startsWith('.')) continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) tsxFiles(full, found)
    else if (entry.endsWith('.tsx')) found.push(full)
  }
  return found
}

describe('JSX does not silently drop a space before an expression', () => {
  it('every prose line followed by {expr} keeps its space', () => {
    const offenders: string[] = []
    for (const dir of ['app', 'components']) {
      for (const file of tsxFiles(join(__dirname, '..', dir))) {
        const lines = readFileSync(file, 'utf8').split('\n')
        lines.forEach((raw, i) => {
          const cur = raw.trimEnd()
          const next = (lines[i + 1] ?? '').trimStart()
          if (!next.startsWith('{')) return
          // an explicit space expression is exactly the correct fix, not a violation
          if (/^\{\s*['"] ['"]\s*\}/.test(next)) return
          if (!/[A-Za-z]$/.test(cur)) return              // ended on a comma or brace: code
          if ((cur.match(/\b[a-z]{2,}\b/g) ?? []).length < 3) return
          if (/(=>|=|\bconst\b|\blet\b|\bimport\b|\/\/|\*)\s*$/.test(cur)) return
          offenders.push(`${file.split('/').slice(-2).join('/')}:${i + 1}  ${cur.trim().slice(-50)}`)
        })
      }
    }
    expect(
      offenders,
      "these render without a space before the value. End the text line with {' '}",
    ).toEqual([])
  })
})
