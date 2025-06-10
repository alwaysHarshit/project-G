
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
                const res = await axios.post("https://project-g-1.onrender.com/get-response", {
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
         fetchAIResponse().then(() => {
             console.log(" Get AI Response:");
         }).catch(err => {
             console.error("Error:", err);
         });

    }, [submission, sessionId]);


    return (
        <div className={"bg-zinc-900 w-screen h-screen overflow-auto"}>
            <h2 className=" text-white text-3xl font-bold font-serif text-center ">AI Feedback</h2>
            {loading && <p className="text-blue-400 font-semibold">Loading AI response...</p>}

            {aiResponse && (
                <div className={"bg-zinc-800 rounded-xl m-3 shadow-md "}>
                    {aiResponse.error ? (
                        <div className={" text-3xl bg-red-700 p-5 rounded-xl"}>{aiResponse.error}</div>
                    ) : (
                        <div className={"p-10 mt-5"}>
                            <div className={"flex justify-between items-center"}>
                                <h3 className=" text-white text-2xl mb-3">Model: {aiResponse?.llm || "N/A"}</h3>
                                <h3 className=" text-white text-xl mb-3">Response
                                    Version: {aiResponse?.responseVersion || "N/A"}</h3>
                            </div>
                            <div className={"text-white bg-zinc-900 rounded-2xl p-3  mt-2"}><h2><strong>User Intent Analysis:</strong></h2> {aiResponse.response?.UserIntentAnalysis || "N/A"}</div>
                            <div className={"text-white bg-zinc-900 rounded-2xl p-3 mt-2"}><h2><strong>Correctness Analysis:</strong></h2> {aiResponse.response?.CorrectnessAnalysis || "N/A"}</div>
                            <div className={"text-white bg-zinc-900 rounded-2xl p-3  mt-2"}><h2><strong>Where You Went Wrong:</strong></h2> {aiResponse.response?.WhereWentWrong || "N/A"}</div>
                            <div className="text-white bg-zinc-900 rounded-2xl p-3  mt-2">
                                <strong>Bugs or Issues:</strong>
                                {aiResponse.response?.BugsOrIssues?.length > 0 ? (
                                    aiResponse.response.BugsOrIssues.map((item, index) => (
                                        <div key={index} className="mt-2">
                                            <p><strong>Issue:</strong> {item.Issue}</p>
                                            <p><strong>Fix:</strong> {item.Fix}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No bug found</p>
                                )}
                            </div>


                            <div className={"text-white mt-3 bg-zinc-900 rounded-2xl p-3  "}>
                                <strong>Time & Space Complexity:</strong>
                                <ul className="list-disc pl-6">
                                    <li><strong>Time:</strong> {aiResponse.response?.TimeSpaceComplexity?.TimeComplexity || "N/A"}</li>
                                    <li><strong>Space:</strong> {aiResponse.response?.TimeSpaceComplexity?.SpaceComplexity || "N/A"}</li>
                                    <li><strong>Analysis:</strong> {aiResponse.response?.TimeSpaceComplexity?.Analysis || "N/A"}</li>
                                </ul>
                            </div>

                            <div className="text-white mt-3 bg-zinc-900 rounded-2xl p-3 ">
                                <strong>Alternate Solutions:</strong>
                                {aiResponse.response?.AlternateSolutions?.length > 0 ? (
                                    <ul className="list-disc pl-6 text-white">
                                        {aiResponse.response.AlternateSolutions.map((alt, idx) => (
                                            <li key={idx}>
                                                <strong>Approach:</strong> {alt.Approach}<br/>
                                                <strong>When To Use:</strong> {alt.WhenToUse}<br/>
                                                <div>
                                                    <strong>Code:</strong>
                                                    <pre
                                                        className="bg-gray-800 text-green-300 p-3 rounded-md overflow-x-auto mt-2">
                                                        <code className="whitespace-pre-wrap">{alt.code}</code>
                                                    </pre>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <span> N/A </span>}
                            </div>

                            <div className="mt-3 bg-zinc-900 rounded-2xl p-3  text-white">
                                <strong>Key Concepts To Learn:</strong>
                                {aiResponse.response?.KeyConceptsToLearn?.length > 0 ? (
                                    <ul className="list-disc pl-6">
                                        {aiResponse.response.KeyConceptsToLearn.map((concept, idx) => (
                                            <li key={idx}>{concept}</li>
                                        ))}
                                    </ul>
                                ) : <span> N/A </span>}
                            </div>

                            <div className="bg-zinc-900 rounded-2xl p-3  mt-2 text-white">
                                <div>
                                    <h2><strong>Scores:</strong></h2>
                                    <ul>
                                        <li>Readability: {aiResponse.response?.ImprovementPlan?.Score?.Readability || "N/A"}</li>
                                        <li>Efficiency: {aiResponse.response?.ImprovementPlan?.Score?.Efficiency || "N/A"}</li>
                                        <li>Correctness: {aiResponse.response?.ImprovementPlan?.Score?.Correctness || "N/A"}</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-zinc-900 rounded-2xl p-3  mt-2 text-white">
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