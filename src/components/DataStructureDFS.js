import React, { useState, useEffect } from "react";
import "./DataStructure.css";
import { ds } from "./cy";

const DataStructureDFS = () => {
  const [arr, setElements] = useState([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    let stack = ds.stack;
    console.log("ds,js", stack);

    function update() {
      let i = 0;
      let highlightNextElement = function () {
        if (i < stack.length) {
          let temp = stack[i];
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
            let popNode = stack[i - 1][0];
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
    <div className="stack">
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

export default DataStructureDFS;