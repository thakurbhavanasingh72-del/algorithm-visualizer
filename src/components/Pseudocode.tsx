interface Props {
  lines: string[];
  activeLine: number;
}

export default function Pseudocode({ lines, activeLine }: Props) {
  return (
    <div className="panel pseudocode-panel">
      <h3>Pseudocode</h3>
      <pre className="pseudocode">
        {lines.map((line, i) => (
          <div key={i} className={`code-line ${i === activeLine ? 'active' : ''}`}>
            <span className="line-number">{i + 1}</span>
            <span>{line || '\u00A0'}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}
