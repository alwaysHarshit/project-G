import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,       // ensures no two users have the same username
    },
    leetCodeId: {
        type: String,
        required: true,
    },
    lastValidated: {
        type: Date,
        default: Date.now,  // timestamp of last successful validation
    },

});

const User = mongoose.model("User", userSchema);

export default User;
