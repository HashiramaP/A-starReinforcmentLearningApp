import React from "react";
import { startTraining } from "../utils/trainingUtils";

function HomepageButtons({
  startingNode,
  endingNode,
  nodes,
  edges,
  setNodes, // Add setNodes prop
  setEdges, // Add setEdges prop
  setIsTraining,
}: {
  startingNode: any;
  endingNode: any;
  nodes: any;
  edges: any;
  setNodes: React.Dispatch<React.SetStateAction<any>>; // Add setNodes type
  setEdges: React.Dispatch<React.SetStateAction<any>>; // Add setEdges type
  setIsTraining: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Function to start training
  const handleStartTraining = () => {
    setIsTraining(true); // Start training
    startTraining(startingNode, endingNode, nodes, edges, setNodes, setEdges); // Pass setNodes and setEdges to startTraining
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
