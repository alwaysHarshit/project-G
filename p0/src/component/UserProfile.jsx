import {useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";

export default function UserProfile() {
    const {state} = useLocation();

    const profile = state?.profile
    const sessionId = state?.sessionId;

    const nevigate=useNavigate()

    const [openAIReport, setOpenAIReport] = useState(null);
    const [aiReportData, setAIReportData] = useState({});
    const [loadingIndex, setLoadingIndex] = useState(null);


    // Function to call AI comment API
    const handleAIAnalyze = async (submission, index) => {
        nevigate("/ai-analysis", { state: { submission,sessionId} });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            {/* User Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-2xl mb-6">
                <div className="flex items-center space-x-4">
                    <img
                        src={profile.userAvatar}
                        alt="User Avatar"
                        className="w-20 h-20 rounded-full border"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{profile.username}</h1>
                        <p className="text-gray-600">Ranking: #{profile.ranking}</p>
                    </div>
                </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-2xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Submissions</h2>
                <ul className="space-y-3">
                    {profile.recentSubmissions && profile.recentSubmissions.length > 0 ? (
                        profile.recentSubmissions.map((submission, index) => (
                            <li
                                key={submission.questionId || index}
                                className="p-3 border rounded-lg flex flex-col gap-2 hover:bg-gray-50"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <a
                                            href={`https://leetcode.com${submission.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 font-medium hover:underline"
                                        >
                                            {submission.title}
                                        </a>
                                        <p className="text-sm text-gray-500">
                                            Submitted:{" "}
                                            {new Date(submission.timestamp * 1000).toLocaleString()}
                                        </p>
                                    </div>
                                    <span
                                        className={`text-sm font-semibold ${
                                            submission.status === "Accepted"
                                                ? "text-green-600"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {submission.status}
                                    </span>
                                </div>
                                <button
                                    className="mt-2 bg-blue-600 text-white px-4 py-1 rounded font-semibold shadow hover:bg-blue-700 transition w-max"
                                    onClick={() => handleAIAnalyze(submission, index)}
                                    disabled={loadingIndex === index}
                                >
                                    {openAIReport === index
                                        ? "Hide AI Report"
                                        : loadingIndex === index
                                        ? "Analyzing..."
                                        : "AI Analyze"}
                                </button>
                                {openAIReport === index && (
                                    <div className="mt-3 bg-gray-50 border rounded-xl p-4">
                                        <h3 className="font-bold text-gray-800 mb-2">AI Code Review</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {loadingIndex === index
                                                ? "Loading AI feedback..."
                                                : aiReportData[index] ||
                                                  "No AI feedback available."}
                                        </p>
                                    </div>
                                )}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No recent submissions found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
