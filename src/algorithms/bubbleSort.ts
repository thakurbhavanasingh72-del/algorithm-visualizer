import { SortStep } from '../types';

/**
 * Generates a full list of snapshot steps for Bubble Sort.
 * Each step captures the array state at that moment plus metadata
 * used to drive the visualization (which bars are being compared,
 * swapped, or have reached their final sorted position).
 */
export function generateBubbleSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sorted: number[] = [];

  if (n <= 1) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: n === 1 ? [0] : [],
      message: 'Array already sorted',
      pseudocodeLine: 7,
      stats: { comparisons, swaps },
    });
    return steps;
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [...sorted],
    message: 'Starting Bubble Sort',
    pseudocodeLine: 0,
    stats: { comparisons, swaps },
  });

  for (let i = 0; i < n - 1; i++) {
    let swappedInPass = false;

    for (let j = 0; j < n - 1 - i; j++) {
      comparisons++;
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        message: `Comparing ${arr[j]} and ${arr[j + 1]}`,
        pseudocodeLine: 2,
        stats: { comparisons, swaps },
      });

      if (arr[j] > arr[j + 1]) {
        swaps++;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swappedInPass = true;
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          message: `Swapping ${arr[j + 1]} and ${arr[j]}`,
          pseudocodeLine: 3,
          stats: { comparisons, swaps },
        });
      }
    }

    sorted.unshift(n - 1 - i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      message: `Element ${arr[n - 1 - i]} is in its final position`,
      pseudocodeLine: 5,
      stats: { comparisons, swaps },
    });

    if (!swappedInPass) break;
  }

  const allIndices = Array.from({ length: n }, (_, k) => k);
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: allIndices,
    message: 'Array is fully sorted!',
    pseudocodeLine: 7,
    stats: { comparisons, swaps },
  });

  return steps;
}
