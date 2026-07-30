import { describe, it, expect } from 'vitest';
import { filterCatalog, searchIndex } from './catalog';

describe('searchIndex', () => {
  it('indexes every catalog link with a category label', () => {
    expect(searchIndex.length).toBeGreaterThan(100);
    for (const item of searchIndex) {
      expect(item.name).toBeTruthy();
      expect(item.href).toMatch(/^https?:|^\//);
      expect(item.category).toBeTruthy();
    }
  });
});

describe('filterCatalog', () => {
  it('returns nothing for an empty or whitespace query', () => {
    expect(filterCatalog('', searchIndex)).toEqual([]);
    expect(filterCatalog('   ', searchIndex)).toEqual([]);
  });

  it('matches on name, case-insensitively', () => {
    const r = filterCatalog('CONTAINERLAB', searchIndex);
    const containerlab = r.find((x) => x.name === 'Containerlab');
    expect(containerlab).toBeDefined();
    expect(containerlab?.category).toBe('Lab software');
  });

  it('matches on note text', () => {
    const r = filterCatalog('type checker', searchIndex);
    expect(r.some((x) => x.name === 'Batfish')).toBe(true);
  });

  it('matches on category label', () => {
    const r = filterCatalog('cognitive biases', searchIndex);
    expect(r.length).toBeGreaterThanOrEqual(9);
    expect(r.every((x) => x.category === 'Cognitive biases')).toBe(true);
  });

  it('returns an empty array when nothing matches', () => {
    expect(filterCatalog('zzzznotarealthing', searchIndex)).toEqual([]);
  });
});
