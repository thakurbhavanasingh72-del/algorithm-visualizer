import { AlgorithmInfo } from '../data/algorithmInfo';

export default function InfoPanel({ info }: { info: AlgorithmInfo }) {
  return (
    <div className="panel info-panel">
      <h3>About {info.name}</h3>
      <p className="description">{info.description}</p>
      <dl className="complexity-grid">
        <div>
          <dt>Best case</dt>
          <dd>{info.time.best}</dd>
        </div>
        <div>
          <dt>Average case</dt>
          <dd>{info.time.average}</dd>
        </div>
        <div>
          <dt>Worst case</dt>
          <dd>{info.time.worst}</dd>
        </div>
        <div>
          <dt>Space</dt>
          <dd>{info.space}</dd>
        </div>
      </dl>
    </div>
  );
}
