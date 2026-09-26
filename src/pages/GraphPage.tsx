import { useMemo, useState } from 'react';
import { useAnimationEngine } from '../hooks/useAnimationEngine';
import { generateBFSSteps, generateDFSSteps, defaultNodes, defaultEdges } from '../algorithms/graph';
import { pseudocode } from '../data/pseudocode';
import { algorithmInfo } from '../data/algorithmInfo';
import GraphVisualizer from '../components/GraphVisualizer';
import Controls from '../components/Controls';
import SpeedSlider from '../components/SpeedSlider';
import InfoPanel from '../components/InfoPanel';
import Pseudocode from '../components/Pseudocode';
import OperationPanel from '../components/OperationPanel';
import Stats from '../components/Stats';
import { AlgorithmId } from '../types';

interface Props {
  algorithm: Extract<AlgorithmId, 'bfs' | 'dfs'>;
}

export default function GraphPage({ algorithm }: Props) {
  const [startNode, setStartNode] = useState(defaultNodes[0].id);

  const steps = useMemo(
    () =>
      algorithm === 'bfs'
        ? generateBFSSteps(defaultNodes, defaultEdges, startNode)
        : generateDFSSteps(defaultNodes, defaultEdges, startNode),
    [algorithm, startNode],
  );

  const engine = useAnimationEngine(steps);
  const step = engine.currentStep;
  const info = algorithmInfo[algorithm];
  const lines = pseudocode[algorithm];

  return (
    <div className="page">
      <div className="visual-column">
        <div className="panel visual-panel">
          <div className="visual-panel-header">
            <h2>{info.name}</h2>
            <div className="input-row">
              <label className="field">
                Start node
                <select value={startNode} onChange={(e) => setStartNode(e.target.value)}>
                  {defaultNodes.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.id}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <GraphVisualizer
            nodes={defaultNodes}
            edges={defaultEdges}
            current={step?.current ?? null}
            visited={step?.visited ?? []}
            activeEdge={step?.activeEdge ?? null}
          />

          <div className="graph-side-info">
            <div className="frontier-panel">
              <h4>{algorithm === 'bfs' ? 'Queue' : 'Stack'}</h4>
              <div className="frontier-list">
                {(step?.frontier ?? []).length === 0 ? (
                  <span className="empty-hint">empty</span>
                ) : (
                  (step?.frontier ?? []).map((n, i) => (
                    <span className="frontier-chip" key={`${n}-${i}`}>
                      {n}
                    </span>
                  ))
                )}
              </div>
            </div>
            <div className="frontier-panel">
              <h4>Traversal order</h4>
              <div className="traversal-order">{(step?.order ?? []).join(' → ') || '—'}</div>
            </div>
          </div>
        </div>

        <OperationPanel message={step?.message ?? 'Ready to start'} />

        <div className="panel">
          <Controls
            isPlaying={engine.isPlaying}
            isFinished={engine.isFinished}
            onPlay={engine.play}
            onPause={engine.pause}
            onReset={engine.reset}
          />
          <SpeedSlider speed={engine.speed} onChange={engine.setSpeed} />
        </div>
      </div>

      <div className="side-column">
        <Stats currentStep={engine.currentIndex} totalSteps={engine.totalSteps} visited={step?.stats.visited} />
        <Pseudocode lines={lines} activeLine={step?.pseudocodeLine ?? 0} />
        <InfoPanel info={info} />
      </div>
    </div>
  );
}
