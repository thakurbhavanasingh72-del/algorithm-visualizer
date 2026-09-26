import { useCallback, useMemo, useState } from 'react';
import { Shuffle } from 'lucide-react';
import { useAnimationEngine } from '../hooks/useAnimationEngine';
import { generateBubbleSortSteps } from '../algorithms/bubbleSort';
import { generateMergeSortSteps } from '../algorithms/mergeSort';
import { pseudocode } from '../data/pseudocode';
import { algorithmInfo } from '../data/algorithmInfo';
import SortVisualizer from '../components/SortVisualizer';
import Controls from '../components/Controls';
import SpeedSlider from '../components/SpeedSlider';
import InfoPanel from '../components/InfoPanel';
import Pseudocode from '../components/Pseudocode';
import OperationPanel from '../components/OperationPanel';
import Stats from '../components/Stats';
import { AlgorithmId } from '../types';

function randomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

interface Props {
  algorithm: Extract<AlgorithmId, 'bubble-sort' | 'merge-sort'>;
}

const DEFAULT_SIZE = 16;

export default function SortingPage({ algorithm }: Props) {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [baseArray, setBaseArray] = useState<number[]>(() => randomArray(DEFAULT_SIZE));

  const steps = useMemo(
    () =>
      algorithm === 'bubble-sort'
        ? generateBubbleSortSteps(baseArray)
        : generateMergeSortSteps(baseArray),
    [algorithm, baseArray],
  );

  const engine = useAnimationEngine(steps);
  const step = engine.currentStep;

  const regenerate = useCallback((newSize?: number) => {
    setBaseArray(randomArray(newSize ?? size));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const handleSizeChange = (n: number) => {
    setSize(n);
    regenerate(n);
  };

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
                Array size: {size}
                <input
                  type="range"
                  min={2}
                  max={40}
                  value={size}
                  onChange={(e) => handleSizeChange(Number(e.target.value))}
                  aria-label="Array size"
                />
              </label>
              <button type="button" className="btn btn-secondary" onClick={() => regenerate()}>
                <Shuffle size={16} /> New Array
              </button>
            </div>
          </div>
          <SortVisualizer
            array={step?.array ?? baseArray}
            comparing={step?.comparing ?? []}
            swapping={step?.swapping ?? []}
            sorted={step?.sorted ?? []}
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
          swaps={step?.stats.swaps}
        />
        <Pseudocode lines={lines} activeLine={step?.pseudocodeLine ?? 0} />
        <InfoPanel info={info} />
      </div>
    </div>
  );
}
