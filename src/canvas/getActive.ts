import { activeNodeStore, activeLineStore, activeSegmentStore } from '../stores/canvas';
import { get } from 'svelte/store';

export function getActiveSegment(lines: Map<Symbol, Canvas.Line>) {
	const activeLineId = get(activeLineStore);
	const line = lines.get(activeLineId);

	if (line === undefined) {
		throw new Error(`line (${line}) from ${activeLineId} was not of type Line`);
	}

	const activeSegmentId = get(activeSegmentStore);
	const segment = line.segments.get(activeSegmentId as Symbol);

	if (segment === undefined) {
		throw new Error(`segment (${segment}) from ${activeSegmentId} was not of type Segment`);
	}

	return {
		line,
		lineId: activeLineId,
		segment,
		segmentId: activeSegmentId
	};
}

export function getActiveNode(lines: Map<Symbol, Canvas.Line>) {
	const data = getActiveSegment(lines);
	const { segment } = data;

	const activeNodeId = get(activeNodeStore);

	let activeNode = null;
	let activeNodeIndex = 0;
	for (const [index, node] of segment.nodes.entries()) {
		if (node.id !== activeNodeId) continue;

		activeNode = node;
		activeNodeIndex = index;
	}

	if (activeNode === null) {
		throw new Error(`node (${activeNode}) from ${activeNodeId} was not of type Node`);
	}

	return {
		...data,
		node: activeNode,
		nodeId: activeNodeId,
		nodeIndex: activeNodeIndex
	};
}
