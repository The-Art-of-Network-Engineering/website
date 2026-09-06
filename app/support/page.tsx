import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { support } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Support for The Art of Network Engineering app and website. How to report a bug, manage notifications, and reach a human.',
};

export default function SupportPage() {
  return <LegalPage page={support} />;
}
