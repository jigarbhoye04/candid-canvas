import React, { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { clsx } from 'clsx/lite';
import { IBM_Plex_Mono } from 'next/font/google';
import {
  BASE_URL,
  SITE_DESCRIPTION,
  SITE_DOMAIN_OR_TITLE,
  SITE_TITLE,
} from '@/site/config';
import AppStateProvider from '@/state/AppStateProvider';
import ToasterWithThemes from '@/noNeed/toast/ToasterWithThemes';
import PhotoEscapeHandler from '@/photo/PhotoEscapeHandler';
import { Metadata } from 'next/types';
import { ThemeProvider } from 'next-themes';
import Nav from '@/site/Nav';
import Footer from '@/site/Footer';
import CommandK from '@/site/CommandK';
import SwrConfigClient from '../state/SwrConfigClient';
import ScrollToTop from '@/components/ScrollToTop';
import Loading from '@/components/Loading';

import '../site/globals.css';
import '../site/sonner.css';
import ThemeSwitcher from '@/site/ThemeSwitcher';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm-plex-mono',
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  ...(BASE_URL && { metadataBase: new URL(BASE_URL) }),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: [{
    url: '/favicon.ico',
    rel: 'icon',
    type: 'image/png',
    sizes: '180x180',
  }, {
    url: '/favicons/light.png',
    rel: 'icon',
    media: '(prefers-color-scheme: light)',
    type: 'image/png',
    sizes: '32x32',
  }, {
    url: '/favicons/dark.png',
    rel: 'icon',
    media: '(prefers-color-scheme: dark)',
    type: 'image/png',
    sizes: '32x32',
  }, {
    url: '/favicons/apple-touch-icon.png',
    rel: 'icon',
    type: 'image/png',
    sizes: '180x180',
  }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      // Suppress hydration errors due to next-themes behavior
      suppressHydrationWarning
    >
      <body className={ibmPlexMono.variable}>
        <AppStateProvider>
          <SwrConfigClient>
            <ThemeProvider attribute="class">
              <div className={clsx(
                'flex flex-col items-center', // Center the content
                'w-full min-h-screen', // Ensure it takes full height
                'px-3 lg:px-6', // Add padding to the sides
              )}>
                <Nav siteDomainOrTitle={SITE_DOMAIN_OR_TITLE} />
                <Suspense fallback={<Loading />}> {/*Added Suspense Fallback*/}
                  <main className={clsx(
                    'w-full max-w-7xl', // Restrict the width to a maximum value
                    'flex flex-col items-center', // Center the content inside main
                  )}>
                    <div className={clsx(
                      'min-h-[16rem] sm:min-h-[30rem]',
                      'mb-12',
                      'w-full', // Ensure it takes full width
                    )}>
                      {children}
                      <SpeedInsights debug={false} />
                    </div>
                    <ScrollToTop />
                    <Footer />
                  </main>
                </Suspense>
                <CommandK />
              </div>
            </ThemeProvider>
          </SwrConfigClient>
          <Analytics debug={false} />
          {/* <SpeedInsights debug={false}  /> */}
          <PhotoEscapeHandler />
          {/* <ToasterWithThemes /> */}
        </AppStateProvider>
      </body>
    </html>
  );
}
