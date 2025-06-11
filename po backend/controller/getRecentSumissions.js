import {fetchRecentSubmissions} from "../utils/leetCode.js";

export const getRecentSubmissions = async (req, res) => {
    const {sessionId, username} = req.body;
    const recentSubmissions = await fetchRecentSubmissions(sessionId, username);
    console.log(recentSubmissions.map(recentSubmission => ({
        id: recentSubmission.id,
        url: recentSubmission.url,
        title: recentSubmission.title,
        statusDisplay: recentSubmission.statusDisplay,
        timestamp: recentSubmission.timestamp
    })), "Recent Submissions Data Fetched Successfully!");

    const formattedSubmissions = recentSubmissions
        .map(submission => ({
            questionId: submission.id,
            url: submission.url,
            title: submission.title,
            status: submission.statusDisplay,
            timestamp:new Date(submission.timestamp).toLocaleString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
        }))

    //console.log(formattedSubmissions, "Formatted Submissions Data Fetched Successfully!")
    return res.status(201).json(formattedSubmissions);

}