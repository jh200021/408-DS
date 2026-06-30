// Hash Algorithm — polynomial string hashing into a fixed range.
// Distinct from the Hash Table data structure: this focuses on the hash
// FUNCTION itself (folding a variable-length key into a fixed integer) and
// how a good function distributes keys uniformly across buckets.
const CAPACITY = 8;
const DEFAULT_KEYS = ['cat', 'dog', 'bird', 'fish', 'ant', 'bee', 'owl', 'cow'];
const WORD_POOL = [
  'cat', 'dog', 'bird', 'fish', 'ant', 'bee', 'owl', 'cow', 'fox', 'pig',
  'hen', 'ram', 'bat', 'elk', 'eel', 'jay', 'koi', 'yak', 'asp', 'doe',
];

// A fresh set of distinct words for the "New Keys" button.
export function randomHashWords() {
  const pool = [...WORD_POOL];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 8);
}

export function generateHashAlgorithmSteps(input) {
  const KEYS = Array.isArray(input) && input.length ? input : DEFAULT_KEYS;
  const steps = [];
  const buckets = Array.from({ length: CAPACITY }, () => []);

  function push(state) {
    steps.push({ capacity: CAPACITY, buckets: buckets.map(b => [...b]), ...state });
  }

  push({
    highlights: {}, currentKey: null, charIdx: -1, running: null, bucket: null,
    description: `Hash Algorithm: a hash function maps a key of any size to a fixed-range integer. Here h(s) folds each character with h = (h·31 + code) mod ${CAPACITY}. A good hash spreads keys uniformly.`,
    codeLines: { c: 1, python: 1, javascript: 1 },
  });

  for (const key of KEYS) {
    let h = 0;
    push({
      highlights: {}, currentKey: key, charIdx: -1, running: 0, bucket: null,
      description: `Hash "${key}": start with hash = 0, then fold in each character left to right.`,
      codeLines: { c: 4, python: 3, javascript: 3 },
    });

    for (let i = 0; i < key.length; i++) {
      const code = key.charCodeAt(i);
      h = (h * 31 + code) % CAPACITY;
      push({
        highlights: {}, currentKey: key, charIdx: i, running: h, bucket: null,
        description: `Fold '${key[i]}' (code ${code}): hash = (hash·31 + ${code}) mod ${CAPACITY} = ${h}.`,
        codeLines: { c: 6, python: 5, javascript: 5 },
      });
    }

    buckets[h].push(key);
    push({
      highlights: { [h]: 'new' }, currentKey: key, charIdx: key.length - 1, running: h, bucket: h,
      description: `h("${key}") = ${h}. Place "${key}" into bucket ${h}.` +
        (buckets[h].length > 1 ? ` Bucket ${h} now holds ${buckets[h].length} keys — a collision. Uniform hashing keeps these rare.` : ''),
      codeLines: { c: 9, python: 8, javascript: 8 },
    });
  }

  const loads = buckets.map(b => b.length);
  const max = Math.max(...loads), min = Math.min(...loads);
  push({
    highlights: {}, currentKey: null, charIdx: -1, running: null, bucket: null,
    description: `All ${KEYS.length} keys hashed. Bucket loads = [${loads.join(', ')}], spread = ${max - min} (lower is better — a strong hash distributes keys evenly to avoid clustering).`,
    codeLines: { c: 1, python: 1, javascript: 1 },
  });

  return steps;
}
