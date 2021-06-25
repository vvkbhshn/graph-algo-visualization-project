let algo,runningAlgo;
let isRunning = false;

let i = 0;
let highlightNextElement = function () {
  if (i < algo.path.length) {
    algo.path[i].addClass("highlighted");
    i++;
    runningAlgo = setTimeout(highlightNextElement, 500);
  }
};

let j = 0;
let removeHighlight = function () {
  while (j < algo.path.length) {
    algo.path[j].removeClass("highlighted");
    j++;
  }
};

let stopRunningAlgo = function () {
  if (isRunning) {
    j = 0;
    clearTimeout(runningAlgo);
    removeHighlight();
  }
}

const Dfs = $("#Dfs");
Dfs.on("click", () => {
  stopRunningAlgo();
  let dfs = cy.elements().dfs("#n1", function () {}, true);
  algo = dfs;
  i = 0;
  isRunning = true;
  setTimeout(highlightNextElement,500);  
});

const Bfs = $("#Bfs");
Bfs.on("click", () => {
  stopRunningAlgo();
  let bfs = cy.elements().bfs("#n1", function () {}, true);
  algo = bfs;
  i = 0;
  isRunning = true;
  setTimeout(highlightNextElement,500);
})

const Reset = $("#Reset");
Reset.on("click",stopRunningAlgo);