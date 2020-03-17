import {
  activeLineStore,
  activeSegmentStore,
  activeNodeStore,
  linesStore,
  canvasStore
} from "../../stores/canvas";
// separately importing types
import {
  Node, Line, Segment, Dim
} from "../../canvas";
import { lineBoundsCheck } from './../../canvas/boundsCheck';
import { get } from "svelte/store";

const getPos = (e: MouseEvent) => {
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
    segment.nodes.push({ ...getPos(e), id: nodeId });
    segment.nodes.sort((a, b) => a.x - b.x);

    if (segment.nodes.length > 1) {
      segment.dimensions = getSegmentDimensions(segment);
    }

    line.segments.set(segmentId, segment);
    activeNodeStore.set(nodeId);

    return lines;
  });
}

interface NearNode {
  x: number,
  y: number,
  dist?: number,
}
export function getNearNode(nearNode: NearNode) {
  const { x, y } = nearNode;
  const dist = nearNode.dist || 5;

  const activeLine = get(activeLineStore);

  // check if clicking on a node by position checking
  if (activeLine) {
    const lines = get(linesStore);
    const line = lines.get(activeLine);

    const activeSegmentId = get(activeSegmentStore);
    const segment = line.segments.get(activeSegmentId);

    const canvasEl = get(canvasStore);
    const { width, height } = canvasEl.getBoundingClientRect();

    for (const node of segment.nodes) {
      const nx = node.x * width;
      const ny = node.y * height;

      const xDist = Math.abs(nx - x);
      const yDist = Math.abs(ny - y);
      if (xDist > dist || yDist > dist) continue;

      return node;
    }
  }

  return null;
}

export function isNearNode(nearNode: NearNode) {
  return Boolean(getNearNode(nearNode));
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

function getActiveSegment(lines: Map<Symbol, Line>) {
  const activeLineId = get(activeLineStore);
  const line = lines.get(activeLineId);

  if (line === undefined) {
    throw new Error(`line (${line}) from ${activeLineId} was not of type Line`);
  }
  
  const activeSegmentId = get(activeSegmentStore);
  const segment = line.segments.get(activeSegmentId);
  
  if (segment === undefined) {
    throw new Error(`segment (${segment}) from ${activeSegmentId} was not of type Segment`);
  }

  return {
    line,
    lineId: activeLineId,
    segment,
    segmentId: activeSegmentId
  }
}

export function getActiveNode(lines: Map<Symbol, Line>) {
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
  }
}

export function deleteNode() {
  linesStore.update(lines => {
    const { line, segment, segmentId, nodeIndex } = getActiveNode(lines)

    segment.nodes.splice(nodeIndex, 1);
    // might not be necessary, but just in case
    line.segments.set(segmentId, segment);

    const currNode = segment.nodes[nodeIndex] || segment.nodes[nodeIndex - 1];
    if (currNode) {
      activeNodeStore.set(currNode.id);
    } else {
      activeNodeStore.set(null);
    }

    return lines;
  });
}

export function getNodeInActiveLine(nodeId: Symbol) {
  const lines = get(linesStore);
  const activeLine = get(activeLineStore);
  const line = lines.get(activeLine);

  for (let i = 0; i < line.nodes.length; i++) {
    const { id } = line.nodes[i];
    if (id !== nodeId) continue;

    return line.nodes[i];
  }
  return null;
}

export function updateNodeInActiveLine(node: Node) {
  linesStore.update(lines => {
    const { segment, lineId, line } = getActiveSegment(lines);

    for (let i = 0; i < segment.nodes.length; i++) {
      const { id } = segment.nodes[i];
      if (id !== node.id) continue;

      segment.nodes[i] = node;
      break;
    }

    segment.nodes.sort((a, b) => a.x - b.x);

    segment.dimensions = getSegmentDimensions(segment);

    // this is probably extraneous
    lines.set(lineId, line);

    return lines;
  });
}

// get mouse pos relative to svg pos
export function getMouseCanvasPos(e: MouseEvent) {
  const canvasEl = get(canvasStore);
  const { x: offsetX, y: offsetY } = canvasEl.getBoundingClientRect();

  const mouse = { x: e.clientX - offsetX, y: e.clientY - offsetY };

  return mouse;
}

// These are colors for canvas keyframes
// Since the lines are just lighter versions of the keyframes, we need HSL
// These are therefore the hue of HSL, the S & L should be 50%

// Since we now switched to SVGs, we could probably use `brightness` via CSS filters, but this is more flexible

export const BLUE = 200;
export const TEAL = 170;
export const RED = 0;
export const YELLOW = 60;
export const GREEN = 80;
export const PURPLE = 250;
export const PINK = 320;

export const getRandColor = () => {
  const colors = [RED, TEAL, BLUE, YELLOW, GREEN, PURPLE, PINK];

  const randIndex = Math.floor(Math.random() * colors.length);

  return colors[randIndex];
};

export function getNewLine(pos: { x: number, y: number }): Line {
  const newSegmentId = Symbol();
  activeSegmentStore.set(newSegmentId);

  const segments: Map<Symbol, Segment> = new Map();
  const node = { ...pos, id: Symbol() }
  segments.set(
    newSegmentId, 
    { 
      name: 'Segment 1', 
      nodes: [node] 
    }
  );

  return  {
    hue: getRandColor(),
    name: `Line ${get(linesStore).size + 1}`,
    segments,
  }
};
