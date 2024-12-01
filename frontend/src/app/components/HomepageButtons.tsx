"use client";

import React from "react";
import { initialNodes, initialEdges } from "./NodesEdges";

// Function that starts the training process with the graph data
const startTraining = (startingNode: any, endingNode: any) => {
  console.log("Training started with the following graph data:");

  // Log the node IDs
  console.log(
    "Nodes:",
    initialNodes.map((node) => node.id)
  );

  // Log the edges data
  console.log(
    "Edges:",
    initialEdges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      weight: edge.weight,
    }))
  );

  // Log the starting and ending nodes if they exist
  if (startingNode) {
    console.log("Starting Node:", startingNode.data.label);
  } else {
    console.log("Starting Node is not set");
  }

  if (endingNode) {
    console.log("Ending Node:", endingNode.data.label);
  } else {
    console.log("Ending Node is not set");
  }
};

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
