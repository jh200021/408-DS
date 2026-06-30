// Graph as a data structure — shows adjacency-list representation + construction
import { GRAPH_DATA } from './bfs.js';

export function generateGraphDSSteps(_input) {
  const steps = [];
  const g = GRAPH_DATA;
  const built = { nodes: [], edges: [] };

  function push(nodeState, adjHighlight, description, lines) {
    steps.push({ graph: g, built: { nodes: [...built.nodes], edges: [...built.edges] }, nodeState: { ...nodeState }, adjHighlight, description, codeLines: lines });
  }

  push({}, -1, 'Graph (Adjacency List): a collection of vertices (nodes) and edges. An adjacency list stores, for each vertex, the list of its neighbours — O(V+E) space.', { c: 1, python: 1, javascript: 1 });

  // Add vertices one by one
  for (const node of g.nodes) {
    built.nodes.push(node.id);
    const ns = {};
    built.nodes.forEach(id => { ns[id] = 'visited'; });
    ns[node.id] = 'current';
    push(ns, -1, `Add vertex ${node.label} (id=${node.id}). Vertices so far: {${built.nodes.map(id => g.nodes[id].label).join(', ')}}.`, { c: 5, python: 5, javascript: 5 });
  }

  // Add edges one by one
  const ns = {};
  g.nodes.forEach(n => { ns[n.id] = 'visited'; });

  for (const [a, b] of g.edges) {
    built.edges.push([a, b]);
    const h = { ...ns };
    h[a] = 'current';
    h[b] = 'frontier';
    const adjRow = Object.entries(g.adj).map(([k, v]) =>
      `${g.nodes[k].label}: [${v.map(id => g.nodes[id].label).join(', ')}]`
    ).join('  |  ');
    push(h, built.edges.length - 1, `Add edge ${g.nodes[a].label} – ${g.nodes[b].label}.  Adj list: ${adjRow}`, { c: 8, python: 8, javascript: 8 });
  }

  push(ns, -1, `Graph complete. ${g.nodes.length} vertices, ${g.edges.length} edges. Adjacency list ready for traversal (BFS/DFS).`, { c: 1, python: 1, javascript: 1 });
  return steps;
}
