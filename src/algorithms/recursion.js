// Pre-build the fib(5) call tree, then replay it step by step.
// Nodes: { id, label, n, result, parentId, leftChild, rightChild }
let _idGen = 0;
function buildTree(n, parentId) {
  const id = _idGen++;
  const node = { id, label: `fib(${n})`, n, result: null, parentId, leftChild: null, rightChild: null };
  if (n <= 1) { node.result = n; return [node]; }
  const left = buildTree(n - 1, id);
  const right = buildTree(n - 2, id);
  node.leftChild = left[0].id;
  node.rightChild = right[0].id;
  node.result = left[0].result + right[0].result;
  return [node, ...left, ...right];
}

// A fresh n for the "New N" button — kept small so the call tree stays readable.
export function randomRecursionN() {
  return Math.floor(Math.random() * 4) + 4; // 4 … 7
}

export function generateRecursionSteps(input) {
  const n = typeof input === 'number' && input >= 1 && input <= 8 ? input : 5;
  _idGen = 0;
  const treeNodes = buildTree(n, -1);
  const nodeMap = Object.fromEntries(treeNodes.map(n => [n.id, n]));
  const steps = [];
  const visible = new Set();
  const resolved = new Set();

  function push(activeId, highlights, description, lines) {
    steps.push({
      treeNodes: treeNodes.map(n => ({ ...n })),
      visible: [...visible],
      resolved: [...resolved],
      activeId,
      highlights: { ...highlights },
      description,
      codeLines: lines,
    });
  }

  push(-1, {}, 'Recursion: a function that calls itself on smaller sub-problems until a base case is reached. Example: Fibonacci fib(n) = fib(n-1) + fib(n-2).', { c: 1, python: 1, javascript: 1 });

  // DFS traversal to simulate call/return
  function simulate(id) {
    const node = nodeMap[id];
    visible.add(id);
    push(id, { [id]: 'calling' }, `Call ${node.label}. n = ${node.n}${node.n <= 1 ? ', base case!' : ', recurse.'}`, node.n <= 1 ? { c: 2, python: 2, javascript: 2 } : { c: 3, python: 3, javascript: 3 });

    if (node.n <= 1) {
      resolved.add(id);
      push(id, { [id]: 'returned' }, `${node.label} returns ${node.result} (base case).`, { c: 2, python: 2, javascript: 2 });
      return;
    }

    simulate(node.leftChild);
    simulate(node.rightChild);

    resolved.add(id);
    const l = nodeMap[node.leftChild], r = nodeMap[node.rightChild];
    push(id, { [id]: 'returned', [node.leftChild]: 'used', [node.rightChild]: 'used' },
      `${node.label} = fib(${node.n - 1}) + fib(${node.n - 2}) = ${l.result} + ${r.result} = ${node.result}. Return ${node.result}.`,
      { c: 3, python: 3, javascript: 3 });
  }

  simulate(0);
  push(-1, {}, `fib(${n}) = ${nodeMap[0].result}. Total calls: ${treeNodes.length}. Notice overlapping sub-problems — DP can eliminate redundancy.`, { c: 3, python: 3, javascript: 3 });
  return steps;
}
