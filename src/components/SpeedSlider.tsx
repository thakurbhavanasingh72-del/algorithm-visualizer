interface Props {
  speed: number;
  onChange: (value: number) => void;
}

export default function SpeedSlider({ speed, onChange }: Props) {
  return (
    <div className="speed-control">
      <span>Slow</span>
      <input
        type="range"
        min={1}
        max={100}
        value={speed}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Animation speed"
      />
      <span>Fast</span>
    </div>
  );
}
