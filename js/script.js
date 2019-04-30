document.addEventListener("DOMContentLoaded", init, false);
var canvas;
var c;

function init() {
  canvas = document.getElementById("myCanvas");
  c = canvas.getContext("2d");
}

// directed, weighted graph implemented with adjacency list
class Graph {
  constructor() {
    this.adjList = new Map();
  }
  addVertex(vertex, x, y) {
    this.adjList.set(vertex, [{ x: x, y: y }, []]);
  }
  addEdge(edge, weight) {
    this.adjList.get(edge[0])[1].push([edge[1], weight]);
    this.adjList.get(edge[1])[1].push([edge[0], weight]);
  }
  draw() {
    let keys = this.adjList.keys();
    for (let key of keys) {
      let val = this.adjList.get(key);
      drawCircle(val[0].x, val[0].y);
    }
  }
}

function drawCircle(x, y) {
  c.beginPath();
  c.arc(x, y, 8, 0, 2 * Math.PI);
  c.fillStyle = "red";
  c.fill();
  c.lineWidth = 2;
  c.stroke();
}

function log() {
  let graph = new Graph();
  graph.addVertex("A", 200, 300);
  graph.addVertex("B", 400, 300);
  graph.addEdge(["A", "B"], 1);
  graph.draw();
}
