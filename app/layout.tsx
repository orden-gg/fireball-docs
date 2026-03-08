import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { QueryProvider } from '@/components/query-provider';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    template: '%s | fireball codex',
    default: 'fireball codex',
  },
  description:
    'Documentation for Fireball - The intelligent gaming bot platform for Gigaverse',
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://docs.fireball.gg'
  ),
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'fireball codex',
    description:
      'Documentation for Fireball - The intelligent gaming bot platform for Gigaverse',
    siteName: 'fireball codex',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'fireball codex',
    description:
      'Documentation for Fireball - The intelligent gaming bot platform for Gigaverse',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={geist.variable}>
      <body className="flex min-h-screen flex-col tracking-wide">
        <QueryProvider>
          <RootProvider
            theme={{
              enabled: true,
              defaultTheme: 'dark',
              attribute: 'class',
              enableSystem: true,
              disableTransitionOnChange: true,
            }}
          >
            {children}
          </RootProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
