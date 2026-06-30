import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Subnetting practice game',
  description:
    'A free browser game that teaches IPv4 subnetting one step at a time. No signup, no install. Built live by the AONE community using spec-driven development.',
};

export default function SubnettingPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Practice</SectionLabel>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">Subnetting practice</h1>
      <p className="mt-4 max-w-2xl text-text-muted">
        Subnetting is the one skill every network engineer has to own cold. This free browser
        game drills IPv4 subnetting one step at a time. No signup, no install. We built it live
        with the community using spec-driven development.
      </p>
      <p className="mt-3 max-w-2xl text-sm text-text-muted">
        <a
          href="/subnetting-game/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-blue"
        >
          Open the game full screen →
        </a>
      </p>

      <div className="mt-8 border border-border rounded-sm overflow-hidden bg-surface">
        <iframe
          src="/subnetting-game/index.html"
          title="Subnet Trainer — IPv4 subnetting practice game"
          className="w-full"
          style={{ height: '760px', border: '0' }}
        />
      </div>

      <p className="mt-6 text-sm text-text-muted">
        Source is open on{' '}
        <a
          href="https://github.com/The-Art-of-Network-Engineering/network-video-game"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-blue"
        >
          GitHub
        </a>
        . Found a bug or have an idea? Open an issue there.
      </p>
    </div>
  );
}
