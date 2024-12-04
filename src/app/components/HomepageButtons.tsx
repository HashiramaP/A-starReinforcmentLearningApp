import React, { useState } from "react";
import { startTraining } from "../utils/trainingUtils";
import Episodes from "./Episodes";
import { Node, Edge } from "@reactflow/core"; // Ensure this is imported

function HomepageButtons({
  startingNode,
  endingNode,
  nodes,
  edges,
  setNodes, // Add setNodes prop
  setEdges, // Add setEdges prop
  setIsTraining,
}: {
  startingNode: { id: string };
  endingNode: { id: string };
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;

  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setIsTraining: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [iterations, setIterations] = useState(1); // State to hold the number of iterations
  const [noPathFound, setNoPathFound] = useState(false); // State for "No Path Found"
  const [noStartEndSelected, setNoStartEndSelected] = useState(false); // State for "Please select a starting and ending point"

  // Function to start training
  const handleStartTraining = () => {
    if (!startingNode || !endingNode) {
      // If either startingNode or endingNode is not selected
      setNoStartEndSelected(true); // Show message
      setNoPathFound(false); // Hide the "No Path Found" message
      return; // Do not proceed with the training
    }

    setIsTraining(true); // Start training
    setNoStartEndSelected(false); // Hide the "Please select a starting and ending point" message
    setNoPathFound(false); // Reset the state before starting training

    startTraining(
      startingNode,
      endingNode,
      nodes,
      edges,
      setNodes,
      setEdges,
      iterations,
      setNoPathFound // Pass setNoPathFound to update the state in case of no path
    );
  };

  // Function to close the "No Path Found" message
  const handleClose = () => {
    setNoPathFound(false);
  };

  // Function to close the "Please select a starting and ending point" message
  const handleStartEndClose = () => {
    setNoStartEndSelected(false);
  };

  return (
    <div>
      <div className="flex space-x-6 mt-6">
        {/* Generate Graph Button
        <button className="rock-button">Next Graph</button> */}

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

      {/* Display No Path Found message */}
      {noPathFound && (
        <div className="no-path-message">
          Agent Couldn&apos;t find a Path
          <button className="close-btn" onClick={handleClose}>
            &times; {/* Close icon */}
          </button>
        </div>
      )}

      {/* Display "Please select a starting and ending point" message */}
      {noStartEndSelected && (
        <div className="no-path-message">
          Please select a starting and an ending point.
          <button className="close-btn" onClick={handleStartEndClose}>
            &times; {/* Close icon */}
          </button>
        </div>
      )}
    </div>
  );
}

export default HomepageButtons;
