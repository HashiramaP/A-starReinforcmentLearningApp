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
  train(environment, agent, 100); // Train for 1000 episodes
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

  updateColors = (currentNode: string, possibleActions: string[]) => {
    const updatedNodes = this.nodes.map((node) => ({
      ...node,
      style: {
        ...node.style,
        backgroundColor:
          node.id === currentNode ? "orange" : node.style.backgroundColor,
      },
    }));

    const updatedEdges = this.edges.map((edge) => ({
      ...edge,
      style: {
        ...edge.style,
        stroke: possibleActions.includes(edge.target)
          ? "cyan"
          : edge.style.stroke,
      },
    }));

    const pathEdges = updatedEdges.map((edge) => ({
      ...edge,
      style: {
        ...edge.style,
        stroke: this.path.includes(edge.id) ? "red" : edge.style.stroke,
      },
    }));

    this.setNodes(updatedNodes);
    this.setEdges(pathEdges);
  };

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
};
