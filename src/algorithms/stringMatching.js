// Preset text/pattern pairs, each exercising matches and mismatches.
const PRESETS = [
  { text: 'ABCABDABC', pattern: 'ABC' },
  { text: 'AABAACAADAABAABA', pattern: 'AABA' },
  { text: 'ABABCABABA', pattern: 'ABAB' },
  { text: 'GEEKSFORGEEKS', pattern: 'GEEK' },
];

// A fresh text/pattern pair for the "New Pattern" button.
export function randomStringInput() {
  return PRESETS[Math.floor(Math.random() * PRESETS.length)];
}

export function generateStringMatchingSteps(input) {
  const { text: TEXT, pattern: PATTERN } =
    input && input.text && input.pattern ? input : PRESETS[0];
  const steps = [];
  const n = TEXT.length, m = PATTERN.length;

  function push(ti, pi, matchedAt, highlights, description, lines) {
    steps.push({ text: TEXT, pattern: PATTERN, ti, pi, matchedAt, highlights: { ...highlights }, description, codeLines: lines });
  }

  push(-1, -1, [], {}, `String Matching (Brute Force): slide pattern "${PATTERN}" over text "${TEXT}". At each position compare char-by-char; advance on match, reset on mismatch. O(n·m) worst case.`, { c: 1, python: 1, javascript: 1 });

  const matchedAt = [];

  for (let i = 0; i <= n - m; i++) {
    push(i, 0, matchedAt, {}, `Window at i=${i}: align pattern with text[${i}..${i + m - 1}] = "${TEXT.slice(i, i + m)}".`, { c: 4, python: 4, javascript: 4 });

    let j = 0;
    while (j < m) {
      const tIdx = i + j;
      const match = TEXT[tIdx] === PATTERN[j];
      push(tIdx, j, matchedAt, { [`t${tIdx}`]: match ? 'match' : 'mismatch', [`p${j}`]: match ? 'match' : 'mismatch' },
        match
          ? `text[${tIdx}]='${TEXT[tIdx]}' == pattern[${j}]='${PATTERN[j]}' ✓`
          : `text[${tIdx}]='${TEXT[tIdx]}' ≠ pattern[${j}]='${PATTERN[j]}' — mismatch, shift window.`,
        { c: match ? 6 : 7, python: match ? 6 : 7, javascript: match ? 6 : 7 }
      );
      if (!match) break;
      j++;
    }

    if (j === m) {
      matchedAt.push(i);
      const h = {};
      for (let k = i; k < i + m; k++) h[`t${k}`] = 'found';
      push(i, m, [...matchedAt], h, `Pattern found at index ${i}! text[${i}..${i + m - 1}] = "${PATTERN}".`, { c: 9, python: 9, javascript: 9 });
    }
  }

  push(-1, -1, matchedAt, {}, `Search complete. Pattern "${PATTERN}" found ${matchedAt.length} time(s) at index/indices: [${matchedAt.join(', ')}].`, { c: 11, python: 11, javascript: 11 });
  return steps;
}
