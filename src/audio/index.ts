import type { Line } from "$stores/canvas";
import { getSchedule, ScheduleType } from "./getSchedule";

const GLOBAL_VOLUME = .2;

const ramper = (param: AudioParam) => (value: number, time: number) => 
    param.linearRampToValueAtTime(value, time);

export function playLine(line: Line, startPerc = 0) {
    const audioContext = new AudioContext();

    const gainNode = audioContext.createGain();
    gainNode.gain.value = GLOBAL_VOLUME;
    gainNode.connect(audioContext.destination);

    const now = audioContext.currentTime;

    const segmentGainNode = audioContext.createGain();
    segmentGainNode.connect(gainNode);
    segmentGainNode.gain.value = 0;

    const oscillatorNode = audioContext.createOscillator();
    oscillatorNode.connect(segmentGainNode);
    oscillatorNode.start(0);

    const rampGain = ramper(segmentGainNode.gain);
    const rampFreq = ramper(oscillatorNode.frequency);

    for (const { type, time, value } of getSchedule(line, startPerc)) {
        const ramp = type === ScheduleType.GAIN_NODE
            ? rampGain 
            : rampFreq;
        ramp(value, now + time);
    }

    return audioContext;
}