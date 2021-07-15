import React from "react";
import Heading from "./Heading";
import Form from "./Form";
import Graph from "./Graph";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

function App() { 
  return (
    <div>
      <Heading />
      <div className="container">
        <div className="row">
          <Form />
          <Graph />
        </div>
      </div>
    </div>
  );
}

export default App;
