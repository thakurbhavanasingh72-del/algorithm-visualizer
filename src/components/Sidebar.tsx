import type { ReactNode } from 'react';
import { ArrowDownUp, GitMerge, SearchCode, Network, GitBranch } from 'lucide-react';
import { AlgorithmId } from '../types';

interface NavItem {
  id: AlgorithmId;
  label: string;
  icon: ReactNode;
}

const items: NavItem[] = [
  { id: 'bubble-sort', label: 'Bubble Sort', icon: <ArrowDownUp size={18} /> },
  { id: 'merge-sort', label: 'Merge Sort', icon: <GitMerge size={18} /> },
  { id: 'binary-search', label: 'Binary Search', icon: <SearchCode size={18} /> },
  { id: 'bfs', label: 'BFS', icon: <Network size={18} /> },
  { id: 'dfs', label: 'DFS', icon: <GitBranch size={18} /> },
];

interface Props {
  selected: AlgorithmId;
  onSelect: (id: AlgorithmId) => void;
}

export default function Sidebar({ selected, onSelect }: Props) {
  return (
    <nav className="sidebar" aria-label="Algorithm selector">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`nav-item ${selected === item.id ? 'active' : ''}`}
          onClick={() => onSelect(item.id)}
          aria-current={selected === item.id ? 'page' : undefined}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
