import {
  activeLineStore,
  linesStore,
  activeNodeStore,
  canvasStore
} from "../../stores/canvas";
import { get } from "svelte/store";

const getIndexForId = (nodes, id) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id) return i;
  }
  return -1;
};

const getPos = e => {
  const canvasEl = get(canvasStore);
  const { width, height, x: cx, y: cy } = canvasEl.getBoundingClientRect();

  const x = (e.clientX - cx) / width;
  const y = (e.clientY - cy) / height;

  return { x, y };
};

function addLine() {
  const id = Symbol();
  activeLineStore.set(id);

  linesStore.update(lines => {
    lines.set(id, getNewLine());
    return lines;
  });
}

export function addNode(e) {
  linesStore.update(lines => {
    if (!lines.size) addLine();

    const id = get(activeLineStore);
    const line = lines.get(id);

    const nodeId = Symbol();
    line.nodes.push({ ...getPos(e), id: nodeId });
    line.nodes.sort((a, b) => a.x - b.x);
    lines.set(id, line);
    activeNodeStore.set(nodeId);

    return lines;
  });
}

export function getNearNode({ x, y, dist = 5 }) {
  const activeLine = get(activeLineStore);

  // check if clicking on a node by position checking
  if (activeLine) {
    const lines = get(linesStore);
    const line = lines.get(activeLine);

    for (const node of line.nodes) {
      const xDist = Math.abs(node.x - x);
      const yDist = Math.abs(node.y - y);
      if (xDist > dist || yDist > dist) continue;

      return node;
    }
  }

  return null;
}

export function isNearNode({ x, y, dist = 5 }) {
  return Boolean(getNearNode({ x, y, dist }));
}

export function moveNode(e) {
  linesStore.update(lines => {
    const id = get(activeLineStore);
    const activeNode = get(activeNodeStore);

    const line = lines.get(id);
    const index = getIndexForId(line.nodes, activeNode);
    line.nodes[index] = { ...getPos(e), id: activeNode };
    line.nodes.sort((a, b) => a.x - b.x);
    lines.set(id, line);
    return lines;
  });
}

export function deleteNode() {
  linesStore.update(lines => {
    const id = get(activeLineStore);
    const activeNode = get(activeNodeStore);

    const line = lines.get(id);
    const index = getIndexForId(line.nodes, activeNode);

    line.nodes.splice(index, 1);
    // might not be necessary, but just in case
    lines.set(id, line);

    const currNode = line.nodes[index] || line.nodes[index - 1];
    if (currNode) {
      activeNodeStore.set(currNode.id);
    } else {
      activeNodeStore.set(null);
    }

    return lines;
  });
}

export function getNodeInActiveLine(nodeId) {
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

export function updateNodeInActiveLine(node) {
  linesStore.update(lines => {
    const activeLine = get(activeLineStore);
    const line = lines.get(activeLine);

    for (let i = 0; i < line.nodes.length; i++) {
      const { id } = line.nodes[i];
      if (id !== node.id) continue;

      line.nodes[i] = node;
      break;
    }

    line.nodes.sort((a, b) => a.x - b.x);

    lines.set(activeLine, line);

    return lines;
  });
}

// get mouse pos relative to svg pos
export function getMouseCanvasPos(e) {
  const canvasEl = get(canvasStore);
  const { x: offsetX, y: offsetY } = canvasEl.getBoundingClientRect();

  const mouse = { x: e.clientX - offsetX, y: e.clientY - offsetY };

  return mouse;
}

// These are colors for canvas keyframes
// Since the lines are just lighter versions of the keyframes, we need HSL
// If we were using SVGs or just HTML instead of canvas, we could use CSS filter (Brightness)

// These are therefore the hue of HSL, the S & L should be 50%

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

export const getNewLine = () => ({
  hue: getRandColor(),
  name: `Line ${get(linesStore).size + 1}`,
  nodes: []
});
