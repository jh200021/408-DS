import React from 'react';

const NR = 24; // node radius

const NODE_STYLE = {
  unvisited: { fill: '#f9fafb', stroke: '#d1d5db', text: '#6b7280' },
  frontier:  { fill: '#fef3c7', stroke: '#f59e0b', text: '#92400e' },
  'in-stack':{ fill: '#eff6ff', stroke: '#60a5fa', text: '#1e40af' },
  current:   { fill: '#d1fae5', stroke: '#059669', text: '#065f46' },
  visited:   { fill: '#ecfdf5', stroke: '#34d399', text: '#065f46' },
};

export default function GraphVisualizer({ step }) {
  if (!step?.graph) return <div className="vis-placeholder">Generating…</div>;

  const { graph, nodeState = {}, queue = [], queueLabel = 'Queue' } = step;
  const W = 520, H = 300;

  function xy(node) {
    return { x: node.x * W, y: node.y * H };
  }

  // Track which edge pairs were traversed (visited on both sides)
  const visitedSet = new Set(
    Object.entries(nodeState)
      .filter(([, s]) => s === 'visited' || s === 'current')
      .map(([id]) => Number(id))
  );

  return (
    <div className="graph-vis">
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ flex: 1 }}>
        {/* Edges */}
        {graph.edges.map(([a, b], i) => {
          const pa = xy(graph.nodes[a]);
          const pb = xy(graph.nodes[b]);
          const traversed = visitedSet.has(a) && visitedSet.has(b);
          return (
            <line key={i}
              x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
              stroke={traversed ? '#6ee7b7' : '#e5e7eb'}
              strokeWidth={traversed ? 3 : 2}
            />
          );
        })}

        {/* Nodes */}
        {graph.nodes.map(node => {
          const { x, y } = xy(node);
          const state = nodeState[node.id] ?? 'unvisited';
          const { fill, stroke, text } = NODE_STYLE[state] ?? NODE_STYLE.unvisited;
          return (
            <g key={node.id}>
              <circle cx={x} cy={y} r={NR} fill={fill} stroke={stroke} strokeWidth="2.5" />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={text}>
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Queue / Stack display */}
      <div className="graph-queue-bar">
        <span className="gq-label">{queueLabel}:</span>
        {queue.length === 0
          ? <span className="gq-empty">[ empty ]</span>
          : queue.map((id, i) => (
              <span key={i} className="gq-node">{graph.nodes[id]?.label}</span>
            ))
        }
      </div>
    </div>
  );
}
