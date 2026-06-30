import React from 'react';
import PageWithToc from '../components/PageWithToc';
import useDocumentMeta from '../hooks/useDocumentMeta';

const SECTIONS = [
  { id: 'rules', label: 'Big-O Rules' },
  { id: 'time', label: 'Time Complexity' },
  { id: 'space', label: 'Space Complexity' },
  { id: 'growth', label: 'Growth Rates' },
];

const COMMON_ORDERS = [
  { notation: 'O(1)', name: 'Constant', example: 'Array index access, hash lookup' },
  { notation: 'O(log n)', name: 'Logarithmic', example: 'Binary search, balanced BST operations' },
  { notation: 'O(n)', name: 'Linear', example: 'Single loop over n items, linear search' },
  { notation: 'O(n log n)', name: 'Linearithmic', example: 'Merge sort, heap sort, quicksort (avg)' },
  { notation: 'O(n²)', name: 'Quadratic', example: 'Nested loops, bubble / insertion sort' },
  { notation: 'O(n³)', name: 'Cubic', example: 'Triple nested loops, naive matrix multiply' },
  { notation: 'O(2ⁿ)', name: 'Exponential', example: 'Naive recursive Fibonacci, subset enumeration' },
  { notation: 'O(n!)', name: 'Factorial', example: 'Permutations, brute-force TSP' },
];

function CodeBlock({ children }) {
  return <pre className="cg-code">{children}</pre>;
}

export default function ComplexityGuide() {
  useDocumentMeta(
    'Big-O Complexity Guide',
    'Learn to calculate time and space complexity with Big-O notation — rules, worked examples and a growth-rate reference table.'
  );
  return (
    <PageWithToc sections={SECTIONS}>
        <h1 className="cg-h1">Understanding Complexity</h1>
        <p className="cg-lead">
          Complexity analysis describes how an algorithm's running time and memory
          usage grow as the input size <code>n</code> increases. We use{' '}
          <strong>Big-O notation</strong> to capture the dominant growth rate while
          ignoring constants and lower-order terms.
        </p>

        {/* ── Big-O rules ── */}
        <section className="cg-section" id="rules">
          <h2 className="cg-h2">The Core Rules of Big-O</h2>
          <ul className="cg-list">
            <li>
              <strong>Drop constants.</strong> <code>O(2n)</code> becomes{' '}
              <code>O(n)</code>; <code>O(½n²)</code> becomes <code>O(n²)</code>.
              Constants don't affect the growth rate.
            </li>
            <li>
              <strong>Drop lower-order terms.</strong> <code>O(n² + n)</code>{' '}
              becomes <code>O(n²)</code> — for large <code>n</code>, the biggest
              term dominates.
            </li>
            <li>
              <strong>Different inputs, different variables.</strong> Two separate
              arrays of size <code>a</code> and <code>b</code> give{' '}
              <code>O(a + b)</code>, not <code>O(n)</code>.
            </li>
            <li>
              <strong>Sequential steps add; nested steps multiply.</strong> A loop
              after a loop is <code>O(n + n) = O(n)</code>; a loop inside a loop is{' '}
              <code>O(n × n) = O(n²)</code>.
            </li>
          </ul>
        </section>

        {/* ── Time complexity ── */}
        <section className="cg-section" id="time">
          <h2 className="cg-h2">Time Complexity Calculations</h2>
          <p>
            Time complexity counts the number of <em>primitive operations</em> an
            algorithm performs as a function of input size — not seconds on a clock.
            Work through the code structure piece by piece.
          </p>

          <h3 className="cg-h3">1. A single loop → O(n)</h3>
          <p>The body runs once per element, so the cost scales linearly.</p>
          <CodeBlock>{`for (let i = 0; i < n; i++) {
  sum += arr[i];        // runs n times → O(n)
}`}</CodeBlock>

          <h3 className="cg-h3">2. Nested loops → multiply</h3>
          <p>
            The inner loop runs fully for every iteration of the outer loop, so the
            counts multiply.
          </p>
          <CodeBlock>{`for (let i = 0; i < n; i++) {     // n times
  for (let j = 0; j < n; j++) {   // n times each
    console.log(i, j);            // n × n → O(n²)
  }
}`}</CodeBlock>

          <h3 className="cg-h3">3. Halving the input → O(log n)</h3>
          <p>
            When each step discards half the remaining data, only{' '}
            <code>log₂ n</code> steps are needed to finish. This is the signature of
            binary search.
          </p>
          <CodeBlock>{`while (lo <= hi) {
  const mid = (lo + hi) >> 1;
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) lo = mid + 1;  // discard left half
  else hi = mid - 1;                    // discard right half
}                                       // → O(log n)`}</CodeBlock>

          <h3 className="cg-h3">4. Divide and conquer → O(n log n)</h3>
          <p>
            Algorithms like merge sort split the input in half (
            <code>log n</code> levels) and do <code>O(n)</code> work merging at each
            level: <code>n × log n</code>.
          </p>
          <CodeBlock>{`mergeSort(arr):
  split into two halves          // log n levels deep
  recursively sort each half
  merge the two halves           // O(n) work per level
                                 // total → O(n log n)`}</CodeBlock>

          <h3 className="cg-h3">5. Recursion → recurrence relations</h3>
          <p>
            Express the cost as a recurrence and solve it. Merge sort is{' '}
            <code>T(n) = 2T(n/2) + O(n)</code>, which resolves to{' '}
            <code>O(n log n)</code>. Naive recursive Fibonacci is{' '}
            <code>T(n) = T(n-1) + T(n-2) + O(1)</code>, which grows as{' '}
            <code>O(2ⁿ)</code>.
          </p>

          <h3 className="cg-h3">Best, average, and worst case</h3>
          <p>
            The same algorithm can have different complexities depending on the
            input. Quicksort is <code>O(n log n)</code> on average but{' '}
            <code>O(n²)</code> in the worst case (already-sorted input with a poor
            pivot). Big-O usually refers to the <strong>worst case</strong> unless
            stated otherwise.
          </p>
        </section>

        {/* ── Space complexity ── */}
        <section className="cg-section" id="space">
          <h2 className="cg-h2">Space Complexity Calculations</h2>
          <p>
            Space complexity measures the <em>extra</em> memory an algorithm needs
            as input grows — beyond the space taken by the input itself. Count the
            data structures you allocate and the depth of the call stack.
          </p>

          <h3 className="cg-h3">1. Constant extra space → O(1)</h3>
          <p>
            Using a fixed number of variables regardless of input size. In-place
            algorithms like bubble sort fall here.
          </p>
          <CodeBlock>{`let max = arr[0];
for (let i = 1; i < n; i++) {
  if (arr[i] > max) max = arr[i];   // only one extra variable → O(1)
}`}</CodeBlock>

          <h3 className="cg-h3">2. Allocating proportional storage → O(n)</h3>
          <p>
            Building a new array, hash map, or list that scales with the input
            costs linear space.
          </p>
          <CodeBlock>{`const seen = new Set();
for (const x of arr) {
  seen.add(x);            // up to n entries stored → O(n)
}`}</CodeBlock>

          <h3 className="cg-h3">3. The call stack counts too</h3>
          <p>
            Each pending recursive call occupies a stack frame. Recursion depth{' '}
            <strong>is</strong> space usage, even when no arrays are allocated.
          </p>
          <CodeBlock>{`function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);   // n nested frames → O(n) space
}`}</CodeBlock>
          <p>
            Balanced recursion (e.g. binary search done recursively) reaches only{' '}
            <code>O(log n)</code> depth. Merge sort needs <code>O(n)</code> for the
            merge buffers plus <code>O(log n)</code> stack, giving{' '}
            <code>O(n)</code> overall.
          </p>

          <h3 className="cg-h3">In-place vs. out-of-place</h3>
          <p>
            An <strong>in-place</strong> algorithm transforms the input using{' '}
            <code>O(1)</code> auxiliary memory (e.g. heap sort, insertion sort). An{' '}
            <strong>out-of-place</strong> algorithm allocates a separate copy
            (e.g. merge sort's <code>O(n)</code> buffer). There is often a
            trade-off between time and space.
          </p>
        </section>

        {/* ── Reference table ── */}
        <section className="cg-section" id="growth">
          <h2 className="cg-h2">Common Growth Rates</h2>
          <p>From fastest to slowest as <code>n</code> grows:</p>
          <table className="cg-table">
            <thead>
              <tr>
                <th>Notation</th>
                <th>Name</th>
                <th>Typical example</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_ORDERS.map(o => (
                <tr key={o.notation}>
                  <td><code>{o.notation}</code></td>
                  <td>{o.name}</td>
                  <td>{o.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="cg-note">
            Rule of thumb: <code>O(1)</code> &lt; <code>O(log n)</code> &lt;{' '}
            <code>O(n)</code> &lt; <code>O(n log n)</code> &lt; <code>O(n²)</code>{' '}
            &lt; <code>O(2ⁿ)</code> &lt; <code>O(n!)</code>. Anything{' '}
            <code>O(n log n)</code> or better is generally considered efficient.
          </p>
        </section>
    </PageWithToc>
  );
}
