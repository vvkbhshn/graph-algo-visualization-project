import React, { useState } from "react";
import Heading from "./Heading";
import Form from "./Form";
import Graph from "./Graph";
import DataStructureDFS from "./DataStructureDFS";
import DataStructureBFS from "./DataStructureBFS";
import DataStructureDijkstra from "./DataStructureDijkstra";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import cy from "./cy";


function App() {
  const [submitted, setSubmitted] = useState(false);
  const [algorithm, setAlgorithm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // setSubmitted(false); //bug
    setSubmitted(true);

    const {
      numOfNodes,
      directed,
      weighted,
      algo,
      startNode,
      endNode
    } = e.target;

    setAlgorithm(algo.value);

    // console.log(algorithm);

    //Validate Form
    let validateForm = function () {
      let start = Number(startNode.value),
        end = Number(endNode.value),
        total = Number(numOfNodes.value);

      if (
        (endNode.value === "" || endNode.value === null) &&
        algo.value !== "dfs" &&
        algo.value !== "bfs"
      ) {
        alert(
          "Please enter the value of End node for path finding algorithms."
        );
        return false;
      } else if (start > total || end > total) {
        alert("Choose Start node & End node from 1 to (no. of nodes).");
        return false;
      } else if (end > 0 && end < start && directed.value === "directed") {
        alert(
          "For directed graphs, please choose an End node which is greater than Start node."
        );
        return false;
      }
      return true;
    };

    if (!validateForm()) window.location.reload();
    else {
      const postData = {
        numOfNodes: numOfNodes.value,
        isDirected: directed.value,
        isWeighted: weighted.value,
        chosenAlgo: algo.value,
        startNode: startNode.value,
        endNode: endNode.value
      };
      cy(postData);
    }
  }

  function handleReset() {
    document.getElementById("cy").innerHTML = "";
    setSubmitted(false);
  }

  return (
    <div>
      <Heading />
      <div className="container">
        <div className="row">
          <Form handleSubmit={handleSubmit} handleReset={handleReset} />
          <Graph />
          {submitted && algorithm==="dfs" && <div className="col col-1"><DataStructureDFS /></div>}
        </div>
        {submitted && algorithm==="bfs" && <div className="row"><DataStructureBFS /></div>}
        {submitted && algorithm==="dijkstra" && <div className="row"><DataStructureDijkstra /></div>}
      </div>
    </div>
  );
}

export default App;
