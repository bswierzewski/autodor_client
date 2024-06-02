import Guard from './Guard';
import { Providers } from './providers';
import type { Metadata } from 'next';
import { PublicEnvScript } from 'next-runtime-env';

import { siteConfig } from '@/config/site';

import Navbar from '@/components/nav/Navbar';
import Sidebar from '@/components/nav/Sidebar';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <PublicEnvScript />
      </head>
      <body className="min-h-screen">
        <Providers>
          <Guard>
            <div className="flex flex-col md:flex-row w-full min-h-screen">
              <Navbar className="md:hidden" />
              <Sidebar className="hidden md:flex" />
              <div className="flex flex-col flex-1">
                <main className="p-10 flex-1">{children}</main>
                <footer className="flex items-center justify-center py-3">
                  <span className="text-default-600">
                    Powered by <strong className="text-primary">{siteConfig.company}</strong> {siteConfig.version}
                  </span>
                </footer>
              </div>
            </div>
          </Guard>
        </Providers>
      </body>
    </html>
  );
}
