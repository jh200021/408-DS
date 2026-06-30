export function generateQueueSteps(inputArray) {
  const steps = [];
  const queue = [];
  const vals = inputArray.slice(0, 8);

  const ops = [
    { type: 'enqueue', val: vals[0] },
    { type: 'enqueue', val: vals[1] },
    { type: 'enqueue', val: vals[2] },
    { type: 'enqueue', val: vals[3] },
    { type: 'enqueue', val: vals[4] },
    { type: 'dequeue' },
    { type: 'dequeue' },
    { type: 'enqueue', val: vals[5] },
    { type: 'enqueue', val: vals[6] },
    { type: 'dequeue' },
    { type: 'dequeue' },
    { type: 'dequeue' },
  ];

  function addStep(highlights, description, codeLines) {
    steps.push({ queue: [...queue], highlights: { ...highlights }, description, codeLines });
  }

  addStep({}, 'Queue follows FIFO (First-In, First-Out). The element added earliest is always removed first.', { c: 1, python: 1, javascript: 1 });

  for (const op of ops) {
    if (op.type === 'enqueue') {
      addStep({}, `ENQUEUE(${op.val}): Incrementing rear (${queue.length - 1} → ${queue.length}) and storing value at rear.`, { c: 6, python: 7, javascript: 7 });
      queue.push(op.val);
      addStep({ [queue.length - 1]: 'new' }, `Enqueued ${op.val} at rear. Size = ${queue.length}. Front = ${queue[0]}, Rear = ${queue[queue.length - 1]}.`, { c: 7, python: 8, javascript: 8 });
    } else if (op.type === 'dequeue') {
      if (queue.length === 0) continue;
      const val = queue[0];
      addStep({ 0: 'removing' }, `DEQUEUE(): Reading front element ${val}, then incrementing front pointer.`, { c: 12, python: 13, javascript: 13 });
      queue.shift();
      addStep({}, `Dequeued ${val}. Size = ${queue.length}${queue.length > 0 ? `. New front = ${queue[0]}` : '. Queue is now empty'}.`, { c: 13, python: 14, javascript: 14 });
    }
  }

  addStep({}, 'Queue operations complete!', { c: 20, python: 18, javascript: 18 });
  return steps;
}
