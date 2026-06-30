export function generateBubbleSortSteps(inputArray) {
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

	addStep(
		{},
		'Starting Bubble Sort. We repeatedly compare adjacent elements and swap them if they are in the wrong order.',
		{ c: 1, python: 1, javascript: 1 },
	)

	for (let i = 0; i < n - 1; i++) {
		addStep({}, `Pass ${i + 1} of ${n - 1}: outer loop i = ${i}`, {
			c: 2,
			python: 3,
			javascript: 3,
		})

		for (let j = 0; j < n - i - 1; j++) {
			addStep(
				{ [j]: 'comparing', [j + 1]: 'comparing' },
				`Comparing arr[${j}] = ${arr[j]} and arr[${j + 1}] = ${arr[j + 1]}`,
				{ c: 4, python: 5, javascript: 5 },
			)

			if (arr[j] > arr[j + 1]) {
				addStep(
					{ [j]: 'swapping', [j + 1]: 'swapping' },
					`${arr[j]} > ${arr[j + 1]} → Swapping arr[${j}] and arr[${j + 1}]`,
					{ c: 5, python: 6, javascript: 6 },
				)

				;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

				addStep(
					{ [j]: 'swapping', [j + 1]: 'swapping' },
					`Swapped. Now arr[${j}] = ${arr[j]}, arr[${j + 1}] = ${arr[j + 1]}`,
					{ c: 7, python: 6, javascript: 6 },
				)
			}
		}

		sortedIdx.add(n - 1 - i)
		addStep({}, `Pass ${i + 1} done. ${arr[n - 1 - i]} is now in its correct final position.`, {
			c: 2,
			python: 3,
			javascript: 3,
		})
	}

	sortedIdx.add(0)
	addStep({}, 'Bubble Sort complete! All elements are in their sorted positions.', {
		c: 11,
		python: 7,
		javascript: 10,
	})

	return steps
}
