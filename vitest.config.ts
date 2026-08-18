import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Resolve the project's own "@/..." path alias so tests can import modules (e.g. the
  // metrics accessor) that reference data files via "@/data/...".
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  // next.js sets `jsx: preserve` in tsconfig, so the test runner has to do the JSX
  // transform itself for component tests (.tsx sources like Header).
  oxc: { jsx: { runtime: 'automatic', importSource: 'react' } },
  // Default stays `node` (fast, no DOM). Component tests opt in per file with a
  // `// @vitest-environment jsdom` comment at the top.
  test: { environment: 'node', globals: false },
});
