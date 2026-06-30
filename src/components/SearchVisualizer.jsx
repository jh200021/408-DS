import React from 'react';

const BOX_COLORS = {
  default:    { bg: '#eff6ff', border: '#93c5fd' },
  active:     { bg: '#ecfdf5', border: '#6ee7b7' },
  searching:  { bg: '#fffbeb', border: '#fbbf24' },
  eliminated: { bg: '#f3f4f6', border: '#d1d5db' },
  found:      { bg: '#d1fae5', border: '#059669' },
};

export default function SearchVisualizer({ step }) {
  if (!step?.array?.length) {
    return <div className="vis-placeholder">Generating…</div>;
  }

  const { array, highlights = {}, target, foundIndex, low, high, mid } = step;
  const showPointers = mid !== undefined;

  return (
    <div className="search-vis">
      <div className="search-target-row">
        <span className="target-label">Target</span>
        <span className="target-val">{target}</span>
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
          return (
            <div key={idx} className="box-col">
              <div className="box-idx">{idx}</div>
              <div
                className="box"
                style={{ backgroundColor: bg, borderColor: border }}
              >
                {value}
              </div>
              {showPointers && (
                <div className="ptr-row">
                  {idx === low  && <span className="ptr ptr-l">L</span>}
                  {idx === mid  && <span className="ptr ptr-m">M</span>}
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
