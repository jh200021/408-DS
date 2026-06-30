import React from 'react';

const COIN_STYLE = {
  default:  { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af' },
  active:   { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
  selected: { bg: '#d1fae5', border: '#059669', text: '#065f46' },
  done:     { bg: '#ecfdf5', border: '#34d399', text: '#065f46' },
};

export default function GreedyVisualizer({ step }) {
  if (!step?.coins) return <div className="vis-placeholder">Generating…</div>;
  const { coins, amount, remaining, selected = [], highlights = {} } = step;
  const used = amount - remaining;
  const pct = Math.max(0, Math.min(100, (used / amount) * 100));

  return (
    <div className="greedy-vis">
      <div className="greedy-amount">
        <span>Target: <strong>{amount}¢</strong></span>
        <span className="greedy-remaining">Remaining: <strong>{remaining}¢</strong></span>
      </div>
      <div className="greedy-progress">
        <div className="greedy-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="greedy-coins">
        {coins.map((c, i) => {
          const type = highlights[i] || 'default';
          const { bg, border, text } = COIN_STYLE[type] ?? COIN_STYLE.default;
          return (
            <div key={i} className="greedy-coin-col">
              <div className="greedy-coin" style={{ backgroundColor: bg, borderColor: border, color: text }}>
                {c}¢
              </div>
              <div className="greedy-count">{selected[i] ? `×${selected[i]}` : '×0'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
