/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  // Redirects are emitted to `out/_redirects` by `scripts/generate-redirects.ts`
  // (postbuild hook). Cloudflare Pages reads that file. A Next-config `redirects()`
  // would not be honored under `output: 'export'` and is intentionally omitted to
  // avoid the "two sources of truth" confusion that bit us before.
};

export default nextConfig;
