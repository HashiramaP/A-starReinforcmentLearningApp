"use client";

import React, { useState, useEffect } from "react";
import FlowGraph from "./components/FlowGraph";
import HomepageButtons from "./components/HomepageButtons";
import HomepageHeader from "./components/HomepageHeader";
import { Node, Edge } from "reactflow";
import { initialNodes, initialEdges } from "./components/NodesEdges";

export default function Home() {
  const [startingNode, setStartingNode] = useState<Node | null>(null);
  const [endingNode, setEndingNode] = useState<Node | null>(null);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isTraining, setIsTraining] = useState(false); // State for controlling training

  // Log the nodes whenever they change
  useEffect(() => {
    if (startingNode) {
      console.log("Starting Node:", startingNode);
    }
    if (endingNode) {
      console.log("Ending Node:", endingNode);
    }
  }, [startingNode, endingNode]); // Dependency array ensures log is triggered on state change

  // Apply styles to the nodes based on starting/ending node
  useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === startingNode?.id) {
          return {
            ...node,
            style: { ...node.style, background: "#32CD32" }, // Green for starting node
          };
        }
        if (node.id === endingNode?.id) {
          return {
            ...node,
            style: { ...node.style, background: "red" }, // Red for ending node
          };
        }
        return node; // Return other nodes without changing style
      })
    );
  }, [startingNode, endingNode]); // Re-run effect when startingNode or endingNode changes

  // Handle node click and update state after rendering
  const handleNodeClick = (node: Node) => {
    if (startingNode && endingNode) {
      // Reset if the same node is selected
      setStartingNode(null);
      setEndingNode(null);
    } else if (!startingNode) {
      setStartingNode(node);
    } else if (!endingNode) {
      setEndingNode(node);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <HomepageHeader />
      <FlowGraph
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick} // Pass handler
      />
      <HomepageButtons
        startingNode={startingNode}
        endingNode={endingNode}
        nodes={nodes}
        edges={edges}
        setNodes={setNodes} // Pass setNodes here
        setEdges={setEdges} // Pass setEdges here
        setIsTraining={setIsTraining} // Pass setIsTraining as well
      />
    </div>
  );
}
