import { writable } from 'svelte/store';

// map of id-object pairs. Each object has a hue, keyframes arr, and name
export const linesStore = writable(new Map());

// is the current id/Symbol() of the active line
export const activeLineStore = writable(null);

// is the current active node of the active line
export const activeNodeStore = writable(null);

// represents canvas svg to get coords and dimensions
export const canvasStore = writable(null);

// whether to assocociate delete and backspace with the deletion of a node
// if we're in an input, we want this disabled.
export const allowDeleteStore = writable(true); 