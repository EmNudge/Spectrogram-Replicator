import { writable } from 'svelte/store';

export const minFreqStore = writable(0);
export const maxFreqStore = writable(2000);
export const audioLengthStore = writable(3);