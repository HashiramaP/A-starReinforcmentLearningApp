from fastapi import FastAPI
import networkx as nx

app = FastAPI()

# Graph and model state
state = {"graph": None, "training": False}

@app.post("/generate-graph")
def generate_graph():
    G = nx.gnm_random_graph(10, 20)
    state["graph"] = nx.node_link_data(G)
    return {"graph": state["graph"]}

@app.post("/start-training")
def start_training():
    if not state["graph"]:
        return {"error": "Generate a graph first"}
    state["training"] = True
    return {"status": "Training started"}

@app.post("/reset")
def reset():
    state["graph"] = None
    state["training"] = False
    return {"status": "Reset complete"}

