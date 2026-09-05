import { SectionLabel } from '@/components/SectionLabel';
import type { LegalPage as LegalPageData } from '@/lib/legal';

/// Shared layout for /privacy and /support. Both are plain prose pages driven by data in
/// lib/legal.ts, so the content can be asserted in tests without rendering.
export function LegalPage({ page }: { page: LegalPageData }) {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>{page.title}</SectionLabel>
      <h1 className="mt-4 font-display text-4xl text-text">{page.title}</h1>
      <p className="mt-4 max-w-3xl text-text-muted">{page.intro}</p>
      <p className="mt-2 text-xs font-mono text-text-muted">Last updated {page.lastUpdated}</p>

      {page.sections.map((section) => (
        <section key={section.heading} className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-2xl text-accent-green">{section.heading}</h2>
          {section.paragraphs.map((paragraph, i) => (
            <p key={i} className="mt-4 max-w-3xl text-text">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
