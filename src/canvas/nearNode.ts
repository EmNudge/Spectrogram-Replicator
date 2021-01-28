import { activeLineStore, linesStore, canvasStore } from '../stores/canvas';
import { get } from 'svelte/store';
import { getActiveSegment } from './getActive';

interface PosParams {
  e: MouseEvent,
  boundingRect: DOMRect,
}
const getPos = (params: PosParams) => {
  const { x: cx, y: cy } = params.boundingRect;

  const x = params.e.clientX - cx;
  const y = params.e.clientY - cy;

  return { x, y };
}

export function isNearNode(e: MouseEvent, dist: number = 5) {
  const canvasEl = get(canvasStore) as SVGElement;
  const boundingRect = canvasEl.getBoundingClientRect();
  const { width, height } = boundingRect;
  const { x, y } = getPos({ boundingRect, e });

  const activeLine = get(activeLineStore);

  // check if clicking on a node by position checking
  if (activeLine) {
    const lines = get(linesStore);
    const { segment } = getActiveSegment(lines);


    for (const node of segment.nodes) {
      const nx = node.x * width;
      const ny = node.y * height;

      const xDist = Math.abs(nx - x);
      const yDist = Math.abs(ny - y);
      if (xDist > dist || yDist > dist) continue;

      return true;
    }
  }

  return false;
}