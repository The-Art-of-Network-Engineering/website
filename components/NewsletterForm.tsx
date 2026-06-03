// Beehiiv publication ID — set after Andy creates the free Beehiiv account.
// Until then, BEEHIIV_PUB_ID is null and the form renders a "coming soon" placeholder.
const BEEHIIV_PUB_ID: string | null = null; // e.g. "abc123def-..."

export function NewsletterForm() {
  if (!BEEHIIV_PUB_ID) {
    return (
      <div className="bg-surface border border-border rounded-sm p-6">
        <p className="text-sm text-text-muted">
          Newsletter signup opens shortly. Email{' '}
          <a href="mailto:andy@artofnetworkengineering.com?subject=Newsletter">
            andy@artofnetworkengineering.com
          </a>{' '}
          to be added manually in the meantime.
        </p>
      </div>
    );
  }

  return (
    <iframe
      src={`https://embeds.beehiiv.com/${BEEHIIV_PUB_ID}?slim=true`}
      title="Subscribe to the AONE newsletter"
      data-test-id="beehiiv-embed"
      frameBorder="0"
      scrolling="no"
      style={{ margin: 0, borderRadius: 4, backgroundColor: 'transparent' }}
      className="w-full min-h-[80px]"
    />
  );
}
