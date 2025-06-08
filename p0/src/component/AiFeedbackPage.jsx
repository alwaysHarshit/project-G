
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
                const res = await axios.post("https://project-g-0bcx.onrender.com/get-response", {
                    questionId: submission.questionId,
                    sessionId,
                    submission
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
        // setAiResponse({
        //     UserIntentAnalysis: "User Intent Analysis",
        //     CorrectnessAnalysis: "Correctness Analysis",
        //     WhereWentWrong: "Where Went Wrong",
        //     BugsOrIssues: "Bugs or Issues",
        //     TimeSpaceComplexity: {
        //         TimeComplexity: "Time Complexity",
        //         SpaceComplexity: "Space Complexity",
        //         Analysis: "Analysis",
        //     },
        // })

        fetchAIResponse();

    }, [submission, sessionId]);


    return (
        <div className={"bg-zinc-900 w-screen h-screen overflow-auto"}>
            <h2 className=" text-white text-3xl font-bold font-serif text-center ">AI Feedback</h2>
            {loading && <p className="text-blue-400 font-semibold">Loading AI response...</p>}

            {aiResponse && (
                <div className={"bg-zinc-800 rounded-xl m-3"}>
                    {aiResponse.error ? (
                        <div className={" text-3xl bg-red-700 p-5 rounded-xl"}>{aiResponse.error}</div>
                    ) : (
                        <div className={"p-10 mt-5"}>
                            <div className={"flex justify-between items-center"}>
                                <h3 className=" text-white text-2xl mb-3">Model: {aiResponse?.llm || "N/A"}</h3>
                                <h3 className=" text-white text-xl mb-3">Response
                                    Version: {aiResponse?.responseVersion || "N/A"}</h3>
                            </div>
                            <div className={"text-white"}><strong>User Intent Analysis:</strong> {aiResponse.response?.UserIntentAnalysis || "N/A"}</div>
                            <div className={"text-white"}><strong>Correctness Analysis:</strong> {aiResponse.response?.CorrectnessAnalysis || "N/A"}</div>
                            <div className={"text-white"}><strong>Where You Went Wrong:</strong> {aiResponse.response?.WhereWentWrong || "N/A"}</div>
                            <div className={"text-white"}><strong>Bugs or Issues:</strong> {aiResponse.response?.BugsOrIssues || "N/A"}</div>

                            <div className={"text-white mt-4"}>
                                <strong>Time & Space Complexity:</strong>
                                <ul className="list-disc pl-6">
                                    <li><strong>Time:</strong> {aiResponse.response?.TimeSpaceComplexity?.TimeComplexity || "N/A"}</li>
                                    <li><strong>Space:</strong> {aiResponse.response?.TimeSpaceComplexity?.SpaceComplexity || "N/A"}</li>
                                    <li><strong>Analysis:</strong> {aiResponse.response?.TimeSpaceComplexity?.Analysis || "N/A"}</li>
                                </ul>
                            </div>

                            <div className="text-white mt-4">
                                <strong>Alternate Solutions:</strong>
                                {aiResponse.response?.AlternateSolutions?.length > 0 ? (
                                    <ul className="list-disc pl-6 text-white">
                                        {aiResponse.response.AlternateSolutions.map((alt, idx) => (
                                            <li key={idx}>
                                                <strong>Approach:</strong> {alt.Approach}<br />
                                                <strong>When To Use:</strong> {alt.WhenToUse}
                                            </li>
                                        ))}
                                    </ul>
                                ) : <span> N/A </span>}
                            </div>

                            <div className="mt-4 text-white">
                                <strong>Key Concepts To Learn:</strong>
                                {aiResponse.response?.KeyConceptsToLearn?.length > 0 ? (
                                    <ul className="list-disc pl-6">
                                        {aiResponse.response.KeyConceptsToLearn.map((concept, idx) => (
                                            <li key={idx}>{concept}</li>
                                        ))}
                                    </ul>
                                ) : <span> N/A </span>}
                            </div>

                            <div className="mt-4 text-white">
                                <strong>Improvement Plan:</strong>
                                <div>
                                    <strong>Scores:</strong>
                                    <ul>
                                        <li>Readability: {aiResponse.response?.ImprovementPlan?.Score?.Readability || "N/A"}</li>
                                        <li>Efficiency: {aiResponse.response?.ImprovementPlan?.Score?.Efficiency || "N/A"}</li>
                                        <li>Correctness: {aiResponse.response?.ImprovementPlan?.Score?.Correctness || "N/A"}</li>
                                        <li>Confidence: {aiResponse.response?.ImprovementPlan?.Score?.Confidence || "N/A"}</li>
                                    </ul>
                                </div>
                                <div className="mt-2 text-white">
                                    <strong>Action Steps:</strong>
                                    {aiResponse.response?.ImprovementPlan?.ActionSteps?.length > 0 ? (
                                        <ul className="list-disc pl-6">
                                            {aiResponse.response.ImprovementPlan.ActionSteps.map((step, idx) => (
                                                <li key={idx}>{step}</li>
                                            ))}
                                        </ul>
                                    ) : <span> N/A </span>}
                                </div>
                            </div>

                            <div className="mt-4 text-white">
                                <strong>Reflective Feedback:</strong>
                                <div>{aiResponse.response?.ReflectiveFeedback || "N/A"}</div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}