export function generateMergeSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;

  steps.push({
    array: [...arr],
    highlights: {},
    description: 'Starting Merge Sort. The array is divided into halves recursively, then merged back in sorted order.',
    codeLines: { c: 18, python: 1, javascript: 1 },
  });

  function merge(l, m, r) {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);

    const initH = {};
    for (let x = l; x <= m; x++) initH[x] = 'left-part';
    for (let x = m + 1; x <= r; x++) initH[x] = 'right-part';

    steps.push({
      array: [...arr],
      highlights: initH,
      description: `Merging: left [${l}..${m}] = [${left.join(', ')}]  and  right [${m + 1}..${r}] = [${right.join(', ')}]`,
      codeLines: { c: 1, python: 9, javascript: 9 },
    });

    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      const baseH = {};
      for (let x = l; x < k; x++) baseH[x] = 'placed';
      // right element at m+1+j is always still in its original position (m+1+j > k always holds)
      baseH[m + 1 + j] = 'right-part';

      steps.push({
        array: [...arr],
        highlights: { ...baseH, [k]: 'comparing' },
        description: `Comparing left[${i}] = ${left[i]}  vs  right[${j}] = ${right[j]}`,
        codeLines: { c: 10, python: 12, javascript: 13 },
      });

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        steps.push({
          array: [...arr],
          highlights: { ...baseH, [k]: 'placed' },
          description: `${left[i]} ≤ ${right[j]} → Placing ${left[i]} at position ${k}`,
          codeLines: { c: 11, python: 13, javascript: 14 },
        });
        i++;
      } else {
        arr[k] = right[j];
        steps.push({
          array: [...arr],
          highlights: { ...baseH, [k]: 'placed' },
          description: `${left[i]} > ${right[j]} → Placing ${right[j]} at position ${k}`,
          codeLines: { c: 13, python: 16, javascript: 16 },
        });
        j++;
      }
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      const h = {};
      for (let x = l; x <= k; x++) h[x] = 'placed';
      steps.push({
        array: [...arr],
        highlights: h,
        description: `Copying remaining left element ${left[i]} to position ${k}`,
        codeLines: { c: 15, python: 18, javascript: 19 },
      });
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      const h = {};
      for (let x = l; x <= k; x++) h[x] = 'placed';
      steps.push({
        array: [...arr],
        highlights: h,
        description: `Copying remaining right element ${right[j]} to position ${k}`,
        codeLines: { c: 16, python: 19, javascript: 19 },
      });
      j++;
      k++;
    }

    const mergedH = {};
    for (let x = l; x <= r; x++) mergedH[x] = 'sorted';
    steps.push({
      array: [...arr],
      highlights: mergedH,
      description: `Merge complete! Subarray [${l}..${r}] is now sorted: [${arr.slice(l, r + 1).join(', ')}]`,
      codeLines: { c: 17, python: 20, javascript: 20 },
    });
  }

  function mergeSort(l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);

    const activeH = {};
    for (let x = l; x <= r; x++) activeH[x] = 'active';

    steps.push({
      array: [...arr],
      highlights: activeH,
      description: `Dividing [${l}..${r}] at midpoint ${m} → left [${l}..${m}], right [${m + 1}..${r}]`,
      codeLines: { c: 20, python: 4, javascript: 3 },
    });

    mergeSort(l, m);
    mergeSort(m + 1, r);
    merge(l, m, r);
  }

  mergeSort(0, n - 1);

  const allSorted = {};
  for (let i = 0; i < n; i++) allSorted[i] = 'sorted';
  steps.push({
    array: [...arr],
    highlights: allSorted,
    description: 'Merge Sort complete! The entire array is sorted.',
    codeLines: { c: 25, python: 7, javascript: 7 },
  });

  return steps;
}
