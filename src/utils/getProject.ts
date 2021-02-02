import { titleStore, authorStore } from "../stores/project";
import { minFreqStore, maxFreqStore, audioLengthStore } from "../stores/audio";
import { linesStore, showGridBG, gridDimStore } from "../stores/canvas";
import { get } from 'svelte/store'

export function getProject() {
  const title = get(titleStore);
  const author = get(authorStore);
  const freqRange = [get(minFreqStore), get(maxFreqStore)];
  const audioLength = get(audioLengthStore);
  const grid = {
    show: get(showGridBG),
    dim: get(gridDimStore),
  };

  // Map<>.entries() returns an iterator of [key, value] pairs. Not an array.
  // we can do [...Map<>.entries()], but [...Map<>] does the same thing
  const lines = [...get(linesStore)].map(item => {
    const segments = [...item[1].segments].map(segment => [{}, segment[1]]);
    return [{}, segments];
  });

  return {
    title,
    author,
    freqRange,
    audioLength,
    grid,
    lines,
  }
}