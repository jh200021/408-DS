import React, { useRef, useEffect, useState } from 'react';

const LANG_LABELS = { c: 'C', python: 'Python', javascript: 'JavaScript' };
const LANGS = ['javascript', 'python', 'c'];

function tokenizeLine(line, lang) {
  const keywords = {
    c: ['void', 'int', 'if', 'else', 'for', 'while', 'return', 'sizeof'],
    python: ['def', 'if', 'else', 'elif', 'for', 'while', 'return', 'in', 'range', 'len', 'and', 'or', 'not'],
    javascript: ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'Math'],
  };
  const kws = keywords[lang] || [];
  const kwPattern = new RegExp(`\\b(${kws.join('|')})\\b`, 'g');
  const parts = [];
  let last = 0;
  let m;
  while ((m = kwPattern.exec(line)) !== null) {
    if (m.index > last) parts.push({ type: 'text', val: line.slice(last, m.index) });
    parts.push({ type: 'kw', val: m[0] });
    last = m.index + m[0].length;
  }
  if (last < line.length) parts.push({ type: 'text', val: line.slice(last) });
  return parts;
}

export default function CodePanel({ algorithm, language, onLanguageChange, currentLine }) {
  const activeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [currentLine, language]);

  if (!algorithm) return null;

  const code = algorithm.code[language] || '';
  const lines = code.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-panel">
      <div className="code-header">
        <span className="code-header-title">Implementation</span>
        <div className="lang-tabs">
          {LANGS.map(lang => (
            <button
              key={lang}
              className={`lang-tab ${language === lang ? 'active' : ''}`}
              onClick={() => onLanguageChange(lang)}
            >
              {LANG_LABELS[lang]}
            </button>
          ))}
        </div>
      </div>

      <div className="code-box">
        <button
          className={`copy-icon-btn${copied ? ' copied' : ''}`}
          onClick={handleCopy}
          title={copied ? 'Copied!' : 'Copy code'}
          aria-label="Copy code"
        >
          {copied ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
        <div className="code-scroll">
          <div className="code-pre">
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const isActive = lineNum === currentLine;
            const tokens = tokenizeLine(line, language);
            return (
              <div
                key={idx}
                className={`code-line${isActive ? ' active' : ''}`}
                ref={isActive ? activeRef : null}
              >
                <span className="ln">{lineNum}</span>
                <span className="lc">
                  {tokens.map((t, ti) =>
                    t.type === 'kw'
                      ? <span key={ti} className="kw">{t.val}</span>
                      : <span key={ti}>{t.val}</span>
                  )}
                </span>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      <div className="complexity-panel">
        <div className="cp-row">
          <span className="cp-label">Time</span>
          <span className="cp-chip">Best: {algorithm.timeComplexity.best}</span>
          <span className="cp-chip">Avg: {algorithm.timeComplexity.average}</span>
          <span className="cp-chip">Worst: {algorithm.timeComplexity.worst}</span>
        </div>
        <div className="cp-row">
          <span className="cp-label">Space</span>
          <span className="cp-chip">{algorithm.spaceComplexity}</span>
        </div>
      </div>
    </div>
  );
}
