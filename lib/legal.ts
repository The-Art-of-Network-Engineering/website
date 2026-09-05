// Content for /privacy and /support, kept as data so it can be asserted in tests without a
// DOM (see lib/legal.test.ts). These two URLs are App Store submission blockers: Apple
// requires a privacy policy URL for every iOS app and contact information reachable from the
// Support URL. Spec: docs/specs/2026-09-05-app-legal-pages-design.md
//
// Every factual claim below was read from the AONE_Mobile source on 2026-09-05, not assumed.
// If the app changes what it collects, this file changes with it, or the policy becomes a lie
// and the App Privacy label stops matching the app (which Apple rejects).

export const SUPPORT_EMAIL = 'andy@artofnetworkengineering.com';

export type LegalSection = { heading: string; paragraphs: string[] };
export type LegalPage = { title: string; intro: string; lastUpdated: string; sections: LegalSection[] };

export const privacy: LegalPage = {
  title: 'Privacy Policy',
  intro:
    'This policy covers the Art of Network Engineering app for iPhone and Apple Watch, and this website. It is short because the app collects almost nothing.',
  lastUpdated: '2026-09-05',
  sections: [
    {
      heading: 'The short version',
      paragraphs: [
        'The app has no accounts, no login, and no sign-up. It does not ask for your name or your email. It runs no analytics, no crash reporting, and no advertising or tracking software of any kind.',
        'One piece of information can leave your device, and only if you choose it: a notification token, described below. Nothing is ever sold.',
      ],
    },
    {
      heading: 'What we collect, and only if you allow notifications',
      paragraphs: [
        'If you allow notifications, Apple issues a device token. It is a string that identifies one installation of the app on one device so a notification can be delivered to it. It is not a name, an email address, or an account, and it tells us nothing about who you are.',
        'The app sends that token to our notification service, which stores it alongside the identifier of the most recent episode and video it has seen. When a new episode or video is published, the service asks Apple to deliver a notification to the stored tokens. Apple performs the delivery. The token is used for that and nothing else.',
        'If you deny the notification permission, or never enable it, no token is created and nothing is sent.',
      ],
    },
    {
      heading: 'What stays on your device',
      paragraphs: [
        'The app remembers where you were in an episode, the state of the player, and your notification preferences. That information is stored on your device and is not transmitted to us. Deleting the app removes it.',
      ],
    },
    {
      heading: 'Services the app contacts',
      paragraphs: [
        'The app has no content servers of its own. It reads published material directly from the services below, which means those services receive a request from your device and can see technical information such as your IP address, in line with their own privacy policies.',
        'GitHub, which hosts the show data, blog posts, and site content the app reads. Buzzsprout, our podcast host, which serves the episode feed and the audio itself. YouTube, which provides the video listings. Apple, which delivers notifications and provides standard app services.',
      ],
    },
    {
      heading: 'What we do not do',
      paragraphs: [
        'No analytics. No advertising identifiers. No third-party tracking. No profiling. Your data is never sold, and it is never shared with anyone for marketing.',
        'The app contains no third-party software development kits at all, which is the technical reason the list above is so short rather than a promise we are asking you to take on trust.',
      ],
    },
    {
      heading: 'Turning it off, and deleting your data',
      paragraphs: [
        'Turn notifications off at any time in the iOS Settings app, under Notifications, and delivery stops immediately. Deleting the app has the same effect.',
        `To have your notification token removed from our service, email ${SUPPORT_EMAIL} and ask. There is nothing else of yours for us to delete, because there is nothing else we hold. Tokens that stop working are cleared as Apple reports them as inactive.`,
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'The app is a podcast and blog reader for working professionals. It is not directed at children and we do not knowingly collect information from them.',
      ],
    },
    {
      heading: 'Changes, and how to reach us',
      paragraphs: [
        'If the app starts collecting something new, this page changes before the app ships, and the date at the top changes with it.',
        `Questions about this policy go to ${SUPPORT_EMAIL}. The app and this site are operated by Lapteff Media Group LLC, trading as The Art of Network Engineering.`,
      ],
    },
  ],
};

export const support: LegalPage = {
  title: 'Support',
  intro:
    'Help for the Art of Network Engineering app and website. A real person reads every message.',
  lastUpdated: '2026-09-05',
  sections: [
    {
      heading: 'Get in touch',
      paragraphs: [
        `Email ${SUPPORT_EMAIL} with anything: a bug, a feature request, a broken episode, or a question. We aim to reply within two business days.`,
      ],
    },
    {
      heading: 'Reporting a problem with the app',
      paragraphs: [
        'Four things make a bug far faster to fix: your device (iPhone or Apple Watch) and its iOS version, the app version, what you were doing when it happened, and what you expected instead. A screenshot helps more than a description.',
      ],
    },
    {
      heading: 'Notifications',
      paragraphs: [
        'Notifications are opt-in and arrive when a new episode or video is published. If they stop, check Settings, then Notifications, and confirm the app is still allowed to send them. Turning them off there stops them immediately.',
        'To have your notification token deleted from our service, ask by email and it is done.',
      ],
    },
    {
      heading: 'Playback and content',
      paragraphs: [
        'Episodes are served by our podcast host, and videos come from our YouTube channel. If an episode will not play, it is worth checking whether it plays on the website before reporting it, since that narrows down where the fault is.',
        'The app reads published show data directly from our public repository, so a newly released episode can appear in audio before its video listing catches up.',
      ],
    },
    {
      heading: 'Privacy',
      paragraphs: [
        'What the app collects, and what it does not, is set out in full on the privacy policy page.',
      ],
    },
  ],
};
