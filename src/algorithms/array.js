export function generateArraySteps(inputArray) {
  const steps = [];
  const arr = [...inputArray.slice(0, 8)];

  function push(highlights, description, lines) {
    steps.push({ array: [...arr], highlights: { ...highlights }, description, codeLines: lines });
  }

  push({}, 'Array: contiguous memory block. Access is O(1) by index; insert / delete is O(n) because elements must shift.', { c: 1, python: 1, javascript: 1 });

  // 1. Access by index
  const ai = 3;
  push({ [ai]: 'accessing' }, `ACCESS arr[${ai}] → value = ${arr[ai]}.  Direct offset, O(1).`, { c: 5, python: 5, javascript: 5 });

  // 2. Linear search
  const target = arr[5];
  push({}, `SEARCH for ${target}: scan index 0 → n until found.`, { c: 20, python: 20, javascript: 20 });
  for (let i = 0; i <= 5; i++) {
    push(
      { ...Object.fromEntries([...Array(i).keys()].map(k => [k, 'eliminated'])), [i]: arr[i] === target ? 'found' : 'searching' },
      i < 5 ? `arr[${i}] = ${arr[i]} ≠ ${target}. Move on.` : `arr[${i}] = ${arr[i]} = ${target}. Found at index ${i}!`,
      { c: 22, python: 22, javascript: 22 }
    );
  }

  // 3. Insert at index 3
  const ins = Math.floor(Math.random() * 90) + 5;
  const ip = 3;
  push({}, `INSERT ${ins} at index ${ip}: shift elements right to make room — O(n).`, { c: 8, python: 8, javascript: 8 });
  for (let i = arr.length - 1; i >= ip; i--) {
    const h = {};
    h[i] = 'shifting';
    if (i + 1 <= arr.length) h[i + 1] = 'shifted';
    push(h, `Shift arr[${i}] = ${arr[i]} → arr[${i + 1}].`, { c: 10, python: 10, javascript: 10 });
  }
  arr.splice(ip, 0, ins);
  push({ [ip]: 'new' }, `Inserted ${ins} at index ${ip}. Size = ${arr.length}.`, { c: 11, python: 11, javascript: 11 });

  // 4. Delete at index 2
  const di = 2;
  const dv = arr[di];
  push({ [di]: 'removing' }, `DELETE arr[${di}] = ${dv}: shift elements left to fill gap — O(n).`, { c: 15, python: 15, javascript: 15 });
  arr.splice(di, 1);
  push({}, `Deleted ${dv}. Size = ${arr.length}.`, { c: 18, python: 18, javascript: 18 });

  push({}, 'Array demo complete!', { c: 1, python: 1, javascript: 1 });
  return steps;
}
