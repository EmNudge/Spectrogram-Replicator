import { getSegmentDimensions } from './getSegmentDimensions';

export const getNewSegment = (nodes: Canvas.Node[], name: string): Canvas.Segment => ({
  nodes,
  name,
  dimensions: getSegmentDimensions(nodes),
})