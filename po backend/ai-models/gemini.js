import { GoogleGenAI } from "@google/genai";
import {systemPrompt, userPrompt} from "../promts/gemini.promots.js";

export async function main({name, description, topics, difficulty, code}) {

    const uPrompt=userPrompt({name, description, topics, difficulty, code})
    const sPrompt=systemPrompt();


    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_KEYS});

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
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

