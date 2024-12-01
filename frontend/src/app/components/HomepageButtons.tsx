"use client";

import React from "react";
import { initialNodes, initialEdges } from "./NodesEdges";

// Extract node IDs
const nodeIds = initialNodes.map((node) => node.id);

// Extract edges data (source, target, weight)
const edgesData = initialEdges.map((edge) => ({
  source: edge.source,
  target: edge.target,
  weight: edge.weight,
}));

// Function that starts the training process with the graph data
const startTraining = () => {
  console.log("Training started with the following graph data:");

  // Log the node IDs
  console.log("Nodes:", nodeIds);

  // Log the edges data
  console.log("Edges:", edgesData);
};

// HomepageButtons component
function HomepageButtons() {
  // Call startTraining when the button is clicked
  const handleTrainButtonClick = () => {
    startTraining();
  };

  return (
    <div className="flex space-x-6 mt-6">
      {/* Generate Graph Button */}
      <button className="rock-button">Generate a Graph</button>

      {/* Train Model Button */}
      <button className="rock-button" onClick={handleTrainButtonClick}>
        Train my Model
      </button>
    </div>
  );
}

export default HomepageButtons;
