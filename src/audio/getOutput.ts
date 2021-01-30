import getSchedule from "./getSchedule";
import { get } from "svelte/store";
import { linesStore } from "../stores/canvas";

function getOutput() {
  const lines = get(linesStore) as Map<Symbol, Canvas.Line>;
  const schedules = [...lines.values()].map(line => getSchedule(line));

  return schedules;
}

export default getOutput;
