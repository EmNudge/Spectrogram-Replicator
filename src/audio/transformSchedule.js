import { remap } from '../utils';

// takes a schedule and a percentage.
// Returns a schedule sliced to that percentage
function transformSchedule({ schedule, timePerc }) {
	let choppingIndex = 0;

	for (const [index, node] of schedule.entries()) {
		if (timePerc > node.timePerc) continue;
		choppingIndex = index;
		break;
	}

	// if we're before nodes start, don't change anything
	if (choppingIndex === 0) return schedule;

	// surrounding nodes to calculate new starting node
	const nodeBefore = schedule[choppingIndex - 1];
	const nodeAfter = schedule[choppingIndex];

  // value is a remap of percentage between 2 nodes
	const value = remap(
    timePerc, 
    nodeBefore.timePerc, 
    nodeAfter.timePerc, 
    nodeBefore.value, 
    nodeAfter.value
  );

  // node at current time which should be on the line
  const startingNode = { timePerc, value };

  return [startingNode, ...schedule.slice(choppingIndex)]
}

export default transformSchedule;
