/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  // Note: redirects() is not honored under `output: 'export'`, so production
  // rules live in `out/_redirects` (emitted by scripts/generate-redirects.ts).
  // This array only affects `next dev`. Keep it minimal: anything listed here
  // will hijack dev navigation and make local previews unusable for those paths.
  async redirects() {
    return [
      { source: '/work-with-us', destination: '/sponsor', permanent: true },
      { source: '/work-with-us/', destination: '/sponsor', permanent: true },
    ];
  },
};

export default nextConfig;
