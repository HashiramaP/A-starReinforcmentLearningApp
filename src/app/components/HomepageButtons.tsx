"use client";
import React from "react";
import { startTraining } from "../utils/trainingUtils";

function HomepageButtons({
  startingNode,
  endingNode,
}: {
  startingNode: any;
  endingNode: any;
}) {
  return (
    <div>
      <div className="flex space-x-6 mt-6">
        {/* Generate Graph Button */}
        <button className="rock-button">Generate a Graph</button>

        {/* Train Model Button */}
        <button
          className="rock-button"
          onClick={() => startTraining(startingNode, endingNode)}
        >
          Train my Model
        </button>
      </div>
    </div>
  );
}

export default HomepageButtons;
