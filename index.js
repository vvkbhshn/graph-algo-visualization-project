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
    for(let i=1; i<=numOfNodes; i++){
        let randomNum = Math.floor(Math.random()*numOfNodes)+1;
        let targetNode = randomNum;
        if(targetNode===i){
            if(numOfNodes===1) targetNode=1;
            else if(i===1) targetNode++;
            else targetNode--;
        }
        cy.add({
            group: "edges",
            data: {id: "e"+(i-1), source: "n"+i, target: "n"+targetNode},
        });
    }
    

    //Add style
    cy.style()
        .selector("node").style({
            content: "data(label)",
            "background-color": "#5b54fa",
        })
        .selector("edge").style({
            "curve-style": "bezier",
            "taget-arrow-shape": "triangle",
            "target-arrow-color": "#ffa400",
            width: 4,
        })
        .selector(".highlighted").style({
            "background-color": "#ffd51b",
            "line-color": "#ffd51b",
            "target-arrow-color": "#ffaf1b",
            "transition-property": "background-color,line-color,target-arrow-color",
            "transition-duration": "0.5s",
        });   

    //Add layout    
    let layout = cy.layout({
        name: "cose",
        directed: true,
        // directed: (typeOfEdge=="directed" ? true : false),
        roots: "#n1",
        padding: 10,    
    })
    layout.run();


    //Handle algorithms
    let i = 0, algo;
    if(chosenAlgo==="bfs") algo = cy.elements().bfs("#n1", function() {}, true);
    else if(chosenAlgo==="dfs") algo = cy.elements().dfs("#n1", function() {}, true);
    let highlightNextElement = function () {
        if (i < algo.path.length) {
            algo.path[i].addClass("highlighted");
            i++;
            setTimeout(highlightNextElement, 500);
            console.log(algo.path[i]);
        }
    };
    setTimeout(highlightNextElement,500);
    console.log(cy.nodes());

    
})


























// let edgeDetails = $("#edge-details");
// let addMoreEdges = $("#add-more-edges");
// addMoreEdges.on("click", () => {
//     console.log("button clicked");
//     let newSourceNode = document.createElement("input");
//     newSourceNode.setAttribute("type","number");
//     newSourceNode.setAttribute("name","source[]");
//     newSourceNode.setAttribute("class","edge-details");
//     newSourceNode.setAttribute("placeholder","source node");
//     edgeDetails.append(newSourceNode);

//     let newTargetNode = document.createElement("input");
//     newTargetNode.setAttribute("type","number");
//     newTargetNode.setAttribute("name","target[]");
//     newTargetNode.setAttribute("class","edge-details");
//     newTargetNode.setAttribute("placeholder","target node");
//     edgeDetails.append(newTargetNode);

//     let newWeight = document.createElement("input");
//     newWeight.setAttribute("type","number");
//     newWeight.setAttribute("name","weight[]");
//     newWeight.setAttribute("class","edge-details");
//     newWeight.setAttribute("placeholder","weight");
//     // newWeight.setAttribute("value","0");
//     edgeDetails.append(newWeight);

//     let br = document.createElement("br");
//     edgeDetails.append(br);
// })


// $("#visualize").on("click",() => {

//     let startNode = $("#start-node").value;
//     console.log("the start node is "+startNode);
    

// })