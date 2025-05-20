'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_NAME } from '../config';
import ThemeSwitcher from './ThemeSwitcher';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const mobileMenuVariants = {
    closed: { opacity: 0, y: -10, pointerEvents: 'none' },
    open: { opacity: 1, y: 0, pointerEvents: 'auto', transition: { duration: 0.25 } },
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: '100%', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const menuIconVariants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.75 },
  };

  const closeIconVariants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.75 },
  };

  // Fade-in animation for the entire header on mount
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.header
      className="shadow-md sticky top-0 z-50 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between h-16">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-110 active:scale-95"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <motion.div
            initial="visible"
            animate={isOpen ? 'hidden' : 'visible'}
            variants={menuIconVariants}
            style={{ position: 'absolute' }}
          >
            <Menu size={24} />
          </motion.div>
          <motion.div
            initial="hidden"
            animate={isOpen ? 'visible' : 'hidden'}
            variants={closeIconVariants}
            style={{ position: 'absolute' }}
          >
            <X size={24} />
          </motion.div>
        </button>

        {/* Brand */}
        <Link
          href="/"
          className="text-3xl font-extrabold text-transparent bg-clip-text text-animated-gradient select-none animate-gradient-x"
          aria-label="Home"
        >
          {APP_NAME}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wide">
          {['/unsplash', '/pexels'].map((href) => {
            const name = href.slice(1).charAt(0).toUpperCase() + href.slice(2);
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative group transition duration-300 ease-in-out ${isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
              >
                {name}
                <motion.span
                  className="absolute left-0 -bottom-1 h-0.5 bg-blue-600 dark:bg-blue-400"
                  variants={underlineVariants}
                  initial={isActive ? 'visible' : 'hidden'}
                  animate={isActive ? 'visible' : 'hidden'}
                  whileHover="visible"
                />
              </Link>
            );
          })}
        </div>

        {/* Theme Switcher */}
        <motion.span
          className="cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ThemeSwitcher />
        </motion.span>
      </nav>

      {/* Mobile Dropdown Menu with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            className="absolute left-4 right-4 md:left-auto md:right-auto mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 backdrop-blur-md bg-opacity-80 dark:bg-opacity-70 origin-top"
            initial={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(4px)' }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              transition: {
                duration: 0.3,
                ease: 'easeOut',
                when: 'beforeChildren',
                staggerChildren: 0.08,
              },
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95,
              filter: 'blur(4px)',
              transition: { duration: 0.2, ease: 'easeIn' },
            }}
          >
            {[
              { href: '/unsplash', label: 'Unsplash' },
              { href: '/pexels', label: 'Pexels', rounded: 'rounded-b-lg' },
            ].map(({ href, label, rounded }) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out ${rounded || ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>


      <style jsx>{`
        /* Animate the gradient background horizontally */
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s linear infinite;
        }
      `}</style>
    </motion.header>
  );
}
