import { linesSt } from '../../stores/canvas';
import { createNewLine, addPointToSegment } from '../../utils/canvas';

export const handleClick = (e: MouseEvent & { currentTarget: SVGSVGElement }) => {
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