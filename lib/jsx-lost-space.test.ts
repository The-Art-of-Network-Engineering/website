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

/**
 * Measured on the live site 2026-09-04: a seven-character figure such as 939,952 renders
 * about 5.2px of glyph per 1px of font-size. At text-5xl (48px) that is ~250px, sitting
 * in a 255px cell in the four-column layout, so it overflowed and ate the gap. At 1100px
 * the visual gap between two numbers was 10px and they read as one number.
 *
 * The constraint, encoded so a future type bump cannot silently reintroduce it.
 */
describe('stat numbers fit inside their column', () => {
  it('never uses a font size that overflows the narrowest four-column cell', () => {
    const src = readFileSync(join(__dirname, '..', 'components/StatsBand.tsx'), 'utf8')
    const GLYPH_PX_PER_FONT_PX = 5.2      // seven characters, measured
    const NARROWEST_CELL_PX = 255         // four columns at the xl breakpoint
    const SIZES: Record<string, number> = {
      'text-2xl': 24, 'text-3xl': 30, 'text-4xl': 36, 'text-5xl': 48, 'text-6xl': 60,
    }
    const used = [...src.matchAll(/text-(\d)xl/g)].map((m) => `text-${m[1]}xl`)
    const tooBig = [...new Set(used)].filter(
      (c) => SIZES[c] * GLYPH_PX_PER_FONT_PX > NARROWEST_CELL_PX,
    )
    expect(
      tooBig,
      `these overflow a ${NARROWEST_CELL_PX}px column with a 7-character number`,
    ).toEqual([])
  })

  it('shows four across only where the cells are wide enough', () => {
    const src = readFileSync(join(__dirname, '..', 'components/StatsBand.tsx'), 'utf8')
    expect(src, 'four columns from md (768px) gives 174px cells').not.toContain('md:grid-cols-4')
    expect(src).toContain('xl:grid-cols-4')
  })
})
