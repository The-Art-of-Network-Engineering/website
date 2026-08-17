import { subscribe } from './subscribeLinks';

export function SubscribeButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      {subscribe.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-border bg-surface hover:border-accent-green hover:text-accent-green text-text px-4 py-2 text-sm rounded-sm transition-colors"
        >
          <Icon aria-hidden className="shrink-0 text-[18px]" />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}
