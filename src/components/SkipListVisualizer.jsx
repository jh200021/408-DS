import React from 'react';

export default function SkipListVisualizer({ step }) {
  if (!step?.skip) return <div className="vis-placeholder">Generating…</div>;
  const { skip, currentNode, currentLevel, highlights = {}, target } = step;
  const { values, heights, maxLevel, labels } = skip;

  function cellClass(idx, lv) {
    const h = highlights[idx];
    if (h === 'found') return 'found';
    if (h === 'miss') return 'miss';
    if (idx === currentNode && lv === currentLevel) return 'active';
    if (typeof h === 'number' && h === lv) return 'active';
    return '';
  }

  const cols = values.length;

  return (
    <div className="skip-vis">
      <div className="skip-target">Searching for <strong>{target}</strong></div>
      <div className="skip-grid">
        {Array.from({ length: maxLevel }, (_, k) => maxLevel - 1 - k).map(lv => (
          <div key={lv} className="skip-row">
            <span className="skip-level-label">L{lv}</span>
            <div className="skip-cells" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
              <span className="skip-lane" />
              {values.map((_, idx) =>
                heights[idx] > lv ? (
                  <span key={idx} className={`skip-node ${cellClass(idx, lv)}`}>{labels[idx]}</span>
                ) : (
                  <span key={idx} className="skip-empty" />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
