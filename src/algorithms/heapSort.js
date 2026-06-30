export function generateHeapSortSteps(inputArray) {
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

	// Sift the value at index i down through a heap of the given size.
	function siftDown(end, i) {
		while (true) {
			let largest = i
			const l = 2 * i + 1
			const r = 2 * i + 2

			if (l < end) {
				addStep(
					{ [i]: 'active', [l]: 'comparing' },
					`Compare node arr[${i}] = ${arr[i]} with left child arr[${l}] = ${arr[l]}.`,
					{ c: 4, python: 4, javascript: 15 },
				)
				if (arr[l] > arr[largest]) largest = l
			}

			if (r < end) {
				addStep(
					{ [i]: 'active', [r]: 'comparing', ...(largest !== i ? { [largest]: 'comparing' } : {}) },
					`Compare current largest arr[${largest}] = ${arr[largest]} with right child arr[${r}] = ${arr[r]}.`,
					{ c: 5, python: 5, javascript: 16 },
				)
				if (arr[r] > arr[largest]) largest = r
			}

			if (largest === i) {
				addStep(
					{ [i]: 'active' },
					`arr[${i}] = ${arr[i]} is at least as large as its children — the heap property holds here.`,
					{ c: 6, python: 6, javascript: 17 },
				)
				break
			}

			addStep(
				{ [i]: 'swapping', [largest]: 'swapping' },
				`arr[${largest}] = ${arr[largest]} is larger. Swap it up with arr[${i}] = ${arr[i]}.`,
				{ c: 8, python: 7, javascript: 18 },
			)
			;[arr[i], arr[largest]] = [arr[largest], arr[i]]
			i = largest
		}
	}

	addStep(
		{},
		'Starting Heap Sort. First we build a max-heap so the largest element rises to the root (index 0).',
		{ c: 14, python: 12, javascript: 3 },
	)

	// Phase 1: build a max-heap bottom-up.
	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		addStep({ [i]: 'active' }, `Build phase: heapify the subtree rooted at index ${i}.`, {
			c: 15,
			python: 13,
			javascript: 4,
		})
		siftDown(n, i)
	}

	addStep(
		{},
		'Max-heap built — the root arr[0] holds the maximum. Now repeatedly move the root to the end.',
		{ c: 16, python: 14, javascript: 5 },
	)

	// Phase 2: repeatedly extract the max to the end of the array.
	for (let i = n - 1; i > 0; i--) {
		addStep(
			{ [0]: 'swapping', [i]: 'swapping' },
			`Swap the max arr[0] = ${arr[0]} with arr[${i}] = ${arr[i]}, locking it into its final position.`,
			{ c: 18, python: 15, javascript: 6 },
		)
		;[arr[0], arr[i]] = [arr[i], arr[0]]
		sortedIdx.add(i)
		addStep(
			{},
			`arr[${i}] = ${arr[i]} is now sorted. Restore the heap over the remaining ${i} element${i === 1 ? '' : 's'}.`,
			{ c: 19, python: 16, javascript: 7 },
		)
		siftDown(i, 0)
	}

	sortedIdx.add(0)
	addStep({}, 'Heap Sort complete! All elements are in sorted order.', {
		c: 21,
		python: 17,
		javascript: 9,
	})

	return steps
}
