"use client";

import React, { useState } from "react";
import FlowGraph from "./components/FlowGraph";
import HomepageButtons from "./components/HomepageButtons";
import HomepageHeader from "./components/HomepageHeader";

export default function Home() {
  const [startingNode, setStartingNode] = useState<any | null>(null);
  const [endingNode, setEndingNode] = useState<any | null>(null);

  const handleStartEndNodeChange = (startNode: any, endNode: any) => {
    setStartingNode(startNode);
    setEndingNode(endNode);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <HomepageHeader />
      <FlowGraph onStartEndNodeChange={handleStartEndNodeChange} />
      <HomepageButtons startingNode={startingNode} endingNode={endingNode} />
    </div>
  );
}
