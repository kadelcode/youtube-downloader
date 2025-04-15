"use client";

import { motion } from "framer-motion";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaMobileAlt } from "react-icons/fa";
import { BsFiletypeMp3 } from "react-icons/bs";
import { FaUnlockAlt } from "react-icons/fa";

export default function Features() {
    const features = [
        {
            icon: <BsFillLightningChargeFill size={30} />,
            label: 'Fast Download',
        },
        {
            icon: <FaMobileAlt size={30} />,
            label: 'Mobile Friendly',
        },
        {
            icon: <BsFiletypeMp3 size={30} />,
            label: 'MP3 Supported',
        },
        {
            icon: <FaUnlockAlt size={30} />,
            label: 'No login Needed',
        },
    ];

    return (
        <section id="features" className="py-16 px-4 bg-white">
            <motion.h2 
              className="text-3xl font-bold text-center text-gray-800 mb-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
                Features
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {features.map((f, i) => (
                    <motion.div
                      key={i}
                      className="p-6 bg-blue-50 rounded-xl text-center shadow"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0}}
                      transition={{ duration: 0.6,  delay: i * 0.2 }}
                    >
                        <div className="flex items-center justify-center mb-4 text-rose-500">
                            {f.icon}
                        </div>
                        <div className="mt-2 font-semibold text-gray-700">
                            {f.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}