import { activeSegmentStore, activeLineStore, linesStore, canvasStore } from './../stores/canvas';
import { get } from 'svelte/store';

interface NearNode {
  x: number,
  y: number,
  dist?: number,
}
export function getNearNode(nearNode: NearNode) {
  const { x, y } = nearNode;
  const dist = nearNode.dist || 5;

  const activeLine = get(activeLineStore);

  // check if clicking on a node by position checking
  if (activeLine) {
    const lines = get(linesStore);
    const line = lines.get(activeLine);

    const activeSegmentId = get(activeSegmentStore);
    const segment = line.segments.get(activeSegmentId);

    const canvasEl = get(canvasStore);
    const { width, height } = canvasEl.getBoundingClientRect();

    for (const node of segment.nodes) {
      const nx = node.x * width;
      const ny = node.y * height;

      const xDist = Math.abs(nx - x);
      const yDist = Math.abs(ny - y);
      if (xDist > dist || yDist > dist) continue;

      return node;
    }
  }

  return null;
}

export function isNearNode(nearNode: NearNode) {
  return Boolean(getNearNode(nearNode));
}