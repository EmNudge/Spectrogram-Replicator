import type { Line } from '../canvas';
import { minFreqStore, maxFreqStore, audioLengthStore } from '../stores/audio';
import { get } from 'svelte/store';
import { remap } from '../utils'

export interface Point {
	time: number,
	value: number,
	volume: number,
}
export type Schedule = Point[];

// find the corresponding x value for which 2 
const getInterceptAt = (yVal: number = 0) => (p1: Point, p2: Point): number => {
	const slope = (p2.value - p1.value) / (p2.time - p1.time);
	return (yVal - p1.value) / slope + p1.time;
}

const pointsOfCrossBound = (p1: Point, p2: Point) => (bound: number) => 
	Math.sign(p1.value - bound) !== Math.sign(p2.value - bound);

// although the graph allows for it, we need to clamp the wave so it doesn't hit below 0 
function clampWave(wave: Point[], bounds: [number, number] = [0, Infinity], maxVol: number = .2) {
	const newWave: Point[] = [];

	for (const [index, point] of wave.entries()) {
		// if we're within bounds, just add the point
		if (point.value >= bounds[0] && point.value <= bounds[1]) {
			newWave.push({ ...point });
		}

		const nextPoint = wave[index + 1];
		// if this is the last point, ignore
		if (!nextPoint) continue;

		// if we're not crossing any bounds (upper or lower) ignore
		const crossesBound = pointsOfCrossBound(point, nextPoint);
		if (crossesBound(bounds[1])) {
			const time = getInterceptAt(bounds[1])(point, nextPoint);
			newWave.push({ time, value: 0, volume: maxVol });
		}
		if (crossesBound(bounds[0])) {
			const time = getInterceptAt(bounds[0])(point, nextPoint);
			newWave.push({ time, value: 0, volume: maxVol });
		}
	}

	return newWave;
}

// decay refers to how long the attack and release is for each segment 
function getSchedule(line: Line, maxVol: number = .2, decay: number = .01): Schedule {
	const minFreq = get(minFreqStore);
	const maxFreq = get(maxFreqStore);
	const audioLength = get(audioLengthStore);

	const schedule: Schedule = [];
	
	const waves: Point[][] = [];

	for (const [_id, segment] of line.segments) {
		const wave: Point[] = [];

		// at least 2 nodes must exist for a tone to play
		if (segment.nodes.length < 2) continue;
		
		for (const node of segment.nodes) {
			const xPerc = node.x;
			const time = xPerc * audioLength;

			// invert it since y starts from top
			const yPerc = 1 - node.y;
			const value = Math.floor(remap(yPerc, 0, 1, minFreq, maxFreq));
	
			const point: Point = {
				time,
				value,
				volume: maxVol,
			}
			wave.push(point);
		}

		waves.push(clampWave(wave));
	}

	for (const wave of waves) {
		if (!wave.length) continue;

		const startPoint = wave[0];
		schedule.push({
			...startPoint,
			time: startPoint.time - decay,
			volume: 0,
		});
		
		for (const point of wave) {
			schedule.push(point);
		}
		
		const endPoint = wave[wave.length - 1];
		schedule.push({
			...endPoint,
			time: endPoint.time + decay,
			volume: 0,
		});
	}

	return schedule;
}

export default getSchedule;
