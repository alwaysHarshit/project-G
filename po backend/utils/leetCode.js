import {Credential, LeetCode} from "leetcode-query";

export async function fetchRecentSubmissions(sessionId,userName) {

    const credential = new Credential();
    await credential.init(sessionId);

    const leetcode = new LeetCode(credential);

    try {
        return leetcode.submissions({ limit:10, offset: 0 });
    } catch (error) {
        console.error("❌ Error fetching LeetCode data:", error);
        throw error;
    }
}
export async function fetchProfile(userName) {
    const leetcode = new LeetCode();
    try {
        return await leetcode.user(userName)
    }catch (error) {
        console.error("❌ Error fetching LeetCode profile:", error);
        throw error;
    }
}

export async function fetchCode(questionId,questionTitle, sId) {
    const credential = new Credential();
    await credential.init(sId);
    const leetcode = new LeetCode(credential);
    try {
        const submissions = await leetcode.submission(questionId)
        const problemStatement = await leetcode.problem(questionTitle);

        return {submissions,problemStatement};
    } catch (error) {
        console.error("❌ Error fetching LeetCode submissions:", error);
        throw error;
    }
}