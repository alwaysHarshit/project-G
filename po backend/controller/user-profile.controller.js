import {fetchProfile} from "../utils/leetCode.js";

/**
 * Controller for handling user profile requests
 * Fetches user profile and recent submissions from LeetCode
 */
export const userProfileController = async (req, res) => {
    const { username, sessionId } = req.body;

    console.log("Received data in userProfileController:", { username, sessionId });

    try {
       const profile = await fetchProfile(username);

        if (!profile) {
            return res.status(404).json({ message: "User not found" });
        }

        const data = {
            username: profile.matchedUser.username,
            userAvatar: profile.matchedUser.profile.userAvatar,
            ranking: profile.matchedUser.profile.ranking,
       };

        console.log("Profile Data at controller side:", data);

        res.status(201).json(data);
    } catch (error) {
        console.error("❌ Error in userProfileController:", {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({ error: "Failed to fetch user profile" });
    }

};