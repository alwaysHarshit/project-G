/**
 * Utility functions for processing AI model responses
 */

export const processAIResponse = (response) => {

    const cleaned = response
        .replace(/^\s*```json\s*/i, '')
        .replace(/^\s*```\s*/i, '')
        .replace(/\s*```\s*$/, '');
    return JSON.parse(cleaned);
};