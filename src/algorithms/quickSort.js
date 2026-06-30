export function generateQuickSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;
  const globalSorted = new Set();

  function mkH(extra) {
    const h = {};
    globalSorted.forEach(i => { h[i] = 'sorted'; });
    return { ...h, ...extra };
  }

  steps.push({
    array: [...arr],
    highlights: {},
    description: 'Starting Quick Sort. A pivot element is chosen; elements are partitioned around it, then sub-arrays sorted recursively.',
    codeLines: { c: 17, python: 1, javascript: 1 },
  });

  function partition(low, high) {
    const pivot = arr[high];

    steps.push({
      array: [...arr],
      highlights: mkH({ [high]: 'pivot' }),
      description: `Partition [${low}..${high}]. Pivot = arr[${high}] = ${pivot}. i starts at ${low - 1}.`,
      codeLines: { c: 2, python: 8, javascript: 11 },
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      const h = mkH({ [high]: 'pivot', [j]: 'comparing' });
      for (let x = low; x <= i; x++) if (!globalSorted.has(x)) h[x] = 'active';

      steps.push({
        array: [...arr],
        highlights: h,
        description: `Comparing arr[${j}] = ${arr[j]} with pivot ${pivot}`,
        codeLines: { c: 5, python: 11, javascript: 14 },
      });

      if (arr[j] <= pivot) {
        i++;
        const swapH = mkH({ [high]: 'pivot', [i]: 'swapping', [j]: 'swapping' });

        steps.push({
          array: [...arr],
          highlights: swapH,
          description: `arr[${j}] = ${arr[j]} ≤ ${pivot} → i = ${i}, swapping arr[${i}] = ${arr[i]} and arr[${j}] = ${arr[j]}`,
          codeLines: { c: 7, python: 12, javascript: 15 },
        });

        [arr[i], arr[j]] = [arr[j], arr[i]];

        const afterH = mkH({ [high]: 'pivot' });
        for (let x = low; x <= i; x++) if (!globalSorted.has(x)) afterH[x] = 'active';
        steps.push({
          array: [...arr],
          highlights: afterH,
          description: `Swapped. arr[${i}] = ${arr[i]}, arr[${j}] = ${arr[j]}`,
          codeLines: { c: 9, python: 13, javascript: 16 },
        });
      }
    }

    const pivotPos = i + 1;
    steps.push({
      array: [...arr],
      highlights: mkH({ [pivotPos]: 'swapping', [high]: 'swapping' }),
      description: `Placing pivot ${pivot} in correct position ${pivotPos} (swapping arr[${pivotPos}] and arr[${high}])`,
      codeLines: { c: 12, python: 14, javascript: 19 },
    });

    [arr[pivotPos], arr[high]] = [arr[high], arr[pivotPos]];
    globalSorted.add(pivotPos);

    steps.push({
      array: [...arr],
      highlights: mkH({}),
      description: `Pivot ${arr[pivotPos]} is at its correct position ${pivotPos}. Left side ≤ ${arr[pivotPos]} ≤ right side.`,
      codeLines: { c: 15, python: 15, javascript: 20 },
    });

    return pivotPos;
  }

  function quickSort(low, high) {
    if (low > high) return;
    if (low === high) {
      if (!globalSorted.has(low)) globalSorted.add(low);
      return;
    }

    const pi = partition(low, high);
    quickSort(low, pi - 1);
    quickSort(pi + 1, high);
  }

  quickSort(0, n - 1);

  const allSorted = {};
  for (let i = 0; i < n; i++) allSorted[i] = 'sorted';
  steps.push({
    array: [...arr],
    highlights: allSorted,
    description: 'Quick Sort complete! All elements are in their sorted positions.',
    codeLines: { c: 23, python: 5, javascript: 7 },
  });

  return steps;
}
