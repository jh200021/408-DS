export function generateInsertionSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;

  steps.push({
    array: [...arr],
    highlights: { 0: 'sorted' },
    description: 'Starting Insertion Sort. The first element is trivially sorted.',
    codeLines: { c: 1, python: 1, javascript: 1 },
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    const sortedH = {};
    for (let x = 0; x < i; x++) sortedH[x] = 'sorted';

    steps.push({
      array: [...arr],
      highlights: { ...sortedH, [i]: 'key' },
      description: `Picking key = arr[${i}] = ${key}. Will insert into sorted portion [0..${i - 1}].`,
      codeLines: { c: 3, python: 3, javascript: 3 },
    });

    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        highlights: { ...sortedH, [j]: 'comparing', [j + 1]: 'comparing' },
        description: `arr[${j}] = ${arr[j]} > key = ${key} → Shifting ${arr[j]} right to position ${j + 1}`,
        codeLines: { c: 5, python: 5, javascript: 5 },
      });

      arr[j + 1] = arr[j];

      steps.push({
        array: [...arr],
        highlights: { ...sortedH, [j + 1]: 'comparing' },
        description: `Shifted ${arr[j + 1]} to position ${j + 1}.`,
        codeLines: { c: 6, python: 6, javascript: 6 },
      });

      j--;
    }

    arr[j + 1] = key;
    const newSorted = {};
    for (let x = 0; x <= i; x++) newSorted[x] = 'sorted';
    newSorted[j + 1] = 'key';

    steps.push({
      array: [...arr],
      highlights: newSorted,
      description: `Inserted key ${key} at position ${j + 1}. Sorted portion is now [0..${i}].`,
      codeLines: { c: 9, python: 8, javascript: 9 },
    });
  }

  const allSorted = {};
  for (let i = 0; i < n; i++) allSorted[i] = 'sorted';
  steps.push({
    array: [...arr],
    highlights: allSorted,
    description: 'Insertion Sort complete! All elements are in their sorted positions.',
    codeLines: { c: 11, python: 9, javascript: 12 },
  });

  return steps;
}
