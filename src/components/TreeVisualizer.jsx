import React from 'react';

const R = 22; // node radius

const NODE_STYLE = {
  default:   { fill: '#eff6ff', stroke: '#93c5fd',  text: '#1e40af' },
  path:      { fill: '#ecfdf5', stroke: '#86efac',  text: '#166534' },
  comparing: { fill: '#fef3c7', stroke: '#f59e0b',  text: '#92400e' },
  inserted:  { fill: '#d1fae5', stroke: '#059669',  text: '#065f46' },
  searching: { fill: '#fef3c7', stroke: '#f59e0b',  text: '#92400e' },
  found:     { fill: '#d1fae5', stroke: '#059669',  text: '#065f46' },
};

// In-order traversal assigns monotonically increasing x positions (no overlap).
function computePositions(nodes, root) {
  const pos = {};
  let counter = 0;

  function inorder(idx, depth) {
    if (idx === -1) return;
    inorder(nodes[idx].left, depth + 1);
    pos[idx] = { x: counter++, y: depth };
    inorder(nodes[idx].right, depth + 1);
  }

  inorder(root, 0);

  const maxX = Math.max(...Object.values(pos).map(p => p.x), 0);
  const maxY = Math.max(...Object.values(pos).map(p => p.y), 0);

  Object.keys(pos).forEach(k => {
    pos[k] = {
      x: maxX === 0 ? 0.5 : pos[k].x / maxX,
      y: maxY === 0 ? 0   : pos[k].y / maxY,
    };
  });

  return pos;
}

export default function TreeVisualizer({ step }) {
  if (!step?.bst?.nodes?.length) {
    return <div className="vis-placeholder">Insert values to build the BST…</div>;
  }

  const { bst: { nodes, root }, highlights = {} } = step;
  const W = 560, H = 380, PAD = 40;

  const relPos = computePositions(nodes, root);

  function px(idx) {
    const p = relPos[idx] ?? { x: 0.5, y: 0 };
    return {
      cx: PAD + p.x * (W - 2 * PAD),
      cy: PAD + p.y * (H - 2 * PAD),
    };
  }

  return (
    <div className="tree-vis">
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {nodes.map((node, idx) => {
          const { cx, cy } = px(idx);
          return (
            <g key={`e${idx}`}>
              {node.left !== -1 && (() => {
                const { cx: lx, cy: ly } = px(node.left);
                return <line x1={cx} y1={cy} x2={lx} y2={ly} stroke="#d1d5db" strokeWidth="2" />;
              })()}
              {node.right !== -1 && (() => {
                const { cx: rx, cy: ry } = px(node.right);
                return <line x1={cx} y1={cy} x2={rx} y2={ry} stroke="#d1d5db" strokeWidth="2" />;
              })()}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, idx) => {
          const { cx, cy } = px(idx);
          const type = highlights[idx] || 'default';
          const { fill, stroke, text } = NODE_STYLE[type] ?? NODE_STYLE.default;
          return (
            <g key={`n${idx}`}>
              <circle cx={cx} cy={cy} r={R} fill={fill} stroke={stroke} strokeWidth="2.5" />
              <text x={cx} y={cy + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={text}>
                {node.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
