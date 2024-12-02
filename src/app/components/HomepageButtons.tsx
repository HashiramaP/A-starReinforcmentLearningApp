"use client";
import React from "react";
import { startTraining } from "../utils/trainingUtils";

function HomepageButtons({
  startingNode,
  endingNode,
  setIsTraining,
}: {
  startingNode: any;
  endingNode: any;
  setIsTraining: React.Dispatch<React.SetStateAction<boolean>>; // Add setIsTraining prop
}) {
  // Function to start training
  const handleStartTraining = () => {
    setIsTraining(true); // Start training
    startTraining(startingNode, endingNode); // Call the training logic from your utility
  };

  // Function to stop training (if needed)
  const handleStopTraining = () => {
    setIsTraining(false); // Stop training
  };

  return (
    <div>
      <div className="flex space-x-6 mt-6">
        {/* Generate Graph Button */}
        <button className="rock-button">Generate a Graph</button>

        {/* Train Model Button */}
        <button
          className="rock-button"
          onClick={handleStartTraining} // Start training on click
        >
          Train my Model
        </button>
      </div>
    </div>
  );
}

export default HomepageButtons;
