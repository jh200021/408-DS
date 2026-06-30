import React from 'react';

const NODE_STYLE = {
  default:  { fill: '#f9fafb', stroke: '#d1d5db', text: '#6b7280' },
  calling:  { fill: '#fef3c7', stroke: '#f59e0b', text: '#92400e' },
  returned: { fill: '#d1fae5', stroke: '#059669', text: '#065f46' },
  used:     { fill: '#eff6ff', stroke: '#60a5fa', text: '#1e40af' },
};

function layout(nodes) {
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  const depth = {}, x = {};
  let leaf = 0;
  function assign(id, d) {
    depth[id] = d;
    const kids = [byId[id].leftChild, byId[id].rightChild].filter(c => c != null);
    if (kids.length === 0) { x[id] = leaf++; return; }
    kids.forEach(k => assign(k, d + 1));
    x[id] = (x[kids[0]] + x[kids[kids.length - 1]]) / 2;
  }
  assign(0, 0);
  return { depth, x, maxX: Math.max(leaf - 1, 1), maxD: Math.max(...Object.values(depth), 1), byId };
}

export default function RecursionVisualizer({ step }) {
  if (!step?.treeNodes) return <div className="vis-placeholder">Generating…</div>;
  const { treeNodes, visible = [], resolved = [], activeId, highlights = {} } = step;
  const vis = new Set(visible);
  const done = new Set(resolved);
  const { depth, x, maxX, maxD, byId } = layout(treeNodes);
  const W = 580, H = 280, pad = 30, R = 18;
  const px = id => pad + (x[id] / maxX) * (W - 2 * pad);
  const py = id => pad + (depth[id] / maxD) * (H - 2 * pad);

  return (
    <div className="recursion-vis">
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {treeNodes.map(n => {
          if (n.parentId === -1 || !vis.has(n.id) || !vis.has(n.parentId)) return null;
          return <line key={`e${n.id}`} x1={px(n.parentId)} y1={py(n.parentId)} x2={px(n.id)} y2={py(n.id)}
            stroke="#d1d5db" strokeWidth="1.5" />;
        })}
        {treeNodes.map(n => {
          if (!vis.has(n.id)) return null;
          const type = highlights[n.id] || (done.has(n.id) ? 'returned' : (n.id === activeId ? 'calling' : 'default'));
          const { fill, stroke, text } = NODE_STYLE[type] ?? NODE_STYLE.default;
          const showResult = done.has(n.id);
          return (
            <g key={n.id}>
              <circle cx={px(n.id)} cy={py(n.id)} r={R} fill={fill} stroke={stroke} strokeWidth="2" />
              <text x={px(n.id)} y={py(n.id) + 1} textAnchor="middle" fontSize="9" fontWeight="700" fill={text}>{n.label}</text>
              {showResult && (
                <text x={px(n.id)} y={py(n.id) + 11} textAnchor="middle" fontSize="9" fontWeight="700" fill={text}>={n.result}</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
