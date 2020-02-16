import { writable } from 'svelte/store';


export const lines = writable(new Map());

export const activeLine = writable(null);