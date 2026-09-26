interface Props {
  array: number[];
  low: number;
  high: number;
  mid: number | null;
  eliminated: number[];
  found: boolean;
  target: number;
}

export default function BinarySearchVisualizer({ array, low, high, mid, eliminated, found, target }: Props) {
  return (
    <div className="binary-search-container">
      <div className="target-chip">
        Target: <strong>{target}</strong>
      </div>
      <div className="bars-container binary-bars" role="img" aria-label="Sorted array with search pointers">
        {array.map((value, i) => {
          const isEliminated = eliminated.includes(i);
          const isMid = mid === i;
          const isFoundHere = found && isMid;

          return (
            <div className="bar-wrapper" key={i}>
              <div className="pointer-row">
                {i === low && <span className="pointer pointer-low">L</span>}
                {i === mid && <span className="pointer pointer-mid">M</span>}
                {i === high && <span className="pointer pointer-high">H</span>}
              </div>
              <div
                className={`array-cell ${isEliminated ? 'eliminated' : ''} ${isMid ? 'active-mid' : ''} ${
                  isFoundHere ? 'found' : ''
                }`}
              >
                {value}
              </div>
              <span className="bar-label">{i}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
