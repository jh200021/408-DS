export function generateHeapSteps(inputArray) {
  const steps = [];
  const heap = [];
  const vals = inputArray.slice(0, 8);

  function push(highlights, description, lines) {
    steps.push({ heap: [...heap], highlights: { ...highlights }, description, codeLines: lines });
  }

  function parent(i) { return Math.floor((i - 1) / 2); }
  function left(i)   { return 2 * i + 1; }
  function right(i)  { return 2 * i + 2; }

  push({}, 'Min-Heap: a complete binary tree where every node ≤ its children. Root always holds the minimum. Represented as an array.', { c: 1, python: 1, javascript: 1 });

  // --- Insertions with bubble-up ---
  for (const val of vals) {
    push({}, `INSERT(${val}): append to end of array, then bubble up.`, { c: 4, python: 5, javascript: 5 });
    heap.push(val);
    let i = heap.length - 1;
    push({ [i]: 'new' }, `Appended ${val} at index ${i}. Heap size = ${heap.length}.`, { c: 5, python: 6, javascript: 6 });

    while (i > 0 && heap[parent(i)] > heap[i]) {
      const p = parent(i);
      push({ [i]: 'comparing', [p]: 'comparing' }, `heap[${i}]=${heap[i]} < heap[${p}]=${heap[p]} (parent) → swap to restore min-heap.`, { c: 7, python: 8, javascript: 8 });
      [heap[i], heap[p]] = [heap[p], heap[i]];
      push({ [i]: 'swapping', [p]: 'swapping' }, `Swapped. ${heap[p]} is now at ${p}, ${heap[i]} at ${i}.`, { c: 8, python: 9, javascript: 9 });
      i = p;
    }
    push({ [i]: 'sorted' }, `${heap[i]} is in correct position. Heap property holds.`, { c: 4, python: 5, javascript: 5 });
  }

  // --- Extract-min twice ---
  for (let ext = 0; ext < 2; ext++) {
    const minVal = heap[0];
    push({ 0: 'removing' }, `EXTRACT-MIN: remove root (min = ${minVal}), move last element to root, bubble down.`, { c: 13, python: 14, javascript: 14 });
    heap[0] = heap[heap.length - 1];
    heap.pop();
    push({ 0: 'new' }, `Moved ${heap[0]} to root. Heap size = ${heap.length}. Now bubble down.`, { c: 14, python: 15, javascript: 15 });

    let i = 0;
    while (true) {
      const l = left(i), r = right(i);
      let smallest = i;
      if (l < heap.length && heap[l] < heap[smallest]) smallest = l;
      if (r < heap.length && heap[r] < heap[smallest]) smallest = r;
      if (smallest === i) break;

      push({ [i]: 'comparing', [smallest]: 'comparing' }, `heap[${i}]=${heap[i]} > heap[${smallest}]=${heap[smallest]} (child) → swap.`, { c: 17, python: 18, javascript: 18 });
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      push({ [i]: 'swapping', [smallest]: 'swapping' }, `Swapped. Continuing down…`, { c: 18, python: 19, javascript: 19 });
      i = smallest;
    }
    push({ [i]: 'sorted' }, `Extracted ${minVal}. New root (min) = ${heap[0] ?? '–'}.`, { c: 13, python: 14, javascript: 14 });
  }

  push({}, 'Heap demo complete!', { c: 1, python: 1, javascript: 1 });
  return steps;
}
