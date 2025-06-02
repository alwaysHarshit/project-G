import React, { useState } from "react";
import axios from "axios";
const initialInput = {
  number: "",
  name: "",
  description: "",
  topics: "",
  difficulty: "",
  code: "",
};

function AiFeedbackPage() {
  const [input, setInput] = useState(initialInput);
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAiResponse(null);
    try {
      const res = await axios.post("http://localhost:3000/chat", input);
      setAiResponse(res.data); // expects { feedback: {...}, score: {...} }
    } catch (err) {
      console.error('API Error:', err);
      setAiResponse({
        error: err.response?.data?.message || "Failed to get AI response."
      });
    }
    setLoading(false);
  };

  return (
      <div style={{ maxWidth: 800, margin: "auto", padding: 24 }}>
        <h2>AI Feedback Input</h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
              name="number"
              placeholder="Problem Number"
              value={input.number}
              onChange={handleChange}
              required
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
              name="name"
              placeholder="Problem Name"
              value={input.name}
              onChange={handleChange}
              required
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <textarea
              name="description"
              placeholder="Description"
              value={input.description}
              onChange={handleChange}
              required
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "100px" }}
          />
          <input
              name="topics"
              placeholder="Topics (comma separated)"
              value={input.topics}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <select
              name="difficulty"
              value={input.difficulty}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
          </select>
          <textarea
              name="code"
              placeholder="Your Code"
              value={input.code}
              onChange={handleChange}
              required
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "200px", fontFamily: "monospace" }}
          />
          <button 
              type="submit" 
              disabled={loading}
              style={{ 
                padding: "10px", 
                backgroundColor: loading ? "#cccccc" : "#4299e1", 
                color: "white", 
                border: "none", 
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "bold"
              }}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {aiResponse && (
            <div style={{ backgroundColor: "#f8f9fa", padding: "16px", borderRadius: "8px" }}>
              {aiResponse.error ? (
                  <div style={{ color: "red", fontWeight: "bold" }}>{aiResponse.error}</div>
              ) : (
                  <>
                    <h3>AI Feedback</h3>
                      <h2 className={"text-2xl underline"}>
                          model: {aiResponse?.model || "N/A"}
                      </h2>
                    <div>
                      <strong>Code Quality:</strong> {aiResponse?.feedback?.codeQuality || "N/A"}
                    </div>
                    <div>
                      <strong>Time Complexity:</strong> {aiResponse?.feedback?.timeComplexity || "N/A"}
                    </div>
                    <div>
                      <strong>Space Complexity:</strong> {aiResponse?.feedback?.spaceComplexity || "N/A"}
                    </div>
                    <div>
                      <strong>Better Approach:</strong> {aiResponse?.feedback?.betterApproach || "N/A"}
                    </div>
                    <div>
                      <strong>Edge Cases:</strong> {aiResponse?.feedback?.edgeCases || "N/A"}
                    </div>
                    <div>
                      <strong>Summary:</strong> {aiResponse?.feedback?.summary || "N/A"}
                    </div>
                    <div>
                      <strong>Bugs or Issues:</strong> {aiResponse?.feedback?.bugsOrIssues || "N/A"}
                    </div>
                    <div>
                      <strong>Logic Walkthrough:</strong>
                      {aiResponse?.feedback?.logicWalkthrough?.length > 0 ? (
                        <ul>
                          {aiResponse.feedback.logicWalkthrough.map((item, idx) => (
                              <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : <span>N/A</span>}
                    </div>
                    <div>
                      <strong>Optimizations:</strong>
                      {aiResponse?.feedback?.optimizations?.length > 0 ? (
                        <ul>
                          {aiResponse.feedback.optimizations.map((item, idx) => (
                              <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : <span>N/A</span>}
                    </div>
                    <div>
                      <strong>Learning Gaps:</strong>
                      {aiResponse?.feedback?.learningGaps?.length > 0 ? (
                        <ul>
                          {aiResponse.feedback.learningGaps.map((item, idx) => (
                              <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : <span>N/A</span>}
                    </div>
                    <div>
                      <strong>Code Smells:</strong>
                      {aiResponse?.feedback?.codeSmells?.length > 0 ? (
                        <ul>
                          {aiResponse.feedback.codeSmells.map((item, idx) => (
                              <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : <span>N/A</span>}
                    </div>
                    <h4>Scores</h4>
                    <div>Readability: {aiResponse?.score?.readability ?? "N/A"}</div>
                    <div>Efficiency: {aiResponse?.score?.efficiency ?? "N/A"}</div>
                    <div>Completeness: {aiResponse?.score?.completeness ?? "N/A"}</div>
                    <div>Confidence: {aiResponse?.score?.confidence ?? "N/A"}</div>
                  </>
              )}
            </div>
        )}
      </div>
  );
}

function App() {
  return (
    <AiFeedbackPage />
  );
}

export default App;
