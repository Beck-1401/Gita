import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export const metadata: Metadata = {
  title: 'Bhagavad Gita — An Interactive Study',
  description:
    'Study the Bhagavad Gita with multiple translations, classical commentaries, and AI-assisted inquiry.',
  openGraph: {
    title: 'Bhagavad Gita — An Interactive Study',
    description: 'Multiple translations, classical commentaries, and AI-assisted inquiry.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-ivory text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
