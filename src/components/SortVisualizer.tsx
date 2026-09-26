interface Props {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
}

export default function SortVisualizer({ array, comparing, swapping, sorted }: Props) {
  const max = Math.max(...array, 1);

  return (
    <div className="bars-container" role="img" aria-label="Array values as vertical bars">
      {array.map((value, i) => {
        const state = swapping.includes(i)
          ? 'swapping'
          : comparing.includes(i)
          ? 'comparing'
          : sorted.includes(i)
          ? 'sorted'
          : 'default';

        return (
          <div className="bar-wrapper" key={i}>
            <div className={`bar bar-${state}`} style={{ height: `${(value / max) * 100}%` }} />
            <span className="bar-label">{value}</span>
          </div>
        );
      })}
    </div>
  );
}
