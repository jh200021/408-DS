import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { algorithms } from '../data/algorithms';
import { details } from '../data/details';
import PageWithToc from '../components/PageWithToc';
import useDocumentMeta from '../hooks/useDocumentMeta';

const LANG_LABELS = { javascript: 'JavaScript', python: 'Python', c: 'C' };
const LANGS = ['javascript', 'python', 'c'];

function CodeViewer({ code }) {
  const [language, setLanguage] = useState('javascript');
  const src = code?.[language] || '';

  return (
    <div className="dp-codeviewer">
      <div className="dp-code-bar">
        <div className="lang-tabs">
          {LANGS.map(l => (
            <button
              key={l}
              className={`lang-tab ${language === l ? 'active' : ''}`}
              onClick={() => setLanguage(l)}
            >
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>
      </div>
      <pre className="cg-code dp-fullcode">{src}</pre>
    </div>
  );
}

export default function DetailsPage() {
  const { id } = useParams();
  const algo = algorithms.find(a => a.id === id);

  useDocumentMeta(
    algo ? `${algo.name} — Explained` : 'Not found',
    algo
      ? `${algo.name}: complexity, how it works, key points, use cases and full C, Python & JavaScript implementations.`
      : undefined
  );

  if (!algo) {
    return (
      <div className="cg-page">
        <div className="cg-inner">
          <h1 className="cg-h1">Not found</h1>
          <p>No entry exists for “{id}”.</p>
          <Link className="dp-back" to="/">← Back to Visualizer</Link>
        </div>
      </div>
    );
  }

  const d = details[id] || {};

  const sections = [
    { id: 'complexity', label: 'Complexity' },
    { id: 'how', label: 'How it works' },
    ...(d.operations?.length ? [{ id: 'operations', label: 'Operations' }] : []),
    ...(d.keyPoints?.length ? [{ id: 'key-points', label: 'Key points' }] : []),
    ...(d.useCases?.length ? [{ id: 'use-cases', label: 'Use cases' }] : []),
    { id: 'implementation', label: 'Implementation' },
  ];

  return (
    <PageWithToc sections={sections}>
        <Link className="dp-back" to="/">← Back to Visualizer</Link>

        <div className="dp-titlerow">
          <h1 className="cg-h1">{algo.name}</h1>
          <span className="algo-badge">{algo.category}</span>
        </div>
        {d.tagline && <p className="cg-lead">{d.tagline}</p>}

        {/* Complexity */}
        <section className="cg-section" id="complexity">
          <h2 className="cg-h2">Complexity</h2>
          <div className="dp-complexity">
            <div className="dp-cx">
              <span className="dp-cx-label">Time — Best</span>
              <code>{algo.timeComplexity.best}</code>
            </div>
            <div className="dp-cx">
              <span className="dp-cx-label">Time — Average</span>
              <code>{algo.timeComplexity.average}</code>
            </div>
            <div className="dp-cx">
              <span className="dp-cx-label">Time — Worst</span>
              <code>{algo.timeComplexity.worst}</code>
            </div>
            <div className="dp-cx">
              <span className="dp-cx-label">Space</span>
              <code>{algo.spaceComplexity}</code>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="cg-section" id="how">
          <h2 className="cg-h2">How it works</h2>
          {(d.howItWorks || [algo.description]).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        {/* Operations */}
        {d.operations && d.operations.length > 0 && (
          <section className="cg-section" id="operations">
            <h2 className="cg-h2">Operations</h2>
            {d.operations.map((op, i) => (
              <div key={i} className="dp-op">
                <div className="dp-op-head">
                  <span className="dp-op-name">{op.name}</span>
                  {op.complexity && <span className="dp-op-cx">{op.complexity}</span>}
                </div>
                {op.description && <p className="dp-op-desc">{op.description}</p>}
                {op.code && <pre className="cg-code">{op.code}</pre>}
              </div>
            ))}
          </section>
        )}

        {/* Key points */}
        {d.keyPoints && d.keyPoints.length > 0 && (
          <section className="cg-section" id="key-points">
            <h2 className="cg-h2">Key points</h2>
            <ul className="cg-list">
              {d.keyPoints.map((k, i) => <li key={i}>{k}</li>)}
            </ul>
          </section>
        )}

        {/* Use cases */}
        {d.useCases && d.useCases.length > 0 && (
          <section className="cg-section" id="use-cases">
            <h2 className="cg-h2">Common use cases</h2>
            <ul className="cg-list">
              {d.useCases.map((u, i) => <li key={i}>{u}</li>)}
            </ul>
          </section>
        )}

        {/* Full implementation */}
        <section className="cg-section" id="implementation">
          <h2 className="cg-h2">Implementation</h2>
          <CodeViewer code={algo.code} />
        </section>
    </PageWithToc>
  );
}
