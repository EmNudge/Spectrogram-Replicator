import {
  activeLineStore,
  activeNodeStore,
  linesStore,
  canvasStore
} from "../../stores/canvas";
// separately importing types
import {
  Node, Line, Segment
} from "../../canvas";
import { lineBoundsCheck } from '../../canvas/boundsCheck';
import { getSegmentDimensions } from '../../canvas/exports'
import { getActiveNode, getActiveSegment } from '../../canvas/getActive'
import { get } from "svelte/store";
import { getNewLine } from '../../canvas/exports';

export function getPos(e: MouseEvent) {
  const canvasEl = get(canvasStore);
  const { width, height, x: cx, y: cy } = canvasEl.getBoundingClientRect();

  const x = (e.clientX - cx) / width;
  const y = (e.clientY - cy) / height;

  return { x, y };
};

// adds a new line, but does not update the store (does not cause a svelte update)
function addLine(lines: Map<Symbol, Line>, pos: { x: number, y: number }) {
  const id = Symbol();
  activeLineStore.set(id);

  lines.set(id, getNewLine(pos));
}

export function addNode(e: MouseEvent) {
  linesStore.update(lines => {
    if (!lines.size) {
      addLine(lines, getPos(e));
      return lines;
    }

    const { line, segment, segmentId } = getActiveSegment(lines);

    const nodeId = Symbol();
    const newNode = { ...getPos(e), id: nodeId }
    
    const isColliding = lineBoundsCheck(line, segment, newNode);
    if (isColliding) {
      activeNodeStore.set(null);
      return lines;
    };

    segment.nodes.push(newNode);
    segment.nodes.sort((a, b) => a.x - b.x);

    if (segment.nodes.length > 1) {
      segment.dimensions = getSegmentDimensions(segment);
    }

    line.segments.set(segmentId, segment);
    activeNodeStore.set(nodeId);

    return lines;
  });
}

export function moveNode(e: MouseEvent) {
  linesStore.update(lines => {
    const { line, segment, segmentId, nodeId, nodeIndex, } = getActiveNode(lines);

    const newNode: Node = { ...getPos(e), id: nodeId };

    const isColliding = lineBoundsCheck(line, segment, newNode);
    if (isColliding) {
      const { x } = segment.nodes[nodeIndex]
      newNode.x = x;
    }

    segment.nodes[nodeIndex] = newNode;
    segment.nodes.sort((a, b) => a.x - b.x);

    if (segment.nodes.length > 1) {
      // gets box surrounding nodes
      segment.dimensions = getSegmentDimensions(segment);
    }

    line.segments.set(segmentId, segment);

    return lines;
  });
}

export function updateNodeInActiveLine(node: Node) {
  linesStore.update(lines => {
    const { segment } = getActiveSegment(lines);

    for (const [i, { id }] of segment.nodes.entries()) {
      if (id !== node.id) continue;

      segment.nodes[i] = node;
      break;
    }

    segment.nodes.sort((a, b) => a.x - b.x);

    segment.dimensions = getSegmentDimensions(segment);

    return lines;
  });
}
