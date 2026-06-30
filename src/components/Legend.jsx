import React from 'react';

const LEGENDS = {
  'bubble-sort': [
    { color: '#4f86f7', label: 'Unsorted' },
    { color: '#f59e0b', label: 'Comparing' },
    { color: '#ef4444', label: 'Swapping' },
    { color: '#059669', label: 'Sorted' },
  ],
  'selection-sort': [
    { color: '#4f86f7', label: 'Unsorted' },
    { color: '#f97316', label: 'Min Found' },
    { color: '#f59e0b', label: 'Comparing' },
    { color: '#ef4444', label: 'Swapping' },
    { color: '#059669', label: 'Sorted' },
  ],
  'insertion-sort': [
    { color: '#4f86f7', label: 'Unsorted' },
    { color: '#8b5cf6', label: 'Key Element' },
    { color: '#f59e0b', label: 'Shifting' },
    { color: '#059669', label: 'Sorted' },
  ],
  'merge-sort': [
    { color: '#4f86f7', label: 'Unsorted' },
    { color: '#60a5fa', label: 'Left Part' },
    { color: '#8b5cf6', label: 'Right Part' },
    { color: '#34d399', label: 'Placed' },
    { color: '#059669', label: 'Sorted' },
  ],
  'quick-sort': [
    { color: '#4f86f7', label: 'Unsorted' },
    { color: '#f97316', label: 'Pivot' },
    { color: '#60a5fa', label: '≤ Pivot' },
    { color: '#f59e0b', label: 'Comparing' },
    { color: '#ef4444', label: 'Swapping' },
    { color: '#059669', label: 'Sorted' },
  ],
  'heap-sort': [
    { color: '#4f86f7', label: 'Unsorted' },
    { color: '#60a5fa', label: 'Sift Root' },
    { color: '#f59e0b', label: 'Comparing' },
    { color: '#ef4444', label: 'Swapping' },
    { color: '#059669', label: 'Sorted' },
  ],
  'shell-sort': [
    { color: '#4f86f7', label: 'Unsorted' },
    { color: '#8b5cf6', label: 'Key Element' },
    { color: '#f59e0b', label: 'Comparing / Shifting' },
    { color: '#059669', label: 'Sorted' },
  ],
  'counting-sort': [
    { color: '#4f86f7', label: 'Unsorted' },
    { color: '#f59e0b', label: 'Tallying' },
    { color: '#ef4444', label: 'Placing' },
    { color: '#059669', label: 'Sorted' },
  ],
  'radix-sort': [
    { color: '#4f86f7', label: 'Unsorted' },
    { color: '#f59e0b', label: 'Current Digit' },
    { color: '#059669', label: 'Sorted' },
  ],
  'bucket-sort': [
    { color: '#4f86f7', label: 'Unsorted' },
    { color: '#f59e0b', label: 'Scattering' },
    { color: '#ef4444', label: 'Gathering' },
    { color: '#059669', label: 'Sorted' },
  ],
  'linear-search': [
    { color: '#93c5fd', label: 'Unchecked' },
    { color: '#fbbf24', label: 'Checking' },
    { color: '#d1d5db', label: 'Eliminated' },
    { color: '#059669', label: 'Found' },
  ],
  'binary-search': [
    { color: '#93c5fd', label: 'Unchecked' },
    { color: '#6ee7b7', label: 'Search Range' },
    { color: '#fbbf24', label: 'Mid Element' },
    { color: '#d1d5db', label: 'Eliminated' },
    { color: '#059669', label: 'Found' },
  ],
  'jump-search': [
    { color: '#93c5fd', label: 'Unchecked' },
    { color: '#fbbf24', label: 'Probing' },
    { color: '#d1d5db', label: 'Eliminated' },
    { color: '#059669', label: 'Found' },
  ],
  'interpolation-search': [
    { color: '#93c5fd', label: 'Unchecked' },
    { color: '#6ee7b7', label: 'Search Range' },
    { color: '#fbbf24', label: 'Probe Position' },
    { color: '#d1d5db', label: 'Eliminated' },
    { color: '#059669', label: 'Found' },
  ],
};

export default function Legend({ algorithmId }) {
  const DS_LEGEND = [
    { color: '#93c5fd', label: 'Element' },
    { color: '#059669', label: 'Inserted / Pushed' },
    { color: '#ef4444', label: 'Removed / Popped' },
  ];
  const LL_LEGEND = [
    { color: '#93c5fd', label: 'Node' },
    { color: '#059669', label: 'Inserted' },
    { color: '#f59e0b', label: 'Traversing' },
    { color: '#fb923c', label: 'Comparing' },
    { color: '#ef4444', label: 'Deleting' },
  ];
  const BST_LEGEND = [
    { color: '#93c5fd', label: 'Node' },
    { color: '#86efac', label: 'Path' },
    { color: '#f59e0b', label: 'Comparing' },
    { color: '#059669', label: 'Inserted / Found' },
  ];
  const GRAPH_LEGEND = [
    { color: '#d1d5db', label: 'Unvisited' },
    { color: '#f59e0b', label: 'In Queue / Stack' },
    { color: '#059669', label: 'Current' },
    { color: '#34d399', label: 'Visited' },
  ];

  const overrides = {
    'stack': DS_LEGEND,
    'queue': DS_LEGEND,
    'linked-list': LL_LEGEND,
    'bst': BST_LEGEND,
    'bfs': GRAPH_LEGEND,
    'dfs': GRAPH_LEGEND,
    'dijkstra': [
      { color: '#d1d5db', label: 'Unvisited' },
      { color: '#f59e0b', label: 'Relaxing Edge' },
      { color: '#059669', label: 'Current' },
      { color: '#34d399', label: 'Finalised' },
    ],
    'mst': [
      { color: '#d1d5db', label: 'Not in MST' },
      { color: '#f59e0b', label: 'Considering' },
      { color: '#059669', label: 'MST Edge' },
      { color: '#fca5a5', label: 'Cycle (skip)' },
    ],
    'prim-mst': [
      { color: '#d1d5db', label: 'Outside Tree' },
      { color: '#60a5fa', label: 'Frontier Edge' },
      { color: '#f59e0b', label: 'Chosen Edge' },
      { color: '#059669', label: 'In Tree' },
    ],
    'bellman-ford': [
      { color: '#d1d5db', label: 'Unvisited' },
      { color: '#f59e0b', label: 'Relaxing Edge' },
      { color: '#059669', label: 'Source' },
      { color: '#34d399', label: 'Reached' },
    ],
    'array': [
      { color: '#93c5fd', label: 'Element' },
      { color: '#8b5cf6', label: 'Accessing' },
      { color: '#f59e0b', label: 'Searching / Shifting' },
      { color: '#059669', label: 'Found / Inserted' },
      { color: '#ef4444', label: 'Removing' },
    ],
    'hash-table': [
      { color: '#e5e7eb', label: 'Empty Bucket' },
      { color: '#f59e0b', label: 'Hashing' },
      { color: '#fb923c', label: 'Collision' },
      { color: '#059669', label: 'Inserted / Found' },
    ],
    'heap': [
      { color: '#93c5fd', label: 'Node' },
      { color: '#f59e0b', label: 'Comparing' },
      { color: '#ef4444', label: 'Swapping' },
      { color: '#059669', label: 'Settled' },
    ],
    'skip-list': [
      { color: '#93c5fd', label: 'Node' },
      { color: '#f59e0b', label: 'Visiting' },
      { color: '#059669', label: 'Found' },
      { color: '#ef4444', label: 'Not Found' },
    ],
    'trie': [
      { color: '#93c5fd', label: 'Node' },
      { color: '#f59e0b', label: 'Path' },
      { color: '#059669', label: 'New / Found' },
      { color: '#2563eb', label: 'Word End' },
      { color: '#ef4444', label: 'Miss' },
    ],
    'graph': [
      { color: '#34d399', label: 'Vertex' },
      { color: '#059669', label: 'Adding' },
      { color: '#f59e0b', label: 'New Edge' },
    ],
    'recursion': [
      { color: '#d1d5db', label: 'Pending' },
      { color: '#f59e0b', label: 'Calling' },
      { color: '#60a5fa', label: 'Used by Parent' },
      { color: '#059669', label: 'Returned' },
    ],
    'hash-algorithm': [
      { color: '#f59e0b', label: 'Current Char' },
      { color: '#059669', label: 'Placed in Bucket' },
    ],
    'greedy': [
      { color: '#93c5fd', label: 'Coin' },
      { color: '#f59e0b', label: 'Trying' },
      { color: '#059669', label: 'Selected' },
      { color: '#34d399', label: 'Done' },
    ],
    'divide-conquer': [
      { color: '#60a5fa', label: 'Left Half' },
      { color: '#8b5cf6', label: 'Right Half' },
      { color: '#f59e0b', label: 'Crossing' },
      { color: '#059669', label: 'Best / Result' },
    ],
    'backtracking': [
      { color: '#f59e0b', label: 'Trying' },
      { color: '#059669', label: 'Placed' },
      { color: '#ef4444', label: 'Conflict' },
      { color: '#d97706', label: 'Backtrack' },
    ],
    'dynamic-programming': [
      { color: '#fb923c', label: 'Base Case' },
      { color: '#60a5fa', label: 'Reading' },
      { color: '#f59e0b', label: 'Computing' },
      { color: '#059669', label: 'Filled' },
    ],
    'string-matching': [
      { color: '#93c5fd', label: 'Character' },
      { color: '#059669', label: 'Match' },
      { color: '#ef4444', label: 'Mismatch' },
    ],
    kmp: [
      { color: '#93c5fd', label: 'Character' },
      { color: '#f59e0b', label: 'next[] Cell' },
      { color: '#059669', label: 'Match' },
      { color: '#ef4444', label: 'Mismatch' },
    ],
  };

  const items = overrides[algorithmId] ?? LEGENDS[algorithmId] ?? LEGENDS['bubble-sort'];
  return (
    <div className="legend">
      {items.map((item, i) => (
        <div key={i} className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: item.color }} />
          <span className="legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
