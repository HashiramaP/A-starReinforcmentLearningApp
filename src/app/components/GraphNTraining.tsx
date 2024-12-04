"use client";

import React, { useState, useEffect } from "react";
import { Node, Edge } from "reactflow";
import { initialEdges, initialNodes } from "./NodesEdges";
import FlowGraph from "./FlowGraph";
import HomepageButtons from "./HomepageButtons";

export default function GraphNTraining() {
  const [startingNode, setStartingNode] = useState<Node | null>(null);
  const [endingNode, setEndingNode] = useState<Node | null>(null);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isTraining, setIsTraining] = useState(false);

  // Log the nodes whenever they change
  useEffect(() => {
    if (startingNode) console.log("Starting Node:", startingNode);
    if (endingNode) console.log("Ending Node:", endingNode);
  }, [startingNode, endingNode]);

  // Apply styles to nodes based on selection
  useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const defaultStyle = {
          ...node.style,
          backgroundColor: "rgb(179, 170, 148)",
        };
        if (node.id === startingNode?.id) {
          return {
            ...node,
            style: { ...defaultStyle, backgroundColor: "#32CD32" },
          };
        }
        if (node.id === endingNode?.id) {
          return {
            ...node,
            style: { ...defaultStyle, backgroundColor: "red" },
          };
        }
        return { ...node, style: defaultStyle };
      })
    );
    setEdges((prevEdges) =>
      prevEdges.map((edge) => ({
        ...edge,
        style: { stroke: "black", strokeWidth: 3 },
      }))
    );
  }, [startingNode, endingNode]);

  const handleNodeClick = (node: Node) => {
    if (startingNode && endingNode) {
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
      <FlowGraph nodes={nodes} edges={edges} onNodeClick={handleNodeClick} />
      <HomepageButtons
        startingNode={startingNode}
        endingNode={endingNode}
        nodes={nodes}
        edges={edges}
        setNodes={setNodes}
        setEdges={setEdges}
        setIsTraining={setIsTraining}
      />
    </div>
  );
}
