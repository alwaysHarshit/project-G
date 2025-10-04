import { fetchRecentSubmissions } from "../utils/leetCode.js";

export const getRecentSubmissions = async (req, res) => {
    const {leetCodeId } = req;

    try {
        // Fetch submissions
        const recentSubmissions = await fetchRecentSubmissions(leetCodeId);

        console.log("Recent Submissions Data...");

        // Format data for frontend
        const formattedSubmissions = recentSubmissions.map(submission => ({
            questionId: submission.id,
            url: submission.url,
            title: submission.title,
            status: submission.statusDisplay,
            timestamp: new Date(submission.timestamp).toLocaleString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
        }));
        console.log("Formatted Submissions send ..")
        return res.status(200).json(formattedSubmissions);

    } catch (err) {
        console.error("Error fetching recent submissions:", err);
        return res.status(500).json({ success: false, message: "Failed to fetch recent submissions" });
    }
};
