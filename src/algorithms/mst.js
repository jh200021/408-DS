import { WEIGHTED_GRAPH_DATA, edgeKey } from './weightedGraphData'

export function generateMSTSteps() {
	const graph = WEIGHTED_GRAPH_DATA
	const steps = []
	const label = id => graph.nodes[id].label

	const ns = {}
	graph.nodes.forEach(n => {
		ns[n.id] = 'unvisited'
	})
	const edgeState = {}

	const parent = graph.nodes.map((_, i) => i)
	const find = x => (parent[x] === x ? x : (parent[x] = find(parent[x])))

	const mst = []
	let total = 0
	const pair = (u, v, w) => `${label(u)}${label(v)}(${w})`
	const mstStr = () =>
		mst.length ? `${mst.map(([u, v, w]) => pair(u, v, w)).join('  ')}   total = ${total}` : '—'

	function add(desc, lines) {
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

	add(
		"Kruskal's algorithm builds a Minimum Spanning Tree: repeatedly add the cheapest edge that does not create a cycle, using union-find to detect cycles.",
		{ c: 5, python: 1, javascript: 1 },
	)

	const sorted = [...graph.edges].sort((a, b) => a[2] - b[2])
	add(`Sort all edges by weight:  ${sorted.map(([u, v, w]) => pair(u, v, w)).join(', ')}.`, {
		c: 6,
		python: 2,
		javascript: 2,
	})

	for (const [u, v, w] of sorted) {
		const ek = edgeKey(u, v)
		edgeState[ek] = 'considering'
		add(
			`Consider edge ${label(u)}–${label(v)} (weight ${w}). Are ${label(u)} and ${label(v)} in different components?`,
			{ c: 12, python: 11, javascript: 7 },
		)

		if (find(u) !== find(v)) {
			parent[find(u)] = find(v)
			mst.push([u, v, w])
			total += w
			edgeState[ek] = 'tree'
			ns[u] = 'tree'
			ns[v] = 'tree'
			add(
				`Different components → add ${label(u)}–${label(v)} to the MST and union them. Total weight = ${total}.`,
				{ c: 13, python: 12, javascript: 9 },
			)
		} else {
			edgeState[ek] = 'reject'
			add(`Same component → adding ${label(u)}–${label(v)} would form a cycle. Skip it.`, {
				c: 12,
				python: 11,
				javascript: 7,
			})
		}

		if (mst.length === graph.nodes.length - 1) break
	}

	add(
		`MST complete! ${mst.length} edges, total weight ${total}:  ${mst.map(([u, v]) => `${label(u)}${label(v)}`).join(', ')}.`,
		{ c: 16, python: 14, javascript: 12 },
	)

	return steps
}
