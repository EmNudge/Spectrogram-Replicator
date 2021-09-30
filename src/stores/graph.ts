import { writable } from "svelte/store";

export const rows = writable(8);
export const columns = writable(3);
export const minFreq = writable(0);
export const maxFreq = writable(3000);