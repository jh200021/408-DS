import React from 'react';

const COLORS = {
  default:   { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af' },
  accessing: { bg: '#ede9fe', border: '#8b5cf6', text: '#5b21b6' },
  searching: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
  found:     { bg: '#d1fae5', border: '#059669', text: '#065f46' },
  eliminated:{ bg: '#f3f4f6', border: '#d1d5db', text: '#9ca3af' },
  shifting:  { bg: '#fff7ed', border: '#fb923c', text: '#9a3412' },
  shifted:   { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
  new:       { bg: '#d1fae5', border: '#059669', text: '#065f46' },
  removing:  { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
};

export default function ArrayVisualizer({ step }) {
  if (!step?.array) return <div className="vis-placeholder">Generating…</div>;
  const { array, highlights = {} } = step;

  return (
    <div className="search-vis">
      <div className="boxes-row">
        {array.map((val, idx) => {
          const type = highlights[idx] || 'default';
          const { bg, border, text } = COLORS[type] ?? COLORS.default;
          return (
            <div key={idx} className="box-col">
              <div className="box-idx">{idx}</div>
              <div className="box" style={{ backgroundColor: bg, borderColor: border, color: text }}>{val}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
