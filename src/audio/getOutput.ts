import getSchedule from './getSchedule';
import { get } from 'svelte/store'
import { linesStore } from '../stores/canvas';
import { Line } from '../canvas';

function getOutput() {
  const lines = get(linesStore) as Map<Symbol, Line>;
  
  const schedules = [...lines.values()].map(getSchedule)

  return schedules.map(schedule => schedule.map(({ timePerc, value, volume }) => [timePerc, value, volume]))
}

export default getOutput;  