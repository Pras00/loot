import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';

import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LOOT — The smart metal card that sorts your money automatically',
  description:
    'Pay once, and LOOT splits every transaction across your tax, operating, savings, and payroll pockets on the spot.',
  applicationName: 'LOOT',
  authors: [{ name: 'LOOT' }],
  openGraph: {
    title: 'LOOT — Automatic money pockets in one metal card',
    description: 'Pay once. Divided four ways automatically.',
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#18181c',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="antialiased">
        {children}
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
