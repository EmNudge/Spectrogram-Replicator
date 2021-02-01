import { writable, get } from 'svelte/store';

export const linesStore = writable(new Map() as Map<Symbol, Canvas.Line>);
export const updateLine = (id: Symbol) => (func: (line: Canvas.Line) => void) => {
  linesStore.update(lines => {
    const line = lines.get(id);
    func(line);
    return lines;
  });
}

// data structure to contain a list of all active nodes
export const activeStore = writable<Canvas.Selection>({
  lineId: null,
  segmentId: null,
  segments: new Map(),
});

let linesLength = 0;
linesStore.subscribe(lines => {
  const oldLen = linesLength;
  linesLength = lines.size;

  if (lines.size > oldLen || lines.size === 0) return;

  const { lineId } = get(activeStore);
  if (lineId && lines.has(lineId)) return;

  const [id, line] = [...lines][0];
  const [segmentId, segment] = [...line.segments][0];
  const { id: nodeId } = segment.nodes[0]

  activeStore.set({
    lineId: id,
    segmentId,
    segments: new Map([[segmentId, new Set([nodeId])]]),
  });
})

// represents canvas svg to get coords and dimensions
export const canvasStore = writable(null as SVGElement | null);

// whether to assocociate delete and backspace with the deletion of a node
// if we're in an input, we want this disabled.
export const allowDeleteStore = writable(true); 

export const debugModeStore = writable(false);

export const showGridBG = writable(true);
export const gridDimStore = writable([3, 8]);
export const lightenOddGridStore = writable(true);

// opacity of the image background
export const gridBGOpacityStore = writable(.3);

// variable width of the box
export const canvasWidthStore = writable(500);