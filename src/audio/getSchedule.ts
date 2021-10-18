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

function* rampGainUp(time: number) {
    if (time - DECAY <= 0) time += DECAY;
    yield getGainSchedule(0, time - DECAY);
    yield getGainSchedule(1, time);
}
function* rampGainDown(time: number) {
    yield getGainSchedule(1, time);
    yield getGainSchedule(0, time + DECAY);
}

type SlicePoint = { x: number, y: number };

/// Slice segments to start at some percentage. We don't return a new Line. 
/// Instead, we are an iterator over Point-like structures. 
function* getPointArrsFromSlice(line: Line, startPerc = 0): Generator<SlicePoint[]> {
    let hasStarted = false;

    const segments = get(line.segmentsSt);
    for (const segment of segments) {
        const points = get(segment.pointsSt);

        const yieldedPoints: SlicePoint[] = []

        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            if (point.x < startPerc) continue;

            if (!hasStarted) {
                hasStarted = true;

                // yield a mid-point if we're not the start of a segment
                if (i > 0) {
                    const prevPoint = points[i - 1];
                    const freqPerc = ambigRemap(
                        startPerc,
                        [prevPoint.x, point.x],
                        [prevPoint.y, point.y]
                    );
                    yieldedPoints.push({ x: 0, y: freqPerc });
                }
            }

            const { y } = point;
            yieldedPoints.push({ x: point.x - startPerc, y });
        }

        if (yieldedPoints.length) yield yieldedPoints;
    }
}

/// Iterator to flatten out a line into a "schedule".
/// A schedule includes ScheduleNodes where n(Nodes) > n(Points) since we add extra nodes where needed
///
/// A ScheduleNode converts the point percentage into a real number based on current store values
/// This means that changing these stores during execution will not affect the schedule.
/// This behavior might change if needed in the future.
export function* getSchedule(line: Line, startPerc = 0): Generator<ScheduleNode> {
    const minFreq = get(minFreqSt);
    const maxFreq = get(maxFreqSt);
    const freqDelta = maxFreq - minFreq;
    const duration = get(durationSt);

    const getFreq = (perc: number) =>
        (1 - perc) * freqDelta + minFreq;
    const getTime = (perc: number) =>
        perc * duration;


    for (const points of getPointArrsFromSlice(line, startPerc)) {
        yield* rampGainUp(getTime(points[0].x));
        
        for (const point of points) {
            const frequency = getFreq(point.y);
            const time = getTime(point.x);
            yield getFreqSchedule(frequency, time);
        }
        
        yield* rampGainDown(getTime(points[points.length - 1].x));
    }
}
