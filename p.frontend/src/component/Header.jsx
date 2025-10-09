// import { NavLink } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import React, { useState,} from "react";
//
// export default function Header() {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//
//     const profile = localStorage.getItem("user-profile") ? JSON.parse(localStorage.getItem("user-profile")) : null;
//
//     const routes = [
//         { path: "/", label: "Home"},
//         ...(profile ? [{ path: "/dashboard", label: "Dashboard" }] : []), // coditonaly render the dashboard route
//         { path: "/about-us", label: "About Me" },
//     ];
//
//
//     return (
//         <nav className="bg-white/5 border border-black/10 backdrop-blur-sm rounded-2xl shadow-md fixed top-3 left-1/2 -translate-x-1/2 w-[75%] max-w-screen-xl z-50 h-20 flex items-center px-5 overflow-visible">
//             {/* Navigation Links */}
//             <ul className="hidden md:flex space-x-6 text-xl font-medium">
//                 {routes.map(({ path, label }) => (
//                     <li key={path}>
//                         <NavLink
//                             to={path}
//                             className={({ isActive }) =>
//                                 `p-3 hover:text-blue-400 ${
//                                     isActive ? "text-blue-400 border-b-2 border-blue-400" : ""
//                                 }`
//                             }
//                         >
//                             {label}
//                         </NavLink>
//                     </li>
//                 ))}
//             </ul>
//
//             {/* Spacer to push avatar to right */}
//             <div className="flex-1" />
//
//             {/* Profile Avatar */}
//             {profile && (
//                 <div className="relative" onMouseEnter={() => setDropdownOpen(true)}
//                      onMouseLeave={() => setDropdownOpen(false)}>
//                     <motion.img
//                         src={profile.userAvatar}
//                         alt="User Avatar"
//                         className="w-14 h-14 md:w-14 md:h-14 rounded-full border-2 border-blue-500/10  cursor-pointer"
//
//                     />
//
//                     {/* Dropdown Card */}
//                     <AnimatePresence>
//                         {dropdownOpen && (
//                             <motion.div
//                                 initial={{ opacity: 0, y: -10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -10 }}
//                                 className="absolute right-0 mt-2 w-56 bg-gray-800 text-white rounded-xl shadow-lg p-4 flex flex-col items-center space-y-3 z-50"
//                             >
//                                 <img
//                                     src={profile.userAvatar || "/default-avatar.png"}
//                                     alt="Avatar"
//                                     className="w-16 h-16 rounded-full border-2 border-blue-400"
//                                 />
//                                 <h2 className="text-lg font-bold">{profile.realName}</h2>
//                                 <p>
//                                     Ranking:{" "}
//                                     <span className="text-amber-400 font-semibold">
//                                         #{profile.ranking}
//                                     </span>
//                                 </p>
//                                 <button
//                                     className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg w-full cursor-pointer hover:from-red-500 hover:to-red-600"
//                                     onClick={() => {
//                                         sessionStorage.clear();
//                                         localStorage.clear();
//                                         window.location.replace("/");
//                                     }}
//                                 >
//                                     Logout
//                                 </button>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             )}
//         </nav>
//     );
// }
//

//newer code with mobile first appraoch
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu

    const profile = localStorage.getItem("user-profile") ? JSON.parse(localStorage.getItem("user-profile")) : null;

    const routes = [
        { path: "/", label: "Home" },
        ...(profile ? [{ path: "/dashboard", label: "Dashboard" }] : []), // conditionally render the dashboard route
        { path: "/about-us", label: "About Me" },
    ];

    return (
        <nav className="bg-white/5 border border-black/10 backdrop-blur-sm rounded-2xl shadow-md fixed top-3 left-1/2 -translate-x-1/2 w-[75%] max-w-screen-xl z-50 h-20 flex items-center justify-between md:justify-start px-5 overflow-visible">
            {/* Hamburger Menu Icon (Visible on Mobile) */}
            <div className="md:hidden">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none p-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Navigation Links (Visible on Desktop) */}
            <ul className="hidden md:flex space-x-6 text-xl font-medium">
                {routes.map(({ path, label }) => (
                    <li key={path}>
                        <NavLink
                            to={path}
                            className={({ isActive }) =>
                                `p-3 hover:text-blue-400 ${
                                    isActive ? "text-blue-400 border-b-2 border-blue-400" : ""
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-20 left-0 w-full bg-gray-900/80 backdrop-blur-md rounded-b-2xl shadow-lg"
                    >
                        <ul className="flex flex-col items-center p-4 space-y-3 text-white">
                            {routes.map(({ path, label }) => (
                                <li key={path} className="w-full text-center">
                                    <NavLink
                                        to={path}
                                        onClick={() => setMobileMenuOpen(false)} // Close menu on navigation
                                        className={({ isActive }) =>
                                            `block py-2 text-lg font-medium ${
                                                isActive ? "text-blue-400" : ""
                                            }`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer to push avatar to right */}
            <div className="flex-1 hidden md:flex" />

            {/* Profile Avatar */}
            {profile && (
                <div className="relative" onMouseEnter={() => setDropdownOpen(true)}
                     onMouseLeave={() => setDropdownOpen(false)}>
                    <motion.img
                        src={profile.userAvatar}
                        alt="User Avatar"
                        className="w-14 h-14 md:w-14 md:h-14 rounded-full border-2 border-blue-500/10  cursor-pointer"
                    />

                    {/* Dropdown Card */}
                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-2 w-56 bg-gray-800 text-white rounded-xl shadow-lg p-4 flex flex-col items-center space-y-3 z-50"
                            >
                                <img
                                    src={profile.userAvatar || "/default-avatar.png"}
                                    alt="Avatar"
                                    className="w-16 h-16 rounded-full border-2 border-blue-400"
                                />
                                <h2 className="text-lg font-bold">{profile.realName}</h2>
                                <p>
                                    Ranking:{" "}
                                    <span className="text-amber-400 font-semibold">
                                        #{profile.ranking}
                                    </span>
                                </p>
                                <button
                                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg w-full cursor-pointer hover:from-red-500 hover:to-red-600"
                                    onClick={() => {
                                        sessionStorage.clear();
                                        localStorage.clear();
                                        window.location.replace("/");
                                    }}
                                >
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </nav>
    );
}