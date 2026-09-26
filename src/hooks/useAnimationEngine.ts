import { useCallback, useEffect, useRef, useState } from 'react';

export interface AnimationEngine<T> {
  currentIndex: number;
  currentStep: T | undefined;
  totalSteps: number;
  isPlaying: boolean;
  isFinished: boolean;
  speed: number;
  setSpeed: (speed: number) => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  stepForward: () => void;
  stepBackward: () => void;
}

/**
 * Drives playback over a precomputed array of algorithm "steps".
 * Precomputing every step up front (rather than animating live) is
 * what makes pause/resume trivial and correct: pausing just stops
 * advancing an index, and resuming continues from that same index.
 *
 * `steps` should be a stable/memoized array — a new array reference
 * (e.g. a new algorithm or a freshly randomized input) is treated as
 * a new run and resets playback to the start.
 */
export function useAnimationEngine<T>(steps: T[]): AnimationEngine<T> {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(55);
  const intervalRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // A new steps array means a new algorithm run: start from the top.
  useEffect(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  useEffect(() => {
    if (!isPlaying) {
      clearTimer();
      return clearTimer;
    }

    // Higher speed value => shorter delay between steps.
    const delay = Math.max(25, 1000 - speed * 9);
    clearTimer();
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, delay);

    return clearTimer;
  }, [isPlaying, speed, steps.length, clearTimer]);

  // Stop any running interval on unmount.
  useEffect(() => clearTimer, [clearTimer]);

  const play = useCallback(() => {
    if (steps.length === 0) return;
    setCurrentIndex((prev) => (prev >= steps.length - 1 ? 0 : prev));
    setIsPlaying(true);
  }, [steps.length]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
  }, []);

  const stepForward = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const stepBackward = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  return {
    currentIndex,
    currentStep: steps[currentIndex],
    totalSteps: steps.length,
    isPlaying,
    isFinished: steps.length > 0 && currentIndex >= steps.length - 1,
    speed,
    setSpeed,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
  };
}
