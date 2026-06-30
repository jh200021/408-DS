import React from 'react';

const NR = 22;

const NODE_STYLE = {
  unvisited: { fill: '#f9fafb', stroke: '#d1d5db', text: '#6b7280' },
  frontier: { fill: '#fef3c7', stroke: '#f59e0b', text: '#92400e' },
  current: { fill: '#d1fae5', stroke: '#059669', text: '#065f46' },
  visited: { fill: '#ecfdf5', stroke: '#34d399', text: '#065f46' },
  tree: { fill: '#ecfdf5', stroke: '#059669', text: '#065f46' },
};

const EDGE_STYLE = {
  default: { stroke: '#e5e7eb', width: 2, dash: '' },
  considering: { stroke: '#f59e0b', width: 3.5, dash: '' },
  candidate: { stroke: '#60a5fa', width: 2.5, dash: '5 4' },
  tree: { stroke: '#059669', width: 4, dash: '' },
  reject: { stroke: '#fca5a5', width: 2, dash: '4 4' },
};

function ekey(a, b) {
  return `${Math.min(a, b)}-${Math.max(a, b)}`;
}

export default function WeightedGraphVisualizer({ step }) {
  if (!step?.graph) return <div className="vis-placeholder">Generating...</div>;

  const { graph, nodeState = {}, edgeState = {}, dist = null, info = '', infoLabel = 'Info' } = step;
  const W = 520;
  const H = 300;
  const xy = n => ({ x: n.x * W, y: n.y * H });
  const activeEdges = Object.values(edgeState).filter(Boolean).length;
  const settledNodes = Object.values(nodeState).filter(state => state === 'visited' || state === 'tree' || state === 'current').length;

  return (
    <div className="graph-vis weighted-graph-vis enhanced-vis">
      <div className="vis-metrics graph-metrics">
        <div className="metric-card">
          <span className="metric-label">Nodes</span>
          <span className="metric-value">{settledNodes}/{graph.nodes.length}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Active edges</span>
          <span className="metric-value">{activeEdges}</span>
        </div>
        <div className="metric-card metric-card-wide">
          <span className="metric-label">{infoLabel}</span>
          <span className="metric-value metric-small">{info || '-'}</span>
        </div>
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ flex: 1 }}>
        {graph.edges.map(([a, b, w], i) => {
          const pa = xy(graph.nodes[a]);
          const pb = xy(graph.nodes[b]);
          const edgeType = edgeState[ekey(a, b)] ?? 'default';
          const st = EDGE_STYLE[edgeType] ?? EDGE_STYLE.default;
          const mx = (pa.x + pb.x) / 2;
          const my = (pa.y + pb.y) / 2;
          return (
            <g key={i}>
              <line
                className={`weighted-edge edge-${edgeType}`}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={st.stroke}
                strokeWidth={st.width}
                strokeDasharray={st.dash}
              />
              <rect x={mx - 10} y={my - 9} width="20" height="17" rx="3" fill="#ffffff" opacity="0.95" />
              <text x={mx} y={my + 3} textAnchor="middle" fontSize="12" fontWeight="700" fill="#374151">
                {w}
              </text>
            </g>
          );
        })}

        {graph.nodes.map(node => {
          const { x, y } = xy(node);
          const nodeType = nodeState[node.id] ?? 'unvisited';
          const stt = NODE_STYLE[nodeType] ?? NODE_STYLE.unvisited;
          const d = dist ? dist[node.id] : undefined;
          return (
            <g key={node.id}>
              {dist && (
                <text x={x} y={y - NR - 6} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">
                  {d === Infinity || d === null || d === undefined ? '∞' : d}
                </text>
              )}
              <circle className={`weighted-node-glow node-${nodeType}`} cx={x} cy={y} r={NR + 5} />
              <circle className={`weighted-node node-${nodeType}`} cx={x} cy={y} r={NR} fill={stt.fill} stroke={stt.stroke} strokeWidth="2.5" />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={stt.text}>
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {dist && (
        <div className="distance-strip">
          {graph.nodes.map(node => {
            const d = dist[node.id];
            return (
              <div key={node.id} className={`distance-pill node-${nodeState[node.id] ?? 'unvisited'}`}>
                <span>{node.label}</span>
                <strong>{d === Infinity || d === null || d === undefined ? '∞' : d}</strong>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
