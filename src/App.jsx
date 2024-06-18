import { useState } from "react";
import "./App.css"; // Make sure to import your CSS file where you define styles
import 'animate.css';
import axios from "axios";
import ReactMarkdown from "react-markdown";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [buttonAnimation, setButtonAnimation] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    setButtonAnimation(true); // Trigger button animation
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${"AIzaSyAk66UrGvAdja0FDsgpRHOhQq7ZX9ygvto"}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
    setButtonAnimation(false); // Reset button animation
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center">
      <header className="p-4 bg-white dark:bg-black w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Chat App</h1>
        <DarkModeToggle />
      </header>
      <main className="w-full max-w-4xl flex flex-col items-center p-4">
        <form onSubmit={generateAnswer} className="w-full text-center mb-4">
          <a
            href="https://github.com/faize700"
            target="_blank"
            rel="noopener noreferrer"
            className="block font-extrabold text-3xl md:text-5xl bg-clip-text bg-gradient-to-r from-slate-200/60 to-50% to-slate-200 dark:text-white text-black text-center mb-4"
          >
            AI CHAT APP
            <span className="text-indigo-500 inline-flex flex-col h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.5xl)*theme(lineHeight.tight))] overflow-hidden items-center">
              {/* <ul className="block animate-text-slide-4 text-center leading-tight [&_li]:block"> */}
              <ul>
                <li className="animate__animated animate__backInDown animate___repeat-1 animate__backOutDown animate__delay-5s">🤖 ASK ANYTHING</li>
                <li className="animate__animated animate__backInRight animate___repeat-1 animate__delay-5s">💻 Code Related</li>
                <li>💰 Finance Sector</li>
                <li>🩺 Health Related</li>
                <li aria-hidden="true">🤖 ASK ANYTHING</li>
              </ul>
            </span>
          </a>
          <div className="w-full max-w-[54rem] relative flex items-center shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.15)] justify-between mx-auto sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mb-4">
            <textarea
              required
              className="w-full h-32 resize-none my-1 p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none text-lg placeholder-gray-500 custom-scrollbar"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
            ></textarea>

            {generatingAnswer && (
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                // style={{ transform: "translateX(-40px)" }}
                width="40"
                height="30"
                viewBox="0 0 256 128"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="1">
                    <stop offset="0%" stopColor="#5ebd3e" />
                    <stop offset="33%" stopColor="#ffb900" />
                    <stop offset="67%" stopColor="#f78200" />
                    <stop offset="100%" stopColor="#e23838" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stopColor="#e23838" />
                    <stop offset="33%" stopColor="#973999" />
                    <stop offset="67%" stopColor="#009cdf" />
                    <stop offset="100%" stopColor="#5ebd3e" />
                  </linearGradient>
                </defs>
                <g fill="none" strokeLinecap="round" strokeWidth="16">
                  <g className="ip__track" stroke="#ddd">
                    <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                    <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                  </g>
                  <g strokeDasharray="180 656">
                    <path
                      className="ip__worm1"
                      stroke="url(#grad1)"
                      strokeDashoffset="0"
                      d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
                    />
                    <path
                      className="ip__worm2"
                      stroke="url(#grad2)"
                      strokeDashoffset="358"
                      d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
                    />
                  </g>
                </g>
              </svg>
            )}
          </div>
          <button
            type="submit"
            className={`bg-black text-white dark:bg-white dark:text-black p-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 ${
              buttonAnimation ? "animate-pulse" : ""
            }`}
            disabled={generatingAnswer}
          >
            {generatingAnswer ? "Generating..." : "Generate answer"}
          </button>
        </form>
        <div className="w-full max-w-4xl text-center rounded bg-white dark:bg-black p-4 answer-container max-h-96 overflow-y-auto">
          <ReactMarkdown className="markdown">{answer}</ReactMarkdown>
        </div>
      </main>
    </div>
  );
}

export default App;
