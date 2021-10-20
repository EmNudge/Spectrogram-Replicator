import type { Bounds, Segment, Line } from '$stores/canvas';
import { get } from 'svelte/store';
import { activeLineSt, symbolLineLookupSt, activeSegmentSt } from '$stores/canvas';
import { linesSt, nodeToPointSt, activePointsSt, draggerSt, symbolPointLookupSt } from '$stores/canvas';
import { createNewLine, addPointToSegment, getLineFromTempLine, isTempLine, isTempSegment, getSegmentFromTempSegment } from '../../utils/canvas';

const getPointForEvent = (e: MouseEventHandler<Element>): [number, number] => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.x) / rect.width;
    const y = (e.clientY - rect.y) / rect.height;
    return [x, y];
}

type MouseEventHandler<T> = MouseEvent & { target: Element, currentTarget: EventTarget & T };
export const handleMouseDown = (e: MouseEventHandler<SVGSVGElement>) => {
    const [x, y] = getPointForEvent(e);

    draggerSt.set({ lastDragPos: [x, y], dragOrigin: [x, y] });

    if (e.target.nodeName === 'circle') {
        handleSelect(e);
        return;
    }

    linesSt.update(lines => {
        if (lines.length) {
            const line = get(symbolLineLookupSt).get(get(activeLineSt))!;
            if (isTempLine(line)) {
                const newLine = getLineFromTempLine(line, x, y);
                symbolLineLookupSt.update(symbolLineLookup => {
                    symbolLineLookup.set(line.id, newLine);
                    return symbolLineLookup;
                });

                const segments = get(newLine.segmentsSt);
                const point = get((segments[0] as Segment).pointsSt)[0];
                activePointsSt.set(new Set([point.id]));

                return lines.map(line => line.id === newLine.id ? newLine : line);
            }

            (line as Line).segmentsSt.update(segments => {
                const segId = get(activeSegmentSt);
                return segments.map(segment => {
                    if (segment.id !== segId) return segment;
                    if (isTempSegment(segment)) {
                        const newSeg = getSegmentFromTempSegment(segment, x, y);
                        return newSeg;
                    }

                    const point = addPointToSegment(segment as Segment, x, y);
                    activePointsSt.set(new Set([point.id]));
                    return segment;
                });
            })
            return lines;
        } else {
            const line = createNewLine(x, y);
            activeLineSt.set(line.id);
            symbolLineLookupSt.update(symbolLineLookup => {
                symbolLineLookup.set(line.id, line);
                return symbolLineLookup;
            });

            const segments = get(line.segmentsSt);
            const point = get((segments[0] as Segment).pointsSt)[0];
            activePointsSt.set(new Set([point.id]));

            return [line];
        }
    });
}

export const handleMouseMove = (e: MouseEventHandler<SVGSVGElement>) => {
    const dragger = get(draggerSt);
    if (!dragger) return;

    const [x, y] = getPointForEvent(e);

    const symbolPointLookup = get(symbolPointLookupSt);

    draggerSt.update((dragger) => {
        // impossible path since already handled, but to satisfy TS
        if (!dragger) return dragger;

        const { dragOrigin, lastDragPos } = dragger;
        const [lastX, lastY] = lastDragPos;

        const deltaX = x - lastX;
        const deltaY = y - lastY;

        // move active points and get their parent segments
        // note that while we're mutating, this is not inside of an update, so this is UNTRACKED
        // We update in a few lines, so this is fine, but we must realize this.
        const segmentsChanged = new Set<Segment>();
        for (const pointId of get(activePointsSt)) {
            const activePoint = symbolPointLookup.get(pointId)!;
            activePoint.x += deltaX;
            activePoint.y += deltaY;

            segmentsChanged.add(activePoint.parent);
        }

        // sort segments that had points change and fix bounds
        const linesChanged = new Set<Line>();
        for (const segment of segmentsChanged) {
            linesChanged.add(segment.parent);

            segment.pointsSt.update(points => points.sort((p1, p2) => p1.x - p2.x));
            segment.boundsSt.update(() => {
                const points = get(segment.pointsSt);

                let left = points[0].x;
                let top = points[0].y;
                let bottom = points[0].y;
                let right = points[0].x;
                for (let i = 1; i < points.length; i++) {
                    const point = points[i];

                    if (point.x < left) left = point.x;
                    if (point.y < top) top = point.y;
                    if (point.x > right) right = point.x;
                    if (point.y > bottom) bottom = point.y;
                }
                
                return { left, top, bottom, right };
            });
        }

        for (const line of linesChanged) {
            line.boundsSt.update(() => {
                const segments = get(line.segmentsSt);

                const oldBounds = get((segments.find(seg => !isTempSegment(seg)) as Segment).boundsSt);
                let { left, top, right, bottom } = oldBounds;
                
                for (const segment of segments) {
                    if (isTempSegment(segment)) continue;
                    const segBounds = get((segment as Segment).boundsSt);

                    if (segBounds.left < left) left = segBounds.left;
                    if (segBounds.top < top) top = segBounds.top;
                    if (segBounds.right > right) right = segBounds.right;
                    if (segBounds.bottom > bottom) bottom = segBounds.bottom;
                }

                return { left, top, right, bottom };
            });
        }

        return { dragOrigin, lastDragPos: [x, y] };
    });
}

export const handleMouseUp = () => draggerSt.set(undefined);

const handleSelect = (e: MouseEventHandler<SVGElement>) => {
    nodeToPointSt.update(nodeToPoint => {
        const point = nodeToPoint.get(e.target as SVGCircleElement);
        if (!point) {
            console.log(e.target);
            throw new Error('WeakMap does not have a reference to node!');
        }

        activePointsSt.update(activePoints => {
            if (!e.shiftKey) return new Set([point.id]);

            activePoints.add(point.id);
            return activePoints;
        });

        return nodeToPoint;
    });
}

export const getPercBounds = ({ left, top, right, bottom }: Bounds) =>  ({
    x: `${left * 100}%`,
    y: `${top * 100}%`,
    width: `${(right - left) * 100}%`,
    height: `${(bottom - top) * 100}%`,
})