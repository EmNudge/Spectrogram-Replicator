import { activeSegmentStore, activeNodeStore, linesStore } from '../stores/canvas';
import { get } from 'svelte/store';
import { getRandColor } from './colors';

function getNewLine(pos?: { x: number; y: number }): Canvas.Line {
	const newSegmentId = Symbol();
	activeSegmentStore.set(newSegmentId);

	const segments: Map<Symbol, Canvas.Segment> = new Map();

  const nodes: Canvas.Node[] = [];

  if (pos) {
    const activeNodeId = Symbol();
    const node = { ...pos, id: activeNodeId };
    activeNodeStore.set(activeNodeId);
    nodes.push(node);
  } else {
    activeNodeStore.set(null);
  }

	segments.set(newSegmentId, {
		name: 'Segment 1',
		nodes
	});

	return {
		hue: getRandColor(),
		name: `Line ${get(linesStore).size + 1}`,
		segments,
		isEditing: false,
	};
}

export default getNewLine;
