import { fetchProfile, isValid } from "../utils/leetCode.js";
import User from "../db-model/User.js";
import jwt from "jsonwebtoken";

// Login Controller
export const LoginController = async (req, res) => {
    try {
        const { username, leetCodeId } = req.body;

        console.log(username,typeof username)

        // Validate the LeetCode session ID

        if (! await isValid(leetCodeId)) {
            console.warn(`[WARN] Invalid LeetCode ID for user: ${username}`);
            return res.status(403).json({
                success: false,
                message: "Invalid LeetCode session ID"
            });
        }
        /*save the user in db and upsert->If a document matching the filter exists, it updates it with the new values (leetCodeId and lastValidated).
        If no matching document exists, it inserts a new document with those values.*/

        await User.updateOne(
            { username },
            { leetCodeId, lastValidated: Date.now() },
            { upsert: true }
        );

        //create jwt token and send to front end
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {expiresIn: "7d" })
        const userData=await fetchProfile(leetCodeId,username);

        // Successful response
        return res.status(200).json({
            success: true,
            token,
            userData
        });

    } catch (error) {
        // Log error for debugging
        console.error(`[ERROR] LoginController failed: ${error.message}`, error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
