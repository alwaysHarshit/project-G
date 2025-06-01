import React from 'react';

const Sidebar = () => (
  <aside className="w-56 bg-white border-r border-gray-200 h-screen p-4 flex flex-col">
    <div className="font-bold text-lg mb-4">Sidebar</div>
    <div className="mb-6 flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-gray-200 mb-2" />
      <div className="text-sm font-medium">User Name</div>
    </div>
    <input
      type="text"
      placeholder="Search..."
      className="mb-4 px-2 py-1 rounded border border-gray-300 w-full text-sm"
    />
    <div className="flex-1 overflow-y-auto">
      <div className="font-semibold mb-2 text-xs text-gray-500">History</div>
      <ul className="space-y-1 text-sm">
        <li className="text-blue-600 cursor-pointer">Two Sum</li>
        <li className="text-gray-700 cursor-pointer">Reverse Linked List</li>
        <li className="text-gray-700 cursor-pointer">Valid Parentheses</li>
      </ul>
    </div>
    <button className="mt-4 w-full py-2 bg-blue-100 text-blue-700 rounded font-semibold text-sm">Re-analyze Batch</button>
  </aside>
);

const Workspace = () => (
  <main className="flex-1 p-8 overflow-y-auto flex flex-col">
    <div className="font-bold text-xl mb-2">Two Sum</div>
    <div className="flex gap-2 mb-4">
      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">Array</span>
      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Easy</span>
    </div>
    <div className="mb-4 bg-gray-50 border border-gray-200 rounded p-4">
      <div className="font-semibold mb-2">Description</div>
      <div className="text-gray-700 text-sm max-h-24 overflow-y-auto">
        Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.
      </div>
    </div>
    <div className="mb-4 flex items-center gap-2">
      <select className="border border-gray-300 rounded px-2 py-1 text-sm">
        <option>C++</option>
        <option>Python</option>
        <option>JavaScript</option>
      </select>
      <button className="ml-auto px-3 py-1 bg-gray-200 rounded text-sm">Upload from LeetCode</button>
    </div>
    <div className="mb-4 flex-1 flex flex-col">
      <div className="h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Code Editor Placeholder]</div>
    </div>
    <div className="flex gap-2 mt-4">
      <button className="px-4 py-2 bg-blue-600 text-white rounded font-semibold text-sm">Submit</button>
      <button className="px-4 py-2 bg-green-600 text-white rounded font-semibold text-sm">Analyze with AI</button>
      <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded font-semibold text-sm">Reset Code</button>
      <button className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded font-semibold text-sm">Save & Annotate</button>
    </div>
  </main>
);

const AIResponsePanel = () => (
  <aside className="w-80 bg-white border-l border-gray-200 h-screen p-4 flex flex-col">
    <div className="font-bold text-lg mb-4">AI Response Panel</div>
    <div className="flex gap-2 mb-4">
      <button className="px-4 py-2 rounded-t font-semibold border-b-2 border-blue-600 text-blue-700 bg-blue-50">GPT-4</button>
      <button className="px-4 py-2 rounded-t font-semibold border-b-2 border-transparent text-gray-600 bg-gray-100">Gemini</button>
      <button className="px-4 py-2 rounded-t font-semibold border-b-2 border-transparent text-gray-600 bg-gray-100">Claude</button>
    </div>
    <div className="flex-1 overflow-y-auto">
      <div className="mb-4">
        <div className="font-bold mb-1">Code Quality Feedback</div>
        <div className="text-gray-700 text-sm bg-gray-50 rounded p-2">[Feedback]</div>
      </div>
      <div className="mb-4">
        <div className="font-bold mb-1">Time/Space Analysis</div>
        <div className="text-gray-700 text-sm bg-gray-50 rounded p-2">[Analysis]</div>
      </div>
      <div className="mb-4">
        <div className="font-bold mb-1">Better Approach</div>
        <div className="text-gray-700 text-sm bg-gray-50 rounded p-2">[Suggestions]</div>
      </div>
      <div className="mb-4">
        <div className="font-bold mb-1">Edge Cases</div>
        <div className="text-gray-700 text-sm bg-gray-50 rounded p-2">[Edge cases]</div>
      </div>
    </div>
    <div className="mt-4 flex gap-2">
      <button className="px-3 py-1 bg-gray-200 rounded text-sm">Copy</button>
      <button className="px-3 py-1 bg-gray-200 rounded text-sm">Save</button>
      <button className="px-3 py-1 bg-gray-200 rounded text-sm">👍</button>
      <button className="px-3 py-1 bg-gray-200 rounded text-sm">👎</button>
    </div>
  </aside>
);

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <Workspace />
      <AIResponsePanel />
    </div>
  );
}

export default App;
