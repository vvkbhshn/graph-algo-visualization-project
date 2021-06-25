let cy = cytoscape({
    container: $("#cy"),

    boxSelectionEnabled: false,
    autounselectify: true,
  
    elements: {
      nodes: [
        { data: { id: "n1", label: "1" } },
        { data: { id: "n2", label: "2" } },
        { data: { id: "n3", label: "3" } },
        { data: { id: "n4", label: "4" } },
        { data: { id: "n5", label: "5" } },
        { data: { id: "n6", label: "6" } },
        { data: { id: "n7", label: "7" } },
        { data: { id: "n8", label: "8" } },
        { data: { id: "n9", label: "9" } },
        { data: { id: "n10", label: "10" } },
      ],
  
      edges: [
        { data: { id: "e1", source: "n1", target: "n2" } },
        { data: { id: "e2", source: "n1", target: "n3" } },
        { data: { id: "e3", source: "n2", target: "n4" } },
        { data: { id: "e4", source: "n2", target: "n5" } },
        { data: { id: "e5", source: "n2", target: "n6" } },
        { data: { id: "e6", source: "n6", target: "n7" } },
        { data: { id: "e7", source: "n6", target: "n8" } },
        { data: { id: "e8", source: "n3", target: "n9" } },
        { data: { id: "e9", source: "n3", target: "n10" } },
      ],
    },
  
    style: cytoscape
      .stylesheet()
      .selector("node")
      .style({
        content: "data(label)",
        "background-color": "#5B54FA",
      })
      .selector("edge")
      .style({
        "curve-style": "bezier",
        "taget-arrow-shape": "triangle",
        "target-arrow-color": "#FFA400",
        width: 4,
      })
      .selector(".highlighted")
      .style({
        "background-color": "#ffd51b",
        "line-color": "#ffd51b",
        "target-arrow-color": "#ffaf1b",
        "transition-property": "background-color,line-color",
        "transition-duration": "0.5s",
      }),
  
    layout: {
      name: "cose",
      directed: false,
      roots: "#n0",
      padding: 10,
    },
});
