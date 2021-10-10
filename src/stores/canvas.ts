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
    id: Symbol;
    bounds: Bounds;
    pointsSt: Writable<Point[]>;
    parent: Line;
};
export interface Line {
    id: Symbol;
    bounds: Bounds;
    segmentsSt: Writable<Segment[]>;
}

export const linesSt = writable<Line[]>([]);

export const activeLineSt = writable<Symbol>(undefined);
export const symbolLineLookupSt = writable<Map<Symbol, Line>>(new Map);

export const activePointsSt = writable<Set<Symbol>>(new Set);
export const nodeToPointSt = writable<WeakMap<HTMLElement | SVGElement, Point>>(new WeakMap);
export const symbolPointLookupSt = writable<Map<Symbol, Point>>(new Map);

export interface Dragger {
    dragOrigin: [number, number];
    lastDragPos: [number, number]
};
export const draggerSt = writable<Dragger | undefined>(undefined);