import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    topics:{
        type: [String],
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    code:{
        type: String,
        required: true,
    }

},{timestamps:true})

export default mongoose.model("Request", requestSchema);