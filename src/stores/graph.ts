import { writable } from "svelte/store";

export const rowsSt = writable(8);
export const columnsSt = writable(3);
export const minFreqSt = writable(0);
export const maxFreqSt = writable(3000);