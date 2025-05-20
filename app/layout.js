import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import { APP_NAME } from './config';
import Footer from './components/Footer';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: `${APP_NAME} | Discover Stunning Free Images`,
  description: `Explore breathtaking visuals on ${APP_NAME}, your ultimate hub for discovering high-quality, royalty-free images. Updated daily with curated collections from top sources.`,
  keywords: [
    APP_NAME,
    'free stock photos',
    'image discovery',
    'photo gallery',
    'royalty-free images',
    'Unsplash',
    'Pexels',
    'HD wallpapers',
    'visual inspiration'
  ],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: `${APP_NAME} | Discover Stunning Free Images`,
    description: `Explore breathtaking visuals on ${APP_NAME}, your ultimate hub for discovering high-quality, royalty-free images.`,
    siteName: APP_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} | Discover Stunning Free Images`,
    description: `Explore breathtaking visuals on ${APP_NAME}, your ultimate hub for discovering high-quality, royalty-free images.`,
  },
};

export default function RootLayout({ children }) {
  return (
    <Suspense>
      <html lang="en" className="scroll-smooth">
        <ThemeProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-950 dark:text-gray-200">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </body>
        </ThemeProvider>
      </html>
    </Suspense>
  );
}
