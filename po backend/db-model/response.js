import mongoose from "mongoose";

const aiFeedbackSchema = new mongoose.Schema({
    llm: {type: String, default: "gemini-2.0-flash"},
    submissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
        required: true,
        unique: true
    },
    sessionId: {
        type: String,
    },
    response: {
        type: mongoose.Schema.Types.Mixed, // accepts any valid object
        required: true
    },
    responseVersion:{type:String,default:"2.0"},
}, { timestamps: true });

export const AiFeedbacks=mongoose.model("AiFeedback", aiFeedbackSchema);
