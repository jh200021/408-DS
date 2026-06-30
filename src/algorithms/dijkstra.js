import { WEIGHTED_GRAPH_DATA, buildAdj, edgeKey } from './weightedGraphData'

export function generateDijkstraSteps() {
	const graph = WEIGHTED_GRAPH_DATA
	const adj = buildAdj(graph)
	const steps = []
	const N = graph.nodes.length
	const label = id => graph.nodes[id].label

	const dist = {}
	const prev = {}
	const ns = {}
	graph.nodes.forEach(n => {
		dist[n.id] = Infinity
		ns[n.id] = 'unvisited'
	})
	const visited = new Set()

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

	add(
		{},
		'Dijkstra finds the shortest path from a source to every node in a weighted graph with non-negative edges. We start from A.',
		{ c: 4, python: 4, javascript: 4 },
	)

	dist[0] = 0
	add({}, 'Set the source distance dist[A] = 0; every other distance starts at ∞.', {
		c: 4,
		python: 4,
		javascript: 4,
	})

	while (visited.size < N) {
		// Pick the unvisited node with the smallest tentative distance.
		let u = -1
		graph.nodes.forEach(n => {
			if (!visited.has(n.id) && (u === -1 || dist[n.id] < dist[u])) u = n.id
		})
		if (u === -1 || dist[u] === Infinity) break

		ns[u] = 'current'
		add({}, `Pick the unvisited node with the smallest distance: ${label(u)} (dist = ${dist[u]}).`, {
			c: 9,
			python: 6,
			javascript: 9,
		})

		for (const [nb, w] of adj[u]) {
			if (visited.has(nb)) continue
			const ek = edgeKey(u, nb)
			const cand = dist[u] + w
			const cur = dist[nb] === Infinity ? '∞' : dist[nb]
			add(
				{ [ek]: 'considering' },
				`Relax edge ${label(u)}→${label(nb)} (weight ${w}): ${dist[u]} + ${w} = ${cand} vs current ${cur}.`,
				{ c: 12, python: 10, javascript: 12 },
			)
			if (cand < dist[nb]) {
				dist[nb] = cand
				prev[nb] = u
				add(
					{ [ek]: 'considering' },
					`${cand} < ${cur} → update dist[${label(nb)}] = ${cand}.`,
					{ c: 13, python: 11, javascript: 13 },
				)
			}
		}

		visited.add(u)
		ns[u] = 'visited'
		add({}, `${label(u)} is finalised — its shortest distance ${dist[u]} is locked in.`, {
			c: 10,
			python: 8,
			javascript: 10,
		})
	}

	// Highlight the resulting shortest-path tree.
	const treeEdges = {}
	graph.nodes.forEach(n => {
		if (n.id !== 0 && prev[n.id] !== undefined) treeEdges[edgeKey(prev[n.id], n.id)] = 'tree'
	})
	add(treeEdges, `Dijkstra complete! Shortest distances from A —  ${distStr()}.`, {
		c: 15,
		python: 12,
		javascript: 15,
	})

	return steps
}
