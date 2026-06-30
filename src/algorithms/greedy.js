const COINS = [25, 10, 5, 1] // cents, descending
const DEFAULT_AMOUNT = 41

// A fresh target amount (in cents) for the "New Target" button — e.g. 57¢.
export function randomGreedyAmount() {
	return Math.floor(Math.random() * 94) + 6 // 6¢ … 99¢
}

export function generateGreedySteps(input) {
	const AMOUNT = typeof input === 'number' && input > 0 ? input : DEFAULT_AMOUNT
	const steps = []
	let remaining = AMOUNT
	const selected = new Array(COINS.length).fill(0)

	function push(coinIdx, highlights, description, lines) {
		steps.push({
			coins: [...COINS],
			amount: AMOUNT,
			remaining,
			selected: [...selected],
			coinIdx,
			highlights: { ...highlights },
			description,
			codeLines: lines,
		})
	}

	push(
		-1,
		{},
		`Greedy Algorithm — Coin Change: make ${AMOUNT}¢ using fewest coins from [${COINS.join('¢, ')}¢]. Always pick the largest coin that fits.`,
		{ c: 1, python: 1, javascript: 1 },
	)

	for (let i = 0; i < COINS.length; i++) {
		push(
			i,
			{ [i]: 'active' },
			`Try coin ${COINS[i]}¢. Remaining = ${remaining}¢. Is ${COINS[i]} ≤ ${remaining}? ${COINS[i] <= remaining ? 'Yes!' : 'No — skip.'}`,
			{ c: 4, python: 4, javascript: 4 },
		)

		while (remaining >= COINS[i]) {
			selected[i]++
			remaining -= COINS[i]
			push(
				i,
				{ [i]: 'selected' },
				`Use one ${COINS[i]}¢ coin. Remaining = ${remaining}¢. Count for ${COINS[i]}¢ = ${selected[i]}.`,
				{ c: 5, python: 5, javascript: 5 },
			)
		}

		if (selected[i] > 0) {
			push(
				i,
				{ [i]: 'done' },
				`Done with ${COINS[i]}¢ coins (×${selected[i]}). Move to smaller denomination.`,
				{ c: 4, python: 4, javascript: 4 },
			)
		}
	}

	const total = selected.reduce((s, c) => s + c, 0)
	const breakdown = COINS.map((c, i) => (selected[i] ? `${selected[i]}×${c}¢` : ''))
		.filter(Boolean)
		.join(' + ')
	push(
		-1,
		{},
		`Done! ${AMOUNT}¢ = ${breakdown} = ${total} coins total. Greedy works optimally for canonical coin systems.`,
		{ c: 8, python: 8, javascript: 8 },
	)
	return steps
}
