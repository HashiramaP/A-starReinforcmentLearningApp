"use client";
import React, { useEffect } from "react";
import { initialNodes, initialEdges } from "./NodesEdges";
import * as tf from "@tensorflow/tfjs";

class HeuristicGNN {
  constructor(inputDim: number, hiddenDim: number) {
    this.dense1 = tf.layers.dense({ units: hiddenDim, activation: "relu" });
    this.dense2 = tf.layers.dense({ units: 1 }); // Output a heuristic value per node
  }

  call(inputs: tf.Tensor): tf.Tensor {
    let x = this.dense1.apply(inputs) as tf.Tensor;
    x = this.dense2.apply(x) as tf.Tensor;
    return x;
  }

  createModel(inputDim: number, hiddenDim: number) {
    const inputLayer = tf.input({ shape: [inputDim] });
    const x = this.dense1.apply(inputLayer) as tf.Tensor;
    const outputLayer = this.dense2.apply(x) as tf.Tensor;
    return tf.model({ inputs: inputLayer, outputs: outputLayer });
  }
}

// Helper function to compute rewards
const computeReward = (pathLength: number, nodeExpansions: number): number => {
  return -pathLength - 0.1 * nodeExpansions; // Example reward function
};

const aStar = (graph: any, start: any, goal: any, heuristic: any) => {
  const openSet = [];
  const cameFrom: { [key: string]: string } = {};
  const gScore: { [key: string]: number } = {};
  const fScore: { [key: string]: number } = {};

  const nodeToIndex: { [key: string]: number } = {};
  initialNodes.forEach((node, index) => {
    nodeToIndex[node.id] = index; // Map node labels (like "A", "B", etc.) to indices
  });

  initialNodes.forEach((node) => {
    gScore[node.id] = Infinity;
    fScore[node.id] = Infinity;
  });
  gScore[start] = 0;
  fScore[start] = heuristic[nodeToIndex[start]][0];
  openSet.push({ node: start, priority: fScore[start] });

  while (openSet.length > 0) {
    openSet.sort((a: any, b: any) => a.priority - b.priority);
    const current = openSet.shift().node;

    console.log("Processing Node:", current);
    console.log(
      "Open Set:",
      openSet.map((item: any) => item.node)
    );
    console.log("gScore:", gScore);

    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }

    initialEdges.forEach((edge) => {
      if (edge.source === current) {
        const tentativeGScore = gScore[current] + edge.weight; // Use edge weight for gScore calculation
        const neighbor = edge.target;

        console.log("Neighbor:", neighbor);
        const neighborIndex = nodeToIndex[neighbor];
        console.log("Index for neighbor:", neighborIndex);

        // Ensure heuristic value exists for neighbor
        const heuristicValue =
          heuristic[neighborIndex] && heuristic[neighborIndex][0];
        if (typeof heuristicValue === "undefined") {
          console.error(`Heuristic value is missing for node ${neighbor}`);
          return;
        }

        console.log("Tentative gScore for neighbor:", tentativeGScore);
        console.log("Current gScore for neighbor:", gScore[neighbor]);

        if (tentativeGScore < gScore[neighbor]) {
          cameFrom[neighbor] = current;
          gScore[neighbor] = tentativeGScore;
          fScore[neighbor] = gScore[neighbor] + heuristicValue;

          const existingNode = openSet.find(
            (item: any) => item.node === neighbor
          );
          if (existingNode) {
            existingNode.priority = fScore[neighbor]; // Update the priority
          } else {
            openSet.push({ node: neighbor, priority: fScore[neighbor] });
          }
        }
      }
    });

    console.log(
      "Open Set after processing:",
      openSet.map((item: any) => item.node)
    );
  }

  console.log("No path found");
  return null;
};

// Reconstruct the path by tracing the `cameFrom` map
const reconstructPath = (cameFrom: any, current: any): any[] => {
  const path = [current];
  while (cameFrom[current]) {
    current = cameFrom[current];
    path.push(current);
  }
  return path.reverse();
};

// Function to generate a tensor of node features for TensorFlow.js
const getGraphData = (graph: any, start: any, goal: any) => {
  const nodePositions = {};
  graph.forEach((_, node) => {
    nodePositions[node] = [Math.random(), Math.random()]; // Random positions for nodes
  });

  const nodeFeatures = [];
  graph.forEach((_, node) => {
    nodeFeatures.push([
      ...nodePositions[node], // Feature 1: node position
      ...nodePositions[goal], // Feature 2: goal position
    ]);
  });

  return tf.tensor(nodeFeatures);
};

const startTraining = async (startingNode: any, endingNode: any) => {
  const graph = new Map();
  initialNodes.forEach((node) => graph.set(node.id, []));
  initialEdges.forEach((edge) => {
    graph.get(edge.source).push(edge.target);
    graph.get(edge.target).push(edge.source); // Assuming undirected graph
  });

  const inputDim = 4; // 2 for node position, 2 for goal position
  const hiddenDim = 16;
  const gnn = new HeuristicGNN(inputDim, hiddenDim);
  const model = gnn.createModel(inputDim, hiddenDim);

  console.log("startingNode", startingNode.id);
  console.log("endingNode", endingNode.id);
  console.log("Graph", graph);

  const optimizer = tf.train.adam(0.01); // Learning rate

  for (let episode = 0; episode < 50; episode++) {
    const start = startingNode.id;
    const goal = endingNode.id;

    const nodeFeatures = getGraphData(graph, start, goal);
    const heuristic = await model.predict(nodeFeatures).array();

    const path = aStar(graph, start, goal, heuristic);
    if (!path) continue;

    const pathLength = path.length;
    const nodeExpansions = initialNodes.length;
    const reward = computeReward(pathLength, nodeExpansions);

    console.log(`Episode ${episode}: Loss = ${-reward}, Path = ${path}`);

    try {
      optimizer.minimize(() => {
        const prediction = model.predict(nodeFeatures); // [numNodes, 1]
        const target = tf.tensor(heuristic); // Ensure target is the same shape as prediction

        const loss = tf.losses.meanSquaredError(target, prediction); // Now shapes should match

        return loss;
      });
    } catch (error) {
      console.error("Optimizer error:", error);
    }
  }
};

// The component that starts the training process
function HomepageButtons({
  startingNode,
  endingNode,
}: {
  startingNode: any;
  endingNode: any;
}) {
  return (
    <div>
      <div className="flex space-x-6 mt-6">
        {/* Generate Graph Button */}
        <button className="rock-button">Generate a Graph</button>

        {/* Train Model Button */}
        <button
          className="rock-button"
          onClick={() => startTraining(startingNode, endingNode)}
        >
          Train my Model
        </button>
      </div>
    </div>
  );
}

export default HomepageButtons;
