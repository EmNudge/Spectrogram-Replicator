import { Line } from '../canvas';

export interface Point {
	timePerc: number,
	value: number,
	volume: number,
}
export type Schedule = Point[];

function getSchedule(line: Line): Schedule {
	const schedule: Schedule = [];
	
	const waves: Point[][] = [];

	for (const [_id, segment] of line.segments) {
		const wave: Point[] = [];

		for (const node of segment.nodes) {
			const xPerc = node.x;
			// invert it since y starts from top
			const yPerc = 1 - node.y;
	
			const point: Point = {
				timePerc: xPerc, 
				value: yPerc,
				volume: 1,
			}
			wave.push(point);
		}

		waves.push(wave);
	}

	for (const wave of waves) {
		schedule.push({
			...wave[0],
			volume: 0,
		});

		for (const point of wave) {
			schedule.push(point);
		}

		schedule.push({
			...wave[wave.length - 1],
			volume: 0,
		});
	}

	return schedule;
}

export default getSchedule;
