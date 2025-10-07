import mongoose from "mongoose";

const aiFeedbackSchema = new mongoose.Schema({
    llm: {type: String, default: "gemini-2.5-flash"},
    submissionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
        required: true,
    },
    response: {
        type: mongoose.Schema.Types.Mixed, // accepts any valid object
        required: true
    },
    responseVersion:{type:String,default:"2.5"},
}, { timestamps: true });

export const AiFeedbacks=mongoose.model("AiFeedback", aiFeedbackSchema);
