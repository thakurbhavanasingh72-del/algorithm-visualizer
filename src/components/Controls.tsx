import { Play, Pause, RotateCcw } from 'lucide-react';

interface Props {
  isPlaying: boolean;
  isFinished: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function Controls({ isPlaying, isFinished, onPlay, onPause, onReset }: Props) {
  return (
    <div className="controls" role="group" aria-label="Playback controls">
      {isPlaying ? (
        <button type="button" className="btn btn-primary" onClick={onPause} aria-label="Pause animation">
          <Pause size={17} /> Pause
        </button>
      ) : (
        <button type="button" className="btn btn-primary" onClick={onPlay} aria-label="Play animation">
          <Play size={17} /> {isFinished ? 'Replay' : 'Play'}
        </button>
      )}
      <button type="button" className="btn btn-ghost" onClick={onReset} aria-label="Reset animation">
        <RotateCcw size={17} /> Reset
      </button>
    </div>
  );
}
