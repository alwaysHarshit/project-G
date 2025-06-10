import JSON5 from 'json5';

export const processAIResponse = (response) => {
    try {
        const cleaned = response
            .replace(/^```json\s*/i, '')
            .replace(/^```/i, '')
            .replace(/```$/i, '')
            .replace(/```[a-z]*\n?/gi, '') // remove inner ```java or ``` blocks
            .replace(/```/g, '')           // any remaining ```
            .trim();

        return JSON5.parse(cleaned);
    } catch (err) {
        console.error("Failed to parse AI response:", err.message);
        throw new Error("Invalid JSON format in AI response.");
    }
};
