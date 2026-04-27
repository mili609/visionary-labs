import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { RootProvider } from './providers/RootProvider';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Navbar } from '@/components/Navbar';
import { Toaster } from 'sonner';
import { Toaster as ToasterRadix } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://myopreva.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'MyoPREVA - Patented Myopia Control Technology',
  description:
    'Discover MyoPREVA, patented technology designed to slow myopia progression in children. Make eye care accessible to all.',
  icons: {
    icon: '/favicon.ico',
    apple: '/assets/myopreva-logo.png',
  },
  alternates: {
    canonical: '/',
  },
  keywords: 'myopia, myopia control, eye care, children, vision, optical defocus',
  openGraph: {
    title: 'MyoPREVA - Patented Myopia Control Technology',
    description: 'Discover MyoPREVA, patented technology designed to slow myopia progression in children.',
    type: 'website',
    url: '/',
    siteName: 'MyoPREVA',
    images: [
      {
        url: '/assets/hero-lens.jpg',
        width: 1200,
        height: 630,
        alt: 'MyoPREVA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyoPREVA - Patented Myopia Control Technology',
    description: 'Discover MyoPREVA, patented technology designed to slow myopia progression in children.',
    creator: '@myopreva',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <RootProvider>
          <TooltipProvider>
            <ToasterRadix />
            <Toaster />
            <ScrollToTop />
            <Navbar />
            <div className="relative">{children}</div>
          </TooltipProvider>
        </RootProvider>
      </body>
    </html>
  );
}
