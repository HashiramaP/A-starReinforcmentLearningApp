"use client";

import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import FlowGraph from "./components/FlowGraph";
import HomepageButtons from "./components/HomepageButtons";
import HomepageHeader from "./components/HomepageHeader";

export default function Home() {
  const [startingNode, setStartingNode] = useState<string | null>(null);
  const [endingNode, setEndingNode] = useState<string | null>(null);
  const [nodes, setNodes] = useState<any[]>([]); // State to manage node styles

  const handleStartEndNodeChange = (startNode: any, endNode: any) => {
    setStartingNode(startNode);
    setEndingNode(endNode);
  };

  // TensorFlow.js setup
  useEffect(() => {
    const setupTensorFlow = async () => {
      const backendSet = localStorage.getItem("tensorflow-backend-set");

      // Check if the backend is already set
      if (!backendSet) {
        console.log("Setting TensorFlow.js backend to cpu...");
        await tf.setBackend("cpu"); // Explicitly set to CPU
        await tf.ready(); // Ensure TensorFlow.js is initialized
        localStorage.setItem("tensorflow-backend-set", "true");
        console.log("TensorFlow.js is ready with backend:", tf.getBackend());
      } else {
        // If backend is already set, check and log it
        await tf.ready(); // Ensure TensorFlow.js is initialized
        const currentBackend = tf.getBackend();
        console.log("TensorFlow.js backend already set:", currentBackend);

        // Force set to cpu if it's not set to cpu already
        if (currentBackend !== "cpu") {
          console.log("Forcing TensorFlow.js backend to cpu...");
          await tf.setBackend("cpu");
          await tf.ready(); // Ensure TensorFlow.js is initialized with cpu
          console.log("Backend set to cpu:", tf.getBackend());
        }
      }
    };

    setupTensorFlow();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen">
      <HomepageHeader />
      <FlowGraph onStartEndNodeChange={handleStartEndNodeChange} />
      <HomepageButtons startingNode={startingNode} endingNode={endingNode} />
    </div>
  );
}
