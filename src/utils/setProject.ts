import { titleStore, authorStore } from "../stores/project";
import { minFreqStore, maxFreqStore, audioLengthStore } from "../stores/audio";
import { linesStore, showGridBG, gridDimStore } from "../stores/canvas";

// really annoying redefining a massive type just to say that every Symbol is replaced with an empty object
interface Project {
  title: string;
  author: string;
  freqRange: [number, number];
  audioLength: number;
  grid: { show: boolean, dim: [number, number] }
  lines: [{}, any][]
}
export default function setProject(project: Project) {
  const { title, author, freqRange, audioLength, grid, lines } = project;

  titleStore.set(title);
  authorStore.set(author);
  minFreqStore.set(freqRange[0]);
  maxFreqStore.set(freqRange[1]);
  audioLengthStore.set(audioLength);
  showGridBG.set(grid.show);
  gridDimStore.set(grid.dim);

  for (const item of lines) {
    // replacing empty object with Symbol()
    item[0] = Symbol();

    for (const segment of item[1].segments) {
      segment[0] = Symbol();
      for (const node of segment[1].nodes) {
        node.id = Symbol();
      }
    }

    item[1].segments = new Map(item[1].segments);
  }

  linesStore.set(new Map(lines) as Map<Symbol, Canvas.Line>);
}