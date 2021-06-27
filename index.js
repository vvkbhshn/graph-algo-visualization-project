$("form").on("submit", (e) => {
    e.preventDefault();
    const numOfNodes = $("#num-of-nodes").val();
    const chosenAlgo = $("#algo").val();
    const typeOfEdge = $("input[name='r']:checked").val();
    console.log(numOfNodes);
    console.log(chosenAlgo);
    console.log(typeOfEdge);

    let cy = cytoscape({
        container: $("#cy"),
        boxSelectionEnabled: false,
        autounselectify: true,
    })
    
    //Add nodes
    for(let i=1; i<=numOfNodes; i++){
        cy.add({
            group: "nodes",
            data: {id: "n"+i, label: i},
        });
    }

    //Add edges
    let nodes = [];
    nodes.push(1);
    for(let i=2;i<=numOfNodes;i++){
        let randomNode = Math.floor(Math.random()*nodes.length)+1;
        nodes.push(i);
        cy.add({group: "edges", data: {id: "e"+i, source: "n"+randomNode, target: "n"+i}});
    }
    let num = numOfNodes/4;
    for(let i=0;i<=num;i++){
        let num1 = Math.floor(Math.random()*numOfNodes)+1;
        let num2 = Math.floor(Math.random()*numOfNodes)+1;
        if(num1!=num2) cy.add({group: "edges", data: {id: "e"+num1+"-"+num2, source: "n"+num1, target: "n"+num2}});
    }

    //Add style
    cy.style()
        .selector("node")
        .style({
        content: "data(label)",
        "background-color": "#5B54FA",
        // 'text-opacity': 0.5,
        'text-valign': 'center',
        'text-halign': 'center',
        })
        .selector("edge")
        .style({
        "curve-style": typeOfEdge==="directed" ? "bezier" : "haystack",
        "target-arrow-shape": "triangle",
        width: 4,
        "line-color": "#ddd",
        "target-arrow-color": "#ddd",
        })
        .selector(".highlighted")
        .style({
        "background-color": "rgb(255, 213, 27)",
        "line-color": "rgb(255, 175, 27)",
        "target-arrow-color": "rgb(255, 175, 27)",
        "transition-property": "background-color, line-color,  target-arrow-color",
        "transition-duration": "0.5s",
        }); 

    //Add layout    
    let layout = cy.layout({
        name: "dagre", // name: "klay" (for horizontal edges), "dagre" (for vertical edges)
        roots: "#n1",
        padding: 10,    
    })
    layout.run();
    // cy.panningEnabled( false );


    //Add algorithms   
    let algo;
    let i = 0;
    let highlightNextElement = function () {
        if (i < algo.path.length) {
          algo.path[i].addClass("highlighted");
          i++;
          setTimeout(highlightNextElement, 500);
        }
    };

    if(chosenAlgo==="dfs") {
        algo = cy.elements().dfs({
            roots: "#n1",
            directed: typeOfEdge==="directed" ? true : false
        });
        setTimeout(highlightNextElement,500);
    }

    else if(chosenAlgo==="bfs") {
        algo = cy.elements().bfs({
            roots: "#n1",
            directed: typeOfEdge==="directed" ? true : false
        });
        setTimeout(highlightNextElement,500);
    }
});    