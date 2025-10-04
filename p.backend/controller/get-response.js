import {Submissions} from "../db-model/request.js";
import {AiFeedbacks} from "../db-model/response.js";
import {aiOperations} from "../utils/ai-operations.js";

export const getResponse = async (req,res) => {
    const {questionId,submission} = req.body;
    const leetCodeId=req.leetCodeId;

    let submissionId=await Submissions.findOne({problemId:questionId});
    console.log("Getting this data from db :", submissionId)

    if(!submissionId){
        console.log("No submission found,Sending problem to ai model...")
        submissionId=await aiOperations(
            leetCodeId,
            submission
        )
    }
    console.log("Submission found, fetching  from db...")
    const response=await AiFeedbacks.findOne({submissionId:submissionId})
    console.log("Fetched ✅✅")

    return res.status(201).json(response);
}