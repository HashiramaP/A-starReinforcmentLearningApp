import * as tf from "@tensorflow/tfjs";

export const startTraining = async (
  startingNode: any,
  endingNode: any,
  nodes: any[],
  edges: any[],
  setNodes: React.Dispatch<React.SetStateAction<any>>, // Add setNodes here
  setEdges: React.Dispatch<React.SetStateAction<any>> // Add setEdges here
) => {
  console.log("Starting training...");
  console.log("Nodes:", nodes);
  console.log("Edges:", edges);

  const environment = new GraphEnvironment(
    nodes,
    edges,
    startingNode.id,
    endingNode.id,
    setNodes,
    setEdges // Pass setNodes and setEdges to the environment
  );
  const agent = new RLAgent(0.1, 0.9, 0.1);

  console.log("Training started. Beginning episodes...");
  train(environment, agent, 10); // Train for 1000 episodes
};

class GraphEnvironment {
  nodes: any[];
  edges: any[];
  startingNode: string;
  endingNode: string;
  setNodes: React.Dispatch<React.SetStateAction<any>>; // Add setNodes here
  setEdges: React.Dispatch<React.SetStateAction<any>>; // Add setEdges here
  path: string[]; // Track the current path

  constructor(
    nodes: any[],
    edges: any[],
    startingNode: string,
    endingNode: string,
    setNodes: React.Dispatch<React.SetStateAction<any>>,
    setEdges: React.Dispatch<React.SetStateAction<any>>
  ) {
    this.nodes = nodes;
    this.edges = edges;
    this.startingNode = startingNode;
    this.endingNode = endingNode;
    this.setNodes = setNodes;
    this.setEdges = setEdges;
    this.path = [];

    // Bind the method
    this.updateColors = this.updateColors.bind(this);
  }

  getPossibleActions(currentNode: string): string[] {
    const actions = this.edges
      .filter((edge) => edge.source === currentNode)
      .map((edge) => edge.target);

    // Update node and edge colors
    this.updateColors(currentNode, actions);

    console.log(`Possible actions from node ${currentNode}:`, actions);
    return actions;
  }

  // Reward function: Give positive reward when goal is reached, negative penalty for each move
  getReward(currentNode: string): number {
    const reward = currentNode === this.endingNode ? 10 : -1;
    console.log(`Reward for node ${currentNode}: ${reward}`);
    return reward;
  }

  reset(): string {
    console.log("Environment reset. Starting at node:", this.startingNode);
    this.path = []; // Reset path
    return this.startingNode;
  }

  resetNodeColors = () => {
    // Reset all node colors to the default color except for the start and end nodes
    const updatedNodes = this.nodes.map((node) => ({
      ...node,
      style: {
        ...node.style,
        backgroundColor:
          node.id === this.startingNode
            ? "#32CD32" // Starting node in green
            : node.id === this.endingNode
            ? "red" // Ending node in red
            : "rgb(179, 170, 148)", // Default color for all other nodes
      },
    }));

    // Set the updated node colors
    this.setNodes(updatedNodes);
  };

  updateColors = (currentNode: string, possibleActions: string[]) => {
    // Update node colors
    const updatedNodes = this.nodes.map((node) => ({
      ...node,
      style: {
        ...node.style,
        backgroundColor:
          node.id === currentNode
            ? "orange" // Current node in orange
            : node.id === this.startingNode
            ? "#32CD32" // Starting node in green
            : node.id === this.endingNode
            ? "red" // Ending node in red
            : possibleActions.includes(node.id)
            ? "cyan" // Neighbor nodes in cyan
            : node.style.backgroundColor || "rgb(179, 170, 148)", // Default color
      },
    }));

    // Update edge colors
    const updatedEdges = this.edges.map((edge) => ({
      ...edge,
      style: {
        ...edge.style,
        stroke: this.path.includes(edge.id) ? "red" : edge.style.stroke, // Apply color to the stroke
      },
      labelStyle: {
        ...edge.labelStyle,
        backgroundColor: this.path.includes(edge.id)
          ? "red"
          : edge.labelStyle.backgroundColor, // Optional: Update label background color
      },
    }));

    // Update state to reflect changes
    this.setEdges(updatedEdges);

    // Set updated nodes and edges
    this.setNodes(updatedNodes);
  };

  highlightShortestPath(shortestPath: string[]) {
    // Update edge colors to highlight the shortest path
    const updatedEdges = this.edges.map((edge) => {
      const edgeId = `${edge.source}-${edge.target}`;
      const isInShortestPath =
        shortestPath.includes(edge.source) &&
        shortestPath.includes(edge.target);

      return {
        ...edge,
        style: {
          ...edge.style,
          stroke: isInShortestPath ? "red" : edge.style.stroke, // Apply red color to the stroke for edges in the shortest path
        },
        labelStyle: {
          ...edge.labelStyle,
          backgroundColor: isInShortestPath
            ? "red"
            : edge.labelStyle.backgroundColor, // Optional: Update label background color for shortest path edges
        },
      };
    });

    // Update state to reflect changes
    this.setEdges(updatedEdges);
  }

  // Add to the path after moving to a new node
  addToPath(edgeId: string) {
    if (!this.path.includes(edgeId)) {
      this.path.push(edgeId);
    }
  }
}

const GraphConvLayer = (
  inputFeatures: tf.Tensor,
  adjacencyMatrix: tf.Tensor
) => {
  // Simple graph convolution operation: Aggregate features based on the adjacency matrix
  return adjacencyMatrix.matMul(inputFeatures); // Aggregate node features using the adjacency matrix
};

// A simple GNN model to process node features
const buildGNNModel = (numNodes: number, numFeatures: number) => {
  const inputFeatures = tf.input({ shape: [numFeatures] });
  const adjacencyMatrix = tf.zeros([numNodes, numNodes]); // Initialize adjacency matrix (to be filled later)

  const aggregatedFeatures = GraphConvLayer(inputFeatures, adjacencyMatrix);

  const model = tf.model({
    inputs: inputFeatures,
    outputs: aggregatedFeatures,
  });

  return model;
};

class RLAgent {
  qTable: any; // Q-value table
  alpha: number; // Learning rate
  gamma: number; // Discount factor
  epsilon: number; // Exploration rate

  constructor(alpha: number, gamma: number, epsilon: number) {
    this.qTable = {}; // Initialize Q-table as an empty object
    this.alpha = alpha;
    this.gamma = gamma;
    this.epsilon = epsilon;
  }

  // Action selection using epsilon-greedy policy
  selectAction(state: string, possibleActions: string[]): string {
    let action: string;
    if (Math.random() < this.epsilon) {
      // Explore: random action
      action =
        possibleActions[Math.floor(Math.random() * possibleActions.length)];
      console.log(`Exploring: Selected random action: ${action}`); // Log exploration
    } else {
      // Exploit: select action with highest Q-value
      let bestAction = possibleActions[0];
      let maxQValue = this.getQValue(state, bestAction);

      possibleActions.forEach((actionOption) => {
        const qValue = this.getQValue(state, actionOption);
        if (qValue > maxQValue) {
          bestAction = actionOption;
          maxQValue = qValue;
        }
      });

      action = bestAction;
      console.log(
        `Exploiting: Selected action: ${action} with Q-value: ${maxQValue}`
      ); // Log exploitation
    }
    return action;
  }

  // Update Q-value table
  updateQValue(
    state: string,
    action: string,
    reward: number,
    nextState: string
  ) {
    const maxNextQValue = Math.max(
      ...Object.values(this.qTable[nextState] || {})
    );
    const currentQValue = this.getQValue(state, action);

    // Q-learning update rule
    const newQValue =
      currentQValue +
      this.alpha * (reward + this.gamma * maxNextQValue - currentQValue);
    this.setQValue(state, action, newQValue);

    console.log(
      `Q-table updated: State: ${state}, Action: ${action}, Reward: ${reward}, Next State: ${nextState}, New Q-value: ${newQValue}`
    ); // Log Q-value update
  }

  // Get Q-value for a state-action pair
  getQValue(state: string, action: string): number {
    return this.qTable[state]?.[action] || 0;
  }

  // Set Q-value for a state-action pair
  setQValue(state: string, action: string, value: number) {
    if (!this.qTable[state]) {
      this.qTable[state] = {};
    }
    this.qTable[state][action] = value;
  }

  // Trace the shortest path using the Q-table (after training)
  getShortestPath(startingNode: string, endingNode: string): string[] {
    let path: string[] = [startingNode];
    let currentNode = startingNode;

    while (currentNode !== endingNode) {
      const possibleActions = Object.keys(this.qTable[currentNode] || {});
      const nextAction = this.selectAction(currentNode, possibleActions); // Select the best action
      path.push(nextAction);
      currentNode = nextAction; // Move to the next state
    }

    return path; // Return the shortest path from start to end
  }
}

const train = async (
  environment: GraphEnvironment,
  agent: RLAgent,
  numEpisodes: number
) => {
  for (let episode = 0; episode < numEpisodes; episode++) {
    let state = environment.reset();
    let done = false;
    console.log(`Episode ${episode + 1} started.`);

    while (!done) {
      // Get possible actions for the current state (node)
      const possibleActions = environment.getPossibleActions(state);

      // Agent selects an action
      const action = agent.selectAction(state, possibleActions);

      // Add the current action to the path
      const currentEdgeId = `${state}-${action}`;
      environment.addToPath(currentEdgeId);

      // Update the visualization immediately
      environment.updateColors(state, possibleActions); // Pass empty array or current path

      // Wait briefly to allow the user to see updates (optional, for visual effect)
      await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay

      // Get the reward and the next state
      const reward = environment.getReward(action);
      const nextState = action;

      // Update the Q-table
      agent.updateQValue(state, action, reward, nextState);

      // Transition to the next state
      state = nextState;

      // Log the agent's current state and action
      console.log(`Agent moved to state: ${state}, Action: ${action}`);

      // If goal is reached, end the episode
      if (state === environment.endingNode) {
        done = true;
        console.log(`Goal reached at node: ${state}! Ending episode.`);
      }
    }
  }

  // After training, get the shortest path
  const shortestPath = agent.getShortestPath(
    environment.startingNode,
    environment.endingNode
  );
  console.log("Shortest Path:", shortestPath);

  // Reset all node colors after training, leaving start and end nodes green and red
  environment.resetNodeColors();

  // Highlight the edges in the shortest path by making them red
  environment.highlightShortestPath(shortestPath); // Pass the shortest path to highlight edges
};
