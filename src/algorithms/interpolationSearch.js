export function generateInterpolationSearchSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray].sort((a, b) => a - b);
  const n = arr.length;
  const target = arr[Math.floor(n / 2)];

  function push(highlights, foundIndex, mid, low, high, description, lines) {
    steps.push({ array: [...arr], highlights, target, foundIndex, low, high, mid, description, codeLines: lines });
  }

  push({}, null, null, 0, n - 1, `Interpolation Search estimates where the target sits by its value, assuming a roughly uniform distribution. Target ${target}.`, { c: 1, python: 1, javascript: 1 });

  let low = 0, high = n - 1;
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    const pos = arr[high] === arr[low]
      ? low
      : low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));

    const h = {};
    for (let x = 0; x < low; x++) h[x] = 'eliminated';
    for (let x = high + 1; x < n; x++) h[x] = 'eliminated';
    for (let x = low; x <= high; x++) h[x] = 'active';
    h[pos] = 'searching';
    push(h, null, pos, low, high, `Probe pos = low + (target−arr[low])·(high−low)/(arr[high]−arr[low]) = ${pos}. arr[${pos}] = ${arr[pos]}.`, { c: 6, python: 5, javascript: 6 });

    if (arr[pos] === target) {
      push({ ...h, [pos]: 'found' }, pos, pos, low, high, `arr[${pos}] = ${target} = target! Found at index ${pos}.`, { c: 8, python: 7, javascript: 8 });
      return steps;
    } else if (arr[pos] < target) {
      push(h, null, pos, pos + 1, high, `arr[${pos}] = ${arr[pos]} < ${target}. Search the upper part [${pos + 1}..${high}].`, { c: 10, python: 9, javascript: 10 });
      low = pos + 1;
    } else {
      push(h, null, pos, low, pos - 1, `arr[${pos}] = ${arr[pos]} > ${target}. Search the lower part [${low}..${pos - 1}].`, { c: 12, python: 11, javascript: 12 });
      high = pos - 1;
    }
  }

  const elim = {};
  for (let x = 0; x < n; x++) elim[x] = 'eliminated';
  push(elim, -1, null, low, high, `Target ${target} not found. Returning -1.`, { c: 14, python: 13, javascript: 15 });
  return steps;
}
