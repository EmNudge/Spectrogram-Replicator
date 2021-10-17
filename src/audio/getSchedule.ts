import type { Line } from "$stores/canvas";
import { maxFreqSt, minFreqSt } from "$stores/graph";
import { durationSt } from "$stores/sound";
import { ambigRemap } from "$utils/remap";
import { get } from "svelte/store";

const DECAY = .01;

export enum ScheduleType {
    GAIN_NODE,
    FREQ_NODE,
}
const getGainSchedule = (value: number, time: number) => 
    ({ value, time, type: ScheduleType.GAIN_NODE });
const getFreqSchedule = (value: number, time: number) => 
    ({ value, time, type: ScheduleType.FREQ_NODE });

export interface ScheduleNode {
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

    const getFreq = (perc: number) =>
        (1 - perc) * freqDelta + minFreq;
    const getTime = (perc: number) =>
        perc * duration;

    let hasStarted = false;

    for (const segment of segments) {
        const points = get(segment.pointsSt);

        // ramp up volume
        if (hasStarted) {
            const firstTime = getTime(points[0].x - startPerc);
            yield getGainSchedule(0, firstTime - DECAY);
            yield getGainSchedule(1, firstTime);
        }

        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            if (point.x < startPerc) continue;

            const frequency = getFreq(point.y);
            const time = getTime(point.x - startPerc);

            // handle this being the first point
            if (!hasStarted) {
                hasStarted = true;

                const prevPoint = points[i - 1];
                if (prevPoint) {
                    // If prev point, we're in middle of a line. Create new point.
                    const freqPerc = ambigRemap(
                        startPerc,
                        [prevPoint.x, point.x],
                        [prevPoint.y, point.y]
                    );
                    const frequency = getFreq(freqPerc);

                    yield getFreqSchedule(frequency, 0);
                    yield getGainSchedule(0, 0);
                    yield getGainSchedule(1, DECAY);
                } else {
                    yield getGainSchedule(0, time - DECAY);
                    yield getGainSchedule(1, time);
                }
            }

            yield getFreqSchedule(frequency, time);
        }

        // ramp down volume
        if (hasStarted) {
            const lastTime = getTime(points[points.length - 1].x - startPerc);
            yield getGainSchedule(1, lastTime);
            yield getGainSchedule(0, lastTime + DECAY);
        }
    }
}
