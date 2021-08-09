// import Heapify from "heapify";
import Heap from "heap";

function dijkstra(data) {
  const { numOfNodes, startNode, endNode, adj } = data;
  const orderingData = [];
  let order = [];

  function cmp(a, b) {
    return a[1] - b[1];
  }

  let queue = new Heap(cmp);
  let distance = new Array(numOfNodes + 1);
  let prev = new Array(numOfNodes + 1);
  for (let i = 0; i < numOfNodes + 1; i++) {
    distance[i] = Infinity;
    prev[i] = null;
  }
  distance[startNode] = 0;
  queue.push([startNode, 0]);

  while (!queue.empty()) {
    const [currNode] = queue.peek();
    // const currNode = Node[0];
    queue.pop();
    let temp1= [];
    temp1.push("highlight");
    temp1.push(String(currNode));
    temp1.push(queue.toArray());
    order.push(temp1);
    console.log("heap = ", queue.toArray());

    for (let i = 1; i <= numOfNodes; i++) {
      if (adj[currNode][i]) {
        let newDistance = distance[currNode] + adj[currNode][i];
        if (newDistance < distance[i]) {
          distance[i] = newDistance;
          prev[i] = currNode;
          queue.push([i, newDistance]);
          queue.heapify();
        }
        let temp2 = [];
        temp2.push("flash");
        temp2.push(String(i));
        temp2.push(queue.toArray());
        order.push(temp2);
        console.log("heap = ", queue.toArray());
      }
    }
  }

  let path = [endNode];
  let node = endNode;
  while(node!==startNode){
    path.push(String(prev[node]));
    node=prev[node];
  }
  path.reverse();
  console.log("path = ", path);

  for (let i = 1; i <= numOfNodes; i++) {
    console.log(`distance[ ${i} ] = ${distance[i]}`);
  }

  orderingData.order = order;
  orderingData.path = path
  return orderingData;
}

export default dijkstra;
