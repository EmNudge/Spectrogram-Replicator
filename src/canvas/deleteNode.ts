import { activeNodeStore, linesStore } from '../stores/canvas';
import { get } from 'svelte/store';
import { getActiveNode } from './getActive';
import getSegmentDimensions from './getSegmentDimensions'

function deleteNode() {
	linesStore.update((lines) => {
		const activeNodeId = get(activeNodeStore);
		if (!activeNodeId) return lines;

		const { segment, nodeIndex } = getActiveNode(lines);

		if (segment.nodes.length <= 1) {
			segment.nodes = [];
			segment.dimensions = undefined;
			activeNodeStore.set(null);

			return lines;
		}

		segment.nodes.splice(nodeIndex, 1);

		if (segment.nodes.length === 1) {
			segment.dimensions = undefined;

			const nodeId = segment.nodes[0].id;
			activeNodeStore.set(nodeId);

			return lines;
		}
    
		segment.dimensions = getSegmentDimensions(segment);

		const currNode = segment.nodes[nodeIndex] || segment.nodes[nodeIndex - 1];
		activeNodeStore.set(currNode.id);

		return lines;
	});
}

export default deleteNode;