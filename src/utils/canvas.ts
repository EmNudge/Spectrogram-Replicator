import type { Writable } from 'svelte/store';
import type { Point, Segment, Line, Bounds, TempLine, TempSegment } from '$stores/canvas';
import { writable, get } from 'svelte/store';
import { symbolPointLookupSt, Color, linesSt, activeSegmentSt } from '$stores/canvas';

const getNewColor = () => {
    const usedColors = new Set(get(linesSt).map(line => get(line.colorSt)));
    const colors = Object.values(Color).filter(color => typeof color !== 'string') as number[];

    const leftOverColors = colors.filter(color => !usedColors.has(color));
    if (leftOverColors.length) {
        const index = Math.floor(leftOverColors.length * Math.random());
        return leftOverColors[index];
    }

    const index = Math.floor(colors.length * Math.random());
    return colors[index];
}

const getBoundsFromPoint = (x: number, y: number): Writable<Bounds> => writable({ 
    left: x,
    right: x,
    top: y,
    bottom: y
});

export const createNewLine = (x: number, y: number): Line => {
    const line: Line = {
        nameSt: writable('Line'),
        colorSt: writable(getNewColor()),
        id: Symbol(),
        boundsSt: getBoundsFromPoint(x, y),
        segmentsSt: writable([]),
    };
    line.segmentsSt.set([createNewSegment(line, x, y)]);

    return line;
};

export const createTempLine = (): TempLine => {
    const line = {
        nameSt: writable('Line'),
        colorSt: writable(getNewColor()),
        id: Symbol(),
    };

    return line;
}

export const isTempLine = (line: TempLine | Line) => !('segmentsSt' in line);
export const getLineFromTempLine = (line: TempLine, x: number, y: number) => {
    const newLine: Line = {
        ...line,
        boundsSt: getBoundsFromPoint(x, y),
        segmentsSt: writable([]),
    };

    newLine.segmentsSt.set([createNewSegment(newLine, x, y)]);
 
    return newLine;
}

export const createNewSegment = (line: Line, x: number, y: number): Segment => {
    const segment: Segment = {
        boundsSt: getBoundsFromPoint(x, y),
        pointsSt: writable([]),
        id: Symbol(),
        parent: line,
    }
    segment.pointsSt.set([createNewPoint(x, y, segment)]);
    activeSegmentSt.set(segment.id);

    return segment;
}

export const createTempSegment = (line: Line): TempSegment => ({ id: Symbol(), parent: line });
export const isTempSegment = (segment: TempSegment | Segment) => !('pointsSt' in segment);

export const getSegmentFromTempSegment = (segment: TempSegment, x: number, y: number) => {
    const newSegment: Segment = {
        ...segment,
        boundsSt: getBoundsFromPoint(x, y),
        pointsSt: writable<Point[]>([]),
    };
    newSegment.pointsSt.set([createNewPoint(x, y, newSegment)]);
 
    return newSegment;
}

export const createNewPoint = (x: number, y: number, segment: Segment) => {
    const id = Symbol();
    const point = { x, y, id, parent: segment };

    symbolPointLookupSt.update(symbolPointLookup => {
        symbolPointLookup.set(id, point);
        return symbolPointLookup;
    });

    return point;
}

// just going off of ordering, we can get the right and left bounds based on the segments ordering. 
// The highest and lowest node might be in middle of something, though. We therefore use the newest added segment to check for this.
const getLineBounds = (segments: Segment[]): Bounds => {
    let left, top, bottom, right;

    for (const segment of segments) {
        const bounds = get(segment.boundsSt);

        left = Math.min(left || Infinity, bounds.left);
        top = Math.min(top || Infinity, bounds.top);
        right = Math.max(right || -Infinity, bounds.right);
        bottom = Math.max(bottom || -Infinity, bounds.bottom);
    }

    return { left, top, right, bottom };
}
const fixBoundsWithPoint = (bounds: Bounds, points: Point[], x: number, y: number): Bounds => ({
    left: Math.min(bounds.left, x),
    top: Math.min(bounds.top, y),
    right: Math.max(bounds.right, x),
    bottom: Math.max(bounds.bottom, y),
})

// add point, sort them in order of x, change segment bounds, change line bounds
export const addPointToSegment = (segment: Segment, x: number, y: number): Point => {
    const point = createNewPoint(x, y, segment);

    segment.pointsSt.update(points => {
        const newPoints = [...points, point];
        return newPoints.sort((p1, p2) => p1.x - p2.x);
    });

    segment.boundsSt.update(bounds => fixBoundsWithPoint(
        bounds,
        get(segment.pointsSt),
        x,
        y,
    ));

    const segments = get(segment.parent.segmentsSt).filter(seg => !isTempSegment(seg)) as Segment[];
    const newLineBounds = getLineBounds(segments);
    segment.parent.boundsSt.set(newLineBounds);

    return point;
}