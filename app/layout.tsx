// Cloudflare Web Analytics. Set after Andy enables CW Analytics for the zone and provides the token.
// Until then, no analytics script is rendered.
const CF_ANALYTICS_TOKEN: string | null = null;

import type { Metadata } from 'next';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const display = Orbitron({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'The Art of Network Engineering', template: '%s | AONE' },
  description:
    'The Art of Network Engineering blends technical insight with real-world stories from engineers, innovators, and IT pros.',
  metadataBase: new URL('https://artofnetworkengineering.com'),
  openGraph: { type: 'website', siteName: 'The Art of Network Engineering' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {CF_ANALYTICS_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${CF_ANALYTICS_TOKEN}"}`}
          />
        )}
      </body>
    </html>
  );
}
