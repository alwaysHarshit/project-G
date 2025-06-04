import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export function AiFeedbackPage() {
    const location = useLocation();
    const sessionId = location.state?.sessionId;
    const submission = location.state?.submission;

    const [aiResponse, setAiResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!submission) return;

        const fetchAIResponse = async () => {
            setLoading(true);
            try {
                const res = await axios.post("http://localhost:3000/chat", {
                    sessionId,
                    submissionData: submission,
                });
                setAiResponse(res.data); // Expects structured feedback object
            } catch (err) {
                console.error("API Error:", err);
                setAiResponse({
                    error: err.response?.data?.message || "Failed to get AI response.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchAIResponse();
    }, [submission, sessionId]);

    return (
        <div style={{ maxWidth: 900, margin: "auto", padding: 24 }}>
            <h2 className="text-2xl font-bold mb-4">AI Feedback</h2>
            {loading && <p className="text-blue-600 font-semibold">Loading AI response...</p>}

            {aiResponse && (
                <div style={{ backgroundColor: "#f8f9fa", padding: "16px", borderRadius: "8px" }}>
                    {aiResponse.error ? (
                        <div style={{ color: "red", fontWeight: "bold" }}>{aiResponse.error}</div>
                    ) : (
                        <>
                            <h3 className="text-xl underline mb-3">Model: {aiResponse?.model || "N/A"}</h3>

                            <div><strong>User Intent Analysis:</strong> {aiResponse.UserIntentAnalysis || "N/A"}</div>
                            <div><strong>Correctness Analysis:</strong> {aiResponse.CorrectnessAnalysis || "N/A"}</div>
                            <div><strong>Where You Went Wrong:</strong> {aiResponse.WhereWentWrong || "N/A"}</div>
                            <div><strong>Bugs or Issues:</strong> {aiResponse.BugsOrIssues || "N/A"}</div>

                            <div className="mt-4">
                                <strong>Time & Space Complexity:</strong>
                                <ul className="list-disc pl-6">
                                    <li><strong>Time:</strong> {aiResponse.TimeSpaceComplexity?.TimeComplexity || "N/A"}</li>
                                    <li><strong>Space:</strong> {aiResponse.TimeSpaceComplexity?.SpaceComplexity || "N/A"}</li>
                                    <li><strong>Analysis:</strong> {aiResponse.TimeSpaceComplexity?.Analysis || "N/A"}</li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <strong>Alternate Solutions:</strong>
                                {aiResponse.AlternateSolutions?.length > 0 ? (
                                    <ul className="list-disc pl-6">
                                        {aiResponse.AlternateSolutions.map((alt, idx) => (
                                            <li key={idx}>
                                                <strong>Approach:</strong> {alt.Approach}<br />
                                                <strong>When To Use:</strong> {alt.WhenToUse}
                                            </li>
                                        ))}
                                    </ul>
                                ) : <span> N/A </span>}
                            </div>

                            <div className="mt-4">
                                <strong>Key Concepts To Learn:</strong>
                                {aiResponse.KeyConceptsToLearn?.length > 0 ? (
                                    <ul className="list-disc pl-6">
                                        {aiResponse.KeyConceptsToLearn.map((concept, idx) => (
                                            <li key={idx}>{concept}</li>
                                        ))}
                                    </ul>
                                ) : <span> N/A </span>}
                            </div>

                            <div className="mt-4">
                                <strong>Improvement Plan:</strong>
                                <div>
                                    <strong>Scores:</strong>
                                    <ul>
                                        <li>Readability: {aiResponse.ImprovementPlan?.Score?.Readability || "N/A"}</li>
                                        <li>Efficiency: {aiResponse.ImprovementPlan?.Score?.Efficiency || "N/A"}</li>
                                        <li>Correctness: {aiResponse.ImprovementPlan?.Score?.Correctness || "N/A"}</li>
                                        <li>Confidence: {aiResponse.ImprovementPlan?.Score?.Confidence || "N/A"}</li>
                                    </ul>
                                </div>
                                <div className="mt-2">
                                    <strong>Action Steps:</strong>
                                    {aiResponse.ImprovementPlan?.ActionSteps?.length > 0 ? (
                                        <ul className="list-disc pl-6">
                                            {aiResponse.ImprovementPlan.ActionSteps.map((step, idx) => (
                                                <li key={idx}>{step}</li>
                                            ))}
                                        </ul>
                                    ) : <span> N/A </span>}
                                </div>
                            </div>

                            <div className="mt-4">
                                <strong>Reflective Feedback:</strong>
                                <div>{aiResponse.ReflectiveFeedback || "N/A"}</div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
