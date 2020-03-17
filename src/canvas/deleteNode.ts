import { activeNodeStore, linesStore } from '../stores/canvas';
import { getActiveNode } from './getActive';
import { getSegmentDimensions } from './getSegmentDimensions'

export function deleteNode() {
	linesStore.update((lines) => {
		const { segment, nodeIndex } = getActiveNode(lines);

		segment.nodes.splice(nodeIndex, 1);
    
    if (segment.nodes.length > 1) {
      segment.dimensions = getSegmentDimensions(segment);
    } else {
      segment.dimensions = undefined;
    }

		const currNode = segment.nodes[nodeIndex] || segment.nodes[nodeIndex - 1];
		if (currNode) {
			activeNodeStore.set(currNode.id);
		} else {
			activeNodeStore.set(null);
		}

		return lines;
	});
}
