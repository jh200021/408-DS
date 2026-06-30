import { WEIGHTED_GRAPH_DATA, buildAdj, edgeKey } from './weightedGraphData'

export function generatePrimSteps() {
  const graph = WEIGHTED_GRAPH_DATA
  const adj = buildAdj(graph)
  const steps = []
  const label = id => graph.nodes[id].label

  const ns = {}
  graph.nodes.forEach(n => { ns[n.id] = 'unvisited' })

  const inTree = new Set()
  const mst = []
  let total = 0
  const pair = (u, v, w) => `${label(u)}${label(v)}(${w})`
  const mstStr = () => (mst.length ? `${mst.map(([u, v, w]) => pair(u, v, w)).join('  ')}   total = ${total}` : '—')

  function add(edgeState, desc, lines) {
    steps.push({
      graph,
      nodeState: { ...ns },
      edgeState: { ...edgeState },
      info: mstStr(),
      infoLabel: 'MST edges',
      description: desc,
      codeLines: lines,
    })
  }

  // Edge states for already-chosen tree edges, reused on every frame.
  const treeState = () => {
    const s = {}
    mst.forEach(([a, b]) => { s[edgeKey(a, b)] = 'tree' })
    return s
  }

  add(
    {},
    "Prim's algorithm grows a Minimum Spanning Tree from a start node: each round it adds the cheapest edge connecting a tree node to a node outside the tree. Start at A.",
    { c: 5, python: 1, javascript: 1 },
  )

  inTree.add(0)
  ns[0] = 'tree'
  add({}, 'Add the start node A to the tree.', { c: 8, python: 4, javascript: 4 })

  while (inTree.size < graph.nodes.length) {
    // Gather every edge that leaves the current tree; pick the cheapest.
    let best = null // [u, v, w]
    const frontier = treeState()
    for (const u of inTree) {
      for (const [v, w] of adj[u]) {
        if (!inTree.has(v)) {
          frontier[edgeKey(u, v)] = 'candidate'
          if (!best || w < best[2]) best = [u, v, w]
        }
      }
    }
    if (!best) break

    add(frontier, `Look at every edge leaving the tree (dashed). The cheapest is ${pair(best[0], best[1], best[2])}.`, { c: 11, python: 7, javascript: 9 })

    const [u, v, w] = best
    const chosen = { ...frontier, [edgeKey(u, v)]: 'considering' }
    add(chosen, `Pick edge ${label(u)}–${label(v)} (weight ${w}) and bring ${label(v)} into the tree.`, { c: 13, python: 9, javascript: 12 })

    inTree.add(v)
    ns[v] = 'tree'
    mst.push([u, v, w])
    total += w
    add(treeState(), `${label(v)} joined the tree. MST weight so far = ${total}.`, { c: 14, python: 10, javascript: 13 })
  }

  add(treeState(), `MST complete! ${mst.length} edges, total weight ${total}.`, { c: 17, python: 12, javascript: 16 })

  return steps
}
