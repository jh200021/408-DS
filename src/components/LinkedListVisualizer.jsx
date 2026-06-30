import React from 'react';

const COLORS = {
  default:    { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af' },
  new:        { bg: '#d1fae5', border: '#059669', text: '#065f46' },
  traversing: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
  comparing:  { bg: '#fff7ed', border: '#fb923c', text: '#9a3412' },
  removing:   { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
};

export default function LinkedListVisualizer({ step }) {
  if (!step) return <div className="vis-placeholder">Generating…</div>;

  const { list = [], highlights = {} } = step;

  return (
    <div className="ll-vis">
      <div className="ll-chain">
        <div className="ll-head-tag">HEAD</div>
        <div className="ll-arrow-h">→</div>

        {list.length === 0 ? (
          <div className="ll-null">NULL</div>
        ) : (
          list.map((val, idx) => {
            const type = highlights[idx] || 'default';
            const { bg, border, text } = COLORS[type] ?? COLORS.default;
            return (
              <React.Fragment key={idx}>
                <div className="ll-node" style={{ backgroundColor: bg, borderColor: border }}>
                  <div className="ll-node-data" style={{ color: text }}>{val}</div>
                  <div className="ll-node-next" style={{ borderColor: border }}>
                    <span style={{ color: text, fontSize: 10 }}>next</span>
                  </div>
                </div>
                <div className="ll-arrow">→</div>
              </React.Fragment>
            );
          })
        )}

        <div className="ll-null">NULL</div>
      </div>

      {list.length > 0 && (
        <div className="ll-indices">
          <div style={{ width: 52 }} />
          <div style={{ width: 16 }} />
          {list.map((_, idx) => (
            <React.Fragment key={idx}>
              <div className="ll-idx-label">[{idx}]</div>
              <div style={{ width: 28 }} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
