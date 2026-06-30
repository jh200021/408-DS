import React from 'react';

const COLORS = {
  default:  { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af' },
  new:      { bg: '#d1fae5', border: '#059669', text: '#065f46' },
  removing: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
};

export default function QueueVisualizer({ step }) {
  if (!step) return <div className="vis-placeholder">Generating…</div>;

  const { queue = [], highlights = {} } = step;

  return (
    <div className="queue-vis">
      <div className="queue-track">
        <div className="queue-end-label">DEQUEUE ←<br /><span>FRONT</span></div>

        <div className="queue-items">
          {queue.length === 0 ? (
            <div className="ds-empty">( empty )</div>
          ) : (
            queue.map((val, idx) => {
              const type = highlights[idx] || 'default';
              const { bg, border, text } = COLORS[type] ?? COLORS.default;
              return (
                <div key={idx} className="queue-item" style={{ backgroundColor: bg, borderColor: border }}>
                  <span className="queue-val" style={{ color: text }}>{val}</span>
                  {idx < queue.length - 1 && <span className="q-arrow">→</span>}
                </div>
              );
            })
          )}
        </div>

        <div className="queue-end-label">→ ENQUEUE<br /><span>REAR</span></div>
      </div>

      <div className="queue-pointer-row">
        {queue.length > 0 && (
          <>
            <div className="q-ptr-front">FRONT [{queue[0]}]</div>
            <div className="q-ptr-rear">REAR [{queue[queue.length - 1]}]</div>
          </>
        )}
      </div>
    </div>
  );
}
