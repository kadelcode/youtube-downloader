"use client";

import { motion } from "framer-motion";
import { FaLink } from "react-icons/fa";
import { BsFiletypeMp4 } from "react-icons/bs";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";

export default function HowItWorks() {
    const steps = [
        {
            icon: <FaLink size={30} />,
            label: 'Paste the YouTube link',
        },
        {
            icon: <BsFiletypeMp4 size={30} />,
            label: 'Choose the format (MP4, MP3)',
        },
        {
            icon: <FaCloudDownloadAlt size={30} />,
            label: 'Click Download',
        },
        {
            icon: <GiPartyPopper size={30} />,
            label: 'Enjoy offline content!',
        },
    ];

    return (
        <section id="how-it-works" className="py-16 px-4 bg-white">
            <motion.h2 
              className="text-3xl font-bold text-center text-gray-800 mb-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
                How It Works
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {steps.map((step, idx) => (
                    <motion.div
                      key={idx}
                      className="p-6 bg-blue-50 rounded-xl text-center shadow"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0}}
                      transition={{ duration: 0.6,  delay: idx * 0.2 }}
                    >
                        <div className="flex items-center justify-center mb-4 text-rose-500">
                            {step.icon}
                        </div>
                        <div className="mt-2 font-semibold text-gray-700">
                            {step.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}