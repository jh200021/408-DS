import React from 'react';

const NR = 22; // node radius

const NODE_STYLE = {
  unvisited: { fill: '#f9fafb', stroke: '#d1d5db', text: '#6b7280' },
  frontier:  { fill: '#fef3c7', stroke: '#f59e0b', text: '#92400e' },
  current:   { fill: '#d1fae5', stroke: '#059669', text: '#065f46' },
  visited:   { fill: '#ecfdf5', stroke: '#34d399', text: '#065f46' },
  tree:      { fill: '#ecfdf5', stroke: '#059669', text: '#065f46' },
};

const EDGE_STYLE = {
  default:     { stroke: '#e5e7eb', width: 2,   dash: '' },
  considering: { stroke: '#f59e0b', width: 3.5, dash: '' },
  candidate:   { stroke: '#60a5fa', width: 2.5, dash: '5 4' },
  tree:        { stroke: '#059669', width: 4,   dash: '' },
  reject:      { stroke: '#fca5a5', width: 2,   dash: '4 4' },
};

function ekey(a, b) {
  return `${Math.min(a, b)}-${Math.max(a, b)}`;
}

export default function WeightedGraphVisualizer({ step }) {
  if (!step?.graph) return <div className="vis-placeholder">Generating…</div>;

  const { graph, nodeState = {}, edgeState = {}, dist = null, info = '', infoLabel = 'Info' } = step;
  const W = 520, H = 300;
  const xy = n => ({ x: n.x * W, y: n.y * H });

  return (
    <div className="graph-vis">
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ flex: 1 }}>
        {/* Edges with weight labels */}
        {graph.edges.map(([a, b, w], i) => {
          const pa = xy(graph.nodes[a]);
          const pb = xy(graph.nodes[b]);
          const st = EDGE_STYLE[edgeState[ekey(a, b)] ?? 'default'] ?? EDGE_STYLE.default;
          const mx = (pa.x + pb.x) / 2;
          const my = (pa.y + pb.y) / 2;
          return (
            <g key={i}>
              <line
                x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                stroke={st.stroke} strokeWidth={st.width} strokeDasharray={st.dash}
              />
              <rect x={mx - 10} y={my - 9} width="20" height="17" rx="3" fill="#ffffff" opacity="0.9" />
              <text x={mx} y={my + 3} textAnchor="middle" fontSize="12" fontWeight="700" fill="#374151">
                {w}
              </text>
            </g>
          );
        })}

        {/* Nodes (with optional distance label above) */}
        {graph.nodes.map(node => {
          const { x, y } = xy(node);
          const stt = NODE_STYLE[nodeState[node.id] ?? 'unvisited'] ?? NODE_STYLE.unvisited;
          const d = dist ? dist[node.id] : undefined;
          return (
            <g key={node.id}>
              {dist && (
                <text x={x} y={y - NR - 6} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">
                  {d === Infinity || d === null || d === undefined ? '∞' : d}
                </text>
              )}
              <circle cx={x} cy={y} r={NR} fill={stt.fill} stroke={stt.stroke} strokeWidth="2.5" />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={stt.text}>
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Info bar (distance table / MST edge set) */}
      <div className="graph-queue-bar">
        <span className="gq-label">{infoLabel}:</span>
        <span className="gq-info">{info}</span>
      </div>
    </div>
  );
}
