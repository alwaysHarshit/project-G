import { GoogleGenAI } from "@google/genai";

export async function main({name, description, topics, difficulty, code}) {
    console.log({name, description, topics, difficulty, code})
    // const uPrompt=userPrompt({name, description, topics, difficulty, code})
    // const sPrompt=systemPrompt();
    // console.log("tell data type of upromt and spromto",typeof uPrompt,typeof sPrompt)

    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_KEYS});
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{
            role: "system",
            text:`You are a critical and expert coding reviewer. Your job is to give **clear, concise, and brutally honest feedback** on a user's code solution. Do not be polite or vague. Point out flaws, missed edge cases, inefficiencies, bugs, or any better approach. Avoid flattery.Respond **only in strict JSON** format, matching this schema exactly:{
            "feedback": {
            "codeQuality": String,
            "timeComplexity": String,
            "spaceComplexity": String,
            "betterApproach": String,
            "edgeCases": String,
            "summary": String,
            "bugsOrIssues": String,
            "logicWalkthrough": [String],
            "optimizations": [String],
            "learningGaps": [String],
            "codeSmells": [String]
          },
          "score": {
            "readability": Number,     // 0–10
            "efficiency": Number,      // 0–10
            "completeness": Number,    // 0–10
            "confidence": Number       // 0–1 (or 0–100 if needed)
          }
        }

        ⚠️ Important:
        - Your tone should be direct and technical.
        - Do not include extra text outside the JSON block.
        - Avoid generic phrases. Be specific.
        `
        },
            {
                role: "user",
                text:`Evaluate the following coding question and user-submitted solution.
        Question: ${name}
        Description: ${description}
        Topics: ${topics}
        Difficulty: ${difficulty}
        Code:${code}
        Respond with detailed, structured feedback strictly in JSON format as defined by the system prompt.`

            }
        ]
    });
    console.log(response.candidates[0].content.parts[0].text);
    return response.candidates[0].content.parts[0].text;
}

