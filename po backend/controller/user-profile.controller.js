import { fetchProfile, fetchRecentSubmissions } from "../utils/leetCode.js";

/**
 * Controller for handling user profile requests
 * Fetches user profile and recent submissions from LeetCode
 */
export const userProfileController = async (req, res) => {
    const { username, sessionId } = req.body;

    //console.log("Received data in userProfileController:", { username, sessionId });

    try {

        const profile = await fetchProfile(username);
        const recentSubmissions = await fetchRecentSubmissions(sessionId, username);

        if (!profile) {
            return res.status(404).json({ message: "User not found" });
        }

        const data = {
            username: profile.matchedUser.username,
            userAvatar: profile.matchedUser.profile.userAvatar,
            ranking: profile.matchedUser.profile.ranking,
            recentSubmissions: recentSubmissions.map(submission => ({
                questionId: submission.id,
                url: submission.url,
                title: submission.title,
                status: submission.statusDisplay,
                timestamp: submission.timestamp,
            }))
        };

        //console.log("Profile Data at controller side:", data);

        res.status(201).json(data);
    } catch (error) {
        console.error("❌ Error in userProfileController:", error);
        res.status(500).json({ error: "Failed to fetch user profile" });
    }
};