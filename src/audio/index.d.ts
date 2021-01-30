declare module Audio {
	interface ScheduleNode {
		timePerc: number,
		value: number,
		volume: number,
	}
	
	type Schedule = ScheduleNode[];
}