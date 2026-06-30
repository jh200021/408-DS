// Fixed 7-node graph used for both BFS and DFS
export const GRAPH_DATA = {
  nodes: [
    { id: 0, label: 'A', x: 0.50, y: 0.10 },
    { id: 1, label: 'B', x: 0.22, y: 0.40 },
    { id: 2, label: 'C', x: 0.78, y: 0.40 },
    { id: 3, label: 'D', x: 0.08, y: 0.72 },
    { id: 4, label: 'E', x: 0.42, y: 0.72 },
    { id: 5, label: 'F', x: 0.78, y: 0.72 },
    { id: 6, label: 'G', x: 0.28, y: 0.95 },
  ],
  edges: [
    [0, 1], [0, 2],
    [1, 3], [1, 4],
    [2, 4], [2, 5],
    [3, 6], [4, 6],
  ],
  adj: {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 4, 5],
    3: [1, 6],
    4: [1, 2, 6],
    5: [2],
    6: [3, 4],
  },
};

export function generateBFSSteps(_inputArray) {
  const steps = [];
  const graph = GRAPH_DATA;
  const visited = new Set();
  const ns = {};
  graph.nodes.forEach(n => { ns[n.id] = 'unvisited'; });

  function addStep(nodeState, queue, desc, lines) {
    steps.push({ graph, nodeState: { ...nodeState }, queue: [...queue], queueLabel: 'Queue', description: desc, codeLines: lines });
  }

  addStep(ns, [], 'Starting BFS from node A. BFS visits all neighbours at the current depth before moving deeper — it uses a FIFO queue.', { c: 7, python: 4, javascript: 4 });

  const queue = [0];
  visited.add(0);
  ns[0] = 'frontier';
  addStep(ns, queue, 'Initialise: mark A as visited, enqueue A.  Queue: [A]', { c: 8, python: 5, javascript: 5 });

  while (queue.length > 0) {
    const v = queue.shift();
    ns[v] = 'current';
    addStep(ns, queue, `Dequeue ${graph.nodes[v].label}. Inspect its neighbours…`, { c: 10, python: 7, javascript: 8 });

    for (const nb of graph.adj[v]) {
      if (!visited.has(nb)) {
        visited.add(nb);
        ns[nb] = 'frontier';
        queue.push(nb);
        addStep(ns, queue, `Neighbour ${graph.nodes[nb].label} not visited → mark & enqueue.  Queue: [${queue.map(id => graph.nodes[id].label).join(', ')}]`, { c: 13, python: 10, javascript: 11 });
      } else {
        addStep(ns, queue, `Neighbour ${graph.nodes[nb].label} already visited — skip.`, { c: 12, python: 9, javascript: 10 });
      }
    }

    ns[v] = 'visited';
    addStep(ns, queue, `Finished processing ${graph.nodes[v].label}.`, { c: 10, python: 7, javascript: 8 });
  }

  addStep(ns, [], 'BFS complete! Visit order: A → B → C → D → E → F → G.', { c: 14, python: 12, javascript: 14 });
  return steps;
}
