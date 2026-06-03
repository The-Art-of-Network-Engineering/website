import clsx from 'clsx';

export function SectionLabel({
  children,
  prefix = '→',
  className,
}: {
  children: React.ReactNode;
  prefix?: '→';
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'font-mono text-xs uppercase tracking-label text-accent-blue',
        className,
      )}
    >
      <span aria-hidden="true" className="mr-2">
        {prefix}
      </span>
      {children}
    </div>
  );
}
