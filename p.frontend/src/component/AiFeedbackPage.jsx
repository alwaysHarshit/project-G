import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../pages/Login.page.jsx";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { FaLightbulb, FaExclamationTriangle, FaClock, FaMemory, FaCode, FaCheckCircle, FaBrain, FaStar } from 'react-icons/fa';

export function AiFeedbackPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const submission = location.state?.submission;

    const [aiResponse, setAiResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!submission) return;

        const fetchAIResponse = async () => {
            setLoading(true);
            try {
                const res = await axios.post(`${API_BASE_URL}/get-response`, {
                    submission
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setAiResponse(res.data);
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

    const Badge = ({ text, color = 'blue' }) => {
        const colorClasses = {
            blue: 'bg-blue-900/50 text-blue-300 border-blue-500',
            red: 'bg-red-900/50 text-red-300 border-red-500',
            green: 'bg-green-900/50 text-green-300 border-green-500',
            yellow: 'bg-yellow-900/50 text-yellow-300 border-yellow-500',
            purple: 'bg-purple-900/50 text-purple-300 border-purple-500',
            cyan: 'bg-cyan-900/50 text-cyan-300 border-cyan-500',
        };
        return (
            <span className={`inline-block px-3 py-1 text-sm font-mono rounded-full border ${colorClasses[color]}`}>
                {text}
            </span>
        );
    };

    const Card = ({ title, icon, children }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-700/30 border border-zinc-700/50 backdrop-blur-sm rounded-xl mb-4  hover:border-blue-500/50 transition-colors"
            whileHover={{ scale: 1.03 }}
        >
            <div className="flex items-center p-4 border-b border-zinc-700/50">
                {icon}
                <h2 className="text-lg font-semibold text-gray-200 ml-3">{title}</h2>
            </div>
            <div className="p-5">{children}</div>
        </motion.div>
    );

    return (
        <motion.div
            className="min-h-screen bg-black text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="container mx-auto px-4 py-6">
                <motion.div
                    className="flex justify-between items-center mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <motion.button
                        onClick={handleBackClick}
                        className="bg-zinc-800/60 text-zinc-300 px-4 py-2 rounded-lg flex items-center border border-zinc-700/50 hover:bg-zinc-700/60 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </motion.button>

                    <h1 className="text-3xl font-semibold font-serif text-center text-white bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        AI Code Analysis
                    </h1>

                    <div className="w-[140px]"></div>
                </motion.div>

                {submission && (
                    <motion.div
                        className="bg-zinc-700/30 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-3 mb-6 hover:border-blue-500/50 transition-colors"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.01 }}
                    >
                        <h2 className="text-xl font-semibold text-blue-400 mb-2 hover:text-blue-300 transition-colors">
                            {submission.titleSlug || submission.title}
                        </h2>
                        <div className="flex flex-wrap gap-3 items-center">
                            <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                                submission.status === "Accepted"
                                    ? "bg-green-900/40 text-green-400 border border-green-700/50"
                                    : "bg-red-900/40 text-red-400 border border-red-700/50"
                            }`}>
                                {submission.status}
                            </span>
                            <span className="text-zinc-400 text-sm">
                                Submitted: {submission.timestamp}
                            </span>
                            {submission.language && (
                                <span className="text-zinc-400 text-sm">
                                    Language: {submission.language}
                                </span>
                            )}
                        </div>
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            className="flex flex-col items-center justify-center py-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key="loading"
                        >
                            <motion.div
                                className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                            <p className="text-blue-400 font-medium mt-4">Analyzing your code...</p>
                        </motion.div>
                    ) : aiResponse?.error ? (
                        <motion.div
                            className="bg-red-900/20 border border-red-700/50 rounded-lg p-6 text-center"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key="error"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-red-200">{aiResponse.error}</p>
                        </motion.div>
                    ) : aiResponse ? (() => {
                        // Safely extract data with fallbacks for missing fields
                        const {
                            MySubmissionAnalysis = {},
                            NewApproachesAndOptimizations = {},
                        } = aiResponse || {};

                        return (
                            <motion.div
                                className="relative z-10 w-[98%] border border-zinc-700/50 rounded-3xl shadow-xl p-8 overflow-y-auto max-h-[75vh] mx-auto space-y-6"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
                            >
                                {/* Summary */}
                                {MySubmissionAnalysis?.Summary && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-blue-900/20 border border-blue-700/50 text-blue-200 px-4 py-3 rounded-lg"
                                    >
                                        <strong className="font-semibold">Summary: </strong>
                                        <span>{MySubmissionAnalysis.Summary}</span>
                                    </motion.div>
                                )}

                                {/* My Submission Analysis */}
                                {MySubmissionAnalysis?.ApproachUsed && (
                                    <Card title="Your Submission Analysis" icon={<FaLightbulb className="text-yellow-400" />}>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="font-medium text-gray-200 mb-2">Approach Used:</h3>
                                                <Badge text={MySubmissionAnalysis.ApproachUsed.Name || "Not specified"} color="blue" />
                                                <p className="mt-2 text-gray-400 text-sm">{MySubmissionAnalysis.ApproachUsed.Rationale || "No rationale provided."}</p>
                                            </div>
                                        </div>
                                    </Card>
                                )}

                                {/* Correctness Analysis (Conditional) */}
                                {MySubmissionAnalysis?.CorrectnessAnalysis?.Issues?.length > 0 && (
                                    <Card title="Issues & Corrections" icon={<FaExclamationTriangle className="text-red-400" />}>
                                        <div className="space-y-4">
                                            {MySubmissionAnalysis.CorrectnessAnalysis.Summary && (
                                                <p className="text-gray-400">{MySubmissionAnalysis.CorrectnessAnalysis.Summary}</p>
                                            )}
                                            <div className="space-y-3">
                                                {MySubmissionAnalysis.CorrectnessAnalysis.Issues.map((issue, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                                        className="bg-zinc-700/30 p-4 border border-red-800/50 rounded-xl"
                                                    >
                                                        <Badge text={issue.Category || "Issue"} color="red" />
                                                        <p className="mt-2 text-red-300 font-medium">{issue.Description || "No description provided."}</p>
                                                        {issue.FixHint && (
                                                            <div className="mt-3">
                                                                <h4 className="text-green-400 font-medium mb-1">Fix Hint:</h4>
                                                                <p className="text-gray-400 text-sm">{issue.FixHint}</p>
                                                            </div>
                                                        )}
                                                        {issue.FailingTestCase && (
                                                            <div className="mt-3">
                                                                <h4 className="text-gray-100 font-medium mb-1">Failing Test:</h4>
                                                                <pre className="bg-black/30 p-2 rounded text-sm text-gray-300">{issue.FailingTestCase}</pre>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>
                                )}

                                {/* Performance Analysis */}
                                {MySubmissionAnalysis?.PerformanceAnalysis?.TimeComplexity && MySubmissionAnalysis?.PerformanceAnalysis?.SpaceComplexity && (
                                    <Card title="Performance Analysis" icon={<FaClock className="text-cyan-400" />}>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-zinc-700/30 p-4 rounded-xl border border-zinc-700/50 hover:border-cyan-500/50 transition-colors">
                                                <div className="flex items-center mb-2">
                                                    <FaClock className="text-cyan-400 mr-2" />
                                                    <h3 className="font-medium text-gray-100">Time Complexity</h3>
                                                </div>
                                                <p className="font-mono text-xl text-cyan-300 mb-2">{MySubmissionAnalysis.PerformanceAnalysis.TimeComplexity.BigO || "O(?)"}</p>
                                                <p className="text-gray-400 text-sm">{MySubmissionAnalysis.PerformanceAnalysis.TimeComplexity.Reasoning || "No reasoning provided."}</p>
                                            </div>
                                            <div className="bg-zinc-700/30 p-4 rounded-xl border border-zinc-700/50 hover:border-purple-500/50 transition-colors">
                                                <div className="flex items-center mb-2">
                                                    <FaMemory className="text-purple-400 mr-2" />
                                                    <h3 className="font-medium text-gray-100">Space Complexity</h3>
                                                </div>
                                                <p className="font-mono text-xl text-purple-300 mb-2">{MySubmissionAnalysis.PerformanceAnalysis.SpaceComplexity.BigO || "O(?)"}</p>
                                                <p className="text-gray-400 text-sm">{MySubmissionAnalysis.PerformanceAnalysis.SpaceComplexity.Reasoning || "No reasoning provided."}</p>
                                            </div>
                                        </div>
                                    </Card>
                                )}

                                {/* Problem Understanding */}
                                {NewApproachesAndOptimizations?.ProblemUnderstanding && (
                                    <Card title="Problem Understanding" icon={<FaBrain className="text-indigo-400" />}>
                                        <div className="space-y-4">
                                            {NewApproachesAndOptimizations.ProblemUnderstanding.Decoding && (
                                                <div>
                                                    <h3 className="font-medium text-gray-100 mb-2">Problem Decoding</h3>
                                                    <p className="text-gray-400 text-sm border-l-2 border-indigo-500/50 pl-3">{NewApproachesAndOptimizations.ProblemUnderstanding.Decoding}</p>
                                                </div>
                                            )}
                                            {NewApproachesAndOptimizations.ProblemUnderstanding.InitialIntuition && (
                                                <div>
                                                    <h3 className="font-medium text-gray-100 mb-2">Initial Intuition</h3>
                                                    <p className="text-gray-400 text-sm border-l-2 border-indigo-500/50 pl-3">{NewApproachesAndOptimizations.ProblemUnderstanding.InitialIntuition}</p>
                                                </div>
                                            )}
                                            {NewApproachesAndOptimizations.ProblemUnderstanding.PatternRecognition && (
                                                <div>
                                                    <h3 className="font-medium text-gray-100 mb-2">Pattern Recognition</h3>
                                                    <p className="text-gray-400 text-sm border-l-2 border-indigo-500/50 pl-3">{NewApproachesAndOptimizations.ProblemUnderstanding.PatternRecognition}</p>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                )}

                                {/* Approach Development */}
                                {NewApproachesAndOptimizations?.ApproachDevelopment && (
                                    <Card title="Approach Development" icon={<FaCode className="text-orange-400" />}>
                                        <div className="space-y-4">
                                            {NewApproachesAndOptimizations.ApproachDevelopment.SubproblemDecomposition && (
                                                <div>
                                                    <h3 className="font-medium text-gray-100 mb-2">Subproblem Decomposition</h3>
                                                    <p className="text-gray-400 text-sm">{NewApproachesAndOptimizations.ApproachDevelopment.SubproblemDecomposition}</p>
                                                </div>
                                            )}
                                            {NewApproachesAndOptimizations.ApproachDevelopment.RefinementProcess && (
                                                <div>
                                                    <h3 className="font-medium text-gray-100 mb-2">Refinement Process</h3>
                                                    <p className="text-gray-400 text-sm">{NewApproachesAndOptimizations.ApproachDevelopment.RefinementProcess}</p>
                                                </div>
                                            )}
                                            {NewApproachesAndOptimizations.ApproachDevelopment.EdgeCaseHandling && (
                                                <div>
                                                    <h3 className="font-medium text-gray-100 mb-2">Edge Case Handling</h3>
                                                    <p className="text-gray-400 text-sm">{NewApproachesAndOptimizations.ApproachDevelopment.EdgeCaseHandling}</p>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                )}

                                {/* Optimized Solution */}
                                {NewApproachesAndOptimizations?.OptimizationAndValidation?.OptimizedSolution && (
                                    <Card title="Optimized Solution" icon={<FaCheckCircle className="text-green-400" />}>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-green-400 mb-2">
                                                    {NewApproachesAndOptimizations.OptimizationAndValidation.OptimizedSolution.Name || "Optimized Approach"}
                                                </h3>
                                                
                                                {NewApproachesAndOptimizations.OptimizationAndValidation.ComplexityAnalysis && (
                                                    <div className="flex flex-wrap gap-3 mb-3">
                                                        {NewApproachesAndOptimizations.OptimizationAndValidation.ComplexityAnalysis.Time && (
                                                            <Badge text={`Time: ${NewApproachesAndOptimizations.OptimizationAndValidation.ComplexityAnalysis.Time}`} color="cyan" />
                                                        )}
                                                        {NewApproachesAndOptimizations.OptimizationAndValidation.ComplexityAnalysis.Space && (
                                                            <Badge text={`Space: ${NewApproachesAndOptimizations.OptimizationAndValidation.ComplexityAnalysis.Space}`} color="purple" />
                                                        )}
                                                    </div>
                                                )}
                                                
                                                {NewApproachesAndOptimizations.OptimizationAndValidation.OptimizedSolution.WhyBetter && (
                                                    <p className="text-gray-400 mb-4">{NewApproachesAndOptimizations.OptimizationAndValidation.OptimizedSolution.WhyBetter}</p>
                                                )}
                                                
                                                {NewApproachesAndOptimizations.OptimizationAndValidation.ComplexityAnalysis?.Reasoning && (
                                                    <p className="text-gray-400 mb-4">{NewApproachesAndOptimizations.OptimizationAndValidation.ComplexityAnalysis.Reasoning}</p>
                                                )}
                                            </div>
                                            
                                            {NewApproachesAndOptimizations.OptimizationAndValidation.OptimizedSolution.CodeSnippet && (
                                                <div>
                                                    <h4 className="font-medium text-gray-100 mb-2">Code Snippet:</h4>
                                                    <SyntaxHighlighter
                                                        language="java"
                                                        customStyle={{
                                                            fontSize: '14px'
                                                        }}
                                                    >
                                                        {NewApproachesAndOptimizations.OptimizationAndValidation.OptimizedSolution.CodeSnippet}
                                                    </SyntaxHighlighter>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                )}

                                {/* Key Insights */}
                                {NewApproachesAndOptimizations?.InsightsAndNextSteps && (
                                    <Card title="Key Insights & Next Steps" icon={<FaStar className="text-pink-400" />}>
                                        <div className="space-y-4">
                                            {NewApproachesAndOptimizations.InsightsAndNextSteps.KeyLearning && (
                                                <div>
                                                    <h3 className="font-medium text-gray-100 mb-2">Key Learning</h3>
                                                    <p className="text-gray-400 text-sm">{NewApproachesAndOptimizations.InsightsAndNextSteps.KeyLearning}</p>
                                                </div>
                                            )}
                                            {NewApproachesAndOptimizations.InsightsAndNextSteps.BetterThinking && (
                                                <div>
                                                    <h3 className="font-medium text-gray-100 mb-2">Better Thinking</h3>
                                                    <p className="text-gray-400 text-sm">{NewApproachesAndOptimizations.InsightsAndNextSteps.BetterThinking}</p>
                                                </div>
                                            )}
                                            {NewApproachesAndOptimizations.InsightsAndNextSteps.NextFocus?.length > 0 && (
                                                <div>
                                                    <h3 className="font-medium text-gray-100 mb-2">Next Focus Areas</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {NewApproachesAndOptimizations.InsightsAndNextSteps.NextFocus.map((focus, index) => (
                                                            <Badge key={index} text={focus} color="yellow" />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                )}
                            </motion.div>
                        );
                    })() : null}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}