import React from "react";
import cy from "./cy";

function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    const { numOfNodes, directed, weighted, algo, startNode, endNode } =
      e.target;

    //Validate Form
    let validateForm = function () {
      let start = Number(startNode.value),
        end = Number(endNode.value),
        total = Number(numOfNodes.value);

      if ((endNode.value === "" || endNode.value === null) && algo.value !== "dfs" && algo.value !== "bfs") {
        alert("Please enter the value of End node for path finding algorithms.");
        return false;
      } else if (start > total || end > total) {
        alert("Choose Start node & End node from 1 to (no. of nodes).");
        return false;
      } else if (end > 0 && end < start && directed.value === "directed") {
        alert("For directed graphs, please choose an End node which is greater than Start node.");
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
        endNode: endNode.value,
      };
      cy(postData);
    }
  }

  function handleReset() {
    document.getElementById("cy").innerHTML = "";
  }

  return (
    <div className="col col-lg-4 col-12">
      <form action="/" className="form-control" onSubmit={handleSubmit}>
        <div className="form-group">
          <br />
          <label htmlFor="num-of-nodes">No. of nodes: &nbsp;</label>
          <input
            type="number"
            className="form-control"
            id="num-of-nodes"
            name="numOfNodes"
            min="1"
            max="100"
            required
          />
          <br />
        </div>
        <div className="form-group">
          <span> Type of edges: </span>
          <br />
          <div className="row">
            <div className="col">
              <select name="directed" className="form-control" id="directed">
                <option value="directed">Directed</option>
                <option value="undirected">Undirected</option>
              </select>{" "}
              &nbsp;
            </div>
            <div className="col">
              <select name="weighted" className="form-control" id="weighted">
                <option value="unweighted">Unweighted</option>
                <option value="weighted">Weighted</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="algo">Algorithm: &nbsp;</label>
          <select name="algo" className="form-control" id="algo">
            <option value="dfs">DFS</option>
            <option value="bfs">BFS</option>
            <option value="a-star">A*</option>
            <option value="dijkstra">Dijkstra</option>
            <option value="bellman-ford">Bellman Ford</option>
            <option value="floyd-warshall">Floyd Warshall</option>
          </select>
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="start-node">Start node: &nbsp;</label>
          <input
            type="number"
            className="form-control"
            id="start-node"
            name="startNode"
            min="1"
            defaultValue="1"
            required
          />
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="end-node">End node: &nbsp;</label>
          <input
            type="number"
            className="form-control"
            id="end-node"
            name="endNode"
            min="1"
          />
          <span>(for path finding algorithms)</span>
          <br />
          <br />
          <br />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          id="visualize"
          value="Visualize"
        />{" "}
        &nbsp;
        <input
          type="reset"
          className="btn btn-secondary"
          id="reset"
          onClick={handleReset}
          value="Reset"
        />
        <br />
      </form>
    </div>
  );
}

export default Form;
