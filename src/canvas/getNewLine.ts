import type { Line, Segment, Node } from './index.d';
import { activeSegmentStore, activeNodeStore, linesStore } from '../stores/canvas';
import { get } from 'svelte/store';
import { getRandColor } from './colors';

function getNewLine(pos?: { x: number; y: number }): Line {
	const newSegmentId = Symbol();
	activeSegmentStore.set(newSegmentId);

	const segments: Map<Symbol, Segment> = new Map();

  const nodes: Node[] = [];

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
		segments
	};
}

export default getNewLine;
