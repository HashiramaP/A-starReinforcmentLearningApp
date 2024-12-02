"use client";

import React, { useState, useEffect } from "react";
import ReactFlow, { Node } from "reactflow";
import "reactflow/dist/style.css";
import { initialNodes, initialEdges } from "./NodesEdges";

const proOptions = { hideAttribution: true };

const FlowGraph = ({
  onStartEndNodeChange,
}: {
  onStartEndNodeChange: (startNode: Node | null, endNode: Node | null) => void;
}) => {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);
  const [clickCount, setClickCount] = useState(0); // Track number of clicks
  const [startingNode, setStartingNode] = useState<Node | null>(null); // Store starting node
  const [endingNode, setEndingNode] = useState<Node | null>(null); // Store ending node

  // Handle node click
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount % 2 === 1) {
        setStartingNode(node);
      } else {
        setEndingNode(node);
      }
      return newCount;
    });
  };

  useEffect(() => {
    if (startingNode && endingNode) {
      if (startingNode.id === endingNode.id) {
        // If the same node is selected for both, reset them
        setStartingNode(null);
        setEndingNode(null);
      } else {
        onStartEndNodeChange(startingNode, endingNode);
      }
    }
  }, [startingNode, endingNode, onStartEndNodeChange]);

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
