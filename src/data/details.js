// Curated, human-readable detail content for each data structure & algorithm,
// keyed by the algorithm `id` used in algorithms.js.
//
// Shape:
//   tagline:    one-line summary
//   howItWorks: array of paragraph strings
//   operations: optional [{ name, complexity, description, code }] (JS snippets)
//   keyPoints:  optional array of strings (characteristics / gotchas)
//   useCases:   optional array of strings

export const details = {
  /* ─── Data Structures ─────────────────────────────────── */
  array: {
    tagline: 'A contiguous, index-addressable block of memory.',
    howItWorks: [
      'An array stores its elements back-to-back in a single contiguous block of memory. Because every element is the same size and they sit next to each other, the address of element i can be computed directly as base + i × elementSize.',
      'That direct address calculation is why reading or writing by index is constant time. The cost shows up on insertion and deletion in the middle: to keep the block contiguous, every later element has to shift over by one slot.',
    ],
    operations: [
      {
        name: 'Create',
        complexity: 'O(n)',
        description: 'Allocate the block and optionally fill it with initial values.',
        code: `let arr = [10, 20, 30, 40];   // literal
let zeros = new Array(5).fill(0); // [0,0,0,0,0]`,
      },
      {
        name: 'Read (access by index)',
        complexity: 'O(1)',
        description: 'Jump straight to a slot using its index — no scanning required.',
        code: `const first = arr[0];   // 10
const third = arr[2];   // 30`,
      },
      {
        name: 'Update',
        complexity: 'O(1)',
        description: 'Overwrite the value at a known index in place.',
        code: `arr[1] = 99;   // [10, 99, 30, 40]`,
      },
      {
        name: 'Insert at position',
        complexity: 'O(n)',
        description: 'Shift every later element one slot to the right to make room.',
        code: `// insert 50 at index 2
arr.splice(2, 0, 50);   // [10, 99, 50, 30, 40]`,
      },
      {
        name: 'Delete at position',
        complexity: 'O(n)',
        description: 'Remove the element and shift every later element one slot left.',
        code: `arr.splice(1, 1);   // remove index 1`,
      },
      {
        name: 'Search (linear)',
        complexity: 'O(n)',
        description: 'Without sorting you must scan element by element.',
        code: `const idx = arr.indexOf(30);   // -1 if absent`,
      },
    ],
    keyPoints: [
      'Random access is O(1) — the array’s superpower.',
      'Size is fixed in low-level languages; JS arrays auto-resize by reallocating.',
      'Insertion/deletion in the middle is O(n) due to shifting.',
    ],
    useCases: [
      'Lookup tables and buffers where indices are known.',
      'Backing store for stacks, queues, heaps, and hash tables.',
      'Any workload dominated by reads rather than middle insertions.',
    ],
  },

  stack: {
    tagline: 'Last-In-First-Out (LIFO) collection.',
    howItWorks: [
      'A stack only lets you touch one end, called the top. The last item pushed on is the first one popped off — like a stack of plates.',
      'Both ends-of-the-line operations (push and pop) happen at the same end, so they are constant time with no shifting.',
    ],
    operations: [
      { name: 'push', complexity: 'O(1)', description: 'Add an item to the top.', code: `stack.push(5);` },
      { name: 'pop', complexity: 'O(1)', description: 'Remove and return the top item.', code: `const top = stack.pop();` },
      { name: 'peek', complexity: 'O(1)', description: 'Look at the top without removing it.', code: `const top = stack[stack.length - 1];` },
      { name: 'isEmpty', complexity: 'O(1)', description: 'Check whether anything is left.', code: `const empty = stack.length === 0;` },
    ],
    keyPoints: ['Only the top is accessible.', 'Backed by an array or a linked list.'],
    useCases: [
      'Function call stacks and recursion.',
      'Undo/redo history.',
      'Expression evaluation and balanced-bracket checking.',
      'Depth-first traversal (the iterative form).',
    ],
  },

  queue: {
    tagline: 'First-In-First-Out (FIFO) collection.',
    howItWorks: [
      'A queue adds at the back (enqueue) and removes from the front (dequeue), exactly like a line at a checkout.',
      'A naive array implementation makes dequeue O(n) because of shifting; real implementations use a circular buffer or a linked list with head/tail pointers to keep both ends O(1).',
    ],
    operations: [
      { name: 'enqueue', complexity: 'O(1)', description: 'Add an item to the back.', code: `queue.push(5);` },
      { name: 'dequeue', complexity: 'O(1)*', description: 'Remove and return the front item.', code: `const front = queue.shift();` },
      { name: 'front', complexity: 'O(1)', description: 'Peek at the front item.', code: `const front = queue[0];` },
      { name: 'isEmpty', complexity: 'O(1)', description: 'Check whether the queue is empty.', code: `const empty = queue.length === 0;` },
    ],
    keyPoints: ['Order is preserved — fairness.', 'Use a circular buffer for O(1) dequeue without shifting.'],
    useCases: [
      'Task scheduling and job queues.',
      'Breadth-first traversal.',
      'Buffering streams and request handling.',
    ],
  },

  'linked-list': {
    tagline: 'A chain of nodes, each pointing to the next.',
    howItWorks: [
      'Instead of one contiguous block, a linked list stores each element in its own node that also holds a pointer to the next node. The list is reached through a head reference.',
      'Because nodes are linked by pointers, inserting or removing at a known node is O(1) — you just rewire pointers. The trade-off is that reaching the i-th node requires walking from the head, so access is O(n).',
    ],
    operations: [
      {
        name: 'Create a node',
        complexity: 'O(1)',
        description: 'A node holds a value and a next pointer.',
        code: `class Node {
  constructor(value) { this.value = value; this.next = null; }
}`,
      },
      {
        name: 'Insert at head',
        complexity: 'O(1)',
        description: 'Point the new node at the old head, then move head.',
        code: `const node = new Node(v);
node.next = head;
head = node;`,
      },
      {
        name: 'Read (traverse to index)',
        complexity: 'O(n)',
        description: 'Walk the chain from the head counting steps.',
        code: `let cur = head;
while (i-- > 0 && cur) cur = cur.next;`,
      },
      {
        name: 'Delete a node',
        complexity: 'O(1)*',
        description: 'Bypass the target by relinking the previous node.',
        code: `prev.next = prev.next.next;`,
      },
    ],
    keyPoints: [
      'No shifting on insert/delete — just pointer rewiring.',
      'No random access; access and search are O(n).',
      'Doubly-linked variants add a prev pointer for backward traversal.',
    ],
    useCases: ['Implementing stacks/queues.', 'Adjacency lists for graphs.', 'When frequent insert/delete outweighs random access.'],
  },

  'hash-table': {
    tagline: 'Key → value storage with near-constant lookup.',
    howItWorks: [
      'A hash table runs each key through a hash function to produce an array index (a “bucket”). The value is stored in that bucket, so lookups jump straight to the right place without scanning.',
      'Two keys can hash to the same bucket — a collision. The classic fix is chaining: each bucket holds a small list of entries. As the table fills, it resizes and rehashes to keep buckets short and operations close to O(1).',
    ],
    operations: [
      { name: 'set / insert', complexity: 'O(1) avg', description: 'Hash the key, store the value in its bucket.', code: `map.set('apple', 3);` },
      { name: 'get / read', complexity: 'O(1) avg', description: 'Hash the key, jump to the bucket, return the value.', code: `const n = map.get('apple');   // 3` },
      { name: 'delete', complexity: 'O(1) avg', description: 'Hash the key and remove the entry from its bucket.', code: `map.delete('apple');` },
      { name: 'has', complexity: 'O(1) avg', description: 'Check whether a key exists.', code: `map.has('apple');   // false` },
    ],
    keyPoints: [
      'Average O(1); worst case O(n) if many keys collide.',
      'A good hash function spreads keys evenly.',
      'Unordered — iteration order is not the insertion order in general.',
    ],
    useCases: ['Caches and memoization.', 'Counting frequencies / de-duplication.', 'Database indexes and symbol tables.'],
  },

  heap: {
    tagline: 'A complete binary tree kept partially ordered for fast min/max.',
    howItWorks: [
      'A (binary) heap is a complete tree where every parent is ≤ its children (min-heap) or ≥ them (max-heap). The root is therefore always the minimum or maximum.',
      'It is stored compactly in an array: for index i the children are at 2i+1 and 2i+2. Insertions “bubble up” and removals “sift down” to restore the heap property, each in O(log n).',
    ],
    operations: [
      { name: 'peek', complexity: 'O(1)', description: 'The root is the min (or max).', code: `const min = heap[0];` },
      {
        name: 'push (sift up)',
        complexity: 'O(log n)',
        description: 'Append at the end, then swap upward until ordered.',
        code: `heap.push(v);
let i = heap.length - 1;
while (i > 0) {
  const p = (i - 1) >> 1;
  if (heap[p] <= heap[i]) break;
  [heap[p], heap[i]] = [heap[i], heap[p]];
  i = p;
}`,
      },
      {
        name: 'pop (sift down)',
        complexity: 'O(log n)',
        description: 'Swap root with last, remove it, then sink the new root.',
        code: `const top = heap[0];
heap[0] = heap.pop();
// ...sift down to restore order`,
      },
    ],
    keyPoints: ['Root access is O(1); insert/remove are O(log n).', 'Array-backed — no pointers needed.', 'Not fully sorted, only heap-ordered.'],
    useCases: ['Priority queues.', 'Heap sort.', 'Scheduling and Dijkstra’s algorithm.'],
  },

  'skip-list': {
    tagline: 'A layered linked list giving O(log n) search probabilistically.',
    howItWorks: [
      'A skip list stacks several sorted linked lists. The bottom level holds every element; each higher level is a sparse “express lane” that skips over many nodes.',
      'Searching starts at the top express lane and drops down a level whenever the next node would overshoot. With levels chosen randomly, this gives expected O(log n) search, insert, and delete — much simpler to implement than a balanced tree.',
    ],
    keyPoints: [
      'Expected O(log n) operations via randomized levels.',
      'Easier to implement and to make concurrent than balanced BSTs.',
      'Uses extra pointers for the express lanes.',
    ],
    useCases: ['Ordered in-memory indexes (e.g. Redis sorted sets).', 'Concurrent ordered maps.'],
  },

  /* ─── Tree ─────────────────────────────────────────────── */
  bst: {
    tagline: 'A binary tree where left < node < right.',
    howItWorks: [
      'In a binary search tree every node’s left subtree holds smaller keys and its right subtree holds larger keys. That invariant lets you discard half the remaining tree at each step, like binary search over a structure.',
      'Operations are O(h) where h is the height. A balanced tree has h ≈ log n; but inserting sorted data degrades it into a linked list with h = n, which is why self-balancing variants (AVL, red-black) exist.',
    ],
    operations: [
      {
        name: 'Search',
        complexity: 'O(h)',
        description: 'Go left if the target is smaller, right if larger.',
        code: `let cur = root;
while (cur && cur.value !== target)
  cur = target < cur.value ? cur.left : cur.right;`,
      },
      {
        name: 'Insert',
        complexity: 'O(h)',
        description: 'Walk down as in search; attach where you fall off the tree.',
        code: `if (target < cur.value) cur.left  ??= new Node(target);
else                     cur.right ??= new Node(target);`,
      },
      {
        name: 'In-order traversal',
        complexity: 'O(n)',
        description: 'Left → node → right visits keys in sorted order.',
        code: `function inorder(n){ if(!n) return;
  inorder(n.left); visit(n.value); inorder(n.right); }`,
      },
    ],
    keyPoints: ['Balanced → O(log n); degenerate → O(n).', 'In-order traversal yields sorted output.'],
    useCases: ['Ordered maps and sets.', 'Range queries.', 'Anything needing sorted, searchable keys.'],
  },

  trie: {
    tagline: 'A prefix tree for strings, keyed character by character.',
    howItWorks: [
      'A trie stores strings along paths from the root: each edge is a character, so words sharing a prefix share the same initial path. A flag marks where a complete word ends.',
      'Lookup and insertion cost O(L) where L is the word length — independent of how many words are stored. The trade-off is memory, since each node may branch to many children.',
    ],
    operations: [
      {
        name: 'Insert',
        complexity: 'O(L)',
        description: 'Walk/create one child per character, then mark the end.',
        code: `let node = root;
for (const ch of word) {
  node.children[ch] ??= {};
  node = node.children[ch];
}
node.isEnd = true;`,
      },
      {
        name: 'Search',
        complexity: 'O(L)',
        description: 'Follow the path; the word exists if isEnd is set.',
        code: `let node = root;
for (const ch of word) {
  if (!node.children[ch]) return false;
  node = node.children[ch];
}
return node.isEnd;`,
      },
      {
        name: 'startsWith (prefix)',
        complexity: 'O(L)',
        description: 'Same walk, but any surviving path counts as a match.',
        code: `// returns true if the prefix path exists`,
      },
    ],
    keyPoints: ['Cost depends on word length, not dictionary size.', 'Excellent for prefix queries.', 'Memory-hungry compared to a hash set.'],
    useCases: ['Autocomplete / typeahead.', 'Spell-checkers.', 'IP routing tables and dictionaries.'],
  },

  /* ─── Graph ────────────────────────────────────────────── */
  graph: {
    tagline: 'Vertices connected by edges, stored as an adjacency list.',
    howItWorks: [
      'A graph models relationships: vertices (nodes) joined by edges. An adjacency list keeps, for each vertex, a list of its neighbors — compact for the sparse graphs common in practice.',
      'Edges may be directed or undirected and may carry weights. The adjacency-list layout makes “who are my neighbors?” fast, which is exactly what traversal algorithms need.',
    ],
    operations: [
      { name: 'Add vertex', complexity: 'O(1)', description: 'Create an empty neighbor list.', code: `adj.set(v, []);` },
      { name: 'Add edge', complexity: 'O(1)', description: 'Append to each endpoint’s list (both ends if undirected).', code: `adj.get(u).push(v);
adj.get(v).push(u);   // undirected` },
      { name: 'Neighbors', complexity: 'O(1)', description: 'Fetch a vertex’s adjacency list.', code: `const ns = adj.get(u);` },
    ],
    keyPoints: ['Adjacency list: O(V+E) space, great for sparse graphs.', 'Adjacency matrix: O(V²) space, O(1) edge lookups.'],
    useCases: ['Social / road / dependency networks.', 'Foundation for BFS, DFS, Dijkstra, MST.'],
  },

  bfs: {
    tagline: 'Breadth-First Search — explore level by level.',
    howItWorks: [
      'BFS explores a graph in rings: first all neighbors of the start, then their neighbors, and so on. A FIFO queue holds the frontier and a visited set prevents revisiting.',
      'Because it expands in order of distance, BFS finds the shortest path in terms of number of edges on unweighted graphs.',
    ],
    operations: [
      {
        name: 'Traversal',
        complexity: 'O(V + E)',
        description: 'Dequeue a node, visit it, enqueue unvisited neighbors.',
        code: `const q = [start]; const seen = new Set([start]);
while (q.length) {
  const u = q.shift(); visit(u);
  for (const v of adj.get(u))
    if (!seen.has(v)) { seen.add(v); q.push(v); }
}`,
      },
    ],
    keyPoints: ['Uses a queue.', 'Shortest path (fewest edges) on unweighted graphs.', 'O(V + E) time, O(V) space.'],
    useCases: ['Shortest path in unweighted graphs.', 'Level-order tree traversal.', 'Finding connected components.'],
  },

  dfs: {
    tagline: 'Depth-First Search — go deep before backtracking.',
    howItWorks: [
      'DFS dives down one path as far as it can, then backtracks and tries the next branch. It’s naturally recursive (or uses an explicit stack) and marks nodes visited to avoid cycles.',
      'It doesn’t find shortest paths, but it’s ideal for exploring structure: cycles, topological order, and connectivity.',
    ],
    operations: [
      {
        name: 'Traversal (recursive)',
        complexity: 'O(V + E)',
        description: 'Visit a node, then recurse into each unvisited neighbor.',
        code: `function dfs(u, seen = new Set()) {
  seen.add(u); visit(u);
  for (const v of adj.get(u))
    if (!seen.has(v)) dfs(v, seen);
}`,
      },
    ],
    keyPoints: ['Uses recursion or an explicit stack.', 'O(V + E) time.', 'Watch recursion depth on large graphs.'],
    useCases: ['Cycle detection.', 'Topological sort.', 'Maze/path generation and backtracking.'],
  },

  dijkstra: {
    tagline: 'Shortest paths from a source on weighted graphs (non-negative).',
    howItWorks: [
      'Dijkstra’s algorithm grows a set of finalized nodes by always expanding the unvisited node with the smallest known distance, pulled from a min-priority queue.',
      'Each time it settles a node it “relaxes” the edges out of it — updating a neighbor’s distance if a shorter route is found. It requires non-negative edge weights.',
    ],
    operations: [
      {
        name: 'Relaxation',
        complexity: 'O((V+E) log V)',
        description: 'If going through u beats v’s current distance, update it.',
        code: `if (dist[u] + w(u, v) < dist[v]) {
  dist[v] = dist[u] + w(u, v);
  pq.push([dist[v], v]);
}`,
      },
    ],
    keyPoints: ['Greedy + priority queue.', 'Fails with negative weights (use Bellman-Ford).', 'O((V+E) log V) with a binary heap.'],
    useCases: ['GPS / routing.', 'Network latency optimization.', 'Any non-negative weighted shortest-path problem.'],
  },

  mst: {
    tagline: 'Minimum Spanning Tree — cheapest way to connect every vertex.',
    howItWorks: [
      'An MST connects all vertices with the smallest possible total edge weight and no cycles. Two classic greedy approaches build it: Prim’s grows one tree by repeatedly adding the cheapest edge leaving it; Kruskal’s sorts all edges and adds the cheapest that doesn’t form a cycle (tracked with union-find).',
      'Both rely on the cut property: the lightest edge crossing any partition of the vertices is safe to include.',
    ],
    keyPoints: ['Greedy; the cut property guarantees correctness.', 'Prim’s: O(E log V). Kruskal’s: O(E log E).', 'Result spans all V vertices with V−1 edges.'],
    useCases: ['Designing minimal-cost networks (cabling, pipelines).', 'Clustering.', 'Approximation for harder problems.'],
  },

  /* ─── Sorting ──────────────────────────────────────────── */
  'bubble-sort': {
    tagline: 'Repeatedly swap adjacent out-of-order pairs.',
    howItWorks: [
      'Bubble sort walks the list comparing each adjacent pair and swapping them if they’re out of order. After each full pass the largest remaining element has “bubbled” to its final spot at the end.',
      'It’s the simplest sort to understand but quadratic, so it’s used mainly for teaching. An early-exit flag makes it O(n) on already-sorted input.',
    ],
    keyPoints: ['Stable, in-place.', 'Best O(n) (already sorted), average/worst O(n²).', 'Educational, not for real workloads.'],
    useCases: ['Teaching the idea of comparison sorting.', 'Tiny or nearly-sorted inputs.'],
  },

  'selection-sort': {
    tagline: 'Repeatedly select the smallest remaining element.',
    howItWorks: [
      'Selection sort scans the unsorted region to find the minimum, then swaps it into the next sorted position. It repeats, growing the sorted prefix one element at a time.',
      'It always does O(n²) comparisons regardless of input, but performs at most n−1 swaps — useful when writes are expensive.',
    ],
    keyPoints: ['In-place; not stable.', 'Always O(n²) comparisons.', 'Minimizes the number of swaps.'],
    useCases: ['When memory writes are costly.', 'Small lists.'],
  },

  'insertion-sort': {
    tagline: 'Build a sorted prefix by inserting each element into place.',
    howItWorks: [
      'Insertion sort takes one element at a time and slides it leftward into its correct spot within the already-sorted prefix, much like sorting a hand of playing cards.',
      'It’s O(n²) in general but O(n) on nearly-sorted data, and its low overhead makes it the go-to for small arrays — many library sorts switch to it for tiny partitions.',
    ],
    keyPoints: ['Stable, in-place, adaptive.', 'Best O(n) on nearly-sorted input.', 'Great for small or partially-sorted arrays.'],
    useCases: ['Small datasets.', 'Nearly-sorted data.', 'Base case inside quicksort/merge sort.'],
  },

  'merge-sort': {
    tagline: 'Divide in half, sort each, merge the results.',
    howItWorks: [
      'Merge sort recursively splits the array in half until pieces are trivially sorted (size 1), then merges sorted halves back together in linear time.',
      'It guarantees O(n log n) in all cases and is stable, but needs O(n) auxiliary space for the merge — the classic time-vs-space trade-off.',
    ],
    keyPoints: ['Stable; guaranteed O(n log n).', 'Needs O(n) extra space.', 'Great for linked lists and external sorting.'],
    useCases: ['Sorting linked lists.', 'External / disk-based sorting.', 'When worst-case guarantees matter.'],
  },

  'quick-sort': {
    tagline: 'Partition around a pivot, then recurse on each side.',
    howItWorks: [
      'Quicksort picks a pivot and partitions the array so smaller elements go left and larger go right; the pivot lands in its final position. It then recurses on each side.',
      'On average it’s O(n log n) and very cache-friendly in-place, but a bad pivot (e.g. on sorted data) degrades to O(n²) — mitigated by randomized or median-of-three pivots.',
    ],
    keyPoints: ['In-place; not stable.', 'Average O(n log n), worst O(n²).', 'Randomize the pivot to avoid worst case.'],
    useCases: ['General-purpose in-memory sorting.', 'The default in many standard libraries (often hybridized).'],
  },

  'heap-sort': {
    tagline: 'Build a heap, then repeatedly extract the max.',
    howItWorks: [
      'Heap sort first builds a max-heap from the array, then repeatedly swaps the root (the maximum) to the end and sifts down to restore the heap over the shrinking front.',
      'It sorts in place with a guaranteed O(n log n) bound, but it isn’t stable and has poorer cache behavior than quicksort.',
    ],
    keyPoints: ['In-place; not stable.', 'Guaranteed O(n log n).', 'Worse cache locality than quicksort.'],
    useCases: ['When O(1) extra space and worst-case guarantees are both required.'],
  },

  'shell-sort': {
    tagline: 'Insertion sort over diminishing gaps.',
    howItWorks: [
      'Shell sort generalizes insertion sort by first sorting elements far apart (a large gap), then shrinking the gap until it’s 1. Early passes move elements long distances cheaply, so the final gap-1 pass has little left to do.',
      'Its complexity depends on the gap sequence, landing somewhere between O(n log² n) and O(n²) — but always in-place with low overhead.',
    ],
    keyPoints: ['In-place; not stable.', 'Performance hinges on the gap sequence.', 'Beats plain insertion sort on medium arrays.'],
    useCases: ['Medium-sized arrays.', 'Embedded systems where code size matters.'],
  },

  'counting-sort': {
    tagline: 'Count occurrences, then rebuild in order — no comparisons.',
    howItWorks: [
      'Counting sort tallies how many times each key appears in a count array, converts those counts to positions, and writes elements directly to their final slots.',
      'It runs in O(n + k) where k is the value range, beating comparison sorts when k is small — but it only works for integer-like keys in a bounded range.',
    ],
    keyPoints: ['Non-comparison; O(n + k) time.', 'Stable.', 'Needs O(k) space; only for bounded integer keys.'],
    useCases: ['Sorting small-range integers.', 'A subroutine inside radix sort.'],
  },

  'radix-sort': {
    tagline: 'Sort by digits, least-significant first.',
    howItWorks: [
      'Radix sort processes keys one digit (or byte) at a time, using a stable sub-sort like counting sort at each position. After processing all digits, the array is fully ordered.',
      'For fixed-width keys it runs in O(d·(n + k)) — effectively linear — sidestepping the comparison-sort lower bound entirely.',
    ],
    keyPoints: ['Non-comparison; ~O(d·(n + k)).', 'Relies on a stable per-digit sort.', 'Best for fixed-width integers/strings.'],
    useCases: ['Sorting large sets of fixed-width integers or strings.'],
  },

  /* ─── Searching ────────────────────────────────────────── */
  'linear-search': {
    tagline: 'Scan elements one by one until found.',
    howItWorks: [
      'Linear search checks each element in turn and stops when it finds the target (or reaches the end). It makes no assumptions about ordering.',
      'It’s O(n) but the only option on unsorted data — and perfectly fine for small lists.',
    ],
    keyPoints: ['Works on unsorted data.', 'O(n) time, O(1) space.', 'Simple and always correct.'],
    useCases: ['Unsorted collections.', 'Small inputs where setup cost isn’t worth it.'],
  },

  'binary-search': {
    tagline: 'Halve a sorted range each step.',
    howItWorks: [
      'Binary search requires sorted data. It compares the target to the middle element and discards the half that can’t contain it, repeating on the remaining half.',
      'Each step halves the search space, giving O(log n). The catch is the precondition: the data must already be sorted.',
    ],
    operations: [
      {
        name: 'Search',
        complexity: 'O(log n)',
        description: 'Pick the midpoint; recurse into the half that may hold the target.',
        code: `let lo = 0, hi = a.length - 1;
while (lo <= hi) {
  const mid = (lo + hi) >> 1;
  if (a[mid] === t) return mid;
  if (a[mid] < t) lo = mid + 1;
  else hi = mid - 1;
}
return -1;`,
      },
    ],
    keyPoints: ['Requires sorted input.', 'O(log n) time, O(1) space (iterative).', 'Mind off-by-one and overflow in mid.'],
    useCases: ['Lookup in sorted arrays.', 'Search-on-answer / parametric search.'],
  },

  /* ─── Algorithms ───────────────────────────────────────── */
  recursion: {
    tagline: 'A function that solves a problem by calling itself on smaller inputs.',
    howItWorks: [
      'A recursive function breaks a problem into smaller instances of the same problem. Two parts are essential: a base case that stops the recursion, and a recursive case that moves toward it.',
      'Each call gets its own stack frame, so recursion depth equals stack space. Deep recursion can overflow the stack — sometimes converted to iteration or optimized via tail calls.',
    ],
    operations: [
      {
        name: 'Pattern',
        complexity: 'varies',
        description: 'Base case + recursive case.',
        code: `function factorial(n) {
  if (n <= 1) return 1;        // base case
  return n * factorial(n - 1); // recursive case
}`,
      },
    ],
    keyPoints: ['Always needs a base case.', 'Stack depth = space cost.', 'Natural fit for trees and divide-and-conquer.'],
    useCases: ['Tree/graph traversal.', 'Divide-and-conquer algorithms.', 'Backtracking and combinatorics.'],
  },

  'hash-algorithm': {
    tagline: 'Map arbitrary input to a fixed-size value.',
    howItWorks: [
      'A hash function deterministically turns input of any size into a fixed-size number or digest. Good hashes spread inputs uniformly and make collisions hard to find.',
      'They power hash tables (for fast lookup) and cryptographic uses (integrity, fingerprints) — though those need different properties.',
    ],
    keyPoints: ['Deterministic and fixed-size output.', 'Uniform distribution minimizes collisions.', 'Cryptographic hashes add collision/preimage resistance.'],
    useCases: ['Hash tables.', 'Checksums and data integrity.', 'Fingerprinting and deduplication.'],
  },

  greedy: {
    tagline: 'Make the locally best choice at each step.',
    howItWorks: [
      'A greedy algorithm builds a solution by always taking the option that looks best right now, never reconsidering. It’s fast and simple.',
      'It only yields the optimum when the problem has the greedy-choice property and optimal substructure (e.g. MST, Huffman coding); otherwise it can be wrong, and DP is needed.',
    ],
    keyPoints: ['Local optimum at each step, no backtracking.', 'Correct only for problems with the greedy-choice property.', 'Usually fast and easy to code.'],
    useCases: ['Huffman coding.', 'Interval scheduling.', 'Dijkstra and MST algorithms.'],
  },

  'divide-conquer': {
    tagline: 'Split, solve recursively, then combine.',
    howItWorks: [
      'Divide-and-conquer breaks a problem into independent subproblems, solves each recursively, and combines their results. Merge sort and quicksort are textbook examples.',
      'Its running time is captured by a recurrence and often solved with the Master Theorem (e.g. T(n) = 2T(n/2) + O(n) → O(n log n)).',
    ],
    keyPoints: ['Three phases: divide, conquer, combine.', 'Analyzed via recurrences / Master Theorem.', 'Often parallelizable.'],
    useCases: ['Merge sort, quicksort.', 'Fast multiplication (Karatsuba, FFT).', 'Closest-pair and many geometry problems.'],
  },

  backtracking: {
    tagline: 'Try a choice, recurse, and undo it if it fails.',
    howItWorks: [
      'Backtracking explores the space of candidate solutions as a tree: it makes a choice, recurses, and if that path can’t lead to a valid solution it undoes the choice (backtracks) and tries another.',
      'Pruning invalid branches early is what makes it tractable, though the worst case is exponential.',
    ],
    operations: [
      {
        name: 'Pattern',
        complexity: 'exponential',
        description: 'Choose → explore → un-choose.',
        code: `function solve(state) {
  if (isGoal(state)) return record(state);
  for (const choice of options(state)) {
    apply(choice);
    if (isValid(state)) solve(state);
    undo(choice);          // backtrack
  }
}`,
      },
    ],
    keyPoints: ['Systematic trial-and-error with undo.', 'Prune early to cut the search tree.', 'Worst case exponential.'],
    useCases: ['N-Queens, Sudoku.', 'Permutations / combinations.', 'Constraint-satisfaction problems.'],
  },

  'dynamic-programming': {
    tagline: 'Solve overlapping subproblems once and reuse the answers.',
    howItWorks: [
      'Dynamic programming applies when a problem has optimal substructure and overlapping subproblems. Instead of recomputing the same subproblem, DP stores each result — top-down with memoization, or bottom-up by filling a table.',
      'This turns exponential recursion (like naive Fibonacci) into polynomial time by trading memory for speed.',
    ],
    operations: [
      {
        name: 'Memoization (top-down)',
        complexity: 'O(n)',
        description: 'Cache results keyed by subproblem.',
        code: `const memo = new Map();
function fib(n) {
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const r = fib(n - 1) + fib(n - 2);
  memo.set(n, r);
  return r;
}`,
      },
      {
        name: 'Tabulation (bottom-up)',
        complexity: 'O(n)',
        description: 'Fill a table from base cases upward.',
        code: `const dp = [0, 1];
for (let i = 2; i <= n; i++)
  dp[i] = dp[i - 1] + dp[i - 2];`,
      },
    ],
    keyPoints: ['Needs optimal substructure + overlapping subproblems.', 'Top-down (memo) vs bottom-up (table).', 'Trades memory for a big speedup.'],
    useCases: ['Knapsack, edit distance, LCS.', 'Shortest paths (Bellman-Ford, Floyd-Warshall).', 'Sequence and grid optimization.'],
  },

  'string-matching': {
    tagline: 'Find occurrences of a pattern inside a text.',
    howItWorks: [
      'The naive approach slides the pattern across the text and compares character by character — O(n·m) in the worst case. Smarter algorithms avoid re-checking characters they’ve already matched.',
      'KMP precomputes a prefix table so it never backtracks in the text, achieving O(n + m). Other approaches (Rabin-Karp, Boyer-Moore) use hashing or skip heuristics.',
    ],
    keyPoints: ['Naive: O(n·m). KMP: O(n + m).', 'KMP uses a prefix/failure table to skip re-comparisons.', 'Boyer-Moore is often fastest in practice.'],
    useCases: ['Search/find in editors.', 'grep and text processing.', 'DNA sequence matching.'],
  },
};
