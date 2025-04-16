"use client";

import { motion } from "framer-motion";


export default function FAQ() {
    const faqs = [
        { q: 'Is it legal to download videos?', a: 'Only for personal use. Respect copyright laws.' },
        { q: 'Can I download audio only?', a: 'Yes, MP3 is supported (coming soon).' },
        { q: 'Is this free to use?', a: 'Yes! 100% free and ad-free.' },
    ]

    return (
        <section id="faq" className="py-16 px-4 bg-blue-50">
            <motion.h2
              className="text-2xl font-bold text-center text-gray-900 mb-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
                Frequently Asked Questions
            </motion.h2>

            <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, i) => (
                    <motion.div 
                      key={i} 
                      className="border-b pb-4"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.2 }}

                    >
                        <p className="font-semibold text-gray-900">{faq.q}</p>
                        <p className="text-gray-600">{faq.a}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )

}