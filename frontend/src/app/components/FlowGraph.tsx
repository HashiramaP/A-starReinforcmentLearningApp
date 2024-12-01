"use client";

import React, { useState } from "react";
import ReactFlow, { Node } from "reactflow";
import "reactflow/dist/style.css";
import { initialNodes, initialEdges } from "./NodesEdges";

const proOptions = { hideAttribution: true };

const FlowGraph = () => {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);
  const [clickCount, setClickCount] = useState(0); // Track number of clicks
  const [startingNode, setStartingNode] = useState<Node | null>(null); // Store starting node
  const [endingNode, setEndingNode] = useState<Node | null>(null); // Store ending node

  // Handle node click
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setClickCount((prevCount) => prevCount + 1); // Increment click count

    if (clickCount % 2 === 0) {
      // First click (starting point)
      setStartingNode(node);
      console.log(`Starting point is: ${node.data.label}`);
    } else {
      // Second click (ending point)
      setEndingNode(node);
      console.log(`Ending point is: ${node.data.label}`);
    }
  };

  // Update node styles based on starting/ending state
  const updatedNodes = nodes.map((node: Node) => {
    let nodeStyle = { ...node.style };

    if (startingNode && node.id === startingNode.id) {
      // Add border or circle for the starting node
      nodeStyle = {
        ...nodeStyle,
        border: "3px solid green",
        boxShadow: "0 0 15px green",
      };
    }

    if (endingNode && node.id === endingNode.id) {
      // Add border or circle for the ending node
      nodeStyle = {
        ...nodeStyle,
        border: "3px solid red",
        boxShadow: "0 0 15px red",
      };
    }

    return {
      ...node,
      style: nodeStyle,
    };
  });

  return (
    <div style={{ height: "60%", width: "100%" }}>
      <ReactFlow
        nodes={updatedNodes}
        edges={edges}
        proOptions={proOptions}
        panOnDrag={false} // Disable panning
        zoomOnScroll={false} // Disable zooming with scroll
        zoomOnPinch={false} // Disable pinch zoom
        fitView={true} // Fit the view to the graph
        onNodeClick={onNodeClick} // Add the onNodeClick handler
        zoomOnDoubleClick={false} // Disable zoom on double-click
      />
    </div>
  );
};

export default FlowGraph;
