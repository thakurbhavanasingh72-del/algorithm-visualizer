import { SortStep } from '../types';

/**
 * Generates a full list of snapshot steps for Merge Sort.
 * The array is sorted in place; each step records a snapshot of the
 * array plus which indices are being compared or written, and which
 * ranges have been fully merged (and are therefore "sorted").
 */
export function generateMergeSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];
  const n = arr.length;
  let comparisons = 0;
  const sortedIndices = new Set<number>();

  const pushStep = (message: string, comparing: number[], swapping: number[], line: number) => {
    steps.push({
      array: [...arr],
      comparing,
      swapping,
      sorted: Array.from(sortedIndices).sort((a, b) => a - b),
      message,
      pseudocodeLine: line,
      stats: { comparisons },
    });
  };

  if (n <= 1) {
    pushStep('Array already sorted', [], [], 7);
    return steps;
  }

  pushStep('Starting Merge Sort', [], [], 0);

  function merge(start: number, mid: number, end: number) {
    const left = arr.slice(start, mid);
    const right = arr.slice(mid, end);
    let i = 0;
    let j = 0;
    let k = start;

    pushStep(`Merging range [${start}, ${end - 1}]`, [], [], 3);

    while (i < left.length && j < right.length) {
      comparisons++;
      pushStep(`Comparing ${left[i]} and ${right[j]}`, [start + i, mid + j], [], 4);

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      pushStep(`Placing ${arr[k]} at position ${k}`, [], [k], 5);
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      i++;
      pushStep(`Placing ${arr[k]} at position ${k}`, [], [k], 5);
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      j++;
      pushStep(`Placing ${arr[k]} at position ${k}`, [], [k], 5);
      k++;
    }

    for (let x = start; x < end; x++) sortedIndices.add(x);
    pushStep(`Range [${start}, ${end - 1}] merged and sorted`, [], [], 6);
  }

  function mergeSort(start: number, end: number) {
    if (end - start <= 1) {
      if (end - start === 1) sortedIndices.add(start);
      return;
    }
    const mid = Math.floor((start + end) / 2);
    pushStep(`Dividing range [${start}, ${end - 1}] at midpoint ${mid}`, [], [], 1);
    mergeSort(start, mid);
    mergeSort(mid, end);
    merge(start, mid, end);
  }

  mergeSort(0, n);
  pushStep('Array is fully sorted!', [], [], 7);

  return steps;
}
