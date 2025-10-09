# Code Feedback AI 🚀

An intelligent full-stack application that provides AI-powered feedback on your coding solutions. Submit your code or fetch it directly from LeetCode, and receive a detailed analysis, scoring, and improvement plan from Google's Gemini AI.

**This project is deployed and available 24/7!** Check out the live version: `https://project-g-frontend.onrender.com`

---

## ✨ Key Features

-   **AI-Powered Code Analysis**: Get detailed, structured feedback on time complexity, space complexity, code optimization, and alternative approaches using Google's Gemini AI.
-   **Direct LeetCode Integration**: Fetches your user profile and recent submissions directly from LeetCode using your username and session ID.
-   **Persistent Authentication**: Uses **JWT tokens** for session management. Log in once, and stay logged in until your LeetCode session expires.
-   **Modern UI/UX**: A **completely redesigned user interface** for a more intuitive and seamless experience, built on a new, more robust frontend architecture.
-   **Data Persistence**: All submissions and AI-generated feedback are securely stored in a MongoDB database for you to review anytime.
-   **Optimized Performance**: Session caching for faster reloads and optimized API calls to reduce redundant network requests.

---

## 🛠️ Tech Stack

### Frontend
-   **React (v19)** with a modern, component-based architecture
-   **Vite** for a blazing-fast development experience
-   **Tailwind CSS** for responsive and utility-first styling
-   **Axios** for handling API requests

### Backend
-   **Express.js** for the server framework
-   **MongoDB** with **Mongoose** for database management
-   **JSON Web Tokens (JWT)** for secure user authentication
-   **Google Gemini AI** (`@google/genai`) for code analysis
-   **CORS** for cross-origin requests
-   **dotenv** for managing environment variables

---

## 🚀 Getting Started

1.  Open your browser and navigate to the application URL: `[Your Deployed App URL Here]`
2.  Log in using your LeetCode username and session ID. You will remain logged in on that device.
3.  Your LeetCode profile and recent submissions will be automatically fetched and displayed.
4.  Click the **"AI Analyze"** button on any submission to generate a detailed feedback report.
5.  Review your structured AI report and the personalized improvement plan!

---

## 🔮 Upcoming Features

-   **Generate Edge Cases**: Automatically generate tricky edge cases and test data for any given problem.
-   **Automatic Analysis Queue**: A Redis-based queue system to process submissions asynchronously for instant, scalable feedback.
-   **AI Report Download**: Allow users to download their detailed AI feedback reports as a PDF or Markdown file.
-   **Meta Analysis Dashboard**: A personal dashboard to visualize your coding progress, common mistakes, and strengths over time.
-   **Multi-Model Support**: Switch between Gemini, Llama, and other AI models for a comparative analysis of your code.

---

## 🤝 Contributing

We welcome contributions and new ideas! If you want to contribute, fix a bug, or suggest a feature, please feel free to reach out by email at `studyharshit21@gmail.com`.

All contributors will be proudly featured on our "About Us" page!

---

## 📜 License

This project is licensed under the **ISC License**.