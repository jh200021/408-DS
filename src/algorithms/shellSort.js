export function generateShellSortSteps(inputArray) {
	const steps = []
	const arr = [...inputArray]
	const n = arr.length

	function addStep(extra, desc, lines) {
		steps.push({ array: [...arr], highlights: { ...extra }, description: desc, codeLines: lines })
	}

	addStep(
		{},
		'Starting Shell Sort — insertion sort applied to elements a "gap" apart. The gap shrinks each round until it reaches 1.',
		{ c: 2, python: 3, javascript: 3 },
	)

	for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
		addStep({}, `New gap = ${gap}. Sort elements that are ${gap} index${gap === 1 ? '' : 'es'} apart.`, {
			c: 2,
			python: 4,
			javascript: 3,
		})

		for (let i = gap; i < n; i++) {
			const temp = arr[i]
			addStep({ [i]: 'key' }, `Take arr[${i}] = ${temp} as the key for this gapped insertion.`, {
				c: 4,
				python: 6,
				javascript: 5,
			})

			let j = i
			while (j >= gap && arr[j - gap] > temp) {
				addStep(
					{ [j]: 'comparing', [j - gap]: 'comparing' },
					`arr[${j - gap}] = ${arr[j - gap]} > key ${temp} → shift it ${gap} position${gap === 1 ? '' : 's'} right.`,
					{ c: 6, python: 8, javascript: 7 },
				)
				arr[j] = arr[j - gap]
				addStep(
					{ [j]: 'comparing', [j - gap]: 'comparing' },
					`Shifted ${arr[j]} into index ${j}.`,
					{ c: 7, python: 9, javascript: 8 },
				)
				j -= gap
			}

			arr[j] = temp
			addStep({ [j]: 'key' }, `Place key ${temp} at index ${j}.`, { c: 8, python: 11, javascript: 11 })
		}

		addStep({}, `The array is now ${gap}-sorted.`, { c: 2, python: 12, javascript: 3 })
	}

	const allSorted = {}
	for (let i = 0; i < n; i++) allSorted[i] = 'sorted'
	addStep(
		allSorted,
		'The final pass with gap = 1 is a full insertion sort over a nearly-sorted array. Shell Sort complete!',
		{ c: 10, python: 13, javascript: 14 },
	)

	return steps
}
