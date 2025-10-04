import React from 'react';
import {motion} from "framer-motion";

function ProfilePage() {
    const profile = localStorage.getItem("user-profile") ? JSON.parse(localStorage.getItem("user-profile")) : {};
    console.log(profile)
    return (
            // <motion.div
            //     className="w-1/2 md:flex flex-col justify-center items-center p-5"
            //     initial={{opacity: 0, y: 100, scale: 0.95}}
            //     animate={{opacity: 1, x: 0, scale: 1}}
            //     transition={{
            //         type: "spring", stiffness: 120, damping: 15, delay: 0.2,
            //     }}
            // >
            //     <img src="" alt=""/>
            // </motion.div>
        <motion.div
            className="flex flex-col items-center justify-center  p-6 rounded-xl  space-y-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
        >

        <motion.img
                    src={profile.userAvatar}
                    alt="User Avatar"
                    className="w-34 h-34 md:w-42 md:h-42 rounded-full border-2 border-blue-500/30 shadow-lg"
                    whileHover={{ scale: 1.15, borderColor: "rgba(59, 130, 246, 0.5)" }}
                />
                <div>
                    <h1 className="text-2xl text-white font-bold font-serif bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {profile.realName}
                    </h1>
                    <p className="text-zinc-300">
                        Ranking: <span className="text-amber-400 font-semibold">#{profile.ranking}</span>
                    </p>
                </div>
                <motion.button
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:from-red-500 hover:to-red-600 w-max cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Logout
                </motion.button>
        </motion.div>
    );
}

export default ProfilePage;