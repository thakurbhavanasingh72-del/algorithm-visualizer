import { BinarySearchStep } from '../types';

/**
 * Generates a full list of snapshot steps for Binary Search over a
 * sorted array. Each step records the current low/high/mid pointers,
 * which indices have been eliminated from consideration, and whether
 * the target has been found.
 */
export function generateBinarySearchSteps(sortedArr: number[], target: number): BinarySearchStep[] {
  const steps: BinarySearchStep[] = [];
  const n = sortedArr.length;
  let comparisons = 0;
  const eliminated: number[] = [];

  if (n === 0) {
    steps.push({
      array: sortedArr,
      target,
      low: 0,
      high: -1,
      mid: null,
      eliminated: [],
      found: false,
      message: 'Array is empty — nothing to search',
      pseudocodeLine: 9,
      stats: { comparisons },
    });
    return steps;
  }

  let low = 0;
  let high = n - 1;

  steps.push({
    array: sortedArr,
    target,
    low,
    high,
    mid: null,
    eliminated: [...eliminated],
    found: false,
    message: `Searching for ${target} between indexes ${low} and ${high}`,
    pseudocodeLine: 0,
    stats: { comparisons },
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;
    steps.push({
      array: sortedArr,
      target,
      low,
      high,
      mid,
      eliminated: [...eliminated],
      found: false,
      message: `Checking middle element: ${sortedArr[mid]}`,
      pseudocodeLine: 2,
      stats: { comparisons },
    });

    if (sortedArr[mid] === target) {
      steps.push({
        array: sortedArr,
        target,
        low,
        high,
        mid,
        eliminated: [...eliminated],
        found: true,
        message: `Target found at index ${mid}!`,
        pseudocodeLine: 3,
        stats: { comparisons },
      });
      return steps;
    }

    if (sortedArr[mid] < target) {
      for (let k = low; k <= mid; k++) eliminated.push(k);
      low = mid + 1;
      steps.push({
        array: sortedArr,
        target,
        low,
        high,
        mid,
        eliminated: [...eliminated],
        found: false,
        message: `${sortedArr[mid]} is less than ${target} — moving right`,
        pseudocodeLine: 5,
        stats: { comparisons },
      });
    } else {
      for (let k = mid; k <= high; k++) eliminated.push(k);
      high = mid - 1;
      steps.push({
        array: sortedArr,
        target,
        low,
        high,
        mid,
        eliminated: [...eliminated],
        found: false,
        message: `${sortedArr[mid]} is greater than ${target} — moving left`,
        pseudocodeLine: 7,
        stats: { comparisons },
      });
    }

    steps.push({
      array: sortedArr,
      target,
      low,
      high,
      mid: null,
      eliminated: [...eliminated],
      found: false,
      message: low <= high
        ? `Searching between indexes ${low} and ${high}`
        : 'Search range is empty',
      pseudocodeLine: 0,
      stats: { comparisons },
    });
  }

  steps.push({
    array: sortedArr,
    target,
    low,
    high,
    mid: null,
    eliminated: Array.from({ length: n }, (_, i) => i),
    found: false,
    message: `Target ${target} not found in array`,
    pseudocodeLine: 9,
    stats: { comparisons },
  });

  return steps;
}
