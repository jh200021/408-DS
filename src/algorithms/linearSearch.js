export function generateLinearSearchSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;
  const target = arr[Math.floor(n / 3)];

  steps.push({
    array: [...arr],
    highlights: {},
    target,
    foundIndex: null,
    description: `Starting Linear Search. Target: ${target}. Scanning each element from left to right until found.`,
    codeLines: { c: 1, python: 1, javascript: 1 },
  });

  for (let i = 0; i < n; i++) {
    const prevH = {};
    for (let x = 0; x < i; x++) prevH[x] = 'eliminated';

    steps.push({
      array: [...arr],
      highlights: { ...prevH, [i]: 'searching' },
      target,
      foundIndex: null,
      description: `Checking arr[${i}] = ${arr[i]}. Is ${arr[i]} === ${target}?`,
      codeLines: { c: 3, python: 3, javascript: 3 },
    });

    if (arr[i] === target) {
      steps.push({
        array: [...arr],
        highlights: { ...prevH, [i]: 'found' },
        target,
        foundIndex: i,
        description: `Found! arr[${i}] = ${target}. Returning index ${i}.`,
        codeLines: { c: 4, python: 4, javascript: 4 },
      });
      return steps;
    }

    steps.push({
      array: [...arr],
      highlights: { ...prevH, [i]: 'eliminated' },
      target,
      foundIndex: null,
      description: `arr[${i}] = ${arr[i]} ≠ ${target}. Continue searching…`,
      codeLines: { c: 2, python: 2, javascript: 2 },
    });
  }

  const elimAll = {};
  for (let x = 0; x < n; x++) elimAll[x] = 'eliminated';
  steps.push({
    array: [...arr],
    highlights: elimAll,
    target,
    foundIndex: -1,
    description: `Target ${target} not found in the array. Returning -1.`,
    codeLines: { c: 7, python: 5, javascript: 7 },
  });

  return steps;
}
