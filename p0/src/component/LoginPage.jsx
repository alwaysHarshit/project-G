import { useState } from "react";
import {useNavigate} from "react-router-dom";

export function LoginPage() {
    const [username, setUsername] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const nevigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Submitted Data:", { username, sessionId });
        try {
            const response = await fetch("http://localhost:8080/get-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, sessionId }),
            });

            if (response.status === 201) {
                const data = await response.json();
                nevigate("/dashboard", {
                    state: {sessionId,data,username},
                    replace:true
                });
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
                alert("Failed to submit data. Please try again.");
            }
        } catch (e) {
            console.error("Error:", e.message || e.toString());
            alert("An error occurred while submitting data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-zinc-900 w-screen h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="text-white bg-zinc-800 font-semibold w-[40%] h-[50%] p-6 flex flex-col justify-center rounded-4xl shadow-white"
                autoComplete="on"  // ✅ this enables autofill at form level too
            >
                <h1 className="text-3xl font-serif font text-center mb-10">User Info Form</h1>

                <label className="mb-2">Username</label>
                <input
                    type="text"
                    name="username" // ✅ IMPORTANT for autofill
                    autoComplete="username" // ✅ standard autofill keyword
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-white focus:outline-none border-2 border-blue-900 transition-all p-2 rounded mb-4"
                    placeholder="Enter your username"
                    required
                />

                <label className="mb-2">Session ID</label>
                <input
                    type="text"
                    name="session-id" // ✅ give a unique name
                    autoComplete="on" // ✅ still OK for custom fields
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    className="text-white focus:outline-none border-2 border-red-900 transition-all p-2 rounded mb-6"
                    placeholder="Enter your session ID"
                    required
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-green-500 text-white font-bold py-2 rounded transition  cursor-pointer${isLoading ? "bg-green-500 cursor-not-allowed" : "bg-emerald-950"}`}
                >
                    {isLoading ? (
                        <div className="flex justify-center items-center gap-2">
                            <span className="animate-spin border-2 border-t-transparent border-black rounded-full w-4 h-4" />
                            Submitting...
                        </div>
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>

        </div>
    );
}
