import {main} from "../ai-models/gemini.js";
import {fetchCode} from "./leetCode.js";
import {htmlToText} from "html-to-text";
import {processAIResponse} from "./ai-response-processor.js";
import {Submissions} from "../db-model/request.js";
import {AiFeedbacks} from "../db-model/response.js";
import mongoose from "mongoose";

export const aiOperations = async (sessionId, submissionData) => {

    const session = await mongoose.startSession();

    try {
        // --- Step 2: Start the transaction on the session ---
        session.startTransaction();
        console.log("🟢 Transaction started.");

        // --- Step 3: Gather all external data (LeetCode, AI) BEFORE the final commit ---
        const {submissions, problemStatement} = await fetchCode(
            submissionData.questionId,
            submissionData.title,
            sessionId
        );

        const htmlToTextProblemStatement = htmlToText(problemStatement.content, {
            wordwrap: 150,
            selectors: [{selector: "a", format: "inline"}],
        });

        const dataSendToAI = {
            problemId: submissionData.questionId,
            problemTitle: submissionData.title,
            problemStatement: htmlToTextProblemStatement,
            difficulty: problemStatement.difficulty,
            status: submissionData.status,
            examples: problemStatement.exampleTestcases,
            code: submissions.code,
            totalTestCases: submissions.totalTestcases,
            correctTestCases: submissions.totalCorrect,
        };

        const aiResponse = await main(dataSendToAI);
        const parsedResponse = processAIResponse(aiResponse);
        console.log("✅ AI response processed.");

        // --- Step 4: Execute database writes within the transaction ---
        // Note: .create() expects an array of documents when using a session.

        const createdSubmissions = await Submissions.create([dataSendToAI], {session});
        const newSubmission = createdSubmissions[0]; // Get the first (and only) document
        console.log("📄 Submission record created in transaction.");

        await AiFeedbacks.create([{
            submissionId: newSubmission._id,
            sessionId: sessionId,
            response: parsedResponse,
        }], {session});
        console.log("📄 AI Feedback record created in transaction.");

        await session.commitTransaction();
        console.log("✅ Transaction committed successfully.");

        return newSubmission;

    } catch (error) {

        console.error("❌ Error during transaction, aborting...", error);
        await session.abortTransaction();


        throw new Error(`Failed to process feedback request: ${error.message}`);

    } finally {

        session.endSession();
        console.log("⚫ Transaction session ended.");
    }
};