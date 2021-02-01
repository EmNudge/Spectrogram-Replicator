import { activeStore, linesStore } from '../stores/canvas';
import { get } from 'svelte/store';
import { getNewSegment } from './getNewSegment'

/**
 * Deletes all active nodes
 */
export function deleteActiveNodes() {
	const activeData = get(activeStore);
	if (!activeData.lineId) {
		throw new Error('Tried to delete node, but no nodes are active');
	}

	linesStore.update((lines) => {
		const line = lines.get(activeData.lineId);
		
		// TODO: refactor this into a HashMap .map function
		for (const [segId, segment] of line.segments) {
			if (!activeData.segments.has(segId)) continue;

			const nodeIdsToDelete = activeData.segments.get(segId);
			// only keep nodes that are not active
			const nodes = segment.nodes.filter(node => !nodeIdsToDelete.has(node.id));
			
			//if all lines in a segment are deleted, delete the segment
			if (nodes.length === 0) {
				line.segments.delete(segId);
				continue;
			}

			// we're using this function to also generate new dimensions
			const newSegment = getNewSegment(nodes, segment.name);
			line.segments.set(segId, newSegment);
		}

		return lines;
	});
}