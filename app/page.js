'use client';

import Link from 'next/link';
import FeatureCard from './components/FeaturedCard';
import { motion } from 'framer-motion';
import { APP_NAME } from './config';
import ImageTicker from './components/ImageTicker';

export default function Home() {
  return (
    <main className="transition-colors duration-300">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6"
        >
          Discover Stunning Visuals with <span className="text-transparent bg-clip-text text-animated-gradient">{APP_NAME}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-10"
        >
          A gallery of breathtaking imagery from Unsplash and Pexels. Curated. Clean. Free.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/unsplash"
            className="relative inline-block px-6 py-3 text-base font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-full shadow-md overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 animated-gradient z-0 rounded-full transition-opacity duration-500 ease-in-out" />
            <span className="relative z-10">Explore Unsplash</span>
          </Link>

          <Link
            href="/pexels"
            className="relative inline-block px-6 py-3 text-base font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-full shadow-md overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 animated-gradient z-0 rounded-full transition-opacity duration-500 ease-in-out" />
            <span className="relative z-10">Explore Pexels</span>
          </Link>

        </motion.div>
      </section>

      {/* Image Ticker */}
      <ImageTicker />

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose {APP_NAME}?
          </motion.h2>

          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                title: 'Curated Excellence',
                description:
                  'Every image is handpicked for quality and inspiration from the best open-source platforms.',
              },
              {
                title: 'Effortless Experience',
                description:
                  'Modern UI and fast performance let you focus on what matters—beautiful visuals.',
              },
              {
                title: 'Always Free',
                description:
                  'Thanks to generous licenses from Unsplash & Pexels, all images are free to view and use.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <FeatureCard title={item.title} description={item.description} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
