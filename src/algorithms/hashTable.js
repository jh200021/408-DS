const CAPACITY = 7;
const DEFAULT_KEYS = [3, 7, 14, 11, 21, 25, 5]; // shows chaining and distribution

// A fresh set of keys for the "New Keys" button. Duplicates collisions naturally
// since several keys will share a bucket under h(k) = k mod 7.
export function randomHashKeys() {
  const keys = new Set();
  while (keys.size < 7) keys.add(Math.floor(Math.random() * 40) + 1);
  return [...keys];
}

export function generateHashTableSteps(input) {
  const DEMO_KEYS = Array.isArray(input) && input.length ? input : DEFAULT_KEYS;
  const steps = [];
  // table[i] = array of {key,val} (chaining)
  const table = Array.from({ length: CAPACITY }, () => []);

  function push(highlights, key, hashVal, description, lines) {
    steps.push({
      table: table.map(b => [...b]),
      capacity: CAPACITY,
      highlights: { ...highlights },
      currentKey: key,
      currentHash: hashVal,
      description,
      codeLines: lines,
    });
  }

  push({}, null, null, `Hash Table with chaining (capacity = ${CAPACITY}). Hash function: h(k) = k mod ${CAPACITY}.`, { c: 1, python: 1, javascript: 1 });

  // Insert all keys
  for (const key of DEMO_KEYS) {
    const h = key % CAPACITY;
    push({}, key, null, `INSERT(${key}): compute hash h(${key}) = ${key} mod ${CAPACITY} = ${h}`, { c: 6, python: 7, javascript: 7 });
    push({ [h]: 'active' }, key, h, `Hash = ${h}. ${table[h].length ? `Bucket ${h} has ${table[h].length} item(s) already — chain!` : `Bucket ${h} is empty.`}`, { c: 7, python: 8, javascript: 8 });

    table[h].push({ key, val: key * 10 });
    push({ [h]: table[h].length > 1 ? 'collision' : 'new' }, key, h,
      table[h].length > 1
        ? `Collision at bucket ${h}! Prepended ${key} to chain. Chain length = ${table[h].length}.`
        : `Inserted (${key}, ${key * 10}) at bucket ${h}.`,
      { c: 8, python: 9, javascript: 9 }
    );
  }

  // Search for a key that was actually inserted (so the demo ends on a hit).
  const searchKey = DEMO_KEYS[Math.floor(DEMO_KEYS.length / 2)];
  const sh = searchKey % CAPACITY;
  push({}, searchKey, null, `SEARCH(${searchKey}): compute h(${searchKey}) = ${searchKey} mod ${CAPACITY} = ${sh}`, { c: 12, python: 13, javascript: 13 });
  push({ [sh]: 'active' }, searchKey, sh, `Go to bucket ${sh}. Traverse chain…`, { c: 13, python: 14, javascript: 14 });

  for (let i = 0; i < table[sh].length; i++) {
    const node = table[sh][i];
    push({ [sh]: node.key === searchKey ? 'found' : 'active' }, searchKey, sh,
      node.key === searchKey
        ? `Found key ${searchKey} at chain position ${i}! val = ${node.val}.`
        : `Chain[${i}].key = ${node.key} ≠ ${searchKey}. Continue.`,
      { c: 14, python: 15, javascript: 15 }
    );
    if (node.key === searchKey) break;
  }

  push({}, null, null, 'Hash Table demo complete!', { c: 1, python: 1, javascript: 1 });
  return steps;
}
