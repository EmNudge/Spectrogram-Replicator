export interface ScheduleNode {
	timePerc: number,
	value: number,
	volume: number,
}

export type Schedule = ScheduleNode[];