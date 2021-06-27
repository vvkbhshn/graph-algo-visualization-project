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

    //Add data structures to deal with graph algos
    let adj = new Array(101);
    let vis = new Array(101);
    for (let i=0; i<101; i++) {
        vis[i] = false;
        adj[i] = new Array(101);
    }
    for (let i=0; i<101; i++) for (let j=0; j<101; j++) adj[i][j]=0;
    
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
        adj[i][targetNode]=1;
        adj[targetNode][i]=1;
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
        // directed: true,
        directed: (typeOfEdge=="directed" ? true : false),
        roots: "#n1",
        padding: 10,    
    })
    layout.run();
    // cy.zoomingEnabled( false );


    //Handle algorithms   
    let path = []; //keep track of visited nodes in order

    let i = 0;
    let highlightNextElement = function () {
        if(i < path.length) {
            cy.$id("n"+path[i]).style({"background-color": "#ffd51b"});
            i++;
            setTimeout(highlightNextElement, 500);
        }
    }

    if(chosenAlgo==="dfs") {
        let stack = [];
        stack.push(1);
        while(stack.length){
            let node = stack.pop();
            if(!vis[node]) path.push(node);
            vis[node] = true;
            for(let i=1; i<=numOfNodes; i++) {
                if(!vis[i] && adj[node][i]===1) {
                    stack.push(i);
                }
            }
        };
        setTimeout(highlightNextElement, 500);
    }
    else if(chosenAlgo==="bfs") {
        let queue = [];
        vis[1]=true;
        queue.push(1);
        path.push(1);
        while(queue.length){
            let node = queue.shift();
            for (let i=1; i<=numOfNodes; i++) {
                if( adj[node][i]===1 && !vis[i]) {
                    vis[node]=true;
                    queue.push(i);
                    path.push(i);
                };
            };
        };
        setTimeout(highlightNextElement, 500);
    }    
})
