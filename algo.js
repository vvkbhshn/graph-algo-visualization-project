let algo,running_algo;

let i = 0;
let highlightNextElement = function () {
  if (i < algo.path.length) {
    algo.path[i].addClass("highlighted");
    i++;
    running_algo = setTimeout(highlightNextElement, 500);
  }
};

let j = 0;
let removeHighlight = function () {
  if (j < algo.path.length) {
    algo.path[j].removeClass("highlighted");
    j++;
    setTimeout(removeHighlight);
  }
};

const Dfs = $("#Dfs");
Dfs.on("click", () => {
  let dfs = cy.elements().dfs("#n1", function () {}, true);
  algo = dfs;
  i = 0;
  highlightNextElement();  
});

const Bfs = $("#Bfs");
Bfs.on("click", () => {
  let bfs = cy.elements().bfs("#n1", function () {}, true);
  cy.layout.directed=true;
  algo = bfs;
  i = 0;
  cy.layout.directed = true;
  highlightNextElement();
})

const Reset = $("#Reset");
Reset.on("click", () => {
  j = 0;
  clearTimeout(running_algo);
  removeHighlight();  
});