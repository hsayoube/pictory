'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Link, Ban, Gem, CircleCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_DOMAIN } from '../config';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
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
                        aria-labelledby="privacy-policy-title"
                    >
                        {/* Header */}
                        <div className="sticky top-0 flex justify-between items-center z-10 bg-white dark:bg-gray-900 rounded-t-xl px-6 pt-6 pb-4">
                            <h2
                                id="privacy-policy-title"
                                className="text-2xl font-bold text-gray-800 dark:text-white"
                            >
                                Privacy Policy
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
                                aria-label="Close Privacy Policy"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="px-6 pb-6 overflow-y-auto custom-scrollbar text-sm text-gray-700 dark:text-gray-300 space-y-4">
                            <p><strong>Your Privacy Matters:</strong><br />
                                We value your trust and are committed to protecting your personal information.
                            </p>
                            <p><strong>Policy Updates:</strong><br />
                                We may update this policy periodically. Changes will be posted here and, if significant, notified via email or website.
                            </p>
                            <p><strong>Newsletter Subscription & Email Frequency:</strong><br />
                                Subscribing means you agree to receive daily emails. Frequency may change without notice.
                            </p>

                            <div>
                                <strong>How We Collect & Use Your Information:</strong>
                                <ul className="list-none ml-6 mt-2 space-y-1">
                                    <li className="flex items-start gap-2"><CircleCheck size={18} /> Sending newsletters and updates.</li>
                                    <li className="flex items-start gap-2"><CircleCheck size={18} /> Verifying age and awarding prizes.</li>
                                    <li className="flex items-start gap-2"><CircleCheck size={18} /> Providing opted-in third-party offers.</li>
                                </ul>
                            </div>

                            <p>
                                We don’t share your personal info with marketers. We may share aggregate data with partners.
                            </p>

                            <div>
                                Additionally, we automatically collect:
                                <ul className="list-disc ml-6 mt-1 space-y-1">
                                    <li>IP, browser, and ISP data for trends and security.</li>
                                    <li>Referral pages and timestamps to improve user experience.</li>
                                </ul>
                            </div>

                            <p><strong>Children&apos;s Privacy:</strong></p>
                            <div className="ml-2 space-y-1">
                                <div className="flex items-start gap-2"><Gem size={18} />Under 18? Get parental consent first.</div>
                                <div className="flex items-start gap-2"><Gem size={18} />Under 13? Written parental permission required.</div>
                            </div>

                            <p><strong>Cookies & Third-Party Advertisers:</strong></p>
                            <div className="ml-2 space-y-1">
                                <div className="flex items-start gap-2"><Ban size={18} />We do not use cookies directly.</div>
                                <div className="flex items-start gap-2"><Link size={18} />Linked sites or advertisers may use cookies.</div>
                            </div>

                            <p><strong>Third-Party Links:</strong><br />
                                External links may have different policies. Review theirs before sharing data.
                            </p>

                            <p><strong>Security Measures:</strong><br />
                                We take reasonable precautions, but no online system is fully secure. Contact us if you have concerns.
                            </p>

                            <p><strong>Business Transitions:</strong><br />
                                If our business changes hands, data may be transferred. You’ll be notified on the website.
                            </p>

                            <p><strong>Opt-Out Policy:</strong><br />
                                You can unsubscribe at any time using the link in our emails or by contacting us.
                            </p>

                            <p><strong>Acceptance of Terms:</strong><br />
                                Using our site means you accept this policy. If not, don’t subscribe. We may change the policy anytime.
                            </p>

                            <p>
                                <strong>Contact Us:</strong><br />
                                <span className="flex items-start gap-2">
                                    <Mail size={18} /> Email: contact@{APP_DOMAIN.toLowerCase()}
                                </span>
                                For any questions regarding this privacy policy, our website practices, your data or your interactions with us, feel free to reach out.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
