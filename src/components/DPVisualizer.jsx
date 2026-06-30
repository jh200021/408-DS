import React from 'react';

const COLORS = {
  default:   { bg: '#f9fafb', border: '#e5e7eb', text: '#9ca3af' },
  base:      { bg: '#fff7ed', border: '#fb923c', text: '#9a3412' },
  using:     { bg: '#dbeafe', border: '#60a5fa', text: '#1e40af' },
  computing: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
  filled:    { bg: '#d1fae5', border: '#059669', text: '#065f46' },
  sorted:    { bg: '#ecfdf5', border: '#34d399', text: '#065f46' },
};

export default function DPVisualizer({ step }) {
  if (!step?.dp) return <div className="vis-placeholder">Generating…</div>;
  const { dp, highlights = {} } = step;

  return (
    <div className="dp-vis">
      <div className="dp-row">
        {dp.map((val, idx) => {
          const type = highlights[idx] || 'default';
          const { bg, border, text } = COLORS[type] ?? COLORS.default;
          return (
            <div key={idx} className="dp-col">
              <div className="dp-cell" style={{ backgroundColor: bg, borderColor: border, color: text }}>
                {val == null ? '—' : val}
              </div>
              <div className="dp-idx">dp[{idx}]</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
