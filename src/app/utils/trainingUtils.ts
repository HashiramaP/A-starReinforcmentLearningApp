import * as tf from "@tensorflow/tfjs";

// Function to convert nodes and edges into a feature vector for training
const prepareInput = (
  nodes: any[],
  edges: any[],
  startingNode: string,
  endingNode: string
) => {
  const nodeIndexMap: { [key: string]: number } = {};
  nodes.forEach((node, index) => {
    nodeIndexMap[node.id] = index;
  });

  const nodeFeatures: number[] = [];
  nodes.forEach((node) => {
    nodeFeatures.push(node.position.x, node.position.y);
  });

  const edgeFeatures: number[] = [];
  edges.forEach((edge) => {
    const sourceIndex = nodeIndexMap[edge.source];
    const targetIndex = nodeIndexMap[edge.target];
    edgeFeatures.push(sourceIndex, targetIndex, edge.weight);
  });

  // Create a feature vector for the input to the model
  const input = [...nodeFeatures, ...edgeFeatures];
  return tf.tensor2d([input]); // return a 2D tensor (batch size 1)
};

// Create the model for training the heuristic
const createHeuristicModel = (inputSize: number) => {
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ inputShape: [inputSize], units: 16, activation: "relu" })
  );
  model.add(tf.layers.dense({ units: 16, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1 })); // Output heuristic value
  model.compile({ optimizer: "adam", loss: "meanSquaredError" });
  return model;
};

// A* Algorithm with machine learning model for heuristic
export const trainRLHeuristicAndFindPath = async (
  startingNode: string,
  endingNode: string,
  nodes: any[],
  edges: any[],
  epochs: number = 100
) => {
  console.log("Training started...");

  const inputTensor = prepareInput(nodes, edges, startingNode, endingNode);
  const model = createHeuristicModel(inputTensor.shape[1]);

  const target = tf.tensor2d([[Math.random()]]); // Example target heuristic value (random for now)

  const heuristicsAtEachIteration: { [key: string]: number }[] = [];

  // Training the model
  for (let epoch = 0; epoch < epochs; epoch++) {
    await model.fit(inputTensor, target, { epochs: 1 });

    // Print heuristic for each node after each epoch
    const nodeHeuristics: { [key: string]: number } = {};
    nodes.forEach((node) => {
      const nodeInput = prepareInput(nodes, edges, node.id, endingNode);
      const heuristic = model.predict(nodeInput) as tf.Tensor;
      nodeHeuristics[node.id] = heuristic.dataSync()[0];
    });

    heuristicsAtEachIteration.push(nodeHeuristics);
    console.log(`Epoch ${epoch + 1} heuristics:`, nodeHeuristics);
  }

  console.log("Training complete.");

  // A* algorithm to find the path
  const openSet: string[] = [startingNode.id];
  const cameFrom: { [key: string]: string | null } = {}; // To trace the path
  const gScore: { [key: string]: number } = {}; // g-score for each node
  const fScore: { [key: string]: number } = {}; // f-score for each node

  // Initialize gScore and fScore for all nodes
  nodes.forEach((node) => {
    gScore[node.id] = Number.POSITIVE_INFINITY;
    fScore[node.id] = Number.POSITIVE_INFINITY;
  });

  // Set the gScore and fScore for the starting node
  gScore[startingNode.id] = 0;
  fScore[startingNode.id] =
    heuristicsAtEachIteration[epochs - 1][startingNode.id];

  // Initialize the starting node in the cameFrom object
  cameFrom[startingNode.id] = null; // Starting node doesn't come from any other node

  console.log("Starting A* Search...");
  console.log("Starting node", startingNode);

  while (openSet.length > 0) {
    // Get the node with the lowest f-score
    console.log("Open set:", openSet);
    const currentNodeId = openSet.reduce((a, b) =>
      fScore[a] < fScore[b] ? a : b
    );
    console.log(`Processing node ${currentNodeId}`);

    if (currentNodeId === endingNode.id) {
      // Reconstruct the path
      const path: string[] = [];
      let current = currentNodeId;
      while (current !== null) {
        path.unshift(current);
        current = cameFrom[current];
      }
      console.log("Final path:", path);
      return { heuristicsAtEachIteration, finalPath: path };
    }

    openSet.splice(openSet.indexOf(currentNodeId), 1); // Remove currentNode from openSet

    // Find the neighbors of the current node
    const neighbors = edges.filter(
      (edge) => edge.source === currentNodeId || edge.target === currentNodeId
    );
    console.log(`Neighbors of ${currentNodeId}:`, neighbors);

    neighbors.forEach((neighbor) => {
      const tentativeGScore = gScore[currentNodeId] + neighbor.weight;
      console.log(
        `Tentative GScore for ${neighbor.target}: ${tentativeGScore}`
      );

      if (tentativeGScore < gScore[neighbor.target]) {
        cameFrom[neighbor.target] = currentNodeId;
        gScore[neighbor.target] = tentativeGScore;

        // Calculate the f-score (g-score + heuristic from the model)
        const heuristic =
          heuristicsAtEachIteration[epochs - 1][neighbor.target];
        fScore[neighbor.target] = gScore[neighbor.target] + heuristic;

        if (!openSet.includes(neighbor.target)) {
          openSet.push(neighbor.target);
        }
      }
    });
  }

  console.log("No path found.");
  return { heuristicsAtEachIteration, finalPath: [] };
};

// Start the training process
export const startTraining = async (
  startingNode: string,
  endingNode: string,
  nodes: any[],
  edges: any[]
) => {
  console.log("Starting training...");
  console.log("Nodes:", nodes);
  console.log("Edges:", edges);

  const { heuristicsAtEachIteration, finalPath } =
    await trainRLHeuristicAndFindPath(
      startingNode,
      endingNode,
      nodes,
      edges,
      100
    );

  console.log("Heuristics at each iteration:", heuristicsAtEachIteration);
  console.log("Final path:", finalPath);

  console.log("Training complete.");
};
