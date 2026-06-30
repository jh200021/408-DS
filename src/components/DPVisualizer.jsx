import React from 'react';

const COLORS = {
  default: { bg: '#f9fafb', border: '#e5e7eb', text: '#9ca3af' },
  base: { bg: '#fff7ed', border: '#fb923c', text: '#9a3412' },
  using: { bg: '#dbeafe', border: '#60a5fa', text: '#1e40af' },
  computing: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
  filled: { bg: '#d1fae5', border: '#059669', text: '#065f46' },
  sorted: { bg: '#ecfdf5', border: '#34d399', text: '#065f46' },
};

export default function DPVisualizer({ step }) {
  if (!step?.dp) return <div className="vis-placeholder">Generating...</div>;

  const { dp, highlights = {}, n } = step;
  const active = Object.entries(highlights)
    .map(([idx, type]) => ({ idx: Number(idx), type }))
    .sort((a, b) => a.idx - b.idx);
  const computing = active.find(item => item.type === 'computing');
  const filled = dp.filter(val => val !== null && val !== undefined).length;
  const formula = computing && computing.idx >= 2
    ? `dp[${computing.idx}] = dp[${computing.idx - 1}] + dp[${computing.idx - 2}]`
    : 'Fill base cases, then reuse earlier states.';

  return (
    <div className="dp-vis enhanced-vis">
      <div className="vis-metrics dp-metrics">
        <div className="metric-card">
          <span className="metric-label">Goal</span>
          <span className="metric-value">fib({n ?? dp.length - 1})</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Filled</span>
          <span className="metric-value">{filled}/{dp.length}</span>
        </div>
        <div className="metric-card metric-card-wide">
          <span className="metric-label">Transition</span>
          <span className="metric-value metric-small">{formula}</span>
        </div>
      </div>

      <div className="dp-row">
        {dp.map((val, idx) => {
          const type = highlights[idx] || 'default';
          const { bg, border, text } = COLORS[type] ?? COLORS.default;
          return (
            <div key={idx} className="dp-col">
              <div className={`dp-cell dp-${type}`} style={{ backgroundColor: bg, borderColor: border, color: text }}>
                {val == null ? '-' : val}
              </div>
              <div className="dp-idx">dp[{idx}]</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
