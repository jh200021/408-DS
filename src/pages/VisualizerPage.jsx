import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { algorithms } from '../data/algorithms';
import AlgorithmList from '../components/AlgorithmList';

// Each visualizer is code-split into its own chunk and only fetched when its
// algorithm type is first selected, keeping the initial bundle small.
const SortingVisualizer = lazy(() => import('../components/SortingVisualizer'));
const SearchVisualizer = lazy(() => import('../components/SearchVisualizer'));
const StackVisualizer = lazy(() => import('../components/StackVisualizer'));
const QueueVisualizer = lazy(() => import('../components/QueueVisualizer'));
const LinkedListVisualizer = lazy(() => import('../components/LinkedListVisualizer'));
const TreeVisualizer = lazy(() => import('../components/TreeVisualizer'));
const GraphVisualizer = lazy(() => import('../components/GraphVisualizer'));
const WeightedGraphVisualizer = lazy(() => import('../components/WeightedGraphVisualizer'));
const ArrayVisualizer = lazy(() => import('../components/ArrayVisualizer'));
const HashTableVisualizer = lazy(() => import('../components/HashTableVisualizer'));
const HeapVisualizer = lazy(() => import('../components/HeapVisualizer'));
const SkipListVisualizer = lazy(() => import('../components/SkipListVisualizer'));
const TrieVisualizer = lazy(() => import('../components/TrieVisualizer'));
const GraphDSVisualizer = lazy(() => import('../components/GraphDSVisualizer'));
const RecursionVisualizer = lazy(() => import('../components/RecursionVisualizer'));
const HashAlgorithmVisualizer = lazy(() => import('../components/HashAlgorithmVisualizer'));
const GreedyVisualizer = lazy(() => import('../components/GreedyVisualizer'));
const DivideConquerVisualizer = lazy(() => import('../components/DivideConquerVisualizer'));
const BacktrackingVisualizer = lazy(() => import('../components/BacktrackingVisualizer'));
const DPVisualizer = lazy(() => import('../components/DPVisualizer'));
const StringMatchingVisualizer = lazy(() => import('../components/StringMatchingVisualizer'));
import CodePanel from '../components/CodePanel';
import Controls from '../components/Controls';
import Legend from '../components/Legend';
import useDocumentMeta from '../hooks/useDocumentMeta';

function makeArray(algo) {
  if (algo.type === 'graph' || algo.type === 'weighted-graph') return [];
  const n = algo.type === 'searching' ? 10 : 16;
  return Array.from({ length: n }, () => Math.floor(Math.random() * 88) + 8);
}

// Types whose visualization is driven by a randomized input array, so a
// "New Array" button produces a fresh, meaningful run. Every other type
// (graphs, tries, greedy, DP, backtracking, …) uses a fixed scenario and
// ignores its input, so the button is hidden for them.
const RANDOMIZABLE_TYPES = new Set([
  'sorting', 'searching', 'stack', 'queue', 'linked-list', 'tree', 'array', 'heap',
]);

function Visualizer({ type, step }) {
  switch (type) {
    case 'sorting': return <SortingVisualizer step={step} />;
    case 'searching': return <SearchVisualizer step={step} />;
    case 'stack': return <StackVisualizer step={step} />;
    case 'queue': return <QueueVisualizer step={step} />;
    case 'linked-list': return <LinkedListVisualizer step={step} />;
    case 'tree': return <TreeVisualizer step={step} />;
    case 'graph': return <GraphVisualizer step={step} />;
    case 'weighted-graph': return <WeightedGraphVisualizer step={step} />;
    case 'array': return <ArrayVisualizer step={step} />;
    case 'hash-table': return <HashTableVisualizer step={step} />;
    case 'heap': return <HeapVisualizer step={step} />;
    case 'skip-list': return <SkipListVisualizer step={step} />;
    case 'trie': return <TrieVisualizer step={step} />;
    case 'graph-ds': return <GraphDSVisualizer step={step} />;
    case 'recursion': return <RecursionVisualizer step={step} />;
    case 'hash-algorithm': return <HashAlgorithmVisualizer step={step} />;
    case 'greedy': return <GreedyVisualizer step={step} />;
    case 'divide-conquer': return <DivideConquerVisualizer step={step} />;
    case 'backtracking': return <BacktrackingVisualizer step={step} />;
    case 'dynamic-programming': return <DPVisualizer step={step} />;
    case 'string-matching': return <StringMatchingVisualizer step={step} />;
    default: return null;
  }
}

export default function VisualizerPage() {
  const [selectedAlgo, setSelectedAlgo] = useState(algorithms[0]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const init = useCallback((algo) => {
    // Array-driven algorithms get a fresh random array; fixed-scenario ones can
    // expose their own input generator (e.g. a new coin-change target) via
    // `regenerate.makeInput`. Anything else just replays its single scenario.
    const input = algo.regenerate ? algo.regenerate.makeInput() : makeArray(algo);
    const newSteps = algo.generateSteps(input);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    init(selectedAlgo);
  }, [selectedAlgo, init]);

  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    const t = setTimeout(() => setCurrentStep(s => s + 1), speed);
    return () => clearTimeout(t);
  }, [isPlaying, currentStep, steps.length, speed]);

  const step = steps[currentStep];
  const currentLine = step?.codeLines?.[language];

  useDocumentMeta(
    `${selectedAlgo.name} Visualization`,
    `Step-by-step ${selectedAlgo.name} visualization with C, Python and JavaScript code. ${selectedAlgo.description}`
  );

  const goPrev = useCallback(() => { setCurrentStep(s => Math.max(0, s - 1)); setIsPlaying(false); }, []);
  const goNext = useCallback(() => setCurrentStep(s => Math.min(steps.length - 1, s + 1)), [steps.length]);
  const playFromCurrentStep = useCallback(() => {
    setCurrentStep(s => (s >= steps.length - 1 ? 0 : s));
    setIsPlaying(true);
  }, [steps.length]);

  // Keyboard shortcuts: space = play/pause, ← / → = step, Home / End = jump.
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (isPlaying) {
            setIsPlaying(false);
          } else {
            playFromCurrentStep();
          }
          break;
        case 'ArrowLeft': e.preventDefault(); goPrev(); break;
        case 'ArrowRight': e.preventDefault(); goNext(); break;
        case 'Home': e.preventDefault(); setCurrentStep(0); setIsPlaying(false); break;
        case 'End': e.preventDefault(); setCurrentStep(steps.length - 1); setIsPlaying(false); break;
        default: break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext, isPlaying, playFromCurrentStep, steps.length]);

  const handleSelect = useCallback((algo) => {
    setSelectedAlgo(algo);
  }, []);

  // Show a regenerate button when the algorithm reacts to a fresh input —
  // either an array-driven type ("New Array") or one with a custom generator
  // (e.g. greedy's "New Target"). Fixed scenarios show no button.
  const generateLabel = selectedAlgo.regenerate
    ? selectedAlgo.regenerate.label
    : RANDOMIZABLE_TYPES.has(selectedAlgo.type) ? 'New Array' : null;

  return (
    <div className="app-body">
      <aside className="panel-left">
        <AlgorithmList
          algorithms={algorithms}
          selected={selectedAlgo}
          onSelect={handleSelect}
        />
      </aside>

      <main className="panel-center">
        <div className="algo-info">
          <div className="algo-title-row">
            <h2 className="algo-title">{selectedAlgo.name}</h2>
            <span className="algo-badge">{selectedAlgo.category}</span>
          </div>
          <p className="algo-desc">{selectedAlgo.description}</p>
        </div>

        <div className="vis-area">
          <Suspense fallback={<div className="vis-loading">Loading visualizer…</div>}>
            <Visualizer type={selectedAlgo.type} step={step} />
          </Suspense>
        </div>

        <div className="step-desc-box" role="status" aria-live="polite">
          <span className="step-label">Step {currentStep + 1} / {steps.length}</span>
          <p className="step-desc">{step?.description}</p>
        </div>

        <Legend algorithmId={selectedAlgo.id} />

        <Controls
          isPlaying={isPlaying}
          onPlay={playFromCurrentStep}
          onPause={() => setIsPlaying(false)}
          onFirst={() => { setCurrentStep(0); setIsPlaying(false); }}
          onPrev={goPrev}
          onNext={goNext}
          onLast={() => { setCurrentStep(steps.length - 1); setIsPlaying(false); }}
          onScrub={(n) => { setCurrentStep(n); setIsPlaying(false); }}
          onGenerate={generateLabel ? () => init(selectedAlgo) : undefined}
          generateLabel={generateLabel}
          speed={speed}
          onSpeedChange={setSpeed}
          currentStep={currentStep}
          totalSteps={steps.length}
          canPrev={currentStep > 0}
          canNext={currentStep < steps.length - 1}
        />
      </main>

      <aside className="panel-right">
        <CodePanel
          algorithm={selectedAlgo}
          language={language}
          onLanguageChange={setLanguage}
          currentLine={currentLine}
        />
      </aside>
    </div>
  );
}
