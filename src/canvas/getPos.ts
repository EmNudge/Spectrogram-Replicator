import { canvasStore } from '../stores/canvas';
import { get } from 'svelte/store';

/**
 * Gets position like getPos, but it lets you pass in your own bounds
 * this is useful if you already have bounds or need to get it for a different reason
 */
export function getPosWithBounds(e: MouseEvent, bounds: DOMRect) {
  const x = (e.clientX - bounds.x) / bounds.width;
  const y = (e.clientY - bounds.y) / bounds.height;

  return { x, y };
}

/**
 * Given an event, it tells you the position relative to the canvas as a PERCENTAGE
 * x and y will be between 0 and 1
 */
export function getPos(e: MouseEvent) {
  const canvasEl = get(canvasStore)!;
  const bounds = canvasEl.getBoundingClientRect();
  
  return getPosWithBounds(e, bounds);
};