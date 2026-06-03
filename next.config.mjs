/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  // Note: redirects() is not honored under `output: 'export'`.
  // The same rules are emitted to `out/_redirects` by `scripts/generate-redirects.ts`
  // (postbuild hook in package.json) for Cloudflare Pages. This array is the source of truth
  // but kept here mostly for documentation — the real emission is in the postbuild script.
  async redirects() {
    return [
      { source: '/work-with-us', destination: '/sponsor', permanent: true },
      { source: '/work-with-us/', destination: '/sponsor', permanent: true },
      { source: '/blog', destination: 'https://www.linkedin.com/company/the-art-of-network-engineering/posts/', permanent: false },
      { source: '/blog/:slug*', destination: 'https://www.linkedin.com/company/the-art-of-network-engineering/posts/', permanent: false },
    ];
  },
};

export default nextConfig;
