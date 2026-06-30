export function generateBSTSteps(inputArray) {
  const steps = [];
  // Normalize values to a compact range so they fit in tree circles
  const raw = inputArray.slice(0, 9).map(v => (v % 90) + 5);
  const vals = [...new Set(raw)].slice(0, 7);

  // BST stored as flat array: nodes[i] = { value, left, right }
  // left/right are indices (-1 = null)
  const nodes = [];
  let root = -1;

  function addStep(highlights, description, codeLines) {
    steps.push({
      bst: { nodes: nodes.map(n => ({ ...n })), root },
      highlights: { ...highlights },
      description,
      codeLines,
    });
  }

  addStep({}, 'Binary Search Tree (BST): for each node, all left-subtree values are smaller and all right-subtree values are larger.', { c: 1, python: 1, javascript: 1 });

  // --- Insertions ---
  for (const val of vals) {
    addStep({}, `INSERT(${val}): Starting at root, traverse left/right until an empty slot is found.`, { c: 13, python: 7, javascript: 9 });

    if (root === -1) {
      nodes.push({ value: val, left: -1, right: -1 });
      root = 0;
      addStep({ 0: 'inserted' }, `Tree is empty — ${val} becomes the root.`, { c: 14, python: 8, javascript: 10 });
      continue;
    }

    let cur = root;
    const path = [];

    while (true) {
      path.push(cur);
      const h = {};
      path.forEach(i => { h[i] = 'path'; });
      h[cur] = 'comparing';

      const dir = val < nodes[cur].value ? 'left' : 'right';
      addStep(h, `${val} ${val < nodes[cur].value ? '<' : '>'} ${nodes[cur].value} → go ${dir}`, { c: val < nodes[cur].value ? 15 : 17, python: val < nodes[cur].value ? 9 : 11, javascript: val < nodes[cur].value ? 11 : 13 });

      if (val < nodes[cur].value) {
        if (nodes[cur].left === -1) {
          const idx = nodes.length;
          nodes.push({ value: val, left: -1, right: -1 });
          nodes[cur].left = idx;
          h[idx] = 'inserted';
          addStep(h, `Left slot of ${nodes[cur].value} is empty → insert ${val} here.`, { c: 14, python: 8, javascript: 10 });
          break;
        }
        cur = nodes[cur].left;
      } else {
        if (nodes[cur].right === -1) {
          const idx = nodes.length;
          nodes.push({ value: val, left: -1, right: -1 });
          nodes[cur].right = idx;
          h[idx] = 'inserted';
          addStep(h, `Right slot of ${nodes[cur].value} is empty → insert ${val} here.`, { c: 14, python: 8, javascript: 10 });
          break;
        }
        cur = nodes[cur].right;
      }
    }
  }

  // --- Search ---
  const target = vals[Math.floor(vals.length / 2)];
  addStep({}, `SEARCH(${target}): Starting at root, compare and navigate left/right until found or NULL.`, { c: 21, python: 16, javascript: 18 });

  let cur = root;
  while (cur !== -1) {
    const h = { [cur]: 'searching' };
    const node = nodes[cur];

    if (target === node.value) {
      addStep({ [cur]: 'found' }, `Found ${target}! Search complete.`, { c: 22, python: 17, javascript: 19 });
      break;
    }
    addStep(h, `${target} ${target < node.value ? '<' : '>'} ${node.value} → go ${target < node.value ? 'left' : 'right'}`, { c: target < node.value ? 24 : 25, python: target < node.value ? 19 : 20, javascript: target < node.value ? 21 : 22 });
    cur = target < node.value ? node.left : node.right;
  }

  addStep({}, 'BST demonstration complete!', { c: 1, python: 1, javascript: 1 });
  return steps;
}
