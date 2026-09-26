import { GraphStep } from '../types';

export interface GraphNode {
  id: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
}

// A small, fixed demo graph laid out for a clear, readable visualization.
export const defaultNodes: GraphNode[] = [
  { id: 'A', x: 300, y: 50 },
  { id: 'B', x: 140, y: 150 },
  { id: 'C', x: 460, y: 150 },
  { id: 'D', x: 70, y: 270 },
  { id: 'E', x: 230, y: 270 },
  { id: 'F', x: 370, y: 270 },
  { id: 'G', x: 530, y: 270 },
];

export const defaultEdges: GraphEdge[] = [
  { from: 'A', to: 'B' },
  { from: 'A', to: 'C' },
  { from: 'B', to: 'D' },
  { from: 'B', to: 'E' },
  { from: 'C', to: 'F' },
  { from: 'C', to: 'G' },
  { from: 'E', to: 'F' },
];

function buildAdjacency(nodes: GraphNode[], edges: GraphEdge[]): Record<string, string[]> {
  const adj: Record<string, string[]> = {};
  nodes.forEach((n) => (adj[n.id] = []));
  edges.forEach((e) => {
    adj[e.from]?.push(e.to);
    adj[e.to]?.push(e.from);
  });
  Object.values(adj).forEach((list) => list.sort());
  return adj;
}

/**
 * Generates snapshot steps for a Breadth-First Search traversal,
 * exposing the queue contents at every step so it can be visualized.
 */
export function generateBFSSteps(nodes: GraphNode[], edges: GraphEdge[], start: string): GraphStep[] {
  const adj = buildAdjacency(nodes, edges);
  const steps: GraphStep[] = [];
  const visited = new Set<string>([start]);
  const order: string[] = [];
  const queue: string[] = [start];
  let visitedCount = 0;

  steps.push({
    current: null,
    visited: [],
    frontier: [...queue],
    order: [...order],
    activeEdge: null,
    message: `Starting BFS from node ${start}`,
    pseudocodeLine: 0,
    stats: { visited: visitedCount },
  });

  while (queue.length > 0) {
    const node = queue.shift() as string;
    order.push(node);
    visitedCount++;

    steps.push({
      current: node,
      visited: Array.from(visited),
      frontier: [...queue],
      order: [...order],
      activeEdge: null,
      message: `Visiting node ${node}`,
      pseudocodeLine: 2,
      stats: { visited: visitedCount },
    });

    for (const neighbor of adj[node] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        steps.push({
          current: node,
          visited: Array.from(visited),
          frontier: [...queue],
          order: [...order],
          activeEdge: [node, neighbor],
          message: `Adding node ${neighbor} to the queue`,
          pseudocodeLine: 5,
          stats: { visited: visitedCount },
        });
      }
    }
  }

  steps.push({
    current: null,
    visited: Array.from(visited),
    frontier: [],
    order: [...order],
    activeEdge: null,
    message: `BFS traversal complete: ${order.join(' → ')}`,
    pseudocodeLine: 6,
    stats: { visited: visitedCount },
  });

  return steps;
}

/**
 * Generates snapshot steps for an iterative, stack-based Depth-First
 * Search traversal, exposing the stack contents at every step.
 */
export function generateDFSSteps(nodes: GraphNode[], edges: GraphEdge[], start: string): GraphStep[] {
  const adj = buildAdjacency(nodes, edges);
  const steps: GraphStep[] = [];
  const visited = new Set<string>();
  const order: string[] = [];
  const stack: string[] = [start];
  let visitedCount = 0;

  steps.push({
    current: null,
    visited: [],
    frontier: [...stack],
    order: [...order],
    activeEdge: null,
    message: `Starting DFS from node ${start}`,
    pseudocodeLine: 0,
    stats: { visited: visitedCount },
  });

  while (stack.length > 0) {
    const node = stack.pop() as string;
    if (visited.has(node)) continue;

    visited.add(node);
    order.push(node);
    visitedCount++;

    steps.push({
      current: node,
      visited: Array.from(visited),
      frontier: [...stack],
      order: [...order],
      activeEdge: null,
      message: `Visiting node ${node}`,
      pseudocodeLine: 3,
      stats: { visited: visitedCount },
    });

    const neighbors = (adj[node] ?? []).filter((nb) => !visited.has(nb)).reverse();
    for (const neighbor of neighbors) {
      stack.push(neighbor);
      steps.push({
        current: node,
        visited: Array.from(visited),
        frontier: [...stack],
        order: [...order],
        activeEdge: [node, neighbor],
        message: `Pushing node ${neighbor} onto the stack`,
        pseudocodeLine: 5,
        stats: { visited: visitedCount },
      });
    }
  }

  steps.push({
    current: null,
    visited: Array.from(visited),
    frontier: [],
    order: [...order],
    activeEdge: null,
    message: `DFS traversal complete: ${order.join(' → ')}`,
    pseudocodeLine: 6,
    stats: { visited: visitedCount },
  });

  return steps;
}
