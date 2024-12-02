"use client";
import React from "react";
import ReactFlow, { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

const proOptions = { hideAttribution: true };

const FlowGraph = ({
  nodes,
  edges,
  onNodeClick,
}: {
  nodes: Node[];
  edges: Edge[];
  onNodeClick: (node: Node) => void; // Pass the handler to the parent
}) => {
  return (
    <div style={{ height: "60%", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        proOptions={proOptions}
        panOnDrag={false} // Disable panning
        zoomOnScroll={false} // Disable zooming with scroll
        zoomOnPinch={false} // Disable pinch zoom
        fitView={true} // Fit the view to the graph
        onNodeClick={(_, node) => onNodeClick(node)} // Call parent handler
        zoomOnDoubleClick={false} // Disable zoom on double-click
      />
    </div>
  );
};

export default FlowGraph;
