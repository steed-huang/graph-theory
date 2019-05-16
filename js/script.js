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
      drawNode(key, val[0].x, val[0].y);
      for (let i = 0; i < val[1].length; i++) {
        // lines are drawn twice -> improve later
        let pos = this.adjList.get(val[1][i][0])[0];
        drawLine(val[0].x, val[0].y, pos.x, pos.y);
      }
    }
  }
  print() {
    let keys = this.adjList.keys();
    for (var key of keys) {
      var val = this.adjList.get(key)[1];
      console.log(key + ": " + val);
    }
  }
}

function drawText(str, x, y) {
  c.font = "20px Arial";
  c.fillStyle = "black";
  c.textAlign = "center";
  c.fillText(str, x, y);
}

function drawNode(str, x, y) {
  c.beginPath();
  c.arc(x, y, 15, 0, 2 * Math.PI);
  c.fillStyle = "red";
  c.fill();
  c.lineWidth = 2;
  c.stroke();
  drawText(str, x, y + 7);
}

function drawLine(x1, y1, x2, y2) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getWeight(n1, n2) {
  let x1 = graph.adjList.get(n1)[0].x;
  let y1 = graph.adjList.get(n1)[0].y;
  let x2 = graph.adjList.get(n2)[0].x;
  let y2 = graph.adjList.get(n2)[0].y;

  return Number(Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2).toFixed(0));
}

function generateGraph(num, edges) {
  window.graph = new Graph();
  let vertName = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let edgeAcc = 0;

  graph.addVertex("A", getRandom(100, 500), getRandom(100, 500));

  for (let i = 1; i < num; i++) {
    let x = getRandom(10, 590);
    let y = getRandom(10, 590);
    graph.addVertex(vertName.charAt(i), x, y);

    let n = getRandom(0, i - 1);
    let c1 = vertName.charAt(i);
    let c2 = vertName.charAt(n);

    graph.addEdge([c1, c2], getWeight(c1, c2));
    edgeAcc++;
  }

  // there is definitely a better way to do this
  let n1, n2;
  let newAcc = 0;
  while (edgeAcc < (edgeAcc - 1) * edgeAcc * 0.5) {
    let isNew = false;
    while (isNew == false) {
      n1 = getRandom(0, num - 1);
      n2 = getRandom(0, num - 1);
      if (n1 != n2) {
        for (let i = 0; i < graph.adjList.get(vertName.charAt(n1))[1].length; i++) {
          if (graph.adjList.get(vertName.charAt(n1))[1][i][0] == vertName.charAt(n2)) {
            break;
          }
          if (i == graph.adjList.get(vertName.charAt(n1))[1].length - 1) {
            isNew = true;
          }
        }
      }
    }
    c1 = vertName.charAt(n2);
    c2 = vertName.charAt(n1);
    graph.addEdge([c1, c2], getWeight(c1, c2));
    newAcc += 1;
    if (edgeAcc + newAcc == edges) {
      break;
    }
  }
  graph.print();
  graph.draw();
}
