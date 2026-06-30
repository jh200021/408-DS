// DP demo: Fibonacci (bottom-up table) + 0/1 Knapsack teaser
const DEFAULT_DP_N = 10;

// A fresh table size for the "New N" button.
export function randomDPN() {
  return Math.floor(Math.random() * 9) + 6; // 6 … 14
}

export function generateDynamicProgrammingSteps(input) {
  const DP_N = typeof input === 'number' && input >= 2 && input <= 20 ? input : DEFAULT_DP_N;
  const steps = [];
  const dp = new Array(DP_N + 1).fill(null);

  function push(highlights, description, lines) {
    steps.push({ dp: [...dp], n: DP_N, highlights: { ...highlights }, description, codeLines: lines });
  }

  push({}, `Dynamic Programming — Fibonacci (bottom-up): fill dp[0..${DP_N}] where dp[i] = dp[i-1] + dp[i-2]. Each sub-problem solved once and stored — O(n) time, O(n) space.`, { c: 1, python: 1, javascript: 1 });

  // Base cases
  dp[0] = 0;
  push({ 0: 'base' }, `Base case: dp[0] = 0.`, { c: 4, python: 4, javascript: 4 });
  dp[1] = 1;
  push({ 1: 'base' }, `Base case: dp[1] = 1.`, { c: 5, python: 5, javascript: 5 });

  // Fill table
  for (let i = 2; i <= DP_N; i++) {
    push({ [i - 1]: 'using', [i - 2]: 'using', [i]: 'computing' },
      `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]}`,
      { c: 8, python: 8, javascript: 8 }
    );
    dp[i] = dp[i - 1] + dp[i - 2];
    push({ [i]: 'filled' }, `dp[${i}] = ${dp[i]}.`, { c: 8, python: 8, javascript: 8 });
  }

  const h = {};
  for (let i = 0; i <= DP_N; i++) h[i] = 'sorted';
  push(h, `Table complete! fib(${DP_N}) = ${dp[DP_N]}. Every sub-problem computed exactly once (no redundant calls like in naive recursion).`, { c: 10, python: 10, javascript: 10 });
  return steps;
}
