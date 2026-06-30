import React from 'react';

const NODE_STYLE = {
  default:   { fill: '#eff6ff', stroke: '#93c5fd', text: '#1e40af' },
  path:      { fill: '#fef3c7', stroke: '#f59e0b', text: '#92400e' },
  new:       { fill: '#d1fae5', stroke: '#059669', text: '#065f46' },
  end:       { fill: '#dbeafe', stroke: '#2563eb', text: '#1e3a8a' },
  searching: { fill: '#fef3c7', stroke: '#f59e0b', text: '#92400e' },
  found:     { fill: '#d1fae5', stroke: '#059669', text: '#065f46' },
  miss:      { fill: '#fee2e2', stroke: '#ef4444', text: '#991b1b' },
};

function layout(nodes) {
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  const depth = {};
  nodes.forEach(n => {
    let d = 0, cur = n;
    while (cur.parentId !== -1) { d++; cur = byId[cur.parentId]; }
    depth[n.id] = d;
  });
  const x = {};
  let leaf = 0;
  function assign(id) {
    const kids = Object.keys(byId[id].children).sort().map(c => byId[id].children[c]);
    if (kids.length === 0) { x[id] = leaf++; return; }
    kids.forEach(assign);
    x[id] = (x[kids[0]] + x[kids[kids.length - 1]]) / 2;
  }
  assign(0);
  const maxX = Math.max(leaf - 1, 1);
  const maxD = Math.max(...Object.values(depth), 1);
  return { depth, x, maxX, maxD, byId };
}

export default function TrieVisualizer({ step }) {
  if (!step?.trieNodes) return <div className="vis-placeholder">Generating…</div>;
  const { trieNodes, highlights = {} } = step;
  const { depth, x, maxX, maxD } = layout(trieNodes);
  const W = 560, H = 280, pad = 28, R = 16;

  const px = id => pad + (x[id] / maxX) * (W - 2 * pad);
  const py = id => pad + (depth[id] / maxD) * (H - 2 * pad);

  return (
    <div className="trie-vis">
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {trieNodes.map(n => n.parentId === -1 ? null : (
          <line key={`e${n.id}`} x1={px(n.parentId)} y1={py(n.parentId)} x2={px(n.id)} y2={py(n.id)}
            stroke="#d1d5db" strokeWidth="1.5" />
        ))}
        {trieNodes.map(n => {
          const type = highlights[n.id] || (n.isEnd ? 'end' : 'default');
          const { fill, stroke, text } = NODE_STYLE[type] ?? NODE_STYLE.default;
          const label = n.char === 'root' ? '•' : n.char;
          return (
            <g key={n.id}>
              <circle cx={px(n.id)} cy={py(n.id)} r={R} fill={fill} stroke={stroke}
                strokeWidth={n.isEnd ? 3 : 2} />
              <text x={px(n.id)} y={py(n.id) + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={text}>{label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
