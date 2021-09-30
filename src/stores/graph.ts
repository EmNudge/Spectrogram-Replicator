import { writable } from "svelte/store";

export const rowsSt = writable(8);
export const columnsSt = writable(3);
export const minFreqSt = writable(0);
export const maxFreqSt = writable(3000);

export const bgOpacitySt = writable(0.8);
export const canvasWidthSt = writable(800);

export const showGridst = writable(true);
export const debugModeSt = writable(false);
export const lightenOddRowsSt = writable(true);

