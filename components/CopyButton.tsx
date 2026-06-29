'use client';

import { useState } from 'react';

// Small copy-to-clipboard button for press assets (bios, boilerplate).
// Lets a podcast host or journalist grab approved text in one click.
export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail quietly.
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="font-mono text-xs uppercase tracking-label border border-border bg-surface hover:border-accent-green hover:text-accent-green px-3 py-1.5 rounded-sm transition-colors"
      aria-live="polite"
    >
      {copied ? 'Copied ✓' : label}
    </button>
  );
}
