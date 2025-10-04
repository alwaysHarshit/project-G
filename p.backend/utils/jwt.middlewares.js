import jwt from "jsonwebtoken";
import User from "../db-model/User.js";
import {isValid} from "./leetCode.js";

const REVALIDATION_INTERVAL = 1000 * 60 * 60 * 24 // 24 hours

export const authMiddleware = async (req, res, next) => {
    try {
        // 1. Extract token
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) return res.status(401).json({ success: false, message: "No token provided" });

        // 2. Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded",decoded)

        // 3. Find user in DB
        const user = await User.findOne({ username: decoded.username });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // 4. Check LeetCode session revalidation interval
        const now = Date.now();
        if (now - user.lastValidated > REVALIDATION_INTERVAL) {
            const valid = await isValid(user.leetCodeId);
            if (!valid) {
                return res.status(403).json({
                    success: false,
                    forceLogout: true,
                    message: "LeetCode session expired. Please log in again."
                });
            }
            user.lastValidated = now;
            await user.save();
        }

        //5. Attach username and leetCodeId to request
        req.username = user;
        req.leetCodeId=user.leetCodeId;
        next();

    } catch (err) {
        return res.status(403).json({ success: false, message: "Invalid token or authentication failed" });
    }
};
