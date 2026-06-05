# The Art of Network Engineering — Website

Source code for **[artofnetworkengineering.com](https://artofnetworkengineering.com)**, the home of the podcast, blog, newsletter, and community resources for network engineers.

## Found a broken link, typo, or factual error?

**Please [open an issue](https://github.com/The-Art-of-Network-Engineering/website/issues/new).** That's the fastest way to get it fixed — every issue creates a tracked thread, and small fixes can go live within minutes.

If you'd like to fix it yourself, pull requests are welcome too. See [Contributing](#contributing) below.

## What's here

- **Podcast episodes** — synced from Buzzsprout at build time
- **Blog** — 130+ posts contributed by network engineers across the community
- **Resources** — curated free certifications, courses, RFCs, communities, AI learning, career data, and recommended books
- **Sponsor info** — audience demographics, ad slots, and the sponsor snapshot deck

## Tech

Next.js 14 (App Router, static export) deployed to Cloudflare Pages. Posts are markdown with frontmatter. No database, no server, no JavaScript heroics.

## Run it locally

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
npm test
```

## Contributing

- **Bug reports & broken links:** open an [issue](https://github.com/The-Art-of-Network-Engineering/website/issues).
- **Small fixes** (typos, broken URLs, missing alt text): fork → edit → open a PR. Keep the change focused; one fix per PR.
- **Larger changes** (new sections, design tweaks): please open an issue first to discuss the direction before sinking time into a PR.

The build runs typecheck + tests on every commit via a pre-commit hook, so PRs that pass CI are usually safe to merge.

## License

Code is MIT-licensed. Post content is © its respective authors (most posts list the author in the frontmatter).
