import getSchedule from "./getSchedule";
import { get } from "svelte/store";
import { linesStore } from "../stores/canvas";
import { Line } from "../canvas";
import { minFreqStore, maxFreqStore, audioLengthStore } from "../stores/audio";
import { remap } from "../utils";

function getOutput() {
  const minFreq = get(minFreqStore);
  const maxFreq = get(maxFreqStore);
  const audioLength = get(audioLengthStore);
  
  const lines = get(linesStore) as Map<Symbol, Line>;

  const schedules = [...lines.values()].map(getSchedule);

  return schedules.map((schedule) =>
    schedule.map(({ timePerc, value, volume }) => [
      timePerc * audioLength,
      remap(value, 0, 1, minFreq, maxFreq),
      volume,
    ])
  );
}

export default getOutput;
