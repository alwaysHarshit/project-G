import {main} from "../ai-models/gemini.js";
import {fetchCode} from "./leetCode.js";
import {htmlToText} from "html-to-text";
import {processAIResponse} from "./ai-response-processor.js";
import {Submissions} from "../db-model/request.js";
import {AiFeedbacks} from "../db-model/response.js";

/**
 * Controller for handling code feedback requests
 * Fetches code from LeetCode, processes it, and gets AI feedback
 */
export const aiOperations = async (sessionId, submissionData) => {
    console.log("Received data in aiOperations:", submissionData);
    try {

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

        let submission = await Submissions.create(dataSendToAI);
        console.log(" Problem saved successfully.");

        const aiResponse = await main(dataSendToAI);
        //console.log("✅ AI Model Response:", aiResponse);

        const parsedResponse = processAIResponse(aiResponse);
        console.log("Get AI response");


        const aiDBRes = await AiFeedbacks.create({
            submissionId: submission.id,
            userId: sessionId,
            response: parsedResponse,
        });
        console.log("✅ AI Response saved to DB successfully.");

        return submission;

    } catch (error) {
        console.error("❌ Error in aiOperations:", error);
    }
};