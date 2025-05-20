'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UnsubscribeModal({ isOpen, setIsOpen }) {
    const router = useRouter();

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        router.replace(`/unsub?email=${email}`)
        setIsOpen(false);
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 bg-opacity-40 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 z-40 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <div
                            className="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-full max-w-md mx-4 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>

                            {/* Modal content */}
                            <h2 className="text-2xl font-bold mb-2">Unsubscribe</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                We’re sorry to see you go. Enter your email to unsubscribe from newsletter.
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-3"
                            >
                                <input
                                    type="email"
                                    required
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                                >
                                    Unsubscribe
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
