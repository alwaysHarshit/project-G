import JSON5 from 'json5';

export const processAIResponse = (response) => {
    console.log("Processing AI response..." + response);
    try {
        const cleaned = response
            // remove opening/closing code fences like ```json, ```js, ```
            .replace(/```[\s\S]*?```/g, (match) =>
                match.replace(/```[a-z]*\n?/gi, '').replace(/```/g, '')
            )
            // remove accidental double braces
            .replace(/^\s*{\s*{/, '{')
            .replace(/}\s*}$/, '}')
            .trim();

        console.log("Cleaned response:", cleaned);

        return JSON5.parse(cleaned);
    } catch (err) {
        console.error("Failed to parse AI response:", err.message);
        throw new Error("Invalid JSON format in AI response.");
    }
};
