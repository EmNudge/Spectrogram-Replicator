import { writable, get } from 'svelte/store';
import type { Point, Segment, Line, Bounds, TempLine, TempSegment } from '$stores/canvas';
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

export const createNewLine = (x: number, y: number): Line => {
    const line: Line = {
        nameSt: writable('Line'),
        colorSt: writable(getNewColor()),
        id: Symbol(),
        boundsSt: writable({ x, y, width: 0, height: 0 }),
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
        boundsSt: writable({ x, y, width: 0, height: 0 }),
        segmentsSt: writable([]),
    };

    newLine.segmentsSt.set([createNewSegment(newLine, x, y)]);
 
    return newLine;
}

export const createNewSegment = (line: Line, x: number, y: number): Segment => {
    const segment: Segment = {
        boundsSt: writable({ x, y, width: 0, height: 0 }),
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
        boundsSt: writable({ x, y, width: 0, height: 0 }),
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
const fixBoundsWithBounds = (bounds1: Bounds, segments: Segment[], bounds2: Bounds): Bounds => {
    const lastSegmentBounds = get(segments[segments.length - 1].boundsSt);
    const { x } = get(segments[0].boundsSt);
    const y = Math.min(bounds1.y, bounds2.y);
    
    const segWidth = lastSegmentBounds.width + lastSegmentBounds.x - bounds1.width;
    const width = Math.max(bounds1.width, segWidth);
    const height = Math.max(bounds1.height, bounds2.height)

    return { x, y, width, height };
}
const fixBoundsWithPoint = (bounds: Bounds, points: Point[], x: number, y: number): Bounds => ({
    x: points[0].x,
    y: Math.min(bounds.y, y),
    width: points[points.length - 1].x - points[0].x,
    height: Math.max(bounds.height, y - bounds.y),
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
    console.log(segments)

    segment.parent.boundsSt.update(bounds => fixBoundsWithBounds(
        bounds,
        segments,
        get(segment.boundsSt)
    ));

    return point;
}