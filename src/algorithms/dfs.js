import { GRAPH_DATA } from './bfs.js';

export function generateDFSSteps(_inputArray) {
  const steps = [];
  const graph = GRAPH_DATA;
  const visited = new Set();
  const ns = {};
  graph.nodes.forEach(n => { ns[n.id] = 'unvisited'; });

  function addStep(nodeState, stack, desc, lines) {
    steps.push({ graph, nodeState: { ...nodeState }, queue: [...stack], queueLabel: 'Stack', description: desc, codeLines: lines });
  }

  addStep(ns, [], 'Starting DFS from node A. DFS explores as deep as possible along each branch before backtracking — it uses a LIFO stack.', { c: 5, python: 4, javascript: 3 });

  const stack = [0];
  ns[0] = 'in-stack';
  addStep(ns, stack, 'Initialise: push A onto the stack.  Stack: [A]', { c: 6, python: 5, javascript: 4 });

  while (stack.length > 0) {
    const v = stack.pop();

    if (visited.has(v)) {
      ns[v] = 'visited';
      addStep(ns, stack, `Pop ${graph.nodes[v].label} — already visited, skip.`, { c: 8, python: 7, javascript: 6 });
      continue;
    }

    visited.add(v);
    ns[v] = 'current';
    addStep(ns, stack, `Pop and visit ${graph.nodes[v].label}. Push unvisited neighbours in reverse order.`, { c: 9, python: 8, javascript: 7 });

    // Push in reverse so left-most neighbour is processed first
    const neighbours = [...graph.adj[v]].reverse();
    for (const nb of neighbours) {
      if (!visited.has(nb)) {
        stack.push(nb);
        ns[nb] = 'in-stack';
        addStep(ns, stack, `Push unvisited neighbour ${graph.nodes[nb].label}.  Stack: [${stack.map(id => graph.nodes[id].label).join(', ')}]`, { c: 11, python: 10, javascript: 9 });
      } else {
        addStep(ns, stack, `Neighbour ${graph.nodes[nb].label} already visited — skip.`, { c: 10, python: 9, javascript: 8 });
      }
    }

    ns[v] = 'visited';
    addStep(ns, stack, `Done with ${graph.nodes[v].label}.`, { c: 12, python: 11, javascript: 10 });
  }

  addStep(ns, [], 'DFS complete! Visit order: A → B → D → G → E → C → F.', { c: 13, python: 12, javascript: 11 });
  return steps;
}
