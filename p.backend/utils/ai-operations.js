import mongoose from "mongoose";
import { Submissions } from "../db-model/request.js";
import { AiFeedbacks } from "../db-model/response.js";
import { fetchCode, fetchProblem } from "../utils/leetCode.js";
import { htmlToText } from "html-to-text";
import { geminiResponse } from "../ai-models/gemini.js";
import { processAIResponse } from "../utils/ai-response-processor.js";

export const getResponse = async (req, res) => {
    const { submission } = req.body;
    const { leetCodeId } = req;

    const session = await mongoose.startSession();

    try {
        // --- Start manual transaction ---
        session.startTransaction();
        console.log("🟢 Transaction started");

        // --- Step 1: Check if submission exists ---
        let submissionFromDB = await Submissions.findOne({ submissionKey: submission.submissionID }).session(session);
        if (submissionFromDB) {
            const existingFeedback = await AiFeedbacks.findOne({ submissionId: submissionFromDB._id }).session(session);
            if (!existingFeedback) {
                throw new Error("Step 1️⃣ Error: AI feedback missing for existing submission");
            }
            // Commit nothing, just return existing feedback
            await session.commitTransaction();
            return res.status(200).json({ success: true, response: existingFeedback.response });
        }

        // --- Step 2: Fetch problem & user code from LeetCode ---
        let pd, ud;
        try {
            pd = await fetchProblem(leetCodeId, submission.titleSlug);
        } catch (err) {
            throw new Error("Step 2️⃣ Error: Failed to fetch problem from LeetCode - " + err.message);
        }

        try {
            ud = await fetchCode(leetCodeId, submission.submissionID);
        } catch (err) {
            throw new Error("Step 2️⃣ Error: Failed to fetch user code from LeetCode - " + err.message);
        }

        const htmlToTextProblemStatement = htmlToText(pd.content, {
            wordwrap: 150,
            selectors: [{ selector: "a", format: "inline" }],
        });

        const dataSendToAI = {
            submissionKey: submission.submissionID,
            status: submission.status,
            problemTitle: pd.titleSlug,
            problemStatement: htmlToTextProblemStatement,
            difficulty: pd.difficulty,
            topics: pd.topicTags.map(tag => tag.name),
            examples: pd.exampleTestcases,
            code: ud.code,
            totalTestCases: ud.totalTestcases,
            correctTestCases: ud.totalCorrect,
        };

        // --- Step 3: Send data to AI ---
        let aiResponse;
        try {
            aiResponse = await geminiResponse(dataSendToAI);
            if (!aiResponse) throw new Error("AI returned empty response");
        } catch (err) {
            throw new Error("Step 3️⃣ Error: AI response failed - " + err.message);
        }

        let parsedResponse;
        try {
            parsedResponse = processAIResponse(aiResponse);
            if (!parsedResponse) throw new Error("Parsed AI response is empty");
        } catch (err) {
            throw new Error("Step 3️⃣ Error: Failed to parse AI response - " + err.message);
        }

        // --- Step 4: Save Submission & AI Feedback ---
        let newSubmission, newAiFeedback;
        try {
            newSubmission = new Submissions(dataSendToAI);
            await newSubmission.save({ session });
        } catch (err) {
            throw new Error("Step 4️⃣ Error: Failed to save Submission - " + err.message);
        }

        try {
            newAiFeedback = new AiFeedbacks({
                submissionId: newSubmission._id,
                response: parsedResponse,
            });
            await newAiFeedback.save({ session });
        } catch (err) {
            throw new Error("Step 4️⃣ Error: Failed to save AI Feedback - " + err.message);
        }

        // --- Step 5: Commit transaction if everything succeeded ---
        await session.commitTransaction();
        console.log("✅ Transaction committed successfully");

        return res.status(201).json({ success: true, response: parsedResponse });

    } catch (error) {
        // --- Manual rollback ---
        await session.abortTransaction();
        console.error("❌ Transaction aborted due to error:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    } finally {
        session.endSession();
        console.log("⚫ Transaction session ended");
    }
};
