export function generateLinkedListSteps(inputArray) {
  const steps = [];
  const list = [];
  const vals = inputArray.slice(0, 7);

  function addStep(highlights, description, codeLines) {
    steps.push({ list: [...list], highlights: { ...highlights }, description, codeLines });
  }

  addStep({}, 'Linked List: each node stores data and a next pointer to the next node. HEAD points to the first node. The last node points to NULL.', { c: 1, python: 1, javascript: 1 });

  // --- Insert at head (3 times) ---
  for (let i = 0; i < 3; i++) {
    const val = vals[i];
    addStep({}, `INSERT HEAD(${val}): Create new node, set node.next = HEAD, update HEAD = newNode.`, { c: 13, python: 13, javascript: 13 });
    list.unshift(val);
    addStep({ 0: 'new' }, `Inserted ${val} at head. HEAD → ${list.slice(0, 3).join(' → ')}${list.length > 3 ? '…' : ' → NULL'}.`, { c: 15, python: 15, javascript: 15 });
  }

  // --- Insert at tail ---
  const tailVal = vals[3];
  addStep({}, `INSERT TAIL(${tailVal}): Traverse from HEAD to the last node (next = NULL), then link new node.`, { c: 18, python: 18, javascript: 18 });
  for (let i = 0; i < list.length; i++) {
    addStep({ [i]: 'traversing' }, `node[${i}].val = ${list[i]}, next → ${i < list.length - 1 ? `node[${i + 1}]` : 'NULL'} ${i === list.length - 1 ? '← tail found!' : ''}`, { c: 21, python: 21, javascript: 21 });
  }
  list.push(tailVal);
  addStep({ [list.length - 1]: 'new' }, `Inserted ${tailVal} at tail. List length = ${list.length}.`, { c: 22, python: 22, javascript: 22 });

  // One more tail insert silently
  list.push(vals[4]);
  addStep({ [list.length - 1]: 'new' }, `Inserted ${vals[4]} at tail. List length = ${list.length}.`, { c: 22, python: 22, javascript: 22 });

  // --- Traverse ---
  addStep({}, 'TRAVERSE: Walk from HEAD to NULL, visiting every node.', { c: 26, python: 26, javascript: 26 });
  for (let i = 0; i < list.length; i++) {
    addStep({ [i]: 'traversing' }, `Visit node[${i}] = ${list[i]}. ${i < list.length - 1 ? `next → node[${i + 1}]` : 'next → NULL (end of list)'}`, { c: 28, python: 28, javascript: 28 });
  }

  // --- Delete middle node ---
  const delIdx = Math.floor(list.length / 2);
  const delVal = list[delIdx];
  addStep({}, `DELETE(${delVal}): Search for node with value ${delVal}, then unlink it.`, { c: 31, python: 31, javascript: 31 });
  for (let i = 0; i <= delIdx; i++) {
    if (i < delIdx) {
      addStep({ [i]: 'traversing', [i + 1]: 'comparing' }, `node[${i + 1}].val = ${list[i + 1]} ≠ ${delVal}. Move forward.`, { c: 34, python: 34, javascript: 34 });
    } else {
      addStep({ [Math.max(0, i - 1)]: 'traversing', [i]: 'removing' }, `Found ${delVal} at node[${i}]. Set node[${i - 1}].next = node[${i + 1} ?? NULL].`, { c: 35, python: 35, javascript: 35 });
    }
  }
  list.splice(delIdx, 1);
  addStep({}, `Deleted ${delVal}. List length = ${list.length}.`, { c: 36, python: 36, javascript: 36 });

  addStep({}, 'Linked List demonstration complete!', { c: 1, python: 1, javascript: 1 });
  return steps;
}
