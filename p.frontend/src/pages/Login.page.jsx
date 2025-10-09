import React, {useState} from "react";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import axios from "axios";

//export const API_BASE_URL="http://localhost:3000"
export const API_BASE_URL="https://project-g-backend.onrender.com"
function LoginPage() {
    const navigate = useNavigate();
    const [startClicked, setStartClicked] = useState(false); // this state track user's click on start btn
    const [username, setUsername] = useState("");
    const [leetCodeId, setleetcodeId] = useState("");

    async function handleSubmit() {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { username, leetCodeId },{
                validateStatus: (status) => true // Accept all status codes, don't throw
            });
            if(response.status===200 || response.data.success===true){
                console.log(response.data.userData.matchedUser.profile)
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                    "user-profile",
                    JSON.stringify(response.data.userData.matchedUser.profile)
                );
                navigate("/dashboard", {
                    replace: true,
                });
            }
            else{
                console.log("wooo")
                alert("Invalid Credentials")
                setStartClicked(false);
                setleetcodeId("");
                setUsername("");
            }
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <div
            className="min-h-screen flex flex-col md:flex-row font-medium bg-gradient-to-br from-black via-slate-900 to-red-950 text-white overflow-hidden">

            {/* Left Glass Content Section */}
            {/* Layout: Full width on mobile, half width on desktop. Rounded bottom on mobile, rounded right on desktop. */}
            {/* Animation: Falls from the top on all screen sizes */}
            <motion.div
                className="w-full md:w-1/2 flex flex-col justify-center items-center p-5 bg-white/5 backdrop-blur-sm rounded-b-3xl md:rounded-r-3xl md:rounded-b-none shadow-xl relative min-h-[40vh] md:min-h-screen"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            >
                {/* Top-left button */}
                <button
                    onClick={() => {
                        navigate("/"); // at home page
                    }}
                    className="absolute top-4 left-4 flex items-center gap-2 bg-white/10 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-white/20 "
                >
                    {/* Left arrow SVG */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back
                </button>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center">Welcome Back!</h2>
                <p className="text-md md:text-lg text-slate-300 max-w-md text-center">
                    Enter your Leet Code credentials to Unlock the full potential of your submissions with AI.
                </p>
            </motion.div>

            {/* Right Form Section */}
            {/* Layout: Full width on mobile, half width on desktop. */}
            {/* Animation: Rises from the bottom on all screen sizes. */}
            <motion.div
                className="w-full md:w-1/2 flex flex-col justify-center items-center p-5"
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    type: "spring", stiffness: 120, damping: 15, delay: 0.4,
                }}
            >
                <form
                    className="text-white bg-white/5 border border-black/10 backdrop-blur-sm rounded-2xl shadow-md font-semibold w-full max-w-md p-8 flex flex-col justify-center shadow-2xl"
                    autoComplete="on"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setStartClicked(true);
                        handleSubmit()
                    }}
                >
                    <h1 className="text-3xl md:text-4xl font-serif text-center mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent font-bold">
                        Login
                    </h1>
                    <p className="text-zinc-300 text-center mb-8 text-sm">
                        Enter your credentials to access your dashboard
                    </p>

                    <div className="mb-6">
                        <label
                            htmlFor="username"
                            className="block mb-2 font-medium text-zinc-200"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            className="w-full p-4 rounded-xl border-2 border-blue-900/30 bg-zinc-700/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                            placeholder="Enter your Leet code username"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="sessionId"
                            className="block mb-2 font-medium text-zinc-200"
                        >
                            Session ID
                        </label>
                        <input
                            id="sessionId"
                            type="text" // Changed to password for better security practice
                            value={leetCodeId}
                            onChange={(e) => setleetcodeId(e.target.value)}
                            className="w-full p-4 rounded-xl border-2 border-blue-900/30 bg-zinc-700/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                            placeholder="Enter your Leet code session ID"
                            required
                        />

                        <motion.p
                            className="text-zinc-400 text-xs mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Don't have a session ID? Click the button below to learn how.
                        </motion.p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 w-full">
                        {/* Help button */}
                        {!startClicked && (<motion.button
                            type="button"
                            onClick={() => {
                                navigate("/how-to-get-session-id")
                            }}
                            className="w-full sm:w-auto px-5 py-3 text-white bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 focus:ring-2 focus:ring-zinc-400 focus:outline-none rounded-xl shadow-lg flex items-center justify-center"
                            aria-label="Learn how to get a session ID"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <span className="mr-2" aria-hidden="true">🔐</span> How to get Session ID
                        </motion.button>)}

                        {/* Start button */}
                        <motion.button
                            type="submit"
                            className={`flex items-center justify-center font-bold px-6 py-3 rounded-xl shadow-lg bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none w-full sm:w-auto`}
                            whileHover={!startClicked ? { scale: 1.03 } : {}}
                            whileTap={!startClicked ? { scale: 0.97 } : {}}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            {startClicked ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="loader-border border-white border-t-2 rounded-full w-5 h-5 animate-spin"></div>
                                    Loading...
                                </div>
                            ) : (
                                <>
                                    <span className="mr-2" aria-hidden="true">🔑</span>Start
                                </>
                            )}
                        </motion.button>

                        <style>
                            {
                                `.loader-border {
                                border-width: 3px;
                                border-color: white transparent white transparent;
                                }`
                            }
                        </style>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default LoginPage;
