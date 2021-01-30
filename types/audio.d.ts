declare module Audio {
	interface ScheduleNode {
		time: number,
		value: number,
		volume: number,
	}
	
	type Schedule = ScheduleNode[];
}