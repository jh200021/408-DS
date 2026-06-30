// Fixed skip list for deterministic visualization.
// Values:  2  5  8  11  14  17  20
// Level heights (0-indexed from bottom):
//   2  → levels 0,1,2
//   5  → level  0
//   8  → levels 0,1
//   11 → levels 0,1,2,3
//   14 → levels 0,1
//   17 → level  0
//   20 → levels 0,1,2

export const SKIP_STRUCTURE = {
  values:  [-Infinity, 2, 5, 8, 11, 14, 17, 20, Infinity],
  heights: [4, 3, 1, 2, 4, 2, 1, 3, 4],  // max levels each node appears in (1-indexed)
  maxLevel: 4,
  labels:  ['-∞', '2', '5', '8', '11', '14', '17', '20', '+∞'],
};

// A fresh search target for the "New Target" button — pick one of the stored
// values so the walk ends on a hit (the search also handles misses correctly).
export function randomSkipTarget() {
  const vals = SKIP_STRUCTURE.values.slice(1, -1); // drop ±∞ sentinels
  return vals[Math.floor(Math.random() * vals.length)];
}

export function generateSkipListSteps(input) {
  const steps = [];
  const s = SKIP_STRUCTURE;
  const target = typeof input === 'number' ? input : 14;

  function push(currentNode, currentLevel, highlights, description, lines) {
    steps.push({ skip: s, currentNode, currentLevel, highlights: { ...highlights }, target, description, codeLines: lines });
  }

  push(-1, -1, {}, `Skip List: a probabilistic data structure with multiple sorted linked-list levels. Higher levels act as "express lanes" for fast search — O(log n) average.`, { c: 1, python: 1, javascript: 1 });

  // Animate building the structure
  push(-1, -1, {}, `The list stores values [${s.values.slice(1, -1).join(', ')}] across ${s.maxLevel} levels. Level 0 (bottom) contains every element.`, { c: 1, python: 1, javascript: 1 });

  // Search for target = 14
  push(0, s.maxLevel - 1, { 0: s.maxLevel - 1 }, `SEARCH(${target}): Start at the HEAD node at the highest level (Level ${s.maxLevel - 1}).`, { c: 6, python: 6, javascript: 6 });

  let nodeIdx = 0;  // head
  for (let lv = s.maxLevel - 1; lv >= 0; lv--) {
    push(nodeIdx, lv, { [nodeIdx]: lv }, `Level ${lv}: at node "${s.labels[nodeIdx]}". Look at the next node on this level.`, { c: 8, python: 8, javascript: 8 });

    // Walk right on this level
    while (true) {
      // Find next node at level lv after nodeIdx
      let nextIdx = null;
      for (let j = nodeIdx + 1; j < s.values.length; j++) {
        if (s.heights[j] > lv) { nextIdx = j; break; }
      }
      if (nextIdx === null) break;

      const nextVal = s.values[nextIdx];
      if (nextVal <= target) {
        push(nodeIdx, lv, { [nodeIdx]: lv, [nextIdx]: lv }, `Level ${lv}: next node "${s.labels[nextIdx]}" = ${nextVal} ≤ ${target} → move right.`, { c: 9, python: 9, javascript: 9 });
        nodeIdx = nextIdx;
        if (nextVal === target) break;
        push(nodeIdx, lv, { [nodeIdx]: lv }, `Now at "${s.labels[nodeIdx]}". Continue right on level ${lv}.`, { c: 9, python: 9, javascript: 9 });
      } else {
        push(nodeIdx, lv, { [nodeIdx]: lv, [nextIdx]: lv }, `Level ${lv}: next "${s.labels[nextIdx]}" = ${nextVal} > ${target} → drop down.`, { c: 10, python: 10, javascript: 10 });
        break;
      }
    }

    if (s.values[nodeIdx] === target) break;
  }

  const found = s.values[nodeIdx] === target;
  push(nodeIdx, 0, { [nodeIdx]: found ? 'found' : 'miss' },
    found ? `Found ${target} at node "${s.labels[nodeIdx]}"! Search complete.` : `${target} not found.`,
    { c: 12, python: 12, javascript: 12 });

  return steps;
}
