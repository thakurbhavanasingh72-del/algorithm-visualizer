import { AlgorithmId } from '../types';

export interface AlgorithmInfo {
  name: string;
  description: string;
  time: { best: string; average: string; worst: string };
  space: string;
}

export const algorithmInfo: Record<AlgorithmId, AlgorithmInfo> = {
  'bubble-sort': {
    name: 'Bubble Sort',
    description:
      'Repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. Larger values "bubble" toward the end with every pass.',
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  'merge-sort': {
    name: 'Merge Sort',
    description:
      'A divide-and-conquer algorithm that splits the array in half, recursively sorts each half, then merges the two sorted halves back together in order.',
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(n)',
  },
  'binary-search': {
    name: 'Binary Search',
    description:
      'Searches a sorted array by repeatedly halving the search range: comparing the target to the middle element and discarding the half that cannot contain it.',
    time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    space: 'O(1)',
  },
  bfs: {
    name: 'Breadth-First Search',
    description:
      'Explores a graph level by level, visiting every neighbor of a node before moving to the next level. Uses a queue to decide which node to visit next.',
    time: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    space: 'O(V)',
  },
  dfs: {
    name: 'Depth-First Search',
    description:
      'Explores a graph by following one branch as deep as possible before backtracking. Uses a stack (explicit or via recursion) to remember where to backtrack to.',
    time: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    space: 'O(V)',
  },
};
