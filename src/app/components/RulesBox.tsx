import React, { ReactNode } from "react";

export default function RulesBox({ children }: { children: ReactNode }) {
  return (
    <div className="rules-message">
      {children}
      <div className="text-3xl">Welcome to Graph RL</div>
      <div className="mt-5">How does it work?</div>
      <div className="mt-5 text-center text-base">
        Graph RL lets you visualize the training process of a reinforcement
        learning agent trying to find the shortest path in a graph.
      </div>
      <div className="mt-2 text-center text-base">
        At first, the agent uses random choices to try to explore the graph{" "}
        <br />
        As the Agent lands on a Node, it gets rewarded based on the node&apos;s
        probability of being in the shortest path. It then calculates a q-value
        for every node in the graph.
      </div>
      <div className="mt-2 text-center text-base">
        The shortest path consists of the nodes with the best q-values
      </div>
      <div className="my-4">How to play?</div>
      <div className="flex items-start flex-col text-base">
        <div>1- Click on two nodes to select a starting and ending point</div>
        <div>2- Choose the number of iterations</div>
        <div>3- Train it</div>
      </div>
      <div className="mt-5">Legend</div>
      <div className="flex flex-col items-center mt-4">
        {/* Flow representation */}
        <div className="flex items-center">
          <div
            className="node-box flex justify-center items-center border m-5 border-black rounded-full"
            style={{
              borderRadius: "50%",
              background: "orange",
              border: "3px solid black",
              width: "clamp(50px, 5vw, 75px)",
              height: "clamp(40px, 5vw, 65px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "clamp(10px, 2rem, 18px)", // Make the font size larger
              fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
            }}
          >
            A
          </div>
          <div
            className="next-box flex items-center m-5 border-black rounded"
            style={{
              height: "40px",
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            Node the Agent is currently on
          </div>
          <div
            className="node-box flex justify-center items-center border m-5 border-black rounded-full"
            style={{
              borderRadius: "50%",
              background: "cyan",
              border: "3px solid black",
              width: "clamp(50px, 5vw, 75px)",
              height: "clamp(40px, 5vw, 65px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "clamp(10px, 2rem, 18px)", // Make the font size larger
              fontFamily: "Halo Dek, Arial, Helvetica, sans-serif", // Use your custom font
            }}
          >
            B
          </div>
          <div
            className="next-box flex items-center  border-black rounded"
            style={{
              height: "40px",
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            Neighbors of the current Node
          </div>
        </div>
        {/* Edge below */}
        <div
          className="next-box flex items-center border-black rounded"
          style={{
            height: "40px",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          Edge is in shortest path
        </div>
        <div
          className="edge-line mt-3"
          style={{
            width: "200px",
            height: "3px",
            backgroundColor: "red",
            strokeWidth: 3,
          }}
        ></div>
      </div>
    </div>
  );
}
