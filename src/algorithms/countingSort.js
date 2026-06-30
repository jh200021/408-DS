export function generateCountingSortSteps(inputArray) {
	const steps = []
	const arr = [...inputArray]
	const n = arr.length
	const sortedIdx = new Set()

	function addStep(extra, desc, lines) {
		const h = {}
		sortedIdx.forEach(i => {
			h[i] = 'sorted'
		})
		Object.assign(h, extra)
		steps.push({ array: [...arr], highlights: h, description: desc, codeLines: lines })
	}

	const max = Math.max(...arr)
	const count = new Array(max + 1).fill(0)

	addStep(
		{},
		`Counting Sort is a non-comparison sort. Tally how many times each value (0…${max}) appears, then rebuild the array in order. Best when the value range is small.`,
		{ c: 1, python: 1, javascript: 1 },
	)

	// Tally phase: count occurrences of each value.
	for (let i = 0; i < n; i++) {
		count[arr[i]]++
		addStep(
			{ [i]: 'comparing' },
			`Tally arr[${i}] = ${arr[i]} → count[${arr[i]}] is now ${count[arr[i]]}.`,
			{ c: 6, python: 5, javascript: 4 },
		)
	}

	addStep(
		{},
		'All values tallied. Now overwrite the array left-to-right with each value repeated count[v] times, in increasing order.',
		{ c: 8, python: 7, javascript: 6 },
	)

	// Rebuild phase: emit each value count[v] times, in order.
	let idx = 0
	for (let v = 0; v <= max; v++) {
		while (count[v]-- > 0) {
			arr[idx] = v
			sortedIdx.add(idx)
			addStep({ [idx]: 'swapping' }, `Place value ${v} at index ${idx}.`, {
				c: 9,
				python: 9,
				javascript: 7,
			})
			idx++
		}
	}

	for (let i = 0; i < n; i++) sortedIdx.add(i)
	addStep({}, 'Counting Sort complete! Sorted in O(n + k) time, where k is the value range.', {
		c: 8,
		python: 11,
		javascript: 8,
	})

	return steps
}
