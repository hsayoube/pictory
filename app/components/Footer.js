'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { APP_NAME } from '../config';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import DisclaimerModal from './DisclaimerModal';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/unsplash', label: 'Unsplash' },
  { href: '/pexels', label: 'Pexels' },
];

const linkVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.replace(`/sub?email=${email}`);
    setEmail("");
  };

  return (
    <motion.footer
      className="sticky bottom-0 z-30 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 shadow-inner"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 70, damping: 15 }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8 flex flex-col md:flex-row justify-between gap-8 items-center text-sm font-medium text-gray-600 dark:text-gray-300">

        {/* Left */}
        <motion.p
          className="text-gray-500 dark:text-gray-400 text-xs text-center select-none md:text-right"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </motion.p>

        {/* Center */}
        <motion.nav
          className="flex flex-wrap justify-center gap-6"
          initial="hidden"
          animate="visible"
        >
          {footerLinks.map(({ href, label }, i) => (
            <motion.div key={href} custom={i} variants={linkVariant}>
              <Link
                href={href}
                className="relative group hover:text-blue-600 dark:hover:text-blue-400 transition duration-300 ease-in-out"
              >
                {label}
                <span className="absolute left-0 -bottom-1 h-[2px] bg-blue-600 dark:bg-blue-400 w-0 group-hover:w-full transition-all duration-300 ease-in-out" />
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Right - Form */}
        <motion.div
          className="w-full md:w-auto flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Subscribe to our newsletter</p>
          <form className="w-full max-w-sm space-y-3" onSubmit={handleSubmit}>
            {/* Email + Submit Button Row */}
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm outline-none focus:border-blue-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 border border-blue-600 text-white text-sm font-semibold rounded-r-md hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </div>

            {/* Agreement Checkbox Below */}
            <div className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                id="agree"
                required
                aria-label="Agree to policies"
                className="w-4 h-4 accent-blue-600"
              />
              <label htmlFor="agree" className="text-gray-700 dark:text-gray-300">
                I agree to{' '}
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </button>{' '}
                &{' '}
                <button
                  type="button"
                  onClick={() => setShowDisclaimerModal(true)}
                  className="text-blue-600 hover:underline"
                >
                  Disclaimer
                </button>
              </label>
            </div>
          </form>
        </motion.div>

      </div>
      {/* Modals */}
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
      <DisclaimerModal
        isOpen={showDisclaimerModal}
        onClose={() => setShowDisclaimerModal(false)}
      />
    </motion.footer>
  );
}
