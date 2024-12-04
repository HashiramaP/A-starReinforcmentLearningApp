import React from "react";
import HomepageHeader from "./components/HomepageHeader";
import GraphNTraining from "./components/GraphNTraining";
import RulesClose from "./components/RulesClose";

export default function Home() {
  return (
    <div>
      {/* Server-side rendered components */}
      <div className="flex flex-col items-center relative">
        <HomepageHeader />
        {/* GitHub Logo */}
        <a
          href="https://github.com/HashiramaP/A-starReinforcmentLearningApp/tree/main"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 left-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-gray-800 hover:text-black"
          >
            <path d="M12 0a12 12 0 0 0-3.796 23.386c.6.111.819-.261.819-.578v-2.017c-3.337.726-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.755-1.333-1.755-1.09-.745.082-.729.082-.729 1.205.086 1.838 1.238 1.838 1.238 1.072 1.836 2.81 1.306 3.494.999.109-.776.419-1.306.763-1.607-2.665-.304-5.467-1.336-5.467-5.943 0-1.313.468-2.386 1.235-3.226-.124-.303-.535-1.527.117-3.184 0 0 1.008-.322 3.3 1.23a11.516 11.516 0 0 1 6.003 0c2.291-1.552 3.298-1.23 3.298-1.23.653 1.657.242 2.88.118 3.184.768.84 1.234 1.913 1.234 3.226 0 4.618-2.805 5.635-5.476 5.931.43.37.815 1.102.815 2.222v3.293c0 .319.218.693.825.577A12 12 0 0 0 12 0z" />
          </svg>
        </a>
      </div>

      <RulesClose />
      {/* Client-side components */}
      <GraphNTraining />
    </div>
  );
}
