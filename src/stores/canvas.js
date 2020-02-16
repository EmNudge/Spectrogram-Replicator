import { writable } from 'svelte/store';

// map of id-object pairs. Each object has a hue, keyframes arr, and name
export const lines = writable(new Map());

// is the current id/Symbol() of the active line
export const activeLine = writable(null);

// is the current active node of the active line
export const activeNode = writable(null);

// represents `new Canvas` object in order to let other modules call `.draw()`
export const canvasStore = writable({})