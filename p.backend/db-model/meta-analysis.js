import mongoose from "mongoose";

const metaAnalysisSchema = new mongoose.Schema({
    responseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Response" }],

    timeRange: {
        start: Date,
        end: Date,
    },

    insights: {
        totalQuestions: Number,
        averageReadability: Number,
        averageEfficiency: Number,
        mostFrequentTopics: [String],
        mostUsedDataStructures: [String],
        commonMistakes: [String],
        improvedAreas: [String],
        weakAreas: [String],
        mostCommonTimeComplexity: String,
        mostCommonSpaceComplexity: String,
        averageLinesOfCode: Number,
        languagesUsed: [String],
    },

    aiGeneratedSummary: {
        progressNarrative: String,  // e.g. "You've improved a lot in DP..."
        suggestions: [String],
        confidenceScore: Number,
        trend: String, // "Improving", "Stagnant", etc.
    }

}, { timestamps: true });

export default mongoose.model("MetaAnalysis", metaAnalysisSchema);