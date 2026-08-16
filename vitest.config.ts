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
  test: { environment: 'node', globals: false },
});
