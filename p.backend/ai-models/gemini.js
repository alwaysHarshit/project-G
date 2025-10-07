import {GoogleGenAI} from "@google/genai";
import {systemPrompt, userPrompt} from "../promts/gemini.promots.js";

export async function geminiResponse(data) {
    console.log("Getting response from gemini .................")

    const uPrompt=userPrompt(data);
    const sPrompt=systemPrompt();

    //console.log(process.env.GEMINI_API_KEY, "GEMINI_KEYS");
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                role: "system",
                text: sPrompt
            },
            {
                role: "user",
                text:uPrompt
            }
        ]
    });

    return response.candidates[0].content.parts[0].text;
}

