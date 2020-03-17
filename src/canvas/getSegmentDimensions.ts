import { Segment, Dim } from '../canvas';

// gets smallest and largest x & y values to produce a box around a segment
// i.e. a dimension object
function getSegmentDimensions(segment: Segment): Dim {
  if (segment.nodes.length < 2) {
    throw new Error('Cannot get dimensions on segment size less than 2');
  }

  // we make the smallest values the largest in order to quickly get overwritten
  // since nodes' x & y can only be from 0-1, we don't need to use Infinity, but whatever
  let smallestX = Infinity;
  let smallestY = Infinity;
  let largestX = -Infinity;
  let largestY = -Infinity;

  for (const node of segment.nodes) {
    // we separately check each dimension and not both at once since a segment's dimensions
    // can be made of many nodes. One can have a smaller x and another a smaller y. Or it can have both.
    if (node.x < smallestX) {
      smallestX = node.x;
    }
    if (node.x > largestX) {
      largestX = node.x;
    }

    if (node.y < smallestY) {
      smallestY = node.y;
    }
    if (node.y > largestY) {
      largestY = node.y;
    }
  }

  return {
    x: smallestX, 
    y: smallestY,
    width: largestX - smallestX, 
    height: largestY - smallestY,
  }
}

export default getSegmentDimensions;