function bfs(data) {
  const { numOfNodes, startNode, adj } = data;

  let queue = [];
  let order = [];
  let vis = new Array(101);
  let pushed = new Array(101);
  for (let i = 0; i < 101; i++) {
    vis[i] = 0;
    pushed[i] = 0;
  }

  queue.push(startNode);
  vis[startNode] = 1;
  while (queue.length > 0) {
    let node = queue.shift();
    order.push([String(node)]);
    let temp = [];
    temp.push("push");
    for (let i = 1; i <= numOfNodes; i++) {
      if (adj[node][i] && !vis[i]) {
        queue.push(i);
        temp.push(String(i));
        vis[i] = 1;
      }
    }
    order.push(temp);
  }
  
  return order;
}

export default bfs;
