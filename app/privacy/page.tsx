import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { privacy } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for The Art of Network Engineering app and website. No accounts, no analytics, no tracking. The only thing that can leave your device is an opt-in notification token.',
};

export default function PrivacyPage() {
  return <LegalPage page={privacy} />;
}
