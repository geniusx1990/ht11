class Graph {
    constructor() {
        this.vertices = new Map(); // Adjacency list
    }

    // Add a vertex to the graph
    addVertex(vertex) {
        if (!this.vertices.has(vertex)) {
            this.vertices.set(vertex, new Map());
        }
    }

    // Add an edge between two vertices with a specified weight
    addEdgeWithWeight(vertex1, vertex2, weight) {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        this.vertices.get(vertex1).set(vertex2, weight);
        this.vertices.get(vertex2).set(vertex1, weight); // For an undirected graph
    }

    // Depth-First Search (DFS) algorithm
    dfs(root) {
        const visited = new Set();
        const result = [];

        const visit = (vertex) => {
            visited.add(vertex);
            result.push(vertex);

            for (const neighbor of this.vertices.get(vertex).keys()) {
                if (!visited.has(neighbor)) {
                    visit(neighbor);
                }
            }
        };

        visit(root);

        return result;
    }

// Breadth-First Search (BFS) algorithm to find the shortest path
// Breadth-First Search (BFS) algorithm to find the shortest path with edge weights
bfsShortestPath(startVertex, endVertex) {
    const visited = new Set();
    const queue = [[startVertex, []]];

    while (queue.length > 0) {
        const [currentVertex, path] = queue.shift();

        if (currentVertex === endVertex) {
            return [...path, currentVertex]; // Return the shortest path when the destination is reached
        }

        if (!visited.has(currentVertex)) {
            visited.add(currentVertex);

            for (const [neighbor, weight] of this.vertices.get(currentVertex).entries()) {
                if (!visited.has(neighbor)) {
                    const newPath = [...path, currentVertex];
                    queue.push([neighbor, newPath]);
                }
            }
        }
    }

    return null; // If no path exists
}

    // Dijkstra's Algorithm to find the shortest path
    dijkstraShortestPath(startVertex, endVertex) {
        const distances = {}; // Store the shortest distances from startVertex
        const previous = {}; // Store the previous vertex in the shortest path
        const visited = new Set(); // Set to keep track of visited vertices

        // Initialize distances and previous
        for (const vertex of this.vertices.keys()) {
            distances[vertex] = vertex === startVertex ? 0 : Infinity;
            previous[vertex] = null;
        }

        while (true) {
            // Find the vertex with the shortest distance among unvisited vertices
            let minDistance = Infinity;
            let currentVertex = null;
            for (const vertex of this.vertices.keys()) {
                if (!visited.has(vertex) && distances[vertex] < minDistance) {
                    minDistance = distances[vertex];
                    currentVertex = vertex;
                }
            }

            if (currentVertex === null) {
                break; // No reachable vertices left
            }

            visited.add(currentVertex);

            // Update distances and previous for neighbors
            for (const [neighbor, weight] of this.vertices.get(currentVertex).entries()) {
                const alt = distances[currentVertex] + weight;
                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = currentVertex;
                }
            }
        }

        // Reconstruct and return the shortest path
        const shortestPath = [];
        let vertex = endVertex;
        while (vertex !== null) {
            shortestPath.unshift(vertex);
            vertex = previous[vertex];
        }

        return shortestPath;
    }
}

// Create an instance of the graph
const graph = new Graph();

// Add vertices and edges with weights
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');

graph.addEdgeWithWeight('A', 'B', 2); // Edge between 'A' and 'B' with weight 2
graph.addEdgeWithWeight('A', 'C', 1); // Edge between 'A' and 'C' with weight 1
graph.addEdgeWithWeight('B', 'D', 3); // Edge between 'B' and 'D' with weight 3
graph.addEdgeWithWeight('C', 'D', 1); // Edge between 'C' and 'D' with weight 1

// Use Dijkstra's algorithm to find the shortest path
const shortestPath = graph.dijkstraShortestPath('A', 'D');
console.log('Shortest Path (Dijkstra Algorithm):', shortestPath);

// Use BFS to find the shortest path
const bfsShortestPath = graph.bfsShortestPath('A', 'D');
console.log('Shortest Path (BFS):', bfsShortestPath);

console.log(graph)