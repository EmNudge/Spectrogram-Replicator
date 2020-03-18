import { rangeInRange, pointInRange, Range } from '../utils/collisions';
import { Line, Segment, Node, Dim } from '../canvas';
import getSegmentDimensions from './getSegmentDimensions';

// one of the difficulties is knowing which bounds checker to use.
// if neither have dimensions, they are both points - no collision
// if one has and one doesn't, only one is a point - pointInRange collision
// if both have dimensions - rangeInRange collision

// returns whether or not a node is encrouching upon the bounds of another segment
export function lineBoundsCheck(line: Line, segment: Segment, node: Node): boolean {
	let range: Range | null = null;
	// if we have one node, then the new node lets us make dimensions
	if (segment.nodes.length > 1 || (segment.nodes.length === 1 && segment.nodes[0].id !== node.id)) {
		const newSegment = { ...segment };
		newSegment.nodes = [ ...newSegment.nodes, node ];
		const { x, width } = getSegmentDimensions(newSegment);
		range = { min: x, max: x + width};
	}

	for (const [_id, currSegment] of line.segments) {
		if (!currSegment.nodes.length) continue;
		
		// skip if it's the active segment
		if (currSegment === segment) continue;

		// if the segment has only one node, just skip.
		// might want to change this later
		if (!currSegment.dimensions) {
			// if neither have ranges (single nodes) there can't be a collision
			if (!range) continue;

			const currNode = currSegment.nodes[0];
			const pointColliding = pointInRange({
				point: currNode.x,
				range: range
			});

			if (pointColliding) return true;
			continue;
		}

		// we know the current segment must have dimensions. We do a point-in-range collision
		if (!range) {
			const { x, width } = currSegment.dimensions;
			const range = {
				min: x,
				max: x + width
			};
			const isColliding = pointInRange({
				point: node.x,
				range
			});

			if (isColliding) return true;

			continue;
		}

		const { x, width } = currSegment.dimensions;
		const range1 = {
			min: x,
			max: x + width
		};
		const range2 = range as Range;

		const isColliding = rangeInRange({ range1, range2 });

		if (isColliding) return true;
	}

	return false;
}
