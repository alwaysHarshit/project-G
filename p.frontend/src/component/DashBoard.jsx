import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Sparkles, Beaker } from "lucide-react";
import { API_BASE_URL } from "../pages/Login.page.jsx";
import axios from "axios";

export default function DashBoard() {
    // --- Hooks and State ---
    const navigate = useNavigate();
    const profile = localStorage.getItem("user-profile") ? JSON.parse(localStorage.getItem("user-profile")) : {};

    const [recentSubmissions, setRecentSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shouldRefetch, setShouldRefetch] = useState(false);

    // Fetch recent submissions
    useEffect(() => {
        const cached = sessionStorage.getItem("recentSubmissions");
        if (cached) {
            setRecentSubmissions(JSON.parse(cached));
            setLoading(false);
            return;
        }

        const fetchSubmissions = async () => {
            setLoading(true);
            console.log(localStorage.getItem("token"))
            try {
                const response = await axios.post(`${API_BASE_URL}/recent-submissions`, {},{
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                        validateStatus: () => true // ⬅️ prevents axios from throwing automatically error in catch block
                    }
                );
                //console.log(response.data);

                //if leetcode is expired
                if (response.status === 403 && response.data?.forceLogout) {
                    alert(response.data.message);
                    // 1. Clear auth data
                    localStorage.clear()
                    sessionStorage.clear();

                    // 2. Redirect to login
                    window.location.href = "/login";
                     return;
                }
                setRecentSubmissions(response.data);
                sessionStorage.setItem("recentSubmissions", JSON.stringify(response.data));
            } catch (error) {
                console.error("Error fetching submissions:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [shouldRefetch]);

    // --- Handlers ---
    const handleRefresh = () => {
        sessionStorage.removeItem("recentSubmissions");
        setShouldRefetch((prev) => !prev);
    };

    const handleAIAnalyze = (submission) => {
        console.log("AI Analyze clicked:", submission);
        navigate("/ai-analysis", { state: { submission } });
    };

    const generateCases = (submission) => {
        console.log("Edge Cases clicked:", submission);
        navigate("/edge-cases", { state: { submission } });
    };

    // --- Render ---
    return (
        <motion.div
        >
            <h1>
                <div className={"flex justify-center text-2xl pb-8"}>Welcome Back 👋<span className={"text-blue-600 text-3xl font-mono"}>{profile.realName}</span></div>

            </h1>
            <motion.div
                className="relative z-10 w-[98%] border border-zinc-700/50 rounded-3xl shadow-xl p-8 overflow-y-auto max-h-[78vh]"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold font-serif mb-4 md:mb-0 text-center text-white bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        Recent Submissions
                    </h2>
                    <motion.button
                        onClick={handleRefresh}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:from-green-400 hover:to-emerald-500 cursor-pointer flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Refresh
                    </motion.button>
                </div>

                {/* Submissions */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col justify-center items-center space-y-4 p-12"
                        >
                            <motion.div
                                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                            <span className="text-zinc-300">Loading your submissions...</span>
                        </motion.div>
                    ) : recentSubmissions.length === 0 ? (
                        <motion.p
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-zinc-400 text-center py-12 text-lg"
                        >
                            No submissions found.
                        </motion.p>
                    ) : (
                        <ul key="submissions" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recentSubmissions.map((submission, index) => (
                                <motion.li
                                    key={submission.submissionID || index}
                                    className="p-5 border border-zinc-700/50 bg-zinc-700/30 backdrop-blur-sm rounded-xl flex flex-col gap-4 hover:border-blue-500/50 transition-colors"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.1 * index } }}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="text-blue-400 text-lg font-medium hover:text-blue-300 transition-colors">
                                            {submission.titleSlug}
                                            <p className="text-sm text-zinc-400 mt-1">Submitted: {submission.timestamp}</p>
                                            <p className="text-sm text-zinc-400 mt-1">Language: {submission.language}</p>
                                        </div>
                                        <span
                                            className={`text-sm font-bold px-3 py-1 rounded-full ${
                                                submission.status === "Accepted"
                                                    ? "bg-green-900/40 text-green-400 border border-green-700/50"
                                                    : "bg-red-900/40 text-red-400 border border-red-700/50"
                                            }`}
                                        >
                                        {submission.status}
                                    </span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {/* Primary Button */}
                                        <motion.button
                                            className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:from-blue-500 hover:to-indigo-500 w-max cursor-pointer flex items-center"
                                            onClick={() => handleAIAnalyze(submission)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Sparkles className="h-5 w-5 mr-2" />
                                            AI Analyze
                                        </motion.button>

                                        {/* Secondary Button */}
                                        <motion.button
                                            className="mt-2 flex items-center bg-transparent border border-purple-600 text-purple-500 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-purple-500 hover:text-white transition-colors w-max cursor-pointer"
                                            onClick={() => generateCases(submission)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Beaker className="h-5 w-5 mr-2" />
                                            Edge Cases
                                        </motion.button>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>

    );
}
