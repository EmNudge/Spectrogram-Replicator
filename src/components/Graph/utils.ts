import { linesSt, nodeToPointSt, activePointsSt } from '../../stores/canvas';
import { createNewLine, addPointToSegment } from '../../utils/canvas';

type MouseEventHandler<T> = MouseEvent & { target: Element, currentTarget: EventTarget & T };
export const handleClick = (e: MouseEventHandler<SVGSVGElement>) => {
    if (e.target.nodeName === 'circle') {
        handleSelect(e);
        return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.x) / rect.width;
    const y = (e.clientY - rect.y) / rect.height;

    linesSt.update(lines => {
        if (lines.length) {
            const line = lines[lines.length - 1];
            line.segmentsSt.update(segments => {
                const segment = segments[segments.length - 1];
                addPointToSegment(segment, x, y);
                return segments;
            })
            return lines;
        } else {
            return [createNewLine(x, y)];
        }
    });
}

const handleSelect = (e: MouseEventHandler<SVGElement>) => {
    nodeToPointSt.update(nodeToPoint => {
        const point = nodeToPoint.get(e.target as SVGCircleElement);
        if (!point) {
            console.log(e.target);
            throw new Error('WeakMap does not have a reference to node!');
        }

        activePointsSt.update(activePoints => {
            if (!e.shiftKey) return new WeakSet([point]);

            activePoints.add(point);
            return activePoints;
        });

        return nodeToPoint;
    });
}