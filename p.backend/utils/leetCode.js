import { Credential, LeetCode } from "leetcode-query";



/**
 * Initialize the LeetCode session (singleton)
 * @param {string} sessionId - LeetCode session ID
 * @returns {LeetCode} - Initialized LeetCode instance
 */
export const getLeetCode = async (sessionId) => {
        const credential = new Credential();
        await credential.init(sessionId);
        const leetcodeInstance = new LeetCode(credential);
        console.log("✅ LeetCode session initialized");
    return leetcodeInstance;
};


// Fetch recent submissions
export const fetchRecentSubmissions = async (sessionId) => {
    console.log("Fetching recent submissions for user..");
    const leetcode = await getLeetCode(sessionId);
    return leetcode.submissions({ limit:20, offset:0 });
};

// Fetch user profile
export const fetchProfile = async (sessionId, username) => {
    console.log("Fetching profile for user..");
    const leetcode = await getLeetCode(sessionId);
    return leetcode.user(username);
};

// Fetch problem details
export const fetchProblem = async (sessionId, questionTitle) => {
    console.log("Fetching problem details for question..");
    try {
        const leetcode = await getLeetCode(sessionId);
        return leetcode.problem(questionTitle);
    } catch (e) {
        console.error("❌ Error fetching LeetCode problem:", e);
        throw e;
    }
};

// Check if session is valid
export const isValid = async (sessionId) => {
    console.log("Checking if session is valid..");

    const leetcode = await getLeetCode(sessionId);
    const response = await leetcode.whoami();
    console.log("response from isValid --->>>",response);
    return response.isSignedIn && response.userId;
};

export async function fetchCode(sessionId,submissionId) {
    console.log("Fetching code for submission..");
    try {
        const leetcode = await getLeetCode(sessionId);
        return leetcode.submission(submissionId);
    } catch (e) {
        console.error("❌ Error fetching LeetCode code:", e);
        throw e;
    }
}

// export async function fetchRecentSubmissions(sessionId) {
//     //let sessionId="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aF91c2VyX2lkIjoiMTA3Mzg5ODYiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4N2FhZjhkNDc3ZDQ4OWRlMmYxMjU0YzU2Yjg4MjM3ZGM0MDcwODBiN2IzZGI5NWVlYjc0N2FlYmRmZjk1ZDVjIiwic2Vzc2lvbl91dWlkIjoiMjBlMjBlYTUiLCJpZCI6MTA3Mzg5ODYsImVtYWlsIjoic3R1ZHloYXJzaGl0MjFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzdHVkeWhhcnNoaXQyMSIsInVzZXJfc2x1ZyI6InN0dWR5aGFyc2hpdDIxIiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY29tL3VzZXJzL3N0dWR5aGFyc2hpdDIxL2F2YXRhcl8xNzUyNDY3MTEwLnBuZyIsInJlZnJlc2hlZF9hdCI6MTc1OTUxNjI5NywiaXAiOiIxMDMuMTk2LjIxMy4xMzgiLCJpZGVudGl0eSI6ImEzZjU3YmJlMjFjNGUzMDM3OTIyOGFkNzc4OGYyMjRkIiwiZGV2aWNlX3dpdGhfaXAiOlsiMTgwZjc1YjgwYmMxMjQxYzc3ODMzNTBhZjAyODFiMzYiLCIxMDMuMTk2LjIxMy4xMzgiXX0.Fttu18Z0fQlau2d3szohfsVzfyc5IZFt-Lh6ZbUS1Gc"
//     console.log("Fetching recent submissions for user..");
//     const credential = new Credential();
//     await credential.init(sessionId);
//
//     const leetcode = new LeetCode(credential);
//
//     try {
//          return leetcode.submissions({limit: 20, offset: 0});
//
//     } catch (error) {
//         console.error("❌ Error fetching LeetCode data:", error);
//         throw error;
//     }
// }
// export async function fetchProfile(userName) {
//     const leetcode = new LeetCode();
//     try {
//         return await leetcode.user(userName)
//     }catch (error) {
//         console.error("❌ Error fetching LeetCode profile:", error);
//         throw error;
//     }
// }
//
// // export async function fetchCode(questionId,questionTitle, sId) {
// export async function fetchCode(){
//     let questionId="1778831599";
//     let questionTitle="Integer Replacement";
//     let sId="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aF91c2VyX2lkIjoiMTA3Mzg5ODYiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI4N2FhZjhkNDc3ZDQ4OWRlMmYxMjU0YzU2Yjg4MjM3ZGM0MDcwODBiN2IzZGI5NWVlYjc0N2FlYmRmZjk1ZDVjIiwic2Vzc2lvbl91dWlkIjoiMjBlMjBlYTUiLCJpZCI6MTA3Mzg5ODYsImVtYWlsIjoic3R1ZHloYXJzaGl0MjFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzdHVkeWhhcnNoaXQyMSIsInVzZXJfc2x1ZyI6InN0dWR5aGFyc2hpdDIxIiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY29tL3VzZXJzL3N0dWR5aGFyc2hpdDIxL2F2YXRhcl8xNzUyNDY3MTEwLnBuZyIsInJlZnJlc2hlZF9hdCI6MTc1OTUxNjI5NywiaXAiOiIxMDMuMTk2LjIxMy4xMzgiLCJpZGVudGl0eSI6ImEzZjU3YmJlMjFjNGUzMDM3OTIyOGFkNzc4OGYyMjRkIiwiZGV2aWNlX3dpdGhfaXAiOlsiMTgwZjc1YjgwYmMxMjQxYzc3ODMzNTBhZjAyODFiMzYiLCIxMDMuMTk2LjIxMy4xMzgiXX0.Fttu18Z0fQlau2d3szohfsVzfyc5IZFt-Lh6ZbUS1Gc"
//     const credential = new Credential();
//     await credential.init(sId);
//     const leetcode = new LeetCode(credential);
//     //console.log(`QUESTION ID ${questionId} AND TITLE ${questionTitle} AND SESSION ID ${sId}`)
//     try {
//         //const submissions = await leetcode.submission(questionId)
//         const problemStatement = await leetcode.problem(questionTitle);
//         //console.log("fetched submission",submissions)
//         console.log("feched problestatem",problemStatement)
//
//         //return {submissions,problemStatement};
//     } catch (error) {
//         console.error("❌ Error fetching LeetCode submissions:", error);
//         throw error;
//     }
// }
//
// export async function isValid(sessionId){
//     const credential = new Credential();
//     await credential.init(sessionId);
//     const leetcode = new LeetCode(credential);
//    let response= await leetcode.whoami();
//    return response.isSignedIn && response.userId;
// }

// {
//     id: 1778831599,
//         lang: 'java',
//     time: '1 week, 6 days',
//     timestamp: 1758525902000,
//     statusDisplay: 'Accepted',
//     runtime: 1,
//     url: '/submissions/detail/1778831599/',
//     isPending: false,
//     title: 'Integer Replacement',
//     memory: 40.9,
//     titleSlug: 'integer-replacement'
// },
// {
//     id: 1778830011,
//         lang: 'java',
//     time: '1 week, 6 days',
//     timestamp: 1758525765000,
//     statusDisplay: 'Wrong Answer',
//     runtime: 0,
//     url: '/submissions/detail/1778830011/',
//     isPending: false,
//     title: 'Integer Replacement',
//     memory: 0,
//     titleSlug: 'integer-replacement'
// }
