function dfs(data) {
  const { numOfNodes, startNode, adj } = data;

  let stack = [];
  let order = [];
  let vis = new Array(101);
  let pushed = new Array(101);
  for (let i = 0; i < 101; i++) {
    vis[i] = 0;
    pushed[i] = 0;
  }

  stack.push(Number(startNode));
  while (stack.length > 0) {
    let node = stack.pop();
    if (!vis[node]) {
      let temp = [];
      temp.push("push");
      vis[node] = 1;
      order.push([String(node)]);
      pushed[node] = 1;
      for (let i = 1; i <= numOfNodes; i++) {
        if (adj[node][i] && !vis[i]) {
          stack.push(i);
          if (!pushed[i]) {
            temp.push(String(i));
            pushed[i] = 1;
          }
        }
      }
      order.push(temp);
    }
  }

  return order;
}

export default dfs;
