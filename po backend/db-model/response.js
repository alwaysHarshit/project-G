import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
    questionId: {type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true},
    model: {type: String, default: "Gemini"},

    feedback: {
        codeQuality: String,
        timeComplexity: String,
        spaceComplexity: String,
        betterApproach: String,
        edgeCases: String,
        summary: String,
        bugsOrIssues: String,
        logicWalkthrough: [String],
        optimizations: [String],
        learningGaps: [String],
        codeSmells: [String],
    },

    score: {
        readability: Number,    // 0–10
        efficiency: Number,     // 0–10
        completeness: Number,   // 0–10
        confidence: Number      // 0–1 or 0–100
    },

    versionTag: {type: String, default: "v1.0"}

}, {timestamps: true});

export default mongoose.model("Response", responseSchema);