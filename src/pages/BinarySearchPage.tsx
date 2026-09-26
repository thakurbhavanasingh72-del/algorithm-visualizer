import { useCallback, useMemo, useState } from 'react';
import { Shuffle, Target } from 'lucide-react';
import { useAnimationEngine } from '../hooks/useAnimationEngine';
import { generateBinarySearchSteps } from '../algorithms/binarySearch';
import { pseudocode } from '../data/pseudocode';
import { algorithmInfo } from '../data/algorithmInfo';
import BinarySearchVisualizer from '../components/BinarySearchVisualizer';
import Controls from '../components/Controls';
import SpeedSlider from '../components/SpeedSlider';
import InfoPanel from '../components/InfoPanel';
import Pseudocode from '../components/Pseudocode';
import OperationPanel from '../components/OperationPanel';
import Stats from '../components/Stats';

const SIZE = 12;

function randomSortedArray(size: number): number[] {
  const set = new Set<number>();
  while (set.size < size) set.add(Math.floor(Math.random() * 95) + 5);
  return Array.from(set).sort((a, b) => a - b);
}

export default function BinarySearchPage() {
  const [array, setArray] = useState<number[]>(() => randomSortedArray(SIZE));
  const [target, setTarget] = useState<number>(() => array[Math.floor(Math.random() * array.length)]);

  const steps = useMemo(() => generateBinarySearchSteps(array, target), [array, target]);
  const engine = useAnimationEngine(steps);
  const step = engine.currentStep;

  const regenerateArray = useCallback(() => {
    const next = randomSortedArray(SIZE);
    setArray(next);
    setTarget(next[Math.floor(Math.random() * next.length)]);
  }, []);

  const newTarget = useCallback(() => {
    // Occasionally pick a value guaranteed absent, to demonstrate the "not found" path.
    if (Math.random() < 0.3) {
      setTarget(Math.floor(Math.random() * 50) + 100);
    } else {
      setTarget(array[Math.floor(Math.random() * array.length)]);
    }
  }, [array]);

  const info = algorithmInfo['binary-search'];
  const lines = pseudocode['binary-search'];

  return (
    <div className="page">
      <div className="visual-column">
        <div className="panel visual-panel">
          <div className="visual-panel-header">
            <h2>{info.name}</h2>
            <div className="input-row">
              <button type="button" className="btn btn-secondary" onClick={regenerateArray}>
                <Shuffle size={16} /> New Array
              </button>
              <button type="button" className="btn btn-secondary" onClick={newTarget}>
                <Target size={16} /> New Target
              </button>
            </div>
          </div>
          <BinarySearchVisualizer
            array={step?.array ?? array}
            low={step?.low ?? 0}
            high={step?.high ?? array.length - 1}
            mid={step?.mid ?? null}
            eliminated={step?.eliminated ?? []}
            found={step?.found ?? false}
            target={step?.target ?? target}
          />
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
        <Stats
          currentStep={engine.currentIndex}
          totalSteps={engine.totalSteps}
          comparisons={step?.stats.comparisons}
        />
        <Pseudocode lines={lines} activeLine={step?.pseudocodeLine ?? 0} />
        <InfoPanel info={info} />
      </div>
    </div>
  );
}
