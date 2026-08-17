// Partner logos grouped by category, mirroring the media-kit "Brands that partner with us"
// slide. Dark-background transparent PNGs live in /public/sponsors (from the Sponsors ->
// Logos -> Dark Background set). Category order + membership match data/sponsors.json.
export type SponsorLogo = { name: string; src: string };
export type SponsorCategory = { category: string; logos: SponsorLogo[] };

export const sponsorCategories: SponsorCategory[] = [
  {
    category: 'Network Automation',
    logos: [
      { name: 'Juniper Apstra', src: '/sponsors/juniper-apstra.png' },
      { name: 'Itential', src: '/sponsors/itential.png' },
      { name: 'Forward Networks', src: '/sponsors/forward-networks.png' },
      { name: 'Unimus', src: '/sponsors/unimus.png' },
      { name: 'Transit AI', src: '/sponsors/transit-ai.png' },
    ],
  },
  {
    category: 'Observability & Monitoring',
    logos: [
      { name: 'Kentik', src: '/sponsors/kentik.png' },
      { name: 'NetAlly', src: '/sponsors/netally.png' },
      { name: 'PathSolutions', src: '/sponsors/pathsolutions.png' },
      { name: 'Augtera', src: '/sponsors/augtera.png' },
    ],
  },
  {
    category: 'Infrastructure & Hardware',
    logos: [
      { name: 'Meter', src: '/sponsors/meter.png' },
      { name: 'Opengear', src: '/sponsors/opengear.png' },
      { name: 'Celona', src: '/sponsors/celona.png' },
      { name: 'Netris', src: '/sponsors/netris.png' },
    ],
  },
  {
    category: 'Training & Community',
    logos: [
      { name: 'Cisco Press', src: '/sponsors/cisco-press.png' },
      { name: 'Boson', src: '/sponsors/boson.png' },
      { name: 'USNUA', src: '/sponsors/usnua.png' },
    ],
  },
];
