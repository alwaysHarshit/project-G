# Code Feedback AI

A full-stack application that provides AI-powered feedback on coding solutions. Users can submit their code along with problem details, and receive detailed feedback and scoring from Google's Gemini AI model.

## Updates

- **Data Persistence**: All submissions and AI responses are stored in MongoDB
- **LeetCode Integration**: Fetches user profile and recent submissions directly from LeetCode using session ID and username
- **Session Caching**: Recent submissions are cached in sessionStorage for faster reloads
- **AI Feedback Page**: Detailed, structured AI feedback for each submission
- **Error Handling**: Improved error handling and user notifications
- **Optimized API Calls**: Reduces redundant network requests and improves performance

## Tech Stack

### Frontend
- React (v19)
- Vite
- Tailwind CSS
- Axios for API requests

### Backend
- Queue.js
- Express.js
- MongoDB with Mongoose
- Google Gemini AI (via @google/genai)
- CORS for cross-origin requests
- dotenv for environment variables
- leetcode-query for LeetCode data

## Project Structure

```
project/
├── p0/                      # Frontend React application
│   ├── src/
│   │   ├── App.jsx          # Main React component with submission form and response display
│   ├── package.json         # Frontend dependencies and scripts
│
├── po backend/              # Backend Queue.js application
│   ├── ai-models/
│   │   ├── gemini.js        # Integration with Google's Gemini AI
│   │   ├── llama.js         # Integration with Llama AI model via Groq
│   ├── controller/
│   │   ├── user.controller.js # Handles the chat endpoint
│   │   ├── user-profile.controller.js # Handles LeetCode profile
│   │   ├── getRecentSumissions.js # Handles recent submissions
│   │   ├── get-response.js  # Handles AI feedback retrieval
│   ├── db-model/
│   │   ├── request.js       # MongoDB schema for code submissions
│   │   ├── response.js      # MongoDB schema for AI responses
│   │   ├── meta-analysis.js # Meta analysis schema
│   ├── promts/
│   │   ├── gemini.promots.js # Prompt templates for the AI
│   ├── routes/
│   │   ├── user.routes.js   # API route definitions
│   ├── utils/
│   │   ├── leetCode.js      # LeetCode data utilities
│   │   ├── ai-operations.js # AI workflow utilities
│   │   ├── ai-response-processor.js # AI response parsing
│   ├── index.js             # Main server file
│   ├── package.json         # Backend dependencies and scripts
```

## Control Flow

The application follows this control flow for processing code submissions and generating AI feedback:

1. **Server Initialization**:
   - The Express server is initialized in `index.js`
   - MongoDB connection is established
   - CORS middleware is configured to allow cross-origin requests
   - Routes are registered

2. **API Request Handling**:
   - Frontend sends a POST request to `/chat` endpoint with code submission details
   - The request is routed through `user.routes.js` to the `userController` function
   - For LeetCode profile and submissions, `/getUser` and `/recent-submissions` endpoints are used

3. **Controller Processing**:
   - `userController` in `user.controller.js` extracts submission details from the request body
   - The controller calls the AI model (Gemini) via the `main()` function in `gemini.js`
   - `user-profile.controller.js` and `getRecentSumissions.js` handle LeetCode data

4. **AI Model Integration**:
   - The application supports multiple AI models:
     - Google's Gemini model (`gemini.js`)
     - Llama model via Groq API (`llama.js`)
   - AI prompts are constructed using templates from `gemini.promots.js`
   - The AI model processes the code and returns structured feedback

5. **Response Processing**:
   - The controller parses the AI response (removing markdown and converting to JSON)
   - The submission details are stored in the database using the `Request` model
   - The AI feedback is stored in the database using the `Response` model
   - The processed feedback is sent back to the frontend

6. **Database Operations**:
   - `Request` model stores the code submission details
   - `Response` model stores the AI-generated feedback and scores
   - `MetaAnalysis` model for future analytics features
   - Both models include timestamps for tracking creation and update times

7. **Error Handling**:
   - The application includes error handling for database operations
   - JSON parsing errors are caught and logged
   - General error handling is implemented in the controller

8. **Frontend Optimizations**:
   - Session caching for recent submissions
   - Improved loading states and error messages
   - Navigation state management for seamless user experience

## Installation

### Prerequisites
- Queue.js (v16 or higher)
- MongoDB
- Google Gemini API key

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd p0
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd "po backend"
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   Mongo_URI=your_mongodb_connection_string
   GEMINI_KEYS=your_gemini_api_key
   ```
4. Start the server:
   ```
   npm run run
   ```

## Usage

1. Open your browser and navigate to the frontend application (typically at http://localhost:5173)
2. Log in with your LeetCode username and session ID
3. View your profile and recent submissions
4. Click "AI Analyze" on any submission to get detailed AI feedback
5. View the structured AI report and improvement plan

## API Endpoints

### POST /chat
Submits code for AI analysis

**Request Body:**
```json
{
  "number": "123",
  "name": "Two Sum",
  "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  "topics": "Arrays,Hash Table",
  "difficulty": "Easy",
  "code": "function twoSum(nums, target) {\n  // Your code here\n}"
}
```

**Response:**
```json
{
  "model": "gemini-2.0-flash",
  "feedback": {
    "codeQuality": "...",
    "timeComplexity": "...",
    "spaceComplexity": "...",
    "betterApproach": "...",
    "edgeCases": "...",
    "summary": "...",
    "bugsOrIssues": "...",
    "logicWalkthrough": ["..."],
    "optimizations": ["..."],
    "learningGaps": ["..."],
    "codeSmells": ["..."]
  },
  "score": {
    "readability": 7,
    "efficiency": 6,
    "completeness": 8,
    "confidence": 0.9
  }
}
```

### POST /getUser
Fetches LeetCode user profile

### POST /recent-submissions
Fetches recent LeetCode submissions

### POST /get-response
Fetches AI feedback for a specific submission

## Configuration

### Environment Variables

#### Backend
- `PORT`: The port on which the backend server runs (default: 3000)
- `Mongo_URI`: MongoDB connection string
- `GEMINI_KEYS`: Google Gemini API key

## Upcoming Features

- **Automatic AI Analysis with Redis Queue**: Submissions will be queued and processed asynchronously for scalable, real-time feedback.
- **AI Report Download**: Users will be able to download detailed AI feedback reports as PDF or markdown.
- **Meta Analysis Dashboard**: Visualize your coding progress, strengths, and weaknesses over time using aggregated AI feedback.
- **Multi-Model Support**: Switch between Gemini, Llama, and other AI models for comparative analysis.
- **Improved Error Reporting**: More descriptive error messages and troubleshooting guides.
- **Bug Fixes & Optimizations**:
  - Fixed session caching issues
  - Improved API error handling
  - Optimized database queries
  - Enhanced frontend loading states
  - Refactored backend controllers for maintainability
- **More to Come**: Stay tuned for additional features like code similarity detection, leaderboard, and personalized learning plans!

## License

This project is licensed under the ISC License.
