export function generateStackSteps(inputArray) {
  const steps = [];
  const stack = [];
  const vals = inputArray.slice(0, 8);

  const ops = [
    { type: 'push', val: vals[0] },
    { type: 'push', val: vals[1] },
    { type: 'push', val: vals[2] },
    { type: 'push', val: vals[3] },
    { type: 'push', val: vals[4] },
    { type: 'pop' },
    { type: 'pop' },
    { type: 'push', val: vals[5] },
    { type: 'push', val: vals[6] },
    { type: 'pop' },
    { type: 'pop' },
    { type: 'pop' },
  ];

  function addStep(highlights, description, codeLines) {
    steps.push({ stack: [...stack], highlights: { ...highlights }, description, codeLines });
  }

  addStep({}, 'Stack follows LIFO (Last-In, First-Out). The most recently pushed element is always removed first.', { c: 1, python: 1, javascript: 1 });

  for (const op of ops) {
    if (op.type === 'push') {
      addStep({}, `PUSH(${op.val}): Incrementing top (${stack.length - 1} → ${stack.length}) and storing value.`, { c: 5, python: 5, javascript: 4 });
      stack.push(op.val);
      addStep({ [stack.length - 1]: 'new' }, `Pushed ${op.val}. Stack size = ${stack.length}, top = ${stack[stack.length - 1]}.`, { c: 7, python: 6, javascript: 5 });
    } else if (op.type === 'pop') {
      if (stack.length === 0) continue;
      const val = stack[stack.length - 1];
      addStep({ [stack.length - 1]: 'removing' }, `POP(): Reading top element ${val}, then decrementing top (${stack.length - 1} → ${stack.length - 2}).`, { c: 11, python: 9, javascript: 9 });
      stack.pop();
      addStep({}, `Popped ${val}. Stack size = ${stack.length}${stack.length > 0 ? `, new top = ${stack[stack.length - 1]}` : '. Stack is now empty'}.`, { c: 12, python: 10, javascript: 9 });
    }
  }

  addStep({}, 'Stack operations complete!', { c: 18, python: 16, javascript: 16 });
  return steps;
}
