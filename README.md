# Algorithm Visualizer

An interactive, animated visualizer for five classic algorithms — built with
React, TypeScript, and Vite. Every animation is driven by the actual
algorithm running on your input, not a scripted mockup.

**Live demo:** run it locally with the steps below (see [Deploying](#deploying-to-vercel) to host it).

## Features

- **Five algorithms:** Bubble Sort, Merge Sort, Binary Search, Breadth-First
  Search (BFS), and Depth-First Search (DFS).
- **Real playback controls:** Play, Pause, and Reset. Pausing mid-animation
  and pressing Play again resumes from the exact same step — it never
  restarts from scratch.
- **Adjustable speed:** a slider that changes animation speed, even while an
  animation is running.
- **Step-by-step explanations:** a live "current operation" panel describing
  exactly what the algorithm is doing (e.g. *"Comparing 24 and 37"*,
  *"Visiting node B"*).
- **Synced pseudocode:** the pseudocode panel highlights the line that
  corresponds to the current step.
- **Live statistics:** current step / total steps, plus comparisons, swaps,
  or visited-node counts where each metric applies.
- **Algorithm info panel:** a short explanation plus best/average/worst time
  complexity and space complexity for the selected algorithm.
- **Sorting controls:** randomize the array and change its size with a
  slider.
- **Binary Search controls:** generate a new sorted array or a new search
  target (including target-not-found cases).
- **Graph controls:** pick the BFS/DFS starting node; the queue (BFS) or
  stack (DFS) contents are shown live, along with the traversal order as it
  develops.
- **Responsive, dark-themed UI** that works on desktop, tablet, and mobile,
  with visible keyboard focus states and semantic, accessible markup.

## Tech stack

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [lucide-react](https://lucide.dev/) for icons
- Plain modern CSS (CSS variables, flexbox/grid) — no CSS framework, no
  backend, no database.

## Project structure

```
algorithm-visualizer/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
└── src/
    ├── main.tsx                  # React entry point
    ├── App.tsx                   # Header + sidebar + active page
    ├── index.css                 # Design tokens & all styling
    ├── types/
    │   └── index.ts              # Shared step/algorithm types
    ├── algorithms/
    │   ├── bubbleSort.ts         # Generates Bubble Sort steps
    │   ├── mergeSort.ts          # Generates Merge Sort steps
    │   ├── binarySearch.ts       # Generates Binary Search steps
    │   └── graph.ts              # Graph data + BFS/DFS step generators
    ├── data/
    │   ├── algorithmInfo.ts      # Descriptions & complexities
    │   └── pseudocode.ts         # Pseudocode lines per algorithm
    ├── hooks/
    │   └── useAnimationEngine.ts # Shared play/pause/reset/speed engine
    ├── components/
    │   ├── Header.tsx, Sidebar.tsx, Controls.tsx, SpeedSlider.tsx
    │   ├── InfoPanel.tsx, Pseudocode.tsx, OperationPanel.tsx, Stats.tsx
    │   ├── SortVisualizer.tsx, BinarySearchVisualizer.tsx
    │   └── GraphVisualizer.tsx
    └── pages/
        ├── SortingPage.tsx       # Bubble Sort & Merge Sort
        ├── BinarySearchPage.tsx
        └── GraphPage.tsx         # BFS & DFS
```

Algorithm logic is fully separated from UI: every algorithm module only
produces plain data (an array of "steps"), and the components are
responsible purely for rendering whatever step is currently active.

## How to run locally

**Prerequisites:** [Node.js](https://nodejs.org/) 18 or newer.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) — open it in
your browser.

Other useful commands:

```bash
npm run build     # type-check and build a production bundle into dist/
npm run preview   # locally preview the production build
```

## How the animation engine works

Rather than animating algorithms "live" step-by-step in real time, each
algorithm module (`src/algorithms/*.ts`) runs the *entire* algorithm once,
up front, and records a snapshot after every meaningful operation (a
comparison, a swap, a node visit, etc.) into an array of `Step` objects.

The `useAnimationEngine` hook then simply walks an index through that
precomputed array:

- **Play** starts a `setInterval` that advances the index by one on each
  tick, at a delay derived from the speed slider.
- **Pause** clears the interval. The index — and therefore the exact state
  on screen — doesn't move.
- **Play** after **Pause** just restarts the interval from the same index,
  so playback resumes exactly where it left off.
- **Reset** clears the interval and sets the index back to `0`.
- Changing algorithm, array, or graph start node produces a brand-new steps
  array, which the hook detects and resets playback for automatically.

Because the whole run is precomputed, pause/resume is trivial and can never
get out of sync with the underlying algorithm — there's no live recursion or
timers inside the algorithm logic itself, only inside the playback engine.

## How each algorithm is implemented

- **Bubble Sort** (`bubbleSort.ts`) — classic adjacent-pair comparison and
  swap, with an early-exit optimization when a full pass makes no swaps.
- **Merge Sort** (`mergeSort.ts`) — standard recursive divide-and-conquer:
  splits the array in half recursively, then merges two sorted halves back
  together in place, recording a step for every comparison and every write.
- **Binary Search** (`binarySearch.ts`) — standard iterative binary search
  over a sorted array, recording the low/mid/high pointers and which
  indices have been eliminated at each step.
- **BFS** (`graph.ts`) — iterative traversal using an explicit queue
  (`Array.prototype.shift`/`push`), visiting neighbors in sorted order.
- **DFS** (`graph.ts`) — iterative traversal using an explicit stack
  (`Array.prototype.pop`/`push`), so the "stack" shown in the UI is the
  real data structure driving the traversal, not a recursion simulation.

## Pushing to your own GitHub repository

```bash
git init
git add .
git commit -m "Initial commit: Algorithm Visualizer"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

## Deploying to Vercel

1. Push the project to a GitHub repository (see above).
2. Go to [vercel.com](https://vercel.com/), click **New Project**, and
   import that repository.
3. Vercel auto-detects the Vite framework preset — leave the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. Vercel will build and host the app, giving you a live
   URL.

Alternatively, using the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Future improvements

- Additional algorithms (Quick Sort, Insertion Sort, Dijkstra's algorithm).
- User-editable graphs (add/remove nodes and edges interactively).
- Manual array input (typing in exact values instead of only randomizing).
- Step-by-step "previous step" navigation in addition to Play/Pause/Reset.
- Light theme toggle.
