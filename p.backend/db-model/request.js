import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    submissionKey: {type: String, required: true},
    problemTitle: {type: String, required: true},
    problemStatement: {type: String, required: true},
    difficulty: {type: String},
    status: {type: String},
    examples: {type: Array, default: []},
    topics: {type: Array, default: []},
    code: {type: String, required: true},
    totalTestCases: {type: Number},
    correctTestCases: {type: Number}
});

export const Submissions=mongoose.model("Submission", submissionSchema);
