import type { Line } from "$stores/canvas";
import { maxFreqSt, minFreqSt } from "$stores/graph";
import { durationSt } from "$stores/sound";
import { get } from "svelte/store";

const GLOBAL_VOLUME = .2;
const DECAY = .01;

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

    const minFreq = get(minFreqSt);
    const maxFreq = get(maxFreqSt);
    const freqDelta = maxFreq - minFreq;
    const duration = get(durationSt);

    const segments = get(line.segmentsSt);
    for (const segment of segments) {
        const points = get(segment.pointsSt);

        const firstTime = now + points[0].x * duration;
        segmentGainNode.gain.linearRampToValueAtTime(0, firstTime - DECAY);
        segmentGainNode.gain.linearRampToValueAtTime(1, firstTime);

        for (const point of points) {
            const frequency = point.y * freqDelta + minFreq;
            const time = point.x * duration;
            oscillatorNode.frequency.linearRampToValueAtTime(frequency, now + time);
        }
        const lastTime = now + points[points.length - 1].x * duration;
        segmentGainNode.gain.linearRampToValueAtTime(1, lastTime);
        segmentGainNode.gain.linearRampToValueAtTime(0, lastTime + DECAY);
    }

    return audioContext;
}