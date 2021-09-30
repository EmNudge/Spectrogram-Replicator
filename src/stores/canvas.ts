import { writable } from 'svelte/store';

export type Point = { x: number, y: number };

export const pointsSt = writable<Point[]>([{ x: .5, y: .5 }]);