import { writable } from 'svelte/store';

export const lines = new Map();

export const activeLine = writable(null);