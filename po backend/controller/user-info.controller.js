import {fetchProfile, fetchRecentSubmissions} from "../utils/leetCode.js";


export const userInfoController = async (res,req) => {
     const {username, sessionId} = res.body;
    console.log("Received data in userInfoController:", {username, sessionId});

    const profile = await fetchProfile(username);
    const recentSubmissions = await fetchRecentSubmissions(sessionId,username);

    if (!profile) {
        return req.status(404).json({message: "User not found"});
    }

    const data = {
        username: profile.matchedUser.username,
        userAvatar: profile.matchedUser.profile.userAvatar,
        ranking: profile.matchedUser.profile.ranking,
        recentSubmissions:recentSubmissions.map(submission => ({
            questionId: submission.id,
            url: submission.url,
            title: submission.title,
            status: submission.statusDisplay,
            timestamp: submission.timestamp,
        }))
    }

    console.log("Profile Data at controller side:", data);

    req.status(201).json(data)

}