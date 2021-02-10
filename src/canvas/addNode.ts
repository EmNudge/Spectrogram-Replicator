import { activeStore, linesStore } from '../stores/canvas';
import { get } from 'svelte/store';
import { getNewLine } from './getNewLine';
import { getNewSegment } from './getNewSegment';
import { getPos } from './getPos';
import { getSelectionFromLine } from './getSelectionFromLine';

/**
 * Adds new node to lines via mouseevent.
 * It will add a new segment if none are selected
 */
export function addNode(e: MouseEvent) {
  linesStore.update(lines => {
    const pos = getPos(e);

    // add new line if none exist
    if (!lines.size) {
      const lineId = Symbol();
      const line = getNewLine(pos);
      lines.set(lineId, line);

      activeStore.set(getSelectionFromLine(lineId, line));
      
      return lines;
    }

    const { lineId, segmentId } = get(activeStore);
    const line = lines.get(lineId)!;

    
    const nodeId = Symbol();
    const newNode: Canvas.Node = { ...getPos(e), id: nodeId };
    
    if (!segmentId || line.segments.size === 0) {
      const segment = getNewSegment([newNode], 'Segment 1');
      const segmentId = Symbol();
      line.segments.set(segmentId, segment);
      activeStore.set(getSelectionFromLine(lineId, line));

      return lines;
    }

    const segment = line.segments.get(segmentId)!;
    const nodes = [...segment.nodes, newNode].sort((a, b) => a.x - b.x);
    line.segments.set(segmentId, getNewSegment(nodes, segment.name));

    const segments = new Map([[segmentId, new Set([nodeId])]]);
    activeStore.set({ lineId, segments, segmentId });

    return lines;
  });
}