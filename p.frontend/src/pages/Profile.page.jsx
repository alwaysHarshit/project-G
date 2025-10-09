import React from "react";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";

function DeveloperPage() {
    const socialLinks = [
        { icon: <Github className="w-6 h-6" />, label: "GitHub", url: "https://github.com/alwaysHarshit" },
        { icon: <Mail className="w-6 h-6" />, label: "Email", url: "mailto:Studyharshit21@gmail.com" },
    ];

    return (
        <motion.div
            className="flex flex-col items-center justify-center p-6 rounded-xl space-y-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
        >
            {/* Developer Picture */}
            <motion.img
                src="/assets/mypic.jpeg"
                alt="Harshit Barua"
                className="w-64 h-64 md:w-72 md:h-72 rounded-full border-4 border-blue-500/50 shadow-lg object-cover"
                whileHover={{ scale: 1.1, borderColor: "rgba(59, 130, 246, 0.7)" }}
            />

            {/* Introduction */}
            <div className="text-center space-y-3 max-w-3xl px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Harshit Barua
                </h1>
                <p className="text-slate-300">
                    I am a passionate Full Stack developer focused on building intelligent, AI-powered coding platforms.
                    I love solving complex problems, exploring new technologies, and creating tools that help developers learn faster and smarter.
                </p>
                <p className="text-blue-400 font-semibold text-lg ">
                    We welcome contributions, ideas, and feedback! Contribute to the project and, as a thank-you, you’ll receive a <strong>free coffee ☕ from me</strong> for your support. Every contributor will also be featured proudly on our "About Us" page!
                </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6 mt-4">
                {socialLinks.map((link, idx) => (
                    <motion.a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-white hover:text-blue-400"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </motion.a>
                ))}
            </div>

            {/* Quote */}
            <motion.div className="mt-6 px-4">
                <p className="text-slate-400 italic max-w-lg text-center">
                    "Coding is not just a skill, it's a way to solve real problems creatively and efficiently."
                </p>
            </motion.div>
        </motion.div>
    );
}

export default DeveloperPage;
