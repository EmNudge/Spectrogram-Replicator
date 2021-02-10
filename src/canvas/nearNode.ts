import { activeStore, linesStore, canvasStore } from '../stores/canvas';
import { get } from 'svelte/store';

/**
 * Tells you if mouse event is within dist 
 * of another node on the current line
 */
export function isNearNode(e: MouseEvent, dist: number = 5) {
  const canvas = get(canvasStore)!;
  const bounds = canvas.getBoundingClientRect();

  const x = e.clientX - bounds.x;
  const y = e.clientY - bounds.y;

  const activeData = get(activeStore);
  const activeLineId = activeData.lineId;
  if (!activeLineId) return false;

  const lines = get(linesStore);  
  const line = lines.get(activeLineId)!;
    
  for (const [segId, segment] of line.segments) {
    for (const node of segment.nodes) {
      const nx = node.x * bounds.width;
      const ny = node.y * bounds.height;
  
      const xDist = Math.abs(nx - x);
      const yDist = Math.abs(ny - y);

      if (xDist > dist || yDist > dist) continue;
  
      return true;
    }
  }

  return false;
}