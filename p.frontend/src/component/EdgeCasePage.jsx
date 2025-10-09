import React from 'react';
import { motion } from 'framer-motion';
import {useNavigate} from "react-router-dom";

function EdgeCasePage() {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate("/dashboard");
    };
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#00056E] to-black text-white p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
            <motion.button
                onClick={handleBackClick}
                className="bg-zinc-800/80 backdrop-blur-sm text-zinc-300 px-4 py-2 rounded-xl flex items-center shadow-lg border border-zinc-700/50 hover:bg-zinc-700/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
            </motion.button>
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
