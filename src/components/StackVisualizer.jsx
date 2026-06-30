import React from 'react';

const COLORS = {
  default:  { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af' },
  new:      { bg: '#d1fae5', border: '#059669', text: '#065f46' },
  removing: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
};

export default function StackVisualizer({ step }) {
  if (!step) return <div className="vis-placeholder">Generating…</div>;

  const { stack = [], highlights = {} } = step;

  // Display top-of-stack first (index stack.length-1 at top)
  const displayed = [...stack].reverse();

  return (
    <div className="stack-vis">
      <div className="stack-container">
        <div className="stack-label-top">TOP</div>
        <div className="stack-items">
          {stack.length === 0 ? (
            <div className="ds-empty">( empty )</div>
          ) : (
            displayed.map((val, di) => {
              const realIdx = stack.length - 1 - di;
              const type = highlights[realIdx] || 'default';
              const { bg, border, text } = COLORS[type] ?? COLORS.default;
              return (
                <div key={realIdx} className="stack-item" style={{ backgroundColor: bg, borderColor: border }}>
                  <span className="stack-val" style={{ color: text }}>{val}</span>
                  {realIdx === stack.length - 1 && (
                    <span className="stack-top-tag">← top</span>
                  )}
                </div>
              );
            })
          )}
        </div>
        <div className="stack-base" />
        <div className="stack-label-bottom">BOTTOM</div>
      </div>
    </div>
  );
}
