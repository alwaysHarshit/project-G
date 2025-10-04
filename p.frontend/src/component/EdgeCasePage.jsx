import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {ArrowLeft} from "lucide-react";

function EdgeCasePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const submission = location.state?.submission;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const handleBackClick = () => {
        navigate("/dashboard");
    };


    // useEffect(() => {
    //     const fetchEdgeCases = async () => {
    //         setLoading(true);
    //         try {
    //             const res = await axios.post(`${API_BASE_URL}/get-edgesCases`, {
    //                 questionId: submission.questionId,
    //                 sessionId,
    //                 submission
    //             });
    //             setData(res.data); // Expects structured feedback object
    //         } catch (err) {
    //             console.error("Edge cases try catch error:", err);
    //             setError({
    //                 error: err.response?.data?.message || "Failed to get edge cases",
    //             });
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchEdgeCases().then(() => {
    //         console.log("Get AI Response:");
    //     }).catch(err => {
    //         console.error("Error:", err);
    //     });
    // },[submission, sessionId])

    useEffect(() => {
        setTimeout(() => {
            if (submission) {
                setData({
                    problemStatement: submission.problemStatement || "No problem statement provided.",
                    userCode: submission.userCode || "No code provided.",
                    edgeCases: [
                        {
                            caseName: "All Negative Numbers",
                            input: "[-3, -5, -2, -8]",
                            expectedOutput: "-2",
                            explanation: "When all numbers are negative, the maximum subarray is the single least negative number.",
                            approach: "Think about whether your algorithm allows empty subarrays or forces picking at least one number.",
                            difficulty: "Medium",
                            tags: ["Boundary", "Negative Values"],
                            gotchas: "Beginners often return 0 instead of the maximum negative value."
                        },
                        {
                            caseName: "Single Element Array",
                            input: "[42]",
                            expectedOutput: "42",
                            explanation: "Handles smallest possible array length correctly.",
                            approach: "Always check the smallest input size handling.",
                            difficulty: "Easy",
                            tags: ["Base Case", "Minimum Size"],
                            gotchas: "Forgetting to initialize max with nums[0] causes undefined behavior."
                        },
                        {
                            caseName: "Large Mix of Positives & Negatives",
                            input: "[1000, -500, 200, -300, 700]",
                            expectedOutput: "1100",
                            explanation: "Tests handling transitions between positive and negative segments.",
                            approach: "Ensure negatives don’t cause premature reset of sums.",
                            difficulty: "Hard",
                            tags: ["Mixed Values", "Optimization"],
                            gotchas: "Resetting sum too early may miss the optimal subarray."
                        }
                    ]
                });
                setLoading(false);
            } else {
                setError("No submission data available.");
                setLoading(false);
            }
        }, 1000);
    }, [submission]);


    return (
        <motion.div
            className="relative w-screen min-h-screen bg-gradient-to-br from-black via-slate-900 to-red-950 text-white overflow-auto pb-12"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
        >
            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    className="flex justify-between items-center mb-6"
                    initial={{y: -20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.2}}
                >
                    <motion.button
                        onClick={handleBackClick}
                        className="bg-zinc-800/80 backdrop-blur-sm text-zinc-300 px-4 py-2 rounded-xl flex items-center shadow-lg border border-zinc-700/50 hover:bg-zinc-700/80 transition-colors"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        <ArrowLeft className="h-5 w-5 mr-2"/>
                        Back to Dashboard
                    </motion.button>

                    <motion.h1
                        className="text-4xl font-bold font-serif text-center bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent"
                        initial={{y: -20, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{delay: 0.3}}
                    >
                        Edge Case Generation
                    </motion.h1>

                    <div className="w-[180px]"></div>
                </motion.div>

                {/* LeetCode-like Split Layout */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.4}}
                >
                    {/* Problem Statement */}
                    <div
                        className="backdrop-blur-sm bg-zinc-800/80 border border-zinc-700/50 rounded-2xl shadow-xl p-6">
                        {loading && <p className="text-zinc-400">⏳ Loading problem...</p>}
                        {error && <p className="text-red-400 font-semibold">❌ {error}</p>}
                        {data && (
                            <>
                                <h2 className="text-xl font-bold mb-3">📜 Problem Statement</h2>
                                <pre className="bg-zinc-900/60 p-4 rounded whitespace-pre-wrap">
                                    {data.problemStatement}
                                </pre>
                            </>
                        )}
                    </div>

                    {/* User Code */}
                    <div
                        className="backdrop-blur-sm bg-zinc-800/80 border border-zinc-700/50 rounded-2xl shadow-xl p-6">
                        {loading && <p className="text-zinc-400">⏳ Loading code...</p>}
                        {error && <p className="text-red-400 font-semibold">❌ {error}</p>}
                        {data && (
                            <>
                                <h2 className="text-xl font-bold mb-3">💻 User Code</h2>
                                <pre className="bg-zinc-900/60 p-4 rounded whitespace-pre-wrap overflow-x-auto">
                                    {data.userCode}
                                </pre>
                            </>
                        )}
                    </div>
                </motion.div>

                {/* Edge Cases Section */}
                {data && (
                    <motion.div
                        className="bg-zinc-800/80 border border-zinc-700/50 rounded-2xl shadow-md p-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold mb-6">🧪 Tricky Edge Cases</h2>
                        <div className="space-y-6">
                            {data.edgeCases.map((edge, idx) => (
                                <div key={idx} className="pb-4 border-b border-zinc-700/40 last:border-0">
                                    <h3 className="text-lg font-semibold text-emerald-300">
                                        {edge.caseName} <span className="text-sm text-zinc-400">({edge.difficulty})</span>
                                    </h3>

                                    <p><strong>Input:</strong> {edge.input}</p>
                                    <p><strong>Expected Output:</strong> {edge.expectedOutput}</p>
                                    <p><strong>Explanation:</strong> {edge.explanation}</p>
                                    <p><strong>Approach:</strong> {edge.approach}</p>

                                    {edge.tags && (
                                        <p className="text-sm text-zinc-400">
                                            <strong>Tags:</strong> {edge.tags.join(", ")}
                                        </p>
                                    )}

                                    {edge.gotchas && (
                                        <p className="text-sm text-red-400 italic mt-1">
                                            ⚠️ Common Mistake: {edge.gotchas}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

            </div>
        </motion.div>
    );
}

export default EdgeCasePage;
