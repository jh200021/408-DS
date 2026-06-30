import React from 'react';

const BUCKET_COLORS = {
  default: { bg: '#f9fafb', border: '#e5e7eb' },
  new:     { bg: '#d1fae5', border: '#059669' },
};

export default function HashAlgorithmVisualizer({ step }) {
  if (!step?.buckets) return <div className="vis-placeholder">Generating…</div>;
  const { buckets, capacity, highlights = {}, currentKey, chars, charIdx, running, bucket } = step;
  const maxLoad = Math.max(1, ...buckets.map(b => b.length));
  const keyChars = currentKey ? currentKey.split('') : [];

  return (
    <div className="hash-algo-vis">
      <div className="ha-compute">
        {currentKey ? (
          <>
            <div className="ha-key">
              {keyChars.map((ch, i) => (
                <span key={i} className={`ha-char ${i === charIdx ? 'active' : ''}`}>{ch}</span>
              ))}
            </div>
            <div className="ha-arrow">→</div>
            <div className="ha-hash">
              <span className="ha-hash-label">hash</span>
              <span className="ha-hash-val">{running != null ? running : '—'}</span>
            </div>
            {bucket != null && <div className="ha-bucket-tag">bucket {bucket}</div>}
          </>
        ) : (
          <span className="ha-idle">Hashing keys into {capacity} buckets…</span>
        )}
      </div>

      <div className="ha-buckets">
        {buckets.map((b, idx) => {
          const type = highlights[idx] || 'default';
          const { bg, border } = BUCKET_COLORS[type] ?? BUCKET_COLORS.default;
          return (
            <div key={idx} className="ha-bucket-col">
              <div className="ha-bucket-keys">
                {b.map((k, ci) => <span key={ci} className="ha-bucket-key">{k}</span>)}
              </div>
              <div
                className="ha-bar"
                style={{
                  height: `${8 + (b.length / maxLoad) * 96}px`,
                  backgroundColor: bg,
                  borderColor: border,
                }}
              >{b.length || ''}</div>
              <div className="ha-bucket-idx">{idx}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
