"use client";

import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
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

  // Simulate training process
  useEffect(() => {
    if (!isTraining) return;

    const interval = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          Math.random() > 0.5
            ? {
                ...node,
                style: {
                  ...node.style,
                  background: "orange", // Change node background color
                },
              }
            : node
        )
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval
  }, [isTraining]);

  // TensorFlow.js setup
  useEffect(() => {
    const setupTensorFlow = async () => {
      const backendSet = localStorage.getItem("tensorflow-backend-set");

      if (!backendSet) {
        console.log("Setting TensorFlow.js backend to cpu...");
        await tf.setBackend("cpu");
        await tf.ready();
        localStorage.setItem("tensorflow-backend-set", "true");
        console.log("TensorFlow.js is ready with backend:", tf.getBackend());
      } else {
        await tf.ready();
        const currentBackend = tf.getBackend();
        console.log("TensorFlow.js backend already set:", currentBackend);

        if (currentBackend !== "cpu") {
          console.log("Forcing TensorFlow.js backend to cpu...");
          await tf.setBackend("cpu");
          await tf.ready();
          console.log("Backend set to cpu:", tf.getBackend());
        }
      }
    };

    setupTensorFlow();
  }, []);

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
        setIsTraining={setIsTraining} // Pass the setIsTraining function as a prop
      />
    </div>
  );
}
