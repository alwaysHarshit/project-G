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

    // --- Step 1: Check if feedback already exists (Read-only, no transaction needed) ---
    try {
        const submissionFromDB = await Submissions.findOne({ submissionKey: submission.submissionID });
        if (submissionFromDB) {
            const existingFeedback = await AiFeedbacks.findOne({ submissionID: submissionFromDB._id });
            if (existingFeedback) {
                console.log("✅ Feedback found in DB. Returning existing data.");
                return res.status(200).json(existingFeedback.response);
            }
        }
    } catch (error) {
        console.error("❌ Error checking for existing submission:", error.message);
        return res.status(500).json({ success: false, message: "Failed to check database for existing feedback." });
    }

    // If we reach here, it means the feedback does not exist and we must create it.
    // The entire creation process will be managed within a transaction.
    const session = await mongoose.startSession();
    try {
        console.log("ℹ️ No existing feedback found. Starting creation process.");

        // --- Step 2: Fetch external data (Problem & Code) ---
        const pd = await fetchProblem(leetCodeId, submission.titleSlug);
        const ud = await fetchCode(leetCodeId, submission.submissionID);

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

        // --- Step 3: Get AI response ---

        const aiResponse = await geminiResponse(dataSendToAI);
        if (!aiResponse) {
            throw new Error("AI returned an empty or invalid response.");
        }

        // --- Step 4: Safely parse the AI response ---
        let parsedResponse;
        try {
            parsedResponse = processAIResponse(aiResponse);
        } catch (parseError) {
            console.error("❌ Failed to parse AI response:", aiResponse);
            throw new Error(`AI response was malformed. Parser Error: ${parseError.message}`);
        }

        // --- Step 5: Start transaction for atomic database writes ---
        session.startTransaction();
        console.log("🟢 Transaction started for writing new submission and feedback.");

        // Create and save the new submission record
        const newSubmission = new Submissions(dataSendToAI);
        await newSubmission.save({ session });

        // Create and save the new AI feedback record, linking it to the submission
        const newAiFeedback = new AiFeedbacks({
            submissionID: newSubmission._id, // Correctly link by ObjectID
            response: parsedResponse,
        });
        await newAiFeedback.save({ session });

        // --- Step 6: Commit the transaction ---
        await session.commitTransaction();
        console.log("✅ Transaction committed successfully. New feedback created.");
        console.log("Ai parsed response..",parsedResponse);
        return res.status(201).json(parsedResponse);

    } catch (error) {
        // If anything fails, abort the transaction
        if (session.inTransaction()) {
            await session.abortTransaction();
            console.error("❌ Transaction aborted due to error.");
        }
        console.error("💥 An error occurred during the feedback creation process:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    } finally {
        // Always end the session to release resources
        session.endSession();
        console.log("⚫ Transaction session ended.");
    }
};