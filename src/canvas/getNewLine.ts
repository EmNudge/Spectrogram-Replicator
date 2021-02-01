import { linesStore } from '../stores/canvas';
import { get } from 'svelte/store';
import { getRandColor } from './colors';
import { getNewSegment } from './getNewSegment';

/**
 * Gets new line for a given node position.
 * This does not change any store, so setting active data must be done manually
 */
export function getNewLine(pos?: { x: number; y: number }): Canvas.Line {
	const newSegmentId = Symbol();
	const segments: Map<Symbol, Canvas.Segment> = new Map();

  const nodes: Canvas.Node[] = [];

  if (pos) {
    const activeNodeId = Symbol();
    const node = { ...pos, id: activeNodeId };
    nodes.push(node);
  }

	segments.set(newSegmentId, getNewSegment(nodes, 'Segment 1'));

	return {
		hue: getRandColor(),
		name: `Line ${get(linesStore).size + 1}`,
		segments,
		isEditing: false,
	};
}

export default getNewLine;
