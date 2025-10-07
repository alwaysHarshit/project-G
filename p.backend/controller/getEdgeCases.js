import {Submissions} from "../db-model/request.js";

import {fetchCode} from "../utils/leetCode.js";
import {htmlToText} from "html-to-text";


export const getEdgeCases = async (req,res) => {
    const {questionId,sessionId,submission} = req.body;
    console.log("Received data in getEdgeCases:", { questionId,submission })

    // checking in db
    let submissionFromDb=await Submissions.findOne({problemId:questionId});
    if(submissionFromDb){
        console.log("Submission found in db")
        const obj={
            problemTitle:submissionFromDb.problemTitle,
            problemStatement:submissionFromDb.problemStatement,
            userCode:submissionFromDb.code
        }

        console.log(obj)
    }
    else{

        console.log("Submission not found in db calling leet-code apis ")
        const {submissions, problemStatement} = await fetchCode(
            submission.questionId,
            submission.title,
            sessionId
        );
        const htmlToTextProblemStatement = htmlToText(problemStatement.content, {
            wordwrap: 150,
            selectors: [{selector: "a", format: "inline"}],
        });
        console.log(submissions.code,htmlToTextProblemStatement)

    }

}