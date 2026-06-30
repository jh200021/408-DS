const WORDS = ['cat', 'car', 'card', 'care', 'can', 'cap'];

export function generateTrieSteps(_input) {
  const steps = [];
  // Trie stored as flat node array: { id, char, parentId, isEnd, children:{char->id} }
  const nodes = [{ id: 0, char: 'root', parentId: -1, isEnd: false, children: {} }];

  function addStep(highlights, description, lines) {
    steps.push({ trieNodes: nodes.map(n => ({ ...n, children: { ...n.children } })), highlights: { ...highlights }, description, codeLines: lines });
  }

  addStep({}, `Trie (Prefix Tree): each node represents one character. Shared prefixes share nodes. Efficient for string insert / search — O(m) where m = word length.`, { c: 1, python: 1, javascript: 1 });

  // Insert all words
  for (const word of WORDS) {
    addStep({}, `INSERT "${word}": walk/create nodes for each character.`, { c: 5, python: 6, javascript: 6 });

    let cur = 0;
    const path = [0];
    const h = { 0: 'path' };

    for (const ch of word) {
      if (nodes[cur].children[ch] !== undefined) {
        cur = nodes[cur].children[ch];
        path.push(cur);
        h[cur] = 'path';
        addStep({ ...h }, `'${ch}': node already exists (id=${cur}). Follow it.`, { c: 8, python: 9, javascript: 9 });
      } else {
        const newId = nodes.length;
        nodes.push({ id: newId, char: ch, parentId: cur, isEnd: false, children: {} });
        nodes[cur].children[ch] = newId;
        cur = newId;
        path.push(cur);
        h[newId] = 'new';
        addStep({ ...h }, `'${ch}': create new node (id=${newId}).`, { c: 7, python: 7, javascript: 7 });
      }
    }
    nodes[cur].isEnd = true;
    h[cur] = 'end';
    addStep({ ...h }, `Mark node for '${word[word.length - 1]}' as END of word "${word}".`, { c: 11, python: 11, javascript: 11 });
  }

  // Search
  const searchWord = 'card';
  addStep({}, `SEARCH "${searchWord}": traverse from root, one char at a time.`, { c: 15, python: 15, javascript: 15 });
  let cur = 0;
  let found = true;
  for (const ch of searchWord) {
    if (nodes[cur].children[ch] !== undefined) {
      cur = nodes[cur].children[ch];
      addStep({ [cur]: 'searching' }, `'${ch}': found child node (id=${cur}). Continue.`, { c: 17, python: 17, javascript: 17 });
    } else {
      addStep({ [cur]: 'miss' }, `'${ch}': no child node. "${searchWord}" not in trie.`, { c: 18, python: 18, javascript: 18 });
      found = false;
      break;
    }
  }
  if (found) {
    addStep({ [cur]: nodes[cur].isEnd ? 'found' : 'miss' },
      nodes[cur].isEnd ? `"${searchWord}" found! Node is marked as word end.` : `Prefix "${searchWord}" exists but is not a complete word.`,
      { c: 19, python: 19, javascript: 19 });
  }

  addStep({}, 'Trie demo complete!', { c: 1, python: 1, javascript: 1 });
  return steps;
}
