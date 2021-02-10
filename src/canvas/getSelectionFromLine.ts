export function getSelectionFromLine(lineId: Symbol, line: Canvas.Line, singleNode = false): Canvas.Selection {
  const segments = new Map();

  let segmentId: Symbol | null = null;
  for (const [segId, segment] of line.segments) {
    if (!segmentId) segmentId = segId;
    
    const nodes = segment.nodes.map(node => node.id);
    if (singleNode) {
      const nodeId = nodes[nodes.length - 1];
      return {
        lineId,
        segmentId,
        segments: new Map([[segId, new Set([nodeId])]]),
      };
    }

    segments.set(segId, new Set(nodes));
  }

  return {
    lineId,
    segmentId,
    segments,
  }
}