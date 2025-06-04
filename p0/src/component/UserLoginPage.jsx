import { useState } from "react";
import {useNavigate} from "react-router-dom";

export function UserLoginPage() {
    const [username, setUsername] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const nevigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Submitted Data:", { username, sessionId });
        try {
            const response = await fetch("http://localhost:3000/user-info", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, sessionId }),
            });

            if (response.status === 201) {
                const profile  = await response.json();
                nevigate("/dashboard", { state: { profile,sessionId } });
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
                alert("Failed to submit data. Please try again.");
            }
        } catch (e) {
            console.error("Error:", e);
            alert("An error occurred while submitting data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-zinc-800 w-screen h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="text-white bg-black font-semibold w-[40%] h-[50%] p-6 flex flex-col justify-center rounded-4xl  shadow-white"
            >
                <h1 className="text-3xl font-serif font text-center mb-10">User Info Form</h1>

                <label className="mb-2 ">Username</label>
                <input
                    type="text"
                    value={username}
                    autoComplete="on"
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-white focus:outline-none border border-blue-900 hover:border-3 border-blue-900 transition-all p-2 rounded mb-4"
                    placeholder="Enter your username"
                    required
                />

                <label className="mb-2">Session ID</label>
                <input
                    type="text"
                    value={sessionId}
                    autoComplete="on"
                    onChange={(e) => setSessionId(e.target.value)}
                    className={`text-white focus:outline-none  border border-red-900 hover:border-3 transition-all p-2 rounded mb-6`}
                    placeholder="Enter your session ID"
                    required
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-emerald-950 text-white font-bold py-2 rounded  transition ${isLoading ? "bg-green-500 cursor-not-allowed" : "bg-emerald-950 "}`}
                >
                    {
                        isLoading ? (
                            <div className="flex justify-center items-center gap-2">
                                <span className="animate-spin border-2 border-t-transparent border-black rounded-full w-4 h-4" />
                                Submitting...
                            </div>
                        ):(
                            "Submit"
                        )
                    }
                </button>
            </form>
        </div>
    );
}
