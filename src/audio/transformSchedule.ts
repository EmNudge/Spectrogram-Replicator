import { remap } from '../utils';

// takes a schedule and a percentage.
// Returns a schedule sliced to that percentage
function transformSchedule(schedule: Audio.Schedule, time: number) {
	let choppingIndex;

	for (const [index, node] of schedule.entries()) {
		if (time > node.time) continue;
		choppingIndex = index;
		break;
	}

	// if we're before nodes start, don't change anything
	if (choppingIndex === 0) return schedule;
	// if we're after everything there is nothing to play.
	if (!choppingIndex) return [];

	// surrounding nodes to calculate new starting node
	const nodeBefore = schedule[choppingIndex - 1];
	const nodeAfter = schedule[choppingIndex];

  // value is a remap of percentage between 2 nodes
	const value = remap(
    time, 
    nodeBefore.time, 
    nodeAfter.time, 
    Math.min(nodeBefore.value, nodeAfter.value), // we have no easier way of knowing which is the smaller value
    Math.max(nodeBefore.value, nodeAfter.value)  // so just take min and max
  );

  // node at current time which should be on the line
  const startingNode = { time, value, volume: 1 };

  return [startingNode, ...schedule.slice(choppingIndex)]
}

export default transformSchedule;
