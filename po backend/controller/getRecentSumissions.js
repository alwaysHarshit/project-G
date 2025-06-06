import {fetchRecentSubmissions} from "../utils/leetCode.js";

export const getRecentSubmissions = async (req, res) => {
    const {sessionId, username} = req.body;
    const recentSubmissions = await fetchRecentSubmissions(sessionId, username);

    const formattedSubmissions = recentSubmissions
        .map(submission => ({
            questionId: submission.id,
            url: submission.url,
            title: submission.title,
            status: submission.statusDisplay,
            timestamp: submission.timestamp
        }))
        .sort((a, b) => b.timestamp - a.timestamp);// most recent first

    //console.log(formattedSubmissions)
    return res.status(201).json(formattedSubmissions);

}