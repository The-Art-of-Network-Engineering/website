import Link from 'next/link';
import { SectionLabel } from '@/components/SectionLabel';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-6 py-32 text-center">
      <div className="flex justify-center">
        <SectionLabel>404</SectionLabel>
      </div>
      <h1 className="mt-6 font-display text-5xl">Page not found</h1>
      <p className="mt-4 text-text-muted">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-block bg-accent-green text-bg font-semibold px-6 py-3 rounded-sm"
        >
          Home
        </Link>
        <Link
          href="/episodes"
          className="inline-block border border-border bg-surface text-text font-semibold px-6 py-3 rounded-sm"
        >
          Browse episodes
        </Link>
      </div>
    </div>
  );
}
