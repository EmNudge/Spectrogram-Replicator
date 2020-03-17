import { Segment } from '../stores/canvas';

export interface Point {
	timePerc: number,
	value: number,
	volume: number,
}
export type Schedule = Point[];

function getSchedule(segment: Segment): Schedule {
	const schedule: Schedule = [];
	
	for (const node of segment.nodes) {
		const xPerc = node.x;
		// invert it since y starts from top
		const yPerc = 1 - node.y;

		const point: Point = {
			timePerc: xPerc, 
			value: yPerc,
			volume: 1,
		}
		schedule.push(point);
	}

	return schedule;
}

export default getSchedule;
