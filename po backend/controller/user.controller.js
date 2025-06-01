import {main} from "../ai-models/gemini.js";

export const userController = async (req, res) => {
    const {number,name,description,topics,difficulty,code} = req.body;
    try {
        await main({name, description, topics, difficulty, code});
        res.status(200).json({
            message: "AI model executed successfully",
        });
    } catch (error) {
        console.log("❌ Error in userController:", error);
    }
}