interface Props {
  currentStep: number;
  totalSteps: number;
  comparisons?: number;
  swaps?: number;
  visited?: number;
}

export default function Stats({ currentStep, totalSteps, comparisons, swaps, visited }: Props) {
  return (
    <div className="panel stats-panel">
      <h3>Statistics</h3>
      <div className="stat-row">
        <span>Step</span>
        <span>
          {totalSteps === 0 ? 0 : Math.min(currentStep + 1, totalSteps)} / {totalSteps}
        </span>
      </div>
      {comparisons !== undefined && (
        <div className="stat-row">
          <span>Comparisons</span>
          <span>{comparisons}</span>
        </div>
      )}
      {swaps !== undefined && (
        <div className="stat-row">
          <span>Swaps</span>
          <span>{swaps}</span>
        </div>
      )}
      {visited !== undefined && (
        <div className="stat-row">
          <span>Visited nodes</span>
          <span>{visited}</span>
        </div>
      )}
    </div>
  );
}
