'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_DOMAIN } from '../config';

export default function DisclaimerModal({ isOpen, onClose }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => (document.body.style.overflow = '');
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-[90%] max-w-3xl relative max-h-[90vh] flex flex-col"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="disclaimer-title"
                    >
                        <div className="sticky top-0 flex justify-between items-center z-10 bg-white dark:bg-gray-900 rounded-t-xl px-6 pt-6 pb-4">
                            <h2
                                id="disclaimer-title"
                                className="text-2xl font-bold text-gray-800 dark:text-white"
                            >
                                Disclaimer
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
                                aria-label="Close Disclaimer"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="px-6 pb-6 overflow-y-auto custom-scrollbar text-sm text-gray-700 dark:text-gray-300 space-y-4">
                            <p>
                                <strong>General Information:</strong><br />
                                The content provided on {APP_DOMAIN} is for general informational purposes only.
                            </p>
                            <p>
                                <strong>Third-Party Vendors:</strong><br />
                                {APP_DOMAIN} is not liable for any offers, products, or services provided by third parties.
                            </p>
                            <p>
                                <strong>Transaction Responsibility:</strong><br />
                                It is your responsibility to ensure legitimacy before making purchases.
                            </p>
                            <p>
                                <strong>&quot;AS IS&quot; Disclaimer:</strong><br />
                                All materials are provided &quot;AS IS&quot; without warranties of any kind.
                            </p>
                            <p>
                                <strong>Liability Limitations:</strong><br />
                                {APP_DOMAIN} is not responsible for any damages related to site usage.
                            </p>
                            <p>
                                <strong>Accuracy of Information:</strong><br />
                                The website may contain inaccuracies and content may change.
                            </p>
                            <p>
                                <strong>External Links:</strong><br />
                                This site may link to third-party sites with separate policies.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
