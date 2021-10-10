import { get } from 'svelte/store';
import type { Bounds } from '../../stores/canvas';
import { activeLineSt, symbolLineLookupSt } from '../../stores/canvas';
import { linesSt, nodeToPointSt, activePointsSt, draggerSt, symbolPointLookupSt } from '../../stores/canvas';
import { createNewLine, addPointToSegment } from '../../utils/canvas';

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
            const line = lines[lines.length - 1];
            line.segmentsSt.update(segments => {
                const segment = segments[segments.length - 1];

                const point = addPointToSegment(segment, x, y);
                activePointsSt.set(new Set([point.id]));

                return segments;
            })
            return lines;
        } else {
            const line = createNewLine(x, y);
            activeLineSt.set(line.id);
            symbolLineLookupSt.update(symbolLineLookup => {
                symbolLineLookup.set(line.id, line);
                return symbolLineLookup;
            });

            const point = get(get(line.segmentsSt)[0].pointsSt)[0];
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

        for (const pointId of get(activePointsSt)) {
            const activePoint = symbolPointLookup.get(pointId)!;

            activePoint.parent.pointsSt.update(points => points.map((point) => {
                if (point.id !== activePoint.id) return point;
                
                return {
                    ...point,
                    x: point.x + deltaX,
                    y: point.y + deltaY,
                };
            }).sort((p1, p2) => p1.x - p2.x))
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

export const getPercBounds = (bounds: Bounds) => 
    Object.fromEntries(
        Object.entries(bounds)
            .map(([key, val]) => [key, `${val * 100}%`])
    );