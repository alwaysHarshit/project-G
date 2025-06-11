import React from "react";

export function HowToGetSessionId() {

    return (
        <div className="bg-zinc-900 w-screen h-screen overflow-auto">
            <h1 className="text-white text-3xl font-bold font-serif text-center py-5">
                How to Get Session ID
            </h1>

            <div className="w-[98%] mx-auto p-6 bg-zinc-800 rounded-lg shadow-md flex">

                        <img
                            src="/assets/screenshot.png"
                            alt={`Step 1`}
                            className="w-[50%] h-auto rounded-lg"
                            onError={(e) => {
                                e.target.src = "/placeholder.png";
                                e.target.alt = "Image not found";
                            }}
                        />
                <ol className="list-decimal  pt-25 pl-10 space-y-2 text-white">
                    <li>
                        <strong>Open LeetCode:</strong>{' '}
                        <span>Go to <a href="https://leetcode.com" className="underline text-blue-400" target="_blank" rel="noopener noreferrer">leetcode.com</a> and log into your account.</span>
                    </li>
                    <li>
                        <strong>Open Developer Tools:</strong>{' '}
                        <span>Press <kbd>F12</kbd> or right-click anywhere on the page and choose <em>"Inspect"</em>.</span>
                    </li>
                    <li>
                        <strong>Go to the Application tab:</strong>{' '}
                        <span>Click the <strong>Application</strong> tab at the top of DevTools.</span>
                    </li>
                    <li>
                        <strong>Reveal hidden tabs:</strong>{' '}
                        <span>If you don’t see "Application", click the <strong>»</strong> icon to find it.</span>
                    </li>
                    <li>
                        <strong>Find Cookies section:</strong>{' '}
                        <span>In the left sidebar under <strong>Storage</strong>, expand <strong>Cookies</strong>.</span>
                    </li>
                    <li>
                        <strong>Select the correct domain:</strong>{' '}
                        <span>Click on <strong>https://leetcode.com</strong>.</span>
                    </li>
                    <li>
                        <strong>Locate LEETCODE_SESSION:</strong>{' '}
                        <span>In the list of cookies, find the row named <strong>LEETCODE_SESSION</strong>.</span>
                    </li>
                    <li>
                        <strong>Copy the session value:</strong>{' '}
                        <span>Copy the content in the <strong>Value</strong> column — it’s a long string.</span>
                    </li>
                </ol>

            </div>
        </div>
    );
}