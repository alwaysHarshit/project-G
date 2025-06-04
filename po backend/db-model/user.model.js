import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    problemsSolved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
const User = mongoose.model('User', userSchema);