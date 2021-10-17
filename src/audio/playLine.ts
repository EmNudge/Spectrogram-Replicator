import type { Line } from "$stores/canvas";
import { getSchedule, ScheduleType } from "./getSchedule";

const ramper = (param: AudioParam) => (value: number, time: number) => 
    param.linearRampToValueAtTime(value, time);

export function playLine(line: Line, startPerc: number, now: number, getNodes: () => [GainNode, OscillatorNode]) {
    const [gainNode, oscillatorNode] = getNodes();

    const rampGain = ramper(gainNode.gain);
    const rampFreq = ramper(oscillatorNode.frequency);

    for (const { type, time, value } of getSchedule(line, startPerc)) {
        const ramp = type === ScheduleType.GAIN_NODE
            ? rampGain 
            : rampFreq;
        ramp(value, now + time);
    }

    return [gainNode, oscillatorNode];
}