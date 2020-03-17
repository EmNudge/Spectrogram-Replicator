import { writable } from 'svelte/store';

export interface Dim {
  x: number,
  y: number,
  width: number,
  height: number,
}
export interface Node {
  x: number,
  y: number,
  id: Symbol,
}
export interface Segment {
  name: string,
  nodes: Node[],
  dimensions?: Dim,
}
export interface Line {
  hue: Number,
  name: String,
  segments: Map<Symbol, Segment>,
  dimensions?: Dim,
}

export const linesStore = writable(new Map() as Map<Symbol, Line>);

// Current active line
export const activeLineStore = writable(null as Symbol | null);

// Current active segment within a line
export const activeSegmentStore = writable(null as Symbol | null);

// Current active node within a segment
export const activeNodeStore = writable(null as Symbol | null);

// represents canvas svg to get coords and dimensions
export const canvasStore = writable(null as SVGElement | null);

// whether to assocociate delete and backspace with the deletion of a node
// if we're in an input, we want this disabled.
export const allowDeleteStore = writable(true); 