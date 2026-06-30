export function generateBucketSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;
  const sorted = new Set();

  function addStep(extra, desc, lines) {
    const h = {};
    sorted.forEach(i => { h[i] = 'sorted'; });
    Object.assign(h, extra);
    steps.push({ array: [...arr], highlights: h, description: desc, codeLines: lines });
  }

  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const bucketCount = Math.max(1, Math.floor(Math.sqrt(n)));
  const range = (max - min + 1) / bucketCount;

  addStep(
    {},
    `Bucket Sort scatters values into ${bucketCount} buckets by their range, sorts each bucket, then gathers them back in order. Values span ${min}…${max}.`,
    { c: 1, python: 1, javascript: 1 },
  );

  // Scatter phase: drop each value into the bucket for its range.
  const buckets = Array.from({ length: bucketCount }, () => []);
  for (let i = 0; i < n; i++) {
    const b = Math.min(bucketCount - 1, Math.floor((arr[i] - min) / range));
    buckets[b].push(arr[i]);
    addStep({ [i]: 'comparing' }, `Scatter arr[${i}] = ${arr[i]} into bucket ${b}.`, { c: 8, python: 6, javascript: 7 });
  }

  addStep({}, 'Every value is bucketed. Now sort each bucket, then gather them left to right.', { c: 11, python: 9, javascript: 11 });

  // Gather phase: sort each bucket and write values back in order.
  let idx = 0;
  for (let b = 0; b < bucketCount; b++) {
    buckets[b].sort((a, c) => a - c);
    for (const v of buckets[b]) {
      arr[idx] = v;
      sorted.add(idx);
      addStep({ [idx]: 'swapping' }, `Gather ${v} from bucket ${b} into position ${idx}.`, { c: 14, python: 11, javascript: 14 });
      idx++;
    }
  }

  for (let i = 0; i < n; i++) sorted.add(i);
  addStep({}, 'Bucket Sort complete! Runs in O(n + k) on average when values are spread uniformly.', { c: 16, python: 13, javascript: 17 });

  return steps;
}
