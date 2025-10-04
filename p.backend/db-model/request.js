import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    problemId: { type: String, required: true },
    problemTitle: { type: String, required: true },
    problemStatement: { type: String, required: true },
    difficulty: { type: String},
    status: { type: String},
    examples: { type: Array, default: [] },
    code: { type: String, required: true },
    totalTestCases: { type: Number},
    correctTestCases: { type: Number }
}, { timestamps: true });

export const Submissions=mongoose.model("Submission", submissionSchema);
