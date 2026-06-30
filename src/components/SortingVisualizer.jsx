import React from 'react';

const BAR_COLORS = {
  default: '#3b82f6',
  comparing: '#f59e0b',
  swapping: '#ef4444',
  sorted: '#059669',
  pivot: '#f97316',
  active: '#60a5fa',
  'left-part': '#60a5fa',
  'right-part': '#8b5cf6',
  placed: '#34d399',
  key: '#8b5cf6',
  min: '#f97316',
};

export default function SortingVisualizer({ step }) {
  if (!step?.array?.length) {
    return <div className="vis-placeholder">Generating...</div>;
  }

  const { array, highlights = {} } = step;
  const max = Math.max(...array, 1);
  const showLabels = array.length <= 18;
  const activeEntries = Object.entries(highlights);
  const activeIndexes = activeEntries.map(([idx]) => Number(idx)).sort((a, b) => a - b);
  const activeTypes = [...new Set(activeEntries.map(([, type]) => type))];
  const sortedCount = Object.values(highlights).filter(type => type === 'sorted' || type === 'placed').length;

  return (
    <div className="sorting-vis enhanced-vis">
      <div className="vis-metrics sorting-metrics">
        <div className="metric-card">
          <span className="metric-label">Active index</span>
          <span className="metric-value">{activeIndexes.length ? activeIndexes.join(', ') : '-'}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">State</span>
          <span className="metric-value">{activeTypes.length ? activeTypes.join(' / ') : 'Scanning'}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Fixed</span>
          <span className="metric-value">{sortedCount}/{array.length}</span>
        </div>
      </div>

      <div className="bars-wrap">
        {array.map((value, idx) => {
          const type = highlights[idx] || 'default';
          const color = BAR_COLORS[type] ?? BAR_COLORS.default;
          const heightPct = ((value / max) * 82 + 8).toFixed(1);
          return (
            <div key={idx} className={`bar-col ${type !== 'default' ? 'is-active' : ''}`}>
              <div
                className={`bar bar-${type}`}
                style={{ height: `${heightPct}%`, backgroundColor: color }}
              >
                {showLabels && <span className="bar-val">{value}</span>}
              </div>
              {showLabels && <span className="bar-idx">{idx}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
