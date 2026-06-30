import React from 'react';

const COLORS = {
  default:  { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af' },
  match:    { bg: '#d1fae5', border: '#059669', text: '#065f46' },
  mismatch: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
  found:    { bg: '#d1fae5', border: '#059669', text: '#065f46' },
};

function Cell({ ch, type }) {
  const { bg, border, text } = COLORS[type] ?? COLORS.default;
  return <span className="sm-cell" style={{ backgroundColor: bg, borderColor: border, color: text }}>{ch}</span>;
}

export default function StringMatchingVisualizer({ step }) {
  if (!step?.text) return <div className="vis-placeholder">Generating…</div>;
  const { text, pattern, ti, pi, lps, lpsIndex, matchedAt = [], highlights = {}, phase, tableName = 'LPS', displayBase = 0 } = step;
  const windowStart = ti >= 0 && pi >= 0 ? ti - pi : 0;
  const matchLabel = displayBase === 1 ? 'Matches at 1-based index:' : 'Matches at index:';

  return (
    <div className="sm-vis">
      <div className="sm-label">Text</div>
      <div className="sm-row">
        {text.split('').map((ch, i) => (
          <Cell key={i} ch={ch} type={highlights[`t${i}`]} />
        ))}
      </div>

      <div className="sm-label">Pattern</div>
      <div className="sm-row">
        {Array.from({ length: windowStart }).map((_, i) => <span key={`s${i}`} className="sm-cell sm-spacer" />)}
        {pattern.split('').map((ch, j) => (
          <Cell key={j} ch={ch} type={highlights[`p${j}`]} />
        ))}
      </div>

      {Array.isArray(lps) && (
        <>
          <div className="sm-label">{tableName} Table {phase === 'build' ? '(building)' : ''}</div>
          <div className="sm-row sm-lps-row">
            {lps.map((value, i) => (
              <span key={i} className={`sm-lps-cell ${lpsIndex === i ? 'active' : ''}`}>
                <span className="sm-lps-index">{i + 1}</span>
                <span>{value}</span>
              </span>
            ))}
          </div>
        </>
      )}

      <div className="sm-matches">
        {matchedAt.length > 0
          ? <>{matchLabel} {matchedAt.map((m, i) => <span key={i} className="sm-match-chip">{m}</span>)}</>
          : <span className="sm-no-match">No matches yet…</span>}
      </div>
    </div>
  );
}
