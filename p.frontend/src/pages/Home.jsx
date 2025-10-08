// src/pages/HomePage.jsx
import React from 'react';
import { motion } from 'framer-motion';

import { Rocket, Eye, BarChart2 } from "lucide-react";

const features = [
    {
        title: 'AI-Powered Submission Insights',
        description: 'Analyze each submission in real-time for correctness, efficiency, and edge case coverage.',
        icon: <Rocket className="text-red-400 w-8 h-8" />,
    },
    {
        title: 'Smart Optimization Suggestions',
        description: 'AI highlights mistakes and suggests improvements to help you evolve faster as a programmer.',
        icon: <Rocket className="text-red-400 w-8 h-8" />,
    },
    {
        title: 'Personalized Problem Recommendations',
        description: 'Receive tailored challenges based on your skill level and submission history.',
        icon: <Eye className="text-yellow-400 w-8 h-8" />,
    },
    {
        title: 'Targeted Learning Guidance',
        description: 'Focus on weak areas in specific algorithms or data structures with strategic practice plans.',
        icon: <Eye className="text-yellow-400 w-8 h-8" />,
    },
];


export default function Home() {
    const profile=localStorage.getItem("user-profile") ? JSON.parse(localStorage.getItem("user-profile")) : null;
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
                className="text-center max-w-3xl mx-auto mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-100 mb-4">
                    Master LeetCode with AI Insights
                    <br className="hidden md:block" /> Every Submission, Smarter Than Before
                </h1>
                <p className="text-lg text-slate-400 mb-6">
                    Log in with your LeetCode account and get real-time AI analysis, personalized problem recommendations, and detailed performance metrics to supercharge your coding journey.
                </p>

                {!profile && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => (window.location.href = "/login")}
                        className="bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg "
                    >
                        Try Now
                    </motion.button>
                )}
            </motion.div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                    >
                        <div className="mb-4">{feature.icon}</div>
                        <h2 className="text-xl font-semibold text-blue-400 mb-2">{feature.title}</h2>
                        <p className="text-slate-300 text-sm">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </>
    );
}
