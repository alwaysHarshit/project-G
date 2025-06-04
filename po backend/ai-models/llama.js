import Groq from "groq-sdk";
import {systemPrompt, userPrompt} from "../promts/gemini.promots.js";


export async function main({name, description, topics, difficulty, code}) {

    const groq = new Groq({ apiKey:process.env.GROQ_API_KEY });

    const uPrompt=userPrompt({name, description, topics, difficulty, code})
    const sPrompt=systemPrompt();

    const completion = await groq.chat.completions
        .create({
            messages: [
                {
                    role: "system",
                    content: sPrompt,
                },
                {
                    role: "user",
                    content:uPrompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
        })
    return completion.choices[0].message.content;
}


