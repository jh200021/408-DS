const PRESETS = [
  { text: 'ABABDABACDABABCABAB', pattern: 'ABABCABAB' },
  { text: 'AABAACAADAABAABA', pattern: 'AABA' },
  { text: 'ABCABCDABABCDABCDABDE', pattern: 'ABCDABD' },
  { text: 'AAAAABAAABA', pattern: 'AAAA' },
];

export function randomKMPInput() {
  return PRESETS[Math.floor(Math.random() * PRESETS.length)];
}

export function generateKMPSteps(input) {
  const { text: TEXT, pattern: PATTERN } =
    input && input.text && input.pattern ? input : PRESETS[0];
  const steps = [];
  const next = Array(PATTERN.length + 1).fill('');
  const matchedAt = [];

  function tableSnapshot() {
    return next.slice(1).map(value => (value === '' ? '' : value));
  }

  function push(i, j, nextIndex, highlights, description, lines, phase = 'search') {
    steps.push({
      text: TEXT,
      pattern: PATTERN,
      ti: i > 0 ? i - 1 : -1,
      pi: j > 0 ? j - 1 : -1,
      lps: tableSnapshot(),
      lpsIndex: nextIndex > 0 ? nextIndex - 1 : -1,
      matchedAt: [...matchedAt],
      highlights: { ...highlights },
      description,
      codeLines: lines,
      phase,
      displayBase: 1,
      tableName: 'next',
    });
  }

  push(
    -1,
    -1,
    -1,
    {},
    `KMP textbook version: build next[] with get_next(T, next), then run Index_KMP(S, T, next). Indices i and j start at 1; j == 0 means the pattern restarts.`,
    { c: 1, python: 1, javascript: 1 },
    'build'
  );

  next[1] = 0;
  push(
    -1,
    1,
    1,
    { p0: 'found' },
    `get_next: initialize next[1] = 0.`,
    { c: 3, python: 14, javascript: 14 },
    'build'
  );

  let i = 1;
  let j = 0;
  while (i < PATTERN.length) {
    const highlights = {};
    if (i > 0) highlights[`p${i - 1}`] = 'match';
    if (j > 0) highlights[`p${j - 1}`] = PATTERN[i - 1] === PATTERN[j - 1] ? 'match' : 'mismatch';

    push(
      -1,
      j > 0 ? j : i,
      i,
      highlights,
      j === 0
        ? `get_next: j == 0, so execute ++i; ++j and set next[i] = j.`
        : `get_next: compare T.ch[${i}]='${PATTERN[i - 1]}' with T.ch[${j}]='${PATTERN[j - 1]}'.`,
      { c: 5, python: 16, javascript: 16 },
      'build'
    );

    if (j === 0 || PATTERN[i - 1] === PATTERN[j - 1]) {
      i++;
      j++;
      next[i] = j;
      push(
        -1,
        j,
        i,
        { [`p${i - 1}`]: 'found', ...(j > 0 ? { [`p${j - 1}`]: 'match' } : {}) },
        `After ++i and ++j: i=${i}, j=${j}, so next[${i}] = ${j}.`,
        { c: 8, python: 18, javascript: 18 },
        'build'
      );
    } else {
      const oldJ = j;
      j = next[j];
      push(
        -1,
        oldJ,
        oldJ,
        { [`p${i - 1}`]: 'mismatch', [`p${oldJ - 1}`]: 'mismatch' },
        `Mismatch in get_next: set j = next[${oldJ}] = ${j}.`,
        { c: 10, python: 20, javascript: 20 },
        'build'
      );
    }
  }

  push(
    1,
    1,
    -1,
    {},
    `next[] complete: [${tableSnapshot().join(', ')}]. Now Index_KMP starts with i=1 and j=1.`,
    { c: 14, python: 2, javascript: 2 }
  );

  i = 1;
  j = 1;
  while (i <= TEXT.length && j <= PATTERN.length) {
    const isRestart = j === 0;
    const match = !isRestart && TEXT[i - 1] === PATTERN[j - 1];
    const highlights = {};
    if (!isRestart) {
      highlights[`t${i - 1}`] = match ? 'match' : 'mismatch';
      highlights[`p${j - 1}`] = match ? 'match' : 'mismatch';
    }

    push(
      i,
      j,
      j,
      highlights,
      isRestart
        ? `Index_KMP: j == 0, so execute ++i; ++j.`
        : `Index_KMP: compare S.ch[${i}]='${TEXT[i - 1]}' with T.ch[${j}]='${PATTERN[j - 1]}'.`,
      { c: 17, python: 4, javascript: 4 }
    );

    if (j === 0 || TEXT[i - 1] === PATTERN[j - 1]) {
      i++;
      j++;
      push(
        i <= TEXT.length ? i : TEXT.length,
        j <= PATTERN.length ? j : PATTERN.length,
        -1,
        {},
        `Characters accepted: i=${i}, j=${j}.`,
        { c: 19, python: 6, javascript: 6 }
      );
    } else {
      const oldJ = j;
      j = next[j];
      push(
        i,
        oldJ,
        oldJ,
        { [`t${i - 1}`]: 'mismatch', [`p${oldJ - 1}`]: 'mismatch' },
        `Mismatch: set j = next[${oldJ}] = ${j}; i stays ${i}.`,
        { c: 22, python: 8, javascript: 8 }
      );
    }
  }

  if (j > PATTERN.length) {
    const result = i - PATTERN.length;
    matchedAt.push(result);
    const start = result - 1;
    const h = {};
    for (let k = start; k < start + PATTERN.length; k++) h[`t${k}`] = 'found';
    for (let k = 0; k < PATTERN.length; k++) h[`p${k}`] = 'found';
    push(
      i - 1,
      PATTERN.length,
      -1,
      h,
      `j > T.length, so return i - T.length = ${i} - ${PATTERN.length} = ${result}. This is the 1-based match position.`,
      { c: 26, python: 11, javascript: 11 }
    );
  } else {
    push(
      -1,
      -1,
      -1,
      {},
      `i > S.length before the pattern matched, so return 0.`,
      { c: 28, python: 13, javascript: 13 }
    );
  }

  return steps;
}
