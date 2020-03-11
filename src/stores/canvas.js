import { writable } from 'svelte/store';

// Trying to define complex types without TypeScript is hard
// This is a Map of symbol-Line pairs. 
// Each line has a hue and segments which is a map of symbol-node pairs.
// Each node is an object with properties x, y, and id
/**
 * @typedef Node { { x: number, y: number, id: Symbol } }
 * @typedef Segment { { name: string, nodes: Node[] } }
 * @typedef Line { { hue: number, name: string, segments: Map<Symbol, Segment> } }
 * @type { Writable<Map<Symbol, Line>> }
 */
export const linesStore = writable(new Map());

// Current active line
/**
 * @type { Writable<Symbol> }
 */
export const activeLineStore = writable(null);

// Current active segment within a line
/**
 * @type { Writable<Symbol> }
 */
export const activeSegmentStore = writable(null);

// Current active node within a segment
/**
 * @type { Writable<Symbol> }
 */
export const activeNodeStore = writable(null);

// represents canvas svg to get coords and dimensions
/**
 * @type { SVGElement }
 */
export const canvasStore = writable(null);

// whether to assocociate delete and backspace with the deletion of a node
// if we're in an input, we want this disabled.
export const allowDeleteStore = writable(true); 