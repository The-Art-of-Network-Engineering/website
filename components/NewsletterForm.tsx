// Beehiiv publication ID. Set after Andy creates the Beehiiv account.
// Until then, BEEHIIV_PUB_ID is null and a placeholder card is rendered with a mailto.
const BEEHIIV_PUB_ID: string | null = null; // e.g. "abc123def-456..."

export function NewsletterForm() {
  if (!BEEHIIV_PUB_ID) {
    return (
      <div className="bg-surface border border-border rounded-sm p-6">
        <p className="text-text">
          The signup form goes live with the newsletter. In the meantime, email{' '}
          <a href="mailto:newsletter@artofnetworkengineering.com?subject=Add%20me%20to%20the%20newsletter">
            newsletter@artofnetworkengineering.com
          </a>{' '}
          and we'll add you the day it launches.
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
