import {main} from "../ai-models/gemini.js";
import {Request} from "../db-model/request.js";
import {Response} from "../db-model/response.js";
import {fetchCode} from "../utils/leetCode.js";
import {htmlToText} from "html-to-text";



export const userController = async (req, res) => {
    const {sessionId, submissionData} = req.body;

    const {submissions, problemStatement} = await fetchCode(submissionData.questionId, submissionData.title, sessionId);

    console.log("Fetched submissions:", submissions.code);

    const htmlToTextProblemStatement = htmlToText(problemStatement.content, {
        wordwrap: 150,
        selectors: [{selector: "a", format: "inline"}],
    })

    const dataSendToAI = {
        problemTitle: submissionData.title,
        problemStatement: htmlToTextProblemStatement,
        difficulty: problemStatement.difficulty,
        status: submissionData.status,
        examples: problemStatement.exampleTestcases,
        code: submissions.code,
        totalTestCases: submissions.totalTestcases,
        correctTestCases: submissions.totalCorrect,
    }
    console.log("Data sent to AI:", dataSendToAI);

    const response = await main(dataSendToAI);
    console.log("✅ AI Model Response:", response);
    // Remove markdown-style code block wrappers like ```json and ```
    const cleaned = response
        .replace(/^\s*```json\s*/i, '')
        .replace(/^\s*```\s*/i, '')
        .replace(/\s*```\s*$/, '');
    let parsedResponse = JSON.parse(cleaned);// Safe parsing
    console.log("✅ Parsed AI Response:", parsedResponse);
    res.status(201).json(parsedResponse);

        //
        //     const user = {
        //         feedback: {
        //             codeQuality: parsedResponse.feedback.codeQuality || "",
        //             timeComplexity: parsedResponse.feedback.timeComplexity || "",
        //             spaceComplexity: parsedResponse.feedback.spaceComplexity || "",
        //             betterApproach: parsedResponse.feedback.betterApproach || "",
        //             edgeCases: parsedResponse.feedback.edgeCases || "",
        //             summary: parsedResponse.feedback.summary || "",
        //             bugsOrIssues: parsedResponse.feedback.bugsOrIssues || "",
        //             logicWalkthrough: parsedResponse.feedback.logicWalkthrough || [],
        //             optimizations: parsedResponse.feedback.optimizations || [],
        //             learningGaps: parsedResponse.feedback.learningGaps || [],
        //             codeSmells: parsedResponse.feedback.codeSmells || []
        //         },
        //         score: {
        //             readability: parsedResponse.score.readability ?? 0,
        //             efficiency: parsedResponse.score.efficiency ?? 0,
        //             completeness: parsedResponse.score.completeness ?? 0,
        //             confidence: parsedResponse.score.confidence ?? 0
        //         }
        //     };
        //
        //     const question = await Request.create(questionDetails)
        //         .then(async (questionDetails) => {
        //             console.log("✅ Question created:", questionDetails);
        //             return questionDetails;
        //         }).catch((error) => {
        //             console.error("❌ Error creating question:", error);
        //             return res.status(500).json({error: "Failed to create question"});
        //         });
        //
        //     await Response.create({
        //         questionId: question._id,
        //         model: "Gemini",
        //         feedback: user.feedback,
        //         score: user.score
        //     }).then(async (response) => {
        //         console.log("✅ Response created:", response);
        //     }).catch((error) => {
        //         console.error("❌ Error creating response:", error);
        //     });
        //
        //     res.status(200).json({
        //         model: "gemini-2.0-flash",
        //         feedback: user.feedback,
        //         score: user.score
        //     });
        // } catch (error) {
        //     console.log("❌ Error in userController:", error);
        // }
}