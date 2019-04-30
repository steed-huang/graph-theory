// directed, weighted graph
class Graph {
  constructor() {
    this.adjList = new Map();
  }
  addVertex(vertex) {
    this.adjList.set(vertex, []);
  }
  addEdge(edge, weight) {
    this.adjList.get(edge[0]).push([edge[1], weight]);
    this.adjList.get(edge[1]).push([edge[0], weight]);
  }
  draw() {}
}

function log() {
  let graph = new Graph();
  graph.addVertex("A");
  graph.addVertex("B");
  graph.addEdge(["A", "B"], 1);
  graph.draw();
}
