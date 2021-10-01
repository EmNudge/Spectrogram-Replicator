import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export interface Bounds {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Point {
    x: number;
    y: number;
    id: Symbol;
    parent: Segment;
};
export interface Segment {
    bounds: Bounds;
    pointsSt: Writable<Point[]>;
    parent: Line;
};
export interface Line {
    bounds: Bounds;
    segmentsSt: Writable<Segment[]>;
}

export const linesSt = writable<Line[]>([]);

export const activePointsSt = writable<Set<Point>>(new Set);
export const nodeToPointSt = writable<WeakMap<HTMLElement | SVGElement, Point>>(new WeakMap)

export interface Dragger {
    dragOrigin: [number, number];
    lastDragPos: [number, number]
};
export const draggerSt = writable<Dragger | undefined>(undefined);