import { Line } from '../canvas';

export enum PointTypes {
	START_POINT = -1,
	END_POINT = 1,
}
export interface Point {
	timePerc: number,
	value: number,
	volume: number,
	type?: PointTypes,
}
export type Schedule = Point[];

// decay refers to how long the attack and release is for each segment 
function getSchedule(line: Line, maxVol: number = .2): Schedule {
	const schedule: Schedule = [];
	
	const waves: Point[][] = [];

	for (const [_id, segment] of line.segments) {
		const wave: Point[] = [];

		// at least 2 nodes must exist for a tone to play
		if (segment.nodes.length < 2) continue;
		
		for (const node of segment.nodes) {
			const xPerc = node.x;
			// invert it since y starts from top
			const yPerc = 1 - node.y;
	
			const point: Point = {
				timePerc: xPerc, 
				value: yPerc,
				volume: maxVol,
			}
			wave.push(point);
		}

		waves.push(wave);
	}

	for (const wave of waves) {
		const startPoint = wave[0];
		schedule.push({
			...startPoint,
			timePerc: startPoint.timePerc,
			volume: 0,
			type: PointTypes.START_POINT
		});
		
		for (const point of wave) {
			schedule.push(point);
		}
		
		const endPoint = wave[wave.length - 1];
		schedule.push({
			...endPoint,
			timePerc: endPoint.timePerc,
			volume: 0,
			type: PointTypes.END_POINT
		});
	}

	return schedule;
}

export default getSchedule;
