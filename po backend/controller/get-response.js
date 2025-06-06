import {Submissions} from "../db-model/request.js";
import {AiFeedbacks} from "../db-model/response.js";
import {aiOperations} from "../utils/ai-operations.js";

export const getResponse = async (res,req) => {
    const {questionId,sessionId, submission} = res.body;
    //console.log("Received data in getResponse:", { questionId });

    let submissionId=await Submissions.findOne({problemId:questionId});
    //console.log("Getting this data from db :", submissionId)

    if(!submissionId){
        console.log("No submission found,Sending problem to ai model...")
        submissionId=await aiOperations(
            sessionId,
            submission
        )
        //console.log("here i get submission id :", submissionId);
    }
    console.log("Submission found, fetching  from db...")
    const response=await AiFeedbacks.findOne({submissionId:submissionId})
    console.log("Fetched ✅✅")

    return req.status(201).json(response);
}