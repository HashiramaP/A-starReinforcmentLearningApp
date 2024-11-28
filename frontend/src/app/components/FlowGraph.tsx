"use client";

import React, { useState } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

// Define the nodes with the correct structure for ReactFlow
const initialNodes = [
  {
    id: "A",
    data: { label: "A" },
    position: { x: 50, y: 100 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },

  {
    id: "B",
    data: { label: "B" },
    position: { x: 200, y: 50 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "C",
    data: { label: "C" },
    position: { x: 350, y: 100 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "D",
    data: { label: "D" },
    position: { x: 500, y: 200 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "E",
    data: { label: "E" },
    position: { x: 650, y: 150 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "F",
    data: { label: "F" },
    position: { x: 100, y: 300 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "G",
    data: { label: "G" },
    position: { x: 250, y: 250 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "H",
    data: { label: "H" },
    position: { x: 400, y: 300 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "I",
    data: { label: "I" },
    position: { x: 550, y: 400 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "J",
    data: { label: "J" },
    position: { x: 700, y: 350 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
  {
    id: "K",
    data: { label: "K" },
    position: { x: 850, y: 450 },
    style: {
      borderRadius: "50%",
      background: "rgb(179, 170, 148)",
      border: "3px solid black",
      width: "65px",
      height: "65px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px", // Make the font size larger
      fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
    },
  },
];

// Define the edges with proper `source` and `target` properties
const initialEdges = [
  {
    id: "eA-B",
    source: "A",
    target: "B",
    style: { stroke: "black", strokeWidth: 3 },
  },
  {
    id: "eB-C",
    source: "B",
    target: "C",
    style: { stroke: "black", strokeWidth: 3 },
  },
  {
    id: "eC-D",
    source: "C",
    target: "D",
    style: { stroke: "black", strokeWidth: 3 },
  },
  {
    id: "eD-E",
    source: "D",
    target: "E",
    style: { stroke: "black", strokeWidth: 3 },
  },
  {
    id: "eE-F",
    source: "E",
    target: "F",
    style: { stroke: "black", strokeWidth: 3 },
  },
  {
    id: "eF-G",
    source: "F",
    target: "G",
    style: { stroke: "black", strokeWidth: 3 },
  },
  {
    id: "eG-H",
    source: "G",
    target: "H",
    style: { stroke: "black", strokeWidth: 3 },
  },
  {
    id: "eH-I",
    source: "H",
    target: "I",
    style: { stroke: "black", strokeWidth: 3 },
  },
  {
    id: "eI-J",
    source: "I",
    target: "J",
    style: { stroke: "black", strokeWidth: 3 },
  },
  {
    id: "eJ-K",
    source: "J",
    target: "K",
    style: { stroke: "black", strokeWidth: 3 },
  },
];

const proOptions = { hideAttribution: true };

const FlowGraph = () => {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        proOptions={proOptions}
        panOnDrag={false} // Disable panning
        zoomOnScroll={false} // Disable zooming with scroll
        zoomOnPinch={false} // Disable pinch zoom
        defaultViewport={{ x: 380, y: 0, zoom: 1 }} // Set default offset and zoom
      />
    </div>
  );
};

export default FlowGraph;
