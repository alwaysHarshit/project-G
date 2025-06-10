import {main} from "../ai-models/gemini.js";
import {fetchCode} from "../utils/leetCode.js";
import {htmlToText} from "html-to-text";
import {processAIResponse} from "../utils/ai-response-processor.js";

/**
 * Controller for handling code feedback requests
 * Fetches code from LeetCode, processes it, and gets AI feedback
 */
export const codeFeedbackController = async (req, res) => {
    const { sessionId, submissionData } = req.body;

    try {

        const { submissions, problemStatement } = await fetchCode(
            submissionData.questionId, 
            submissionData.title, 
            sessionId
        );

        const htmlToTextProblemStatement = htmlToText(problemStatement.content, {
            wordwrap: 150,
            selectors: [{ selector: "a", format: "inline" }],
        });


        const dataSendToAI = {
            problemTitle: submissionData.title,
            problemStatement: htmlToTextProblemStatement,
            difficulty: problemStatement.difficulty,
            status: submissionData.status,
            examples: problemStatement.exampleTestcases,
            code: submissions.code,
            totalTestCases: submissions.totalTestcases,
            correctTestCases: submissions.totalCorrect,
        };
        //console.log("Data sent to AI:", dataSendToAI);

        const response = await main(dataSendToAI);
        console.log("✅ AI Model Response:", response);
        
        // Process the AI response
        const parsedResponse = processAIResponse(response);
        console.log("✅ Parsed AI Response:", parsedResponse);
        

        res.status(201).json(parsedResponse);
    } catch (error) {
        console.error("❌ Error in codeFeedbackController:", error);
        res.status(500).json({ error: "Failed to get code feedback" });
    }
};