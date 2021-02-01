import { activeStore, linesStore } from '../stores/canvas';
import { get } from 'svelte/store';
import { getPos } from './getPos';

/**
 * move all active nodes by an offset given an original position
 */
export function moveNodes(e: MouseEvent, originalPos: { x: number, y: number }) {
  const { lineId, segments } = get(activeStore);
  if (!lineId) throw new Error('cannot move nodes when no line is active');

  const newPos = getPos(e);
  if (newPos.x === originalPos.x && newPos.y === originalPos.y) return;
  
  const offset = { 
    x: newPos.x - originalPos.x, 
    y: newPos.y - originalPos.y 
  };

  linesStore.update(lines => {
    const line = lines.get(lineId);
    
    for (const [segmentId, nodeIds] of segments) {
      const segment = line.segments.get(segmentId);
      for (const node of segment.nodes) {
        if (!nodeIds.has(node.id)) continue;

        node.x += offset.x;
        node.y += offset.y;
      }
      
      segment.nodes.sort((a, b) => a.x - b.x);
    }

    return lines;
  });
}