import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {API_BASE_URL} from "../pages/Login.page.jsx";

export function AiFeedbackPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const submission = location.state?.submission;

    const [aiResponse, setAiResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        if (!submission) return;

        const fetchAIResponse = async () => {
            setLoading(true);
            try {
                const res = await axios.post(`${API_BASE_URL}/get-response`, {

                    questionId: submission.questionId,
                    submission
                },{
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                setAiResponse(res.data); // Expects structured feedback object
            } catch (err) {
                console.error("API Error:", err);
                setAiResponse({
                    error: err.response?.data?.message || "Failed to get AI response.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchAIResponse().then(() => {
            console.log("Get AI Response:");
        }).catch(err => {
            console.error("Error:", err);
        });

    }, [submission]);

    const handleBackClick = () => {
        navigate("/dashboard");
    };

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

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

    return (
        <motion.div
            className="relative w-screen min-h-screen bg-gradient-to-br from-black via-slate-900 to-red-950 text-white overflow-auto pb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >

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
                        Back to Dashboard
                    </motion.button>

                    <motion.h1
                        className="text-4xl font-bold font-serif text-center bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        AI Code Analysis
                    </motion.h1>

                    <div className="w-[120px]"></div> {/* Spacer for centering */}
                </motion.div>

                {submission && (
                    <motion.div
                        className="backdrop-blur-sm bg-zinc-800/80 border border-zinc-700/50 rounded-3xl shadow-xl p-6 mb-8"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-semibold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {submission.title}
                        </h2>
                        <div className="flex flex-wrap gap-4 items-center">
                            <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                                submission.status === "Accepted"
                                    ? "bg-green-900/40 text-green-400 border border-green-700/50"
                                    : "bg-red-900/40 text-red-400 border border-red-700/50"
                            }`}>
                                {submission.status}
                            </span>
                            <span className="text-zinc-400">
                                Submitted: {submission.timestamp}
                            </span>
                        </div>
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            className="flex flex-col items-center justify-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key="loading"
                        >
                            <motion.div
                                className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                            <motion.p
                                className="text-blue-400 font-semibold mt-4 text-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                            >
                                Analyzing your code...
                            </motion.p>
                            <motion.p
                                className="text-zinc-500 text-center max-w-md mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                            >
                                Our AI is reviewing your submission to provide detailed feedback and suggestions for improvement.
                            </motion.p>
                        </motion.div>
                    ) : aiResponse?.error ? (
                        <motion.div
                            className="backdrop-blur-sm bg-red-900/30 border border-red-700/50 rounded-3xl p-8 text-center"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            key="error"
                        >
                            <motion.div
                                className="text-red-200 text-2xl mb-4"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                {aiResponse.error}
                            </motion.div>
                            <motion.button
                                onClick={handleBackClick}
                                className="bg-red-800 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg mt-4"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Return to Dashboard
                            </motion.button>
                        </motion.div>
                    ) : aiResponse ? (
                        <motion.div
                            className="backdrop-blur-lg bg-zinc-800/80 border border-zinc-700/50 rounded-3xl shadow-2xl overflow-hidden"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            key="response"
                        >
                            <motion.div
                                className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 flex flex-col md:flex-row justify-between items-center border-b border-zinc-700/50"
                                variants={itemVariants}
                            >
                                <h3 className="text-white text-xl mb-2 md:mb-0">
                                    Model: <span className="text-blue-400 font-semibold">{aiResponse?.llm || "N/A"}</span>
                                </h3>
                                <h3 className="text-white text-lg">
                                    Version: <span className="text-purple-400 font-semibold">{aiResponse?.responseVersion || "N/A"}</span>
                                </h3>
                            </motion.div>

                            <div className="p-6 space-y-4">
                                {/* User Intent Analysis */}
                                <motion.div
                                    className="rounded-2xl overflow-hidden"
                                    variants={itemVariants}
                                >
                                    <motion.button
                                        className="w-full bg-gradient-to-r from-blue-900/50 to-blue-800/50 hover:from-blue-800/50 hover:to-blue-700/50 p-4 text-left flex justify-between items-center"
                                        onClick={() => toggleSection('intent')}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <h2 className="text-xl font-bold text-white">User Intent Analysis</h2>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 transition-transform duration-300 ${activeSection === 'intent' ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.button>
                                    <AnimatePresence>
                                        {activeSection === 'intent' && (
                                            <motion.div
                                                className="bg-zinc-900/70 p-5 text-zinc-200"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {aiResponse.response?.UserIntentAnalysis || "No analysis available"}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Correctness Analysis */}
                                <motion.div
                                    className="rounded-2xl overflow-hidden"
                                    variants={itemVariants}
                                >
                                    <motion.button
                                        className="w-full bg-gradient-to-r from-green-900/50 to-green-800/50 hover:from-green-800/50 hover:to-green-700/50 p-4 text-left flex justify-between items-center"
                                        onClick={() => toggleSection('correctness')}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <h2 className="text-xl font-bold text-white">Correctness Analysis</h2>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 transition-transform duration-300 ${activeSection === 'correctness' ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.button>
                                    <AnimatePresence>
                                        {activeSection === 'correctness' && (
                                            <motion.div
                                                className="bg-zinc-900/70 p-5 text-zinc-200"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {aiResponse.response?.CorrectnessAnalysis || "No analysis available"}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Where You Went Wrong */}
                                <motion.div
                                    className="rounded-2xl overflow-hidden"
                                    variants={itemVariants}
                                >
                                    <motion.button
                                        className="w-full bg-gradient-to-r from-amber-900/50 to-amber-800/50 hover:from-amber-800/50 hover:to-amber-700/50 p-4 text-left flex justify-between items-center"
                                        onClick={() => toggleSection('wrong')}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <h2 className="text-xl font-bold text-white">Where You Went Wrong</h2>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 transition-transform duration-300 ${activeSection === 'wrong' ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.button>
                                    <AnimatePresence>
                                        {activeSection === 'wrong' && (
                                            <motion.div
                                                className="bg-zinc-900/70 p-5 text-zinc-200"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {aiResponse.response?.WhereWentWrong || "No analysis available"}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Bugs or Issues */}
                                <motion.div
                                    className="rounded-2xl overflow-hidden"
                                    variants={itemVariants}
                                >
                                    <motion.button
                                        className="w-full bg-gradient-to-r from-red-900/50 to-red-800/50 hover:from-red-800/50 hover:to-red-700/50 p-4 text-left flex justify-between items-center"
                                        onClick={() => toggleSection('bugs')}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <h2 className="text-xl font-bold text-white">Bugs or Issues</h2>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 transition-transform duration-300 ${activeSection === 'bugs' ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.button>
                                    <AnimatePresence>
                                        {activeSection === 'bugs' && (
                                            <motion.div
                                                className="bg-zinc-900/70 p-5 text-zinc-200"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {aiResponse.response?.BugsOrIssues?.length > 0 ? (
                                                    <div className="space-y-4">
                                                        {aiResponse.response.BugsOrIssues.map((item, index) => (
                                                            <motion.div
                                                                key={index}
                                                                className="bg-red-900/20 border border-red-700/30 rounded-xl p-4"
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: index * 0.1 }}
                                                            >
                                                                <p className="font-semibold text-red-300 mb-2">Issue: {item.Issue}</p>
                                                                <p className="text-green-300">Fix: {item.Fix}</p>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-green-400">No bugs found in your code!</p>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Time & Space Complexity */}
                                <motion.div
                                    className="rounded-2xl overflow-hidden"
                                    variants={itemVariants}
                                >
                                    <motion.button
                                        className="w-full bg-gradient-to-r from-purple-900/50 to-purple-800/50 hover:from-purple-800/50 hover:to-purple-700/50 p-4 text-left flex justify-between items-center"
                                        onClick={() => toggleSection('complexity')}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <h2 className="text-xl font-bold text-white">Time & Space Complexity</h2>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 transition-transform duration-300 ${activeSection === 'complexity' ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.button>
                                    <AnimatePresence>
                                        {activeSection === 'complexity' && (
                                            <motion.div
                                                className="bg-zinc-900/70 p-5 text-zinc-200"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ul className="space-y-2">
                                                    <motion.li
                                                        className="flex items-center"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                    >
                                                        <span className="bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full mr-3 font-mono">Time</span>
                                                        {aiResponse.response?.TimeSpaceComplexity?.TimeComplexity || "N/A"}
                                                    </motion.li>
                                                    <motion.li
                                                        className="flex items-center"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        <span className="bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full mr-3 font-mono">Space</span>
                                                        {aiResponse.response?.TimeSpaceComplexity?.SpaceComplexity || "N/A"}
                                                    </motion.li>
                                                    <motion.li
                                                        className="mt-4 pt-4 border-t border-zinc-700/50"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.3 }}
                                                    >
                                                        <span className="block text-purple-300 font-semibold mb-2">Analysis:</span>
                                                        {aiResponse.response?.TimeSpaceComplexity?.Analysis || "N/A"}
                                                    </motion.li>
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Alternate Solutions */}
                                <motion.div
                                    className="rounded-2xl overflow-hidden"
                                    variants={itemVariants}
                                >
                                    <motion.button
                                        className="w-full bg-gradient-to-r from-indigo-900/50 to-indigo-800/50 hover:from-indigo-800/50 hover:to-indigo-700/50 p-4 text-left flex justify-between items-center"
                                        onClick={() => toggleSection('alternate')}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <h2 className="text-xl font-bold text-white">Alternate Solutions</h2>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 transition-transform duration-300 ${activeSection === 'alternate' ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.button>
                                    <AnimatePresence>
                                        {activeSection === 'alternate' && (
                                            <motion.div
                                                className="bg-zinc-900/70 p-5 text-zinc-200"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {aiResponse.response?.AlternateSolutions?.length > 0 ? (
                                                    <div className="space-y-6">
                                                        {aiResponse.response.AlternateSolutions.map((alt, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                className="bg-indigo-900/20 border border-indigo-700/30 rounded-xl p-4"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: idx * 0.1 }}
                                                            >
                                                                <h3 className="text-indigo-300 font-semibold text-lg mb-2">Approach {idx + 1}</h3>
                                                                <p className="mb-2">{alt.Approach}</p>
                                                                <p className="mb-4 text-amber-300"><strong>When To Use:</strong> {alt.WhenToUse}</p>
                                                                <div>
                                                                    <h4 className="text-indigo-300 font-semibold mb-2">Code:</h4>
                                                                    <motion.pre
                                                                        className="bg-zinc-950 text-green-300 p-4 rounded-xl overflow-x-auto mt-2 border border-zinc-800"
                                                                        whileHover={{ scale: 1.01 }}
                                                                    >
                                                                        <code className="whitespace-pre-wrap">{alt.code}</code>
                                                                    </motion.pre>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p>No alternate solutions provided.</p>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Key Concepts To Learn */}
                                <motion.div
                                    className="rounded-2xl overflow-hidden"
                                    variants={itemVariants}
                                >
                                    <motion.button
                                        className="w-full bg-gradient-to-r from-cyan-900/50 to-cyan-800/50 hover:from-cyan-800/50 hover:to-cyan-700/50 p-4 text-left flex justify-between items-center"
                                        onClick={() => toggleSection('concepts')}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <h2 className="text-xl font-bold text-white">Key Concepts To Learn</h2>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 transition-transform duration-300 ${activeSection === 'concepts' ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.button>
                                    <AnimatePresence>
                                        {activeSection === 'concepts' && (
                                            <motion.div
                                                className="bg-zinc-900/70 p-5 text-zinc-200"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {aiResponse.response?.KeyConceptsToLearn?.length > 0 ? (
                                                    <ul className="space-y-2">
                                                        {aiResponse.response.KeyConceptsToLearn.map((concept, idx) => (
                                                            <motion.li
                                                                key={idx}
                                                                className="bg-cyan-900/20 border border-cyan-700/30 rounded-lg p-3 flex items-start"
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: idx * 0.1 }}
                                                                whileHover={{ x: 5 }}
                                                            >
                                                                <span className="bg-cyan-800 text-cyan-200 w-6 h-6 rounded-full flex items-center justify-center mr-3 shrink-0">
                                                                    {idx + 1}
                                                                </span>
                                                                {concept}
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No key concepts provided.</p>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Scores */}
                                <motion.div
                                    className="rounded-2xl overflow-hidden"
                                    variants={itemVariants}
                                >
                                    <motion.button
                                        className="w-full bg-gradient-to-r from-emerald-900/50 to-emerald-800/50 hover:from-emerald-800/50 hover:to-emerald-700/50 p-4 text-left flex justify-between items-center"
                                        onClick={() => toggleSection('scores')}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <h2 className="text-xl font-bold text-white">Performance Scores</h2>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 transition-transform duration-300 ${activeSection === 'scores' ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.button>
                                    <AnimatePresence>
                                        {activeSection === 'scores' && (
                                            <motion.div
                                                className="bg-zinc-900/70 p-5 text-zinc-200"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <motion.div
                                                        className="bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-4 flex flex-col items-center"
                                                        initial={{ scale: 0.9, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ delay: 0.1 }}
                                                    >
                                                        <span className="text-emerald-300 text-sm uppercase tracking-wider mb-1">Readability</span>
                                                        <span className="text-4xl font-bold text-white">{aiResponse.response?.ImprovementPlan?.Score?.Readability || "N/A"}</span>
                                                    </motion.div>
                                                    <motion.div
                                                        className="bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-4 flex flex-col items-center"
                                                        initial={{ scale: 0.9, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        <span className="text-emerald-300 text-sm uppercase tracking-wider mb-1">Efficiency</span>
                                                        <span className="text-4xl font-bold text-white">{aiResponse.response?.ImprovementPlan?.Score?.Efficiency || "N/A"}</span>
                                                    </motion.div>
                                                    <motion.div
                                                        className="bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-4 flex flex-col items-center"
                                                        initial={{ scale: 0.9, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ delay: 0.3 }}
                                                    >
                                                        <span className="text-emerald-300 text-sm uppercase tracking-wider mb-1">Correctness</span>
                                                        <span className="text-4xl font-bold text-white">{aiResponse.response?.ImprovementPlan?.Score?.Correctness || "N/A"}</span>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Reflective Feedback */}
                                <motion.div
                                    className="rounded-2xl overflow-hidden"
                                    variants={itemVariants}
                                >
                                    <motion.button
                                        className="w-full bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 hover:from-yellow-800/50 hover:to-yellow-700/50 p-4 text-left flex justify-between items-center"
                                        onClick={() => toggleSection('feedback')}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <h2 className="text-xl font-bold text-white">Reflective Feedback</h2>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 transition-transform duration-300 ${activeSection === 'feedback' ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.button>
                                    <AnimatePresence>
                                        {activeSection === 'feedback' && (
                                            <motion.div
                                                className="bg-zinc-900/70 p-5 text-zinc-200"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <motion.div
                                                    className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-5"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                    </svg>
                                                    <div className="text-zinc-200 leading-relaxed">
                                                        {aiResponse.response?.ReflectiveFeedback || "No reflective feedback available."}
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>

                            <motion.div
                                className="p-6 border-t border-zinc-700/50 flex justify-center"
                                variants={itemVariants}
                            >
                                <motion.button
                                    onClick={handleBackClick}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-blue-500 hover:to-purple-500 flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Return to Dashboard
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

