import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function HowToGetSessionId() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 10 }
        }
    };

    const handleBackClick = () => {
        navigate("/");
    };

    return (
        <motion.div 
            className="relative w-screen h-screen overflow-auto bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                    className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-700/10 blur-3xl"
                    animate={{ 
                        x: [0, -30, 0], 
                        y: [0, 20, 0],
                        scale: [1, 1.1, 1] 
                    }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 20,
                        ease: "easeInOut" 
                    }}
                />
                <motion.div 
                    className="absolute -bottom-20 left-20 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl"
                    animate={{ 
                        x: [0, 20, 0], 
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1] 
                    }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 25,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                <motion.div
                    className="flex justify-between items-center mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
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
                        Back to Login
                    </motion.button>
                    
                    <motion.h1 
                        className="text-4xl font-bold font-serif text-center bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        How to Get Your Session ID
                    </motion.h1>
                    
                    <div className="w-[120px]"></div> {/* Spacer for centering */}
                </motion.div>

                <motion.div 
                    className="w-full mx-auto p-8 backdrop-blur-lg bg-zinc-800/80 border border-zinc-700/50 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div 
                        className="md:w-1/2 flex justify-center items-center"
                        variants={itemVariants}
                    >
                        <motion.img
                            src="/assets/screenshot.png"
                            alt="Session ID Screenshot"
                            className="w-full h-auto rounded-xl shadow-lg border border-zinc-600/50"
                            onError={(e) => {
                                e.target.src = "/placeholder.png";
                                e.target.alt = "Image not found";
                            }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        />
                    </motion.div>
                    
                    <motion.div className="md:w-1/2">
                        <motion.h2 
                            className="text-2xl font-semibold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                            variants={itemVariants}
                        >
                            Follow these steps:
                        </motion.h2>
                        
                        <motion.ol className="space-y-4 text-zinc-200">
                            {[
                                {
                                    title: "Open LeetCode",
                                    content: <>Go to <a href="https://leetcode.com" className="text-blue-400 hover:text-blue-300 transition-colors underline" target="_blank" rel="noopener noreferrer">leetcode.com</a> and log into your account.</>
                                },
                                {
                                    title: "Open Developer Tools",
                                    content: <>Press <kbd className="px-2 py-1 bg-zinc-700 rounded-md text-zinc-300 shadow-inner">F12</kbd> or right-click anywhere on the page and choose <em>"Inspect"</em>.</>
                                },
                                {
                                    title: "Go to the Application tab",
                                    content: <>Click the <span className="font-semibold text-purple-400">Application</span> tab at the top of DevTools.</>
                                },
                                {
                                    title: "Reveal hidden tabs",
                                    content: <>If you don't see "Application", click the <span className="font-semibold text-purple-400">»</span> icon to find it.</>
                                },
                                {
                                    title: "Find Cookies section",
                                    content: <>In the left sidebar under <span className="font-semibold text-purple-400">Storage</span>, expand <span className="font-semibold text-purple-400">Cookies</span>.</>
                                },
                                {
                                    title: "Select the correct domain",
                                    content: <>Click on <span className="font-semibold text-purple-400">https://leetcode.com</span>.</>
                                },
                                {
                                    title: "Locate LEETCODE_SESSION",
                                    content: <>In the list of cookies, find the row named <span className="font-semibold text-purple-400">LEETCODE_SESSION</span>.</>
                                },
                                {
                                    title: "Copy the session value",
                                    content: <>Copy the content in the <span className="font-semibold text-purple-400">Value</span> column — it's a long string.</>
                                }
                            ].map((step, index) => (
                                <motion.li 
                                    key={index}
                                    className="bg-zinc-700/30 backdrop-blur-sm p-4 rounded-xl border border-zinc-600/30 hover:border-blue-500/30 transition-colors"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.01, x: 5 }}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white w-8 h-8 rounded-full font-bold shrink-0">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <h3 className="font-bold text-white mb-1">{step.title}</h3>
                                            <p className="text-zinc-300">{step.content}</p>
                                        </div>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ol>
                        
                        <motion.div 
                            className="mt-8 flex justify-center"
                            variants={itemVariants}
                        >
                            <motion.button
                                onClick={handleBackClick}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-blue-500 hover:to-purple-500 flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                </svg>
                                Return to Login
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}