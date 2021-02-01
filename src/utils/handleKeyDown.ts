import { get } from 'svelte/store';
import { allowDeleteStore, activeStore, linesStore } from '../stores/canvas';
import { deleteActiveNodes, getSelectionFromLine } from '../canvas/exports'

function handleKeyDown(e: KeyboardEvent) {
    if (!['Delete', 'Backspace'].includes(e.key)) return;

    if (!get(allowDeleteStore)) return;
    
    deleteActiveNodes();
    changeActiveNodes();
}

function changeActiveNodes() {
    activeStore.update((activeData) => {
        const { lineId, segments } = activeData;

        const lines = get(linesStore);
        const line = lines.get(lineId);

        if (segments.size === 0 || line.segments.size === 0) {
            return { lineId, segmentId: null, segments };
        }

        const segmentId = getSegmentId(activeData, line);
        
        const segment = line.segments.get(segmentId);
        if (!segment) {
            return getSelectionFromLine(lineId, line, true);
        }

        const nodeId = segment.nodes[segment.nodes.length - 1].id;
        
        return {
            lineId,
            segmentId: segmentId,
            segments: new Map([[segmentId, new Set([nodeId])]]),
        };
    });
}

function getSegmentId(activeData: Canvas.Selection, activeLine: Canvas.Line) {
    const { segmentId, segments } = activeData;
    if (segmentId && activeLine.segments.has(segmentId)) return segmentId;
    
    const [[segId]] = segments;
    return segId;
}

export default handleKeyDown;