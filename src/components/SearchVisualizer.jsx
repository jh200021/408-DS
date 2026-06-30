import React from 'react';

const BOX_COLORS = {
  default: { bg: '#eff6ff', border: '#93c5fd' },
  active: { bg: '#ecfdf5', border: '#6ee7b7' },
  searching: { bg: '#fffbeb', border: '#fbbf24' },
  eliminated: { bg: '#f3f4f6', border: '#d1d5db' },
  found: { bg: '#d1fae5', border: '#059669' },
};

export default function SearchVisualizer({ step }) {
  if (!step?.array?.length) {
    return <div className="vis-placeholder">Generating...</div>;
  }

  const { array, highlights = {}, target, foundIndex, low, high, mid } = step;
  const showPointers = mid !== undefined && mid !== null;
  const hasWindow = Number.isInteger(low) && Number.isInteger(high) && low <= high;

  return (
    <div className="search-vis enhanced-vis">
      <div className="search-target-row">
        <div className="target-card">
          <span className="target-label">Target</span>
          <span className="target-val">{target}</span>
        </div>
        {hasWindow && (
          <div className="target-card">
            <span className="target-label">Search window</span>
            <span className="target-val target-window">{low} - {high}</span>
          </div>
        )}
        {showPointers && (
          <div className="target-card">
            <span className="target-label">Probe</span>
            <span className="target-val target-window">{mid}</span>
          </div>
        )}
        {foundIndex !== null && foundIndex >= 0 && (
          <span className="badge found-badge">Found at index {foundIndex}</span>
        )}
        {foundIndex === -1 && (
          <span className="badge notfound-badge">Not Found</span>
        )}
      </div>

      <div className="boxes-row">
        {array.map((value, idx) => {
          const type = highlights[idx] || 'default';
          const { bg, border } = BOX_COLORS[type] ?? BOX_COLORS.default;
          const inWindow = hasWindow && idx >= low && idx <= high;
          return (
            <div key={idx} className={`box-col ${inWindow ? 'in-window' : ''}`}>
              <div className="box-idx">{idx}</div>
              <div
                className={`box box-${type}`}
                style={{ backgroundColor: bg, borderColor: border }}
              >
                {value}
              </div>
              {showPointers && (
                <div className="ptr-row">
                  {idx === low && <span className="ptr ptr-l">L</span>}
                  {idx === mid && <span className="ptr ptr-m">M</span>}
                  {idx === high && <span className="ptr ptr-h">H</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
