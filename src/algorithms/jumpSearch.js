export function generateJumpSearchSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray].sort((a, b) => a - b);
  const n = arr.length;
  const blockSize = Math.max(1, Math.floor(Math.sqrt(n)));
  const target = arr[Math.floor((n * 2) / 3)];

  function push(highlights, foundIndex, mid, low, high, description, lines) {
    steps.push({ array: [...arr], highlights, target, foundIndex, low, high, mid, description, codeLines: lines });
  }

  push({}, null, undefined, 0, n - 1, `Jump Search on a sorted array. Target ${target}. Jump ahead in blocks of ⌊√n⌋ = ${blockSize}.`, { c: 1, python: 1, javascript: 1 });

  // Phase 1: jump block by block until the block end reaches or passes the target.
  let prev = 0;
  let curr = blockSize;
  while (curr < n && arr[curr - 1] < target) {
    const h = {};
    for (let x = 0; x < curr; x++) h[x] = 'eliminated';
    h[curr - 1] = 'searching';
    push(h, null, curr - 1, prev, curr - 1, `Block end arr[${curr - 1}] = ${arr[curr - 1]} < ${target}. Skip this block and jump ahead.`, { c: 6, python: 5, javascript: 6 });
    prev = curr;
    curr += blockSize;
  }
  const blockEnd = Math.min(curr, n);

  // Phase 2: linear scan inside the identified block.
  const baseH = {};
  for (let x = 0; x < prev; x++) baseH[x] = 'eliminated';
  push({ ...baseH }, null, undefined, prev, blockEnd - 1, `Target must lie in block [${prev}..${blockEnd - 1}]. Scan it linearly.`, { c: 10, python: 9, javascript: 11 });

  for (let i = prev; i < blockEnd; i++) {
    const h = { ...baseH };
    for (let x = prev; x < i; x++) h[x] = 'eliminated';
    h[i] = 'searching';
    push(h, null, i, prev, blockEnd - 1, `Compare arr[${i}] = ${arr[i]} with target ${target}.`, { c: 12, python: 10, javascript: 13 });
    if (arr[i] === target) {
      push({ ...h, [i]: 'found' }, i, i, prev, blockEnd - 1, `arr[${i}] = ${target} = target! Found at index ${i}.`, { c: 13, python: 11, javascript: 14 });
      return steps;
    }
    if (arr[i] > target) break;
  }

  const elim = {};
  for (let x = 0; x < n; x++) elim[x] = 'eliminated';
  push(elim, -1, undefined, 0, n - 1, `Target ${target} not found. Returning -1.`, { c: 16, python: 13, javascript: 17 });
  return steps;
}
