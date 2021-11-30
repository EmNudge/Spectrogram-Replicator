import { writable } from "svelte/store";

export const titleSt = writable('Spectrogram Replicator');
export const authorSt = writable('Author');

export const graphElSt = writable<SVGElement | undefined>();