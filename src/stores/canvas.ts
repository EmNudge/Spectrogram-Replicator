import { writable, get } from 'svelte/store';

export const linesStore = writable(new Map() as Map<Symbol, Canvas.Line>);
export const updateLine = (id: Symbol) => (func: (line: Canvas.Line) => void) => {
  linesStore.update(lines => {
    const line = lines.get(id);
    func(line);
    return lines;
  });
}

// Current active line
export const activeLineStore = writable(null as Symbol);

// Current active segment within a line
export const activeSegmentStore = writable(null as Symbol);

// Current active node within a segment
export const activeNodeStore = writable(null as Symbol);

let linesLength = 0;
linesStore.subscribe(lines => {
  const oldLen = linesLength;
  linesLength = lines.size;

  if (lines.size > oldLen || lines.size === 0) return;

  const activeLineId = get(activeLineStore);
  const activeLine = lines.get(activeLineId);
  if (activeLine) return;

  const [lineId, line] = [...lines][0];
  activeLineStore.set(lineId);
  const [segmentId, segment] = [...line.segments][0];
  activeSegmentStore.set(segmentId);
  const node = segment.nodes[0]
  activeNodeStore.set(node.id);
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