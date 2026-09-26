export type AlgorithmId =
  | 'bubble-sort'
  | 'merge-sort'
  | 'binary-search'
  | 'bfs'
  | 'dfs';

export interface StepStats {
  comparisons?: number;
  swaps?: number;
  visited?: number;
}

export interface BaseStep {
  message: string;
  pseudocodeLine: number;
  stats: StepStats;
}

export interface SortStep extends BaseStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
}

export interface BinarySearchStep extends BaseStep {
  array: number[];
  target: number;
  low: number;
  high: number;
  mid: number | null;
  eliminated: number[];
  found: boolean;
}

export interface GraphStep extends BaseStep {
  current: string | null;
  visited: string[];
  frontier: string[];
  order: string[];
  activeEdge: [string, string] | null;
}
