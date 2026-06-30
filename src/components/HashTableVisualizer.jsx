import React from 'react';

const BUCKET_COLORS = {
  default:   { bg: '#f9fafb', border: '#e5e7eb' },
  active:    { bg: '#fef3c7', border: '#f59e0b' },
  collision: { bg: '#fff7ed', border: '#fb923c' },
  new:       { bg: '#d1fae5', border: '#059669' },
  found:     { bg: '#d1fae5', border: '#059669' },
};

export default function HashTableVisualizer({ step }) {
  if (!step?.table) return <div className="vis-placeholder">Generating…</div>;
  const { table, capacity, highlights = {}, currentKey, currentHash } = step;

  return (
    <div className="ht-vis">
      {currentKey != null && (
        <div className="ht-top-row">
          <span className="ht-key-label">Key: <strong>{currentKey}</strong></span>
          {currentHash != null && (
            <span className="ht-hash-arrow">→ h({currentKey}) = {currentKey} % {capacity} = <strong className="ht-hash-val">{currentHash}</strong></span>
          )}
        </div>
      )}

      <div className="ht-table">
        {table.map((bucket, idx) => {
          const type = highlights[idx] || 'default';
          const { bg, border } = BUCKET_COLORS[type] ?? BUCKET_COLORS.default;
          return (
            <div key={idx} className="ht-row">
              <div className="ht-idx" style={{ borderColor: border }}>{idx}</div>
              <div className="ht-bucket" style={{ backgroundColor: bg, borderColor: border }}>
                {bucket.length === 0
                  ? <span className="ht-empty">─</span>
                  : bucket.map((item, ci) => (
                    <span key={ci} className="ht-chain-item">{item.key}:{item.val}</span>
                  ))
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
