import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export interface Bounds {
    x: number;
    y: number;
    width: number;
    height: number;
}

export enum Color {
    RED = 0,
    TEAL = 170,
    BLUE = 200,
    YELLOW = 60,
    GREEN = 80,
    PURPLE = 250,
    PINK = 320,
}

export interface Point {
    x: number;
    y: number;
    id: Symbol;
    parent: Segment;
};
export interface TempSegment {
    id: Symbol;
}
export interface Segment extends TempSegment {
    bounds: Bounds;
    pointsSt: Writable<Point[]>;
    parent: Line;
};
export interface TempLine {
    name: string;
    color: Color;
    id: Symbol;
}
export interface Line extends TempLine {
    bounds: Bounds;
    segmentsSt: Writable<Segment[]>;
}

export const linesSt = writable<(Line | TempLine)[]>([]);

export const activeLineSt = writable<Symbol>(undefined);
export const symbolLineLookupSt = writable<Map<Symbol, TempLine | Line>>(new Map);

export const activePointsSt = writable<Set<Symbol>>(new Set);
export const nodeToPointSt = writable<WeakMap<HTMLElement | SVGElement, Point>>(new WeakMap);
export const symbolPointLookupSt = writable<Map<Symbol, Point>>(new Map);

export interface Dragger {
    dragOrigin: [number, number];
    lastDragPos: [number, number]
};
export const draggerSt = writable<Dragger | undefined>(undefined);