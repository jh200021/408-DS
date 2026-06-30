import React from 'react';

const R = 20;
const NODE_STYLE = {
  default:   { fill: '#eff6ff', stroke: '#93c5fd', text: '#1e40af' },
  new:       { fill: '#d1fae5', stroke: '#059669', text: '#065f46' },
  comparing: { fill: '#fef3c7', stroke: '#f59e0b', text: '#92400e' },
  swapping:  { fill: '#fee2e2', stroke: '#ef4444', text: '#991b1b' },
  sorted:    { fill: '#d1fae5', stroke: '#059669', text: '#065f46' },
  removing:  { fill: '#fee2e2', stroke: '#ef4444', text: '#991b1b' },
};
const BAR_COLORS = { default:'#93c5fd', new:'#059669', comparing:'#f59e0b', swapping:'#ef4444', sorted:'#059669', removing:'#ef4444' };

function heapXY(i, n, W, H, pad) {
  const depth = Math.floor(Math.log2(i + 1));
  const maxDepth = Math.floor(Math.log2(Math.max(n, 1)));
  const posInLevel = i - (Math.pow(2, depth) - 1);
  const nodesInLevel = Math.pow(2, depth);
  const x = pad + (posInLevel + 0.5) * ((W - 2 * pad) / nodesInLevel);
  const y = pad + depth * ((H - 2 * pad) / Math.max(maxDepth, 1));
  return { x, y };
}

export default function HeapVisualizer({ step }) {
  if (!step?.heap) return <div className="vis-placeholder">Generating…</div>;
  const { heap, highlights = {} } = step;
  const n = heap.length;
  const W = 520, H = 260, pad = 30;

  return (
    <div className="heap-vis">
      {/* Tree view */}
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ flex: 1 }}>
        {heap.map((_, i) => {
          const { x, y } = heapXY(i, n, W, H, pad);
          const lc = 2 * i + 1, rc = 2 * i + 2;
          return (
            <g key={`e${i}`}>
              {lc < n && (() => { const { x: lx, y: ly } = heapXY(lc, n, W, H, pad); return <line x1={x} y1={y} x2={lx} y2={ly} stroke="#d1d5db" strokeWidth="1.5" />; })()}
              {rc < n && (() => { const { x: rx, y: ry } = heapXY(rc, n, W, H, pad); return <line x1={x} y1={y} x2={rx} y2={ry} stroke="#d1d5db" strokeWidth="1.5" />; })()}
            </g>
          );
        })}
        {heap.map((val, i) => {
          const { x, y } = heapXY(i, n, W, H, pad);
          const type = highlights[i] || 'default';
          const { fill, stroke, text } = NODE_STYLE[type] ?? NODE_STYLE.default;
          return (
            <g key={`n${i}`}>
              <circle cx={x} cy={y} r={R} fill={fill} stroke={stroke} strokeWidth="2" />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill={text}>{val}</text>
            </g>
          );
        })}
      </svg>
      {/* Array view */}
      <div className="heap-array-row">
        {heap.map((val, i) => {
          const type = highlights[i] || 'default';
          return (
            <div key={i} className="heap-cell">
              <div className="heap-cell-val" style={{ borderColor: BAR_COLORS[type] ?? '#93c5fd', color: NODE_STYLE[type]?.text ?? '#1e40af' }}>{val}</div>
              <div className="heap-cell-idx">{i}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
