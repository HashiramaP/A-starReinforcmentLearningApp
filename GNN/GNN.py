import networkx as nx
import numpy as np
import torch
import torch.nn as nn
from torch_geometric.nn import GCNConv
from torch_geometric.data import Data
import heapq
import matplotlib.pyplot as plt
import random

# ======================
# 1. Define the Neural Network
# ======================
class HeuristicGNN(nn.Module):
    def __init__(self, input_dim, hidden_dim):
        super(HeuristicGNN, self).__init__()
        self.conv1 = GCNConv(input_dim, hidden_dim)
        self.conv2 = GCNConv(hidden_dim, 1)  # Output is a single heuristic value per node

    def forward(self, x, edge_index):
        x = self.conv1(x, edge_index)
        x = torch.relu(x)
        x = self.conv2(x, edge_index)
        return x

# ======================
# 2. Define the A* Algorithm
# ======================
def a_star(graph, start, goal, heuristic):
    open_set = []
    heapq.heappush(open_set, (0, start))
    came_from = {}
    g_score = {node: float('inf') for node in graph.nodes}
    g_score[start] = 0

    while open_set:
        _, current = heapq.heappop(open_set)

        if current == goal:
            return reconstruct_path(came_from, current)

        for neighbor in graph.neighbors(current):
            tentative_g_score = g_score[current] + 1  # Assuming unit edge weights
            if tentative_g_score < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score = g_score[neighbor] + heuristic[neighbor]
                heapq.heappush(open_set, (f_score, neighbor))
    return None

def reconstruct_path(came_from, current):
    path = [current]
    while current in came_from:
        current = came_from[current]
        path.append(current)
    return path[::-1]

# ======================
# 3. Reward Function
# ======================
def compute_reward(path_length, node_expansions):
    return -path_length - 0.1 * node_expansions  # Example reward

# ======================
# 4. Helper Functions
# ======================
def generate_random_graph(num_nodes=15, edge_prob=0.15):
    graph = nx.gnp_random_graph(num_nodes, edge_prob)
    while not nx.is_connected(graph):  # Ensure graph is connected
        graph = nx.gnp_random_graph(num_nodes, edge_prob)
    return graph

def get_graph_data(graph, start, goal):
    # Create node features
    node_positions = {n: np.array([random.random(), random.random()]) for n in graph.nodes}
    node_features = []
    for node in graph.nodes:
        feature = np.concatenate((node_positions[node], node_positions[goal]))
        node_features.append(feature)
    
    # Convert to NumPy array first
    node_features = np.array(node_features, dtype=np.float32)
    node_features = torch.tensor(node_features, dtype=torch.float)

    # Create edge index
    edge_index = []
    for edge in graph.edges:
        edge_index.append(edge)
        edge_index.append((edge[1], edge[0]))  # Add reverse direction
    edge_index = torch.tensor(edge_index, dtype=torch.long).t()

    return node_features, edge_index

def visualize_graph(graph, path=None):
    pos = nx.spring_layout(graph)
    nx.draw(graph, pos, with_labels=True)
    if path:
        path_edges = list(zip(path, path[1:]))
        nx.draw_networkx_edges(graph, pos, edgelist=path_edges, edge_color='r', width=2)
    plt.show()

# ======================
# 5. Training
# ======================
def train_model(episodes=100, lr=0.01):
    # Model and optimizer
    input_dim = 4  # 2 for node position, 2 for goal position
    hidden_dim = 16
    model = HeuristicGNN(input_dim=input_dim, hidden_dim=hidden_dim)
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)

    for episode in range(episodes):
        graph = generate_random_graph()
        start, goal = random.choice(list(graph.nodes)), random.choice(list(graph.nodes))

        # Get node features and edge index
        node_features, edge_index = get_graph_data(graph, start, goal)

        # Forward pass
        heuristic = model(node_features, edge_index).detach().numpy().flatten()

        # Run A* with the heuristic
        path = a_star(graph, start, goal, heuristic)
        if path is None:
            continue

        # Compute reward
        path_length = len(path)
        node_expansions = len(graph.nodes)
        reward = compute_reward(path_length, node_expansions)

        # Update model
        optimizer.zero_grad()
        loss = -reward  # Policy gradient: maximize reward
        loss = torch.tensor(loss, requires_grad=True)  # Convert reward to tensor
        loss.backward()
        optimizer.step()

        if episode % 10 == 0:
            print(f"Episode {episode}: Loss = {loss.item()}, Path Length = {path_length}")

    return model

# ======================
# 6. Main Script
# ======================
if __name__ == "__main__":
    # Train the model
    trained_model = train_model(episodes=50)

    # Test on a new graph
    test_graph = generate_random_graph()
    start, goal = random.choice(list(test_graph.nodes)), random.choice(list(test_graph.nodes))
    node_features, edge_index = get_graph_data(test_graph, start, goal)
    heuristic = trained_model(node_features, edge_index).detach().numpy().flatten()
    test_path = a_star(test_graph, start, goal, heuristic)

    # Visualize the result
    print(f"Test Path: {test_path}")
    visualize_graph(test_graph, path=test_path)
