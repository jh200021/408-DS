export function generateRadixSortSteps(inputArray) {
	const steps = []
	let arr = [...inputArray]
	const n = arr.length

	function addStep(extra, desc, lines) {
		steps.push({ array: [...arr], highlights: { ...extra }, description: desc, codeLines: lines })
	}

	const max = Math.max(...arr)
	const digitName = exp =>
		exp === 1 ? 'units' : exp === 10 ? 'tens' : exp === 100 ? 'hundreds' : `10^${String(exp).length - 1}`

	addStep(
		{},
		'Radix Sort orders integers digit by digit, least-significant first, running a stable counting sort on each digit. No element comparisons are made.',
		{ c: 1, python: 1, javascript: 1 },
	)

	for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
		addStep({}, `Pass: sort by the ${digitName(exp)} digit.`, { c: 3, python: 3, javascript: 3 })

		const count = new Array(10).fill(0)
		for (let i = 0; i < n; i++) {
			const d = Math.floor(arr[i] / exp) % 10
			count[d]++
			addStep({ [i]: 'comparing' }, `arr[${i}] = ${arr[i]} → its ${digitName(exp)} digit is ${d}.`, {
				c: 6,
				python: 6,
				javascript: 6,
			})
		}

		for (let d = 1; d < 10; d++) count[d] += count[d - 1]
		const output = new Array(n)
		for (let i = n - 1; i >= 0; i--) {
			const d = Math.floor(arr[i] / exp) % 10
			output[--count[d]] = arr[i]
		}
		arr = output

		addStep(
			{},
			`Array reordered by the ${digitName(exp)} digit. The sort is stable, so the order from earlier digits is preserved for ties.`,
			{ c: 12, python: 12, javascript: 12 },
		)
	}

	const allSorted = {}
	for (let i = 0; i < n; i++) allSorted[i] = 'sorted'
	addStep(allSorted, 'Every digit position has been processed. Radix Sort complete!', {
		c: 14,
		python: 14,
		javascript: 14,
	})

	return steps
}
