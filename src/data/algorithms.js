import { generateBubbleSortSteps } from '../algorithms/bubbleSort';
import { generateSelectionSortSteps } from '../algorithms/selectionSort';
import { generateInsertionSortSteps } from '../algorithms/insertionSort';
import { generateMergeSortSteps } from '../algorithms/mergeSort';
import { generateQuickSortSteps } from '../algorithms/quickSort';
import { generateHeapSortSteps } from '../algorithms/heapSort';
import { generateShellSortSteps } from '../algorithms/shellSort';
import { generateCountingSortSteps } from '../algorithms/countingSort';
import { generateRadixSortSteps } from '../algorithms/radixSort';
import { generateLinearSearchSteps } from '../algorithms/linearSearch';
import { generateBinarySearchSteps } from '../algorithms/binarySearch';
import { generateStackSteps } from '../algorithms/stack';
import { generateQueueSteps } from '../algorithms/queue';
import { generateLinkedListSteps } from '../algorithms/linkedList';
import { generateBSTSteps } from '../algorithms/bst';
import { generateBFSSteps } from '../algorithms/bfs';
import { generateDFSSteps } from '../algorithms/dfs';
import { generateArraySteps } from '../algorithms/array';
import { generateHashTableSteps, randomHashKeys } from '../algorithms/hashTable';
import { generateHeapSteps } from '../algorithms/heap';
import { generateSkipListSteps, randomSkipTarget } from '../algorithms/skipList';
import { generateTrieSteps } from '../algorithms/trie';
import { generateGraphDSSteps } from '../algorithms/graphDS';
import { generateRecursionSteps, randomRecursionN } from '../algorithms/recursion';
import { generateHashAlgorithmSteps, randomHashWords } from '../algorithms/hashAlgorithm';
import { generateGreedySteps, randomGreedyAmount } from '../algorithms/greedy';
import { generateDivideConquerSteps, randomSubarrayInput } from '../algorithms/divideConquer';
import { generateBacktrackingSteps, randomQueensN } from '../algorithms/backtracking';
import { generateDynamicProgrammingSteps, randomDPN } from '../algorithms/dynamicProgramming';
import { generateStringMatchingSteps, randomStringInput } from '../algorithms/stringMatching';
import { generateKMPSteps, randomKMPInput } from '../algorithms/kmp';
import { generateDijkstraSteps } from '../algorithms/dijkstra';
import { generateMSTSteps } from '../algorithms/mst';
import { generateBucketSortSteps } from '../algorithms/bucketSort';
import { generateJumpSearchSteps } from '../algorithms/jumpSearch';
import { generateInterpolationSearchSteps } from '../algorithms/interpolationSearch';
import { generatePrimSteps } from '../algorithms/prim';
import { generateBellmanFordSteps } from '../algorithms/bellmanFord';

export const algorithms = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    type: 'sorting',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Repeatedly compares adjacent elements and swaps them if out of order. Each pass "bubbles" the largest unsorted element to its correct position.',
    generateSteps: generateBubbleSortSteps,
    code: {
      c: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    // array is now sorted
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
      javascript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
    },
  },

  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'Sorting',
    type: 'sorting',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Divides the array into sorted and unsorted portions. Repeatedly selects the minimum element from the unsorted portion and places it at the end of the sorted portion.',
    generateSteps: generateSelectionSortSteps,
    code: {
      c: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        if (min_idx != i) {
            int temp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = temp;
        }
    }
}`,
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      javascript: `function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
}`,
    },
  },

  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'Sorting',
    type: 'sorting',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Builds the sorted array one element at a time. Picks each element and inserts it into its correct position within the already-sorted portion.',
    generateSteps: generateInsertionSortSteps,
    code: {
      c: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    // array is now sorted
}`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      javascript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
    },
  },

  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    type: 'sorting',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    description: 'Divide-and-conquer algorithm. Recursively divides the array into halves, sorts each half, then merges the sorted halves back together.',
    generateSteps: generateMergeSortSteps,
    code: {
      c: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int left[n1], right[n2];
    for (int i = 0; i < n1; i++)
        left[i] = arr[l + i];
    for (int j = 0; j < n2; j++)
        right[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (left[i] <= right[j])
            arr[k++] = left[i++];
        else
            arr[k++] = right[j++];
    }
    while (i < n1) arr[k++] = left[i++];
    while (j < n2) arr[k++] = right[j++];
}
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      javascript: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    return result.concat(left.slice(i), right.slice(j));
}`,
    },
  },

  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    type: 'sorting',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    description: 'Selects a pivot element and partitions the array so elements ≤ pivot are left and elements > pivot are right. Recursively sorts sub-arrays.',
    generateSteps: generateQuickSortSteps,
    code: {
      c: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1`,
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
    },
  },

  {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'Sorting',
    type: 'sorting',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)',
    description: 'Builds a max-heap so the largest element sits at the root, then repeatedly swaps the root to the end of the array and re-heapifies the shrinking heap. Sorts in place.',
    generateSteps: generateHeapSortSteps,
    code: {
      c: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int tmp = arr[i];
        arr[i] = arr[largest]; arr[largest] = tmp;
        heapify(arr, n, largest);
    }
}
void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)   // build max-heap
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int tmp = arr[0];
        arr[0] = arr[i]; arr[i] = tmp;     // move max to end
        heapify(arr, i, 0);                // restore heap
    }
}`,
      python: `def heapify(arr, n, i):
    largest = i
    l, r = 2 * i + 1, 2 * i + 2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):   # build max-heap
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]    # move max to end
        heapify(arr, i, 0)                 # restore heap
    return arr`,
      javascript: `function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)  // build max-heap
        heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];          // move max to end
        heapify(arr, i, 0);                           // restore heap
    }
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}`,
    },
  },

  {
    id: 'shell-sort',
    name: 'Shell Sort',
    category: 'Sorting',
    type: 'sorting',
    timeComplexity: { best: 'O(n log n)', average: 'O(n^1.5)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'A generalization of insertion sort that first sorts elements far apart (a "gap"), then progressively reduces the gap. Early long-distance moves leave the array nearly sorted for the final gap-1 pass.',
    generateSteps: generateShellSortSteps,
    code: {
      c: `void shellSort(int arr[], int n) {
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];
            arr[j] = temp;
        }
    }
}`,
      python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`,
      javascript: `function shellSort(arr) {
    const n = arr.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
    return arr;
}`,
    },
  },

  {
    id: 'counting-sort',
    name: 'Counting Sort',
    category: 'Sorting',
    type: 'sorting',
    timeComplexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)' },
    spaceComplexity: 'O(n + k)',
    description: 'A non-comparison sort for integers in a small range [0, k]. Counts how many times each value occurs, then writes the values back in order. Linear time when k = O(n).',
    generateSteps: generateCountingSortSteps,
    code: {
      c: `void countingSort(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > max) max = arr[i];
    int count[max + 1];
    for (int i = 0; i <= max; i++) count[i] = 0;
    for (int i = 0; i < n; i++) count[arr[i]]++;   // tally
    int idx = 0;
    for (int v = 0; v <= max; v++)                 // rebuild
        while (count[v]-- > 0) arr[idx++] = v;
}`,
      python: `def counting_sort(arr):
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for x in arr:
        count[x] += 1            # tally
    i = 0
    for v in range(max_val + 1): # rebuild in order
        while count[v] > 0:
            arr[i] = v; i += 1
            count[v] -= 1
    return arr`,
      javascript: `function countingSort(arr) {
    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);
    for (const x of arr) count[x]++;        // tally
    let i = 0;
    for (let v = 0; v <= max; v++)          // rebuild in order
        while (count[v]-- > 0) arr[i++] = v;
    return arr;
}`,
    },
  },

  {
    id: 'radix-sort',
    name: 'Radix Sort',
    category: 'Sorting',
    type: 'sorting',
    timeComplexity: { best: 'O(d·(n + b))', average: 'O(d·(n + b))', worst: 'O(d·(n + b))' },
    spaceComplexity: 'O(n + b)',
    description: 'Sorts integers digit by digit from the least-significant digit, using a stable counting sort for each digit. d is the number of digits and b the base (here 10).',
    generateSteps: generateRadixSortSteps,
    code: {
      c: `int getMax(int a[], int n) {
    int m = a[0];
    for (int i = 1; i < n; i++) if (a[i] > m) m = a[i];
    return m;
}
void radixSort(int a[], int n) {
    int max = getMax(a, n);
    for (int exp = 1; max / exp > 0; exp *= 10) {
        int out[n], count[10] = {0};
        for (int i = 0; i < n; i++) count[(a[i]/exp)%10]++;
        for (int d = 1; d < 10; d++) count[d] += count[d-1];
        for (int i = n - 1; i >= 0; i--)
            out[--count[(a[i]/exp)%10]] = a[i];
        for (int i = 0; i < n; i++) a[i] = out[i];  // copy back
    }
}`,
      python: `def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        output = [0] * len(arr)
        count = [0] * 10
        for x in arr:
            count[(x // exp) % 10] += 1
        for d in range(1, 10):
            count[d] += count[d - 1]
        for i in range(len(arr) - 1, -1, -1):
            digit = (arr[i] // exp) % 10
            count[digit] -= 1
            output[count[digit]] = arr[i]
        arr = output            # copy back
        exp *= 10
    return arr`,
      javascript: `function radixSort(arr) {
    const max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        const output = new Array(arr.length);
        const count = new Array(10).fill(0);
        for (const x of arr) count[Math.floor(x / exp) % 10]++;
        for (let d = 1; d < 10; d++) count[d] += count[d - 1];
        for (let i = arr.length - 1; i >= 0; i--) {
            const d = Math.floor(arr[i] / exp) % 10;
            output[--count[d]] = arr[i];
        }
        for (let i = 0; i < arr.length; i++) arr[i] = output[i];
    }
    return arr;
}`,
    },
  },

  {
    id: 'bucket-sort',
    name: 'Bucket Sort',
    category: 'Sorting',
    type: 'sorting',
    timeComplexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n²)' },
    spaceComplexity: 'O(n + k)',
    description: 'Distributes values into a number of buckets by range, sorts each bucket, then concatenates them in order. Fast when the input is spread uniformly across its range.',
    generateSteps: generateBucketSortSteps,
    code: {
      c: `void bucketSort(int arr[], int n) {
    int k = (int)sqrt(n);
    Bucket b[k];
    for (int i = 0; i < k; i++) b[i].count = 0;
    int lo = minOf(arr, n), hi = maxOf(arr, n);
    double size = (hi - lo + 1.0) / k;
    for (int i = 0; i < n; i++)                 // scatter
        bucketAdd(&b[(int)((arr[i]-lo)/size)], arr[i]);
    int idx = 0;
    for (int j = 0; j < k; j++) {               // gather
        sortBucket(&b[j]);
        for (int t = 0; t < b[j].count; t++)
            arr[idx++] = b[j].items[t];
    }
}`,
      python: `def bucket_sort(arr):
    k = max(1, int(len(arr) ** 0.5))
    lo, hi = min(arr), max(arr)
    size = (hi - lo + 1) / k
    buckets = [[] for _ in range(k)]
    for x in arr:                       # scatter
        buckets[min(k - 1, int((x - lo) / size))].append(x)
    out = []
    for b in buckets:                   # gather
        b.sort()
        out.extend(b)
    return out`,
      javascript: `function bucketSort(arr) {
    const k = Math.max(1, Math.floor(Math.sqrt(arr.length)));
    const lo = Math.min(...arr), hi = Math.max(...arr);
    const size = (hi - lo + 1) / k;
    const buckets = Array.from({ length: k }, () => []);
    for (const x of arr) {                       // scatter
        const b = Math.min(k - 1, Math.floor((x - lo) / size));
        buckets[b].push(x);
    }
    let idx = 0;
    for (const bucket of buckets) {              // gather
        bucket.sort((a, c) => a - c);
        for (const v of bucket) arr[idx++] = v;
    }
    return arr;
}`,
    },
  },

  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'Searching',
    type: 'searching',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    description: 'Sequentially checks each element in the array until the target is found or the array is exhausted. Works on unsorted arrays.',
    generateSteps: generateLinearSearchSteps,
    code: {
      c: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
      python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
      javascript: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}`,
    },
  },

  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    type: 'searching',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    description: 'Efficiently searches a sorted array by repeatedly halving the search range. Compares the target with the middle element to decide which half to search.',
    generateSteps: generateBinarySearchSteps,
    code: {
      c: `int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}`,
      python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      javascript: `function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] === target)
            return mid;
        else if (arr[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}`,
    },
  },

  {
    id: 'jump-search',
    name: 'Jump Search',
    category: 'Searching',
    type: 'searching',
    timeComplexity: { best: 'O(1)', average: 'O(√n)', worst: 'O(√n)' },
    spaceComplexity: 'O(1)',
    description: 'Works on a sorted array by jumping ahead in fixed blocks of ⌊√n⌋ until it passes the target, then scanning the previous block linearly. A middle ground between linear and binary search.',
    generateSteps: generateJumpSearchSteps,
    code: {
      c: `int jumpSearch(int arr[], int n, int target) {
    int step = (int)sqrt(n);
    int prev = 0;
    int curr = step;
    // jump ahead in blocks
    while (curr < n && arr[curr - 1] < target) {
        prev = curr;
        curr += step;
    }
    if (curr > n) curr = n;
    for (int i = prev; i < curr; i++) {
        if (arr[i] == target)
            return i;
        if (arr[i] > target) break;
    }
    return -1;
}`,
      python: `def jump_search(arr, target):
    n = len(arr)
    step = int(n ** 0.5)
    prev, curr = 0, step
    while curr < n and arr[curr - 1] < target:
        prev = curr
        curr += step
    curr = min(curr, n)
    for i in range(prev, curr):
        if arr[i] == target:
            return i
        if arr[i] > target:
            return -1
    return -1`,
      javascript: `function jumpSearch(arr, target) {
    const n = arr.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0, curr = step;
    // jump ahead in blocks
    while (curr < n && arr[curr - 1] < target) {
        prev = curr;
        curr += step;
    }
    curr = Math.min(curr, n);
    for (let i = prev; i < curr; i++) {
        // linear scan inside the block
        if (arr[i] === target)
            return i;
        if (arr[i] > target) break;
    }
    return -1;
}`,
    },
  },

  {
    id: 'interpolation-search',
    name: 'Interpolation Search',
    category: 'Searching',
    type: 'searching',
    timeComplexity: { best: 'O(1)', average: 'O(log log n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    description: 'Improves on binary search for uniformly distributed sorted data by estimating the target\'s position from its value instead of always probing the middle.',
    generateSteps: generateInterpolationSearchSteps,
    code: {
      c: `int interpolationSearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high &&
           target >= arr[low] && target <= arr[high]) {
        int denom = arr[high] - arr[low];
        int pos = low + ((long)(target - arr[low]) * (high - low)) / (denom ? denom : 1);
        if (arr[pos] == target)
            return pos;
        else if (arr[pos] < target)
            low = pos + 1;
        else
            high = pos - 1;
    }
    return -1;
}`,
      python: `def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high and arr[low] <= target <= arr[high]:
        denom = arr[high] - arr[low]
        pos = low + (target - arr[low]) * (high - low) // (denom or 1)
        if arr[pos] == target:
            return pos
        elif arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    return -1`,
      javascript: `function interpolationSearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high && target >= arr[low]
           && target <= arr[high]) {
        const pos = low +
            Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
        if (arr[pos] === target)
            return pos;
        else if (arr[pos] < target)
            low = pos + 1;
        else
            high = pos - 1;
    }
    // value lies outside the sampled range
    return -1;
}`,
    },
  },

  // ─── Data Structures ───────────────────────────────────

  {
    id: 'stack',
    name: 'Stack',
    category: 'Data Structures',
    type: 'stack',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(n)',
    description: 'LIFO structure — push adds to the top, pop removes from the top. Used in function call stacks, undo operations, expression evaluation.',
    generateSteps: generateStackSteps,
    code: {
      c: `#define MAX 100
int stack[MAX];
int top = -1;

void push(int val) {
    if (top < MAX - 1)
        stack[++top] = val;
}

int pop() {
    if (top < 0) return -1;
    return stack[top--];
}

int peek() {
    return top >= 0 ? stack[top] : -1;
}

int isEmpty() { return top == -1; }`,
      python: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, val):
        self.items.append(val)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None

    def peek(self):
        return self.items[-1] if self.items else None

    def is_empty(self):
        return len(self.items) == 0`,
      javascript: `class Stack {
    constructor() { this.items = []; }

    push(val) {
        this.items.push(val);
    }

    pop() {
        if (!this.isEmpty()) return this.items.pop();
        return null;
    }

    peek() {
        return this.isEmpty()
            ? null : this.items[this.items.length - 1];
    }

    isEmpty() { return this.items.length === 0; }
}`,
    },
  },

  {
    id: 'queue',
    name: 'Queue',
    category: 'Data Structures',
    type: 'queue',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(n)',
    description: 'FIFO structure — enqueue adds to the rear, dequeue removes from the front. Used in scheduling, BFS, print spoolers.',
    generateSteps: generateQueueSteps,
    code: {
      c: `#define MAX 100
int queue[MAX];
int front = 0, rear = -1;

void enqueue(int val) {
    if (rear < MAX - 1)
        queue[++rear] = val;
}

int dequeue() {
    if (front > rear) return -1;
    return queue[front++];
}

int peek() {
    return front <= rear ? queue[front] : -1;
}

int isEmpty() { return front > rear; }`,
      python: `from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, val):
        self.items.append(val)

    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
        return None

    def peek(self):
        return self.items[0] if self.items else None

    def is_empty(self):
        return len(self.items) == 0`,
      javascript: `class Queue {
    constructor() { this.items = []; }

    enqueue(val) {
        this.items.push(val);
    }

    dequeue() {
        return this.isEmpty() ? null : this.items.shift();
    }

    peek() {
        return this.isEmpty() ? null : this.items[0];
    }

    isEmpty() { return this.items.length === 0; }
}`,
    },
  },

  {
    id: 'linked-list',
    name: 'Linked List',
    category: 'Data Structures',
    type: 'linked-list',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    description: 'A chain of nodes where each node stores a value and a pointer to the next node. Supports O(1) head insertion and efficient splicing without shifting.',
    generateSteps: generateLinkedListSteps,
    code: {
      c: `struct Node { int data; struct Node* next; };

Node* create(int v) {
    Node* n = malloc(sizeof(Node));
    n->data = v; n->next = NULL;
    return n;
}

// Insert at head — O(1)
void insertHead(Node** head, int v) {
    Node* n = create(v);
    n->next = *head;
    *head = n;
}

// Insert at tail — O(n)
void insertTail(Node** head, int v) {
    Node* n = create(v);
    if (!*head) { *head = n; return; }
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    cur->next = n;
}

// Traverse — O(n)
void traverse(Node* head) {
    Node* cur = head;
    while (cur) {
        printf("%d ", cur->data);
        cur = cur->next;
    }
}

// Delete by value — O(n)
void delete(Node** head, int v) {
    if (!*head) return;
    if ((*head)->data == v) { *head = (*head)->next; return; }
    Node* cur = *head;
    while (cur->next && cur->next->data != v)
        cur = cur->next;
    if (cur->next)
        cur->next = cur->next->next;
}`,
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self): self.head = None

    # Insert at head — O(1)
    def insert_head(self, val):
        node = Node(val)
        node.next = self.head
        self.head = node

    # Insert at tail — O(n)
    def insert_tail(self, val):
        node = Node(val)
        if not self.head:
            self.head = node; return
        cur = self.head
        while cur.next: cur = cur.next
        cur.next = node

    # Traverse — O(n)
    def traverse(self):
        cur = self.head
        while cur:
            print(cur.data, end=' ')
            cur = cur.next

    # Delete by value — O(n)
    def delete(self, val):
        if not self.head: return
        if self.head.data == val:
            self.head = self.head.next; return
        cur = self.head
        while cur.next and cur.next.data != val:
            cur = cur.next
        if cur.next:
            cur.next = cur.next.next`,
      javascript: `class Node {
    constructor(data) { this.data = data; this.next = null; }
}

class LinkedList {
    constructor() { this.head = null; }

    // Insert at head — O(1)
    insertHead(val) {
        const node = new Node(val);
        node.next = this.head;
        this.head = node;
    }

    // Insert at tail — O(n)
    insertTail(val) {
        const node = new Node(val);
        if (!this.head) { this.head = node; return; }
        let cur = this.head;
        while (cur.next) cur = cur.next;
        cur.next = node;
    }

    // Traverse — O(n)
    traverse() {
        let cur = this.head;
        while (cur) {
            process.stdout.write(cur.data + ' ');
            cur = cur.next;
        }
    }

    // Delete by value — O(n)
    delete(val) {
        if (!this.head) return;
        if (this.head.data === val) {
            this.head = this.head.next; return;
        }
        let cur = this.head;
        while (cur.next && cur.next.data !== val)
            cur = cur.next;
        if (cur.next) cur.next = cur.next.next;
    }
}`,
    },
  },

  // ─── Tree ──────────────────────────────────────────────

  {
    id: 'bst',
    name: 'Binary Search Tree',
    category: 'Tree',
    type: 'tree',
    timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    description: 'A binary tree where every left-subtree value is smaller and every right-subtree value is larger than the node. Supports efficient insert and search.',
    generateSteps: generateBSTSteps,
    code: {
      c: `typedef struct Node {
    int val;
    struct Node *left, *right;
} Node;

Node* newNode(int val) {
    Node* n = malloc(sizeof(Node));
    n->val = val;
    n->left = n->right = NULL;
    return n;
}

Node* insert(Node* root, int val) {
    if (!root) return newNode(val);
    if (val < root->val)
        root->left = insert(root->left, val);
    else if (val > root->val)
        root->right = insert(root->right, val);
    return root;
}

Node* search(Node* root, int val) {
    if (!root || root->val == val)
        return root;
    if (val < root->val)
        return search(root->left, val);
    return search(root->right, val);
}`,
      python: `class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def insert(root, val):
    if root is None:
        return Node(val)
    if val < root.val:
        root.left = insert(root.left, val)
    elif val > root.val:
        root.right = insert(root.right, val)
    return root

def search(root, val):
    if root is None or root.val == val:
        return root
    if val < root.val:
        return search(root.left, val)
    return search(root.right, val)`,
      javascript: `class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function insert(root, val) {
    if (!root) return new Node(val);
    if (val < root.val)
        root.left = insert(root.left, val);
    else if (val > root.val)
        root.right = insert(root.right, val);
    return root;
}

function search(root, val) {
    if (!root || root.val === val) return root;
    if (val < root.val)
        return search(root.left, val);
    return search(root.right, val);
}`,
    },
  },

  // ─── Graph ─────────────────────────────────────────────

  {
    id: 'bfs',
    name: 'BFS',
    category: 'Graph',
    type: 'graph',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    description: 'Breadth-First Search visits nodes level by level using a queue. Guarantees the shortest path in unweighted graphs.',
    generateSteps: generateBFSSteps,
    code: {
      c: `// graph[v] = adjacency list, visited[] tracks state
void bfs(int graph[][MAX], int start, int n) {
    int visited[MAX] = {0};
    int queue[MAX], front = 0, rear = -1;
    visited[start] = 1;
    queue[++rear] = start;
    while (front <= rear) {
        int v = queue[front++];
        printf("%d ", v);
        for (int i = 0; i < n; i++) {
            if (graph[v][i] && !visited[i]) {
                visited[i] = 1;
                queue[++rear] = i;
            }
        }
    }
}`,
      python: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    order = []
    while queue:
        vertex = queue.popleft()
        order.append(vertex)
        for nb in graph[vertex]:
            if nb not in visited:
                visited.add(nb)
                queue.append(nb)
    return order`,
      javascript: `function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    const order = [];
    while (queue.length > 0) {
        const v = queue.shift();
        order.push(v);
        for (const nb of graph[v]) {
            if (!visited.has(nb)) {
                visited.add(nb);
                queue.push(nb);
            }
        }
    }
    return order;
}`,
    },
  },

  {
    id: 'dfs',
    name: 'DFS',
    category: 'Graph',
    type: 'graph',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    description: 'Depth-First Search explores as deep as possible along each branch before backtracking. Used for cycle detection, topological sort, and pathfinding.',
    generateSteps: generateDFSSteps,
    code: {
      c: `int visited[MAX] = {0};

void dfs(int graph[][MAX], int v, int n) {
    visited[v] = 1;
    printf("%d ", v);
    for (int i = 0; i < n; i++) {
        if (graph[v][i] && !visited[i])
            dfs(graph, i, n);
    }
}`,
      python: `def dfs(graph, start, visited=None):
    if visited is None: visited = set()
    visited.add(start)
    order = [start]
    for nb in graph[start]:
        if nb not in visited:
            order += dfs(graph, nb, visited)
    return order`,
      javascript: `function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    const order = [start];
    for (const nb of graph[start]) {
        if (!visited.has(nb))
            order.push(...dfs(graph, nb, visited));
    }
    return order;
}`,
    },
  },

  {
    id: 'dijkstra',
    name: "Dijkstra's Shortest Path",
    category: 'Graph',
    type: 'weighted-graph',
    timeComplexity: { best: 'O(V²)', average: 'O(V²)', worst: 'O(V²)' },
    spaceComplexity: 'O(V)',
    description: "Finds the shortest distance from a source to every vertex in a weighted graph with non-negative edges. Repeatedly finalises the closest unvisited vertex and relaxes its edges. (O((V+E) log V) with a priority queue.)",
    generateSteps: generateDijkstraSteps,
    code: {
      c: `void dijkstra(int graph[V][V], int src) {
    int dist[V]; bool visited[V] = { false };
    for (int i = 0; i < V; i++) dist[i] = INT_MAX;
    dist[src] = 0;
    for (int c = 0; c < V; c++) {
        int u = -1;
        for (int v = 0; v < V; v++)            // smallest unvisited
            if (!visited[v] && (u == -1 || dist[v] < dist[u])) u = v;
        visited[u] = true;
        for (int v = 0; v < V; v++)            // relax edges
            if (graph[u][v] && !visited[v] &&
                dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }
}`,
      python: `def dijkstra(graph, src):
    dist = {v: float('inf') for v in graph}
    visited = set()
    dist[src] = 0
    while len(visited) < len(graph):
        u = min((v for v in graph if v not in visited),
                key=lambda v: dist[v])
        visited.add(u)
        for nb, w in graph[u]:           # relax edges
            if dist[u] + w < dist[nb]:
                dist[nb] = dist[u] + w
    return dist`,
      javascript: `function dijkstra(graph, src) {
    const dist = {}, visited = new Set();
    for (const v in graph) dist[v] = Infinity;
    dist[src] = 0;
    while (visited.size < Object.keys(graph).length) {
        let u = -1;
        for (const v in graph)               // smallest unvisited
            if (!visited.has(v) && (u === -1 || dist[v] < dist[u])) u = v;
        visited.add(u);
        for (const [nb, w] of graph[u])      // relax edges
            if (dist[u] + w < dist[nb])
                dist[nb] = dist[u] + w;
    }
    return dist;
}`,
    },
  },

  {
    id: 'bellman-ford',
    name: 'Bellman-Ford',
    category: 'Graph',
    type: 'weighted-graph',
    timeComplexity: { best: 'O(E)', average: 'O(V·E)', worst: 'O(V·E)' },
    spaceComplexity: 'O(V)',
    description: 'Finds shortest paths from a source and, unlike Dijkstra, tolerates negative-weight edges. It relaxes every edge up to V−1 times; one more successful relaxation would reveal a negative cycle.',
    generateSteps: generateBellmanFordSteps,
    code: {
      c: `void bellmanFord(Edge edges[], int m, int V, int src) {
    int dist[V];
    for (int i = 0; i < V; i++) dist[i] = INT_MAX;
    dist[src] = 0;
    for (int pass = 1; pass < V; pass++) {       // V-1 passes
        bool changed = false;
        for (int i = 0; i < m; i++) {            // relax every edge
            int u = edges[i].u, v = edges[i].v, w = edges[i].w;
            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                changed = true;
            }
        }
        if (!changed) break;
    }
}`,
      python: `def bellman_ford(edges, V, src):
    dist = [float('inf')] * V
    dist[src] = 0
    for _ in range(V - 1):           # V-1 passes
        changed = False
        for u, v, w in edges:        # relax every edge
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                changed = True
        if not changed:
            break
    return dist`,
      javascript: `function bellmanFord(edges, V, src) {
    const dist = Array(V).fill(Infinity);
    dist[src] = 0;
    for (let pass = 1; pass < V; pass++) {   // V-1 passes
        let changed = false;
        for (const [u, v, w] of edges) {     // relax every edge
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                changed = true;
            }
        }
        if (!changed) break;
    }
    return dist;
}`,
    },
  },

  {
    id: 'mst',
    name: "Minimum Spanning Tree",
    category: 'Graph',
    type: 'weighted-graph',
    timeComplexity: { best: 'O(E log E)', average: 'O(E log E)', worst: 'O(E log E)' },
    spaceComplexity: 'O(V)',
    description: "Kruskal's algorithm connects all vertices with the minimum total edge weight and no cycles. It sorts edges by weight and adds each one unless it would join two vertices already connected (detected with union-find).",
    generateSteps: generateMSTSteps,
    code: {
      c: `int find(int parent[], int x) {
    return parent[x] == x ? x : (parent[x] = find(parent, parent[x]));
}
// edges[] sorted by weight, n vertices, m edges
void kruskal(Edge edges[], int m, int n) {
    sortByWeight(edges, m);
    int parent[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int i = 0; i < m; i++) {
        int ru = find(parent, edges[i].u);
        int rv = find(parent, edges[i].v);
        if (ru != rv) {              // different components
            parent[ru] = rv;         // union
            addToMST(edges[i]);
        }
    }
}`,
      python: `def kruskal(n, edges):
    edges.sort(key=lambda e: e[2])      # by weight
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    mst = []
    for u, v, w in edges:
        ru, rv = find(u), find(v)
        if ru != rv:                    # no cycle
            parent[ru] = rv             # union
            mst.append((u, v, w))
    return mst`,
      javascript: `function kruskalMST(n, edges) {
    edges.sort((a, b) => a[2] - b[2]);      // by weight
    const parent = Array.from({ length: n }, (_, i) => i);
    const find = x => parent[x] === x ? x : (parent[x] = find(parent[x]));
    const mst = [];
    for (const [u, v, w] of edges) {
        const ru = find(u), rv = find(v);
        if (ru !== rv) {                    // no cycle
            parent[ru] = rv;                // union
            mst.push([u, v, w]);
        }
    }
    return mst;
}`,
    },
  },

  {
    id: 'prim-mst',
    name: "Prim's MST",
    category: 'Graph',
    type: 'weighted-graph',
    timeComplexity: { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)' },
    spaceComplexity: 'O(V)',
    description: "Prim's algorithm builds a Minimum Spanning Tree by growing a single tree from a start vertex, each round adding the cheapest edge that connects the tree to a new vertex. (O(E log V) with a binary heap.)",
    generateSteps: generatePrimSteps,
    code: {
      c: `// Prim's MST on an adjacency matrix
int prim(int graph[V][V]) {
    int key[V], parent[V];
    bool inMST[V] = { false };
    for (int i = 0; i < V; i++) key[i] = INT_MAX;
    key[0] = 0; parent[0] = -1;
    int total = 0;
    inMST[0] = true;                       // start node
    for (int c = 0; c < V - 1; c++) {
        int u = minKey(key, inMST);
        for (int v = 0; v < V; v++)        // edges leaving the tree
            if (graph[u][v] && !inMST[v]
                && graph[u][v] < key[v]) {
                parent[v] = u;             // cheapest crossing edge
                key[v] = graph[u][v];
            }
        inMST[u] = true;
    }
    return total;
}`,
      python: `import heapq

def prim(adj, start):
    in_tree, mst, total = {start}, [], 0
    pq = [(w, start, v) for v, w in adj[start]]
    heapq.heapify(pq)
    while pq:                              # edges leaving the tree
        w, u, v = heapq.heappop(pq)
        if v not in in_tree:               # cheapest crossing edge
            in_tree.add(v)                 # bring v into the tree
            mst.append((u, v, w)); total += w
            for x, wx in adj[v]:
                heapq.heappush(pq, (wx, v, x))
    return mst`,
      javascript: `function prim(graph, start) {
    const inTree = new Set();
    const mst = [];
    inTree.add(start);                     // start node
    while (inTree.size < graph.nodes.length) {
        let best = null;
        for (const u of inTree)
            for (const [v, w] of graph.adj[u])   // edges leaving tree
                if (!inTree.has(v) && (!best || w < best[2]))
                    best = [u, v, w];
        const [u, v, w] = best;            // cheapest crossing edge
        inTree.add(v);                     // bring v into the tree
        mst.push([u, v, w]);
    }
    return mst;
}`,
    },
  },

  // ─── Data Structures (cont.) ───────────────────────────

  {
    id: 'array',
    name: 'Array',
    category: 'Data Structures',
    type: 'array',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    description: 'Contiguous, index-addressable memory. Access by index is O(1); insertion and deletion are O(n) because elements must shift to keep the block contiguous.',
    generateSteps: generateArraySteps,
    code: {
      c: `// Array: contiguous, index-addressable memory
int arr[N];

// Access by index — O(1)
int x = arr[i];

// Insert v at index p — O(n)
void insertAt(int arr[], int *n, int p, int v) {
    for (int k = *n; k > p; k--)
        arr[k] = arr[k - 1];   // shift right
    arr[p] = v; (*n)++;
}
// Delete at index p — O(n)
void deleteAt(int arr[], int *n, int p) {
    for (int k = p; k < *n - 1; k++)
        arr[k] = arr[k + 1];   // shift left
    (*n)--;
}
int search(int arr[], int n, int t) {
    for (int i = 0; i < n; i++)
        if (arr[i] == t) return i;
    return -1;
}`,
      python: `# List — Python's dynamic array
arr = []

# Access by index — O(1)
x = arr[i]

# Insert v at index p — O(n)
def insert_at(arr, p, v):
    arr.append(0)
    for k in range(len(arr) - 1, p, -1):
        arr[k] = arr[k - 1]    # shift right
    arr[p] = v
# Delete at index p — O(n)
def delete_at(arr, p):
    for k in range(p, len(arr) - 1):
        arr[k] = arr[k + 1]    # shift left
    arr.pop()
def search(arr, t):            # linear — O(n)
    for i in range(len(arr)):
        if arr[i] == t: return i
    return -1`,
      javascript: `// Array: contiguous, index-addressable storage
let arr = [];

// Access by index — O(1)
const x = arr[i];

// Insert v at index p — O(n)
function insertAt(arr, p, v) {
    for (let k = arr.length; k > p; k--)
        arr[k] = arr[k - 1];   // shift right
    arr[p] = v;
}
// Delete at index p — O(n)
function deleteAt(arr, p) {
    for (let k = p; k < arr.length - 1; k++)
        arr[k] = arr[k + 1];   // shift left
    arr.pop();
}
function search(arr, t) {       // linear — O(n)
    for (let i = 0; i < arr.length; i++)
        if (arr[i] === t) return i;
    return -1;
}`,
    },
  },

  {
    id: 'hash-table',
    name: 'Hash Table',
    category: 'Data Structures',
    type: 'hash-table',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    description: 'Maps keys to bucket indices via a hash function. Collisions are resolved here by chaining (a linked list per bucket). Average O(1) insert and lookup.',
    generateSteps: generateHashTableSteps,
    regenerate: { label: 'New Keys', makeInput: randomHashKeys },
    code: {
      c: `#define CAP 7
typedef struct N { int key, val; struct N* next; } N;
N* table[CAP];

int hash(int k) { return k % CAP; }

void insert(int key, int val) {
    int h = hash(key);
    N* n = malloc(sizeof(N));
    n->key = key; n->val = val;
    n->next = table[h];   // prepend (chaining)
    table[h] = n;
}
N* search(int key) {
    int h = hash(key);
    for (N* n = table[h]; n; n = n->next)
        if (n->key == key) return n;
    return NULL;
}`,
      python: `CAP = 7
table = [[] for _ in range(CAP)]

def hash_fn(k):
    return k % CAP

def insert(key, val):
    h = hash_fn(key)
    table[h].append((key, val))   # chaining

def search(key):
    h = hash_fn(key)
    for k, v in table[h]:
        if k == key:
            return v
    return None`,
      javascript: `const CAP = 7;
const table = Array.from({ length: CAP }, () => []);

function hash(k) {
    return k % CAP;
}

function insert(key, val) {
    const h = hash(key);
    table[h].push({ key, val });   // chaining
}
function search(key) {
    const h = hash(key);
    for (const e of table[h])
        if (e.key === key) return e.val;
    return null;
}`,
    },
  },

  {
    id: 'heap',
    name: 'Heap',
    category: 'Data Structures',
    type: 'heap',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(n)',
    description: 'A complete binary tree stored as an array where every node ≤ its children (min-heap). The root is always the minimum. Insert bubbles up; extract-min bubbles down.',
    generateSteps: generateHeapSteps,
    code: {
      c: `int heap[MAX], size = 0;

void insert(int v) {
    heap[size] = v;            // append
    int i = size++;
    while (i > 0 && heap[(i-1)/2] > heap[i]) {
        swap(&heap[i], &heap[(i-1)/2]);   // bubble up
        i = (i - 1) / 2;
    }
}
int extractMin() {
    int min = heap[0];
    heap[0] = heap[--size];    // move last to root
    int i = 0;
    while (1) {
        int l = 2*i+1, r = 2*i+2, s = i;
        if (l < size && heap[l] < heap[s]) s = l;
        if (r < size && heap[r] < heap[s]) s = r;
        if (s == i) break;
        swap(&heap[i], &heap[s]); i = s;   // bubble down
    }
    return min;
}`,
      python: `import heapq

heap = []

# insert — O(log n): append then sift up
def insert(v):
    heap.append(v)
    i = len(heap) - 1
    while i > 0 and heap[(i-1)//2] > heap[i]:
        heap[i], heap[(i-1)//2] = heap[(i-1)//2], heap[i]
        i = (i - 1) // 2

def extract_min():
    heap[0], heap[-1] = heap[-1], heap[0]
    m = heap.pop()
    i, n = 0, len(heap)
    while True:
        l, r, s = 2*i+1, 2*i+2, i
        if l < n and heap[l] < heap[s]: s = l
        if r < n and heap[r] < heap[s]: s = r
        if s == i: break
        heap[i], heap[s] = heap[s], heap[i]; i = s
    return m`,
      javascript: `const heap = [];

// insert — O(log n): append then bubble up
function insert(v) {
    heap.push(v);
    let i = heap.length - 1;
    while (i > 0 && heap[(i-1)>>1] > heap[i]) {
        [heap[i], heap[(i-1)>>1]] = [heap[(i-1)>>1], heap[i]];
        i = (i - 1) >> 1;
    }
}
function extractMin() {
    const min = heap[0];
    heap[0] = heap.pop();      // move last to root
    let i = 0, n = heap.length;
    while (true) {
        let l = 2*i+1, r = 2*i+2, s = i;
        if (l < n && heap[l] < heap[s]) s = l;
        if (r < n && heap[r] < heap[s]) s = r;
        if (s === i) break;
        [heap[i], heap[s]] = [heap[s], heap[i]]; i = s;
    }
    return min;
}`,
    },
  },

  {
    id: 'skip-list',
    name: 'Skip List',
    category: 'Data Structures',
    type: 'skip-list',
    timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    description: 'A layered, ordered linked list. Upper levels act as express lanes that skip many nodes, giving O(log n) average search — a simpler alternative to balanced trees.',
    generateSteps: generateSkipListSteps,
    regenerate: { label: 'New Target', makeInput: randomSkipTarget },
    code: {
      c: `// node has an array of forward pointers (one per level)
typedef struct Node {
    int val;
    struct Node** forward;  // forward[level]
} Node;

Node* search(SkipList* list, int target) {
    Node* x = list->head;
    for (int lv = list->level; lv >= 0; lv--) {
        while (x->forward[lv] &&
               x->forward[lv]->val <= target)
            x = x->forward[lv];   // move right
        // else drop down a level
    }
    return x->val == target ? x : NULL;
}`,
      python: `# Each node keeps a list of forward refs, one per level
class Node:
    def __init__(self, val, level):
        self.val = val
        self.forward = [None] * (level + 1)

def search(self, target):
    x = self.head
    for lv in range(self.level, -1, -1):
        while x.forward[lv] and x.forward[lv].val <= target:
            x = x.forward[lv]        # move right
        # otherwise drop down one level
    return x if x and x.val == target else None`,
      javascript: `// Each node holds forward pointers, one per level
class Node {
    constructor(val, level) {
        this.val = val;
        this.forward = new Array(level + 1).fill(null);
    }
}
function search(list, target) {
    let x = list.head;
    for (let lv = list.level; lv >= 0; lv--) {
        while (x.forward[lv] && x.forward[lv].val <= target)
            x = x.forward[lv];       // move right
        // else drop down a level
    }
    return x && x.val === target ? x : null;
}`,
    },
  },

  // ─── Tree (cont.) ──────────────────────────────────────

  {
    id: 'trie',
    name: 'Trie (Prefix Tree)',
    category: 'Tree',
    type: 'trie',
    timeComplexity: { best: 'O(m)', average: 'O(m)', worst: 'O(m)' },
    spaceComplexity: 'O(ALPHABET·N)',
    description: 'A tree where each node is one character and shared prefixes share nodes. Insert and search a word of length m in O(m). Used for autocomplete and dictionaries.',
    generateSteps: generateTrieSteps,
    code: {
      c: `typedef struct Trie {
    struct Trie* children[26];
    int isEnd;
} Trie;

void insert(Trie* root, const char* word) {
    Trie* cur = root;
    for (int i = 0; word[i]; i++) {
        int c = word[i] - 'a';
        if (!cur->children[c])
            cur->children[c] = calloc(1, sizeof(Trie));
        cur = cur->children[c];
    }
    cur->isEnd = 1;
}
int search(Trie* root, const char* word) {
    Trie* cur = root;
    for (int i = 0; word[i]; i++) {
        int c = word[i] - 'a';
        if (!cur->children[c]) return 0;
        cur = cur->children[c];
    }
    return cur->isEnd;
}`,
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

def insert(root, word):
    cur = root
    for ch in word:
        if ch not in cur.children:
            cur.children[ch] = TrieNode()
        cur = cur.children[ch]
    cur.is_end = True

def search(root, word):
    cur = root
    for ch in word:
        if ch not in cur.children:
            return False
        cur = cur.children[ch]
    return cur.is_end`,
      javascript: `class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}
function insert(root, word) {
    let cur = root;
    for (const ch of word) {
        if (!cur.children[ch])
            cur.children[ch] = new TrieNode();
        cur = cur.children[ch];
    }
    cur.isEnd = true;
}
function search(root, word) {
    let cur = root;
    for (const ch of word) {
        if (!cur.children[ch]) return false;
        cur = cur.children[ch];
    }
    return cur.isEnd;
}`,
    },
  },

  // ─── Graph (cont.) ─────────────────────────────────────

  {
    id: 'graph',
    name: 'Graph (Adjacency List)',
    category: 'Graph',
    type: 'graph-ds',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(degree)' },
    spaceComplexity: 'O(V+E)',
    description: 'A set of vertices and edges. An adjacency list stores, per vertex, its neighbours — O(V+E) space and efficient neighbour iteration. The basis for BFS/DFS.',
    generateSteps: generateGraphDSSteps,
    code: {
      c: `#define V 7
// adjacency list: array of linked lists
Node* adj[V];

void addVertex(int v) { adj[v] = NULL; }

void addEdge(int a, int b) {
    push(&adj[a], b);   // b is a neighbour of a
    push(&adj[b], a);   // undirected
}`,
      python: `# adjacency list as dict of lists
adj = {}

def add_vertex(v):
    adj[v] = []

def add_edge(a, b):
    adj[a].append(b)   # b is a neighbour of a
    adj[b].append(a)   # undirected`,
      javascript: `// adjacency list as a Map of arrays
const adj = new Map();

function addVertex(v) {
    adj.set(v, []);
}

function addEdge(a, b) {
    adj.get(a).push(b);   // b is a neighbour of a
    adj.get(b).push(a);   // undirected
}`,
    },
  },

  // ─── Algorithms ────────────────────────────────────────

  {
    id: 'recursion',
    name: 'Recursion',
    category: 'Algorithms',
    type: 'recursion',
    timeComplexity: { best: 'O(2ⁿ)', average: 'O(2ⁿ)', worst: 'O(2ⁿ)' },
    spaceComplexity: 'O(n)',
    description: 'A function that solves a problem by calling itself on smaller sub-problems until a base case. Shown via the Fibonacci call tree — note the overlapping sub-problems.',
    generateSteps: generateRecursionSteps,
    regenerate: { label: 'New N', makeInput: randomRecursionN },
    code: {
      c: `int fib(int n) {
    if (n <= 1) return n;          // base case
    return fib(n - 1) + fib(n - 2);  // recurse
}`,
      python: `def fib(n):
    if n <= 1:
        return n              # base case
    return fib(n-1) + fib(n-2)   # recurse`,
      javascript: `function fib(n) {
    if (n <= 1) return n;            // base case
    return fib(n - 1) + fib(n - 2);  // recurse
}`,
    },
  },

  {
    id: 'hash-algorithm',
    name: 'Hash Algorithm',
    category: 'Algorithms',
    type: 'hash-algorithm',
    timeComplexity: { best: 'O(m)', average: 'O(m)', worst: 'O(m)' },
    spaceComplexity: 'O(1)',
    description: 'A hash function folds a key of length m into a fixed-range integer. A good function distributes keys uniformly to minimize collisions — the backbone of hash tables.',
    generateSteps: generateHashAlgorithmSteps,
    regenerate: { label: 'New Keys', makeInput: randomHashWords },
    code: {
      c: `#define CAP 8
// Polynomial rolling hash of a string
unsigned hash(const char* s) {
    unsigned h = 0;
    for (int i = 0; s[i]; i++)
        h = (h * 31 + s[i]) % CAP;   // fold each char
    return h;
}
// Use: bucket = hash(key);`,
      python: `CAP = 8

def hash_fn(s):
    h = 0
    for ch in s:
        h = (h * 31 + ord(ch)) % CAP   # fold each char
    return h

# Use: bucket = hash_fn(key)`,
      javascript: `const CAP = 8;

function hash(s) {
    let h = 0;
    for (const ch of s)
        h = (h * 31 + ch.charCodeAt(0)) % CAP;  // fold each char
    return h;
}
// Use: const bucket = hash(key);`,
    },
  },

  {
    id: 'greedy',
    name: 'Greedy Algorithm',
    category: 'Algorithms',
    type: 'greedy',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    description: 'Builds a solution by always taking the locally optimal choice. Shown with coin change — repeatedly pick the largest coin that fits. Optimal for canonical coin systems.',
    generateSteps: generateGreedySteps,
    regenerate: { label: 'New Target', makeInput: randomGreedyAmount },
    code: {
      c: `int coins[] = {25, 10, 5, 1};
int makeChange(int amount) {
    int count = 0;
    for (int i = 0; i < 4; i++)
        while (amount >= coins[i]) {
            amount -= coins[i];   // take largest that fits
            count++;
        }
    return count;
}`,
      python: `COINS = [25, 10, 5, 1]
def make_change(amount):
    count = 0
    for c in COINS:
        while amount >= c:
            amount -= c        # take largest that fits
            count += 1
    return count`,
      javascript: `const COINS = [25, 10, 5, 1];
function makeChange(amount) {
    let count = 0;
    for (const c of COINS)
        while (amount >= c) {
            amount -= c;       // take largest that fits
            count++;
        }
    return count;
}`,
    },
  },

  {
    id: 'divide-conquer',
    name: 'Divide & Conquer',
    category: 'Algorithms',
    type: 'divide-conquer',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(log n)',
    description: 'Split a problem into sub-problems, solve recursively, then combine. Shown with Maximum Subarray: the best sum is in the left half, the right half, or crosses the middle.',
    generateSteps: generateDivideConquerSteps,
    regenerate: { label: 'New Array', makeInput: randomSubarrayInput },
    code: {
      c: `int maxSub(int a[], int l, int r) {
    if (l == r) return a[l];           // base case
    int m = (l + r) / 2;               // divide
    int ls = maxSub(a, l, m);
    int rs = maxSub(a, m + 1, r);
    int cs = maxCrossing(a, l, m, r);  // combine
    return max3(ls, rs, cs);
}
int maxCrossing(int a[], int l, int m, int r) {
    // best sum that must include a[m] and a[m+1]
    return bestLeft + bestRight;
}`,
      python: `def max_sub(a, l, r):
    if l == r:
        return a[l]                 # base case
    m = (l + r) // 2                # divide
    ls = max_sub(a, l, m)
    rs = max_sub(a, m + 1, r)
    cs = max_crossing(a, l, m, r)   # combine
    return max(ls, rs, cs)

def max_crossing(a, l, m, r):
    # best sum spanning the midpoint
    return best_left + best_right`,
      javascript: `function maxSub(a, l, r) {
    if (l === r) return a[l];          // base case
    const m = (l + r) >> 1;            // divide
    const ls = maxSub(a, l, m);
    const rs = maxSub(a, m + 1, r);
    const cs = maxCrossing(a, l, m, r);  // combine
    return Math.max(ls, rs, cs);
}
function maxCrossing(a, l, m, r) {
    // best sum that spans the midpoint
    return bestLeft + bestRight;
}`,
    },
  },

  {
    id: 'backtracking',
    name: 'Backtracking',
    category: 'Algorithms',
    type: 'backtracking',
    timeComplexity: { best: 'O(n!)', average: 'O(n!)', worst: 'O(n!)' },
    spaceComplexity: 'O(n)',
    description: 'Explores candidates incrementally and abandons a path as soon as it cannot lead to a valid solution. Shown with N-Queens — place a queen per row, backtrack on conflict.',
    generateSteps: generateBacktrackingSteps,
    regenerate: { label: 'New Board', makeInput: randomQueensN },
    code: {
      c: `int solve(int board[][N], int row) {
    if (row == N) return 1;            // all placed
    for (int col = 0; col < N; col++) {
        if (isSafe(board, row, col)) {
            board[row][col] = 1;       // place
            if (solve(board, row + 1)) return 1;
            board[row][col] = 0;       // backtrack
        }
    }
    return 0;
}`,
      python: `def solve(board, row):
    if row == N:
        return True                 # all placed
    for col in range(N):
        if is_safe(board, row, col):
            board[row][col] = 1     # place
            if solve(board, row + 1):
                return True
            board[row][col] = 0     # backtrack
    return False`,
      javascript: `function solve(board, row) {
    if (row === N) return true;        // all placed
    for (let col = 0; col < N; col++) {
        if (isSafe(board, row, col)) {
            board[row][col] = 1;       // place
            if (solve(board, row + 1)) return true;
            board[row][col] = 0;       // backtrack
        }
    }
    return false;
}`,
    },
  },

  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    category: 'Algorithms',
    type: 'dynamic-programming',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    description: 'Solves each sub-problem once and stores the result, eliminating the redundant work of naive recursion. Shown with bottom-up Fibonacci filling a dp table.',
    generateSteps: generateDynamicProgrammingSteps,
    regenerate: { label: 'New N', makeInput: randomDPN },
    code: {
      c: `int fib(int n) {
    int dp[n + 1];
    dp[0] = 0;                  // base case
    dp[1] = 1;                  // base case
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];  // build up
    return dp[n];
}`,
      python: `def fib(n):
    dp = [0] * (n + 1)
    dp[0] = 0                # base case
    dp[1] = 1                # base case
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]   # build up
    return dp[n]`,
      javascript: `function fib(n) {
    const dp = new Array(n + 1);
    dp[0] = 0;                  // base case
    dp[1] = 1;                  // base case
    for (let i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];  // build up
    return dp[n];
}`,
    },
  },

  {
    id: 'string-matching',
    name: 'String Matching',
    category: 'Algorithms',
    type: 'string-matching',
    timeComplexity: { best: 'O(n)', average: 'O(n·m)', worst: 'O(n·m)' },
    spaceComplexity: 'O(1)',
    description: 'Find every occurrence of a pattern within a text. Shown with the brute-force method: slide the pattern over the text and compare character by character.',
    generateSteps: generateStringMatchingSteps,
    regenerate: { label: 'New Pattern', makeInput: randomStringInput },
    code: {
      c: `void search(const char* text, const char* pat) {
    int n = strlen(text), m = strlen(pat);
    for (int i = 0; i <= n - m; i++) {     // slide window
        int j = 0;
        while (j < m && text[i + j] == pat[j])
            j++;                           // chars match
        if (j == m)
            printf("found at %d\\n", i);    // full match
    }
}`,
      python: `def search(text, pat):
    n, m = len(text), len(pat)
    for i in range(n - m + 1):          # slide window
        j = 0
        while j < m and text[i + j] == pat[j]:
            j += 1                      # chars match
        if j == m:
            print("found at", i)        # full match`,
      javascript: `function search(text, pat) {
    const n = text.length, m = pat.length;
    for (let i = 0; i <= n - m; i++) {     // slide window
        let j = 0;
        while (j < m && text[i + j] === pat[j])
            j++;                           // chars match
        if (j === m)
            console.log("found at", i);    // full match
    }
}`,
    },
  },

  {
    id: 'kmp',
    name: 'KMP Algorithm',
    category: 'Algorithms',
    type: 'string-matching',
    timeComplexity: { best: 'O(n + m)', average: 'O(n + m)', worst: 'O(n + m)' },
    spaceComplexity: 'O(m)',
    description: 'Knuth-Morris-Pratt string matching in the textbook 1-based next[] form. It builds next[] for T, then Index_KMP scans S with i=1, j=1 and falls back with j = next[j].',
    generateSteps: generateKMPSteps,
    regenerate: { label: 'New Pattern', makeInput: randomKMPInput },
    code: {
      c: `void get_next(SString T, int next[]) {
    int i = 1, j = 0;
    next[1] = 0;
    while (i < T.length) {
        if (j == 0 || T.ch[i] == T.ch[j]) {
            ++i;
            ++j;
            next[i] = j;
        } else {
            j = next[j];
        }
    }
}

int Index_KMP(SString S, SString T, int next[]) {
    int i = 1, j = 1;
    while (i <= S.length && j <= T.length) {
        if (j == 0 || S.ch[i] == T.ch[j]) {
            ++i;
            ++j;
        } else {
            j = next[j];
        }
    }
    if (j > T.length)
        return i - T.length;
    else
        return 0;
}`,
      python: `def index_kmp(S, T, next_):
    i = j = 1
    while i <= len(S) and j <= len(T):
        if j == 0 or S[i - 1] == T[j - 1]:
            i += 1
            j += 1
        else:
            j = next_[j]
    if j > len(T):
        return i - len(T)
    return 0

def get_next(T):
    next_ = [None] * (len(T) + 1)
    i, j = 1, 0
    next_[1] = 0
    while i < len(T):
        if j == 0 or T[i - 1] == T[j - 1]:
            i += 1
            j += 1
            next_[i] = j
        else:
            j = next_[j]
    return next_`,
      javascript: `function indexKMP(S, T, next) {
    let i = 1, j = 1;
    while (i <= S.length && j <= T.length) {
        if (j === 0 || S[i - 1] === T[j - 1]) {
            ++i;
            ++j;
        } else {
            j = next[j];
        }
    }
    if (j > T.length)
        return i - T.length;
    return 0;
}

function getNext(T) {
    const next = new Array(T.length + 1);
    let i = 1, j = 0;
    next[1] = 0;
    while (i < T.length) {
        if (j === 0 || T[i - 1] === T[j - 1]) {
            ++i;
            ++j;
            next[i] = j;
        } else {
            j = next[j];
        }
    }
    return next;
}`,
    },
  },
];
