import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
cytoscape.use(dagre);

function cy(data) {
  const { numOfNodes, isDirected, isWeighted, chosenAlgo, startNode, endNode } = data;
  // console.log(numOfNodes);
  // console.log(isDirected);
  // console.log(isWeighted);
  // console.log(chosenAlgo);
  // console.log(startNode);
  // console.log(endNode);

  let nodeArray = [], edgeArray = [];
  let nodes = [], edges = [];
  let highlightNextElement = function () {};

  //Add nodes
  for (let i = 1; i <= numOfNodes; i++) {
    nodeArray.push({ group: "nodes", data: { id: "n" + i, label: i } });
  }

  //Add edges
  let edgeWeight = new Map();
  nodes.push(1);
  for (let i = 2; i <= numOfNodes; i++) {
    let factor = -1;
    if (chosenAlgo === "bellman-ford") factor = Math.floor(numOfNodes / 5);
    let randomNode = Math.floor(Math.random() * nodes.length) + 1;
    let randomWeight = Math.floor(Math.random() * numOfNodes) - factor;
    nodes.push(i);
    let ID = "e" + randomNode + "-" + i;
    edgeArray.push({
      group: "edges",
      data: {
        id: ID,
        source: "n" + randomNode,
        target: "n" + i,
        weight: isWeighted === "weighted" ? randomWeight : 1,
      },
    });
    edgeWeight[ID] = randomWeight;
    edges.push(ID);
  }

  // Add a few random edges
  let num = numOfNodes / 5;
  for (let i = 0; i <= num; i++) {
    let factor = -1;
    if (chosenAlgo === "bellman-ford") factor = numOfNodes / 2;
    let num1 = Math.floor(Math.random() * numOfNodes) + 1;
    let num2 = Math.floor(Math.random() * numOfNodes) + 1;
    let randomWeight = Math.floor(Math.random() * numOfNodes) - factor;
    let ID = "e" + num1 + "-" + num2;
    if (num1 !== num2 && !edgeWeight.has(ID)) {
      edgeArray.push({
        group: "edges",
        data: {
          id: ID,
          source: "n" + num1,
          target: "n" + num2,
          weight:
            isWeighted === "weighted"
              ? Math.floor(Math.random() * numOfNodes) + 1
              : 1,
        },
      });
    }
    edgeWeight[ID] = randomWeight;
    edges.push(ID);
  }

  //Add style
  let styleArray = [
    {
      selector: "node",
      style: {
        content: "data(label)",
        "background-color": "#67b7d1",
        "text-halign": "center",
        "text-valign": "center",
      },
    },
    {
      selector: "edge",
      style: {
        label: isWeighted === "weighted" ? "data(weight)" : "",
        "text-margin-x": 5,
        "text-margin-y": 10,
        "text-justification": "center",
        "font-size": 10,
        "curve-style": isDirected === "directed" ? "bezier" : "haystack",
        "target-arrow-shape": "triangle",
        width: 4,
        "line-color": "#ddd",
        "target-arrow-color": "#ddd",
      },
    },
    {
      selector: ".highlighted",
      style: {
        "background-color": "rgb(255,213,27)",
        "line-color": "rgb(255,175,27)",
        "target-arrow-color": "rgb(255,175,27)",
        "transition-property": "background-color, line-color, target-arrow-color",
        "transition-duration": "0.5s",
      },
    },
    {
      selector: ".shortest-path",
      style: {
        "background-color": "#f00",
        "line-color": "#f00",
        "target-arrow-color": "#f00",
        "transition-property": "background-color, line-color, target-arrow-color",
        "transition-duration": "0.5s",
      },
    },
  ];

  //Add layout
  let layout = {
    name: "dagre",
    roots: "#n" + startNode,
    padding: 10,
  };

  //Initialise Cytoscape
  let cy = cytoscape({
    container: document.getElementById("cy"),
    boxSelectionEnabled: false,
    autounselectify: true,
    // autolock: true,
    userPanningEnabled: false, //cannot drag or zoom the graph
    elements: {
      nodes: nodeArray,
      edges: edgeArray,
    },
    style: styleArray,
    layout: layout,
  });

  //Add algorithms
  let algo;
  let i = 0;
  highlightNextElement = function () {
    if (i < algo.path.length) {
      algo.path[i].addClass("highlighted");
      i++;
      setTimeout(highlightNextElement, 250);
    }
  };

  if (numOfNodes === "1" && chosenAlgo !== "dfs" && chosenAlgo !== "bfs") {
    setTimeout(cy.$("#n1").addClass("highlighted"), 1000);
    setTimeout(cy.$("#n1").addClass("shortest-path"), 3000);
  } else if (chosenAlgo === "dfs") {
    algo = cy.elements().dfs({
      roots: "#n" + startNode,
      directed: isDirected === "directed" ? true : false,
    });
    setTimeout(highlightNextElement, 500);
  } else if (chosenAlgo === "bfs") {
    algo = cy.elements().bfs({
      roots: "#n" + startNode,
      directed: isDirected === "directed" ? true : false,
    });
    setTimeout(highlightNextElement, 500);
  } else if (chosenAlgo === "dijkstra") {
    let path = [];

    let runDijkstra = function () {
      path = dijkstra.pathTo("#n" + endNode);
      // console.log(path);
      if (path.length > 0) {
        i = 0;
        highlightNextElement = function () {
          if (i < path.length) {
            // console.log(path[i].id());
            path[i].addClass("shortest-path");
            i++;
            setTimeout(highlightNextElement, 500);
          }
        };
        setTimeout(highlightNextElement, 500);
      } else {
        alert("No path found. Please try again.");
        window.location.reload();
      }
    };

    highlightNextElement = function () {
      if (i < path.length) {
        let elem = cy.$("#" + path[i]);
        elem.flashClass("highlighted", 750);
        i++;
        if (i === path.length - 1) setTimeout(runDijkstra, 1000);
        else setTimeout(highlightNextElement, 5);
      }
    };

    let dijkstra = cy.elements().dijkstra({
      root: "#n" + startNode,
      // get a track of visited edges
      weight: function (edge) {
        path.push(edge.source().id(), edge.id(), edge.target().id());
        return edgeWeight[edge.id()];
      },
      directed: isDirected === "directed" ? true : false,
    });
    // console.log(path);
    if (path.length > 0) setTimeout(highlightNextElement, 500);
    else {
      alert("No path found. Please try again.");
      window.location.reload();
    }
  } else if (chosenAlgo === "bellman-ford") {
    let path = [];

    let runBellmanFord = function () {
      path = bellmanFord.pathTo("#n" + endNode);
      if (bellmanFord.hasNegativeWeightCycle)
        alert(
          "No path found or negative weight cycle detected. Please try again."
        );
      else if (path.length > 0) {
        i = 0;
        cy.$("#n" + startNode).addClass("shortest-path");
        highlightNextElement = function () {
          if (i < path.length) {
            // console.log(path[i].id());
            path[i].addClass("shortest-path");
            i++;
            setTimeout(highlightNextElement, 500);
          }
        };
        setTimeout(highlightNextElement, 500);
      } else {
        alert("No path found. Please try again.");
        window.location.reload();
      }
    };

    highlightNextElement = function () {
      if (i < path.length) {
        let elem = cy.$("#" + path[i]);
        // elem.addClass("highlighted");
        elem.flashClass("highlighted", 750);
        i++;
        if (i === path.length - 1) setTimeout(runBellmanFord, 1000);
        else setTimeout(highlightNextElement, 5);
      }
    };

    let bellmanFord = cy.elements().bellmanFord({
      root: "#n" + startNode,
      // get a track of visited edges
      weight: function (edge) {
        path.push(edge.source().id(), edge.id(), edge.target().id());
        return edgeWeight[edge.id()];
      },
      directed: isDirected === "directed" ? true : false,
    });
    // console.log(path);
    setTimeout(highlightNextElement, 500);
  } else if (chosenAlgo === "a-star") {
    let path = [];

    let runAstar = function () {
      if (aStar.found) {
        path = aStar.path;
        i = 0;
        cy.$("#n" + startNode).addClass("shortest-path");
        highlightNextElement = function () {
          if (i < path.length) {
            // console.log(path[i].id());
            path[i].addClass("shortest-path");
            i++;
            setTimeout(highlightNextElement, 500);
          }
        };
        setTimeout(highlightNextElement, 500);
      } else {
        alert("No path found. Please try again.");
        window.location.reload();
      }
    };

    highlightNextElement = function () {
      if (i < path.length) {
        let elem = cy.$("#" + path[i]);
        elem.flashClass("highlighted", 750);
        i++;
        if (i === path.length - 1) setTimeout(runAstar, 1000);
        setTimeout(highlightNextElement, 5);
      }
    };

    let aStar = cy.elements().aStar({
      root: "#n" + startNode,
      goal: "#n" + endNode,
      // get a track of visited edges
      weight: function (edge) {
        path.push(edge.source().id(), edge.id(), edge.target().id());
        return edgeWeight[edge.id()];
      },
      directed: isDirected === "directed" ? true : false,
    });
    // console.log(path);
    setTimeout(highlightNextElement, 500);
  } else if (chosenAlgo === "floyd-warshall") {
    let path = [];

    let runFloydWarshall = function () {
      path = floydWarshall.path("#n" + startNode, "#n" + endNode);
      if (path.length > 0) {
        i = 0;
        highlightNextElement = function () {
          if (i < path.length) {
            // console.log(path[i].id());
            path[i].addClass("shortest-path");
            i++;
            setTimeout(highlightNextElement, 500);
          }
        };
        setTimeout(highlightNextElement, 500);
      } else {
        alert("No path found. Please try again.");
        window.location.reload();
      }
    };

    highlightNextElement = function () {
      if (i < path.length) {
        let elem = cy.$("#" + path[i]);
        elem.flashClass("highlighted", 750);
        i++;
        if (i === path.length - 1) setTimeout(runFloydWarshall, 1000);
        setTimeout(highlightNextElement, 5);
      }
    };

    let floydWarshall = cy.elements().floydWarshall({
      // get a track of visited edges
      weight: function (edge) {
        path.push(edge.source().id(), edge.id(), edge.target().id());
        return edgeWeight[edge.id()];
      },
      directed: isDirected === "directed" ? true : false,
    });
    // console.log(path);
    setTimeout(highlightNextElement, 500);
  }
}

export default cy;
