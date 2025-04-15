"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="text-center py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
            <motion.h1 
              className="text-4xl text-gray-900 md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
                Download YouTube Videos Instantly
            </motion.h1>
            <motion.p 
              className="text-gray-600 text-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
                No ads. No signups. Just paste and download
            </motion.p>
            
            {/* CTA Button */}
            <motion.button
              className="px-6 py-3 md:px-9 bg-red-700 hover:bg-red-600 text-[#fff] rounded-lg mt-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
                <Link href="#download">Download Now</Link>
            </motion.button>
        </section>
    )
}