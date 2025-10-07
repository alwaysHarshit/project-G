import React from 'react';
import { motion } from 'framer-motion';

function EdgeCasePage() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#00056E] to-black text-white p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
            <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                🚧 Feature Coming Soon
            </motion.h1>

            <motion.p
                className="text-lg text-gray-300 max-w-xl text-center"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                We're working hard to bring this exciting feature to your dashboard. Stay tuned for updates!
            </motion.p>
        </motion.div>
    );
}

export default EdgeCasePage;
