import { GraphNode, GraphEdge } from '../algorithms/graph';

interface Props {
  nodes: GraphNode[];
  edges: GraphEdge[];
  current: string | null;
  visited: string[];
  activeEdge: [string, string] | null;
}

export default function GraphVisualizer({ nodes, edges, current, visited, activeEdge }: Props) {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg className="graph-svg" viewBox="0 0 600 320" role="img" aria-label="Graph of nodes and edges">
      {edges.map((e) => {
        const from = nodeMap[e.from];
        const to = nodeMap[e.to];
        if (!from || !to) return null;
        const isActive =
          !!activeEdge &&
          ((activeEdge[0] === e.from && activeEdge[1] === e.to) ||
            (activeEdge[0] === e.to && activeEdge[1] === e.from));

        return (
          <line
            key={`${e.from}-${e.to}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            className={`graph-edge ${isActive ? 'active' : ''}`}
          />
        );
      })}
      {nodes.map((n) => {
        const state = current === n.id ? 'current' : visited.includes(n.id) ? 'visited' : 'unvisited';
        return (
          <g key={n.id} className={`graph-node graph-node-${state}`}>
            <circle cx={n.x} cy={n.y} r={22} />
            <text x={n.x} y={n.y + 5} textAnchor="middle">
              {n.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
