// Maximum Subarray — Divide & Conquer (Kadane is O(n) greedy; D&C is O(n log n) here)
const DEFAULT_DEMO = [2, -1, 3, -4, 5, -2, 4];

// A fresh array (mixing positives and negatives) for the "New Array" button.
export function randomSubarrayInput() {
  return Array.from({ length: 7 }, () => Math.floor(Math.random() * 13) - 6); // -6 … 6
}

export function generateDivideConquerSteps(input) {
  const DEMO = Array.isArray(input) && input.length ? input : DEFAULT_DEMO;
  const steps = [];

  function push(l, r, highlights, description, lines) {
    steps.push({ array: DEMO, left: l, right: r, highlights: { ...highlights }, description, codeLines: lines });
  }

  push(0, DEMO.length - 1, {}, `Divide & Conquer — Maximum Subarray: recursively split [l..r] into left half, right half, and crossing sub-arrays; combine the three maxima. Array: [${DEMO.join(', ')}]`, { c: 1, python: 1, javascript: 1 });

  const results = [];  // collect (l, r, sum) for each sub-problem result

  function maxCross(l, m, r) {
    // Find max left-extending sum from m
    let lSum = -Infinity, s = 0, lBest = m;
    for (let i = m; i >= l; i--) {
      s += DEMO[i];
      const h = {};
      for (let x = i; x <= m; x++) h[x] = 'crossing';
      push(l, r, h, `Cross-left: extend from mid=${m} to ${i}. Sum = ${s}${s > lSum ? ' (new best!)' : ''}.`, { c: 5, python: 5, javascript: 5 });
      if (s > lSum) { lSum = s; lBest = i; }
    }

    let rSum = -Infinity; s = 0; let rBest = m + 1;
    for (let i = m + 1; i <= r; i++) {
      s += DEMO[i];
      const h = {};
      for (let x = m + 1; x <= i; x++) h[x] = 'crossing';
      push(l, r, h, `Cross-right: extend from mid+1=${m + 1} to ${i}. Sum = ${s}${s > rSum ? ' (new best!)' : ''}.`, { c: 6, python: 6, javascript: 6 });
      if (s > rSum) { rSum = s; rBest = i; }
    }

    const total = lSum + rSum;
    const h = {};
    for (let x = lBest; x <= rBest; x++) h[x] = 'result';
    push(l, r, h, `Cross max = ${lSum} + ${rSum} = ${total}  (indices ${lBest}..${rBest}).`, { c: 7, python: 7, javascript: 7 });
    return { sum: total, l: lBest, r: rBest };
  }

  function solve(l, r) {
    if (l === r) {
      push(l, r, { [l]: 'base' }, `Base case [${l}]: single element ${DEMO[l]}.`, { c: 2, python: 2, javascript: 2 });
      return { sum: DEMO[l], l, r };
    }

    const m = Math.floor((l + r) / 2);
    const hDiv = {};
    for (let x = l; x <= r; x++) hDiv[x] = x <= m ? 'left-part' : 'right-part';
    push(l, r, hDiv, `Divide [${l}..${r}] at mid=${m} → left [${l}..${m}], right [${m + 1}..${r}].`, { c: 3, python: 3, javascript: 3 });

    const leftRes  = solve(l, m);
    const rightRes = solve(m + 1, r);
    const crossRes = maxCross(l, m, r);

    let best;
    if (leftRes.sum >= rightRes.sum && leftRes.sum >= crossRes.sum) best = leftRes;
    else if (rightRes.sum >= leftRes.sum && rightRes.sum >= crossRes.sum) best = rightRes;
    else best = crossRes;

    const h = {};
    for (let x = best.l; x <= best.r; x++) h[x] = 'result';
    push(l, r, h, `[${l}..${r}] best: left=${leftRes.sum}, right=${rightRes.sum}, cross=${crossRes.sum} → max=${best.sum} (indices ${best.l}..${best.r}).`, { c: 9, python: 9, javascript: 9 });
    return best;
  }

  const ans = solve(0, DEMO.length - 1);
  const h = {};
  for (let x = ans.l; x <= ans.r; x++) h[x] = 'sorted';
  push(0, DEMO.length - 1, h, `Maximum subarray = [${DEMO.slice(ans.l, ans.r + 1).join(', ')}] = ${ans.sum}  (indices ${ans.l}..${ans.r}).`, { c: 10, python: 10, javascript: 10 });
  return steps;
}
