import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SortingPage from './pages/SortingPage';
import BinarySearchPage from './pages/BinarySearchPage';
import GraphPage from './pages/GraphPage';
import { AlgorithmId } from './types';

export default function App() {
  const [algorithm, setAlgorithm] = useState<AlgorithmId>('bubble-sort');

  return (
    <div className="app-shell">
      <Header />
      <div className="app-body">
        <Sidebar selected={algorithm} onSelect={setAlgorithm} />
        <main className="stage">
          {/* `key` forces a full remount when switching algorithms, which
              cleanly resets each page's internal state (array, engine, etc.) */}
          {(algorithm === 'bubble-sort' || algorithm === 'merge-sort') && (
            <SortingPage key={algorithm} algorithm={algorithm} />
          )}
          {algorithm === 'binary-search' && <BinarySearchPage key={algorithm} />}
          {(algorithm === 'bfs' || algorithm === 'dfs') && <GraphPage key={algorithm} algorithm={algorithm} />}
        </main>
      </div>
    </div>
  );
}
