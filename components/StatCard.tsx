import clsx from 'clsx';

export function StatCard({
  value,
  label,
  caption,
  className,
}: {
  value: string;
  label: string;
  caption?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'border-t-2 border-accent-blue bg-surface px-6 py-6 rounded-sm',
        className,
      )}
    >
      <div className="font-display text-4xl text-accent-green">{value}</div>
      <div className="mt-2 text-sm text-text">{label}</div>
      {caption && <div className="mt-1 text-xs text-text-muted">{caption}</div>}
    </div>
  );
}
