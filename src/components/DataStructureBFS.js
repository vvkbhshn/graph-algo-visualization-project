import React, { useState, useEffect } from "react";
import "./DataStructure.css";
import { ds } from "./cy";

const DataStructureBFS = () => {
  const [arr, setElements] = useState([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const queue = ds.queue;
    // console.log("DS-BFS ", queue);

    function update() {
      let i = 0;
      function highlightNextElement() {
        if (i < queue.length) {
          let temp = queue[i];
          if (temp[0] !== "push") {
            if (i === 0) {
              setElements((arr) => {
                arr = [...arr, `${temp[0]}`];
                return arr;
              });
            }
            setCurrent(temp[0]);
            // console.log("A", arr);
          } else {
            temp.shift();
            let popNode = queue[i - 1][0];
            setElements((arr) => {
              arr = [...arr, ...temp];
              let index = arr.indexOf(popNode);
              arr.splice(index, 1);
              // console.log("B", arr);
              return arr;
            });
          }
          i++;
          setTimeout(highlightNextElement, 1000);
        }
      }
      setTimeout(highlightNextElement, 1000);
    }
    update();
  }, []);

  return (
    <div className="queue">
      {arr.map((x) => {
        return x === current ? (
          <span className="unit highlight">{x}</span>
        ) : (
          <span className="unit">{x}</span>
        );
      })}
    </div>
  );
};

export default DataStructureBFS;
