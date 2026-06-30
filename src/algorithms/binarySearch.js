export function generateBinarySearchSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray].sort((a, b) => a - b);
  const n = arr.length;
  const target = arr[Math.floor(n / 3)];

  steps.push({
    array: [...arr],
    highlights: {},
    target,
    foundIndex: null,
    low: 0,
    high: n - 1,
    mid: null,
    description: `Starting Binary Search on sorted array. Target: ${target}. Initial range: [0..${n - 1}].`,
    codeLines: { c: 1, python: 1, javascript: 1 },
  });

  let low = 0, high = n - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    const rangeH = {};
    for (let x = 0; x < low; x++) rangeH[x] = 'eliminated';
    for (let x = high + 1; x < n; x++) rangeH[x] = 'eliminated';
    for (let x = low; x <= high; x++) rangeH[x] = 'active';
    rangeH[mid] = 'searching';

    steps.push({
      array: [...arr],
      highlights: rangeH,
      target,
      foundIndex: null,
      low,
      high,
      mid,
      description: `Range [${low}..${high}], mid = ${mid}, arr[${mid}] = ${arr[mid]}. Comparing ${arr[mid]} with target ${target}.`,
      codeLines: { c: 4, python: 4, javascript: 4 },
    });

    if (arr[mid] === target) {
      steps.push({
        array: [...arr],
        highlights: { ...rangeH, [mid]: 'found' },
        target,
        foundIndex: mid,
        low,
        high,
        mid,
        description: `arr[${mid}] = ${target} = target! Found at index ${mid}.`,
        codeLines: { c: 5, python: 5, javascript: 5 },
      });
      return steps;
    } else if (arr[mid] < target) {
      const newLow = mid + 1;
      steps.push({
        array: [...arr],
        highlights: rangeH,
        target,
        foundIndex: null,
        low: newLow,
        high,
        mid,
        description: `arr[${mid}] = ${arr[mid]} < ${target}. Target in right half. New range: [${newLow}..${high}].`,
        codeLines: { c: 6, python: 7, javascript: 6 },
      });
      low = newLow;
    } else {
      const newHigh = mid - 1;
      steps.push({
        array: [...arr],
        highlights: rangeH,
        target,
        foundIndex: null,
        low,
        high: newHigh,
        mid,
        description: `arr[${mid}] = ${arr[mid]} > ${target}. Target in left half. New range: [${low}..${newHigh}].`,
        codeLines: { c: 7, python: 9, javascript: 7 },
      });
      high = newHigh;
    }
  }

  const elimAll = {};
  for (let x = 0; x < n; x++) elimAll[x] = 'eliminated';
  steps.push({
    array: [...arr],
    highlights: elimAll,
    target,
    foundIndex: -1,
    low,
    high,
    mid: null,
    description: `Search complete. Target ${target} not found. Returning -1.`,
    codeLines: { c: 9, python: 11, javascript: 9 },
  });

  return steps;
}
