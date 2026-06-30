import React from 'react';

const NR = 22;
const NODE_STYLE = {
  visited:  { fill: '#ecfdf5', stroke: '#34d399', text: '#065f46' },
  current:  { fill: '#d1fae5', stroke: '#059669', text: '#065f46' },
  frontier: { fill: '#fef3c7', stroke: '#f59e0b', text: '#92400e' },
};

export default function GraphDSVisualizer({ step }) {
  if (!step?.graph) return <div className="vis-placeholder">Generating…</div>;
  const { graph, built = { nodes: [], edges: [] }, nodeState = {}, adjHighlight = -1 } = step;
  const W = 520, H = 260;
  const builtNodes = new Set(built.nodes);
  const xy = node => ({ x: node.x * W, y: node.y * H });

  return (
    <div className="graphds-vis">
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ flex: 1 }}>
        {built.edges.map(([a, b], i) => {
          const pa = xy(graph.nodes[a]), pb = xy(graph.nodes[b]);
          const hot = i === adjHighlight;
          return <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
            stroke={hot ? '#059669' : '#cbd5e1'} strokeWidth={hot ? 3.5 : 2} />;
        })}
        {graph.nodes.map(node => {
          if (!builtNodes.has(node.id)) return null;
          const { x, y } = xy(node);
          const st = nodeState[node.id] ?? 'visited';
          const { fill, stroke, text } = NODE_STYLE[st] ?? NODE_STYLE.visited;
          return (
            <g key={node.id}>
              <circle cx={x} cy={y} r={NR} fill={fill} stroke={stroke} strokeWidth="2.5" />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={text}>{node.label}</text>
            </g>
          );
        })}
      </svg>

      <div className="graphds-adj">
        <span className="graphds-adj-title">Adjacency List</span>
        {built.nodes.map(id => (
          <div key={id} className="graphds-adj-row">
            <span className="graphds-adj-key">{graph.nodes[id].label}:</span>
            <span className="graphds-adj-vals">
              {graph.adj[id]
                .filter(nb => built.nodes.includes(nb))
                .map(nb => graph.nodes[nb].label).join(', ') || '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
