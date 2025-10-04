// src/pages/HomePage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Rocket, ClipboardCheck, ListOrdered, Terminal, BarChart2 } from 'lucide-react';

const features = [
    {
        title: 'Modern UI for Codeforces',
        description: 'Experience Codeforces in a sleek, intuitive, and responsive interface.',
        icon: <Rocket className="text-blue-400 w-8 h-8" />,
    },
    {
        title: 'Write Code in Modern Editor',
        description: 'Use a powerful editor with syntax highlighting and auto-save.',
        icon: <Code className="text-blue-400 w-8 h-8" />,
    },
    {
        title: 'Direct Codeforces Submission',
        description: 'Submit your solutions directly to Codeforces using your session.',
        icon: <Terminal className="text-blue-400 w-8 h-8" />,
    },
    {
        title: 'Sorted Problem Lists',
        description: 'Browse problems by difficulty, tags, and recent trends.',
        icon: <ListOrdered className="text-blue-400 w-8 h-8" />,
    },
    {
        title: 'Track Your Submissions',
        description: 'View your recent submissions with verdicts and details.',
        icon: <ClipboardCheck className="text-blue-400 w-8 h-8" />,
    },
    {
        title: 'Smart Submission Analytics',
        description: 'Analyze your submission trends, success rate, and identify weak areas.',
        icon: <BarChart2 className="text-blue-400 w-8 h-8" />,
    },
];

export default function Home() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
                className="text-center max-w-3xl mx-auto mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-slate-100 mb-4">
                    Fixing Codeforces UI/UX
                    <br className="hidden md:block" /> One Submission at a Time
                </h1>
                <p className="text-lg text-slate-400 mb-6">
                    Log in with your Codeforces account and experience a modern, focused problem-solving environment.
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => (window.location.href = "/login")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg"
                >
                    Try Now
                </motion.button>
            </motion.div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
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
