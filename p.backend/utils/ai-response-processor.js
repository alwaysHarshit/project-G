import JSON5 from "json5";

export const processAIResponse = (response) => {
    console.log("🧠 Processing AI response...");
    try {
        // Convert object → string if needed
        let text = typeof response === "object" ? JSON.stringify(response) : String(response);

        // Strip Markdown fences and language identifiers like ```json
        text = text.replace(/```[a-z]*\n?/gi, "").replace(/```/g, "").trim();

        // Step 1: Parse safely with JSON5 (handles minor formatting quirks)
        const parsed = JSON5.parse(text);

        console.log("✅ AI response parsed successfully.");
        return parsed;
    } catch (err) {
        console.error("❌ Failed to parse AI response:", response);
        console.error("📄 Parser Error:", err.message);
        throw new Error("Invalid JSON format in AI response. Parsing failed.");
    }
};
