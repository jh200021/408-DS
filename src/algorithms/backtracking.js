// N-Queens (default N=5 to show more backtracking)
const DEFAULT_N = 5;

function isSafe(board, row, col, n) {
  for (let i = 0; i < row; i++) {
    if (board[i][col]) return false;
    if (col - (row - i) >= 0 && board[i][col - (row - i)]) return false;
    if (col + (row - i) < n && board[i][col + (row - i)]) return false;
  }
  return true;
}

// A fresh board size for the "New Board" button. N=2,3 have no solution, so
// stay in the range that always yields a placement to visualize.
export function randomQueensN() {
  return Math.floor(Math.random() * 4) + 4; // 4 … 7
}

export function generateBacktrackingSteps(input) {
  const N = typeof input === 'number' && input >= 4 && input <= 8 ? input : DEFAULT_N;
  const steps = [];
  const board = Array.from({ length: N }, () => new Array(N).fill(0));
  let solutionFound = false;

  function push(row, col, highlights, description, lines) {
    steps.push({ board: board.map(r => [...r]), n: N, row, col, highlights: { ...highlights }, description, codeLines: lines });
  }

  push(-1, -1, {}, `Backtracking — N-Queens (N=${N}): place ${N} queens on a ${N}×${N} board so no two queens attack each other. Try each column in each row; backtrack on conflict.`, { c: 1, python: 1, javascript: 1 });

  function solve(row) {
    if (solutionFound) return true;
    if (row === N) {
      push(-1, -1, {}, `All ${N} queens placed! Solution found.`, { c: 4, python: 4, javascript: 4 });
      solutionFound = true;
      return true;
    }

    for (let col = 0; col < N && !solutionFound; col++) {
      push(row, col, { [`${row},${col}`]: 'trying' }, `Row ${row}: try column ${col}. Is it safe?`, { c: 6, python: 7, javascript: 7 });

      if (isSafe(board, row, col, N)) {
        board[row][col] = 1;
        push(row, col, { [`${row},${col}`]: 'placed' }, `Row ${row}, col ${col} is safe! Place queen.`, { c: 8, python: 9, javascript: 9 });
        if (solve(row + 1)) return true;

        if (!solutionFound) {
          board[row][col] = 0;
          push(row, col, { [`${row},${col}`]: 'backtrack' }, `Dead end — remove queen from (${row},${col}) and try next column.`, { c: 10, python: 11, javascript: 11 });
        }
      } else {
        push(row, col, { [`${row},${col}`]: 'conflict' }, `(${row},${col}) conflicts with an existing queen. Skip.`, { c: 6, python: 7, javascript: 7 });
      }
    }
    return false;
  }

  solve(0);
  return steps;
}
