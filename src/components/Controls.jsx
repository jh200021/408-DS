import React from 'react';

const SPEEDS = [
  { label: '1×',   ms: 500 },
  { label: '1.5×', ms: 333 },
  { label: '2×',   ms: 250 },
  { label: '3×',   ms: 167 },
  { label: '4×',   ms: 125 },
];

function Btn({ onClick, disabled, title, ariaLabel, children, className = '', ...rest }) {
  return (
    <button
      className={`ctrl-btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel || title}
      {...rest}
    >
      {children}
    </button>
  );
}

export default function Controls({
  isPlaying, onPlay, onPause,
  onFirst, onPrev, onNext, onLast,
  onScrub,
  onGenerate, generateLabel = 'New Array',
  speed, onSpeedChange,
  currentStep, totalSteps,
  canPrev, canNext,
}) {
  const activeSpeedIdx = SPEEDS.findIndex(s => s.ms === speed);
  const maxStep = Math.max(0, totalSteps - 1);

  return (
    <div className="controls">
      <div className="ctrl-row">
        <div className="ctrl-btns">
          <Btn onClick={onFirst} disabled={!canPrev} title="Go to first step">⏮</Btn>
          <Btn onClick={onPrev}  disabled={!canPrev} title="Previous step">◀</Btn>
          <Btn
            onClick={isPlaying ? onPause : onPlay}
            className="play-btn"
            title={isPlaying ? 'Pause' : 'Play'}
            aria-pressed={isPlaying}
          >
            {isPlaying ? '⏸' : '▶'}
          </Btn>
          <Btn onClick={onNext} disabled={!canNext} title="Next step">▶</Btn>
          <Btn onClick={onLast} disabled={!canNext} title="Go to last step">⏭</Btn>
        </div>

        <div className="step-counter">
          <span className="step-n">{currentStep + 1}</span>
          <span className="step-sep"> / </span>
          <span className="step-total">{totalSteps}</span>
        </div>

        {onGenerate && (
          <button className="gen-btn" onClick={onGenerate}>{generateLabel}</button>
        )}
      </div>

      {/* Draggable timeline — scrub to any step in either direction. */}
      <div className="scrub-row">
        <input
          className="scrubber"
          type="range"
          min={0}
          max={maxStep}
          value={Math.min(currentStep, maxStep)}
          onChange={(e) => onScrub(Number(e.target.value))}
          aria-label="Step timeline"
          aria-valuetext={`Step ${currentStep + 1} of ${totalSteps}`}
        />
      </div>

      <div className="speed-row" role="group" aria-label="Playback speed">
        <span className="speed-label">Speed</span>
        {SPEEDS.map((s, idx) => (
          <button
            key={idx}
            className={`speed-btn ${activeSpeedIdx === idx ? 'active' : ''}`}
            onClick={() => onSpeedChange(s.ms)}
            aria-pressed={activeSpeedIdx === idx}
            aria-label={`Speed ${s.label}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
