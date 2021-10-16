import type { Line } from "$stores/canvas";
import { maxFreqSt, minFreqSt } from "$stores/graph";
import { durationSt } from "$stores/sound";
import { get } from "svelte/store";

const GLOBAL_VOLUME = .2;
const DECAY = .01;

enum ScheduleType {
    GAIN_NODE,
    FREQ_NODE,
}
const getGainSchedule = (value: number, time: number) => 
    ({ value, time, type: ScheduleType.GAIN_NODE });
const getFreqSchedule = (value: number, time: number) => 
    ({ value, time, type: ScheduleType.FREQ_NODE });

interface ScheduleNode {
    type: ScheduleType,
    value: number,
    time: number,
}
export function* getSchedule(line: Line, startPerc = 0): Generator<ScheduleNode> {
    const segments = get(line.segmentsSt);
    const minFreq = get(minFreqSt);
    const maxFreq = get(maxFreqSt);
    const freqDelta = maxFreq - minFreq;
    const duration = get(durationSt);

    let hasStarted = false;

    for (const segment of segments) {
        const points = get(segment.pointsSt);

        // ramp up volume
        if (hasStarted) {
            const firstTime = points[0].x * duration;
            yield getGainSchedule(0, firstTime - DECAY);
            yield getGainSchedule(1, firstTime);
        }

        for (const point of points) {
            if (point.x < startPerc) continue;

            const frequency = point.y * freqDelta + minFreq;
            const time = point.x * duration;

            // ramp up volume
            if (!hasStarted) {
                hasStarted = true;
                yield getGainSchedule(0, time - DECAY);
                yield getGainSchedule(1, time);
            }

            yield getFreqSchedule(frequency, time);
        }

        // ramp down volume
        if (hasStarted) {
            const lastTime = points[points.length - 1].x * duration;
            yield getGainSchedule(1, lastTime);
            yield getGainSchedule(0, lastTime + DECAY);
        }
    }
}

export function playLine(line: Line) {
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

    for (const { type, time, value } of getSchedule(line)) {
        if (type === ScheduleType.GAIN_NODE) {
            segmentGainNode.gain.linearRampToValueAtTime(value, now + time);
        } else {
            oscillatorNode.frequency.linearRampToValueAtTime(value, now + time);
        }
    }

    return audioContext;
}