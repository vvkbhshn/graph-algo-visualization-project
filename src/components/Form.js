import React from "react";

function Form(props) {
  const { handleSubmit, handleReset } = props;

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
            max="30"
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
              </select>
              <br />
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
