import React from 'react';

const COLORS = {
  default:      { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af' },
  'left-part':  { bg: '#dbeafe', border: '#60a5fa', text: '#1e40af' },
  'right-part': { bg: '#ede9fe', border: '#8b5cf6', text: '#5b21b6' },
  crossing:     { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
  base:         { bg: '#fff7ed', border: '#fb923c', text: '#9a3412' },
  result:       { bg: '#d1fae5', border: '#059669', text: '#065f46' },
  sorted:       { bg: '#d1fae5', border: '#059669', text: '#065f46' },
};

export default function DivideConquerVisualizer({ step }) {
  if (!step?.array) return <div className="vis-placeholder">Generating…</div>;
  const { array, left, right, highlights = {} } = step;

  return (
    <div className="dc-vis">
      <div className="dc-row">
        {array.map((val, idx) => {
          const inRange = left != null && right != null && idx >= left && idx <= right;
          const type = highlights[idx] || 'default';
          const { bg, border, text } = COLORS[type] ?? COLORS.default;
          return (
            <div key={idx} className="dc-col">
              <div
                className={`dc-box ${inRange ? 'in-range' : 'dim'}`}
                style={{ backgroundColor: bg, borderColor: border, color: text }}
              >{val}</div>
              <div className="dc-idx">{idx}</div>
              <div className="dc-bracket" style={{ visibility: inRange ? 'visible' : 'hidden' }} />
            </div>
          );
        })}
      </div>
      {left != null && right != null && (
        <div className="dc-range-label">Active sub-array: [{left} … {right}]</div>
      )}
    </div>
  );
}
