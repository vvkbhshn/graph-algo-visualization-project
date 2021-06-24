// import cytoscape from "cytoscape"; //not working :(

let cy = cytoscape({
    container: $("#cy"),

    elements: {
        nodes: [
            {data: {id: "n1", label: "1"}},
            {data: {id: "n2", label: "2"}},
            {data: {id: "n3", label: "3"}},
            {data: {id: "n4", label: "4"}},
            {data: {id: "n5", label: "5"}},
            {data: {id: "n6", label: "6"}},
            {data: {id: "n7", label: "7"}},
            {data: {id: "n8", label: "8"}},
            {data: {id: "n9", label: "9"}},
            {data: {id: "n10", label: "10"}},
        ],

        edges: [
            {data: {id: "e1", source: "n1", target: "n2"}},
            {data: {id: "e2", source: "n1", target: "n3"}},
            {data: {id: "e3", source: "n2", target: "n4"}},
            {data: {id: "e4", source: "n2", target: "n5"}},
            {data: {id: "e5", source: "n2", target: "n6"}},
            {data: {id: "e6", source: "n6", target: "n7"}},
            {data: {id: "e7", source: "n6", target: "n8"}},
            {data: {id: "e8", source: "n3", target: "n9"}},
            {data: {id: "e9", source: "n3", target: "n10"}},
        ]
    },

    style: cytoscape.stylesheet()
        .selector("node")
            .style({
                "content": "data(label)",
                "background-color": "#ff0000"
            })
        .selector("edge")
            .style({
                "curve-style": "bezier",
                "line-arrow-color": "#ddd",
                "width": 4
            })
        .selector(".highlighted")
            .style({
                "background-color": "#0000ff",
                "line-color": "#0000ff",
                "transition-property": "background-color,line-color",
                "transition-duration": "0.5s"
            }),
    
    layout: {
        name: "cose",
        directed: false,
        roots: "#n0",
        padding: 10
    }
});


// initialise DFS algorithm, root node = 1
let dfs = cy.elements().dfs("#n1", function(){}, true);

let i=0;
let highlightNextElement = function(){
    if(i< dfs.path.length){
        dfs.path[i].addClass("highlighted");
        i++;
        setTimeout(highlightNextElement, 500);
    }
};

highlightNextElement();


