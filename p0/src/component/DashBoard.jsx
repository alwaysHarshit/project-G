import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

export default function DashBoard() {
    const {state} = useLocation();

    const sessionId = state?.sessionId;
    const profile = state?.data;
    const username = state?.username;

    const nevigate = useNavigate();

    const [openAIReport, setOpenAIReport] = useState(null);
    const [aiReportData, setAIReportData] = useState({});
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [recentSubmissions, setRecentSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);


    const hasFetched = useRef(false); // ✅ prevents duplicate fetches after back nav

    useEffect(() => {
        const fetchSubmissions = async () => {
            console.log("🔄 Starting fetchSubmissions...");
            setLoading(true);

            try {
                // ✅ Check if already cached in sessionStorage
                const cached = sessionStorage.getItem("recentSubmissions");
                if (cached) {
                    console.log("✅ Loaded submissions from sessionStorage");
                    setRecentSubmissions(JSON.parse(cached));
                    hasFetched.current = true;
                    setLoading(false);
                    return;
                }

                const response = await fetch(`https://project-g-1.onrender.com/recent-submissions`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sessionId, username }),
                });

                const data = await response.json();
                setRecentSubmissions(data);
                sessionStorage.setItem("recentSubmissions", JSON.stringify(data)); // ✅ cache result
                hasFetched.current = true;
                console.log("✅ Data fetched from server:", data);

            } catch (error) {
                console.error("Error fetching submissions:", error);
            } finally {
                setLoading(false);
            }
        };

        if (sessionId && username && !hasFetched.current) {
            fetchSubmissions();
            const intervalId = setInterval(() => {
                console.log("⏰ 10-minute interval reached. Fetching submissions again...");
                fetchSubmissions();
            }, 600000);

            return () => {
                console.log("🧹 Cleaning up interval on component unmount");
                clearInterval(intervalId);
            };
        }
    }, [sessionId, username]);


    // Function to call AI comment API
    const handleAIAnalyze = async (submission, index) => {
        nevigate("/ai-analysis", { state: { submission,sessionId} });
    };

    // Navigation handlers for About Us and Upcoming Features
    // const handleAboutUs = () => {
    //     nevigate("/about-us");
    // };
    //
    // const handleUpcomingFeatures = () => {
    //     nevigate("/upcoming-features");
    // };

    function logout() {
        console.log("Logging out...");
        sessionStorage.removeItem("recentSubmissions");
        nevigate("/");
    }

    return (
        <div className="w-full h-screen bg-zinc-900 p-6 flex items-center flex-col ">
            {/* User Card */}
            <div className="bg-zinc-800 rounded-3xl shadow-md p-6 w-full max-w-2xl mb-6">
                <div className="flex items-center justify-around space-x-4">
                    <img
                        src={profile.userAvatar}
                        alt="User Avatar"
                        className="w-30 h-30 rounded-full border"
                    />
                    <div>
                        <h1 className="text-2xl text-white font-bold font-serif ">{profile.username}</h1>
                        <p className="text-white">Ranking: #{profile.ranking}</p>
                    </div>
                    <button onClick={logout} className={"bg-red-700 text-white px-4 py-1 rounded font-semibold shadow hover:bg-red-800 transition w-max cursor-pointer"}>
                        logout
                    </button>
                </div>
            </div>

            {/* Recent Submissions */}
            <div className=" w-[98%] bg-zinc-800 rounded-3xl shadow-md p-6 overflow-y-scroll custom-scroll ">
                <h2 className="text-2xl font-semibold font-serif mb-4 text-center text-white">Recent Submissions</h2>
                <ul className={"grid grid-cols-2 gap-4"}>
                    {loading ? (
                        <div className="text-center  p-8 text-lg font-semibold text-white col-span-4 flex justify-center items-center space-x-3">
                            <div className="w-6 h-6 border-4  border-white border-t-transparent rounded-full animate-spin "></div>
                            <span>Loading submissions...</span>
                        </div>

                    ) : recentSubmissions.length === 0 ? (
                        <p className="text-gray-500 text-sm col-span-4 text-center">Failed to fetch submissions</p>
                    ) : (
                        recentSubmissions.map((submission, index) => (
                            <li
                                key={submission.questionId || index}
                                className="p-3 border rounded-lg border-white flex flex-col gap-3"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <a
                                            href={`https://leetcode.com${submission.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 text-lg hover:underline"
                                        >
                                            {submission.title}
                                        </a>
                                        <p className="text-sm text-gray-300">
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
                                    className="mt-2 bg-blue-600 text-white px-4 py-1 rounded font-semibold shadow hover:bg-blue-800 transition w-max cursor-pointer"
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
                    )}
                </ul>
            </div>
        </div>
    );
}