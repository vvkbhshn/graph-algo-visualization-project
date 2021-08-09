import React, { useState, useEffect } from "react";
import "./DataStructure.css";
import { ds } from "./cy";

function DataStructureDijkstra() {
  const [arr, setElements] = useState([]);
  useEffect(() => {
    const queue = ds.queue;

    function update() {
      let i = 0;
      function highlightNextElement() {
        if (i < queue.length) {
          setElements((arr) => {
            return queue[i][2];
          });
          i++;
          setTimeout(highlightNextElement, 1000);
        }
      }
      setTimeout(highlightNextElement, 1000);
    }
    update();
  }, []);

  return (
    <div className="queue" style={{ height: "16vh" }}>
      {arr.map((x) => {
        return (
          <div className="priority">
            <span className="unit">{x[0]}</span>
            <span className="unit">{x[1]}</span>
          </div>
        );
      })}
    </div>
  );
}

export default DataStructureDijkstra;
