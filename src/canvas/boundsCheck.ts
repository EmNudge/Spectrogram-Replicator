import { rangeInRange, pointInRange, Range } from '../utils/collisions';
import { Line, Segment, Node, Dim } from '../canvas';

// the dimensions of the current segment have not yet updated when this is called
// we only need the x dimensions as a range anyway, so just give us that
function getDimRange(dimensions: Dim, node: Node): Range | null {
	const { x, width } = dimensions;

	const min = Math.min(x, node.x);
	const max = Math.max(x + width, node.x);

	return { min, max };
}

// one of the difficulties is knowing which bounds checker to use.
// if neither have dimensions, they are both points - no collision
// if one has and one doesn't, only one is a point - pointInRange collision
// if both have dimensions - rangeInRange collision

// returns whether or not a node is encrouching upon the bounds of another segment
export function lineBoundsCheck(line: Line, segment: Segment, node: Node): boolean {
	for (const [_id, currSegment] of line.segments) {
		// skip if it's the active segment
		if (currSegment === segment) continue;

		// if the segment has only one node, just skip.
		// might want to change this later
		if (!currSegment.dimensions) {
			// if we're both single node segments, there can't be a collision
			if (!segment.dimensions) continue;

			const currNode = currSegment.nodes[0];
			const pointColliding = pointInRange({
				point: currNode.x,
				range: getDimRange(segment.dimensions, node) as Range
			});

			if (pointColliding) return true;
			continue;
		}

		// we know the current segment must have dimensions. We do a point-in-range collision
		if (!segment.dimensions) {
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
		const range2 = getDimRange(segment.dimensions, node) as Range;

		const isColliding = rangeInRange({ range1, range2 });

		if (isColliding) return true;
	}

	return false;
}
