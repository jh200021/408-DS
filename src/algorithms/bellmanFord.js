import { WEIGHTED_GRAPH_DATA, edgeKey } from './weightedGraphData'

export function generateBellmanFordSteps() {
  const graph = WEIGHTED_GRAPH_DATA
  const steps = []
  const N = graph.nodes.length
  const label = id => graph.nodes[id].label

  const dist = {}
  const prev = {}
  const ns = {}
  graph.nodes.forEach(n => { dist[n.id] = Infinity; ns[n.id] = 'unvisited' })

  const distStr = () =>
    graph.nodes.map(n => `${n.label}:${dist[n.id] === Infinity ? '∞' : dist[n.id]}`).join('   ')

  function add(edgeState, desc, lines) {
    steps.push({
      graph,
      nodeState: { ...ns },
      edgeState: { ...edgeState },
      dist: { ...dist },
      info: distStr(),
      infoLabel: 'Distance from A',
      description: desc,
      codeLines: lines,
    })
  }

  add({}, 'Bellman-Ford finds shortest paths from a source and tolerates negative-weight edges. It relaxes every edge V−1 times. Start at A.', { c: 4, python: 3, javascript: 3 })

  dist[0] = 0
  ns[0] = 'current'
  add({}, 'Set dist[A] = 0; every other distance starts at ∞.', { c: 5, python: 4, javascript: 4 })

  // Treat each undirected edge as relaxable in both directions.
  const directed = []
  graph.edges.forEach(([a, b, w]) => { directed.push([a, b, w]); directed.push([b, a, w]) })

  let changed = true
  for (let pass = 1; pass < N && changed; pass++) {
    changed = false
    add({}, `Pass ${pass} of at most ${N - 1}: relax every edge once.`, { c: 7, python: 6, javascript: 7 })

    for (const [u, v, w] of directed) {
      if (dist[u] === Infinity) continue
      const ek = edgeKey(u, v)
      const cand = dist[u] + w
      const cur = dist[v] === Infinity ? '∞' : dist[v]
      if (cand < dist[v]) {
        dist[v] = cand
        prev[v] = u
        changed = true
        add({ [ek]: 'considering' }, `Relax ${label(u)}→${label(v)} (w ${w}): ${dist[u]} + ${w} = ${cand} < ${cur} → update dist[${label(v)}] = ${cand}.`, { c: 9, python: 8, javascript: 9 })
      }
    }
    if (!changed) {
      add({}, `No distance changed during pass ${pass} — the answer is stable, so we can stop early.`, { c: 7, python: 6, javascript: 7 })
    }
  }

  graph.nodes.forEach(n => { if (dist[n.id] !== Infinity) ns[n.id] = 'visited' })
  const treeEdges = {}
  graph.nodes.forEach(n => {
    if (n.id !== 0 && prev[n.id] !== undefined) treeEdges[edgeKey(prev[n.id], n.id)] = 'tree'
  })
  add(treeEdges, `Done! Shortest distances from A —  ${distStr()}.`, { c: 13, python: 12, javascript: 13 })

  return steps
}
