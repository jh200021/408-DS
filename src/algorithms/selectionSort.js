export function generateSelectionSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;
  const sortedIdx = new Set();

  function addStep(extra, desc, lines) {
    const h = {};
    sortedIdx.forEach(i => { h[i] = 'sorted'; });
    Object.assign(h, extra);
    steps.push({ array: [...arr], highlights: h, description: desc, codeLines: lines });
  }

  addStep({}, 'Starting Selection Sort. We find the minimum element in the unsorted portion and place it at the front.', { c: 1, python: 1, javascript: 1 });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    addStep(
      { [i]: 'min' },
      `Outer loop i = ${i}. Setting minimum candidate to arr[${i}] = ${arr[i]}`,
      { c: 3, python: 4, javascript: 4 }
    );

    for (let j = i + 1; j < n; j++) {
      addStep(
        { [minIdx]: 'min', [j]: 'comparing' },
        `Comparing arr[${j}] = ${arr[j]} with current min arr[${minIdx}] = ${arr[minIdx]}`,
        { c: 5, python: 6, javascript: 6 }
      );

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        addStep(
          { [minIdx]: 'min' },
          `New minimum found! arr[${minIdx}] = ${arr[minIdx]}`,
          { c: 6, python: 7, javascript: 7 }
        );
      }
    }

    if (minIdx !== i) {
      addStep(
        { [i]: 'swapping', [minIdx]: 'swapping' },
        `Swapping minimum arr[${minIdx}] = ${arr[minIdx]} with arr[${i}] = ${arr[i]}`,
        { c: 10, python: 9, javascript: 11 }
      );

      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

      addStep(
        { [i]: 'comparing', [minIdx]: 'comparing' },
        `Swapped. arr[${i}] = ${arr[i]} is now in position ${i}`,
        { c: 12, python: 9, javascript: 11 }
      );
    } else {
      addStep(
        { [i]: 'min' },
        `arr[${i}] = ${arr[i]} is already the minimum, no swap needed`,
        { c: 9, python: 8, javascript: 10 }
      );
    }

    sortedIdx.add(i);
    addStep({}, `${arr[i]} is now in its correct position ${i}.`, { c: 2, python: 3, javascript: 3 });
  }

  sortedIdx.add(n - 1);
  addStep({}, 'Selection Sort complete! All elements are in their sorted positions.', { c: 15, python: 10, javascript: 15 });

  return steps;
}
