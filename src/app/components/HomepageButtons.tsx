import React, { useState } from "react";
import { startTraining } from "../utils/trainingUtils";
import Episodes from "./Episodes";

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
  const [iterations, setIterations] = useState(1); // State to hold the number of iterations

  // Function to start training
  const handleStartTraining = () => {
    setIsTraining(true); // Start training
    startTraining(
      startingNode,
      endingNode,
      nodes,
      edges,
      setNodes,
      setEdges,
      iterations
    ); // Pass iterations to startTraining
  };

  return (
    <div>
      <div className="flex space-x-6 mt-6">
        {/* Generate Graph Button */}
        <button className="rock-button">Next Graph</button>

        {/* Episodes component to select iterations */}
        <Episodes setIterations={setIterations} />

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
