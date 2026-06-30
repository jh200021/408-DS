import React from 'react';

const CELL_STYLE = {
  trying:    { bg: '#fef3c7', border: '#f59e0b' },
  placed:    { bg: '#d1fae5', border: '#059669' },
  conflict:  { bg: '#fee2e2', border: '#ef4444' },
  backtrack: { bg: '#fde68a', border: '#d97706' },
};

export default function BacktrackingVisualizer({ step }) {
  if (!step?.board) return <div className="vis-placeholder">Generating…</div>;
  const { board, n, highlights = {} } = step;

  return (
    <div className="bt-vis">
      <div className="bt-board" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {board.map((rowArr, r) =>
          rowArr.map((cell, c) => {
            const dark = (r + c) % 2 === 1;
            const hl = highlights[`${r},${c}`];
            const style = hl ? CELL_STYLE[hl] : null;
            return (
              <div
                key={`${r},${c}`}
                className={`bt-cell ${dark ? 'dark' : 'light'}`}
                style={style ? { backgroundColor: style.bg, boxShadow: `inset 0 0 0 3px ${style.border}` } : undefined}
              >
                {cell === 1 ? '♛' : ''}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
