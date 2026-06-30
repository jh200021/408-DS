// Fixed 6-node weighted, undirected graph shared by Dijkstra and Kruskal's MST.
export const WEIGHTED_GRAPH_DATA = {
	nodes: [
		{ id: 0, label: 'A', x: 0.14, y: 0.24 },
		{ id: 1, label: 'B', x: 0.50, y: 0.12 },
		{ id: 2, label: 'C', x: 0.86, y: 0.24 },
		{ id: 3, label: 'D', x: 0.20, y: 0.80 },
		{ id: 4, label: 'E', x: 0.55, y: 0.90 },
		{ id: 5, label: 'F', x: 0.88, y: 0.74 },
	],
	// [from, to, weight]
	edges: [
		[0, 1, 4],
		[0, 3, 5],
		[1, 2, 3],
		[1, 3, 2],
		[1, 4, 8],
		[2, 5, 6],
		[3, 4, 7],
		[4, 5, 1],
	],
}

export function buildAdj(data) {
	const adj = {}
	data.nodes.forEach(n => {
		adj[n.id] = []
	})
	data.edges.forEach(([a, b, w]) => {
		adj[a].push([b, w])
		adj[b].push([a, w])
	})
	return adj
}

export function edgeKey(a, b) {
	return `${Math.min(a, b)}-${Math.max(a, b)}`
}
